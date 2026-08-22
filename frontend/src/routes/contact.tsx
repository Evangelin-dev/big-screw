import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { Label, Reveal, TechLine } from "@/components/site/motion-primitives";
import { applications, company, img } from "@/lib/data";

const title = "Contact BigScrew Solutions | Screw Pile Foundations";
const description =
  "Talk to BigScrew Solutions about screw pile foundations. Plot No. R-413, MIDC TTC Industrial Area, Rabale, Navi Mumbai 400701, India.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Send us your loads."
        accent="We'll send back a foundation."
        image={img.towerBase}
        imageAlt="Steel structure seated on a BigScrew screw pile base plate"
      />

      <section className="bg-background py-20 md:py-28">
        <div className="shell grid gap-14 lg:grid-cols-2">
          <Reveal>
            <Label tone="yellow">Get in touch</Label>
            <div className="mt-10 space-y-10">
              <div className="flex gap-5">
                <MapPin className="mt-1 h-6 w-6 shrink-0 text-yellow" strokeWidth={1.5} />
                <address className="not-italic">
                  <p className="tech-label text-muted-foreground">Plant & office</p>
                  <p className="mt-3 font-display text-2xl leading-tight font-semibold uppercase text-foreground">
                    {company.address.line1} {company.address.line2}
                    <br />
                    {company.address.line3} {company.address.line4}
                  </p>
                </address>
              </div>
              <TechLine />
              <div className="flex gap-5">
                <Phone className="mt-1 h-6 w-6 shrink-0 text-yellow" strokeWidth={1.5} />
                <div>
                  <p className="tech-label text-muted-foreground">Phone</p>
                  <a
                    href={company.phoneHref}
                    className="mt-3 block font-display text-2xl font-semibold text-foreground transition-colors hover:text-yellow"
                  >
                    {company.phone}
                  </a>
                </div>
              </div>
              <TechLine />
              <div className="flex gap-5">
                <Mail className="mt-1 h-6 w-6 shrink-0 text-yellow" strokeWidth={1.5} />
                <div>
                  <p className="tech-label text-muted-foreground">Web</p>
                  <a
                    href={company.webHref}
                    rel="noreferrer"
                    className="mt-3 block font-display text-2xl font-semibold text-foreground transition-colors hover:text-yellow"
                  >
                    {company.web}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grain-dark p-8 md:p-12">
              <Label tone="yellow">What to send us</Label>
              <ul className="mt-8 space-y-5">
                {[
                  "Structure type and application",
                  "Site location and access",
                  "Soil or geotechnical report, if available",
                  "Loads, layout drawings and quantity",
                  "Programme dates",
                ].map((t, i) => (
                  <li key={t} className="flex gap-4 border-b border-on-ink/10 pb-5">
                    <span className="tech-label text-yellow">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-base text-on-ink">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm leading-relaxed text-on-ink-dim">
                Applications we cover: {applications.map((a) => a.short).join(" · ")}.
              </p>
              <a
                href={company.phoneHref}
                className="mt-10 inline-flex items-center gap-3 bg-yellow px-6 py-4 tech-label text-primary-foreground transition-colors hover:bg-yellow-deep"
              >
                Call {company.phone} <span aria-hidden>→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
