import { createFileRoute } from "@tanstack/react-router";

import { ArrowLink } from "@/components/site/ArrowLink";
import { PageHero } from "@/components/site/PageHero";
import { Label, Reveal } from "@/components/site/motion-primitives";
import { applications, img } from "@/lib/data";

const title = "Screw Pile Applications | BigScrew Solutions";
const description =
  "Screw pile foundations for solar, battery storage, prefab homes, industrial structures, fencing, poles and towers, walkbridges and sea view platforms.";

export const Route = createFileRoute("/applications/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/applications" },
    ],
    links: [{ rel: "canonical", href: "/applications" }],
  }),
  component: ApplicationsIndex,
});

function ApplicationsIndex() {
  return (
    <>
      <PageHero
        eyebrow="APPLICATIONS"
        title="Seven"
        accent="applications"
        intro="From solar tables to sea view platforms — the same steel, thread and torque, sized to each structure."
        image={img.solarSite}
        imageAlt="Solar ground mount array founded on BigScrew helical screw piles"
      />

      <section className="bg-background py-20 md:py-28">
        <div className="shell grid md:grid-cols-2 lg:grid-cols-3">
          {applications.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 0.07} className="bg-background">
              <ArrowLink to="/applications/$slug" params={{ slug: a.slug }} variant="bare" className="group block">
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={a.hero}
                    alt={a.heroAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <Label tone="yellow">{a.n}</Label>
                  <h2 className="mt-4 font-display text-2xl leading-tight font-bold uppercase text-foreground">
                    {a.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{a.intro}</p>
                  <span className="mt-6 inline-flex items-center gap-2 tech-label text-foreground">
                    View application <span aria-hidden>→</span>
                  </span>
                </div>
              </ArrowLink>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
