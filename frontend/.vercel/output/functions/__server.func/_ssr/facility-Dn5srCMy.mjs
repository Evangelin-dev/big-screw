import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Reveal, t as Label } from "./motion-primitives-BfjJ5WDa.mjs";
import { t as PageHero } from "./PageHero-B0eXY2Ef.mjs";
import { c as ArrowLink, f as img } from "./router-CS6gVxxY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/facility-Dn5srCMy.js
var import_jsx_runtime = require_jsx_runtime();
var facilityImages = [
	{
		src: img.facilityImg1,
		alt: "BigScrew facility photo 1",
		name: "Rotary Swagging"
	},
	{
		src: img.facilityImg2,
		alt: "BigScrew facility photo 2",
		name: "Automatic spiral welding"
	},
	{
		src: img.facilityImg3,
		alt: "BigScrew facility photo 3",
		name: "3KW Tube Laser"
	},
	{
		src: img.facilityImg4,
		alt: "BigScrew facility photo 4",
		name: "Automatic Nut Welding Machine"
	},
	{
		src: img.facilityImg5,
		alt: "BigScrew facility photo 5",
		name: "CNC Bending machine"
	},
	{
		src: img.facilityImg6,
		alt: "BigScrew facility photo 6",
		name: "DNE Bystronic 6KW Laser cutting"
	}
];
function FacilityPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Facility",
		title: "Built for",
		accent: "production and precision",
		intro: "A look inside the manufacturing and installation environment behind BigScrew screw pile foundations",
		image: img.factory,
		imageAlt: "BigScrew manufacturing facility"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background py-20 md:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-10 flex items-center justify-between gap-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						tone: "yellow",
						children: "Gallery"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-6",
					children: facilityImages.map((image, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i % 3 * .06,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group overflow-hidden rounded-lg border border-border/40 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow/60 hover:shadow-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-square overflow-hidden bg-concrete",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: image.src,
									alt: image.alt,
									loading: "lazy",
									className: "h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-t border-border/40 bg-white px-3 py-2 text-center text-sm font-medium text-foreground/80",
								children: image.name
							})]
						})
					}, image.alt + i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-16",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
						to: "/contact",
						variant: "outlineDark",
						children: "Request a facility tour"
					})
				})
			]
		})
	})] });
}
//#endregion
export { FacilityPage as component };
