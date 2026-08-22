import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type ComponentProps } from "react";

import { company, img, navLinks } from "@/lib/data";

function Wordmark({ className }: { className?: string }) {
  return (
    <Link to="/" className={className} aria-label="BigScrew logo — home">
      <img
        src={img.logoMark}
        alt="BigScrew logo"
        className="w-[100px] max-w-none object-contain md:w-[120px] lg:w-[140px] lg:-mb-[55px]"
        width={140}
        height={140}
      />
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-ink/95" : "bg-transparent"}`}>
      <div className="absolute left-6 top-0 z-40 hidden lg:block">
        <Wordmark className="block" />
      </div>

      <nav
        aria-label="Primary"
        className={`shell relative z-30 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "h-20" : "h-20 md:h-24"
        }`}
      >
        <div className="flex items-center lg:hidden">
          <Wordmark className="w-[90px]" />
        </div>
        <div className="hidden w-[130px] lg:block" />

        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => {
            const isAnchor = l.to.includes("#");
            const linkClass =
              "group relative text-[13px] font-medium uppercase tracking-[0.01em] text-on-ink transition-colors duration-200 hover:text-yellow after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-0 after:bg-yellow after:transition-all after:duration-200 group-hover:after:w-full";

            return (
              <li key={l.label}>
                {isAnchor ? (
                  <Link to="/" hash="" className={linkClass}>
                    {l.label}
                  </Link>
                ) : (
                  <Link
                    to={l.to}
                    className={linkClass}
                    activeProps={{ className: "text-yellow after:w-full" }}
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden h-11 rounded-sm bg-yellow px-4 text-[14px] font-bold uppercase tracking-[0.01em] text-black transition-colors duration-200 hover:bg-yellow-deep sm:inline-flex items-center justify-center"
          >
            GET A QUOTE&nbsp;→
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="text-on-ink lg:hidden"
          >
            <Menu className="h-7 w-7" strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-ink/95 lg:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 0.84, 0.24, 1] }}
          >
            <div className="shell flex h-20 items-center justify-between">
              <Wordmark className="w-[95px]" />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="text-on-ink">
                <X className="h-7 w-7" strokeWidth={1.5} />
              </button>
            </div>
            <div className="shell mt-8 flex flex-col gap-5">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  {...({
                    to: l.to.includes("#") ? "/" : l.to,
                    ...(l.to.includes("#") ? { hash: "solutions" } : {}),
                  } as ComponentProps<typeof Link>)}
                  onClick={() => setOpen(false)}
                  className="block text-[18px] font-medium uppercase tracking-[0.02em] text-on-ink transition-colors duration-200 hover:text-yellow"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 items-center justify-center rounded-sm bg-yellow px-5 text-[13px] font-medium uppercase tracking-[0.01em] text-on-ink transition-colors duration-200 hover:bg-yellow-deep"
              >
                GET A QUOTE&nbsp;→
              </Link>
              <a href={company.phoneHref} className="mt-4 text-sm text-on-ink-dim">
                {company.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
