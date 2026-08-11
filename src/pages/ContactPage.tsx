import { Contact, Footer } from "@/components/site/Contact";
import { CursorGlow } from "@/components/site/CursorGlow";
import { Reveal } from "@/components/site/motion-primitives";
import { Navbar } from "@/components/site/Navbar";

export function ContactPage() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main className="pt-24 sm:pt-28">
        <div className="bg-secondary/40 py-12 sm:py-16 border-b border-border/50">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-brand-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                Get In Touch
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-primary sm:text-5xl">
                Let's Build Your <span className="text-gradient">Dream Team</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground">
                Reach out to discuss your immediate hiring mandates or request custom manpower
                proposals from our senior consultants.
              </p>
            </Reveal>
          </div>
        </div>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
