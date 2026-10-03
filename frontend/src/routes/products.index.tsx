import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";

import { ArrowLink } from "@/components/site/ArrowLink";
import { PageHero } from "@/components/site/PageHero";
import { img } from "@/lib/data";
import image from "@/assets/image-0063.png";
import { products, rupees, useCart, type ShopProduct } from "@/lib/shop";

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

      <section className="bg-white py-16 md:py-24">
        <div className="shell space-y-20">
          {products.map((p) => (
            <ProductRow key={p.slug} p={p} />
          ))}
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

function ProductRow({ p }: { p: ShopProduct }) {
  const add = useCart((s) => s.add);
  const nav = useNavigate();
  const soldOut = p.stock < 1;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Link to={"/products/$slug" as any} params={{ slug: p.slug } as any} className="block">
        <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-white shadow-lg">
          <span
            className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-bold uppercase ${
              soldOut ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
          >
            {soldOut ? "Out of stock" : "In stock"}
          </span>
          <img src={p.image} alt={p.alt} className="h-full w-full object-contain p-6" />
        </div>
      </Link>

      <div>
        <p className="tech-label font-semibold text-yellow">01</p>
        <h2 className="mt-3 display-md text-foreground">{p.name}</h2>
        <p className="mt-4 text-lg font-semibold text-foreground">{p.summary}</p>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{p.body}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {p.applications.map((app) => (
            <span
              key={app}
              className="inline-block rounded-full border border-yellow/30 bg-yellow/10 px-3 py-1 text-xs font-semibold capitalize text-black"
            >
              {app}
            </span>
          ))}
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <p className="text-4xl font-bold text-foreground">{rupees(p.price)}</p>
          <p className="text-xs text-muted-foreground">
            per piece + GST{p.minOrder > 1 ? ` · minimum order ${p.minOrder} pieces` : ""}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={soldOut}
            onClick={() => {
              add(p, p.minOrder);
              nav({ to: "/cart" as any });
            }}
            className="inline-flex h-12 items-center gap-2 rounded-sm border-2 border-yellow px-5 text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:bg-yellow disabled:opacity-40"
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
            className="h-12 rounded-sm bg-yellow px-5 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-yellow-deep disabled:opacity-40"
          >
            Purchase now
          </button>
          <Link
            to={"/products/$slug" as any}
            params={{ slug: p.slug } as any}
            className="inline-flex h-12 items-center px-2 text-sm font-bold uppercase tracking-wide text-foreground underline-offset-4 hover:text-yellow-deep hover:underline"
          >
            View details →
          </Link>
        </div>
      </div>
    </div>
  );
}