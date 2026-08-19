import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { ArrowLink } from "@/components/site/ArrowLink";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/motion-primitives";
import { galleryItems, img } from "@/lib/data";

const title = "Screw Pile Projects & Site Gallery | BigScrew Solutions";
const description =
  "Site photography from BigScrew screw pile installations across solar, battery storage, prefab, industrial, fencing, poles and bridge projects.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(galleryItems.map((g) => g.app).filter(Boolean)));
    return ["All", ...unique];
  }, []);

  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () => (active === "All" ? galleryItems : galleryItems.filter((g) => g.app === active)),
    [active],
  );

  // distribute into 3 columns for masonry effect
  const columns = useMemo(() => {
    const cols: (typeof galleryItems)[] = [[], [], []];
    filtered.forEach((item, i) => cols[i % 3].push(item));
    return cols;
  }, [filtered]);

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Driven ground,"
        accent="everywhere"
        intro="Installations across solar, storage, housing, industry, fencing, infrastructure and coastal structures."
        image={img.bridgePlatform}
        imageAlt="Elevated viewing platform on BigScrew screw pile foundations"
      />

      <section className="bg-background py-20 md:py-28">
        <div className="shell">
          {/* filter pills */}
          <div className="flex flex-wrap gap-2 border-b border-border pb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 tech-label transition-all duration-300 ${
                  active === cat
                    ? "bg-foreground text-background"
                    : "border border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* masonry columns */}
          <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-5">
                {col.map((g, i) => (
                  <motion.div
                    layout
                    key={g.src}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="group relative overflow-hidden"
                    style={{ aspectRatio: i % 3 === 0 ? "4/5" : i % 3 === 1 ? "1/1" : "4/3" }}
                  >
                    <img
                      src={g.src}
                      alt={g.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {g.app && <p className="tech-label text-yellow">{g.app}</p>}
                      {g.caption && <p className="mt-1 text-sm font-medium text-white">{g.caption}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>

          <div className="mt-16 flex justify-center">
            <ArrowLink to="/contact" variant="outlineDark">
              Start a project
            </ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}