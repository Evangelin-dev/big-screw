import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Reveal, t as Label } from "./motion-primitives-BfjJ5WDa.mjs";
import { t as PageHero } from "./PageHero-B0eXY2Ef.mjs";
import { c as ArrowLink, f as img, l as applications } from "./router-DUZ1py_X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/applications.index-BxRM3mXI.js
var import_jsx_runtime = require_jsx_runtime();
function ApplicationsIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "APPLICATIONS",
		title: "Seven",
		accent: "applications",
		intro: "From solar tables to sea view platforms — the same steel, thread and torque, sized to each structure.",
		image: img.solarSite,
		imageAlt: "Solar ground mount array founded on BigScrew helical screw piles"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background py-20 md:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shell grid md:grid-cols-2 lg:grid-cols-3",
			children: applications.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i % 3 * .07,
				className: "bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ArrowLink, {
					to: "/applications/$slug",
					params: { slug: a.slug },
					variant: "bare",
					className: "group block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-4/3 overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: a.hero,
							alt: a.heroAlt,
							loading: "lazy",
							className: "h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								tone: "yellow",
								children: a.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 font-display text-2xl leading-tight font-bold uppercase text-foreground",
								children: a.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground",
								children: a.intro
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-6 inline-flex items-center gap-2 tech-label text-foreground",
								children: ["View application ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "→"
								})]
							})
						]
					})]
				})
			}, a.slug))
		})
	})] });
}
//#endregion
export { ApplicationsIndex as component };
