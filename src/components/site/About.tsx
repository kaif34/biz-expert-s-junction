import { Compass, Target } from "lucide-react";
import { motion } from "motion/react";

import { VALUES } from "./data";
import { Reveal, SectionHeading, TiltCard } from "./motion-primitives";

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="About the company"
          title="A recruitment partner built on"
          highlight="precision"
          body="Biz Expert's Junction is a leading recruitment consultancy firm based in Gujarat, India. Specializing in permanent hiring, bulk recruitment, and contractual staffing nationwide."
        />

        {/* Visual Showcase Banner */}
        <Reveal delay={0.1} className="mt-12">
          <div className="grid gap-6 lg:grid-cols-12 items-center rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-[var(--shadow-soft)] overflow-hidden relative">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-accent">
                10+ Years of Operational Excellence
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                Bridging Gujarat's Industrial Hubs with Pan-India Talent Networks
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Headquartered in Gujarat, we serve as the talent backbone for manufacturing plants,
                IT software houses, logistics hubs, and financial institutions across India. Our
                consultants bring deep industry domain insight to evaluate candidates beyond resume
                keywords.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-secondary/70 p-4 border border-border/50">
                  <p className="text-2xl font-black text-accent">100+</p>
                  <p className="text-xs font-bold text-primary mt-1">
                    Corporate &amp; Enterprise Partners
                  </p>
                </div>
                <div className="rounded-2xl bg-secondary/70 p-4 border border-border/50">
                  <p className="text-2xl font-black text-accent">98%</p>
                  <p className="text-xs font-bold text-primary mt-1">Client Retention Rate</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-border/60 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                alt="Biz Expert's Junction recruitment team in strategy discussion"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs font-bold text-primary-foreground bg-primary/80 backdrop-blur-md px-3 py-1.5 rounded-xl inline-block">
                  Dedicated Recruitment Consultants
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <TiltCard className="group h-full rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
                <div className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-accent transition-colors duration-300 group-hover:[background-image:var(--gradient-brand)] group-hover:text-primary-foreground">
                  <v.icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-primary">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-6">
          <div className="grid gap-6 rounded-3xl border border-border bg-secondary/60 p-8 sm:grid-cols-3">
            {[
              ["End-to-end manpower", "Requirement scoping through post-joining support."],
              ["Startups to enterprise", "Delivery models that scale with your headcount plan."],
              ["Pan-India reach", "Sourcing networks across every major hiring hub."],
            ].map(([title, body]) => (
              <div key={title}>
                <p className="text-sm font-bold uppercase tracking-wide text-accent">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const CARDS = [
  {
    icon: Target,
    label: "Mission",
    body: "Connect businesses with top-tier talent by understanding unique needs, identifying best-fit candidates and delivering expert recruitment solutions that fuel growth, innovation and success.",
    points: ["Understand the need", "Identify best fit", "Fuel growth"],
  },
  {
    icon: Compass,
    label: "Vision",
    body: "Become the leading global recruitment partner, recognized for innovation and integrity, and for transforming talent acquisition into a strategic advantage for our clients.",
    points: ["Global partner", "Innovation & integrity", "Strategic advantage"],
  },
];

export function MissionVision() {
  return (
    <section
      id="mission"
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ backgroundImage: "var(--gradient-navy)" }}
    >
      {/* Background Corporate Image & Layered Dark Overlays */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
          alt="Modern corporate office architecture background"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center opacity-20 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/95" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[36rem] rounded-full bg-orange-500/10 blur-[130px] pointer-events-none" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 z-10">
        <SectionHeading
          tone="dark"
          eyebrow="Mission & Vision"
          title="We don't just fill roles — we fuel your"
          highlight="growth"
          body="Delivering exceptional candidates that align with your vision, values and long-term goals."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {CARDS.map((c, i) => (
            <motion.article
              key={c.label}
              initial={{ opacity: 0, rotateY: i === 0 ? -12 : 12, y: 30 }}
              whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="glass-dark group rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1.5"
            >
              <div className="flex items-center gap-4">
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/20">
                  <c.icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight text-white">{c.label}</h3>
              </div>
              <p className="mt-5 text-base leading-relaxed text-slate-200">{c.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {c.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:border-orange-400 hover:text-orange-300"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
