import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/home/Hero";
import {
  ApplicationsGrid,
  BrandStatement,
  ClosingCta,
  Machinery,
  PileTypes,
  Process,
  ProductCloseUp,
  Stats,
  WhyBigscrew,
} from "@/components/home/sections";

const title = "BigScrew Solutions — Helical Screw Pile Foundations";
const description =
  "Helical screw pile foundations designed, manufactured and installed by BigScrew Solutions. Solar, storage, prefab, industrial, fencing, poles, towers and bridges.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <WhyBigscrew />
      <ProductCloseUp />
      <Stats />
      <Process />
      <PileTypes />
      <Machinery />
      <ApplicationsGrid />
      <ClosingCta />
    </>
  );
}
