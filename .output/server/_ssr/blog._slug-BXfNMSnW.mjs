import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as ArrowLink } from "./router-Ddo4EKlf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog._slug-BXfNMSnW.js
var import_jsx_runtime = require_jsx_runtime();
var SplitErrorComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "min-h-screen bg-background flex items-center justify-center px-4",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tech-label text-yellow",
				children: "Error 404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-3xl font-display font-semibold text-foreground",
				children: "Article not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-on-ink-dim",
				children: "The blog article you're looking for doesn't exist."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
					to: "/blog",
					variant: "yellow",
					children: "Back to blog"
				})
			})
		]
	})
});
//#endregion
export { SplitErrorComponent as errorComponent };
