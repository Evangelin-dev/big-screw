import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Check, Minus, X } from "lucide-react";

import { ArrowLink } from "@/components/site/ArrowLink";
import { Label, Reveal, TechLine } from "@/components/site/motion-primitives";
import {
  applications,
  img,
  installSteps,
  pileMatrix,
  pileTypes,
  services,
  soilMachinery,
  stats,
  whyBigscrew,
} from "@/lib/data";
const ease = [0.16, 0.84, 0.24, 1] as const;
const torqueStyles: Record<string, string> = {
  "Low-torque": "bg-yellow text-ink",
  "Medium-torque": "bg-yellow text-ink",
  "High-torque": "bg-yellow text-ink",
};

function TorqueBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 bg-yellow px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-ink">
      <span className="h-1.5 w-1.5 bg-ink/70" />
      {label}
    </span>
  );
}
/* ---------------------------------------------------------------- statement */

export function BrandStatement() {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="shell">
        <Label tone="yellow">Who we are</Label>
        <Reveal className="mt-6">
          <div className="max-w-5xl">
            <h2 className="font-display text-3xl leading-[1.1] font-semibold uppercase text-foreground sm:text-5xl md:text-6xl">
              India's largest exporter of screw piles:
            </h2>
            <p className="mt-6 max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg">
              BigScrew Solutions makes every pile in-house, on fully automated manufacturing lines. We have been
              exporting screw piles for the last 3 years, and today we export more than any other manufacturer in India.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="group h-full rounded-[4px] border border-border bg-background p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-yellow/80 hover:bg-[#fffdf5] hover:shadow-[0_20px_40px_rgba(12,12,12,0.08)]">
                <TechLine className="transition-transform duration-300 group-hover:scale-x-105" />
                <p className="mt-5 tech-label text-yellow transition-colors duration-300 group-hover:text-yellow-deep">
                  {s.n}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold uppercase text-foreground transition-colors duration-300 group-hover:text-yellow-deep">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ product close */

/* ------------------------------------------------------------ product close */

export function ProductCloseUp() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="border-y border-border bg-white py-20 md:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* ---------- image ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="relative"
        >
          <div className="relative aspect-4/5 overflow-hidden bg-concrete/20 shadow-[14px_14px_0_var(--color-yellow)] transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-[18px_18px_0_var(--color-yellow)]">
            <motion.img
              src={img.pileProduct}
              alt="Close-up of a hot-dip galvanised BigScrew helical screw pile"
              style={{ y }}
              className="absolute inset-0 h-[116%] w-full object-cover"
              width={900}
              height={1125}
            />

            {/* bottom gradient for depth */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 via-black/0 to-transparent" />

            {/* corner accent, top-left only, inset from edge */}
            <span
              aria-hidden
              className="absolute left-5 top-5 h-6 w-6 border-l-2 border-t-2 border-yellow/90"
            />

            {/* floating spec chip */}
            <div className="absolute bottom-5 left-5 flex items-center gap-2 border border-white/15 bg-ink/85 px-3 py-2 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
              <span className="tech-label text-on-ink">Hot-dip galvanised</span>
            </div>
          </div>
        </motion.div>

        {/* ---------- copy ---------- */}
        <div>
          <Label tone="yellow">The product</Label>
          <h2 className="mt-6 display-lg text-foreground">
            Steel, thread, <span className="text-yellow">and ground</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            A steel shaft with one or more helical plates, turned into the soil until it reaches the resistance the
            design calls for. Hot-dip galvanised, made in-house on automated lines and checked batch by batch before
            it leaves the factory.
          </p>
          <dl className="mt-10 grid grid-cols-2 border-y border-border">
            {[
              ["Shaft Ø", "60 – 114 mm"],
              ["Length", "1000 – 5000 mm"],
              ["Coating", "HDG / HDG + Epoxy"],
              ["Helix", "1 – 4 or continuous"],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={`px-4 py-5 md:px-5 ${i % 2 === 0 ? "border-r border-border" : ""} ${i < 2 ? "border-b border-border" : ""}`}
              >
                <dt className="tech-label text-muted-foreground">{k}</dt>
                <dd className="mt-2 font-display text-xl font-bold text-foreground md:text-2xl">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <ArrowLink to="/screw-piles" variant="yellow">
              See the pile range
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- benefits */

export function WhyBigscrew() {
  return (
    <section className="border-y border-border bg-ink py-20 md:py-28">
      <div className="shell">
        <Label tone="yellow">Why BigScrew</Label>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyBigscrew.map((w, i) => (
            <Reveal
              key={w.title}
              delay={i * 0.07}
              className={`group flex min-h-64 flex-col justify-between border p-6 transition-all duration-300 hover:-translate-y-1 md:p-7 ${
                i === 0
                  ? "border-yellow bg-yellow text-foreground"
                  : "border-on-ink/20 bg-charcoal text-on-ink hover:border-yellow/70"
              }`}
            >
              <span
                className={`font-display text-6xl font-bold leading-none ${i === 0 ? "text-ink/20" : "text-yellow/35"}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold uppercase">{w.title}</h3>
                <p
                  className={`mt-3 text-sm leading-relaxed ${i === 0 ? "text-foreground/70" : "text-on-ink-dim"}`}
                >
                  {w.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ stats */

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <img
        src={img.factory}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-ink/70" />
      <div className="shell relative">
        <Label tone="yellow">Manufacturing</Label>
        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <TechLine />
              <p className="mt-6 font-display text-6xl leading-none font-bold text-on-ink md:text-7xl">{s.value}</p>
              <p className="mt-4 text-sm text-on-ink-dim">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- process */

export function Process() {
  return (
    <section id="process" className="bg-background py-24 md:py-32">
      <div className="shell">
        <Label tone="yellow">Installation process</Label>
        <h2 className="mt-6 display-lg text-foreground">Four moves to a loaded foundation</h2>
        <ol className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {installSteps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.08} className="bg-background p-8">
              <span className="font-display text-5xl font-bold text-yellow">{s.n}</span>
              <h3 className="mt-6 font-display text-2xl font-bold uppercase text-foreground">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-12">
          <ArrowLink to="/installation" variant="outlineDark">
            See the full installation method
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- pile types */

/* ------------------------------------------------------------- pile types */

export function PileTypes() {
  return (
    <section id="piles" className="grain-dark py-24 md:py-32">
      <div className="shell">
        <div className="flex flex-col items-center text-center">
          <Label tone="yellow">Pile types</Label>
          <h2 className="mt-6 display-lg text-on-ink">Three families of pile</h2>
          <p className="mt-4 max-w-xl text-sm text-on-ink-dim md:text-base">
            Every project starts by matching the pile family to the load and the ground.
          </p>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {pileTypes.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1} className="group flex flex-col items-center text-center">
              <div className="relative">
                {/* number badge */}
                <motion.span
                  initial={{ opacity: 0, y: -8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease }}
                  className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-yellow/40 bg-ink px-3 py-1 tech-label text-yellow"
                >
                  {p.n}
                </motion.span>

                <div className="relative aspect-4/5 w-full max-w-[280px] overflow-hidden border border-on-ink/10 bg-ink-soft transition-all duration-500 ease-out group-hover:border-yellow/50 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                  <img
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    className="mx-auto h-full w-[88%] object-contain object-center bg-white transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                  {/* subtle top-to-bottom sheen on hover */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </div>

              <h3 className="mt-7 font-display text-2xl font-bold uppercase text-on-ink">{p.name}</h3>

              {/* animated underline */}
              <span className="mt-3 h-[2px] w-8 origin-center bg-yellow/60 transition-all duration-500 ease-out group-hover:w-16 group-hover:bg-yellow" />

              <p className="mt-4 max-w-xs text-sm leading-relaxed text-on-ink-dim">{p.summary}</p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-on-ink-dim/80">{p.body}</p>

              <p className="mt-5 tech-label text-yellow/80 transition-colors duration-300 group-hover:text-yellow">
                {p.applications}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 overflow-x-auto">
          <table className="mx-auto w-full min-w-3xl border-collapse text-left">
            <caption className="sr-only">Which pile type suits which application</caption>
            <thead>
              <tr>
                <th scope="col" className="border-b border-on-ink/20 py-4 pr-6 tech-label text-on-ink-dim">
                  Pile type
                </th>
                {pileMatrix.columns.map((c) => (
                  <th key={c} scope="col" className="border-b border-on-ink/20 py-4 pr-6 text-center tech-label text-on-ink-dim">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pileMatrix.rows.map((r) => (
                <tr key={r.type} className="transition-colors duration-300 hover:bg-on-ink/[0.03]">
                  <th scope="row" className="border-b border-on-ink/10 py-4 pr-6 font-display text-lg font-semibold uppercase text-on-ink">
                    {r.type}
                  </th>
                  {r.fit.map((f, i) => (
                    <td key={i} className="border-b border-on-ink/10 py-4 pr-6 text-center">
                      {f === "primary" ? (
                        <Check className="mx-auto h-5 w-5 text-yellow" strokeWidth={2} aria-label="Primary fit" />
                      ) : f === "no" ? (
                        <Minus className="mx-auto h-5 w-5 text-on-ink-dim" strokeWidth={2} aria-label="Secondary fit" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-on-ink-dim/40" strokeWidth={2} aria-label="Not suited" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- applications */

/* ----------------------------------------------------------- applications */

/* ----------------------------------------------------------- applications */

export function ApplicationsGrid() {
  const lastIndex = applications.length - 1;

  return (
    <section id="solutions" className="bg-background py-24 md:py-11">
      <div className="shell">
        <Label tone="yellow">Applications</Label>
        <h2 className="mt-6 display-lg text-foreground">Seven applications</h2>

        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {applications.map((a, i) => {
            const isLast = i === lastIndex;

            if (isLast) {
              return (
                <Reveal
                  key={a.slug}
                  delay={(i % 3) * 0.07}
                  className="group bg-background md:col-span-2 lg:col-span-3"
                >
                  <ArrowLink
                    to="/applications/$slug"
                    params={{ slug: a.slug }}
                    variant="bare"
                    className="grid md:grid-cols-2"
                  >
                    <div className="aspect-16/10 overflow-hidden md:aspect-auto">
                      <img
                        src={a.hero}
                        alt={a.heroAlt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-8 md:p-12">
                      <span className="tech-label text-yellow-deep">{a.n}</span>
                      <h3 className="mt-4 font-display text-3xl leading-tight font-bold uppercase text-foreground md:text-4xl">
                        {a.title}
                      </h3>
                      <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">{a.intro}</p>
                      <span className="mt-8 inline-flex w-fit items-center gap-2 bg-yellow px-5 py-3 tech-label text-foreground transition-all duration-300 group-hover:gap-3 group-hover:bg-yellow-deep">
                        View application <span aria-hidden>→</span>
                      </span>
                    </div>
                  </ArrowLink>
                </Reveal>
              );
            }

            return (
              <Reveal key={a.slug} delay={(i % 3) * 0.07} className="group bg-background">
                <ArrowLink to="/applications/$slug" params={{ slug: a.slug }} variant="bare" className="block">
                  <div className="aspect-16/11 overflow-hidden">
                    <img
                      src={a.hero}
                      alt={a.heroAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7">
                    <span className="tech-label text-yellow-deep">{a.n}</span>
                    <h3 className="mt-4 font-display text-2xl leading-tight font-bold uppercase text-foreground">
                      {a.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{a.intro}</p>
                    <span className="mt-6 inline-flex w-fit items-center gap-2 border border-yellow/70 px-4 py-2 tech-label text-yellow-deep transition-all duration-300 group-hover:gap-3 group-hover:border-yellow group-hover:bg-yellow group-hover:text-foreground">
                      View application <span aria-hidden>→</span>
                    </span>
                  </div>
                </ArrowLink>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
/* -------------------------------------------------------------- machinery */

/* -------------------------------------------------------------- machinery */

export function Machinery() {
  return (
    <section className="bg-off-white py-20 md:py-28">
      <div className="shell">
        <Label tone="yellow">Machinery & soil</Label>
        <h2 className="mt-6 display-lg text-foreground">Matched to the ground</h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
  Foundation performance depends as much on the installation rig as on the pile. We size the rotary
  drive head to the torque demand of the site's soil profile and mount it on a carrier. Design starts
  with the geotechnical report, or with a verification pile where no report exists. Carrier, drive head
  and helix diameter are then selected as per the terrain.
</p>

{/* ---------- gallery image ---------- */}
<Reveal className="mt-12">
  <figure className="overflow-hidden rounded-[4px] border border-border bg-white p-3 shadow-[0_20px_50px_rgba(12,12,12,0.08)] md:p-4">
    <div className="overflow-hidden rounded-[2px] bg-concrete/20">
      <img
        src={img.heroExcavator}
        alt="Drive heads and carriers matched to soil condition — equipment gallery"
        loading="lazy"
        className="h-auto w-full object-cover"
        width={1200}
        height={760}
      />
    </div>
    <figcaption className="mt-4 px-1 pb-1 tech-label text-muted-foreground">
      Drive heads and carriers — equipment gallery
    </figcaption>
  </figure>
</Reveal>

{/* ---------- desktop / tablet: aligned grid table ---------- */}
<div className="mt-14 hidden md:block">
          <div className="grid grid-cols-[1.1fr_1fr_0.9fr_1.3fr] gap-x-6 border-t-2 border-foreground/80 pb-2">
            {["Soil condition", "Carrier machine", "Drive head", "Pile approach"].map((h) => (
              <span key={h} className="pt-5 tech-label text-muted-foreground">
                {h}
              </span>
            ))}
          </div>

          {soilMachinery.map((r, i) => (
            <Reveal
              as="div"
              key={r.soil}
              delay={i * 0.05}
              className="group relative grid grid-cols-[1.1fr_1fr_0.9fr_1.3fr] items-center gap-x-6 border-b border-border py-6 transition-colors duration-300 hover:bg-white"
            >
              <span
                aria-hidden
                className="absolute -left-4 top-0 h-full w-1 origin-left scale-y-0 bg-yellow transition-transform duration-300 ease-out group-hover:scale-y-100"
              />
              <span className="pr-4 font-display text-lg font-semibold uppercase leading-tight text-foreground">
                {r.soil}
              </span>
              <span className="pr-4 text-sm leading-snug text-muted-foreground">{r.carrier}</span>
              <TorqueBadge label={r.driveHead} />
              <span className="text-sm leading-snug text-muted-foreground">{r.approach}</span>
            </Reveal>
          ))}
        </div>

        {/* ---------- mobile: stacked cards, nothing clipped ---------- */}
        <div className="mt-10 space-y-4 md:hidden">
          {soilMachinery.map((r, i) => (
            <Reveal key={r.soil} delay={i * 0.05} className="border border-border bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-semibold uppercase text-foreground">{r.soil}</h3>
                <TorqueBadge label={r.driveHead} />
              </div>
              <dl className="mt-4 grid grid-cols-1 gap-3">
                {[
                  ["Carrier machine", r.carrier],
                  ["Pile approach", r.approach],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 border-t border-border pt-3 first:border-t-0 first:pt-0"
                  >
                    <dt className="tech-label shrink-0 text-muted-foreground">{k}</dt>
                    <dd className="text-right text-sm text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
/* ---------------------------------------------------------- closing / CTA */

export function ClosingCta() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink">
      <motion.img
        src={img.workerInstall}
        alt="BigScrew installation crew guiding a screw pile into position on site"
        style={{ y }}
        className="absolute inset-0 h-[120%] w-full object-cover opacity-60"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/40 to-ink/60" />

      <div className="shell relative flex w-full flex-col items-center py-24 text-center md:py-32">
        <motion.h2
          className="w-full font-display font-bold uppercase leading-[1.1] tracking-normal text-on-ink [text-shadow:0_2px_20px_rgba(0,0,0,0.5)] sm:tracking-wide"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            className="mx-auto block w-full text-center text-[clamp(1.75rem,6vw,4.5rem)]"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease }}
          >
            Send us your loads
          </motion.span>
          <motion.span
            className="mx-auto mt-1 block w-full text-center text-[clamp(1.75rem,6vw,4.5rem)] text-yellow"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            We'll send back a foundation
          </motion.span>
        </motion.h2>

        <motion.div
          className="mt-9 flex w-full flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
        >
          <ArrowLink to="/contact" variant="yellow">
            Get a project quote
          </ArrowLink>
          <ArrowLink to="/installation" variant="outlineLight">
            How installation works
          </ArrowLink>
        </motion.div>

        <motion.div
          aria-hidden
          className="mt-12 h-px w-24 bg-yellow/50"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
        />
      </div>
    </section>
  );
}
