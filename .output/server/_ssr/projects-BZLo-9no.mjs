import { r as __toESM } from "../_runtime.mjs";
import { r as motion } from "../_libs/framer-motion+[...].mjs";
import { c as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as PageHero } from "./PageHero-CwH4hGRu.mjs";
import { c as ArrowLink, d as galleryItems, f as img } from "./router-Ddo4EKlf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-BZLo-9no.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProjectsPage() {
	const categories = (0, import_react.useMemo)(() => {
		return ["All", ...Array.from(new Set(galleryItems.map((g) => g.app).filter(Boolean)))];
	}, []);
	const [active, setActive] = (0, import_react.useState)("All");
	const filtered = (0, import_react.useMemo)(() => active === "All" ? galleryItems : galleryItems.filter((g) => g.app === active), [active]);
	const columns = (0, import_react.useMemo)(() => {
		const cols = [
			[],
			[],
			[]
		];
		filtered.forEach((item, i) => cols[i % 3]?.push(item));
		return cols;
	}, [filtered]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Projects",
		title: "Driven ground,",
		accent: "everywhere",
		intro: "Installations across solar, storage, housing, industry, fencing, infrastructure and coastal structures.",
		image: img.bridgePlatform,
		imageAlt: "Elevated viewing platform on BigScrew screw pile foundations"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background py-20 md:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2 border-b border-border pb-8",
					children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setActive(cat),
						className: `px-4 py-2 tech-label transition-all duration-300 ${active === cat ? "bg-foreground text-background" : "border border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"}`,
						children: cat
					}, cat))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					layout: true,
					className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: columns.map((col, colIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-5",
						children: col.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							layout: true,
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .4,
								delay: i * .04
							},
							className: "group relative overflow-hidden",
							style: { aspectRatio: "1386 / 1135" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: g.src,
									alt: g.alt,
									loading: "lazy",
									className: "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
									children: [g.app && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "tech-label text-yellow",
										children: g.app
									}), g.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm font-medium text-white",
										children: g.caption
									})]
								})
							]
						}, g.src))
					}, colIdx))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-16 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
						to: "/contact",
						variant: "outlineDark",
						children: "Start a project"
					})
				})
			]
		})
	})] });
}
//#endregion
export { ProjectsPage as component };
