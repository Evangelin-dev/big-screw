import { i as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Label } from "./motion-primitives-BfjJ5WDa.mjs";
import { t as PageHero } from "./PageHero-B0eXY2Ef.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Search, t as X } from "../_libs/lucide-react.mjs";
import { c as ArrowLink, f as img, i as getBlogsByCategory, n as blogs, o as searchBlogs } from "./router-DUZ1py_X.mjs";
import { t as BlogCard } from "./BlogCard-BAUmVU7c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog.index-DvLoHFov.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FeaturedBlogCard({ blog }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group grid gap-0 border border-border rounded-sm overflow-hidden bg-background lg:grid-cols-2 lg:gap-px",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/blog/$slug",
			params: { slug: blog.slug },
			className: "relative aspect-video lg:aspect-auto lg:min-h-80 overflow-hidden bg-ink-soft col-span-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: blog.image,
				alt: blog.title,
				className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105",
				width: 800,
				height: 600
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col justify-between p-8 bg-background lg:p-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-4 text-sm",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-on-ink-dim",
							children: "·"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-on-ink-dim",
							children: [blog.readTime, " MIN READ"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/blog/$slug",
					params: { slug: blog.slug },
					className: "mt-6 block text-2xl lg:text-3xl font-display font-semibold text-foreground leading-snug hover:text-yellow transition-colors duration-200",
					children: blog.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-base text-muted-foreground leading-relaxed max-w-lg",
					children: blog.excerpt
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
					to: "/blog/$slug",
					params: { slug: blog.slug },
					variant: "yellow",
					children: "Read article"
				})
			})]
		})]
	});
}
var CATEGORIES = [
	"ALL",
	"SCREW PILES",
	"FOUNDATIONS",
	"SOLAR",
	"BESS",
	"INSTALLATION",
	"ENGINEERING",
	"APPLICATIONS",
	"INDUSTRY INSIGHTS"
];
function BlogIndex() {
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("ALL");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const filteredBlogs = (0, import_react.useMemo)(() => {
		let result = getBlogsByCategory(selectedCategory);
		if (searchQuery) {
			const searchResults = searchBlogs(searchQuery);
			result = result.filter((blog) => searchResults.some((sb) => sb.slug === blog.slug));
		}
		return result;
	}, [selectedCategory, searchQuery]);
	const featuredBlog = filteredBlogs[0] ?? blogs[0];
	const otherBlogs = featuredBlog ? filteredBlogs.filter((b) => b.slug !== featuredBlog.slug) : [];
	const hasNoResults = filteredBlogs.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Engineering Insights",
		title: "Knowledge that",
		accent: "builds better foundations",
		intro: "Explore practical insights, engineering knowledge, applications, installation methods and industry information related to helical screw pile foundations.",
		image: img.solarSite,
		imageAlt: "BigScrew blog and engineering insights"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background py-20 md:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-ink-dim" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Search engineering insights...",
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value),
								className: "w-full pl-12 pr-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-on-ink-dim focus:outline-none focus:border-yellow transition-colors"
							}),
							searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSearchQuery(""),
								className: "absolute right-4 top-1/2 -translate-y-1/2 text-on-ink-dim hover:text-foreground transition-colors",
								"aria-label": "Clear search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-12 pb-8 border-b border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-3",
						children: CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelectedCategory(category),
							className: `tech-label px-4 py-2 rounded-sm transition-all duration-200 ${selectedCategory === category ? "bg-yellow text-primary-foreground" : "border border-on-ink-dim/30 text-on-ink-dim hover:border-yellow hover:text-yellow"}`,
							children: category
						}, category))
					})
				}),
				hasNoResults ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-24 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg text-on-ink-dim",
							children: "No articles found."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-on-ink-dim",
							children: "Try another keyword or category."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setSearchQuery("");
								setSelectedCategory("ALL");
							},
							className: "mt-6 inline-flex px-6 py-3 bg-yellow text-primary-foreground tech-label rounded-sm hover:bg-yellow-deep transition-colors",
							children: "View all articles"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [featuredBlog && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						tone: "yellow",
						children: "Featured"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedBlogCard, { blog: featuredBlog })
					})]
				}), otherBlogs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-display font-semibold text-foreground uppercase mb-8",
					children: selectedCategory === "ALL" ? "All Articles" : "More Articles"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
					children: otherBlogs.map((blog) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogCard, { blog }, blog.slug))
				})] })] })
			]
		})
	})] });
}
//#endregion
export { BlogIndex as component };
