import { Link } from "@tanstack/react-router";
import type { BlogArticle } from "@/lib/blogs";
import { ArrowLink } from "@/components/site/ArrowLink";

export function BlogCard({ blog }: { blog: BlogArticle }) {
  return (
    <div className="group flex flex-col bg-background border border-border rounded-sm overflow-hidden transition-all duration-300 hover:border-yellow">
      {/* Image */}
      <Link
        to="/blog/$slug"
        params={{ slug: blog.slug }}
        className="relative aspect-16/11 overflow-hidden bg-ink-soft flex-shrink-0"
      >
        <img
          src={blog.image}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          width={600}
          height={410}
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs">
          <span className="tech-label text-yellow uppercase">{blog.category}</span>
          <span className="text-on-ink-dim">
            {new Date(blog.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="text-on-ink-dim">{blog.readTime} min</span>
        </div>

        {/* Title */}
        <Link
          to="/blog/$slug"
          params={{ slug: blog.slug }}
          className="mt-4 text-lg font-display font-semibold text-foreground line-clamp-2 hover:text-yellow transition-colors duration-200"
        >
          {blog.title}
        </Link>

        {/* Excerpt */}
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2 flex-grow">{blog.excerpt}</p>

        {/* CTA */}
        <div className="mt-6 pt-6 border-t border-border">
          <ArrowLink
            to="/blog/$slug"
            params={{ slug: blog.slug }}
            variant="bare"
            className="text-sm font-medium text-yellow hover:text-yellow-deep transition-colors"
          >
            Read article
          </ArrowLink>
        </div>
      </div>
    </div>
  );
}
