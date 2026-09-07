import type { BlogArticle } from "@/lib/blogs";
import { BlogCard } from "./BlogCard";

export function RelatedArticles({ articles }: { articles: BlogArticle[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="py-16 md:py-24 border-t border-border">
      <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground uppercase mb-12">
        Related Insights
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <BlogCard key={article.slug} blog={article} />
        ))}
      </div>
    </section>
  );
}
