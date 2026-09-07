import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as motion } from "../_libs/framer-motion+[...].mjs";
import { n as Reveal, r as TechLine, t as Label } from "./motion-primitives-BfjJ5WDa.mjs";
import { t as PageHero } from "./PageHero-B0eXY2Ef.mjs";
import { f as Gauge, i as RotateCw, m as CircleCheck, n as Target } from "../_libs/lucide-react.mjs";
import { c as ArrowLink, f as img, h as pileTypes, m as pileMatrix } from "./router-DUZ1py_X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/screw-piles-CjmInVsb.js
var import_jsx_runtime = require_jsx_runtime();
var ease = [
	.16,
	.84,
	.24,
	1
];
function PilesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "SCREW PILES",
			title: "What is a",
			accent: "screw pile?",
			intro: "A screw pile is a manufactured steel foundation with a central hollow shaft attached with one or more helical plates \r\nor a continuous thread — like a giant screw. A machine turns the screw pile into the ground. There is no digging, no \r\ncement work, and no waiting for curing to set before you can build.",
			image: img.pilesCrate,
			imageAlt: "Crate of manufactured BigScrew helical screw piles ready for despatch"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-gradient-to-b from-background via-off-white to-background py-20 md:py-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shell space-y-20",
				children: pileTypes.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: `grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`,
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { duration: .6 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "aspect-4/3 overflow-hidden rounded-lg border border-border bg-gradient-to-br from-white to-off-white shadow-lg",
						whileHover: { scale: 1.03 },
						transition: { duration: .3 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.image,
							alt: p.alt,
							loading: "lazy",
							className: "h-full w-full object-contain object-center p-4"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							x: i % 2 ? -20 : 20
						},
						whileInView: {
							opacity: 1,
							x: 0
						},
						viewport: { once: true },
						transition: {
							duration: .6,
							delay: .1
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-2 flex items-center gap-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TechLine, { className: "flex-shrink-0" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tech-label font-semibold text-yellow",
								children: p.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 display-md text-foreground",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-lg font-semibold text-foreground",
								children: p.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-base leading-relaxed text-muted-foreground",
								children: p.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex flex-wrap gap-2",
								children: p.applications.split(", ").map((app) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block rounded-full border border-yellow/30 bg-yellow/10 px-3 py-1 text-xs font-semibold text-black",
									children: app
								}, app))
							})
						]
					})]
				}) }, p.slug))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OldWayVsScrewPile, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallStrip, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative bg-gradient-to-b from-ink via-ink/95 to-ink/90 py-20 md:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					className: "h-full w-full",
					viewBox: "0 0 100 100",
					preserveAspectRatio: "none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
						id: "grid",
						width: "20",
						height: "20",
						patternUnits: "userSpaceOnUse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 20 0 L 0 0 0 20",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "0.5"
						})
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "100",
						height: "100",
						fill: "url(#grid)"
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						tone: "yellow",
						children: "Selection matrix"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
						className: "mt-6 display-md text-on-ink",
						initial: {
							opacity: 0,
							y: 10
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: { duration: .6 },
						children: "Which pile, which job"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "mt-10 overflow-x-auto rounded-lg border border-on-ink/20 bg-gradient-to-br from-ink/50 to-ink/70 shadow-2xl backdrop-blur-sm",
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							duration: .6,
							delay: .1
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-3xl border-collapse text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b-2 border-yellow/30 bg-gradient-to-r from-yellow/10 to-yellow/5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									className: "px-6 py-4 tech-label font-semibold text-yellow",
									children: "Pile type"
								}), pileMatrix.columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									className: "px-6 py-4 tech-label font-semibold text-yellow",
									children: c
								}, c))]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: pileMatrix.rows.map((r, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.tr, {
								className: `border-b border-on-ink/10 transition-colors hover:bg-yellow/5 ${idx % 2 ? "bg-on-ink/5" : ""}`,
								whileHover: { backgroundColor: "rgba(255, 209, 0, 0.1)" },
								transition: { duration: .2 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "row",
									className: "px-6 py-5 font-display text-lg font-semibold uppercase text-on-ink",
									children: r.type
								}), r.fit.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-5",
									children: f === "primary" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
										className: "inline-block rounded-full bg-yellow px-3 py-1 text-sm font-bold text-ink",
										whileHover: { scale: 1.1 },
										children: "PRIMARY"
									}) : f === "no" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded bg-on-ink/10 px-3 py-1 text-sm font-semibold text-on-ink-dim",
										children: "Secondary"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xl text-on-ink-dim/50",
										children: "—"
									})
								}, i))]
							}, r.type)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "mt-12",
						initial: { opacity: 0 },
						whileInView: { opacity: 1 },
						viewport: { once: true },
						transition: {
							duration: .6,
							delay: .2
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
							to: "/contact",
							variant: "yellow",
							children: "Ask for a pile recommendation"
						})
					})
				]
			})]
		})
	] });
}
function OldWayVsScrewPile() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-off-white py-20 md:py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					tone: "yellow",
					children: "The difference"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 display-md text-foreground",
					children: "Same foundation, a different afternoon"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-6 lg:grid-cols-2",
					children: [{
						title: "Concrete footing — the old way",
						steps: [
							"Dig a pit",
							"Build a mould",
							"Pour cement",
							"Wait 7 days to dry",
							"Clear the mess"
						],
						variant: "old"
					}, {
						title: "Screw pile — BigScrew Solutions",
						steps: [
							"Mark the spot",
							"Turn it in",
							"Check it's firm",
							"Build the same day"
						],
						variant: "new"
					}].map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * .1,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: `relative h-full overflow-hidden rounded-lg border p-8 md:p-10 ${c.variant === "old" ? "border-border bg-white" : "border-yellow/40 bg-gradient-to-br from-yellow/[0.06] to-transparent shadow-[0_20px_50px_-15px_rgba(12,12,12,0.15)]"}`,
							whileHover: { y: -4 },
							transition: { duration: .3 },
							children: [
								c.variant === "new" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute right-0 top-0 bg-yellow px-3 py-1.5 tech-label text-foreground",
									children: "Faster"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-32 items-end justify-center border-b border-border pb-6",
									children: c.variant === "old" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										width: "90",
										height: "100",
										viewBox: "0 0 90 100",
										fill: "none",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
												x1: "0",
												y1: "30",
												x2: "90",
												y2: "30",
												stroke: "currentColor",
												strokeWidth: "2",
												className: "text-foreground/70"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
												x: "30",
												y: "10",
												width: "14",
												height: "20",
												className: "fill-foreground/80"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
												x: "18",
												y: "28",
												width: "54",
												height: "55",
												rx: "2",
												strokeDasharray: "4 3",
												stroke: "currentColor",
												strokeWidth: "1.5",
												className: "fill-foreground/10 text-foreground/40"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
												x1: "26",
												y1: "40",
												x2: "64",
												y2: "70",
												stroke: "currentColor",
												strokeWidth: "1",
												className: "text-foreground/30"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
												x1: "26",
												y1: "55",
												x2: "50",
												y2: "79",
												stroke: "currentColor",
												strokeWidth: "1",
												className: "text-foreground/30"
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.svg, {
										width: "70",
										height: "100",
										viewBox: "0 0 70 100",
										fill: "none",
										initial: { y: -8 },
										whileInView: { y: 0 },
										viewport: { once: true },
										transition: {
											duration: .8,
											ease
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
												x1: "0",
												y1: "30",
												x2: "70",
												y2: "30",
												stroke: "currentColor",
												strokeWidth: "2",
												className: "text-foreground/70"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
												x: "27",
												y: "10",
												width: "14",
												height: "20",
												className: "fill-foreground/80"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
												x1: "34",
												y1: "30",
												x2: "34",
												y2: "90",
												stroke: "currentColor",
												strokeWidth: "2.5",
												className: "text-foreground/80"
											}),
											[
												42,
												56,
												70,
												84
											].map((cy) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
												cx: "34",
												cy,
												rx: "18",
												ry: "6",
												stroke: "var(--color-yellow)",
												strokeWidth: "2",
												fill: "none"
											}, cy))
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-6 font-display text-xl font-bold uppercase leading-tight text-foreground md:text-2xl",
									children: c.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-relaxed text-muted-foreground md:text-base",
									children: c.steps.map((step, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: c.variant === "new" ? "font-medium text-foreground" : "",
											children: step
										}), idx < c.steps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": true,
											className: c.variant === "new" ? "text-yellow-deep" : "text-foreground/30",
											children: "→"
										})]
									}, step))
								})
							]
						})
					}, c.title))
				})
			]
		})
	});
}
function InstallStrip() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-off-white pb-20 md:pb-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shell",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-px overflow-hidden rounded-lg border border-on-ink/10 bg-on-ink/10 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					{
						n: "01",
						title: "Position",
						body: "Set out on the drawing grid.",
						icon: Target
					},
					{
						n: "02",
						title: "Drive",
						body: "Turned to design depth.",
						icon: RotateCw
					},
					{
						n: "03",
						title: "Check",
						body: "Check it's turned in firmly enough.",
						icon: Gauge
					},
					{
						n: "04",
						title: "Load",
						body: "Structure set the same day.",
						icon: CircleCheck
					}
				].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: i * .08,
					className: "group bg-ink p-7 transition-colors duration-300 hover:bg-charcoal md:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, {
								className: "h-6 w-6 text-yellow transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[8deg]",
								strokeWidth: 1.75
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-sm font-bold text-on-ink-dim/50",
								children: s.n
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-6 font-display text-lg font-bold uppercase tracking-wide text-on-ink",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-on-ink-dim",
							children: s.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "mt-5 block h-0.5 w-8 origin-left scale-x-100 bg-yellow/40 transition-all duration-500 ease-out group-hover:w-12 group-hover:bg-yellow"
						})
					]
				}, s.n))
			})
		})
	});
}
//#endregion
export { PilesPage as component };
