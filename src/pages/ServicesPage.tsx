import { ArrowRight, CheckCircle2, ChevronDown, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Contact, Footer } from "@/components/site/Contact";

import { DetailedService, SERVICES } from "@/components/site/data";
import { Reveal, SectionHeading, TiltCard } from "@/components/site/motion-primitives";
import { Navbar } from "@/components/site/Navbar";

export function ServicesPage() {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get("service");
  const [selectedSlug, setSelectedSlug] = useState<string>("all");

  useEffect(() => {
    if (serviceParam) {
      setSelectedSlug(serviceParam);
    }
  }, [serviceParam]);

  const activeService: DetailedService | undefined = useMemo(() => {
    if (selectedSlug === "all") return undefined;
    return SERVICES.find((s) => s.slug === selectedSlug);
  }, [selectedSlug]);

  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28">
        {/* Header with Service Selector */}
        <div className="bg-secondary/40 py-12 sm:py-16 border-b border-border/50">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-brand-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                Our Offered Services
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-primary sm:text-5xl">
                Hiring Models for Every <span className="text-gradient">Mandate</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground">
                Six specialized recruitment and staffing tracks engineered for accuracy, rapid
                turnaround, and total compliance.
              </p>

              {/* Interactive Dropdown Selector */}
              <div className="mt-8 max-w-xl">
                <label
                  htmlFor="service-select"
                  className="block text-xs font-bold uppercase tracking-wider text-accent mb-2"
                >
                  Select a Service Option to View Details:
                </label>
                <div className="relative">
                  <select
                    id="service-select"
                    value={selectedSlug}
                    onChange={(e) => setSelectedSlug(e.target.value)}
                    className="w-full appearance-none rounded-2xl border-2 border-accent/40 bg-card px-5 py-3.5 text-sm font-bold text-primary shadow-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 cursor-pointer pr-10"
                  >
                    <option value="all">✨ All Services Overview (6 Hiring Models)</option>
                    {SERVICES.map((srv) => (
                      <option key={srv.slug} value={srv.slug}>
                        {srv.title} — {srv.badge}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-accent" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Selected Service Detailed View */}
        {activeService ? (
          <section className="py-12 sm:py-16 bg-card border-b border-border">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
              <Reveal>
                <div className="rounded-3xl border-2 border-accent/30 bg-gradient-to-br from-card via-secondary/30 to-brand-soft/20 p-8 shadow-[var(--shadow-lift)]">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="grid size-14 place-items-center rounded-2xl [background-image:var(--gradient-brand)] text-primary-foreground shadow-md">
                        <activeService.icon className="size-7" />
                      </div>
                      <div>
                        <span className="inline-block rounded-full bg-accent/15 px-3 py-0.5 text-xs font-bold text-accent">
                          {activeService.badge}
                        </span>
                        <h2 className="text-2xl font-black text-primary sm:text-3xl mt-1">
                          {activeService.title}
                        </h2>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedSlug("all")}
                      className="rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
                    >
                      &larr; View All 6 Services
                    </button>
                  </div>

                  <p className="mt-6 text-base sm:text-lg leading-relaxed text-primary/90 font-medium">
                    {activeService.detailedDesc}
                  </p>

                  <div className="mt-8 grid gap-8 md:grid-cols-2">
                    <div className="rounded-2xl border border-border bg-card/80 p-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                        <Sparkles className="size-4" /> Service Highlights
                      </h3>
                      <ul className="mt-4 grid gap-3">
                        {activeService.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5 text-sm text-primary/80">
                            <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-border bg-card/80 p-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                        <CheckCircle2 className="size-4" /> Typical Mandates &amp; Roles
                      </h3>
                      <ul className="mt-4 grid gap-2.5">
                        {activeService.roles.map((r) => (
                          <li
                            key={r}
                            className="rounded-xl bg-secondary/60 px-3.5 py-2 text-xs font-semibold text-primary"
                          >
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-primary">
                      Need custom terms or immediate headcount for {activeService.title}?
                    </p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition-transform hover:scale-105"
                    >
                      Discuss {activeService.title} <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        ) : null}

        {/* All Services Grid */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Explore All Hiring Models"
              title="End-to-End Talent Delivery Tracks"
              highlight="Across India"
              body="Click any service card or select from the dropdown above to view full capabilities."
            />

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s, i) => {
                const isSelected = selectedSlug === s.slug;
                return (
                  <Reveal key={s.title} delay={i * 0.06}>
                    <TiltCard
                      className={`group relative h-full overflow-hidden rounded-3xl border bg-card p-7 transition-all duration-300 shadow-[var(--shadow-soft)] cursor-pointer ${
                        isSelected
                          ? "border-accent ring-2 ring-accent/30 bg-brand-soft/20"
                          : "border-border hover:border-accent/40"
                      }`}
                      onClick={() => setSelectedSlug(s.slug)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="grid size-12 place-items-center rounded-2xl border border-accent/20 bg-brand-soft text-accent">
                          <s.icon className="size-6" aria-hidden="true" />
                        </div>
                        <span className="rounded-full bg-secondary px-2.5 py-1 text-[0.7rem] font-bold text-primary/80">
                          {s.badge}
                        </span>
                      </div>
                      <h3 className="mt-5 text-lg font-bold tracking-tight text-primary group-hover:text-accent transition-colors">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                      <div className="mt-6 flex items-center justify-between text-xs font-bold text-accent">
                        <span>{isSelected ? "Currently Selected" : "Select & View Details"}</span>
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
