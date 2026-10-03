import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { api, ApiError, clearToken, getToken } from "@/lib/api";

export const Route = createFileRoute("/admin")({ component: AdminDashboard });

const rs = (n: number) => `₹${Number(n).toLocaleString("en-IN")}`;
const LABEL: Record<string, string> = {
  payment_submitted: "Verify payment",
  paid: "Paid – ready to dispatch",
  dispatched: "Dispatched",
  cancelled: "Cancelled",
};

type Tab = "orders" | "products" | "dispatch" | "customers";

// Put your logo file in the frontend /public folder with this name (or change the path)
const LOGO_SRC = "/logo.png";

const card = "rounded-2xl bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)]";
const pill = "rounded-full bg-yellow px-4 py-2 text-xs font-bold uppercase transition-colors hover:bg-yellow-deep disabled:opacity-40";

function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("orders");
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  const goLogin = () => navigate({ to: "/adminlogin" as any });

  const handle = (e: unknown) => {
    if (e instanceof ApiError && (e.status === 401 || e.status === 403)) {
      clearToken();
      goLogin();
      return;
    }
    setError(e instanceof Error ? e.message : "Something went wrong.");
  };

  const load = () => {
    api("/admin/orders/", { auth: true }).then(setOrders).catch(handle);
    api("/admin/products/", { auth: true }).then(setProducts).catch(handle);
  };

  useEffect(() => {
    if (!getToken()) {
      goLogin();
      return;
    }
    load();
  }, []);

  const updateOrder = async (id: number, payload: Record<string, string>) => {
    setError("");
    try {
      await api(`/admin/orders/${id}/`, { method: "PATCH", auth: true, body: JSON.stringify(payload) });
      load();
    } catch (e) {
      handle(e);
    }
  };

  // Customers = people with a paid (or later) order
  const customers = useMemo(() => {
    const map = new Map<string, any>();
    orders
      .filter((o) => o.status === "paid" || o.status === "dispatched")
      .forEach((o) => {
        const c = map.get(o.email) ?? { email: o.email, name: o.name, phone: o.phone, company: o.company, orders: 0, spent: 0, last: o.created_at };
        c.orders += 1;
        c.spent += o.total;
        map.set(o.email, c);
      });
    return [...map.values()];
  }, [orders]);

  // Dashboard numbers
  const stats = useMemo(() => {
    const done = orders.filter((o) => o.status === "paid" || o.status === "dispatched");
    const days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - (6 - i));
      return { d, label: d.toLocaleDateString("en-IN", { weekday: "short" }), total: 0 };
    });
    done.forEach((o) => {
      const t = new Date(o.paid_at ?? o.created_at);
      t.setHours(0, 0, 0, 0);
      const day = days.find((x) => x.d.getTime() === t.getTime());
      if (day) day.total += o.total;
    });
    return {
      revenue: done.reduce((s, o) => s + o.total, 0),
      toVerify: orders.filter((o) => o.status === "payment_submitted").length,
      toDispatch: orders.filter((o) => o.status === "paid").length,
      days,
    };
  }, [orders]);

  const shown = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const nav: { id: Tab; label: string; icon: string }[] = [
    { id: "orders", label: "Dashboard", icon: "▦" },
    { id: "products", label: "Products", icon: "◈" },
    { id: "dispatch", label: "Dispatch", icon: "➤" },
    { id: "customers", label: "Customers", icon: "☺" },
  ];

  return (
    <div className="fixed inset-0 z-[9999] overflow-auto bg-[#f4f4f2] text-[#141414]">
      <div className="flex min-h-full w-full flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="flex shrink-0 flex-row items-center gap-2 bg-white p-4 md:w-56 md:flex-col md:items-stretch md:gap-1 md:p-6">
          <div className="mr-auto md:mb-8 md:mr-0"><Logo /></div>
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                tab === n.id ? "bg-yellow text-black" : "text-black/60 hover:bg-black/5"
              }`}
            >
              <span aria-hidden>{n.icon}</span>
              <span className="hidden sm:inline">{n.label}</span>
            </button>
          ))}
          <button
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-black/60 hover:bg-black/5 md:mt-auto"
            onClick={() => { clearToken(); goLogin(); }}
          >
            <span aria-hidden>⎋</span>
            <span className="hidden sm:inline">Log out</span>
          </button>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 space-y-5 p-4 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold capitalize">{tab === "orders" ? "Dashboard" : tab}</h1>
            <span className={`${card} px-4 py-2 text-xs font-semibold text-black/60`}>Admin</span>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* ───────── ORDERS ───────── */}
          {tab === "orders" && (
            <div className="space-y-5">
              <div className="grid gap-5 lg:grid-cols-[1fr_220px]">
                <div className={`${card} p-6`}>
                  <p className="text-3xl font-semibold">{rs(stats.revenue)}</p>
                  <p className="text-xs text-black/50">Confirmed revenue · last 7 days</p>
                  <RevenueChart days={stats.days} />
                </div>
                <div className="flex flex-col justify-between rounded-2xl bg-[#1b1b1b] p-6 text-white">
                  <div>
                    <p className="text-5xl font-bold text-yellow">{stats.toVerify}</p>
                    <p className="mt-2 text-sm text-white/60">payments waiting for your check</p>
                  </div>
                  <button className={`${pill} mt-6 text-black`} onClick={() => setFilter("payment_submitted")}>
                    Review now
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                {[
                  ["Orders", orders.length],
                  ["To dispatch", stats.toDispatch],
                  ["Customers", customers.length],
                  ["Products", products.length],
                ].map(([l, v]) => (
                  <div key={l as string} className={`${card} p-5`}>
                    <p className="text-3xl font-semibold">{v}</p>
                    <p className="mt-1 text-xs text-black/50">{l}</p>
                  </div>
                ))}
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="h-10 rounded-full bg-white px-4 text-sm shadow-sm"
              >
                <option value="all">All orders</option>
                {Object.entries(LABEL).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>

              {shown.length === 0 && <p className="text-black/50">No orders.</p>}
              {shown.map((o) => (
                <OrderCard key={o.id} o={o} onUpdate={updateOrder} />
              ))}
            </div>
          )}

          {/* ───────── PRODUCTS ───────── */}
          {tab === "products" && (
            <div className="space-y-5">
              <AddProduct onSaved={load} onError={handle} />
              <div className={`${card} overflow-x-auto`}>
                <table className="w-full text-sm">
                  <thead className="text-left text-xs uppercase tracking-widest text-black/50">
                    <tr>
                      <th className="p-4">Product</th>
                      <th className="p-4">Price (₹)</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Min qty</th>
                      <th className="p-4">Active</th>
                      <th className="p-4" />
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <ProductRow key={p.id} product={p} onSaved={load} onError={handle} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ───────── CUSTOMERS ───────── */}
          {/* ───────── DISPATCH ───────── */}
          {tab === "dispatch" && (
            <DispatchTable
              orders={orders.filter((o) => o.status === "paid" || o.status === "dispatched")}
              onUpdate={updateOrder}
            />
          )}

          {/* ───────── CUSTOMERS ───────── */}
          {/* ───────── DISPATCH ───────── */}
          {tab === "dispatch" && (
            <div className="space-y-5">
              <p className="text-sm text-black/60">Paid orders waiting to be shipped. Add courier and tracking, then mark dispatched.</p>
              {orders.filter((o) => o.status === "paid").length === 0 && <p className="text-black/50">Nothing to dispatch.</p>}
              {orders.filter((o) => o.status === "paid").map((o) => (
                <OrderCard key={o.id} o={o} onUpdate={updateOrder} />
              ))}
            </div>
          )}

          {/* ───────── CUSTOMERS ───────── */}
          {tab === "customers" && (
            <div className="space-y-5">
              <p className="text-xs font-bold uppercase tracking-widest text-black/50">Payments to verify</p>
              {orders.filter((o) => o.status === "payment_submitted").length === 0 && (
                <p className="text-black/50">No payments waiting.</p>
              )}
              {orders.filter((o) => o.status === "payment_submitted").map((o) => (
                <PaymentCheck key={o.id} o={o} onUpdate={updateOrder} />
              ))}
              <p className="pt-2 text-xs font-bold uppercase tracking-widest text-black/50">All customers</p>
            <div className={`${card} overflow-x-auto`}>
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-widest text-black/50">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Company</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Orders</th>
                    <th className="p-4">Total spent</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.length === 0 && (
                    <tr><td className="p-4 text-black/50" colSpan={6}>No customers yet.</td></tr>
                  )}
                  {customers.map((c) => (
                    <tr key={c.email} className="border-t border-black/5">
                      <td className="p-4 font-medium">{c.name}</td>
                      <td className="p-4">{c.company || "—"}</td>
                      <td className="p-4">{c.email}</td>
                      <td className="p-4">{c.phone}</td>
                      <td className="p-4">{c.orders}</td>
                      <td className="p-4">{rs(c.spent)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const btn = "rounded-md px-3 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-40";

function DispatchTable({ orders, onUpdate }: { orders: any[]; onUpdate: (id: number, p: Record<string, string>) => void }) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
      <table className="w-full text-sm">
        <thead className="bg-[#141414] text-left text-xs font-semibold uppercase text-white">
          <tr>
            <th className="p-3 text-center">S.No</th>
            <th className="p-3">Order</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Items to dispatch</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3">Courier / Tracking</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 && (
            <tr><td colSpan={8} className="p-4 text-black/50">Nothing to dispatch.</td></tr>
          )}
          {orders.map((o, i) => (
            <DispatchRow key={o.id} o={o} n={i + 1} onUpdate={onUpdate} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DispatchRow({ o, n, onUpdate }: { o: any; n: number; onUpdate: (id: number, p: Record<string, string>) => void }) {
  const [courier, setCourier] = useState("");
  const [tracking, setTracking] = useState("");
  const [open, setOpen] = useState(false);
  const paid = o.status === "paid";
  const inp = "h-8 w-28 rounded-md bg-[#f4f4f2] px-2 text-xs";

  return (
    <>
      <tr className="border-t border-black/5 even:bg-black/[0.02]">
        <td className="p-3 text-center">{n}</td>
        <td className="p-3 font-medium">{o.order_id}</td>
        <td className="p-3">{o.name}<br /><span className="text-xs text-black/50">{o.phone}</span></td>
        <td className="p-3 text-black/70">{o.items.map((i: any) => `${i.name} × ${i.quantity}`).join(", ")}</td>
        <td className="p-3">{rs(o.total)}</td>
        <td className="p-3">
          <span className={`rounded-md px-3 py-1 text-xs font-bold ${paid ? "bg-[#1e88ff] text-white" : "bg-[#00e676] text-black"}`}>
            {paid ? "To dispatch" : "Dispatched"}
          </span>
        </td>
        <td className="p-3">
          {paid ? (
            <div className="flex gap-2">
              <input className={inp} placeholder="Courier" value={courier} onChange={(e) => setCourier(e.target.value)} />
              <input className={inp} placeholder="Tracking no." value={tracking} onChange={(e) => setTracking(e.target.value)} />
            </div>
          ) : (
            <span className="text-xs">{o.courier || "—"} · {o.tracking_no || "—"}</span>
          )}
        </td>
        <td className="p-3">
          <div className="flex gap-2">
            {paid && (
              <button className={`${btn} bg-[#6366f1]`} onClick={() => onUpdate(o.id, { status: "dispatched", courier, tracking_no: tracking })}>
                Dispatch
              </button>
            )}
            <button className={`${btn} bg-[#1e88ff]`} onClick={() => setOpen(!open)}>{open ? "Hide" : "View"}</button>
            {paid && (
              <button
                className={`${btn} bg-[#e53935]`}
                onClick={() => {
                  if (confirm("Cancel this order? Stock is returned. If money was received, refund it manually."))
                    onUpdate(o.id, { status: "cancelled" });
                }}>
                Cancel
              </button>
            )}
          </div>
        </td>
      </tr>
      {open && (
        <tr className="bg-[#f4f4f2]">
          <td colSpan={8} className="p-4 text-sm">
            <p>{o.email}{o.company && ` · ${o.company}`}{o.gstin && ` (GSTIN ${o.gstin})`}</p>
            <p className="text-black/60">{o.address}, {o.city}, {o.state} - {o.pincode}</p>
            {o.notes && <p className="text-black/60">Notes: {o.notes}</p>}
            {o.utr && <p className="font-medium">UTR: {o.utr}</p>}
          </td>
        </tr>
      )}
    </>
  );
}

function Logo() {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <p className="text-lg font-bold">BigScrew</p>
  ) : (
    <img src={LOGO_SRC} alt="BigScrew" className="h-10 w-auto" onError={() => setFailed(true)} />
  );
}

function PaymentCheck({ o, onUpdate }: { o: any; onUpdate: (id: number, p: Record<string, string>) => void }) {
  return (
    <div className={`${card} flex flex-col gap-5 p-5 md:flex-row`}>
      <div className="md:w-64 md:shrink-0">
        {o.payment_screenshot ? (
          <a href={o.payment_screenshot} target="_blank" rel="noreferrer">
            <img src={o.payment_screenshot} alt={`Payment screenshot for ${o.order_id}`} className="max-h-72 w-full rounded-xl bg-[#f4f4f2] object-contain" />
          </a>
        ) : (
          <div className="flex h-40 items-center justify-center rounded-xl bg-[#f4f4f2] text-xs text-black/40">No screenshot uploaded</div>
        )}
      </div>
      <div className="flex-1 space-y-1 text-sm">
        <p className="font-semibold">{o.order_id} · {rs(o.total)}</p>
        <p>{o.name} · {o.phone}</p>
        <p>{o.email}</p>
        <p className="font-medium">UTR: {o.utr}</p>
        <p className="text-black/60">{o.items.map((i: any) => `${i.name} × ${i.quantity}`).join(", ")}</p>
        <div className="flex flex-wrap gap-2 pt-3">
          <button
            className={pill}
            onClick={() => {
              if (confirm(`Accept ${rs(o.total)} with UTR ${o.utr}? Check your bank / UPI app first.`))
                onUpdate(o.id, { status: "paid" });
            }}>
            Accept payment
          </button>
          <button
            className="rounded-full border border-black/20 px-4 py-2 text-xs font-bold uppercase hover:bg-black/5"
            onClick={() => {
              if (confirm("Reject and cancel this order? Stock is returned."))
                onUpdate(o.id, { status: "cancelled" });
            }}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

function RevenueChart({ days }: { days: { label: string; total: number }[] }) {
  const max = Math.max(...days.map((d) => d.total), 1);
  const pts = days.map((d, i) => `${(i / 6) * 600},${150 - (d.total / max) * 130}`);
  return (
    <div className="mt-4">
      <svg viewBox="0 0 600 160" preserveAspectRatio="none" className="h-36 w-full" role="img" aria-label="Revenue for the last 7 days">
        {[30, 80, 130].map((y) => (
          <line key={y} x1="0" x2="600" y1={y} y2={y} className="stroke-black/10" strokeWidth="1" />
        ))}
        <polyline points={pts.join(" ")} fill="none" className="stroke-yellow" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-1 flex justify-between text-[10px] uppercase text-black/40">
        {days.map((d, i) => <span key={i}>{d.label}</span>)}
      </div>
    </div>
  );
}

function OrderCard({ o, onUpdate }: { o: any; onUpdate: (id: number, p: Record<string, string>) => void }) {
  const [courier, setCourier] = useState("");
  const [tracking, setTracking] = useState("");
  const small = "h-9 rounded-full bg-[#f4f4f2] px-3 text-sm";

  return (
    <div className={`${card} p-5`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-semibold">{o.order_id} · {rs(o.total)}</p>
          <p className="text-xs text-black/50">{new Date(o.created_at).toLocaleString("en-IN")}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${o.status === "payment_submitted" ? "bg-yellow" : "bg-black/5"}`}>
          {LABEL[o.status] ?? o.status}
        </span>
      </div>

      <div className="mt-3 grid gap-4 text-sm md:grid-cols-2">
        <div>
          <p>{o.name} · {o.phone}</p>
          <p>{o.email}</p>
          {o.company && <p>{o.company} {o.gstin && `(GSTIN ${o.gstin})`}</p>}
          <p className="text-black/60">{o.address}, {o.city}, {o.state} - {o.pincode}</p>
          {o.notes && <p className="text-black/60">Notes: {o.notes}</p>}
        </div>
        <div>
          {o.items.map((i: any, k: number) => (
            <p key={k}>{i.name} × {i.quantity} — {rs(i.price * i.quantity)}</p>
          ))}
          <p className="mt-2 text-black/60">Subtotal {rs(o.subtotal)} + GST {rs(o.gst)}</p>
          {o.utr && <p className="font-medium">UTR: {o.utr} · expected {rs(o.total)}</p>}
          {o.tracking_no && <p className="font-medium">{o.courier} · {o.tracking_no}</p>}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {o.status === "payment_submitted" && (
          <button
            onClick={() => {
              if (confirm(`Did you see ${rs(o.total)} with UTR ${o.utr} in your bank / UPI app?`))
                onUpdate(o.id, { status: "paid" });
            }}
            className={pill}>
            Payment received – mark paid
          </button>
        )}

        {o.status === "paid" && (
          <>
            <input className={small} placeholder="Courier" value={courier} onChange={(e) => setCourier(e.target.value)} />
            <input className={small} placeholder="Tracking no." value={tracking} onChange={(e) => setTracking(e.target.value)} />
            <button
              onClick={() => onUpdate(o.id, { status: "dispatched", courier, tracking_no: tracking })}
              className={pill}>
              Mark dispatched
            </button>
          </>
        )}

        {(o.status === "payment_submitted" || o.status === "paid") && (
          <button
            onClick={() => {
              if (confirm("Cancel this order? Stock is returned. If money was received, refund it manually."))
                onUpdate(o.id, { status: "cancelled" });
            }}
            className="rounded-full border border-black/20 px-4 py-2 text-xs font-bold uppercase hover:bg-black/5">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

function AddProduct({ onSaved, onError }: { onSaved: () => void; onError: (e: unknown) => void }) {
  const empty = { name: "", description: "", price: "", stock: "", min_order_qty: "1" };
  const [f, setF] = useState(empty);
  const [saving, setSaving] = useState(false);
  const input = "h-10 rounded-full bg-[#f4f4f2] px-4 text-sm";

  const add = async () => {
    if (!f.name || !f.price) return onError(new Error("Name and price are required."));
    setSaving(true);
    try {
      await api("/admin/products/", {
        method: "POST",
        auth: true,
        body: JSON.stringify({
          name: f.name,
          description: f.description,
          price: Number(f.price),
          stock: Number(f.stock || 0),
          min_order_qty: Number(f.min_order_qty || 1),
          is_active: true,
        }),
      });
      setF(empty);
      onSaved();
    } catch (e) {
      onError(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`${card} p-5`}>
      <p className="mb-3 text-xs font-bold uppercase tracking-widest">Add product</p>
      <div className="flex flex-wrap gap-3">
        <input className={`${input} w-64`} placeholder="Product name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
        <input className={`${input} w-28`} type="number" min={0} placeholder="Price ₹" value={f.price} onChange={(e) => setF({ ...f, price: e.target.value })} />
        <input className={`${input} w-28`} type="number" min={0} placeholder="Stock" value={f.stock} onChange={(e) => setF({ ...f, stock: e.target.value })} />
        <input className={`${input} w-28`} type="number" min={1} placeholder="Min qty" value={f.min_order_qty} onChange={(e) => setF({ ...f, min_order_qty: e.target.value })} />
        <input className={`${input} w-full`} placeholder="Description" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />
        <button disabled={saving} onClick={add} className={pill}>
          {saving ? "Adding…" : "Add product"}
        </button>
      </div>
    </div>
  );
}

function ProductRow({ product, onSaved, onError }: { product: any; onSaved: () => void; onError: (e: unknown) => void }) {
  const [price, setPrice] = useState(String(product.price));
  const [stock, setStock] = useState(String(product.stock));
  const [minQty, setMinQty] = useState(String(product.min_order_qty));
  const [active, setActive] = useState<boolean>(product.is_active);
  const [busy, setBusy] = useState(false);

  const dirty =
    Number(price) !== product.price ||
    Number(stock) !== product.stock ||
    Number(minQty) !== product.min_order_qty ||
    active !== product.is_active;

  const save = async () => {
    setBusy(true);
    try {
      await api(`/admin/products/${product.id}/`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify({ price: Number(price), stock: Number(stock), min_order_qty: Number(minQty), is_active: active }),
      });
      onSaved();
    } catch (e) {
      onError(e);
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!confirm(`Delete "${product.name}"? Past orders keep their history.`)) return;
    setBusy(true);
    try {
      await api(`/admin/products/${product.id}/`, { method: "DELETE", auth: true });
      onSaved();
    } catch (e) {
      onError(e);
    } finally {
      setBusy(false);
    }
  };

  const input = "h-9 w-24 rounded-full bg-[#f4f4f2] px-3";
  return (
    <tr className="border-t border-black/5">
      <td className="p-4 font-medium">{product.name}</td>
      <td className="p-4"><input className={input} type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} /></td>
      <td className="p-4"><input className={input} type="number" min={0} value={stock} onChange={(e) => setStock(e.target.value)} /></td>
      <td className="p-4"><input className={input} type="number" min={1} value={minQty} onChange={(e) => setMinQty(e.target.value)} /></td>
      <td className="p-4"><input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} /></td>
      <td className="flex gap-2 p-4">
        <button disabled={!dirty || busy} onClick={save} className={pill}>
          {busy ? "…" : "Save"}
        </button>
        <button disabled={busy} onClick={remove}
          className="rounded-full border border-red-300 px-4 py-2 text-xs font-bold uppercase text-red-600 disabled:opacity-40">
          Delete
        </button>
      </td>
    </tr>
  );
}