import { motion } from "framer-motion";

import { ArrowLink } from "@/components/site/ArrowLink";
import { img, installSteps } from "@/lib/data";

const ease = [0.16, 0.84, 0.24, 1] as const;

export function Hero() {
  return (
    <section className="relative flex min-h-[72svh] flex-col justify-end overflow-hidden bg-ink">
      <motion.img
        src={img.heroExcavator}
        alt="Excavator-mounted rotary drive head turning a helical screw pile into the ground on a BigScrew site"
        className="absolute inset-0 h-full w-full object-cover object-left scale-x-[-1]"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease }}
        fetchPriority="high"
        width={1600}
        height={1000}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />

      <div className="shell relative pt-24 pb-8 md:pt-28 md:pb-10 lg:pl-[170px]">
        <motion.div
          className="mb-4 flex items-center gap-3 text-yellow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
        >
          <span className="h-px w-10 bg-yellow/80" aria-hidden="true" />
          <p className="tech-label max-w-[80ch] inline-block rounded-md border border-yellow/30 bg-ink/80 px-4 py-2.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-yellow shadow-[0_0_24px_rgba(0,0,0,0.25)] sm:text-[0.64rem] md:text-[0.72rem]">
            INDIA’S LEADING EXPORTER OF SCREW PILE FOUNDATIONS
          </p>
        </motion.div>

        <h1 className="mt-0 display-xl text-on-ink">
          {["Foundations,", "driven not"].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.35 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
          <span className="block overflow-hidden">
            <motion.span
              className="block text-yellow"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.59, ease }}
            >
              poured
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease }}
        >
          <p className="max-w-xl text-base leading-relaxed text-on-ink-dim md:text-lg">
            Screw piles for solar, storage, housing, industrial structures, carports, EV charging,
            fencing, poles, towers and bridges. Installed in hours, loaded the same day.
          </p>
          <div className="flex flex-wrap gap-3">
            <ArrowLink to="/contact" variant="yellow">
              Get a project quote
            </ArrowLink>
            <ArrowLink to="/applications" variant="outlineLight">
              Explore applications
            </ArrowLink>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="relative border-t border-on-ink/15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="shell flex items-center gap-6 overflow-x-auto py-4 no-scrollbar">
          <span className="tech-label whitespace-nowrap text-on-ink-dim">
            BigScrew / Engineered Foundations
          </span>
          <span className="h-4 w-px shrink-0 bg-on-ink/20" aria-hidden />
          {installSteps.map((s) => (
            <span key={s.n} className="tech-label whitespace-nowrap text-on-ink-dim">
              <span className="text-yellow">{s.n}</span> {s.title}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
