import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { SERVICES, WHY_US } from "./data";
import { Reveal, SectionHeading, TiltCard } from "./motion-primitives";

export function Services() {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-20 sm:py-28 relative">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our offered services"
          title="Hiring models for every"
          highlight="mandate"
          body="Six delivery tracks covering permanent, volume, contractual, leadership, payroll and SAP hiring."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <TiltCard
                className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] cursor-pointer hover:border-accent/50 transition-colors"
                onClick={() => navigate(`/services?service=${s.slug}`)}
              >
                <span
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 size-40 rounded-full bg-brand-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="grid size-12 place-items-center rounded-2xl border border-accent/20 bg-brand-soft text-accent">
                      <s.icon className="size-6" aria-hidden="true" />
                    </div>
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-[0.7rem] font-bold text-accent">
                      {s.badge}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold tracking-tight text-primary group-hover:text-accent transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-accent opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                    Explore details &amp; roles
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-secondary/60 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why choose us"
          title="Built for speed, accuracy and"
          highlight="compliance"
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((w, i) => (
            <Reveal as="li" key={w.title} delay={i * 0.06}>
              <div className="group flex h-full gap-4 rounded-3xl border border-border bg-card p-6 transition-all duration-400 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow-lift)]">
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-colors duration-300 group-hover:[background-image:var(--gradient-brand)]">
                  <w.icon className="size-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold tracking-tight text-primary">{w.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
