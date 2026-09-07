import { i as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as AnimatePresence, n as useScroll, r as motion, t as useTransform } from "../_libs/framer-motion+[...].mjs";
import { n as Reveal, t as Label } from "./motion-primitives-BfjJ5WDa.mjs";
import { t as PageHero } from "./PageHero-B0eXY2Ef.mjs";
import { _ as soilMachinery, f as img } from "./router-CS6gVxxY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/installation-C7VpA0_Z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var processSteps = [
	{
		n: "01",
		title: "Subsoil Evaluation",
		body: "Geotechnical survey assesses soil composition, load-bearing capacity, layer structure, and corrosion potential to ensure optimal foundation design.",
		image: img.heroExcavator,
		tag: "READ THE GROUND"
	},
	{
		n: "02",
		title: "Foundation Planning",
		body: "Using soil data, load specifications, and structural analysis, we select the appropriate groundscrew type and exact quantity needed.",
		image: img.Picture3,
		tag: "SET THE STRATEGY"
	},
	{
		n: "03",
		title: "Load-Bearing Capacity Test",
		body: "Tension-compression tests validate the structural design and determine the minimum installation torque required on site.",
		image: img.Picture1,
		tag: "PROVE THE LOAD"
	},
	{
		n: "04",
		title: "Installation & Documentation",
		body: "Skilled operators install with electric or hydraulic drivers. Torque at each position is recorded and loads can be placed immediately.",
		image: img.Picture2,
		tag: "BUILD WITH PROOF"
	},
	{
		n: "05",
		title: "Dismantling Option",
		body: "For temporary projects, groundscrews can be unscrewed, reused if undamaged, or sustainably recycled. Site restoration stays simple.",
		image: img.workerInstall,
		tag: "LEAVE LESS BEHIND"
	}
];
function InstallationPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "INSTALLATION",
			title: "Machinery, matched",
			accent: "to the ground",
			intro: "Our own crew and machines turn the piles into the ground and get you building fast — the structure is set the same day.",
			image: img.workerInstall,
			imageAlt: "BigScrew crew guiding a helical screw pile into position on site"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessSection, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-[#f4f1eb] py-20 md:py-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						tone: "yellow",
						children: "Machinery & soil"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-6 display-md text-foreground",
						children: "Matched to the ground"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg",
						children: "Foundation performance depends as much on the installation rig as on the pile. We size the rotary drive head to the torque demand of the site's soil profile and mount it on a carrier. Design starts with the geotechnical report, or with a verification pile where no report exists. Carrier, drive head and helix diameter are then selected as per the terrain."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 overflow-x-auto rounded-lg border border-border bg-white/80",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-3xl border-collapse text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
								"Soil condition",
								"Carrier machine",
								"Drive head",
								"Pile approach"
							].map((h, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								className: ["border-b border-border py-4 pr-6 tech-label text-muted-foreground", index === 0 ? "pl-6" : ""].join(" "),
								children: h
							}, h)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: soilMachinery.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "align-top",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "row",
										className: "border-b border-border py-5 pl-6 pr-6 font-display text-lg font-semibold uppercase text-foreground",
										children: r.soil
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "border-b border-border py-5 pr-6 text-sm text-muted-foreground",
										children: r.carrier
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "border-b border-border py-5 pr-6 text-sm text-muted-foreground",
										children: r.driveHead
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "border-b border-border py-5 pr-6 text-sm text-muted-foreground",
										children: r.approach
									})
								]
							}, r.soil)) })]
						})
					})
				]
			})
		})
	] });
}
function ProcessSection() {
	const sectionRef = (0, import_react.useRef)(null);
	const [activeStep, setActiveStep] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const timer = window.setInterval(() => {
			setActiveStep((currentStep) => (currentStep + 1) % processSteps.length);
		}, 5e3);
		return () => window.clearInterval(timer);
	}, []);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start 0.7", "end 0.7"]
	});
	const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
	const activeStepData = processSteps[activeStep] ?? processSteps[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref: sectionRef,
		className: "overflow-hidden bg-[#111311] py-24 text-white md:py-36",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shell",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-16 lg:grid-cols-[minmax(260px,0.7fr)_minmax(0,1.3fr)] lg:gap-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:sticky lg:top-28 lg:self-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							tone: "yellow",
							children: "The field log / 01—05"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-7 max-w-xl font-display text-5xl font-bold uppercase leading-[0.92] text-white md:text-7xl",
							children: ["Built in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-yellow",
								children: "five moves."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-7 max-w-sm text-base leading-relaxed text-white/60 md:text-lg",
							children: "Every installation is measured, verified, and ready for the next trade the same day. Follow the work from first soil reading to final torque record."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-12 hidden aspect-[1448/1086] overflow-hidden border border-white/15 lg:block",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									mode: "wait",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
										initial: {
											opacity: 0,
											scale: 1.08,
											x: 28
										},
										animate: {
											opacity: 1,
											scale: 1,
											x: 0
										},
										exit: {
											opacity: 0,
											scale: .96,
											x: -28
										},
										transition: {
											duration: .65,
											ease: [
												.16,
												.84,
												.24,
												1
											]
										},
										src: activeStepData.image,
										alt: `${activeStepData.title} on a BigScrew installation site`,
										className: "absolute inset-0 h-full w-full object-cover grayscale-[0.2]"
									}, activeStepData.n)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tech-label text-white/70",
										children: "LIVE SITE VIEW"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
										initial: {
											opacity: 0,
											y: 8
										},
										animate: {
											opacity: 1,
											y: 0
										},
										className: "font-display text-4xl font-bold text-yellow",
										children: ["BS / ", activeStepData.n]
									}, activeStepData.n)]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					role: "list",
					"aria-label": "Installation process steps",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-0 left-[1.2rem] top-0 w-px bg-white/15 md:left-[2.35rem]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							style: { height: progressHeight },
							className: "w-full origin-top bg-yellow"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-8 md:space-y-16",
						children: processSteps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: index * .04,
							className: "relative",
							as: "div",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
								role: "listitem",
								className: "group grid gap-6 pl-12 md:grid-cols-[96px_minmax(0,1fr)] md:gap-10 md:pl-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative z-10 flex h-10 w-10 items-center justify-center border border-yellow bg-[#111311] font-display text-sm font-bold text-yellow md:h-[4.75rem] md:w-[4.75rem] md:text-xl",
									children: step.n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-white/15 pt-5 transition-colors duration-500 group-hover:border-yellow md:pt-7",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tech-label text-yellow",
											children: step.tag
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-xs text-white/30",
											children: [
												"0",
												index + 1,
												" / 05"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 grid gap-7 md:grid-cols-[minmax(0,1fr)_180px] md:items-start",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-3xl font-bold uppercase leading-none text-white md:text-5xl",
											children: step.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-5 max-w-xl text-sm leading-relaxed text-white/55 md:text-base",
											children: step.body
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "aspect-[4/3] overflow-hidden border border-white/10 bg-white/5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: step.image,
												alt: `${step.title} on a BigScrew installation site`,
												loading: "lazy",
												className: "h-full w-full object-cover opacity-75 grayscale-[0.15] transition duration-700 group-hover:scale-105 group-hover:opacity-100"
											})
										})]
									})]
								})]
							})
						}, step.n))
					})]
				})]
			})
		})
	});
}
//#endregion
export { InstallationPage as component };
