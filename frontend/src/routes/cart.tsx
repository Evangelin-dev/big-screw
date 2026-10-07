import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "../assets/5.png";

import { rupees, useCart } from "@/lib/shop";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-black/50";
const ctaPrimary =
  "flex h-12 w-full items-center justify-center gap-2 rounded-full bg-yellow text-xs font-bold uppercase tracking-[0.15em] text-black transition-colors hover:bg-yellow-deep";

const stepBtn =
  "flex h-10 w-10 shrink-0 items-center justify-center text-[#141414] transition-colors hover:bg-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent";

/**
 * Quantity box with  –  [ number ]  +  buttons.
 * The number can also be typed in: it commits on blur or Enter and never goes
 * below the minimum order. If the customer types less than the minimum, the
 * value snaps up to the minimum and a red "Minimum order N pieces" message shows.
 * `onCommit` fires on every commit or button press (even if the value didn't
 * change), so the parent knows the customer has actually entered a quantity.
 */
function QtyInput({
  quantity,
  min,
  onChange,
  onCommit,
}: {
  quantity: number;
  min: number;
  onChange: (q: number) => void;
  onCommit: () => void;
}) {
  const [draft, setDraft] = useState(String(quantity));
  const [belowMin, setBelowMin] = useState(false);

  useEffect(() => {
    setDraft(String(quantity));
  }, [quantity]);

  const commit = () => {
    const n = parseInt(draft, 10);
    const tooLow = Number.isFinite(n) && n < min;
    const next = Number.isFinite(n) ? Math.max(min, n) : quantity;

    setBelowMin(tooLow); // show the red message if they entered less than the minimum
    setDraft(String(next));
    if (next !== quantity) onChange(next);
    onCommit();
  };

  // + / – buttons change the quantity by 1 (never below the minimum order)
  const bump = (delta: number) => {
    const current = parseInt(draft, 10);
    const base = Number.isFinite(current) ? current : quantity;
    const next = Math.max(min, base + delta);
    setBelowMin(false);
    setDraft(String(next));
    if (next !== quantity) onChange(next);
    onCommit();
  };

  const atMin = (parseInt(draft, 10) || quantity) <= min;

  return (
    <div className="inline-flex flex-col">
      <div className="inline-flex items-center gap-3">
        <span className={eyebrow}>Qty</span>
        <div
          className={`inline-flex items-center overflow-hidden rounded-md border bg-[#f4f4f2] ${
            belowMin ? "border-red-600" : "border-black/15"
          }`}
        >
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => bump(-1)}
            disabled={atMin}
            className={stepBtn}
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            aria-label="Quantity"
            aria-invalid={belowMin}
            value={draft}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "");
              setDraft(v);
              // clear the error as soon as they type a valid quantity
              if (belowMin && parseInt(v, 10) >= min) setBelowMin(false);
            }}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur();
              if (e.key === "ArrowUp") {
                e.preventDefault();
                bump(1);
              }
              if (e.key === "ArrowDown") {
                e.preventDefault();
                bump(-1);
              }
            }}
            onFocus={(e) => e.currentTarget.select()}
            className="h-10 w-16 border-x border-black/15 bg-white text-center font-semibold text-[#141414] focus:outline-none"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => bump(1)}
            className={stepBtn}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      {belowMin && (
        <p role="alert" className="mt-1 text-xs font-semibold text-red-600">
          Minimum order {min} pieces
        </p>
      )}
    </div>
  );
}

function CartPage() {
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);

  // Slugs of products whose quantity the customer has entered on this page.
  // Prices stay hidden for a product until its slug is in this set.
  const [entered, setEntered] = useState<Set<string>>(() => new Set());
  const markEntered = (slug: string) =>
    setEntered((prev) => (prev.has(slug) ? prev : new Set(prev).add(slug)));

  const enteredLines = lines.filter((l) => entered.has(l.slug));
  const total = enteredLines.reduce((sum, l) => sum + l.price * l.quantity, 0);

  return (
    <>
      {/* ───────── Image banner (separate section) ───────── */}
      <header className="relative overflow-hidden bg-black pb-14 pt-28 text-white md:pb-20 md:pt-40">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* left-to-right wash keeps the heading readable */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10"
        />
        {/* bottom fade blends the image into black */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
        />

        <div className="shell relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            BigScrew / Engineered Foundations
          </p>
          <h1 className="mt-2 text-4xl font-semibold uppercase leading-[1.05] tracking-tight md:text-5xl">
            Your order,
            <br />
            <span className="inline-block bg-yellow px-2 text-black">ready to drive.</span>
          </h1>
        </div>
      </header>

      {/* ───────── Cart content (separate light section) ───────── */}
      <section className="border-t-4 border-yellow bg-[#f4f4f2] pb-12 pt-10 text-[#141414]">
        <div className="shell">
          {lines.length === 0 ? (
            <div className="rounded-lg border border-black/10 bg-white p-10 text-center">
              <p className={eyebrow}>Cart / 00 items</p>
              <p className="mt-3 text-lg">Nothing in your cart yet.</p>
              <Link
                to={"/products" as any}
                className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-yellow px-7 text-xs font-bold uppercase tracking-[0.15em] text-black hover:bg-yellow-deep"
              >
                Shop products <span aria-hidden>→</span>
              </Link>
            </div>
          ) : (
            <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
              {/* Lines */}
              <ul className="divide-y divide-black/10 rounded-lg border border-black/10 bg-white">
                {lines.map((l, i) => {
                  const step = l.minOrder ?? 1;
                  const hasQty = entered.has(l.slug);
                  return (
                    <li key={l.slug} className="flex flex-wrap gap-4 p-4 sm:flex-nowrap sm:p-5">
                      <span className="hidden h-6 w-8 shrink-0 items-center justify-center rounded bg-yellow text-xs font-bold text-black sm:flex">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <Link
                        to={"/products/$slug" as any}
                        params={{ slug: l.slug } as any}
                        className="block h-28 w-28 shrink-0 overflow-hidden rounded-md border border-black/10 bg-white"
                      >
                        <img
                          src={l.image}
                          alt={l.name}
                          className="block h-full w-full object-contain"
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <Link
                          to={"/products/$slug" as any}
                          params={{ slug: l.slug } as any}
                          className="text-lg font-semibold hover:underline"
                        >
                          {l.name}
                        </Link>
                        {hasQty && (
                          <p className="mt-1 text-sm text-black/60">{rupees(l.price)} per piece</p>
                        )}
                        {step > 1 && (
                          <p className={`${eyebrow} mt-2`}>Min. order · {step} pieces</p>
                        )}

                        <div className="mt-3 flex flex-wrap items-start gap-5">
                          <QtyInput
                            quantity={l.quantity}
                            min={step}
                            onChange={(q) => setQty(l.slug, q)}
                            onCommit={() => markEntered(l.slug)}
                          />
                          <button
                            type="button"
                            onClick={() => remove(l.slug)}
                            className="inline-flex h-10 items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-black/50 transition-colors hover:text-black hover:underline"
                          >
                            <Trash2 className="h-4 w-4" /> Remove
                          </button>
                        </div>
                      </div>

                      {hasQty && (
                        <p className="text-lg font-semibold">{rupees(l.price * l.quantity)}</p>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Summary */}
              <aside className="rounded-lg border border-black/10 bg-white p-5 lg:sticky lg:top-28">
                <p className={eyebrow}>Order summary</p>
                <div className="mt-4 flex items-baseline justify-between border-b-2 border-yellow pb-3">
                  <span className={eyebrow}>Total</span>
                  <span className="text-2xl font-semibold">
                    {enteredLines.length > 0 ? rupees(total) : "—"}
                  </span>
                </div>
                <p className="mt-2 text-xs text-black/50">
                  {enteredLines.length === 0
                    ? "Enter a quantity to see the price."
                    : "Freight is confirmed after you order."}
                </p>

                <Link to={"/checkout" as any} className={`${ctaPrimary} mt-5`}>
                  Proceed to checkout <span aria-hidden>→</span>
                </Link>
                <Link
                  to={"/products" as any}
                  className="mt-3 block text-center text-xs font-semibold uppercase tracking-[0.15em] text-black/50 transition-colors hover:text-black hover:underline"
                >
                  ← Continue shopping
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}