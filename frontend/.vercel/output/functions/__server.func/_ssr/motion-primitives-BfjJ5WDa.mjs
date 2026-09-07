import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as motion } from "../_libs/framer-motion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/motion-primitives-BfjJ5WDa.js
var import_jsx_runtime = require_jsx_runtime();
var ease = [
	.16,
	.84,
	.24,
	1
];
function Reveal({ children, delay = 0, className, as = "div" }) {
	const Comp = motion[as];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {
		className,
		initial: {
			opacity: 0,
			y: 34
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-12% 0px"
		},
		transition: {
			duration: .9,
			ease,
			delay
		},
		children
	});
}
/** Slow horizontal rule that draws itself in — the recurring BigScrew technical line. */
function TechLine({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
		className: `block h-px w-full origin-left bg-yellow ${className}`,
		initial: { scaleX: 0 },
		whileInView: { scaleX: 1 },
		viewport: { once: true },
		transition: {
			duration: 1.1,
			ease
		}
	});
}
function Label({ children, tone = "dim", className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `tech-label ${{
			dim: "text-muted-foreground",
			yellow: "inline-flex items-center rounded-[2px] bg-yellow px-2.5 py-1.5 text-black shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_8px_22px_rgba(0,0,0,0.18)]",
			ink: "text-foreground"
		}[tone]} ${className}`,
		children
	});
}
//#endregion
export { Reveal as n, TechLine as r, Label as t };
