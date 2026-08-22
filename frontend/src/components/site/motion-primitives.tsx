import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 0.84, 0.24, 1] as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Comp>
  );
}

/** Slow horizontal rule that draws itself in — the recurring BigScrew technical line. */
export function TechLine({ className = "" }: { className?: string }) {
  return (
    <motion.span
      className={`block h-px w-full origin-left bg-yellow ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease }}
    />
  );
}

export function Label({
  children,
  tone = "dim",
  className = "",
}: {
  children: ReactNode;
  tone?: "dim" | "yellow" | "ink";
  className?: string;
}) {
  const tones = {
    dim: "text-muted-foreground",
    yellow:
      "inline-flex items-center rounded-[2px] bg-yellow px-2.5 py-1.5 text-black shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_8px_22px_rgba(0,0,0,0.18)]",
    ink: "text-foreground",
  };
  return <span className={`tech-label ${tones[tone]} ${className}`}>{children}</span>;
}
