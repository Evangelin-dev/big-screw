import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center grain-dark px-4">
      <div className="max-w-md text-center">
        <p className="tech-label text-yellow">Error 404</p>
        <h1 className="mt-4 display-lg text-on-ink">Nothing driven here.</h1>
        <p className="mt-4 text-sm text-on-ink-dim">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex bg-yellow px-6 py-4 tech-label text-primary-foreground"
          >
            Back to home →
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center grain-dark px-4">
      <div className="max-w-md text-center">
        <p className="tech-label text-yellow">System</p>
        <h1 className="mt-4 display-md text-on-ink">This page didn't load</h1>
        <p className="mt-4 text-sm text-on-ink-dim">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-yellow px-6 py-4 tech-label text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="border border-on-ink-dim/50 px-6 py-4 tech-label text-on-ink">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BigScrew Solutions — Helical Screw Pile Foundations" },
      {
        name: "description",
        content:
          "BigScrew Solutions designs, manufactures and installs helical screw pile foundations in Navi Mumbai, India. Foundations, driven not poured.",
      },
      { name: "author", content: "BigScrew Solutions" },
      { property: "og:site_name", content: "BigScrew Solutions" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#141414" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "BigScrew Solutions",
          description:
            "Manufacturer and installer of helical screw pile foundations for solar, storage, housing, industrial structures, fencing, poles, towers and bridges.",
          telephone: "+91 98923 85568",
          url: "https://www.bigscrew.in",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Plot No. R-413, MIDC TTC Industrial Area, Rabale",
            addressLocality: "Navi Mumbai",
            postalCode: "400701",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <main id="main">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
      <Link
        to="/contact"
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-2 bg-yellow py-4 tech-label text-primary-foreground sm:hidden"
      >
        Get a Quote <span aria-hidden>→</span>
      </Link>
    </QueryClientProvider>
  );
}
