import { useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

import { INDUSTRIES, PROCESS } from "./data";
import { Reveal, SectionHeading, TiltCard } from "./motion-primitives";

export function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-20 sm:py-28 relative">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our process"
          title="A 5-step path from brief to"
          highlight="onboarded"
          body="A proven, predictable recruitment framework that ensures fast turnaround without sacrificing quality."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[320px_1fr]">
          <ol className="relative grid gap-2">
            <span
              aria-hidden="true"
              className="absolute left-[1.35rem] top-4 bottom-4 w-px bg-border"
            />
            {PROCESS.map((step, i) => (
              <li key={step.title}>
                <button
                  type="button"
                  onClick={() => setActiveStep(i)}
                  aria-current={activeStep === i ? "step" : undefined}
                  className={cn(
                    "relative flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-all duration-300 border",
                    activeStep === i
                      ? "bg-card border-accent/40 shadow-sm"
                      : "bg-transparent border-transparent hover:bg-secondary/70",
                  )}
                >
                  <span
                    className={cn(
                      "relative z-10 grid size-9 shrink-0 place-items-center rounded-full text-sm font-extrabold transition-all duration-300",
                      activeStep === i
                        ? "[background-image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-brand)]"
                        : "border border-border bg-card text-primary",
                    )}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "text-xs font-bold leading-tight",
                        activeStep === i ? "text-accent" : "text-primary/80",
                      )}
                    >
                      {step.title}
                    </p>
                    <p className="text-[0.7rem] text-muted-foreground mt-0.5">
                      Stage {i + 1} of {PROCESS.length}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ol>

          <Reveal className="h-full">
            <div
              className="relative overflow-hidden flex h-full flex-col justify-between rounded-3xl p-8 sm:p-10 shadow-xl border border-primary/20"
              style={{ backgroundImage: "var(--gradient-navy)" }}
            >
              {/* Background Image & Overlays */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                  alt="Process execution consultation background"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center opacity-15 mix-blend-luminosity scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/95" />
                <div className="absolute -top-10 -right-10 size-60 rounded-full bg-orange-500/15 blur-3xl pointer-events-none" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-orange-400 flex items-center gap-1.5">
                    <Sparkles className="size-3.5" /> Stage {activeStep + 1} Execution
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white border border-white/15">
                    {activeStep === 0
                      ? "24-48 Hours"
                      : activeStep === 1
                        ? "Days 3 - 7"
                        : activeStep === 2
                          ? "Days 8 - 12"
                          : activeStep === 3
                            ? "Offer Stage"
                            : "Day 30+ Review"}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  {PROCESS[activeStep]!.title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-slate-200">
                  {PROCESS[activeStep]!.body}
                </p>

                <div className="mt-6 rounded-2xl bg-white/10 p-4 border border-white/15">
                  <p className="text-xs font-bold text-orange-400 uppercase tracking-wide">
                    Key Deliverables
                  </p>
                  <ul className="mt-2 grid gap-2 text-xs font-medium text-white">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-orange-400 shrink-0" />
                      <span>
                        {activeStep === 0 && "Job description refinement & salary benchmarking"}
                        {activeStep === 1 && "AI-screened longlist & technical skills verification"}
                        {activeStep === 2 &&
                          "Structured interviewer feedback matrix & cultural fit report"}
                        {activeStep === 3 && "Reference checks & formal offer letter negotiation"}
                        {activeStep === 4 &&
                          "90-day onboarding check-ins & replacement guarantee lock"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 relative z-10">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200 mb-2">
                  <span>Overall Workflow Progress</span>
                  <span className="text-orange-400 font-extrabold">
                    {Math.round(((activeStep + 1) / PROCESS.length) * 100)}%
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/15 border border-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-[width] duration-500 shadow-sm"
                    style={{ width: `${((activeStep + 1) / PROCESS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Industries() {
  return (
    <section id="industries" className="bg-secondary/40 py-20 sm:py-28 relative overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Industries we serve"
          title="Sector-specific hiring"
          highlight="expertise"
          body="Specialized recruitment frameworks and pre-vetted candidate talent pools for key Indian growth sectors."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.label} delay={i * 0.08}>
              <TiltCard className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] hover:border-accent/40 transition-colors">
                <div className="relative h-44 w-full overflow-hidden rounded-2xl mb-5">
                  <img
                    src={ind.img}
                    alt={ind.label}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute top-3 left-3 grid size-10 place-items-center rounded-xl bg-card/90 backdrop-blur-md text-accent border border-border/60 shadow-sm">
                    <ind.icon className="size-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                  {ind.label}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{ind.desc}</p>

                <div className="mt-4 pt-4 border-t border-border/60">
                  <p className="text-[0.7rem] font-extrabold uppercase tracking-wider text-accent mb-2">
                    Key Roles Sourced
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {ind.roles.map((r) => (
                      <span
                        key={r}
                        className="rounded-lg bg-secondary px-2.5 py-1 text-[0.7rem] font-semibold text-primary/80"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
