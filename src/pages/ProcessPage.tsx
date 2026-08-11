import { Clients } from "@/components/site/Clients";
import { Contact, Footer } from "@/components/site/Contact";
import { CursorGlow } from "@/components/site/CursorGlow";
import { Reveal } from "@/components/site/motion-primitives";
import { Navbar } from "@/components/site/Navbar";
import { Industries, Process } from "@/components/site/Process";

export function ProcessPage() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main className="pt-24 sm:pt-28">
        {/* Header */}
        <div className="bg-secondary/40 py-12 sm:py-16 border-b border-border/50">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-brand-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                Explore Execution &amp; Impact
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-primary sm:text-5xl">
                Our Process, <span className="text-gradient">Industries</span> &amp; Clients
              </h1>
              <p className="mt-4 max-w-3xl text-base sm:text-lg text-muted-foreground">
                Discover our structured 6-step candidate sourcing methodology, vertical domain
                expertise across key Indian sectors, and client success stories.
              </p>

              {/* Quick Jump Pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href="#process"
                  className="rounded-full bg-card px-4 py-1.5 text-xs font-bold text-primary border border-border/80 shadow-sm hover:border-accent/50 hover:text-accent transition-colors"
                >
                  &darr; 6-Step Process
                </a>
                <a
                  href="#industries"
                  className="rounded-full bg-card px-4 py-1.5 text-xs font-bold text-primary border border-border/80 shadow-sm hover:border-accent/50 hover:text-accent transition-colors"
                >
                  &darr; Industries Served
                </a>
                <a
                  href="#clients"
                  className="rounded-full bg-card px-4 py-1.5 text-xs font-bold text-primary border border-border/80 shadow-sm hover:border-accent/50 hover:text-accent transition-colors"
                >
                  &darr; Clients &amp; Testimonials
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Section 1: Process */}
        <Process />

        {/* Section 2: Industries */}
        <Industries />

        {/* Section 3: Clients & Reviews */}
        <Clients />

        <Contact />
      </main>
      <Footer />
    </>
  );
}

export { ProcessPage as ClientsPage, ProcessPage as IndustriesPage };
