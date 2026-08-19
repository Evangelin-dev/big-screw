import { Link } from "@tanstack/react-router";

import { ArrowLink } from "@/components/site/ArrowLink";
import { applications, company, img, navLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="grain-dark text-on-ink">
      <div className="shell py-20 md:py-28">
        <div className="flex flex-col gap-14 lg:flex-row lg:justify-between">
          <div className="max-w-md">
            <div className="w-40 max-w-full">
              <img
                src={img.logoMark}
                alt={company.name}
                className="h-auto w-full"
                width={1200}
                height={900}
              />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-on-ink-dim">
              Helical screw pile foundations — designed, manufactured and installed. Screw piles for solar,
              storage, housing, industrial structures, carports, EV charging, fencing, poles, towers and bridges.
            </p>
            <div className="mt-8">
              <ArrowLink to="/contact" variant="yellow">
                Get a project quote
              </ArrowLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <nav aria-label="Footer">
              <p className="tech-label text-yellow">Navigate</p>
              <ul className="mt-5 space-y-3">
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to.includes("#") ? "/" : l.to}
                      className="text-sm text-on-ink-dim uppercase transition-colors hover:text-yellow"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/contact" className="text-sm text-on-ink-dim uppercase transition-colors hover:text-yellow">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Applications">
              <p className="tech-label text-yellow">Applications</p>
              <ul className="mt-5 space-y-3">
                {applications.map((a) => (
                  <li key={a.slug}>
                    <Link
                      to="/applications/$slug"
                      params={{ slug: a.slug }}
                      className="text-sm text-on-ink-dim uppercase transition-colors hover:text-yellow"
                    >
                      {a.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <address className="not-italic">
              <p className="tech-label text-yellow">Contact</p>
              <p className="mt-5 text-sm leading-relaxed text-on-ink-dim">
                {company.address.line1}
                <br />
                {company.address.line2}
                <br />
                {company.address.line3}
                <br />
                {company.address.line4}
              </p>
              <p className="mt-4 text-sm">
                <a href={company.phoneHref} className="transition-colors hover:text-yellow">
                  {company.phone}
                </a>
              </p>
              <p className="mt-1 text-sm">
                <a
                  href={company.webHref}
                  className="text-on-ink-dim transition-colors hover:text-yellow"
                  rel="noreferrer"
                >
                  {company.web}
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-on-ink/10">
        <div className="shell flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="tech-label text-on-ink-dim">Engineered Foundations / Navi Mumbai, India</p>
          <p className="tech-label text-on-ink-dim">© {new Date().getFullYear()} Bigscrew Solutions</p>
        </div>
      </div>
    </footer>
  );
}
