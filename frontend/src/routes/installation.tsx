import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { PageHero } from "@/components/site/PageHero";
import { Label, Reveal } from "@/components/site/motion-primitives";
import { img, soilMachinery } from "@/lib/data";

const title = "Project Process for Foundation Construction | BigScrew Solutions";
const description =
  "Foundation construction begins with subsoil evaluation, planning, load-bearing validation, installation, and optional dismantling for temporary sites.";

const processSteps = [
  {
    n: "01",
    title: "Subsoil Evaluation",
    body: "Geotechnical survey assesses soil composition, load-bearing capacity, layer structure, and corrosion potential to ensure optimal foundation design.",
    image: img.heroExcavator,
    tag: "READ THE GROUND",
  },
  {
    n: "02",
    title: "Foundation Planning",
    body: "Using soil data, load specifications, and structural analysis, we select the appropriate groundscrew type and exact quantity needed.",
    image: img.Picture3,
    tag: "SET THE STRATEGY",
  },
  {
    n: "03",
    title: "Load-Bearing Capacity Test",
    body: "Tension-compression tests validate the structural design and determine the minimum installation torque required on site.",
    image: img.Picture1,
    tag: "PROVE THE LOAD",
  },
  {
    n: "04",
    title: "Installation & Documentation",
    body: "Skilled operators install with electric or hydraulic drivers. Torque at each position is recorded and loads can be placed immediately.",
    image: img.Picture2,
    tag: "BUILD WITH PROOF",
  },
  {
    n: "05",
    title: "Dismantling Option",
    body: "For temporary projects, groundscrews can be unscrewed, reused if undamaged, or sustainably recycled. Site restoration stays simple.",
    image: img.workerInstall,
    tag: "LEAVE LESS BEHIND",
  },
];

export const Route = createFileRoute("/installation")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/installation" },
    ],
    links: [{ rel: "canonical", href: "/installation" }],
  }),
  component: InstallationPage,
});

function InstallationPage() {
  return (
    <>
      <PageHero
        eyebrow="INSTALLATION"
        title="Machinery, matched"
        accent="to the ground"
        intro="Our own crew and machines turn the piles into the ground and get you building fast — the structure is set the same day."
        image={img.workerInstall}
        imageAlt="BigScrew crew guiding a helical screw pile into position on site"
      />

      <ProcessSection />

      <section className="border-y border-border bg-[#f4f1eb] py-20 md:py-28">
        <div className="shell">
          <Label tone="yellow">Machinery & soil</Label>
          <h2 className="mt-6 display-md text-foreground">Matched to the ground</h2>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Foundation performance depends as much on the installation rig as on the pile. We size
            the rotary drive head to the torque demand of the site's soil profile and mount it on a
            carrier. Design starts with the geotechnical report, or with a verification pile where
            no report exists. Carrier, drive head and helix diameter are then selected as per the
            terrain.
          </p>
          <div className="mt-10 overflow-x-auto rounded-lg border border-border bg-white/80">
            <table className="w-full min-w-3xl border-collapse text-left">
              <thead>
                <tr>
                  {["Soil condition", "Carrier machine", "Drive head", "Pile approach"].map(
                    (h, index) => (
                      <th
                        key={h}
                        scope="col"
                        className={[
                          "border-b border-border py-4 pr-6 tech-label text-muted-foreground",
                          index === 0 ? "pl-6" : "",
                        ].join(" ")}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {soilMachinery.map((r) => (
                  <tr key={r.soil} className="align-top">
                    <th
                      scope="row"
                      className="border-b border-border py-5 pl-6 pr-6 font-display text-lg font-semibold uppercase text-foreground"
                    >
                      {r.soil}
                    </th>
                    <td className="border-b border-border py-5 pr-6 text-sm text-muted-foreground">
                      {r.carrier}
                    </td>
                    <td className="border-b border-border py-5 pr-6 text-sm text-muted-foreground">
                      {r.driveHead}
                    </td>
                    <td className="border-b border-border py-5 pr-6 text-sm text-muted-foreground">
                      {r.approach}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((currentStep) => (currentStep + 1) % processSteps.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end 0.7"],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const activeStepData = (processSteps[activeStep] ?? processSteps[0])!;

  return (
    <section ref={sectionRef} className="overflow-hidden bg-[#111311] py-24 text-white md:py-36">
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-[minmax(260px,0.7fr)_minmax(0,1.3fr)] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Label tone="yellow">The field log / 01—05</Label>
            <h2 className="mt-7 max-w-xl font-display text-5xl font-bold uppercase leading-[0.92] text-white md:text-7xl">
              Built in <span className="text-yellow">five moves.</span>
            </h2>
            <p className="mt-7 max-w-sm text-base leading-relaxed text-white/60 md:text-lg">
              Every installation is measured, verified, and ready for the next trade the same day.
              Follow the work from first soil reading to final torque record.
            </p>

            <div className="relative mt-12 hidden aspect-[1448/1086] overflow-hidden border border-white/15 lg:block">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeStepData.n}
                  initial={{ opacity: 0, scale: 1.08, x: 28 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.96, x: -28 }}
                  transition={{ duration: 0.65, ease: [0.16, 0.84, 0.24, 1] }}
                  src={activeStepData.image}
                  alt={`${activeStepData.title} on a BigScrew installation site`}
                  className="absolute inset-0 h-full w-full object-cover grayscale-[0.2]"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <span className="tech-label text-white/70">LIVE SITE VIEW</span>
                <motion.span
                  key={activeStepData.n}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-4xl font-bold text-yellow"
                >
                  BS / {activeStepData.n}
                </motion.span>
              </div>
            </div>
          </div>

          <div className="relative" role="list" aria-label="Installation process steps">
            <div className="absolute bottom-0 left-[1.2rem] top-0 w-px bg-white/15 md:left-[2.35rem]">
              <motion.div
                style={{ height: progressHeight }}
                className="w-full origin-top bg-yellow"
              />
            </div>

            <div className="space-y-8 md:space-y-16">
              {processSteps.map((step, index) => (
                <Reveal key={step.n} delay={index * 0.04} className="relative" as="div">
                  <motion.article
                    role="listitem"
                    className="group grid gap-6 pl-12 md:grid-cols-[96px_minmax(0,1fr)] md:gap-10 md:pl-0"
                  >
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center border border-yellow bg-[#111311] font-display text-sm font-bold text-yellow md:h-[4.75rem] md:w-[4.75rem] md:text-xl">
                      {step.n}
                    </div>
                    <div className="border-t border-white/15 pt-5 transition-colors duration-500 group-hover:border-yellow md:pt-7">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="tech-label text-yellow">{step.tag}</span>
                        <span className="font-mono text-xs text-white/30">0{index + 1} / 05</span>
                      </div>
                      <div className="mt-4 grid gap-7 md:grid-cols-[minmax(0,1fr)_180px] md:items-start">
                        <div>
                          <h3 className="font-display text-3xl font-bold uppercase leading-none text-white md:text-5xl">
                            {step.title}
                          </h3>
                          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
                            {step.body}
                          </p>
                        </div>
                        <div className="aspect-[4/3] overflow-hidden border border-white/10 bg-white/5">
                          <img
                            src={step.image}
                            alt={`${step.title} on a BigScrew installation site`}
                            loading="lazy"
                            className="h-full w-full object-cover opacity-75 grayscale-[0.15] transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
