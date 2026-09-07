import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { PageHero } from "@/components/site/PageHero";
import { Label, Reveal, TechLine } from "@/components/site/motion-primitives";
import { img, services, stats, whyBigscrew } from "@/lib/data";

const title = "About BigScrew Solutions | Screw Pile Manufacturer, Navi Mumbai";
const description =
  "BigScrew Solutions designs, manufactures and installs helical screw piles from Rabale, Navi Mumbai — 100% automated manufacturing and India's #1 exporter.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT US"
        title="India's largest exporter of"
        accent="screw piles"
        intro="BigScrew Solutions makes every pile in-house, on fully automated manufacturing lines. We have been exporting screw piles for the last 3 years, and today we export more than any other manufacturer in India."
        image={img.factory}
        imageAlt="BigScrew automated screw pile manufacturing plant"
      />
      <section className="bg-off-white py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-20">
            {/* left: sticky intro */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Label tone="yellow">Why BigScrew</Label>
              <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.05] text-foreground md:text-5xl">
                Four reasons the order desk keeps ringing
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Nothing here is outsourced. Every claim below happens on our own factory floor,
                checked before it ships.
              </p>
            </div>

            {/* right: editorial list */}
            <div className="relative border-t border-foreground/15">
              {whyBigscrew.map((w, i) => (
                <motion.div
                  key={w.title}
                  className="group relative grid grid-cols-[auto_1fr] items-start gap-6 border-b border-foreground/15 py-8 md:gap-10 md:py-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  {/* hover fill background */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 -left-4 -right-4 -z-10 origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100 md:-left-6 md:-right-6"
                  />

                  <span className="font-display text-5xl font-bold leading-none text-foreground/10 transition-colors duration-500 group-hover:text-yellow md:text-6xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
                    <h3 className="font-display text-xl font-bold uppercase leading-tight text-foreground transition-transform duration-500 group-hover:translate-x-1 md:text-2xl">
                      {w.title}
                    </h3>
                    <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-right">
                      {w.body}
                    </p>
                  </div>

                  {/* arrow that slides in on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-8 -translate-x-2 text-2xl text-yellow opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 md:top-10"
                  >
                    →
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-off-white py-20 md:py-2">
        <div className="shell">
          <div className="mt-14 border-t border-border pt-10">
            <div className="text-center md:text-left">
              <Label tone="yellow">Leadership Team</Label>
              <p className="mt-5 font-display text-2xl font-semibold uppercase tracking-[0.08em] text-foreground md:text-3xl">
                BUILT BY OPERATORS, ENGINEERS, AND STRATEGISTS
              </p>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Karandeep Saini",
                  role: "Founder & CEO",
                  initials: "KS",
                  description:
                    "40+ years family manufacturing heritage through Rajog Equipment. Personally, designs custom piling machines, manufacturing automation and soil-adaptive screw geometries. Acts as a bridge between design, manufacturing & installation.",
                  focus: "Innovation, Vertical Integration & Commercial Growth",
                  accent: "from-yellow/20 to-yellow/10",
                  borderColor: "border-yellow/50",
                },
                {
                  name: "Dr. Pavan Kumar",
                  role: "Geotechnical Lead",
                  initials: "PK",
                  description:
                    "PhD, IIT Bhubaneswar. Published researcher in geotechnics, deep foundations, and soil-structure interaction. Screw pile design and capacity optimisation specialist.",
                  focus: "Geotech Design & Verification",
                  accent: "from-blue-500/20 to-blue-400/10",
                  borderColor: "border-blue-500/50",
                },
                {
                  name: "Harjith Saini",
                  role: "Advisor & Director",
                  initials: "HS",
                  description:
                    "2nd generation entrepreneur. Deep background in heavy engineering manufacturing. Scaled boiler production and automotive fabrication.",
                  focus: "Advisory role",
                  accent: "from-amber-500/20 to-amber-400/10",
                  borderColor: "border-amber-500/50",
                },
              ].map((member, idx) => (
                <motion.div
                  key={member.name}
                  className="overflow-hidden rounded-xl border border-border bg-gradient-to-b from-white to-gray-50 shadow-sm hover:shadow-md transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  {/* Gradient header accent */}
                  <div className={`h-1.5 bg-gradient-to-r ${member.accent}`} />

                  <div className="p-8 md:p-7">
                    {/* Initials badge */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-foreground to-foreground/80 text-white font-display font-bold text-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                      {member.initials}
                    </div>

                    {/* Name and role */}
                    <h3 className="font-display text-2xl font-bold uppercase text-foreground leading-tight">
                      {member.name}
                    </h3>
                    <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-black bg-yellow/10 w-fit px-3 py-1.5 rounded-full">
                      {member.role}
                    </p>

                    {/* Description */}
                    <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                      {member.description}
                    </p>

                    {/* Focus area */}
                    <div className="mt-6 border-t border-border pt-4">
                      <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Focus
                      </p>
                      <p className="mt-2 text-sm font-medium text-foreground">{member.focus}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-14 border-t border-border pt-10">
              <p className="tech-label text-muted-foreground">
                Manufacturing heritage — Rajog Equipment
              </p>

              <div className="mt-10 grid gap-0 sm:grid-cols-3">
                {[
                  { value: "40+", label: "Years in heavy fabrication" },
                  { value: "30,000+", label: "Groundscrews exported" },
                  { value: "300+", label: "Tons of foundations supplied" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="min-h-[94px] border-l-2 border-yellow/60 px-6"
                  >
                    <p className="font-display text-3xl font-bold leading-none text-foreground md:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm leading-snug text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grain-dark py-16 md:py-24">
        <div className="shell">
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.07}>
                <motion.div
                  className="group relative overflow-hidden bg-gradient-to-br from-ink-soft/80 to-ink/60 rounded-lg p-8 border border-on-ink/10 hover:border-yellow/40 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated top line */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow to-transparent"
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: i * 0.15 }}
                  />

                  {/* Corner accent on hover */}
                  <motion.div
                    className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-yellow opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-yellow opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <motion.div
                          className="absolute inset-0 bg-yellow/20 rounded-full blur-md"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        <div className="relative w-12 h-12 rounded-full bg-yellow/10 border border-yellow/40 flex items-center justify-center">
                          <span className="text-lg font-bold text-yellow">{s.n}</span>
                        </div>
                      </div>
                      <h3 className="font-display text-xl font-bold uppercase text-on-ink flex-1">
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-on-ink-dim">{s.body}</p>
                  </motion.div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- stats */}
      <section className="border-t border-border bg-off-white py-20 md:py-28">
        <div className="shell">
          <div>
            <Label tone="yellow">By the numbers</Label>
            <h2 className="mt-6 font-display text-3xl font-bold uppercase leading-[1.05] text-foreground md:text-4xl">
              Manufacturing at scale
            </h2>
          </div>

          <div className="mt-14 grid divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group px-2 py-8 first:pl-0 sm:px-8 md:px-10"
              >
                <span className="tech-label text-yellow-deep/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 font-display text-5xl leading-none font-bold text-foreground transition-colors duration-300 group-hover:text-yellow-deep md:text-6xl">
                  {s.value}
                </p>
                <p className="mt-4 text-sm leading-snug text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
