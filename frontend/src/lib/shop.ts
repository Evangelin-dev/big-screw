import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import fencingbigscrew from "@/assets/fencingbigscrew.png";
import { api } from "@/lib/api";

export type ShopProduct = {
  slug: string;
  name: string;
  summary: string;
  body: string;
  overview: string;
  features: string[];
  specs: [string, string][];
  installSteps: [string, string][];
  image: string;
  alt: string;
  imagegallery: { image: string; alt: string; label?: string }[]; // shown on the right of the description
  applications: string[];
  price: number; // per piece, ex-GST
  stock: number;
  minOrder: number;
  mrp?: number;
  rating?: number;
  reviews?: number;
  badge?: string;
};

// Finds gallery images in src/assets by name, ignoring capitals, spaces and extension.
// A missing file is skipped instead of crashing the whole site.
const assetUrls = import.meta.glob("/src/assets/*.{png,jpg,jpeg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, "").replace(/\.(png|jpe?g|webp)$/, "");

function asset(name: string): string | undefined {
  const hit = Object.keys(assetUrls).find((p) => norm(p.split("/").pop() ?? "") === norm(name));
  return hit ? assetUrls[hit] : undefined;
}

// [file name in src/assets, caption shown under the image, alt text]
const galleryFiles: [string, string, string][] = [
  ["frontview", "Front view", "Front view of the Fencing BigScrew pile"],
  ["topview", "Top view", "Top view of the Fencing BigScrew pile"],
  ["roundpost", "Round post", "Round post fitting the Fencing BigScrew pile"],
  ["sqpost", "Square post", "Square post fitting the Fencing BigScrew pile"],
];

// Rich content (specs, images, install steps) for the Fencing BigScrew pile.
// price / stock / minOrder here are only a FALLBACK, used if the API is unreachable.
// The live values always come from Django (see useCatalog below).
const fencingPile: ShopProduct = {
  slug: "fencing-bigscrew-pile", // must match the Django slug exactly
  name: "Fencing BigScrew pile",
  summary: "76 mm × 900 mm screw pile for fence posts. No digging, no concrete, no curing",
  body: "Driven into the ground with a hand drill and gearbox. No digging, no concrete, no curing. The fence post drops straight into the pile and bolts on the same day.",
  overview:
    "The Fencing BigScrew pile is a 76 mm outside diameter, 900 mm (3 ft) long screw pile with a 2.5 mm wall. It is driven into the ground with a hand drill and gearbox, so there is no digging, no concrete and no curing time. Slide the fence post 100 mm into the pile, bolt it with 2 × M10 through both walls, and carry on to the next post. A corrosion-resistant bitumen coating gives a life of up to 10 years, and the pile can be unscrewed and reused when the fence line changes.",
  features: [
    "Driven in with a hand drill and gearbox: no digging, no concrete, no curing",
    "Fence post drops straight into the pile and is bolted the same day",
    "Helical thread pulls the pile down as it turns",
    "2 × M10 bolt holes through both walls at the top",
    "Corrosion-resistant bitumen coating, life up to 10 years",
    "Removable and reusable: unscrew it and shift the fence line",
    "Fits 2 inch square pipe, 2 inch round pipe and 2 inch L angle posts",
  ],
  specs: [
    ["Product", "Fencing BigScrew pile"],
    ["Outside diameter", "76 mm"],
    ["Length", "900 mm (3 ft)"],
    ["Wall thickness", "2.5 mm"],
    ["Bolt holes", "2 × M10, through both walls at the top"],
    ["Coating", "Corrosion-resistant bitumen"],
    ["Design life", "Up to 10 years"],
    ["Post insertion depth", "100 mm inside the pile"],
    ["Fits", "2 inch square pipe, 2 inch round pipe, 2 inch L angle"],
    ["Installation", "Hand drill + gearbox"],
    ["Minimum order", "50 pieces"],
    ["Brand", "BigScrew Solutions"],
  ],
  installSteps: [
    ["Mark", "Mark the fence line and set the pile position."],
    ["Drive", "Drive the pile in with a hand drill and gearbox until the top sits at the level you want."],
    ["Insert", "Slide the post 100 mm into the pile."],
    ["Bolt", "Bolt through the holes with 2 × M10 and carry on to the next post."],
  ],
  image: fencingbigscrew,
  alt: "Fencing BigScrew pile, 76 mm steel screw pile with helical thread and 2 × M10 bolt holes",
  imagegallery: galleryFiles.flatMap(([file, label, alt]) => {
    const image = asset(file);
    return image ? [{ image, alt, label }] : [];
  }),
  applications: ["fence posts", "farm fencing", "boundary fencing", "plot fencing"],
  price: 600,
  stock: 100,
  minOrder: 50,
  badge: "Life up to 10 years",
};

// Products that have hand-written content on this site. Keyed by slug.
const staticProducts: ShopProduct[] = [fencingPile];

export const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* ------------------------------------------------------------------ */
/* Live catalogue from Django                                          */
/* ------------------------------------------------------------------ */

// TODO: adjust these field names to match your Django serializer
type ApiProduct = {
  id?: number | string;
  slug?: string;
  name: string;
  description?: string;
  price: number | string;
  stock: number | string;
  min_order_qty?: number | string; // field name used by the dashboard / Django model
  min_order?: number | string;
  min_qty?: number | string;
  is_active?: boolean;
  active?: boolean;
  image?: string | null;
};

const num = (v: unknown, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function mergeProducts(remote: ApiProduct[]): ShopProduct[] {
  return remote
    .filter((r) => r.is_active ?? r.active ?? true)
    .map((r): ShopProduct => {
      const slug = r.slug || slugify(r.name) || String(r.id ?? "");
      const live = {
        price: num(r.price),
        stock: num(r.stock),
        // min_order_qty first, so the dashboard value is never lost (it used to fall back to 1)
        minOrder: Math.max(1, num(r.min_order_qty ?? r.min_order ?? r.min_qty, 1)),
      };

      // Has rich content on the site: keep it, but use live price/stock/minOrder
      const base = staticProducts.find((p) => p.slug === slug);
      if (base) return { ...base, name: r.name || base.name, ...live };

      // Added in the dashboard only: build a basic product from the API data
      const text = r.description ?? "";
      return {
        slug,
        name: r.name,
        summary: text,
        body: text,
        overview: text,
        features: [],
        specs: [],
        installSteps: [],
        image: r.image || fencingbigscrew,
        alt: r.name,
        imagegallery: [],
        applications: [],
        ...live,
      };
    });
}

type Catalog = {
  items: ShopProduct[];
  loaded: boolean; // finished trying (success or failure)
  fromApi: boolean; // true only when items came from Django
  load: () => Promise<void>;
};

let inflight: Promise<void> | null = null;

export const useCatalog = create<Catalog>()((set, get) => ({
  items: staticProducts, // shown until the API answers (or if it fails)
  loaded: false,
  fromApi: false,
  load: () => {
    if (inflight) return inflight;
    inflight = (async () => {
      try {
        // "_" is a cache-buster so the browser / CDN never hands back an old list
        const data = await api(`/products/?_=${Date.now()}`); // public endpoint, no auth
        const list: ApiProduct[] = Array.isArray(data) ? data : (data?.results ?? []);
        const next = mergeProducts(list);
        const { items, fromApi } = get();
        // Only replace items when something really changed, so the 30s refresh
        // does not re-render the whole shop (or re-sync the cart) for nothing.
        if (!fromApi || JSON.stringify(next) !== JSON.stringify(items)) {
          set({ items: next, loaded: true, fromApi: true });
        } else {
          set({ loaded: true, fromApi: true });
        }
      } catch {
        // Keep whatever we already have (live data from earlier, or the static fallback)
        set({ loaded: true });
      } finally {
        inflight = null;
      }
    })();
    return inflight;
  },
}));

/** All active products. Loads from Django once, re-renders when they arrive. */
export function useProducts(): ShopProduct[] {
  const items = useCatalog((s) => s.items);
  const load = useCatalog((s) => s.load);
  useEffect(() => {
    load();
  }, [load]);
  return items;
}

/** One product by slug (undefined until found). */
export function useProduct(slug: string): ShopProduct | undefined {
  return useProducts().find((p) => p.slug === slug);
}

/** Re-fetches the live catalogue on mount, when the tab is focused again,
 *  and every `everyMs`. The cart then re-syncs price / stock / min qty by itself
 *  (useCartHydration already does that whenever the catalogue changes).
 *  Call it ONCE for the whole app (e.g. in the Navbar / root layout),
 *  not in many components, or each one starts its own timer. */
export function useLiveCatalog(everyMs = 30000) {
  const load = useCatalog((s) => s.load);
  useEffect(() => {
    load();
    const refresh = () => {
      if (document.visibilityState === "visible") load();
    };
    const id = window.setInterval(refresh, everyMs);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [load, everyMs]);
}

/** Non-reactive lookup for event handlers / non-component code. */
export const getProduct = (slug: string) =>
  useCatalog.getState().items.find((p) => p.slug === slug);

/* ------------------------------------------------------------------ */
/* Cart                                                                */
/* ------------------------------------------------------------------ */

export type Line = {
  slug: string;
  name: string;
  image: string;
  price: number;
  stock: number;
  minOrder: number;
  quantity: number;
};

type Cart = {
  lines: Line[];
  add: (p: ShopProduct, qty: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  /** Refresh price/stock/minOrder from the live catalogue; drop unavailable items. */
  sync: (live: ShopProduct[]) => void;
};

export const useCart = create<Cart>()(
  persist(
    (set) => ({
      lines: [],
      add: (p, qty) =>
        set((s) => {
          const has = s.lines.some((l) => l.slug === p.slug);
          return {
            lines: has
              ? s.lines.map((l) =>
                  l.slug === p.slug ? { ...l, quantity: Math.min(p.stock, l.quantity + qty) } : l,
                )
              : [
                  ...s.lines,
                  {
                    slug: p.slug,
                    name: p.name,
                    image: p.image,
                    price: p.price,
                    stock: p.stock,
                    minOrder: p.minOrder,
                    quantity: Math.min(p.stock, Math.max(qty, p.minOrder)),
                  },
                ],
          };
        }),
      setQty: (slug, qty) =>
        set((s) => ({
          lines: s.lines.map((l) =>
            l.slug === slug
              ? { ...l, quantity: Math.min(l.stock, Math.max(l.minOrder ?? 1, qty)) }
              : l,
          ),
        })),
      remove: (slug) => set((s) => ({ lines: s.lines.filter((l) => l.slug !== slug) })),
      clear: () => set({ lines: [] }),
      sync: (live) =>
        set((s) => ({
          lines: s.lines.flatMap((l) => {
            const p = live.find((x) => x.slug === l.slug);
            if (!p || p.stock <= 0) return []; // deleted, deactivated or sold out
            return [
              {
                ...l,
                name: p.name,
                price: p.price,
                stock: p.stock,
                minOrder: p.minOrder,
                quantity: Math.min(p.stock, Math.max(p.minOrder, l.quantity)),
              },
            ];
          }),
        })),
    }),
    {
      name: "bigscrew-cart-v2",
      storage: createJSONStorage(() => localStorage),
      // Server and first client render both start with an empty cart,
      // then useCartHydration() loads the saved cart after mount.
      skipHydration: true,
    },
  ),
);

/* ------------------------------------------------------------------ */
/* Totals (shared by cart, checkout and payment so they always agree)  */
/* ------------------------------------------------------------------ */

// TODO: confirm the GST rate that applies to your products
export const GST_RATE = 0;

export function cartTotals(lines: Line[]) {
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const gst = Math.round(subtotal * GST_RATE);
  return { subtotal, gst, total: subtotal + gst };
}

/* ------------------------------------------------------------------ */
/* Checkout details                                                    */
/* ------------------------------------------------------------------ */

export type CustomerDetails = {
  name: string;
  phone: string;
  email: string;
  company: string;
  gstin: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
};

type CheckoutState = {
  orderId: string | null;
  customer: CustomerDetails | null;
  start: (customer: CustomerDetails) => void;
  reset: () => void;
};

export const useCheckout = create<CheckoutState>()(
  persist(
    (set) => ({
      orderId: null,
      customer: null,
      start: (customer) =>
        set({
          customer,
          orderId: `BS-${Date.now().toString(36).toUpperCase()}`,
        }),
      reset: () => set({ orderId: null, customer: null }),
    }),
    {
      name: "bigscrew-checkout-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true, // same SSR-safe approach as the cart
    },
  ),
);

/**
 * Call once near the top of the app (the Navbar does this).
 * Loads the saved cart and checkout details after mount, loads the live
 * catalogue from Django, then refreshes cart prices/stock from it.
 * Returns true once the saved cart is loaded, so pages that read it
 * (checkout, payment) can wait instead of flashing an empty state
 * or redirecting too early.
 */
export function useCartHydration(): boolean {
  const [ready, setReady] = useState(false);
  const load = useCatalog((s) => s.load);
  const fromApi = useCatalog((s) => s.fromApi);
  const items = useCatalog((s) => s.items);

  useEffect(() => {
    let alive = true;
    Promise.all([useCart.persist.rehydrate(), useCheckout.persist.rehydrate()]).then(() => {
      if (alive) setReady(true);
    });
    load();
    return () => {
      alive = false;
    };
  }, [load]);

  // Once the cart is loaded AND the real catalogue has arrived, fix stale lines.
  // Skipped if the API failed, so a network error never empties the cart.
  useEffect(() => {
    if (ready && fromApi) useCart.getState().sync(items);
  }, [ready, fromApi, items]);

  return ready;
}

/* ------------------------------------------------------------------ */
/* UPI                                                                 */
/* ------------------------------------------------------------------ */

// TODO: replace with your real UPI ID (VPA) and payee name
export const UPI_ID = "yourbusiness@upi";
export const UPI_PAYEE = "BigScrew Solutions";

export function upiLink(amount: number, orderId: string): string {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: UPI_PAYEE,
    am: amount.toFixed(2),
    cu: "INR",
    tn: `Order ${orderId}`,
    tr: orderId,
  });
  return `upi://pay?${params.toString()}`;
}