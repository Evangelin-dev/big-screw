import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Reveal, r as TechLine, t as Label } from "./motion-primitives-WdXfCk5u.mjs";
import { t as PageHero } from "./PageHero-CwH4hGRu.mjs";
import { a as Phone, l as MapPin, u as Mail } from "../_libs/lucide-react.mjs";
import { f as img, l as applications, u as company } from "./router-Ddo4EKlf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-3iZTb2zo.js
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Contact",
		title: "Send us your loads.",
		accent: "We'll send back a foundation.",
		image: img.towerBase,
		imageAlt: "Steel structure seated on a BigScrew screw pile base plate"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background py-20 md:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell grid gap-14 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				tone: "yellow",
				children: "Get in touch"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 space-y-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							className: "mt-1 h-6 w-6 shrink-0 text-yellow",
							strokeWidth: 1.5
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("address", {
							className: "not-italic",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tech-label text-muted-foreground",
								children: "Plant & office"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 font-display text-2xl leading-tight font-semibold uppercase text-foreground",
								children: [
									company.address.line1,
									" ",
									company.address.line2,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									company.address.line3,
									" ",
									company.address.line4
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TechLine, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
							className: "mt-1 h-6 w-6 shrink-0 text-yellow",
							strokeWidth: 1.5
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tech-label text-muted-foreground",
							children: "Phone"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: company.phoneHref,
							className: "mt-3 block font-display text-2xl font-semibold text-foreground transition-colors hover:text-yellow",
							children: company.phone
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TechLine, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
							className: "mt-1 h-6 w-6 shrink-0 text-yellow",
							strokeWidth: 1.5
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tech-label text-muted-foreground",
							children: "Web"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: company.webHref,
							rel: "noreferrer",
							className: "mt-3 block font-display text-2xl font-semibold text-foreground transition-colors hover:text-yellow",
							children: company.web
						})] })]
					})
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .1,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grain-dark p-8 md:p-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							tone: "yellow",
							children: "What to send us"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-8 space-y-5",
							children: [
								"Structure type and application",
								"Site location and access",
								"Soil or geotechnical report, if available",
								"Loads, layout drawings and quantity",
								"Programme dates"
							].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-4 border-b border-on-ink/10 pb-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tech-label text-yellow",
									children: String(i + 1).padStart(2, "0")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-base text-on-ink",
									children: t
								})]
							}, t))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-8 text-sm leading-relaxed text-on-ink-dim",
							children: [
								"Applications we cover: ",
								applications.map((a) => a.short).join(" · "),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: company.phoneHref,
							className: "mt-10 inline-flex items-center gap-3 bg-yellow px-6 py-4 tech-label text-primary-foreground transition-colors hover:bg-yellow-deep",
							children: [
								"Call ",
								company.phone,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "→"
								})
							]
						})
					]
				})
			})]
		})
	})] });
}
//#endregion
export { ContactPage as component };
