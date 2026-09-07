# Blog System - Quick Reference & Maintenance Guide

## Adding a New Blog Article

To add a new blog article, simply add a new object to the `blogs` array in `src/lib/blogs.ts`:

```typescript
{
  id: "6",
  slug: "your-article-slug", // URL-friendly slug
  title: "Your Article Title",
  excerpt: "A short 1-2 sentence summary for the blog listing page.",
  category: "SCREW PILES", // Choose from: SCREW PILES, FOUNDATIONS, SOLAR, BESS, INSTALLATION, ENGINEERING, APPLICATIONS, INDUSTRY INSIGHTS
  date: "2026-08-20", // YYYY-MM-DD format
  readTime: 8, // Estimated reading time in minutes
  author: "BigScrew Engineering Team",
  image: img.solarSite, // Import the image at top of file
  keywords: ["keyword1", "keyword2", "keyword3"],
  metaTitle: "Your Article Title | BigScrew Solutions",
  metaDescription: "Description for search engines (160 chars max).",
  content: `
<section>
<h2>Section Heading</h2>
<p>Article content in HTML format. Use semantic HTML tags.</p>
<ul>
<li>List item 1</li>
<li>List item 2</li>
</ul>
</section>
  `,
  faqs: [
    {
      question: "Example FAQ question?",
      answer: "Provide a substantive answer relevant to the article.",
    },
    // Add 8-10 FAQs for each article
  ],
  relatedKeywords: ["keyword1", "keyword2"],
}
```

**The UI will automatically:**

- Create a card in the blog grid
- Generate the route `/blog/your-article-slug`
- Display the full article with proper formatting
- Show FAQs in an accordion
- Find related articles based on keywords
- Generate SEO metadata

---

## File Structure

```
src/
├── lib/
│   ├── blogs.ts              # Blog content & utilities
│   └── data.ts               # Updated with BLOG nav link
├── routes/
│   ├── blog.index.tsx        # /blog listing page
│   └── blog.$slug.tsx        # /blog/:slug detail page
├── components/
│   └── blog/
│       ├── BlogCard.tsx      # Article card component
│       ├── FeaturedBlogCard.tsx
│       ├── BlogFAQ.tsx       # FAQ accordion
│       ├── RelatedArticles.tsx
│       └── ShareButtons.tsx  # Social sharing
└── styles.css                # Updated with .article-content styles
```

---

## Design System Usage

### Colors

- **Primary Brand**: `text-yellow` (brand accent)
- **Text**: `text-foreground` (white), `text-on-ink-dim` (light gray)
- **Backgrounds**: `bg-background` (off-white), `bg-ink` (dark)

### Typography

- **Headings**: Use `font-display` + `font-semibold` + `uppercase`
- **Tech labels**: Use `tech-label` utility class
- **Body text**: Default sans-serif (Barlow)

### Components

- **Links**: Use `<ArrowLink>` with variants: `yellow`, `outline`, `bare`
- **Labels**: Use `<Label tone="yellow">` for section eyebrows
- **Cards**: Use border + hover effects

### Spacing

- Use Tailwind spacing classes (`mt-6`, `mb-12`, `px-8`, etc.)
- Content container: `shell` class (auto width with padding)

---

## Search & Filter Logic

**Search works by matching:**

- Article title (case-insensitive)
- Article excerpt
- Article keywords
- FAQ questions and answers

**Filters work by:**

- Selecting matching category
- If "ALL" selected, shows all articles
- Combining search + category filter (AND operation)

---

## SEO Best Practices

When writing article content:

1. **Use semantic HTML**

   ```html
   <h2>Main Section</h2>
   <h3>Subsection</h3>
   <p>Content...</p>
   <ul>
     <li>Points</li>
   </ul>
   ```

2. **Write for readability**
   - Short paragraphs (3-4 sentences max)
   - Clear headings
   - Bullet points for lists
   - Proper spacing

3. **Keywords**
   - Include in title (naturally)
   - Use in subheadings
   - Add to keywords array
   - Mention in FAQs

4. **FAQ keywords**
   - Make questions natural and specific
   - Answer should be 2-3 sentences minimum
   - Vary question phrasing (avoid duplicate questions)

---

## Component API

### `<BlogCard blog={blog} />`

Displays a single article card for the grid.

- Shows: image, category, date, title, excerpt, read link
- Props: `blog: BlogArticle`

### `<FeaturedBlogCard blog={blog} />`

Large featured article card (image + content side-by-side).

- Responsive: stacks on mobile
- Props: `blog: BlogArticle`

### `<BlogFAQ faqs={faqs} />`

Accordion FAQ section with structured data.

- Automatically renders schema.org JSON-LD
- Props: `faqs: BlogFAQ[]`

### `<RelatedArticles articles={articles} />`

Shows 3 related article cards at bottom of page.

- Props: `articles: BlogArticle[]`

### `<ShareButtons title={title} url={url} />`

Social sharing buttons (LinkedIn, WhatsApp, Copy Link).

- Props: `title: string`, `url: string`

---

## Utility Functions

### `getBlogBySlug(slug: string): BlogArticle | undefined`

Get a single article by its slug.

### `getBlogsByCategory(category: string): BlogArticle[]`

Filter articles by category. Pass "ALL" for all articles.

### `searchBlogs(query: string): BlogArticle[]`

Search articles by title, excerpt, keywords, or FAQ content.

### `getRelatedArticles(slug: string, limit = 3): BlogArticle[]`

Get related articles based on keyword matching and same category.

---

## Styling Classes

### Article Content

Apply class `article-content` to container with rendered HTML:

```tsx
<div dangerouslySetInnerHTML={{ __html: blog.content }} className="article-content" />
```

Automatically styles:

- `h2`, `h3` headings
- `p` paragraphs
- `ul`, `ol` lists
- `table` elements
- `strong`, `em` text

---

## Content Guidelines

### Article Length

- Recommended: 1500-3000 words
- Section headings every 300-400 words
- Minimum 1 image or table

### FAQ Creation

- 1 FAQ per 100-150 words of content
- 8-10 FAQs per article minimum
- Questions should be customer questions, not generic
- Answers should directly address the question

### Headlines

- Clear and descriptive
- Include main keyword naturally
- Avoid keyword stuffing
- Professional tone

### Examples from existing content:

✅ "Helical Screw Pile Foundations: A Complete Guide for Modern Construction"
✅ "Screw Piles vs. Concrete Foundations: A Detailed Comparison"
✅ "Screw Piles for Solar Ground Mount: Why Developers Choose Screw Foundations"

---

## Extending the Blog

### Adding More Categories

Edit the `Category` type in `blogs.ts`:

```typescript
type Category =
  | "SCREW PILES"
  | "FOUNDATIONS"
  | "SOLAR"
  | "BESS"
  | "INSTALLATION"
  | "ENGINEERING"
  | "APPLICATIONS"
  | "INDUSTRY INSIGHTS"
  | "YOUR_NEW_CATEGORY";
```

Update the `CATEGORIES` array in `blog.index.tsx`:

```typescript
const CATEGORIES: Category[] = [
  "ALL",
  "SCREW PILES",
  // ... other categories
  "YOUR_NEW_CATEGORY",
];
```

### Customizing Featured Article Selection

In `blog.index.tsx`, change how featured article is selected:

```typescript
// Current: shows first article in filtered results
const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : blogs[0];

// Alternative: show most recent
const featuredBlog = [...filteredBlogs].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
)[0];

// Alternative: show highest read time
const featuredBlog = [...filteredBlogs].sort((a, b) => b.readTime - a.readTime)[0];
```

### Adding Image Gallery to Articles

Modify `BlogArticle` type to include gallery:

```typescript
gallery?: Array<{ src: string; alt: string; caption: string }>;
```

---

## Performance Notes

- Images are lazy-loaded in article grids
- Hero images load immediately
- FAQ accordion lazy-renders content
- Search is O(n) but fast for <100 articles
- Build time: ~18 seconds (includes all assets)

---

## Troubleshooting

### Blog page not showing articles

- Check that blogs array in `blogs.ts` has entries
- Verify slug format (lowercase, hyphens, no spaces)
- Check browser console for errors

### FAQ accordion not opening

- Verify `BlogFAQ` component is imported
- Check that `faqs` array is not empty
- Inspect Radix UI accordion HTML structure

### Images not loading

- Verify image import at top of `blogs.ts`
- Check image path is correct
- Ensure image file exists in `src/assets/`
- Check for CORS issues if external URL

### Search not working

- Check search query is not empty
- Verify keywords array is populated
- Check FAQ questions/answers are in HTML

### Layout shifting on mobile

- Check for horizontal overflow with `overflow-x-hidden`
- Verify max-widths are set
- Test on actual mobile device or DevTools

---

## Support & Questions

For implementation details, refer to:

- `src/lib/blogs.ts` - Data structure and utilities
- `src/routes/blog.index.tsx` - Blog listing logic
- `src/routes/blog.$slug.tsx` - Blog detail logic
- `BLOG_IMPLEMENTATION_COMPLETE.md` - Full implementation details
