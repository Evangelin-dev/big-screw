import { Link } from "@tanstack/react-router";
import type { BlogArticle } from "@/lib/blogs";
import { ArrowLink } from "@/components/site/ArrowLink";

export function FeaturedBlogCard({ blog }: { blog: BlogArticle }) {
  return (
    <div className="group grid gap-0 border border-border rounded-sm overflow-hidden bg-background lg:grid-cols-2 lg:gap-px">
      {/* Image - Left side on desktop, top on mobile */}
      <Link
        to="/blog/$slug"
        params={{ slug: blog.slug }}
        className="relative aspect-video lg:aspect-auto lg:min-h-80 overflow-hidden bg-ink-soft col-span-1"
      >
        <img
          src={blog.image}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          width={800}
          height={600}
        />
      </Link>

      {/* Content - Right side on desktop, bottom on mobile */}
      <div className="flex flex-col justify-between p-8 bg-background lg:p-10">
        {/* Meta */}
        <div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="tech-label text-yellow uppercase">{blog.category}</span>
            <span className="text-on-ink-dim">
              {new Date(blog.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-on-ink-dim">·</span>
            <span className="text-on-ink-dim">{blog.readTime} MIN READ</span>
          </div>

          {/* Title */}
          <Link
            to="/blog/$slug"
            params={{ slug: blog.slug }}
            className="mt-6 block text-2xl lg:text-3xl font-display font-semibold text-foreground leading-snug hover:text-yellow transition-colors duration-200"
          >
            {blog.title}
          </Link>

          {/* Excerpt */}
          <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-lg">
            {blog.excerpt}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <ArrowLink to="/blog/$slug" params={{ slug: blog.slug }} variant="yellow">
            Read article
          </ArrowLink>
        </div>
      </div>
    </div>
  );
}
