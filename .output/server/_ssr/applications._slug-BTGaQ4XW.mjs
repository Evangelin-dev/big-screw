import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Reveal, r as TechLine, t as Label } from "./motion-primitives-WdXfCk5u.mjs";
import { n as SpecTable, t as PageHero } from "./PageHero-CwH4hGRu.mjs";
import { c as ArrowLink, l as applications, p as installSteps, s as Route$2 } from "./router-Ddo4EKlf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/applications._slug-BTGaQ4XW.js
var import_jsx_runtime = require_jsx_runtime();
function ApplicationPage() {
	const a = Route$2.useLoaderData().application;
	const others = applications.filter((x) => x.slug !== a.slug).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: `Application ${a.n}`,
			title: a.headline,
			accent: a.headlineAccent,
			image: a.hero,
			imageAlt: a.heroAlt
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-background py-12 md:py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell grid gap-8 lg:grid-cols-12 lg:gap-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg leading-relaxed text-foreground md:text-xl",
						children: a.intro
					}) })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-5 lg:pl-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TechLine, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 tech-label text-yellow",
							children: "Pile types used"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-display text-2xl leading-tight font-semibold uppercase text-foreground",
							children: a.pileTypes
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-off-white py-12 md:py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					tone: "yellow",
					children: "Gallery"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid grid-cols-2 gap-3 md:gap-4",
					children: a.gallery.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						delay: i % 2 * .08,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-sm bg-background",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: g.src,
								alt: g.alt,
								loading: "lazy",
								className: "block h-auto w-full transition-transform duration-[1400ms] ease-out hover:scale-105"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 tech-label text-muted-foreground",
							children: g.caption
						})]
					}, g.src + i))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-background py-12 md:py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						tone: "yellow",
						children: "Technical specification"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-6 display-md text-foreground",
						children: "Sizes for this application."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted-foreground",
						children: "Dimensions in millimetres. HDG — hot-dip galvanised."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecTable, {
							headers: a.specHeaders,
							rows: a.specRows
						})
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "grain-dark py-12 md:py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						tone: "yellow",
						children: "On site"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-6 display-md text-on-ink",
						children: "How it goes in."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4",
						children: installSteps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
							as: "li",
							delay: i * .07,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TechLine, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 font-display text-4xl font-bold text-yellow",
									children: s.n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-3 font-display text-xl font-bold uppercase text-on-ink",
									children: s.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-on-ink-dim",
									children: s.body
								})
							]
						}, s.n))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
							to: "/contact",
							variant: "yellow",
							children: "Discuss this application"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
							to: "/installation",
							variant: "outlineLight",
							children: "Installation method"
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-off-white py-12 md:py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					tone: "yellow",
					children: "Other applications"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-px border border-border bg-border md:grid-cols-3",
					children: others.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ArrowLink, {
						to: "/applications/$slug",
						params: { slug: o.slug },
						variant: "bare",
						className: "group block bg-off-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-16/11 overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: o.hero,
								alt: o.heroAlt,
								loading: "lazy",
								className: "h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-7",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tech-label text-yellow",
								children: o.n
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-display text-xl font-bold uppercase text-foreground",
								children: o.title
							})]
						})]
					}, o.slug))
				})]
			})
		})
	] });
}
//#endregion
export { ApplicationPage as component };
