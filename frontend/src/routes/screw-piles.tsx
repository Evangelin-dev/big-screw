import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, Gauge, RotateCw, Target } from "lucide-react";

import { ArrowLink } from "@/components/site/ArrowLink";
import { PageHero } from "@/components/site/PageHero";
import { Label, Reveal, TechLine } from "@/components/site/motion-primitives";
import { img, pileMatrix, pileTypes } from "@/lib/data";

const ease = [0.16, 0.84, 0.24, 1] as const;

const title = "Helical Screw Piles & Ground Screws | BigScrew Solutions";
const description =
  "Single-helix, multi-helix, ground screw and large-diameter piles — manufactured in-house on automated lines and checked batch by batch.";

export const Route = createFileRoute("/screw-piles")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/screw-piles" },
    ],
    links: [{ rel: "canonical", href: "/screw-piles" }],
  }),
  component: PilesPage,
});

function PilesPage() {
  return (
    <>
      <PageHero
        eyebrow="SCREW PILES"
        title="What is a"
        accent="screw pile?"
        intro="A screw pile is a manufactured steel foundation with a central hollow shaft attached with one or more helical plates 
or a continuous thread — like a giant screw. A machine turns the screw pile into the ground. There is no digging, no 
cement work, and no waiting for curing to set before you can build."
        image={img.pilesCrate}
        imageAlt="Crate of manufactured BigScrew helical screw piles ready for despatch"
      />

      <section className="bg-gradient-to-b from-background via-off-white to-background py-20 md:py-28">
        <div className="shell space-y-20">
          {pileTypes.map((p, i) => (
            <Reveal key={p.slug}>
              <motion.div
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="aspect-4/3 overflow-hidden rounded-lg border border-border bg-gradient-to-br from-white to-off-white shadow-lg"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    className="h-full w-full object-contain object-center p-4"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <TechLine className="flex-shrink-0" />
                  </div>
                  <p className="tech-label font-semibold text-yellow">{p.n}</p>
                  <h2 className="mt-3 display-md text-foreground">{p.name}</h2>
                  <p className="mt-4 text-lg font-semibold text-foreground">{p.summary}</p>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{p.body}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.applications.split(", ").map((app) => (
                      <span
                        key={app}
                        className="inline-block rounded-full border border-yellow/30 bg-yellow/10 px-3 py-1 text-xs font-semibold text-black"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <OldWayVsScrewPile />
      <InstallStrip />

      <section className="relative bg-gradient-to-b from-ink via-ink/95 to-ink/90 py-20 md:py-28">
        <div className="absolute inset-0 opacity-5">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <div className="shell relative">
          <Reveal>
            <Label tone="yellow">Selection matrix</Label>
          </Reveal>
          <motion.h2
            className="mt-6 display-md text-on-ink"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Which pile, which job
          </motion.h2>
          <motion.div
            className="mt-10 overflow-x-auto rounded-lg border border-on-ink/20 bg-gradient-to-br from-ink/50 to-ink/70 shadow-2xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <table className="w-full min-w-3xl border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-yellow/30 bg-gradient-to-r from-yellow/10 to-yellow/5">
                  <th scope="col" className="px-6 py-4 tech-label font-semibold text-yellow">
                    Pile type
                  </th>
                  {pileMatrix.columns.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      className="px-6 py-4 tech-label font-semibold text-yellow"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pileMatrix.rows.map((r, idx) => (
                  <motion.tr
                    key={r.type}
                    className={`border-b border-on-ink/10 transition-colors hover:bg-yellow/5 ${idx % 2 ? "bg-on-ink/5" : ""}`}
                    whileHover={{ backgroundColor: "rgba(255, 209, 0, 0.1)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <th
                      scope="row"
                      className="px-6 py-5 font-display text-lg font-semibold uppercase text-on-ink"
                    >
                      {r.type}
                    </th>
                    {r.fit.map((f, i) => (
                      <td key={i} className="px-6 py-5">
                        {f === "primary" ? (
                          <motion.span
                            className="inline-block rounded-full bg-yellow px-3 py-1 text-sm font-bold text-ink"
                            whileHover={{ scale: 1.1 }}
                          >
                            PRIMARY
                          </motion.span>
                        ) : f === "no" ? (
                          <span className="rounded bg-on-ink/10 px-3 py-1 text-sm font-semibold text-on-ink-dim">
                            Secondary
                          </span>
                        ) : (
                          <span className="text-xl text-on-ink-dim/50">—</span>
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ArrowLink to="/contact" variant="yellow">
              Ask for a pile recommendation
            </ArrowLink>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------- old way vs ours */

function OldWayVsScrewPile() {
  const comparison = [
    {
      title: "Concrete footing — the old way",
      steps: ["Dig a pit", "Build a mould", "Pour cement", "Wait 7 days to dry", "Clear the mess"],
      variant: "old" as const,
    },
    {
      title: "Screw pile — BigScrew Solutions",
      steps: ["Mark the spot", "Turn it in", "Check it's firm", "Build the same day"],
      variant: "new" as const,
    },
  ];

  return (
    <section className="bg-off-white py-20 md:py-12">
      <div className="shell">
        <Label tone="yellow">The difference</Label>
        <h2 className="mt-6 display-md text-foreground">Same foundation, a different afternoon</h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {comparison.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <motion.div
                className={`relative h-full overflow-hidden rounded-lg border p-8 md:p-10 ${
                  c.variant === "old"
                    ? "border-border bg-white"
                    : "border-yellow/40 bg-gradient-to-br from-yellow/[0.06] to-transparent shadow-[0_20px_50px_-15px_rgba(12,12,12,0.15)]"
                }`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {c.variant === "new" && (
                  <span className="absolute right-0 top-0 bg-yellow px-3 py-1.5 tech-label text-foreground">
                    Faster
                  </span>
                )}

                <div className="flex h-32 items-end justify-center border-b border-border pb-6">
                  {c.variant === "old" ? (
                    <svg width="90" height="100" viewBox="0 0 90 100" fill="none">
                      <line
                        x1="0"
                        y1="30"
                        x2="90"
                        y2="30"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-foreground/70"
                      />
                      <rect x="30" y="10" width="14" height="20" className="fill-foreground/80" />
                      <rect
                        x="18"
                        y="28"
                        width="54"
                        height="55"
                        rx="2"
                        strokeDasharray="4 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="fill-foreground/10 text-foreground/40"
                      />
                      <line
                        x1="26"
                        y1="40"
                        x2="64"
                        y2="70"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-foreground/30"
                      />
                      <line
                        x1="26"
                        y1="55"
                        x2="50"
                        y2="79"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-foreground/30"
                      />
                    </svg>
                  ) : (
                    <motion.svg
                      width="70"
                      height="100"
                      viewBox="0 0 70 100"
                      fill="none"
                      initial={{ y: -8 }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease }}
                    >
                      <line
                        x1="0"
                        y1="30"
                        x2="70"
                        y2="30"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-foreground/70"
                      />
                      <rect x="27" y="10" width="14" height="20" className="fill-foreground/80" />
                      <line
                        x1="34"
                        y1="30"
                        x2="34"
                        y2="90"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-foreground/80"
                      />
                      {[42, 56, 70, 84].map((cy) => (
                        <ellipse
                          key={cy}
                          cx="34"
                          cy={cy}
                          rx="18"
                          ry="6"
                          stroke="var(--color-yellow)"
                          strokeWidth="2"
                          fill="none"
                        />
                      ))}
                    </motion.svg>
                  )}
                </div>

                <h3 className="mt-6 font-display text-xl font-bold uppercase leading-tight text-foreground md:text-2xl">
                  {c.title}
                </h3>

                <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {c.steps.map((step, idx) => (
                    <span key={step} className="inline-flex items-center gap-2">
                      <span className={c.variant === "new" ? "font-medium text-foreground" : ""}>
                        {step}
                      </span>
                      {idx < c.steps.length - 1 && (
                        <span
                          aria-hidden
                          className={
                            c.variant === "new" ? "text-yellow-deep" : "text-foreground/30"
                          }
                        >
                          →
                        </span>
                      )}
                    </span>
                  ))}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- install steps */

function InstallStrip() {
  const steps = [
    { n: "01", title: "Position", body: "Set out on the drawing grid.", icon: Target },
    { n: "02", title: "Drive", body: "Turned to design depth.", icon: RotateCw },
    { n: "03", title: "Check", body: "Check it's turned in firmly enough.", icon: Gauge },
    { n: "04", title: "Load", body: "Structure set the same day.", icon: CheckCircle2 },
  ];

  return (
    <section className="bg-off-white pb-20 md:pb-28">
      <div className="shell">
        <div className="grid gap-px overflow-hidden rounded-lg border border-on-ink/10 bg-on-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 0.08}
              className="group bg-ink p-7 transition-colors duration-300 hover:bg-charcoal md:p-8"
            >
              <div className="flex items-center justify-between">
                <s.icon
                  className="h-6 w-6 text-yellow transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[8deg]"
                  strokeWidth={1.75}
                />
                <span className="font-display text-sm font-bold text-on-ink-dim/50">{s.n}</span>
              </div>
              <h3 className="mt-6 font-display text-lg font-bold uppercase tracking-wide text-on-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-on-ink-dim">{s.body}</p>
              <span
                aria-hidden
                className="mt-5 block h-0.5 w-8 origin-left scale-x-100 bg-yellow/40 transition-all duration-500 ease-out group-hover:w-12 group-hover:bg-yellow"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
