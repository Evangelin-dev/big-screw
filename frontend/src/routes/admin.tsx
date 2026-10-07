import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { LayoutDashboard, Package, Truck, Users, type LucideIcon } from "lucide-react";
import { api, ApiError, clearToken, getToken } from "@/lib/api";
import logo from "/public/favicon.ico";

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

// Backend base URL, used to turn relative media paths (/media/...) into full URLs.
// Set VITE_API_URL in your .env (e.g. http://localhost:8000) or leave empty if same domain.
const API_BASE = ((import.meta as any).env?.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ?? "";

const mediaUrl = (u?: string | null) =>
  !u ? "" : /^(https?:|data:|blob:)/.test(u) ? u : `${API_BASE}${u.startsWith("/") ? "" : "/"}${u}`;

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

  const nav: { id: Tab; label: string; icon: LucideIcon }[] = [
    { id: "orders", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "dispatch", label: "Dispatch", icon: Truck },
    { id: "customers", label: "Customers", icon: Users },
  ];

  return (
    <div className="fixed inset-0 z-[9999] bg-[#f4f4f2] text-[#141414]">
      <div className="flex h-full w-full flex-col md:flex-row">
        {/* Sidebar (stays fixed; only the main area scrolls) */}
        <aside className="flex shrink-0 flex-row items-center gap-2 bg-white p-4 md:w-56 md:flex-col md:items-stretch md:gap-1 md:overflow-y-auto md:p-6">
          <div className="mr-auto md:mb-8 md:mr-0"><Logo /></div>
          {nav.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                tab === id ? "bg-yellow text-black" : "text-black/60 hover:bg-black/5"
              }`}
            >
              <Icon size={18} aria-hidden />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 space-y-5 overflow-y-auto p-4 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold capitalize">{tab === "orders" ? "Dashboard" : tab}</h1>
            <AdminMenu onLogout={() => { clearToken(); goLogin(); }} />
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

          {/* ───────── DISPATCH ───────── */}
          {tab === "dispatch" && (
            <DispatchTable
              orders={orders.filter((o) => o.status === "paid" || o.status === "dispatched")}
              onUpdate={updateOrder}
            />
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


/* Username chip (top right). Click to open a menu with the username and Log out */
function getUsername(): string {
  try {
    const t = getToken();
    if (!t) return "Admin";

    const payloadPart = t.split(".")[1];
    if (!payloadPart) return "Admin";

    const payload = JSON.parse(
      atob(payloadPart.replace(/-/g, "+").replace(/_/g, "/"))
    ) as {
      username?: string;
      user_name?: string;
      name?: string;
      email?: string;
    } | null;

    if (!payload || typeof payload !== "object") return "Admin";

    return payload.username ?? payload.user_name ?? payload.name ?? payload.email ?? "Admin";
  } catch {
    return "Admin"; // token is not a JWT
  }
}

function AdminMenu({ onLogout }: { onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const name = useMemo(getUsername, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`${card} flex items-center gap-2 px-3 py-2 text-xs font-semibold text-black/70`}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow text-[11px] font-bold text-black">
          {name.charAt(0).toUpperCase()}
        </span>
        <span className="hidden sm:inline">{name}</span>
        <span aria-hidden className="text-[10px]">▾</span>
      </button>

      {open && (
        <div role="menu" className={`${card} absolute right-0 z-50 mt-2 w-52 overflow-hidden`}>
          <div className="border-b border-black/5 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">Signed in as</p>
            <p className="mt-1 truncate text-sm font-semibold">{name}</p>
          </div>
          <button
            role="menuitem"
            onClick={onLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-black/5"
          >
            <span aria-hidden>⎋</span> Log out
          </button>
        </div>
      )}
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
            <button className={`${btn} bg-[#1e88ff]`} onClick={() => setOpen(true)}>View</button>
            {open && <OrderModal o={o} onClose={() => setOpen(false)} />}
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
    </>
  );
}

/* Centered popup with the full order details (opened from the Dispatch "View" button) */
function OrderModal({ o, onClose }: { o: any; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const shot = mediaUrl(o.payment_screenshot ?? o.screenshot ?? o.payment_proof);
  const row = "flex justify-between gap-4 py-1 text-sm";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Order ${o.order_id}`}
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white text-left text-[#141414] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b-4 border-yellow px-6 py-4">
          <div>
            <p className="text-lg font-semibold">{o.order_id}</p>
            <p className="text-xs text-black/60">
              {LABEL[o.status] ?? o.status} · {new Date(o.created_at).toLocaleString("en-IN")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none hover:bg-black/5"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5 overflow-y-auto p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1 text-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-black/60">Customer</p>
              <p className="font-semibold">{o.name}</p>
              <p>{o.phone}</p>
              <p>{o.email}</p>
              {o.company && <p>{o.company}</p>}
              {o.gstin && <p>GSTIN {o.gstin}</p>}
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-black/60">Delivery address</p>
              <p>{o.address}</p>
              <p>{o.city}, {o.state} - {o.pincode}</p>
              {o.notes && <p className="pt-1">Notes: {o.notes}</p>}
            </div>
          </div>

          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-black/60">Items</p>
            {o.items.map((i: any, k: number) => (
              <div key={k} className={row}>
                <span>{i.name} × {i.quantity}</span>
                <span>{rs(i.price * i.quantity)}</span>
              </div>
            ))}
            <div className="mt-2 border-t border-black/10 pt-2">
              <div className={row}><span>Subtotal</span><span>{rs(o.subtotal)}</span></div>
              <div className={row}><span>GST</span><span>{rs(o.gst)}</span></div>
              <div className={`${row} font-semibold`}><span>Total</span><span>{rs(o.total)}</span></div>
            </div>
          </div>

          {(o.courier || o.tracking_no) && (
            <div className="text-sm">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-black/60">Dispatch</p>
              <p>{o.courier || "—"} · {o.tracking_no || "—"}</p>
            </div>
          )}

          {shot && (
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-black/60">Payment screenshot</p>
              <a href={shot} target="_blank" rel="noreferrer">
                <img src={shot} alt={`Payment screenshot for ${o.order_id}`} className="max-h-64 rounded-xl bg-[#f4f4f2] object-contain" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* Logo on top, "BigScrew" name below it */
function Logo() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex flex-col items-center gap-1 md:items-start">
      {!failed && (
        <img
          src={logo}
          alt="BigScrew logo"
          className="h-10 w-auto md:h-14"
          onError={() => setFailed(true)}
        />
      )}
      <p className="hidden text-lg font-bold leading-none sm:block">BigScrew</p>
    </div>
  );
}

function PaymentCheck({ o, onUpdate }: { o: any; onUpdate: (id: number, p: Record<string, string>) => void }) {
  // Tries a few likely field names from the API, and fixes relative /media/ paths
  const shot = mediaUrl(o.payment_screenshot ?? o.screenshot ?? o.payment_proof);
  const [broken, setBroken] = useState(false);

  return (
    <div className={`${card} flex flex-col gap-5 p-5 md:flex-row`}>
      <div className="md:w-64 md:shrink-0">
        {shot && !broken ? (
          <a href={shot} target="_blank" rel="noreferrer">
            <img
              src={shot}
              alt={`Payment screenshot for ${o.order_id}`}
              className="max-h-72 w-full rounded-xl bg-[#f4f4f2] object-contain"
              onError={() => setBroken(true)}
            />
          </a>
        ) : (
          <div className="flex h-40 items-center justify-center rounded-xl bg-[#f4f4f2] px-3 text-center text-xs text-black/40">
            {broken ? "Screenshot could not be loaded" : "No screenshot uploaded"}
          </div>
        )}
      </div>
      <div className="flex-1 space-y-1 text-sm">
        <p className="font-semibold">{o.order_id} · {rs(o.total)}</p>
        <p>{o.name} · {o.phone}</p>
        <p>{o.email}</p>
        <p className="text-black/60">{o.items.map((i: any) => `${i.name} × ${i.quantity}`).join(", ")}</p>
        <div className="flex flex-wrap gap-2 pt-3">
          <button
            className={pill}
            onClick={() => {
              if (confirm(`Accept ${rs(o.total)}? Check the amount in your bank / UPI app first.`))
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
          {o.status === "payment_submitted" && <p className="font-medium">Expected amount: {rs(o.total)}</p>}
          {o.tracking_no && <p className="font-medium">{o.courier} · {o.tracking_no}</p>}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {o.status === "payment_submitted" && (
          <button
            onClick={() => {
              if (confirm(`Did you receive ${rs(o.total)} in your bank / UPI app?`))
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

/* ------------------------------------------------------------------ */
/* Add product: same sections, in the same order, as the product page  */
/* ------------------------------------------------------------------ */

type Pair = { k: string; v: string };
type GalleryItem = { file: File; label: string };

const fieldCls = "h-10 w-full rounded-full bg-[#f4f4f2] px-4 text-sm";
const areaCls = "w-full rounded-2xl bg-[#f4f4f2] px-4 py-3 text-sm";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const lines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);

function Field({ label, hint, className = "", children }: { label: string; hint?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-semibold text-black/60">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-black/40">{hint}</span>}
    </label>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 border-b border-black/10 pb-2 text-xs font-bold uppercase tracking-widest">{children}</h3>;
}

function Thumb({ file, className }: { file: File; className?: string }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);
  return url ? <img src={url} alt={file.name} className={className} /> : null;
}

function PairRows({
  rows,
  onChange,
  keyPh,
  valPh,
  addLabel,
}: {
  rows: Pair[];
  onChange: (r: Pair[]) => void;
  keyPh: string;
  valPh: string;
  addLabel: string;
}) {
  const set = (i: number, patch: Partial<Pair>) =>
    onChange(rows.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="flex gap-2">
          <input className={`${fieldCls} w-40 shrink-0`} placeholder={keyPh} value={r.k} onChange={(e) => set(i, { k: e.target.value })} />
          <input className={fieldCls} placeholder={valPh} value={r.v} onChange={(e) => set(i, { v: e.target.value })} />
          <button
            type="button"
            aria-label="Remove row"
            onClick={() => onChange(rows.filter((_, j) => j !== i))}
            className="h-10 w-10 shrink-0 rounded-full border border-black/15 text-sm text-black/50 hover:bg-black/5"
          >
            ✕
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...rows, { k: "", v: "" }])} className="text-xs font-bold uppercase underline underline-offset-4">
        + {addLabel}
      </button>
    </div>
  );
}

const emptyForm = {
  name: "",
  slug: "",
  badge: "",
  summary: "",
  description: "",
  overview: "",
  price: "",
  mrp: "",
  stock: "",
  min_order_qty: "1",
  features: "",
  applications: "",
  is_active: true,
};

function AddProduct({ onSaved, onError }: { onSaved: () => void; onError: (e: unknown) => void }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState(emptyForm);
  const [specs, setSpecs] = useState<Pair[]>([{ k: "", v: "" }]);
  const [steps, setSteps] = useState<Pair[]>([{ k: "", v: "" }]);
  const [image, setImage] = useState<File | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const set = (patch: Partial<typeof emptyForm>) => setF((x) => ({ ...x, ...patch }));
  const autoSlug = slugify(f.name);

  const reset = () => {
    setF(emptyForm);
    setSpecs([{ k: "", v: "" }]);
    setSteps([{ k: "", v: "" }]);
    setImage(null);
    setGallery([]);
    setFormError("");
  };

  const submit = async () => {
    setFormError("");
    if (!f.name.trim()) return setFormError("Product name is required.");
    if (!f.price || Number(f.price) <= 0) return setFormError("Enter a price greater than 0.");
    if (f.mrp && Number(f.mrp) < Number(f.price)) return setFormError("M.R.P. should not be lower than the price.");
    if (Number(f.min_order_qty || 1) < 1) return setFormError("Minimum order must be at least 1.");

    const fd = new FormData();
    fd.append("name", f.name.trim());
    fd.append("slug", f.slug.trim() ? slugify(f.slug) : autoSlug);
    fd.append("description", f.description.trim()); // short card text
    fd.append("summary", f.summary.trim());
    fd.append("overview", f.overview.trim());
    fd.append("badge", f.badge.trim());
    fd.append("price", String(Number(f.price)));
    if (f.mrp) fd.append("mrp", String(Number(f.mrp)));
    fd.append("stock", String(Number(f.stock || 0)));
    fd.append("min_order_qty", String(Number(f.min_order_qty || 1)));
    fd.append("is_active", f.is_active ? "true" : "false");
    fd.append("features", JSON.stringify(lines(f.features)));
    fd.append("applications", JSON.stringify(lines(f.applications)));
    fd.append(
      "specs",
      JSON.stringify(specs.filter((r) => r.k.trim() && r.v.trim()).map((r) => [r.k.trim(), r.v.trim()])),
    );
    fd.append(
      "install_steps",
      JSON.stringify(steps.filter((r) => r.k.trim()).map((r) => [r.k.trim(), r.v.trim()])),
    );
    if (image) fd.append("image", image);
    gallery.forEach((g) => fd.append("gallery", g.file));
    fd.append("gallery_labels", JSON.stringify(gallery.map((g) => g.label.trim())));

    setSaving(true);
    try {
      await api("/admin/products/", { method: "POST", auth: true, body: fd });
      reset();
      setOpen(false);
      onSaved();
    } catch (e) {
      onError(e);
    } finally {
      setSaving(false);
    }
  };

  if (!open) {
    return (
      <div className={`${card} flex items-center justify-between p-5`}>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest">Add product</p>
          <p className="mt-1 text-xs text-black/50">Fill in the same sections the customer sees on the product page.</p>
        </div>
        <button className={pill} onClick={() => setOpen(true)}>+ New product</button>
      </div>
    );
  }

  return (
    <div className={`${card} space-y-8 p-5 md:p-6`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-widest">Add product</p>
        <button className="text-xs font-bold uppercase text-black/50 hover:text-black" onClick={() => { reset(); setOpen(false); }}>
          Cancel
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr_280px]">
        {/* Column 1: images (product page left column) */}
        <section>
          <SectionTitle>Images</SectionTitle>
          <p className="mb-2 text-xs font-semibold text-black/60">Main image</p>
          {image ? (
            <div className="relative">
              <Thumb file={image} className="aspect-square w-full rounded-xl bg-[#f4f4f2] object-contain p-3" />
              <button type="button" onClick={() => setImage(null)} className="absolute right-2 top-2 rounded-full bg-white px-3 py-1 text-xs font-bold shadow">
                Remove
              </button>
            </div>
          ) : (
            <label className="flex aspect-square cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-black/15 bg-[#f4f4f2] text-center text-xs text-black/50 hover:border-black/30">
              Click to choose the main image
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setImage(e.target.files?.[0] ?? null)} />
            </label>
          )}

          <p className="mb-2 mt-5 text-xs font-semibold text-black/60">More views (front, top, round post...)</p>
          <div className="space-y-2">
            {gallery.map((g, i) => (
              <div key={i} className="flex items-center gap-2">
                <Thumb file={g.file} className="h-12 w-12 shrink-0 rounded-md bg-[#f4f4f2] object-contain" />
                <input
                  className={fieldCls}
                  placeholder="Label, e.g. Front view"
                  value={g.label}
                  onChange={(e) => setGallery(gallery.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
                />
                <button type="button" aria-label="Remove image" onClick={() => setGallery(gallery.filter((_, j) => j !== i))} className="h-10 w-10 shrink-0 rounded-full border border-black/15 text-sm text-black/50 hover:bg-black/5">
                  ✕
                </button>
              </div>
            ))}
            <label className="inline-block cursor-pointer text-xs font-bold uppercase underline underline-offset-4">
              + Add images
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? []);
                  setGallery((g) => [...g, ...files.map((file) => ({ file, label: "" }))]);
                  e.currentTarget.value = "";
                }}
              />
            </label>
          </div>
        </section>

        {/* Column 2: details (title, price, specs table, about this item) */}
        <section className="space-y-6">
          <div>
            <SectionTitle>Title &amp; price</SectionTitle>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Product name *" className="sm:col-span-2">
                <input className={fieldCls} value={f.name} onChange={(e) => set({ name: e.target.value })} placeholder="Fencing BigScrew pile" />
              </Field>
              <Field label="Short headline" hint={`Page title shows: "${f.name || "Name"} | ${f.summary || "headline"}"`} className="sm:col-span-2">
                <input className={fieldCls} value={f.summary} onChange={(e) => set({ summary: e.target.value })} placeholder="76 mm × 900 mm screw pile for fence posts" />
              </Field>
              <Field label="Badge (optional)">
                <input className={fieldCls} value={f.badge} onChange={(e) => set({ badge: e.target.value })} placeholder="Life up to 10 years" />
              </Field>
              <Field label="Page address (slug)" hint={`/products/${f.slug.trim() ? slugify(f.slug) : autoSlug || "..."}`}>
                <input className={fieldCls} value={f.slug} onChange={(e) => set({ slug: e.target.value })} placeholder={autoSlug || "auto from name"} />
              </Field>
              <Field label="Price per piece (₹, ex-GST) *">
                <input className={fieldCls} type="number" min={0} value={f.price} onChange={(e) => set({ price: e.target.value })} />
              </Field>
              <Field label="M.R.P. (₹, optional)" hint="Shows a strike-through price and discount %">
                <input className={fieldCls} type="number" min={0} value={f.mrp} onChange={(e) => set({ mrp: e.target.value })} />
              </Field>
            </div>
          </div>

          <div>
            <SectionTitle>Specs table</SectionTitle>
            <PairRows rows={specs} onChange={setSpecs} keyPh="e.g. Length" valPh="e.g. 900 mm (3 ft)" addLabel="Add spec row" />
          </div>

          <div>
            <SectionTitle>About this item</SectionTitle>
            <Field label="Key features, one per line">
              <textarea className={areaCls} rows={5} value={f.features} onChange={(e) => set({ features: e.target.value })} placeholder={"No digging, no concrete, no curing\nBolts on the same day"} />
            </Field>
          </div>
        </section>

        {/* Column 3: buy box */}
        <section className="h-fit rounded-xl border border-black/10 p-4">
          <SectionTitle>Buy box</SectionTitle>
          <div className="space-y-3">
            <Field label="Stock (pieces)">
              <input className={fieldCls} type="number" min={0} value={f.stock} onChange={(e) => set({ stock: e.target.value })} />
            </Field>
            <Field label="Minimum order (pieces)">
              <input className={fieldCls} type="number" min={1} value={f.min_order_qty} onChange={(e) => set({ min_order_qty: e.target.value })} />
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={f.is_active} onChange={(e) => set({ is_active: e.target.checked })} />
              Show in the shop
            </label>
          </div>
        </section>
      </div>

      {/* Below: description, best used for, how it is installed */}
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <section>
          <SectionTitle>Product description</SectionTitle>
          <div className="space-y-3">
            <Field label="Full description">
              <textarea className={areaCls} rows={5} value={f.overview} onChange={(e) => set({ overview: e.target.value })} />
            </Field>
            <Field label="Short text for the shop list" hint="One or two sentences shown on the products page">
              <textarea className={areaCls} rows={2} value={f.description} onChange={(e) => set({ description: e.target.value })} />
            </Field>
          </div>
        </section>
        <section>
          <SectionTitle>Best used for</SectionTitle>
          <Field label="One per line">
            <textarea className={areaCls} rows={5} value={f.applications} onChange={(e) => set({ applications: e.target.value })} placeholder={"fence posts\nfarm fencing"} />
          </Field>
        </section>
      </div>

      <section>
        <SectionTitle>How it is installed</SectionTitle>
        <PairRows rows={steps} onChange={setSteps} keyPh="Step, e.g. Drive" valPh="What happens in this step" addLabel="Add step" />
      </section>

      {formError && <p className="text-sm font-medium text-red-600" aria-live="polite">{formError}</p>}

      <div className="flex gap-3">
        <button disabled={saving} onClick={submit} className={pill}>
          {saving ? "Adding…" : "Add product"}
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => { reset(); setOpen(false); }}
          className="rounded-full border border-black/20 px-4 py-2 text-xs font-bold uppercase hover:bg-black/5 disabled:opacity-40"
        >
          Cancel
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
    Number(price) !== Number(product.price) ||
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
      <td className="p-4 font-medium">
        {product.name}
        {product.slug && <span className="block text-xs font-normal text-black/40">/{product.slug}</span>}
      </td>
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