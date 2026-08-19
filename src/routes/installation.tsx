import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Label, Reveal } from "@/components/site/motion-primitives";
import { img, soilMachinery } from "@/lib/data";

const title = "Project Process for Foundation Construction | BigScrew Solutions";
const description =
  "Foundation construction begins with subsoil evaluation, planning, load-bearing validation, installation, and optional dismantling for temporary sites.";

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

      <section className="bg-white py-20 md:py-28">
        <div className="shell">
          <header className="w-full text-center">
            <h2 className="display-md text-foreground">Project Process for Foundation Construction</h2>
            <p className="mx-auto mt-5 max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Building a foundation with ground screws is straightforward when you follow the proven process. Our
              systematic approach ensures reliable, long-lasting installations every time.
            </p>
          </header>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr_1fr] lg:items-center">
            {/* Left Images */}
            <div className="grid grid-cols-1 gap-4">
              {[img.heroExcavator, img.Picture3].map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="overflow-hidden rounded-lg border border-border bg-[#f4f1eb] shadow-sm"
                >
                  <img
                    src={image}
                    alt={
                      index === 0
                        ? "BigScrew crew preparing and installing screw piles on site"
                        : "BigScrew installation crew working on a screw pile foundation site"
                    }
                    className="aspect-square w-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Center Text */}
            <div>
              <div className="space-y-8">
                {[
                  {
                    n: "01",
                    title: "Subsoil Evaluation",
                    body:
                      "Geotechnical survey assesses soil composition, load-bearing capacity, layer structure, and corrosion potential to ensure optimal foundation design",
                  },
                  {
                    n: "02",
                    title: "Foundation Planning",
                    body:
                      "Using soil data, load specifications, and structural analysis, we select the appropriate groundscrew type and determine exact quantity needed",
                  },
                  {
                    n: "03",
                    title: "Load-Bearing Capacity Test",
                    body:
                      "Validate structural design with tension-compression tests using load cell apparatus. Determine minimum installation torque requirements",
                  },
                  {
                    n: "04",
                    title: "Installation & Documentation",
                    body:
                      "Skilled operators install groundscrews using electric or hydraulic drivers. Torque at each position is recorded. Loads can be placed immediately after installation",
                  },
                  {
                    n: "05",
                    title: "Dismantling Option",
                    body:
                      "For temporary projects, groundscrews can be easily unscrewed, reused if undamaged, or sustainably recycled. Site restoration is simple",
                  },
                ].map((step, index) => (
                  <Reveal key={step.n} delay={index * 0.05}>
                    <div className="grid gap-4 md:grid-cols-[88px_minmax(0,1fr)] md:items-start">
                      <div
                        className="flex h-[4.5rem] w-[4.25rem] items-center justify-center bg-[#edf2f0] text-4xl font-bold leading-none text-foreground"
                        style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)" }}
                      >
                        {step.n}
                      </div>

                      <div className="pt-1">
                        <h3 className="text-3xl font-bold uppercase text-foreground md:text-[2.1rem]">{step.title}</h3>
                        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{step.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right Images */}
            <div className="grid grid-cols-1 gap-4">
              {[img.Picture1, img.Picture2].map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="overflow-hidden rounded-lg border border-border bg-[#f4f1eb] shadow-sm"
                >
                  <img
                    src={image}
                    alt={
                      index === 0
                        ? "Worker checking and validating ground screw installation with equipment"
                        : "Ground screw installation and equipment detail on a construction site"
                    }
                    className="aspect-square w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-[#f4f1eb] py-20 md:py-28">
        <div className="shell">
          <Label tone="yellow">Machinery & soil</Label>
          <h2 className="mt-6 display-md text-foreground">Matched to the ground</h2>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Foundation performance depends as much on the installation rig as on the pile. We size the rotary drive
            head to the torque demand of the site's soil profile and mount it on a carrier. Design starts with the
            geotechnical report, or with a verification pile where no report exists. Carrier, drive head and helix
            diameter are then selected as per the terrain.
          </p>
          <div className="mt-10 overflow-x-auto rounded-lg border border-border bg-white/80">
            <table className="w-full min-w-3xl border-collapse text-left">
              <thead>
                <tr>
                  {['Soil condition', 'Carrier machine', 'Drive head', 'Pile approach'].map((h, index) => (
                    <th
                      key={h}
                      scope="col"
                      className={['border-b border-border py-4 pr-6 tech-label text-muted-foreground', index === 0 ? 'pl-6' : ''].join(' ')}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {soilMachinery.map((r) => (
                  <tr key={r.soil} className="align-top">
                    <th scope="row" className="border-b border-border py-5 pl-6 pr-6 font-display text-lg font-semibold uppercase text-foreground">
                      {r.soil}
                    </th>
                    <td className="border-b border-border py-5 pr-6 text-sm text-muted-foreground">{r.carrier}</td>
                    <td className="border-b border-border py-5 pr-6 text-sm text-muted-foreground">{r.driveHead}</td>
                    <td className="border-b border-border py-5 pr-6 text-sm text-muted-foreground">{r.approach}</td>
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
