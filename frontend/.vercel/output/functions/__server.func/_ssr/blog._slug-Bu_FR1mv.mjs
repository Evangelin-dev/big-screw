import { i as __toESM } from "../_runtime.mjs";
import { a as Trigger2, c as require_jsx_runtime, i as Root2, n as Header, r as Item, s as require_react, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Label } from "./motion-primitives-BfjJ5WDa.mjs";
import { _ as useParams, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Check, d as Linkedin, g as ChevronDown, h as ChevronRight, p as Copy, s as MessageCircle } from "../_libs/lucide-react.mjs";
import { a as getRelatedArticles, c as ArrowLink, r as getBlogBySlug } from "./router-CS6gVxxY.mjs";
import { t as BlogCard } from "./BlogCard-Bqudr0Sb.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog._slug-Bu_FR1mv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
function BlogFAQ({ faqs }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "py-16 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl md:text-3xl font-display font-semibold text-foreground uppercase mb-12",
				children: "Frequently Asked Questions"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
				type: "single",
				collapsible: true,
				className: "space-y-3",
				children: faqs.map((faq, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
					value: `faq-${index}`,
					className: "border border-border rounded-sm px-6 py-1 bg-background hover:border-yellow/50 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
						className: "text-left font-semibold text-foreground hover:text-yellow transition-colors py-4",
						children: faq.question
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
						className: "text-base text-muted-foreground leading-relaxed pt-2 pb-4",
						children: faq.answer
					})]
				}, index))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
				type: "application/ld+json",
				dangerouslySetInnerHTML: { __html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "FAQPage",
					mainEntity: faqs.map((faq) => ({
						"@type": "Question",
						name: faq.question,
						acceptedAnswer: {
							"@type": "Answer",
							text: faq.answer
						}
					}))
				}) }
			})
		]
	});
}
function RelatedArticles({ articles }) {
	if (articles.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "py-16 md:py-24 border-t border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-2xl md:text-3xl font-display font-semibold text-foreground uppercase mb-12",
			children: "Related Insights"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
			children: articles.map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogCard, { blog: article }, article.slug))
		})]
	});
}
function ShareButtons({ title, url }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const handleCopy = () => {
		navigator.clipboard.writeText(url);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	};
	const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
	const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm text-on-ink-dim font-medium",
				children: "Share:"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: linkedinUrl,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "p-2 text-on-ink-dim hover:text-yellow transition-colors duration-200",
				"aria-label": "Share on LinkedIn",
				title: "Share on LinkedIn",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "w-5 h-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: whatsappUrl,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "p-2 text-on-ink-dim hover:text-yellow transition-colors duration-200",
				"aria-label": "Share on WhatsApp",
				title: "Share on WhatsApp",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-5 h-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: handleCopy,
				className: "p-2 text-on-ink-dim hover:text-yellow transition-colors duration-200",
				"aria-label": "Copy link",
				title: "Copy link to clipboard",
				children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-5 h-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-5 h-5" })
			})
		]
	});
}
function BlogDetail() {
	const { slug } = useParams({ from: "/blog/$slug" });
	const blog = getBlogBySlug(slug);
	if (!blog) return null;
	const relatedArticles = getRelatedArticles(blog.slug, 3);
	const publishDate = new Date(blog.date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
	const canonicalUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/blog/${blog.slug}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative bg-ink pt-28 pb-16 md:pb-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/blog",
							className: "text-sm text-on-ink-dim hover:text-yellow transition-colors",
							children: "Blog"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4 text-on-ink-dim" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-on-ink-dim",
							children: blog.category
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							tone: "yellow",
							children: blog.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-6 text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight text-on-ink max-w-4xl",
							children: blog.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap items-center gap-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "tech-label text-on-ink-dim uppercase",
									children: publishDate
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "tech-label text-on-ink-dim uppercase",
									children: "·"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "tech-label text-on-ink-dim uppercase",
									children: [blog.readTime, " min read"]
								}) })
							]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-16 relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: blog.image,
					alt: blog.title,
					className: "w-full h-full object-cover",
					width: 1600,
					height: 900
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-background py-20 md:py-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell max-w-4xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-12 pb-8 border-b border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareButtons, {
							title: blog.title,
							url: canonicalUrl
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
						className: "prose prose-invert max-w-none mb-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							dangerouslySetInnerHTML: { __html: blog.content },
							className: "article-content text-base text-muted-foreground leading-relaxed"
						})
					}),
					blog.faqs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-20 border-t border-border pt-16 md:pt-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogFAQ, { faqs: blog.faqs })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-20 border-t border-border pt-16 md:pt-20 bg-gradient-to-br from-ink/5 to-transparent p-8 md:p-12 rounded-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl md:text-3xl font-display font-semibold text-foreground uppercase mb-4",
								children: "Have an engineering project in mind?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base text-muted-foreground mb-8 max-w-2xl",
								children: "Talk to our team about your requirements. We design, manufacture and install screw pile foundations tailored to your specific needs."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
								to: "/contact",
								variant: "yellow",
								children: "Contact us"
							})
						]
					}),
					relatedArticles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-border pt-16 md:pt-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelatedArticles, { articles: relatedArticles })
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			type: "application/ld+json",
			dangerouslySetInnerHTML: { __html: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "BlogPosting",
				headline: blog.title,
				description: blog.metaDescription,
				image: blog.image,
				datePublished: blog.date,
				author: {
					"@type": "Organization",
					name: blog.author
				},
				publisher: {
					"@type": "Organization",
					name: "BigScrew Solutions",
					logo: {
						"@type": "ImageObject",
						url: "/logo-mark.png"
					}
				},
				keywords: blog.keywords.join(", ")
			}) }
		})
	] });
}
//#endregion
export { BlogDetail as component };
