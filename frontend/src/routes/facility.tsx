import { createFileRoute } from "@tanstack/react-router";

import { ArrowLink } from "@/components/site/ArrowLink";
import { PageHero } from "@/components/site/PageHero";
import { Label, Reveal } from "@/components/site/motion-primitives";
import { img } from "@/lib/data";

const title = "Facility | BigScrew Solutions";
const description = "Facility and production imagery from BigScrew Solutions.";

export const Route = createFileRoute("/facility")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/facility" },
    ],
    links: [{ rel: "canonical", href: "/facility" }],
  }),
  component: FacilityPage,
});

const facilityImages = [
  { src: img.facilityImg1, alt: "BigScrew facility photo 1", name: "Rotary Swagging" },
  { src: img.facilityImg2, alt: "BigScrew facility photo 2", name: "Automatic spiral welding" },
  { src: img.facilityImg3, alt: "BigScrew facility photo 3", name: "3KW Tube Laser" },
  {
    src: img.facilityImg4,
    alt: "BigScrew facility photo 4",
    name: "Automatic Nut Welding Machine",
  },
  { src: img.facilityImg5, alt: "BigScrew facility photo 5", name: "CNC Bending machine" },
  {
    src: img.facilityImg6,
    alt: "BigScrew facility photo 6",
    name: "DNE Bystronic 6KW Laser cutting",
  },
];

function FacilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Facility"
        title="Built for"
        accent="production and precision"
        intro="A look inside the manufacturing and installation environment behind BigScrew screw pile foundations"
        image={img.factory}
        imageAlt="BigScrew manufacturing facility"
      />

      <section className="bg-background py-20 md:py-28">
        <div className="shell">
          <div className="mb-10 flex items-center justify-between gap-4">
            <Label tone="yellow">Gallery</Label>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {facilityImages.map((image, i) => (
              <Reveal key={image.alt + i} delay={(i % 3) * 0.06}>
                <div className="group overflow-hidden rounded-lg border border-border/40 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow/60 hover:shadow-xl">
                  <div className="aspect-square overflow-hidden bg-concrete">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="border-t border-border/40 bg-white px-3 py-2 text-center text-sm font-medium text-foreground/80">
                    {image.name}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16">
            <ArrowLink to="/contact" variant="outlineDark">
              Request a facility tour
            </ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
