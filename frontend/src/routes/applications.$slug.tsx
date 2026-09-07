import { createFileRoute, notFound } from "@tanstack/react-router";

import { ArrowLink } from "@/components/site/ArrowLink";
import { PageHero, SpecTable } from "@/components/site/PageHero";
import { Label, Reveal, TechLine } from "@/components/site/motion-primitives";
import { applications, getApplication, installSteps, type Application } from "@/lib/data";

export const Route = createFileRoute("/applications/$slug")({
  loader: ({ params }) => {
    const application = getApplication(params.slug);
    if (!application) throw notFound();
    return { application };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Application not found | BigScrew Solutions" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const a = loaderData.application;
    return {
      meta: [
        { title: a.metaTitle },
        { name: "description", content: a.metaDescription },
        { property: "og:title", content: a.metaTitle },
        { property: "og:description", content: a.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/applications/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/applications/${params.slug}` }],
    };
  },
  component: ApplicationPage,
});

function ApplicationPage() {
  const a = Route.useLoaderData().application as Application;
  const others = applications.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`Application ${a.n}`}
        title={a.headline}
        accent={a.headlineAccent}
        image={a.hero}
        imageAlt={a.heroAlt}
      />

      <section className="bg-background py-12 md:py-16">
        <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-foreground md:text-xl">{a.intro}</p>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pl-10">
            <TechLine />
            <p className="mt-6 tech-label text-yellow">Pile types used</p>
            <p className="mt-4 font-display text-2xl leading-tight font-semibold uppercase text-foreground">
              {a.pileTypes}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-off-white py-12 md:py-16">
        <div className="shell">
          <Label tone="yellow">Gallery</Label>
          <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4">
            {a.gallery.map((g, i) => (
              <Reveal key={g.src + i} delay={(i % 2) * 0.08}>
                <div className="overflow-hidden rounded-sm bg-background">
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className="block h-auto w-full transition-transform duration-[1400ms] ease-out hover:scale-105"
                  />
                </div>
                <p className="mt-3 tech-label text-muted-foreground">{g.caption}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-12 md:py-16">
        <div className="shell">
          <Label tone="yellow">Technical specification</Label>
          <h2 className="mt-6 display-md text-foreground">Sizes for this application.</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Dimensions in millimetres. HDG — hot-dip galvanised.
          </p>
          <div className="mt-10">
            <SpecTable headers={a.specHeaders} rows={a.specRows} />
          </div>
        </div>
      </section>

      <section className="grain-dark py-12 md:py-16">
        <div className="shell">
          <Label tone="yellow">On site</Label>
          <h2 className="mt-6 display-md text-on-ink">How it goes in.</h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {installSteps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.07}>
                <TechLine />
                <p className="mt-5 font-display text-4xl font-bold text-yellow">{s.n}</p>
                <h3 className="mt-3 font-display text-xl font-bold uppercase text-on-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-on-ink-dim">{s.body}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <ArrowLink to="/contact" variant="yellow">
              Discuss this application
            </ArrowLink>
            <ArrowLink to="/installation" variant="outlineLight">
              Installation method
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className="bg-off-white py-12 md:py-16">
        <div className="shell">
          <Label tone="yellow">Other applications</Label>
          <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-3">
            {others.map((o) => (
              <ArrowLink
                key={o.slug}
                to="/applications/$slug"
                params={{ slug: o.slug }}
                variant="bare"
                className="group block bg-off-white"
              >
                <div className="aspect-16/11 overflow-hidden">
                  <img
                    src={o.hero}
                    alt={o.heroAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <span className="tech-label text-yellow">{o.n}</span>
                  <h3 className="mt-3 font-display text-xl font-bold uppercase text-foreground">
                    {o.title}
                  </h3>
                </div>
              </ArrowLink>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
