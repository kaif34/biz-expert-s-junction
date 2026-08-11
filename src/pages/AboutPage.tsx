import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

import { About, MissionVision } from "@/components/site/About";
import { Contact, Footer } from "@/components/site/Contact";
import { CursorGlow } from "@/components/site/CursorGlow";
import { Reveal, SectionHeading } from "@/components/site/motion-primitives";
import { Navbar } from "@/components/site/Navbar";
import { WhyChooseUs } from "@/components/site/Services";

export function AboutPage() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main className="pt-24 sm:pt-28">
        {/* Unified Hero Banner */}
        <div className="bg-secondary/40 py-12 sm:py-16 border-b border-border/50">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-brand-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                Complete Company Overview
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-primary sm:text-5xl">
                About Us, Our <span className="text-gradient">Mission, Vision</span> &amp; Values
              </h1>
              <p className="mt-4 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                Headquartered in Gujarat with a pan-India sourcing network, Biz Expert's Junction
                brings over a decade of domain expertise connecting high-growth startups and
                established enterprises with top-tier talent.
              </p>

              {/* Quick Jump Pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href="#about"
                  className="rounded-full bg-card px-4 py-1.5 text-xs font-bold text-primary border border-border/80 shadow-sm hover:border-accent/50 hover:text-accent transition-colors"
                >
                  &darr; Our Story &amp; Pillars
                </a>
                <a
                  href="#mission"
                  className="rounded-full bg-card px-4 py-1.5 text-xs font-bold text-primary border border-border/80 shadow-sm hover:border-accent/50 hover:text-accent transition-colors"
                >
                  &darr; Mission &amp; Vision
                </a>
                <a
                  href="#why-us"
                  className="rounded-full bg-card px-4 py-1.5 text-xs font-bold text-primary border border-border/80 shadow-sm hover:border-accent/50 hover:text-accent transition-colors"
                >
                  &darr; Why Choose Us
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Section 1: About Company */}
        <About />

        {/* Section 2: Mission & Vision */}
        <MissionVision />

        {/* Section 3: Why Choose Us */}
        <WhyChooseUs />

        {/* Credentials & SLA Guarantee Section */}
        <section className="bg-card py-16 sm:py-24 border-t border-border/50">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Our Journey &amp; Credentials"
              title="Why leading organizations rely on us"
              highlight="nationwide"
            />

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { stat: "10+ Years", label: "Industry Experience" },
                { stat: "500+", label: "Successful Placements" },
                { stat: "100+", label: "Enterprise & Startup Clients" },
                { stat: "98%", label: "Client Satisfaction & Retention" },
              ].map((item, idx) => (
                <Reveal key={item.label} delay={idx * 0.08}>
                  <div className="rounded-2xl border border-border bg-secondary/30 p-6 text-center">
                    <p className="text-3xl font-black text-accent">{item.stat}</p>
                    <p className="mt-2 text-sm font-semibold text-primary">{item.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 rounded-3xl border border-border bg-secondary/40 p-8">
              <h3 className="text-xl font-bold text-primary">Core Operational Pillars</h3>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  "Comprehensive candidate background verification & credential auditing",
                  "Dedicated relationship managers for seamless communication",
                  "Custom SLA guarantees with fast replacement options",
                  "Pan-India network covering metro cities and industrial hubs",
                  "Strict compliance with Indian statutory payroll & labor laws",
                  "Specialized recruiters for engineering, SAP, operations & CXO leadership",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-primary font-medium">
                  Ready to discuss your hiring plan with our consultants?
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                >
                  Contact Our Team <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
