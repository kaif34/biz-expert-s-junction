import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { Footer } from "@/components/site/Contact";
import { Logo } from "@/components/site/Logo";

const CLAUSES = [
  {
    title: "Scope of engagement",
    body: "Services are provided against a written requirement confirming role, location, compensation band and timelines. Any change in scope is agreed in writing before sourcing continues.",
  },
  {
    title: "Fees & invoicing",
    body: "Recruitment fees are a percentage of the candidate's annual fixed CTC, invoiced on the candidate's date of joining, with payment due within the agreed credit period.",
  },
  {
    title: "Replacement assurance",
    body: "If a placed candidate exits within the agreed replacement window, we source a like-for-like replacement at no additional professional fee, subject to the original mandate remaining open.",
  },
  {
    title: "Candidate ownership",
    body: "Profiles shared remain attributable to Biz Expert's Junction for the duration stated in the mandate, including hires made into associated group entities.",
  },
  {
    title: "Confidentiality & data",
    body: "Client information, compensation data and candidate records are handled confidentially and used solely for the purpose of the mandate.",
  },
  {
    title: "Compliance",
    body: "For contractual and payroll engagements, statutory obligations including PF, ESIC and professional tax are administered as per applicable Indian labour law.",
  },
];

export function TermsPage() {
  return (
    <>
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <Link to="/" aria-label="Biz Expert's Junction — home">
            <Logo />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-accent/60 hover:text-accent"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back home
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          These terms govern recruitment, staffing and payroll engagements with Biz Expert&rsquo;s
          Junction. Specific commercial terms are confirmed in the signed mandate for each client.
        </p>

        <ol className="mt-12 grid gap-4">
          {CLAUSES.map((c, i) => (
            <li
              key={c.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-bold text-accent">
                  {i + 1}
                </span>
                <h2 className="text-lg font-bold tracking-tight text-primary">{c.title}</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </li>
          ))}
        </ol>
      </main>

      <Footer />
    </>
  );
}
