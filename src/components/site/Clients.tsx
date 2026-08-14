import { Star, Quote } from "lucide-react";

import { TESTIMONIALS } from "./data";
import { BrandLogoSection } from "./CompanyLogos";
import { Reveal, SectionHeading, TiltCard } from "./motion-primitives";

export function Clients() {
  return (
    <section id="clients" className="overflow-hidden py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Clients & Testimonials"
          title="Trusted by teams that hire at"
          highlight="scale"
          body="Read what industry executives and HR leaders say about partnering with Biz Expert's Junction."
        />

        {/* Testimonials Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.1}>
              <TiltCard className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] hover:border-accent/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: item.rating }).map((_, idx) => (
                        <Star key={idx} className="size-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="size-6 text-accent/30 group-hover:text-accent/60 transition-colors" />
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 pt-4 border-t border-border/60">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="size-11 rounded-full object-cover border border-accent/30 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-xs font-extrabold text-primary">{item.name}</p>
                    <p className="text-[0.7rem] font-semibold text-accent">{item.title}</p>
                    <p className="text-[0.65rem] text-muted-foreground">{item.company}</p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Marquee Banner with Authentic Company Logo Images */}
      <div className="mt-16">
        <BrandLogoSection title="ORGANIZATIONS OUR CONSULTANTS HAVE DELIVERED MANDATES FOR" />
      </div>
    </section>
  );
}
