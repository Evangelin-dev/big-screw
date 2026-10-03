import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import { api } from "../lib/api";
import { useCart } from "../lib/shop";

type PayState =
  | "PENDING"
  | "PAYMENT_SUBMITTED"
  | "CONFIRMED"
  | "DISPATCHED"
  | "EXPIRED"
  | "REJECTED";

type StatusResponse = {
  state: PayState;
  upi_link?: string;
  qr?: string;
  amount_paise?: number;
  expires_at?: string;
};

export const Route = createFileRoute("/payment")({
  validateSearch: (s: Record<string, unknown>) => ({
    order: typeof s["order"] === "string" ? (s["order"] as string) : "",
    token: typeof s["token"] === "string" ? (s["token"] as string) : "",
  }),
  component: PaymentPage,
});

const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-black/50";
const ctaPrimary =
  "flex h-12 w-full items-center justify-center gap-2 rounded-full bg-yellow text-xs font-bold uppercase tracking-[0.15em] text-black transition-colors hover:bg-yellow-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-60";
const ctaSecondary =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/20 px-7 text-xs font-bold uppercase tracking-[0.15em] text-black transition-colors hover:bg-black/5";

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-neutral-900 p-4">
      {children}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-xl border border-black/10 bg-white text-[#141414] shadow-2xl">
      {children}
    </div>
  );
}

const mmss = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

function clearCart() {
  try {
    const s: any = (useCart as any).getState();
    (s.clear ?? s.clearCart ?? s.reset)?.();
  } catch {
    /* cart helper name differs – harmless */
  }
}

function PaymentPage() {
  const { order, token } = Route.useSearch();

  const [data, setData] = useState<StatusResponse | null>(null);
  const [loadError, setLoadError] = useState("");
  const [utr, setUtr] = useState("");
  const [utrError, setUtrError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  const fetchStatus = useCallback(async () => {
    if (!order || !token) {
      setLoadError("This payment link is incomplete. Please place your order again.");
      return;
    }
    try {
      const res = (await api("/orders/status/", {
        method: "POST",
        body: JSON.stringify({ order_id: order, public_token: token }),
      })) as StatusResponse;
      setData(res);
      setLoadError("");
    } catch (err: any) {
      setLoadError(err?.message || "Could not load payment details.");
    }
  }, [order, token]);

  // First load
  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // After the UTR is submitted, poll until the admin confirms / dispatches
  useEffect(() => {
    if (data?.state !== "PAYMENT_SUBMITTED" && data?.state !== "CONFIRMED") return;
    const id = setInterval(fetchStatus, 5000);
    return () => clearInterval(id);
  }, [data?.state, fetchStatus]);

  // Countdown while the QR is shown
  useEffect(() => {
    if (data?.state !== "PENDING" || !data.expires_at) return;
    const end = new Date(data.expires_at).getTime();
    let retry: ReturnType<typeof setTimeout> | undefined;
    const tick = () => {
      const s = Math.max(0, Math.floor((end - Date.now()) / 1000));
      setSecondsLeft(s);
      if (s === 0) {
        clearInterval(id);
        retry = setTimeout(fetchStatus, 2000); // let the server mark it expired
      }
    };
    const id = setInterval(tick, 1000);
    tick();
    return () => {
      clearInterval(id);
      if (retry) clearTimeout(retry);
    };
  }, [data, fetchStatus]);

  const submitUtr = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!/^\d{12}$/.test(utr)) {
      setUtrError("Enter the 12-digit UTR / UPI reference number.");
      return;
    }
    setSubmitting(true);
    setUtrError("");
    try {
      const form = new FormData();
      form.append("order_id", order);
      form.append("public_token", token);
      form.append("utr", utr);
      if (file) form.append("screenshot", file);
      await api("/orders/pay/", { method: "POST", body: form });
      clearCart();
      await fetchStatus();
    } catch (err: any) {
      setUtrError(err?.message || "Could not submit payment details. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ───────── Error / loading ─────────
  if (loadError && !data) {
    return (
      <Overlay>
        <Card>
          <div className="p-10 text-center">
            <p className={eyebrow}>Payment</p>
            <p className="mt-3 text-lg">{loadError}</p>
            <div className="mt-6 flex justify-center gap-3">
              <button type="button" onClick={fetchStatus} className={ctaSecondary}>
                Retry
              </button>
              <Link to={"/cart" as any} className={ctaSecondary}>
                Back to cart
              </Link>
            </div>
          </div>
        </Card>
      </Overlay>
    );
  }

  if (!data) {
    return (
      <Overlay>
        <Card>
          <p className="p-10 text-center text-black/60">Loading payment details…</p>
        </Card>
      </Overlay>
    );
  }

  // ───────── Final / waiting states ─────────
  const message: Record<Exclude<PayState, "PENDING">, { title: string; body: string }> = {
    PAYMENT_SUBMITTED: {
      title: "Verifying your payment",
      body: "We received your UTR and are checking it. This page updates automatically, and we will also email you once it is confirmed.",
    },
    CONFIRMED: {
      title: "Payment confirmed",
      body: "Thank you! Your payment is verified and a confirmation email is on its way. We will dispatch your order soon.",
    },
    DISPATCHED: {
      title: "Order dispatched",
      body: "Your order is on its way. Courier and tracking details are in your email.",
    },
    EXPIRED: {
      title: "This order expired",
      body: "The payment window closed before payment was submitted. The items were released, so please place the order again.",
    },
    REJECTED: {
      title: "Payment could not be verified",
      body: "We could not match your payment, and the order was cancelled. If money was debited, contact us with your UTR and we will sort it out.",
    },
  };

  if (data.state !== "PENDING") {
    const m = message[data.state];
    const good = data.state === "CONFIRMED" || data.state === "DISPATCHED";
    const bad = data.state === "EXPIRED" || data.state === "REJECTED";
    return (
      <Overlay>
        <Card>
          <div className="border-b-4 border-yellow px-6 py-4">
            <p className={eyebrow}>Step 2 of 2</p>
            <h1 className="text-xl font-semibold">{m.title}</h1>
          </div>
          <div className="space-y-6 p-6 text-center">
            <div
              aria-hidden
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl ${
                good ? "bg-green-100 text-green-700" : bad ? "bg-red-100 text-red-700" : "bg-yellow/40"
              }`}
            >
              {good ? "✓" : bad ? "✕" : "…"}
            </div>
            <p className="text-sm leading-relaxed text-black/70">{m.body}</p>
            <p className="text-xs text-black/50">Order ID: {order}</p>
            <Link to={(bad ? "/cart" : "/products") as any} className={ctaSecondary}>
              {bad ? "Back to cart" : "Continue shopping"}
            </Link>
          </div>
        </Card>
      </Overlay>
    );
  }

  // ───────── Pending: show QR + UTR form ─────────
  const amount = ((data.amount_paise ?? 0) / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return (
    <Overlay>
      <Card>
        <div className="flex items-center justify-between border-b-4 border-yellow px-5 py-4 sm:px-6">
          <div>
            <p className={eyebrow}>Step 2 of 2</p>
            <h1 className="text-xl font-semibold">Pay with UPI</h1>
          </div>
          {secondsLeft !== null && (
            <p
              className={`text-sm font-semibold tabular-nums ${
                secondsLeft < 120 ? "text-red-600" : "text-black/60"
              }`}
              aria-live="off"
            >
              {mmss(secondsLeft)}
            </p>
          )}
        </div>

        <div className="space-y-6 overflow-y-auto p-5 sm:p-6">
          <div className="text-center">
            <p className={eyebrow}>Amount to pay</p>
            <p className="mt-1 text-3xl font-semibold">{amount}</p>
            <p className="mt-1 text-xs text-black/50">Order ID: {order}</p>
          </div>

          {data.qr && (
            <img
              src={data.qr}
              alt={`UPI QR code for ${amount}`}
              className="mx-auto h-56 w-56 rounded-lg border border-black/10 p-2"
            />
          )}

          {data.upi_link && (
            <a href={data.upi_link} className={`${ctaSecondary} w-full sm:hidden`}>
              Open in UPI app
            </a>
          )}

          <p className="text-center text-sm text-black/60">
            Scan with any UPI app and pay the exact amount. Then enter the 12-digit UTR / reference
            number from the payment receipt.
          </p>

          <form onSubmit={submitUtr} noValidate className="space-y-4">
            <label className={`block ${eyebrow}`}>
              UTR / reference number
              <input
                value={utr}
                onChange={(e) => {
                  setUtr(e.target.value.replace(/\D/g, "").slice(0, 12));
                  if (utrError) setUtrError("");
                }}
                inputMode="numeric"
                maxLength={12}
                placeholder="123456789012"
                aria-invalid={!!utrError}
                aria-describedby={utrError ? "utr-error" : undefined}
                className={`mt-1.5 h-11 w-full rounded-md border bg-[#f4f4f2] px-3 text-sm font-normal normal-case tracking-normal text-[#141414] placeholder:text-black/30 focus:border-black focus:bg-white focus:outline-none ${
                  utrError ? "border-red-600" : "border-black/15"
                }`}
              />
              {utrError && (
                <span
                  id="utr-error"
                  role="alert"
                  className="mt-1 block text-xs font-normal normal-case tracking-normal text-red-600"
                >
                  {utrError}
                </span>
              )}
            </label>

            <label className={`block ${eyebrow}`}>
              Payment screenshot (optional)
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="mt-1.5 block w-full text-sm font-normal normal-case tracking-normal text-black/70 file:mr-3 file:rounded-full file:border-0 file:bg-yellow file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase"
              />
            </label>

            <button type="submit" disabled={submitting} className={ctaPrimary}>
              {submitting ? "Submitting..." : "I have paid"}
            </button>
          </form>
        </div>
      </Card>
    </Overlay>
  );
}