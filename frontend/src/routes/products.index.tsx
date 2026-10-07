import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";

import { ArrowLink } from "@/components/site/ArrowLink";
import { PageHero } from "@/components/site/PageHero";
import { img } from "@/lib/data";
import image from "@/assets/image-0063.png";
import { useProducts, rupees, useCart, type ShopProduct } from "@/lib/shop";

const title = "Shop Helical Screw Piles & Ground Screws | BigScrew Solutions";
const description =
  "Order ground screws, helical piles and large diameter screw piles online. Choose quantity, pay by UPI and we dispatch across India.";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  // Live list from Django (falls back to the static product if the API is down)
  const products = useProducts();

  return (
    <>
      <PageHero
        eyebrow="SHOP"
        title="Buy screw piles"
        accent="online"
        intro="Choose your pile type, set the quantity and order in a few clicks. Pay by UPI and our team confirms your order and arranges dispatch."
        image={image}
        imageAlt="Crate of manufactured BigScrew helical screw piles ready for despatch"
      />

      <section className="bg-white py-12 md:py-16">
        <div className="shell space-y-14">
          {products.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No products are available right now. Please check back soon.
            </p>
          ) : (
            products.map((p, i) => <ProductRow key={p.slug} p={p} index={i + 1} />)
          )}
        </div>
      </section>

      <section className="bg-ink py-16 md:py-20">
        <div className="shell">
          <h2 className="display-md text-on-ink">We&apos;ll help you choose</h2>
          <p className="mt-4 max-w-2xl text-on-ink-dim">
            Tell us about your project and soil, and our engineers will recommend the right pile
            and quantity.
          </p>
          <div className="mt-10 flex flex-wrap gap-6">
            <ArrowLink to="/contact" variant="yellow">
              Ask for a pile recommendation
            </ArrowLink>
            <ArrowLink to="/screw-piles" variant="yellow">
              Compare pile types
            </ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductRow({ p, index }: { p: ShopProduct; index: number }) {
  const add = useCart((s) => s.add);
  const nav = useNavigate();
  const soldOut = p.stock < 1;

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
      {/* Smaller image */}
      <Link
        to={"/products/$slug" as any}
        params={{ slug: p.slug } as any}
        className="mx-auto block w-full max-w-xs"
      >
        <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-white shadow-md">
          <span
            className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
              soldOut ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
          >
            {soldOut ? "Out of stock" : "In stock"}
          </span>
          <img src={p.image} alt={p.alt} className="h-full w-full object-contain p-4" />
        </div>
      </Link>

      {/* Medium-size content */}
      <div>
        <p className="tech-label text-sm font-semibold text-yellow">
          {String(index).padStart(2, "0")}
        </p>
        <h2 className="mt-2 display-md !text-xl md:!text-2xl !font-medium text-foreground">{p.name}</h2>
        <p className="mt-3 text-base font-semibold text-foreground">{p.summary}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {p.applications.map((app) => (
            <span
              key={app}
              className="inline-block rounded-full border border-yellow/30 bg-yellow/10 px-2.5 py-0.5 text-xs font-semibold capitalize text-black"
            >
              {app}
            </span>
          ))}
        </div>

        <div className="mt-5 border-t border-border pt-5">
          <p className="text-3xl font-bold text-foreground">{rupees(p.price)}</p>
          <p className="text-xs text-muted-foreground">
            per piece + GST{p.minOrder > 1 ? ` · minimum order ${p.minOrder} pieces` : ""}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={soldOut}
            onClick={() => {
              add(p, p.minOrder);
              nav({ to: "/cart" as any });
            }}
            className="inline-flex h-10 items-center gap-2 rounded-sm border-2 border-yellow px-4 text-xs font-bold uppercase tracking-wide text-foreground transition-colors hover:bg-yellow disabled:opacity-40"
          >
            <ShoppingCart className="h-4 w-4" /> Add to cart
          </button>
          <button
            type="button"
            disabled={soldOut}
            onClick={() => {
              add(p, p.minOrder);
              nav({ to: "/checkout" as any });
            }}
            className="h-10 rounded-sm bg-yellow px-4 text-xs font-bold uppercase tracking-wide text-black transition-colors hover:bg-yellow-deep disabled:opacity-40"
          >
            Purchase now
          </button>
          <Link
            to={"/products/$slug" as any}
            params={{ slug: p.slug } as any}
            className="inline-flex h-10 items-center px-1 text-xs font-bold uppercase tracking-wide text-foreground underline-offset-4 hover:text-yellow-deep hover:underline"
          >
            View details →
          </Link>
        </div>
      </div>
    </div>
  );
}