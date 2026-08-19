import type { ReactNode } from "react";

import { Label } from "@/components/site/motion-primitives";

export function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  image: string;
  imageAlt: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[76svh] flex-col justify-end overflow-hidden bg-ink pt-28">
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
        width={1600}
        height={900}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />
      <div className="shell relative pb-16 md:pb-24">
        <Label tone="yellow">{eyebrow}</Label>
        <h1 className="mt-6 display-lg text-on-ink">
          {title} {accent ? <span className="text-yellow">{accent}</span> : null}
        </h1>
        {intro ? <p className="mt-6 max-w-2xl text-base leading-relaxed text-on-ink-dim">{intro}</p> : null}
        {children}
      </div>
    </section>
  );
}

export function SpecTable({ headers, rows }: { headers: string[]; rows: Record<string, string>[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-3xl border-collapse text-left">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} scope="col" className="border-b border-border py-4 pr-6 tech-label text-muted-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {headers.map((h, j) => (
                <td
                  key={h}
                  className={`border-b border-border py-5 pr-6 text-sm ${
                    j === 0 ? "font-display text-lg font-semibold uppercase text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {r[h]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
