import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Compass,
  FileCheck2,
  Globe2,
  Layers,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Users2,
  Workflow,
} from "lucide-react";

import { BrandLogoSection } from "./CompanyLogos";
import { MagneticButton, Reveal, SectionHeading, TiltCard } from "./motion-primitives";

export function CompanyIntro() {
  return (
    <section className="pb-12 pt-0 sm:pb-20 sm:pt-0 relative overflow-hidden bg-white">
      {/* Top Brand Logo Section matching screenshot */}
      <div className="mb-10 sm:mb-14">
        <BrandLogoSection title="Clients We Served" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        {/* Section 1 Header: Numbered Badge + Studio Intro Title (Matching Image 2) */}
        <Reveal>
          <div className="flex items-center gap-2 mb-6">
            <span className="grid size-7 place-items-center rounded-full bg-slate-900 text-xs font-black text-white">
              1
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-semibold text-slate-800">
              Introducing Biz Expert's Junction
            </span>
          </div>

          <h2 className="max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.12]">
            Strategy-led recruitment, delivering results across India and beyond.
          </h2>
        </Reveal>

        {/* Asymmetric Studio Content Grid (Matching Image 2) */}
        <div className="mt-12 sm:mt-16 grid gap-8 lg:grid-cols-12 items-center">
          {/* Left Column: Image 1 (Laptop Recruiter) */}
          <Reveal delay={0.1} className="lg:col-span-4">
            <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-md aspect-[4/3] lg:aspect-square">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                alt="Recruitment consultant evaluating candidate portfolios on laptop"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </Reveal>

          {/* Middle Column: Text & Orange Pill CTA Button */}
          <Reveal delay={0.2} className="lg:col-span-3 space-y-6">
            <p className="text-base sm:text-lg font-medium leading-relaxed text-slate-600">
              Through research, consultative thinking, and precision screening, we help growing
              brands realize their full human capital potential.
            </p>

            <Link
              to="/about"
              className="group inline-flex items-center gap-3 rounded-full bg-[#EA580C] px-6 py-3.5 text-xs font-extrabold text-white shadow-lg shadow-orange-500/20 hover:bg-[#D97706] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>About our agency</span>
              <span className="grid size-6 place-items-center rounded-full bg-white text-[#EA580C] transition-transform duration-300 group-hover:translate-x-1 shadow-sm">
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
          </Reveal>

          {/* Right Column: Image 2 (Wide Strategy Team) */}
          <Reveal delay={0.3} className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-md aspect-[16/10]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                alt="Recruitment executive consultation around roadmap whiteboard"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </Reveal>
        </div>

        {/* Dedicated Page Gateways Grid */}
        <div className="mt-16">
          <SectionHeading
            eyebrow="Explore Dedicated Sections"
            title="Navigate to Specific Company Information"
            highlight="Details"
            body="Click any module below to dive deep into our services, process, industry track record, and client reviews."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "About Our Firm",
                desc: "Discover our 10+ year trajectory, leadership pillars, and corporate culture.",
                link: "/about",
                icon: Building2,
                badge: "Company Overview",
              },
              {
                title: "Our 6 Services",
                desc: "Permanent Hiring, Contractual Staffing, Executive Search, SAP & Payroll.",
                link: "/services",
                icon: Layers,
                badge: "Hiring Models",
              },
              {
                title: "Mission & Vision",
                desc: "Our core operating values, ethical standards, and long-term vision.",
                link: "/mission-vision",
                icon: Compass,
                badge: "Company Strategy",
              },
              {
                title: "Why Choose Us",
                desc: "10 compelling reasons why leading employers choose our recruitment agency.",
                link: "/why-us",
                icon: ShieldCheck,
                badge: "Value Proposition",
              },
              {
                title: "6-Step Sourcing Process",
                desc: "Our structured candidate evaluation framework for high-precision matching.",
                link: "/process",
                icon: Workflow,
                badge: "Execution Model",
              },
              {
                title: "Industries Sourced",
                desc: "IT, Industrial Manufacturing, Healthcare, Logistics, Finance & Retail.",
                link: "/industries",
                icon: Users2,
                badge: "Domain Expertise",
              },
              {
                title: "Clients & Reviews",
                desc: "Read executive testimonials and view enterprise partners who trust us.",
                link: "/clients",
                icon: Award,
                badge: "Track Record",
              },
              {
                title: "Contact & Sourcing Request",
                desc: "Submit your requirement or speak directly with our Senior Consultants.",
                link: "/contact",
                icon: PhoneCall,
                badge: "Get In Touch",
              },
            ].map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.05}>
                <Link to={item.link as never} className="block group h-full">
                  <TiltCard className="h-full flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:border-accent/50 hover:shadow-md transition-all duration-300">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="grid size-11 place-items-center rounded-xl bg-brand-soft text-accent group-hover:[background-image:var(--gradient-brand)] group-hover:text-primary-foreground transition-all">
                          <item.icon className="size-5" />
                        </div>
                        <span className="rounded-full bg-secondary px-2.5 py-1 text-[0.68rem] font-bold text-accent">
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-primary group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-border/50 flex items-center gap-1.5 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
                      <span>Explore Page</span>
                      <ArrowRight className="size-3.5" />
                    </div>
                  </TiltCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* High Impact Call To Action Banner */}
        <Reveal delay={0.2} className="mt-16">
          <div
            className="relative overflow-hidden rounded-3xl p-8 sm:p-10 text-primary-foreground shadow-2xl border border-primary/20"
            style={{ backgroundImage: "var(--gradient-navy)" }}
          >
            {/* Background Corporate Architecture Image & Overlays */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                alt="Modern corporate headquarters background"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center opacity-25 mix-blend-luminosity scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/90" />
              <div className="absolute top-0 right-0 size-72 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 size-72 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl space-y-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-bold text-accent">
                  <FileCheck2 className="size-3.5" /> Ready To Hire Top Talent?
                </span>
                <h3 className="text-2xl font-black sm:text-3xl tracking-tight text-primary-foreground">
                  Partner with Gujarat's Trusted Recruitment Consultants
                </h3>
                <p className="text-sm text-primary-foreground/80 leading-relaxed">
                  Send us your role requirements or request an exploratory call. Our recruiters
                  deliver screened candidates within 48 to 72 hours.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-xs font-extrabold text-primary-foreground shadow-lg transition-transform hover:scale-105"
                >
                  Submit Sourcing Request <ArrowRight className="size-4" />
                </Link>
                <a
                  href="tel:+919898366447"
                  className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-5 py-3.5 text-xs font-bold text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
                >
                  <PhoneCall className="size-4 text-accent" /> +91 9045766447
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
