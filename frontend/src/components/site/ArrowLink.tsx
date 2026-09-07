import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

type Variant = "yellow" | "outlineLight" | "outlineDark" | "ink" | "bare";

const base =
  "group inline-flex items-center gap-3 px-6 py-4 tech-label transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-3";

const variants: Record<Variant, string> = {
  yellow: "bg-yellow text-primary-foreground hover:bg-yellow-deep",
  outlineLight: "border border-on-ink-dim/50 text-on-ink hover:border-yellow hover:text-yellow",
  outlineDark: "border border-foreground/25 text-foreground hover:border-yellow hover:bg-yellow",
  ink: "bg-ink text-on-ink hover:bg-charcoal",
  bare: "",
};

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      <span>{children}</span>
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
        →
      </span>
    </>
  );
}

export function ArrowLink({
  to,
  hash,
  params,
  children,
  variant = "yellow",
  className = "",
}: {
  to: string;
  hash?: string;
  params?: Record<string, string>;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const linkProps = {
    to,
    ...(hash ? { hash } : {}),
    ...(params ? { params } : {}),
  } as unknown as ComponentProps<typeof Link>;

  if (variant === "bare") {
    return (
      <Link {...linkProps} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <Link {...linkProps} className={`${base} ${variants[variant]} ${className}`}>
      <Inner>{children}</Inner>
    </Link>
  );
}

export function ArrowButton({
  children,
  variant = "yellow",
  className = "",
  type = "button",
  onClick,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  return (
    <button type={type} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      <Inner>{children}</Inner>
    </button>
  );
}
