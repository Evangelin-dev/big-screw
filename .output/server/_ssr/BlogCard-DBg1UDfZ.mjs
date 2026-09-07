import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as ArrowLink } from "./router-Ddo4EKlf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/BlogCard-DBg1UDfZ.js
var import_jsx_runtime = require_jsx_runtime();
function BlogCard({ blog }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group flex flex-col bg-background border border-border rounded-sm overflow-hidden transition-all duration-300 hover:border-yellow",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/blog/$slug",
			params: { slug: blog.slug },
			className: "relative aspect-16/11 overflow-hidden bg-ink-soft flex-shrink-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: blog.image,
				alt: blog.title,
				className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105",
				loading: "lazy",
				width: 600,
				height: 410
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col flex-grow p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tech-label text-yellow uppercase",
							children: blog.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-on-ink-dim",
							children: new Date(blog.date).toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
								year: "numeric"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-on-ink-dim",
							children: [blog.readTime, " min"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/blog/$slug",
					params: { slug: blog.slug },
					className: "mt-4 text-lg font-display font-semibold text-foreground line-clamp-2 hover:text-yellow transition-colors duration-200",
					children: blog.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground line-clamp-2 flex-grow",
					children: blog.excerpt
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 pt-6 border-t border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
						to: "/blog/$slug",
						params: { slug: blog.slug },
						variant: "bare",
						className: "text-sm font-medium text-yellow hover:text-yellow-deep transition-colors",
						children: "Read article"
					})
				})
			]
		})]
	});
}
//#endregion
export { BlogCard as t };
