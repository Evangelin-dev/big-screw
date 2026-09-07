import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Label } from "./motion-primitives-WdXfCk5u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PageHero-CwH4hGRu.js
var import_jsx_runtime = require_jsx_runtime();
function PageHero({ eyebrow, title, accent, intro, image, imageAlt, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative flex min-h-[76svh] flex-col justify-end overflow-hidden bg-ink pt-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: image,
				alt: imageAlt,
				className: "absolute inset-0 h-full w-full object-cover",
				width: 1600,
				height: 900
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell relative pb-16 md:pb-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						tone: "yellow",
						children: eyebrow
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-6 display-lg text-on-ink",
						children: [
							title,
							" ",
							accent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-yellow",
								children: accent
							}) : null
						]
					}),
					intro ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-2xl text-base leading-relaxed text-on-ink-dim",
						children: intro
					}) : null,
					children
				]
			})
		]
	});
}
function SpecTable({ headers, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-3xl border-collapse text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: headers.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
				scope: "col",
				className: "border-b border-border py-4 pr-6 tech-label text-muted-foreground",
				children: h
			}, h)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: headers.map((h, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: `border-b border-border py-5 pr-6 text-sm ${j === 0 ? "font-display text-lg font-semibold uppercase text-foreground" : "text-muted-foreground"}`,
				children: r[h]
			}, h)) }, i)) })]
		})
	});
}
//#endregion
export { SpecTable as n, PageHero as t };
