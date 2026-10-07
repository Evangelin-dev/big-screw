import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Check, ChevronLeft, ChevronRight, Lock, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { getProduct, rupees, useCart } from "@/lib/shop";

// Add more images to this list and they will cross-fade automatically
import navimg from "@/assets/14.png";

const navbarImages = [navimg];
const SWAP_INTERVAL_MS = 4000;

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params["slug"]);
    if (!product) throw notFound();
    return product;
  },
  component: ProductPage,
});

/**
 * Background strip that sits behind the navbar.
 * With one image it just shows it; with several it cross-fades through them.
 */
function NavbarBackground() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (navbarImages.length < 2) return; // nothing to swap
    const t = setInterval(() => {
      setActive((i) => (i + 1) % navbarImages.length);
    }, SWAP_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32 overflow-hidden md:h-40">
      {navbarImages.map((src, i) => (
        <div
          key={`${i}-${src}`}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      {/* Dark overlay so navbar text stays readable */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}

type ProductView = { label: string; src: string; alt: string };

/**
 * Main product image with next / previous arrows and thumbnails,
 * so the customer can swap between front view, top view and round view.
 */
function ProductImageViewer({ views }: { views: ProductView[] }) {
  const [index, setIndex] = useState(0);
  if (views.length === 0) return null;

  const current: ProductView = views[index] ?? views[0]!;
  const go = (step: number) => setIndex((i) => (i + step + views.length) % views.length);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-white">
        <img src={current.src} alt={current.alt} className="h-full w-full object-contain p-6" />

        {views.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/90 shadow hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/90 shadow hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {views.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {views.map((v, i) => (
            <button
              key={`${i}-${v.src}`}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${v.label}`}
              aria-current={i === index}
              className={`rounded-md border bg-white p-1 text-center transition-colors ${
                i === index ? "border-orange-500 ring-1 ring-orange-500" : "border-border hover:border-foreground"
              }`}
            >
              <img src={v.src} alt={v.alt} className="aspect-square w-full object-contain" />
              <span className="mt-1 block text-[10px] font-medium leading-tight text-foreground">{v.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductPage() {
  const p = Route.useLoaderData();
  const add = useCart((s) => s.add);
  // How many of this product are already in the cart (so we never go over stock)
  const inCart = useCart((s) => s.lines.find((l) => l.slug === p.slug)?.quantity ?? 0);
  const nav = useNavigate();
  // Quantity is typed freely (50, 61, 62 ...), so keep the raw text while typing
  const [qtyText, setQtyText] = useState(String(p.minOrder));
  const [added, setAdded] = useState(false);

  const soldOut = p.stock < 1;
  const lowStock = !soldOut && p.stock <= 10;
  const remaining = Math.max(p.stock - inCart, 0);
  const canAdd = !soldOut && remaining > 0;
  const discount = p.mrp && p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0;

  // Quantity validation: any whole number from the minimum order up to remaining stock
  const qtyValue = Number(qtyText) || 0;
  const tooLow = qtyValue < p.minOrder;
  const tooHigh = qtyValue > remaining;
  const validQty = canAdd && !tooLow && !tooHigh;
  let qtyError = "";
  if (canAdd && qtyText !== "") {
    if (tooLow) qtyError = `Minimum order is ${p.minOrder} pieces.`;
    else if (tooHigh) qtyError = `Only ${remaining} pieces available.`;
  }

  const specs = p.specs as unknown as [string, string][];
  const features = p.features as unknown as string[];
  const applications = p.applications as unknown as string[];
  const installSteps = p.installSteps as unknown as [string, string][];

  // Hero image first, then every gallery image (front, top, round post, square post),
  // so Next / Previous moves through them one by one. Duplicates are skipped.
  const views: ProductView[] = [
    { label: "Product", src: p.image, alt: p.alt },
    ...p.imagegallery.map((g) => ({ label: g.label ?? "Image", src: g.image, alt: g.alt })),
  ].filter((v, i, all) => all.findIndex((x) => x.src === v.src) === i);

  // Reset the "Added" confirmation after a moment
  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2500);
    return () => clearTimeout(t);
  }, [added]);

  // Add to Cart: add the item and stay on this page
  const handleAddToCart = () => {
    if (!validQty) return;
    add(p, qtyValue);
    setQtyText(String(p.minOrder));
    setAdded(true);
  };

  // Buy Now: add the typed quantity (if valid) and go straight to the cart
  const handleBuyNow = () => {
    if (validQty) add(p, qtyValue);
    nav({ to: "/cart" as any });
  };

  return (
    <section className="relative bg-white pb-20 pt-32 md:pt-40">
      {/* Background image behind the navbar */}
      <NavbarBackground />

      <div className="shell relative">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">›</span>
          <Link to={"/products" as any} className="hover:text-foreground">Shop products</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">{p.name}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.1fr_300px]">
          {/* Column 1: swappable product images */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductImageViewer key={p.slug} views={views} />
          </div>

          {/* Column 2: details */}
          <div>
            <h1 className="text-2xl font-semibold leading-snug text-foreground md:text-3xl">
              {p.name} | {p.summary}
            </h1>
            <Link to="/screw-piles" className="mt-1 inline-block text-sm text-blue-700 hover:underline">
              Visit the BigScrew Solutions store
            </Link>

            {p.rating ? (
              <p className="mt-2 flex items-center gap-2 text-sm">
                <span className="font-semibold">{p.rating}</span>
                <span className="flex text-orange-500">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.round(p.rating ?? 0) ? "fill-current" : ""}`}
                    />
                  ))}
                </span>
                {p.reviews ? (
                  <span className="text-blue-700">({p.reviews.toLocaleString("en-IN")})</span>
                ) : null}
              </p>
            ) : null}

            {p.badge ? (
              <span className="mt-3 inline-block rounded-sm bg-orange-700 px-2 py-1 text-xs font-bold text-white">
                {p.badge}
              </span>
            ) : null}

            <hr className="my-4 border-border" />

            {/* Price block */}
            <div className="flex flex-wrap items-baseline gap-3">
              {discount > 0 && <span className="text-3xl font-light text-red-600">-{discount}%</span>}
              <span className="text-4xl font-medium text-foreground">
                <sup className="mr-0.5 align-top text-lg">₹</sup>
                {p.price.toLocaleString("en-IN")}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                per piece + GST{p.minOrder > 1 ? ` · minimum order ${p.minOrder} pieces` : ""}
              </span>
            </div>
            {p.mrp && p.mrp > p.price ? (
              <p className="mt-1 text-sm text-muted-foreground">
                M.R.P.: <s>{rupees(p.mrp)}</s>
              </p>
            ) : null}

            <hr className="my-6 border-border" />

            {/* Specs table */}
            <table className="w-full border-collapse text-left text-sm">
              <tbody>
                {specs.map(([k, v]) => (
                  <tr key={k}>
                    <th className="w-40 py-1.5 pr-3 align-top font-semibold text-foreground">{k}</th>
                    <td className="py-1.5 text-muted-foreground">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <hr className="my-6 border-border" />

            {/* About this item */}
            <h2 className="text-lg font-bold text-foreground">About this item</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-foreground">
              {features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Column 3: buy box */}
          <aside className="h-fit rounded-lg border border-border bg-white p-5 lg:sticky lg:top-28">
            <p className="text-sm text-foreground">
              <span className="font-semibold text-blue-700">Free installation advice.</span> Freight is
              confirmed after you order.
            </p>

            <p
              className={`mt-4 text-lg font-medium ${
                soldOut ? "text-red-600" : lowStock ? "text-orange-700" : "text-green-700"
              }`}
            >
              {soldOut ? "Out of stock" : lowStock ? `Only ${p.stock} left in stock` : "In stock"}
            </p>

            <label className="mt-4 block text-sm">
              Quantity:
              <input
                type="number"
                inputMode="numeric"
                step={1}
                min={p.minOrder}
                max={Math.max(remaining, 1)}
                value={qtyText}
                onChange={(e) => setQtyText(e.target.value.replace(/\D/g, ""))}
                onFocus={(e) => e.currentTarget.select()}
                disabled={!canAdd}
                aria-invalid={qtyError !== ""}
                className={`ml-2 h-9 w-24 rounded-md border bg-gray-50 px-2 disabled:opacity-50 ${
                  qtyError ? "border-red-500" : "border-border"
                }`}
              />
            </label>
            {qtyError ? (
              <p className="mt-1 text-xs font-medium text-red-600" aria-live="polite">
                {qtyError}
              </p>
            ) : p.minOrder > 1 ? (
              <p className="mt-1 text-xs text-muted-foreground">
                Minimum order {p.minOrder} pieces. Type any quantity from {p.minOrder} (for example{" "}
                {p.minOrder + 11}, {p.minOrder + 12}).
              </p>
            ) : null}

            <button
              type="button"
              disabled={!validQty}
              onClick={handleAddToCart}
              className={`mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold text-black transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                added ? "bg-green-500" : "bg-yellow hover:bg-yellow-deep"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" /> Added to cart
                </>
              ) : (
                "Add to Cart"
              )}
            </button>
            <button
              type="button"
              disabled={soldOut || (canAdd && !validQty)}
              onClick={handleBuyNow}
              className="mt-3 h-11 w-full rounded-full bg-orange-500 text-sm font-semibold text-black transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Buy Now
            </button>

            {/* Cart status */}
            {inCart > 0 && (
              <p className="mt-3 text-sm text-foreground" aria-live="polite">
                {inCart} in your cart.{" "}
                <Link to={"/cart" as any} className="font-semibold text-blue-700 hover:underline">
                  View cart
                </Link>
                {!soldOut && remaining === 0 && (
                  <span className="mt-1 block text-xs text-orange-700">
                    You have added all available stock.
                  </span>
                )}
              </p>
            )}

            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-4 w-4" /> Secure UPI transaction
            </p>
            <dl className="mt-3 space-y-1 text-xs">
              <div className="flex gap-2"><dt className="w-16 text-muted-foreground">Ships from</dt><dd>BigScrew Solutions</dd></div>
              <div className="flex gap-2"><dt className="w-16 text-muted-foreground">Sold by</dt><dd>BigScrew Solutions</dd></div>
            </dl>
          </aside>
        </div>

        {/* Product description (left) + Best used for (right) */}
        <div className="mt-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <h2 className="text-xl font-bold text-foreground">Product description</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{p.overview}</p>
            </div>

            <div className="h-fit rounded-lg border border-border p-5">
              <h3 className="font-semibold text-foreground">Best used for</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {applications.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1.5 rounded-full border border-yellow/30 bg-yellow/10 px-3 py-1 text-sm font-semibold capitalize text-black"
                  >
                    <Check className="h-4 w-4" /> {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <h3 className="mt-10 font-semibold text-foreground">How it is installed</h3>
          <InstallAnimation steps={installSteps} />
        </div>
      </div>
    </section>
  );
}

/**
 * "How it is installed": an animated picture of the pile going into the ground
 * with the steps beside it. It plays by itself; clicking a step jumps to it.
 */
function InstallAnimation({ steps }: { steps: [string, string][] }) {
  const [step, setStep] = useState(0);
  const stage = Math.min(step, 3);

  // Go to the next step every few seconds (skipped if the visitor prefers reduced motion)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % steps.length), 3200);
    return () => clearTimeout(t);
  }, [step, steps.length]);

  // Pile height per stage: 0 mark (hovering), 1 drive (goes into the ground), 2-3 stays in
  const pileY = [20, 190, 190, 190][stage];
  const move = "transform 1.6s ease-in-out, opacity 0.6s ease";
  const fade = "opacity 0.6s ease";

  return (
    <div className="mt-3 grid items-center gap-6 md:grid-cols-[320px_minmax(0,1fr)]">
      <div className="mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-lg border border-border bg-white">
        <svg
          viewBox="0 0 300 400"
          role="img"
          aria-label={`Installation step ${stage + 1}: ${steps[stage]?.[0] ?? ""}`}
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="pileMetal" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#8d949b" />
              <stop offset="0.5" stopColor="#d3d8dc" />
              <stop offset="1" stopColor="#8d949b" />
            </linearGradient>
          </defs>

          {/* Sky */}
          <rect width="300" height="400" fill="#f4f6f8" />

          {/* Fence post: slides down into the pile at step 3 */}
          <g
            style={{
              transform: `translateY(${stage >= 2 ? 0 : -80}px)`,
              opacity: stage >= 2 ? 1 : 0,
              transition: move,
            }}
          >
            <rect x="143" y="70" width="14" height="140" fill="#aeb4ba" stroke="#5f666d" strokeWidth="1.5" />
          </g>

          {/* Pile */}
          <g style={{ transform: `translateY(${pileY}px)`, transition: move }}>
            {/* Hand drill + gearbox, only while driving */}
            <g style={{ opacity: stage === 1 ? 1 : 0, transition: fade }}>
              <rect x="128" y="-62" width="44" height="40" rx="4" fill="#f97316" />
              <rect x="144" y="-22" width="12" height="22" fill="#555" />
              <text x="150" y="-38" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">
                DRILL
              </text>
            </g>

            <rect x="138" y="0" width="24" height="170" fill="url(#pileMetal)" stroke="#4b5258" strokeWidth="1.5" />
            <rect x="133" y="-3" width="34" height="4" fill="#333" />
            {[75, 90, 105, 120, 135, 150, 165].map((y) => (
              <ellipse key={y} cx="150" cy={y} rx="22" ry="4" fill="none" stroke="#2b2f33" strokeWidth="3" />
            ))}
            <polygon points="138,170 162,170 150,194" fill="#6b727a" stroke="#4b5258" strokeWidth="1.5" />

            {/* 2 x M10 bolts, slide in at the last step */}
            {[6, 16].map((y) => (
              <g
                key={y}
                style={{
                  transform: `translateX(${stage === 3 ? 0 : 50}px)`,
                  opacity: stage === 3 ? 1 : 0,
                  transition: move,
                }}
              >
                <rect x="124" y={y - 2} width="52" height="4" rx="2" fill="#f97316" />
                <rect x="119" y={y - 4} width="6" height="8" fill="#c2410c" />
              </g>
            ))}
            <text
              x="184"
              y="14"
              fontSize="10"
              fontWeight="700"
              fill="#c2410c"
              style={{ opacity: stage === 3 ? 1 : 0, transition: fade }}
            >
              2 × M10
            </text>
          </g>

          {/* Soil sits in front of the pile so the buried part looks underground */}
          <rect y="230" width="300" height="170" fill="#b8996b" opacity="0.8" />
          <line x1="0" x2="300" y1="230" y2="230" stroke="#7a6240" strokeWidth="3" />

          {/* Mark: spot on the fence line */}
          <g style={{ opacity: stage === 0 ? 1 : 0, transition: fade }}>
            <line x1="140" y1="222" x2="160" y2="238" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
            <line x1="160" y1="222" x2="140" y2="238" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      <ol className="grid gap-3">
        {steps.map(([t, d], i) => (
          <li key={t}>
            <button
              type="button"
              onClick={() => setStep(i)}
              aria-current={i === step ? "step" : undefined}
              className={`w-full rounded-lg border p-4 text-left transition-colors ${
                i === step ? "border-orange-500 bg-orange-50" : "border-border hover:border-foreground"
              }`}
            >
              <span className="text-sm font-bold text-yellow-deep">0{i + 1}</span>
              <span className="mt-1 block font-semibold uppercase text-foreground">{t}</span>
              <span className="mt-1 block text-sm text-muted-foreground">{d}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}