import { CompanyIntro } from "@/components/site/CompanyIntro";
import { Footer } from "@/components/site/Contact";
import { CursorGlow } from "@/components/site/CursorGlow";
import { Hero } from "@/components/site/Hero";
import { Navbar } from "@/components/site/Navbar";
import { Preloader } from "@/components/site/Preloader";

export function IndexPage() {
  return (
    <>
      <Preloader />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <CompanyIntro />
      </main>
      <Footer />
    </>
  );
}
