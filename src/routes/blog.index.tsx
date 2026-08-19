import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { FeaturedBlogCard } from "@/components/blog/FeaturedBlogCard";
import { BlogCard } from "@/components/blog/BlogCard";
import { Label } from "@/components/site/motion-primitives";
import { blogs, getBlogsByCategory, searchBlogs } from "@/lib/blogs";
import { img } from "@/lib/data";

const title = "Blog | BigScrew Solutions";
const description =
  "Engineering insights, knowledge and industry information about helical screw pile foundations, solar projects, battery storage, and construction best practices.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

type Category = "ALL" | "SCREW PILES" | "FOUNDATIONS" | "SOLAR" | "BESS" | "INSTALLATION" | "ENGINEERING" | "APPLICATIONS" | "INDUSTRY INSIGHTS";

const CATEGORIES: Category[] = [
  "ALL",
  "SCREW PILES",
  "FOUNDATIONS",
  "SOLAR",
  "BESS",
  "INSTALLATION",
  "ENGINEERING",
  "APPLICATIONS",
  "INDUSTRY INSIGHTS",
];

function BlogIndex() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and search articles
  const filteredBlogs = useMemo(() => {
    let result = getBlogsByCategory(selectedCategory);

    if (searchQuery) {
      const searchResults = searchBlogs(searchQuery);
      result = result.filter((blog) => searchResults.some((sb) => sb.slug === blog.slug));
    }

    return result;
  }, [selectedCategory, searchQuery]);

  // Featured article is the first one that matches filters
  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : blogs[0];
  const otherBlogs = filteredBlogs.filter((b) => b.slug !== featuredBlog.slug);

  const hasNoResults = filteredBlogs.length === 0;

  return (
    <>
      <PageHero
        eyebrow="Engineering Insights"
        title="Knowledge that"
        accent="builds better foundations"
        intro="Explore practical insights, engineering knowledge, applications, installation methods and industry information related to helical screw pile foundations."
        image={img.solarSite}
        imageAlt="BigScrew blog and engineering insights"
      />

      <section className="bg-background py-20 md:py-28">
        <div className="shell">
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-ink-dim" />
              <input
                type="text"
                placeholder="Search engineering insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-on-ink-dim focus:outline-none focus:border-yellow transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-ink-dim hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-12 pb-8 border-b border-border">
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`tech-label px-4 py-2 rounded-sm transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-yellow text-primary-foreground"
                      : "border border-on-ink-dim/30 text-on-ink-dim hover:border-yellow hover:text-yellow"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {hasNoResults ? (
            // Empty State
            <div className="py-24 text-center">
              <p className="text-lg text-on-ink-dim">No articles found.</p>
              <p className="mt-2 text-on-ink-dim">Try another keyword or category.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("ALL");
                }}
                className="mt-6 inline-flex px-6 py-3 bg-yellow text-primary-foreground tech-label rounded-sm hover:bg-yellow-deep transition-colors"
              >
                View all articles
              </button>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              <div className="mb-16">
                <Label tone="yellow">Featured</Label>
                <div className="mt-6">
                  <FeaturedBlogCard blog={featuredBlog} />
                </div>
              </div>

              {/* Blog Grid */}
              {otherBlogs.length > 0 && (
                <div>
                  <h2 className="text-xl font-display font-semibold text-foreground uppercase mb-8">
                    {selectedCategory === "ALL" ? "All Articles" : "More Articles"}
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {otherBlogs.map((blog) => (
                      <BlogCard key={blog.slug} blog={blog} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
