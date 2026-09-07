import { createFileRoute, useParams } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { getBlogBySlug, getRelatedArticles } from "@/lib/blogs";
import { BlogFAQ } from "@/components/blog/BlogFAQ";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { ArrowLink } from "@/components/site/ArrowLink";
import { Label } from "@/components/site/motion-primitives";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const blog = getBlogBySlug(params.slug);
    if (!blog) {
      return {
        meta: [
          { title: "Article not found" },
          { name: "description", content: "This article could not be found." },
        ],
      };
    }

    return {
      meta: [
        { title: blog.metaTitle },
        { name: "description", content: blog.metaDescription },
        { name: "keywords", content: blog.keywords.join(", ") },
        { property: "og:title", content: blog.metaTitle },
        { property: "og:description", content: blog.metaDescription },
        { property: "og:image", content: blog.image },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${blog.slug}` },
        { property: "article:published_time", content: blog.date },
        { property: "article:author", content: blog.author },
        { property: "article:section", content: blog.category },
      ],
      links: [{ rel: "canonical", href: `/blog/${blog.slug}` }],
    };
  },
  component: BlogDetail,
  errorComponent: () => (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <p className="tech-label text-yellow">Error 404</p>
        <h1 className="mt-4 text-3xl font-display font-semibold text-foreground">
          Article not found
        </h1>
        <p className="mt-4 text-on-ink-dim">The blog article you're looking for doesn't exist.</p>
        <div className="mt-8">
          <ArrowLink to="/blog" variant="yellow">
            Back to blog
          </ArrowLink>
        </div>
      </div>
    </div>
  ),
});

function BlogDetail() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return null;
  }

  const relatedArticles = getRelatedArticles(blog.slug, 3);
  const publishDate = new Date(blog.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const canonicalUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/blog/${blog.slug}`;

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-ink pt-28 pb-16 md:pb-24">
        <div className="shell">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Link
              to="/blog"
              className="text-sm text-on-ink-dim hover:text-yellow transition-colors"
            >
              Blog
            </Link>
            <ChevronRight className="w-4 h-4 text-on-ink-dim" />
            <span className="text-sm text-on-ink-dim">{blog.category}</span>
          </div>

          {/* Category & Meta */}
          <div className="mt-8">
            <Label tone="yellow">{blog.category}</Label>

            {/* Title */}
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight text-on-ink max-w-4xl">
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div>
                <p className="tech-label text-on-ink-dim uppercase">{publishDate}</p>
              </div>
              <div>
                <p className="tech-label text-on-ink-dim uppercase">·</p>
              </div>
              <div>
                <p className="tech-label text-on-ink-dim uppercase">{blog.readTime} min read</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-16 relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
            width={1600}
            height={900}
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-background py-20 md:py-28">
        <div className="shell max-w-4xl">
          {/* Share Buttons */}
          <div className="mb-12 pb-8 border-b border-border">
            <ShareButtons title={blog.title} url={canonicalUrl} />
          </div>

          {/* Article Content */}
          <article className="prose prose-invert max-w-none mb-20">
            <div
              dangerouslySetInnerHTML={{ __html: blog.content }}
              className="article-content text-base text-muted-foreground leading-relaxed"
            />
          </article>

          {/* FAQ Section */}
          {blog.faqs.length > 0 && (
            <div className="mb-20 border-t border-border pt-16 md:pt-20">
              <BlogFAQ faqs={blog.faqs} />
            </div>
          )}

          {/* CTA Section */}
          <div className="mb-20 border-t border-border pt-16 md:pt-20 bg-gradient-to-br from-ink/5 to-transparent p-8 md:p-12 rounded-sm">
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground uppercase mb-4">
              Have an engineering project in mind?
            </h2>
            <p className="text-base text-muted-foreground mb-8 max-w-2xl">
              Talk to our team about your requirements. We design, manufacture and install screw
              pile foundations tailored to your specific needs.
            </p>
            <ArrowLink to="/contact" variant="yellow">
              Contact us
            </ArrowLink>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="border-t border-border pt-16 md:pt-20">
              <RelatedArticles articles={relatedArticles} />
            </div>
          )}
        </div>
      </section>

      {/* Article Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.metaDescription,
            image: blog.image,
            datePublished: blog.date,
            author: {
              "@type": "Organization",
              name: blog.author,
            },
            publisher: {
              "@type": "Organization",
              name: "BigScrew Solutions",
              logo: {
                "@type": "ImageObject",
                url: "/logo-mark.png",
              },
            },
            keywords: blog.keywords.join(", "),
          }),
        }}
      />
    </>
  );
}
