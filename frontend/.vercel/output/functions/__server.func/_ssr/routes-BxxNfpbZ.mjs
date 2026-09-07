import { i as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useScroll, r as motion, t as useTransform } from "../_libs/framer-motion+[...].mjs";
import { n as Reveal, r as TechLine, t as Label } from "./motion-primitives-BfjJ5WDa.mjs";
import { _ as Check, o as Minus, t as X } from "../_libs/lucide-react.mjs";
import { _ as soilMachinery, c as ArrowLink, f as img, g as services, h as pileTypes, l as applications, m as pileMatrix, p as installSteps, v as stats, y as whyBigscrew } from "./router-DUZ1py_X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BxxNfpbZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ease$1 = [
	.16,
	.84,
	.24,
	1
];
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative flex min-h-[72svh] flex-col justify-end overflow-hidden bg-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
				src: img.heroExcavator,
				alt: "Excavator-mounted rotary drive head turning a helical screw pile into the ground on a BigScrew site",
				className: "absolute inset-0 h-full w-full object-cover object-left scale-x-[-1]",
				initial: {
					scale: 1.12,
					opacity: 0
				},
				animate: {
					scale: 1,
					opacity: 1
				},
				transition: {
					duration: 2.2,
					ease: ease$1
				},
				fetchPriority: "high",
				width: 1600,
				height: 1e3
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell relative pt-24 pb-8 md:pt-28 md:pb-10 lg:pl-[170px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						className: "mb-4 flex items-center gap-3 text-yellow",
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .8,
							delay: .25,
							ease: ease$1
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-px w-10 bg-yellow/80",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tech-label max-w-[80ch] inline-block rounded-md border border-yellow/30 bg-ink/80 px-4 py-2.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-yellow shadow-[0_0_24px_rgba(0,0,0,0.25)] sm:text-[0.64rem] md:text-[0.72rem]",
							children: "INDIA’S LEADING EXPORTER OF SCREW PILE FOUNDATIONS"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-0 display-xl text-on-ink",
						children: [["Foundations,", "driven not"].map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								className: "block",
								initial: { y: "110%" },
								animate: { y: 0 },
								transition: {
									duration: 1.1,
									delay: .35 + i * .12,
									ease: ease$1
								},
								children: line
							})
						}, line)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								className: "block text-yellow",
								initial: { y: "110%" },
								animate: { y: 0 },
								transition: {
									duration: 1.1,
									delay: .59,
									ease: ease$1
								},
								children: "poured"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						className: "mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
						initial: {
							opacity: 0,
							y: 24
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: 1,
							delay: .9,
							ease: ease$1
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-xl text-base leading-relaxed text-on-ink-dim md:text-lg",
							children: "Screw piles for solar, storage, housing, industrial structures, carports, EV charging, fencing, poles, towers and bridges. Installed in hours, loaded the same day."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
								to: "/contact",
								variant: "yellow",
								children: "Get a project quote"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
								to: "/applications",
								variant: "outlineLight",
								children: "Explore applications"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "relative border-t border-on-ink/15",
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: {
					duration: 1,
					delay: 1.2
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shell flex items-center gap-6 overflow-x-auto py-4 no-scrollbar",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tech-label whitespace-nowrap text-on-ink-dim",
							children: "BigScrew / Engineered Foundations"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-4 w-px shrink-0 bg-on-ink/20",
							"aria-hidden": true
						}),
						installSteps.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tech-label whitespace-nowrap text-on-ink-dim",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-yellow",
									children: s.n
								}),
								" ",
								s.title
							]
						}, s.n))
					]
				})
			})
		]
	});
}
var ease = [
	.16,
	.84,
	.24,
	1
];
function TorqueBadge({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-2 bg-yellow px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 bg-ink/70" }), label]
	});
}
function BrandStatement() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background py-12 md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					tone: "yellow",
					children: "Who we are"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-5xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl leading-[1.1] font-semibold uppercase text-foreground sm:text-5xl md:text-6xl",
							children: "India's largest exporter of screw piles:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg",
							children: "BigScrew Solutions makes every pile in-house, on fully automated manufacturing lines. We have been exporting screw piles for the last 3 years, and today we export more than any other manufacturer in India."
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-8 md:grid-cols-3",
					children: services.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * .08,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group h-full rounded-[4px] border border-border bg-background p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-yellow/80 hover:bg-[#fffdf5] hover:shadow-[0_20px_40px_rgba(12,12,12,0.08)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TechLine, { className: "transition-transform duration-300 group-hover:scale-x-105" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 tech-label text-yellow transition-colors duration-300 group-hover:text-yellow-deep",
									children: s.n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-3 font-display text-2xl font-bold uppercase text-foreground transition-colors duration-300 group-hover:text-yellow-deep",
									children: s.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground",
									children: s.body
								})
							]
						})
					}, s.n))
				})
			]
		})
	});
}
function ProductCloseUp() {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref,
		className: "border-y border-border bg-white py-20 md:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 30
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-80px"
				},
				transition: {
					duration: .8,
					ease
				},
				className: "relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-4/5 overflow-hidden bg-concrete/20 shadow-[14px_14px_0_var(--color-yellow)] transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-[18px_18px_0_var(--color-yellow)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
							src: img.pileProduct,
							alt: "Close-up of a hot-dip galvanised BigScrew helical screw pile",
							style: { y },
							className: "absolute inset-0 h-[116%] w-full object-cover",
							width: 900,
							height: 1125
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 via-black/0 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "absolute left-5 top-5 h-6 w-6 border-l-2 border-t-2 border-yellow/90"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-5 left-5 flex items-center gap-2 border border-white/15 bg-ink/85 px-3 py-2 backdrop-blur-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-yellow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tech-label text-on-ink",
								children: "Hot-dip galvanised"
							})]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					tone: "yellow",
					children: "The product"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-6 display-lg text-foreground",
					children: ["Steel, thread, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-yellow",
						children: "and ground"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-lg text-base leading-relaxed text-muted-foreground",
					children: "A steel shaft with one or more helical plates, turned into the soil until it reaches the resistance the design calls for. Hot-dip galvanised, made in-house on automated lines and checked batch by batch before it leaves the factory."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-10 grid grid-cols-2 border-y border-border",
					children: [
						["Shaft Ø", "60 – 114 mm"],
						["Length", "1000 – 5000 mm"],
						["Coating", "HDG / HDG + Epoxy"],
						["Helix", "1 – 4 or continuous"]
					].map(([k, v], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `px-4 py-5 md:px-5 ${i % 2 === 0 ? "border-r border-border" : ""} ${i < 2 ? "border-b border-border" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "tech-label text-muted-foreground",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-2 font-display text-xl font-bold text-foreground md:text-2xl",
							children: v
						})]
					}, k))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
						to: "/screw-piles",
						variant: "yellow",
						children: "See the pile range"
					})
				})
			] })]
		})
	});
}
function WhyBigscrew() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-border bg-ink py-20 md:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				tone: "yellow",
				children: "Why BigScrew"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: whyBigscrew.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: i * .07,
					className: `group flex min-h-64 flex-col justify-between border p-6 transition-all duration-300 hover:-translate-y-1 md:p-7 ${i === 0 ? "border-yellow bg-yellow text-foreground" : "border-on-ink/20 bg-charcoal text-on-ink hover:border-yellow/70"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `font-display text-6xl font-bold leading-none ${i === 0 ? "text-ink/20" : "text-yellow/35"}`,
						children: String(i + 1).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl font-bold uppercase",
						children: w.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `mt-3 text-sm leading-relaxed ${i === 0 ? "text-foreground/70" : "text-on-ink-dim"}`,
						children: w.body
					})] })]
				}, w.title))
			})]
		})
	});
}
function Stats() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden bg-ink py-24 md:py-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: img.factory,
				alt: "",
				"aria-hidden": true,
				className: "absolute inset-0 h-full w-full object-cover opacity-20",
				loading: "lazy"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-ink/70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					tone: "yellow",
					children: "Manufacturing"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4",
					children: stats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						delay: i * .08,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TechLine, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 font-display text-6xl leading-none font-bold text-on-ink md:text-7xl",
								children: s.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm text-on-ink-dim",
								children: s.label
							})
						]
					}, s.label))
				})]
			})
		]
	});
}
function Process() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "process",
		className: "bg-background py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					tone: "yellow",
					children: "Installation process"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 display-lg text-foreground",
					children: "Four moves to a loaded foundation"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4",
					children: installSteps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						as: "li",
						delay: i * .08,
						className: "bg-background p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-5xl font-bold text-yellow",
								children: s.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 font-display text-2xl font-bold uppercase text-foreground",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: s.body
							})
						]
					}, s.n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
						to: "/installation",
						variant: "outlineDark",
						children: "See the full installation method"
					})
				})
			]
		})
	});
}
function PileTypes() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "piles",
		className: "grain-dark py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							tone: "yellow",
							children: "Pile types"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-6 display-lg text-on-ink",
							children: "Three families of pile"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-sm text-on-ink-dim md:text-base",
							children: "Every project starts by matching the pile family to the load and the ground."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8",
					children: pileTypes.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						delay: i * .1,
						className: "group flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
									initial: {
										opacity: 0,
										y: -8
									},
									whileInView: {
										opacity: 1,
										y: 0
									},
									viewport: { once: true },
									transition: {
										duration: .5,
										delay: i * .1,
										ease
									},
									className: "absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-yellow/40 bg-ink px-3 py-1 tech-label text-yellow",
									children: p.n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative aspect-4/5 w-full max-w-[280px] overflow-hidden border border-on-ink/10 bg-ink-soft transition-all duration-500 ease-out group-hover:border-yellow/50 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.image,
										alt: p.alt,
										loading: "lazy",
										className: "mx-auto h-full w-[88%] object-contain object-center bg-white transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-7 font-display text-2xl font-bold uppercase text-on-ink",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-3 h-[2px] w-8 origin-center bg-yellow/60 transition-all duration-500 ease-out group-hover:w-16 group-hover:bg-yellow" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-xs text-sm leading-relaxed text-on-ink-dim",
								children: p.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-xs text-sm leading-relaxed text-on-ink-dim/80",
								children: p.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 tech-label text-yellow/80 transition-colors duration-300 group-hover:text-yellow",
								children: p.applications
							})
						]
					}, p.slug))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-20 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "mx-auto w-full min-w-3xl border-collapse text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
								className: "sr-only",
								children: "Which pile type suits which application"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								className: "border-b border-on-ink/20 py-4 pr-6 tech-label text-on-ink-dim",
								children: "Pile type"
							}), pileMatrix.columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								className: "border-b border-on-ink/20 py-4 pr-6 text-center tech-label text-on-ink-dim",
								children: c
							}, c))] }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: pileMatrix.rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "transition-colors duration-300 hover:bg-on-ink/[0.03]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "row",
									className: "border-b border-on-ink/10 py-4 pr-6 font-display text-lg font-semibold uppercase text-on-ink",
									children: r.type
								}), r.fit.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-on-ink/10 py-4 pr-6 text-center",
									children: f === "primary" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										className: "mx-auto h-5 w-5 text-yellow",
										strokeWidth: 2,
										"aria-label": "Primary fit"
									}) : f === "no" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
										className: "mx-auto h-5 w-5 text-on-ink-dim",
										strokeWidth: 2,
										"aria-label": "Secondary fit"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
										className: "mx-auto h-5 w-5 text-on-ink-dim/40",
										strokeWidth: 2,
										"aria-label": "Not suited"
									})
								}, i))]
							}, r.type)) })
						]
					})
				})
			]
		})
	});
}
function ApplicationsGrid() {
	const lastIndex = applications.length - 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "solutions",
		className: "bg-background py-24 md:py-11",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					tone: "yellow",
					children: "Applications"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 display-lg text-foreground",
					children: "Seven applications"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3",
					children: applications.map((a, i) => {
						if (i === lastIndex) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i % 3 * .07,
							className: "group bg-background md:col-span-2 lg:col-span-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ArrowLink, {
								to: "/applications/$slug",
								params: { slug: a.slug },
								variant: "bare",
								className: "grid md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "aspect-16/10 overflow-hidden md:aspect-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: a.hero,
										alt: a.heroAlt,
										loading: "lazy",
										className: "h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col justify-center p-8 md:p-12",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tech-label text-yellow-deep",
											children: a.n
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-4 font-display text-3xl leading-tight font-bold uppercase text-foreground md:text-4xl",
											children: a.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 max-w-lg text-base leading-relaxed text-muted-foreground",
											children: a.intro
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "mt-8 inline-flex w-fit items-center gap-2 bg-yellow px-5 py-3 tech-label text-foreground transition-all duration-300 group-hover:gap-3 group-hover:bg-yellow-deep",
											children: ["View application ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"aria-hidden": true,
												children: "→"
											})]
										})
									]
								})]
							})
						}, a.slug);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i % 3 * .07,
							className: "group bg-background",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ArrowLink, {
								to: "/applications/$slug",
								params: { slug: a.slug },
								variant: "bare",
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "aspect-16/11 overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: a.hero,
										alt: a.heroAlt,
										loading: "lazy",
										className: "h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-7",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tech-label text-yellow-deep",
											children: a.n
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-4 font-display text-2xl leading-tight font-bold uppercase text-foreground",
											children: a.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground",
											children: a.intro
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "mt-6 inline-flex w-fit items-center gap-2 border border-yellow/70 px-4 py-2 tech-label text-yellow-deep transition-all duration-300 group-hover:gap-3 group-hover:border-yellow group-hover:bg-yellow group-hover:text-foreground",
											children: ["View application ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"aria-hidden": true,
												children: "→"
											})]
										})
									]
								})]
							})
						}, a.slug);
					})
				})
			]
		})
	});
}
function Machinery() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-off-white py-20 md:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					tone: "yellow",
					children: "Machinery & soil"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 display-lg text-foreground",
					children: "Matched to the ground"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg",
					children: "Foundation performance depends as much on the installation rig as on the pile. We size the rotary drive head to the torque demand of the site's soil profile and mount it on a carrier. Design starts with the geotechnical report, or with a verification pile where no report exists. Carrier, drive head and helix diameter are then selected as per the terrain."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: "mt-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "overflow-hidden rounded-[4px] border border-border bg-white p-3 shadow-[0_20px_50px_rgba(12,12,12,0.08)] md:p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-[2px] bg-concrete/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: img.heroExcavator,
								alt: "Drive heads and carriers matched to soil condition — equipment gallery",
								loading: "lazy",
								className: "h-auto w-full object-cover",
								width: 1200,
								height: 760
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
							className: "mt-4 px-1 pb-1 tech-label text-muted-foreground",
							children: "Drive heads and carriers — equipment gallery"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-14 hidden md:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-[1.1fr_1fr_0.9fr_1.3fr] gap-x-6 border-t-2 border-foreground/80 pb-2",
						children: [
							"Soil condition",
							"Carrier machine",
							"Drive head",
							"Pile approach"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "pt-5 tech-label text-muted-foreground",
							children: h
						}, h))
					}), soilMachinery.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						as: "div",
						delay: i * .05,
						className: "group relative grid grid-cols-[1.1fr_1fr_0.9fr_1.3fr] items-center gap-x-6 border-b border-border py-6 transition-colors duration-300 hover:bg-white",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "absolute -left-4 top-0 h-full w-1 origin-left scale-y-0 bg-yellow transition-transform duration-300 ease-out group-hover:scale-y-100"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pr-4 font-display text-lg font-semibold uppercase leading-tight text-foreground",
								children: r.soil
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pr-4 text-sm leading-snug text-muted-foreground",
								children: r.carrier
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TorqueBadge, { label: r.driveHead }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm leading-snug text-muted-foreground",
								children: r.approach
							})
						]
					}, r.soil))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 space-y-4 md:hidden",
					children: soilMachinery.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						delay: i * .05,
						className: "border border-border bg-white p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-semibold uppercase text-foreground",
								children: r.soil
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TorqueBadge, { label: r.driveHead })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "mt-4 grid grid-cols-1 gap-3",
							children: [["Carrier machine", r.carrier], ["Pile approach", r.approach]].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-4 border-t border-border pt-3 first:border-t-0 first:pt-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "tech-label shrink-0 text-muted-foreground",
									children: k
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-right text-sm text-foreground",
									children: v
								})]
							}, k))
						})]
					}, r.soil))
				})
			]
		})
	});
}
function ClosingCta() {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		className: "relative overflow-hidden bg-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
				src: img.workerInstall,
				alt: "BigScrew installation crew guiding a screw pile into position on site",
				style: { y },
				className: "absolute inset-0 h-[120%] w-full object-cover opacity-60",
				loading: "lazy"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/40 to-ink/60" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell relative flex w-full flex-col items-center py-24 text-center md:py-32",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h2, {
						className: "w-full font-display font-bold uppercase leading-[1.1] tracking-normal text-on-ink [text-shadow:0_2px_20px_rgba(0,0,0,0.5)] sm:tracking-wide",
						initial: "hidden",
						whileInView: "visible",
						viewport: { once: true },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							className: "mx-auto block w-full text-center text-[clamp(1.75rem,6vw,4.5rem)]",
							variants: {
								hidden: {
									opacity: 0,
									y: 30
								},
								visible: {
									opacity: 1,
									y: 0
								}
							},
							transition: {
								duration: .8,
								ease
							},
							children: "Send us your loads"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							className: "mx-auto mt-1 block w-full text-center text-[clamp(1.75rem,6vw,4.5rem)] text-yellow",
							variants: {
								hidden: {
									opacity: 0,
									y: 30
								},
								visible: {
									opacity: 1,
									y: 0
								}
							},
							transition: {
								duration: .8,
								delay: .15,
								ease
							},
							children: "We'll send back a foundation"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						className: "mt-9 flex w-full flex-wrap justify-center gap-3",
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
							duration: .7,
							delay: .4,
							ease
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
							to: "/contact",
							variant: "yellow",
							children: "Get a project quote"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
							to: "/installation",
							variant: "outlineLight",
							children: "How installation works"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						"aria-hidden": true,
						className: "mt-12 h-px w-24 bg-yellow/50",
						initial: {
							scaleX: 0,
							opacity: 0
						},
						whileInView: {
							scaleX: 1,
							opacity: 1
						},
						viewport: { once: true },
						transition: {
							duration: .8,
							delay: .6,
							ease
						}
					})
				]
			})
		]
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandStatement, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyBigscrew, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCloseUp, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stats, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Process, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PileTypes, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Machinery, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplicationsGrid, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClosingCta, {})
	] });
}
//#endregion
export { Index as component };
