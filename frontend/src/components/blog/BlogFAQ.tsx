import type { BlogFAQ } from "@/lib/blogs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function BlogFAQ({ faqs }: { faqs: BlogFAQ[] }) {
  return (
    <section className="py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground uppercase mb-12">
        Frequently Asked Questions
      </h2>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="border border-border rounded-sm px-6 py-1 bg-background hover:border-yellow/50 transition-colors"
          >
            <AccordionTrigger className="text-left font-semibold text-foreground hover:text-yellow transition-colors py-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-relaxed pt-2 pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Schema.org FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
