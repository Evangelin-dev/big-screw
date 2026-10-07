import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { api } from "../lib/api";
import { useCart, useCheckout, type CustomerDetails } from "../lib/shop";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

type CheckoutFormValues = CustomerDetails & {
  landmark?: string;
};

type Errors = Partial<Record<keyof CheckoutFormValues, string>>;

const GSTIN_RE = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

const EMPTY_DETAILS: CheckoutFormValues = {
  name: "",
  phone: "",
  email: "",
  company: "",
  gstin: "",
  address: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
};

function validate(v: CheckoutFormValues): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Enter your full name.";
  if (!/^[6-9]\d{9}$/.test(v.phone)) e.phone = "Enter a 10-digit Indian mobile number.";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email address.";
  if (v.gstin && !GSTIN_RE.test(v.gstin)) e.gstin = "GSTIN should be 15 characters, e.g. 22AAAAA0000A1Z5.";
  if (v.address.trim().length < 8) e.address = "Enter the full delivery address.";
  if (v.city.trim().length < 2) e.city = "Enter the city.";
  if (v.state.trim().length < 2) e.state = "Enter the state.";
  if (!/^\d{6}$/.test(v.pincode)) e.pincode = "Enter a 6-digit PIN code.";
  return e;
}

const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-black";
const fieldClass =
  "mt-1.5 h-11 w-full rounded-md border bg-[#f4f4f2] px-3 text-sm font-normal normal-case tracking-normal text-black placeholder:text-black/50 focus:border-black focus:bg-white focus:outline-none";
const ctaPrimary =
  "flex h-12 w-full items-center justify-center gap-2 rounded-full bg-yellow text-xs font-bold uppercase tracking-[0.15em] text-black transition-colors hover:bg-yellow-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-60";

/** Full-screen layer that sits above the site navbar/footer. */
function Overlay({
  children,
  onBackdropClick,
}: {
  children: React.ReactNode;
  onBackdropClick?: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-neutral-900 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onBackdropClick?.();
      }}
    >
      {children}
    </div>
  );
}

// Fetch the slugs of products the backend currently sells.
// Returns null if the check can't be done (so checkout is never blocked by it).
async function fetchAvailableSlugs(): Promise<Set<string> | null> {
  try {
    const res: any = await api("/products/");
    const list: any[] = Array.isArray(res) ? res : res?.results ?? [];
    if (list.length === 0) return null;
    return new Set(list.filter((p) => p.is_active !== false).map((p) => p.slug));
  } catch {
    return null;
  }
}

function CheckoutPage() {
  const navigate = useNavigate();
  const lines = useCart((s) => s.lines);
  const start = useCheckout((s) => s.start);
  const saved = useCheckout((s) => s.customer);

  // Spread defaults first so older saved details (without landmark) still work.
  const [values, setValues] = useState<CheckoutFormValues>({ ...EMPTY_DETAILS, ...saved });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const hasItems = lines.length > 0;

  const goBack = () => {
    if (!submitting) navigate({ to: "/cart" as any });
  };

  // Lock page scroll + Escape goes back to the cart
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting) navigate({ to: "/cart" as any });
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [submitting, navigate]);

  const set =
    (key: keyof CheckoutFormValues, transform?: (s: string) => string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = transform ? transform(e.target.value) : e.target.value;
      setValues((v) => ({ ...v, [key]: next }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`f-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    const { landmark, ...customer } = values;
    start({
      ...customer,
      name: values.name.trim(),
    } satisfies CustomerDetails); // keeps the form pre-filled next time

    setSubmitting(true);
    setSubmitError("");
    try {
      // Make sure every cart line exists in the backend before ordering.
      const available = await fetchAvailableSlugs();
      if (available) {
        const missing = lines.filter((l) => !available.has(l.slug));
        if (missing.length > 0) {
          const names = missing.map((l) => (l as any).name ?? l.slug).join(", ");
          // Drop the stale lines from the cart (assumes useCart is a zustand store).
          useCart.setState((s: any) => ({
            lines: s.lines.filter((l: any) => available.has(l.slug)),
          }));
          setSubmitError(
            `These items are no longer available and were removed from your cart: ${names}. ` +
              `Please add them again from the products page.`,
          );
          setSubmitting(false);
          return;
        }
      }

      // Uses the shared helper in lib/api.ts (base URL: VITE_API_URL or http://localhost:8000/api)
      const order = await api("/orders/", {
        method: "POST",
        body: JSON.stringify({
          // Flat shape, matching Django's CheckoutSerializer
          name: values.name.trim(),
          phone: values.phone,
          email: values.email.trim(),
          company: (values.company ?? "").trim(),
          gstin: values.gstin ?? "",
          address: [values.address.trim(), (landmark ?? "").trim()].filter(Boolean).join(", "),
          city: values.city.trim(),
          state: values.state.trim(),
          pincode: values.pincode,
          notes: (values.notes ?? "").trim(),
          items: lines.map((l) => ({ slug: l.slug, quantity: l.quantity })),
        }),
      });

      // Backend returns { order_id, public_token }; the payment page needs both.
      if (!order?.order_id || !order?.public_token) {
        throw new Error("Order was created but the server response was incomplete.");
      }

      // FIX: store the token where getOrderToken() in lib/checkout.ts reads it
      // (same key format: bs_order_<orderId>), and keep it out of the URL.
      try {
        sessionStorage.setItem(`bs_order_${order.order_id}`, order.public_token);
      } catch {
        /* storage unavailable (e.g. private mode); payment page will ask to retry */
      }

      navigate({
        to: "/payment" as any,
        search: { order: order.order_id } as any,
      });
    } catch (err: any) {
      console.error(err);
      // A TypeError from fetch means the server could not be reached at all.
      const networkDown = err instanceof TypeError;
      setSubmitError(
        networkDown
          ? "Couldn't reach the server. Please check your connection and try again."
          : err?.message || "Could not place your order. Please try again.",
      );
      setSubmitting(false); // stay on the page so the user can try again
    }
  };

  if (!hasItems) {
    return (
      <Overlay onBackdropClick={goBack}>
        <div className="w-full max-w-md rounded-xl border border-black/10 bg-white p-10 text-center text-[#141414] shadow-2xl">
          <p className={eyebrow}>Cart / 00 items</p>
          <p className="mt-3 text-lg">Your cart is empty.</p>
          <Link
            to={"/products" as any}
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-yellow px-7 text-xs font-bold uppercase tracking-[0.15em] text-black hover:bg-yellow-deep"
          >
            Shop products <span aria-hidden>→</span>
          </Link>
        </div>
      </Overlay>
    );
  }

  const field = (
    key: keyof CheckoutFormValues,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
    transform?: (s: string) => string,
  ) => (
    <label className={`block ${eyebrow}`}>
      {label}
      <input
        id={`f-${key}`}
        value={values[key] ?? ""}
        onChange={set(key, transform)}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `e-${key}` : undefined}
        className={`${fieldClass} ${errors[key] ? "border-red-600" : "border-black/15"}`}
        {...props}
      />
      {errors[key] && (
        <span
          id={`e-${key}`}
          className="mt-1 block text-xs font-normal normal-case tracking-normal text-red-600"
        >
          {errors[key]}
        </span>
      )}
    </label>
  );

  const legend = (n: string, text: string) => (
    <legend className="mb-4 flex items-center gap-3 text-lg font-semibold">
      <span className="flex h-6 w-8 items-center justify-center rounded bg-yellow text-xs font-bold text-black">
        {n}
      </span>
      {text}
    </legend>
  );

  return (
    <Overlay onBackdropClick={goBack}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-black/10 bg-white text-[#141414] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-4 border-yellow px-5 py-4 sm:px-6">
          <div>
            <p className={eyebrow}>Step 1 of 2</p>
            <h1 id="checkout-title" className="text-xl font-semibold">
              Your details
            </h1>
          </div>
          <button
            type="button"
            onClick={goBack}
            disabled={submitting}
            aria-label="Back to cart"
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none text-black transition-colors hover:bg-black/5 hover:text-black disabled:opacity-40"
          >
            ✕
          </button>
        </div>

        {/* Scrollable form body: two columns side by side on wide screens (landscape) */}
        <form
          onSubmit={onSubmit}
          noValidate
          className="grid gap-y-8 overflow-y-auto p-5 sm:p-6 lg:grid-cols-2 lg:gap-y-6"
        >
          {/* Left column: contact */}
          <fieldset className="space-y-4 lg:pr-8">
            {legend("01", "Contact details")}
            <div className="grid gap-4 sm:grid-cols-2">
              {field("name", "Full name", { autoComplete: "name" })}
              {field(
                "phone",
                "Mobile number",
                {
                  autoComplete: "tel-national",
                  inputMode: "numeric",
                  maxLength: 10,
                  placeholder: "9876543210",
                },
                (s) => s.replace(/\D/g, ""),
              )}
            </div>
            {field("email", "Email", {
              type: "email",
              autoComplete: "email",
              placeholder: "you@company.com",
            })}
            <label className={`block ${eyebrow}`}>
              Order notes (optional)
              <textarea
                value={values.notes}
                onChange={set("notes")}
                rows={4}
                className={`${fieldClass} h-auto border-black/15 py-2`}
              />
            </label>
          </fieldset>

          {/* Right column: delivery */}
          <fieldset className="space-y-4 border-t border-black/10 pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {legend("02", "Delivery address")}
            <label className={`block ${eyebrow}`}>
              Address
              <textarea
                id="f-address"
                value={values.address}
                onChange={set("address")}
                rows={3}
                autoComplete="street-address"
                aria-invalid={!!errors.address}
                className={`${fieldClass} h-auto py-2 ${errors.address ? "border-red-600" : "border-black/15"}`}
              />
              {errors.address && (
                <span className="mt-1 block text-xs font-normal normal-case tracking-normal text-red-600">
                  {errors.address}
                </span>
              )}
            </label>

            {field("landmark", "Nearby landmark (optional)", {
              placeholder: "e.g. Near City Mall, opposite petrol pump",
            })}

            <div className="grid gap-4 sm:grid-cols-3">
              {field("city", "City", { autoComplete: "address-level2" })}
              {field("state", "State", { autoComplete: "address-level1" })}
              {field(
                "pincode",
                "PIN code",
                { autoComplete: "postal-code", inputMode: "numeric", maxLength: 6 },
                (s) => s.replace(/\D/g, ""),
              )}
            </div>
          </fieldset>

          {/* Bottom row across both columns */}
          <div className="space-y-4 border-t border-black/10 pt-6 lg:col-span-2">
            {submitError && (
              <p role="alert" className="text-sm text-red-600">
                {submitError}
              </p>
            )}

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <Link
                to={"/cart" as any}
                className="text-xs font-semibold uppercase tracking-[0.15em] text-black transition-colors hover:underline"
              >
                ← Edit cart
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className={`${ctaPrimary} sm:w-80`}
              >
                {submitting ? (
                  "Placing order..."
                ) : (
                  <>
                    Continue to payment <span aria-hidden>→</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Overlay>
  );
}