import { Link } from "react-router-dom";
import { AtSign, Globe, Instagram, Mail, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { sendContactInquiryEmails } from "@/lib/mailer";

import { NAV_LINKS, SERVICE_OPTIONS } from "./data";
import { Logo } from "./Logo";
import { MagneticButton, Reveal, SectionHeading } from "./motion-primitives";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  company: z.string().trim().min(2, "Please enter your company name").max(120),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,18}$/, "Enter a valid phone number"),
  service: z.string().min(1, "Select the service you need"),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(1000),
});

type FormValues = z.infer<typeof schema>;
const EMPTY: FormValues = { name: "", company: "", email: "", phone: "", service: "", message: "" };
const DRAFT_KEY = "bej:contact-draft";

export function Contact() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  // Persist form input across reloads.
  useEffect(() => {
    const raw = window.sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return;
    try {
      setValues({ ...EMPTY, ...(JSON.parse(raw) as Partial<FormValues>) });
    } catch {
      window.sessionStorage.removeItem(DRAFT_KEY);
    }
  }, []);

  const set = (key: keyof FormValues, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(next));
      return next;
    });
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof FormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormValues;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSubmitting(true);
    try {
      // 1. Save inquiry into Firestore
      await addDoc(collection(db, "inquiries"), {
        ...values,
        createdAt: serverTimestamp(),
        status: "new"
      });

      // 2. Fire-and-forget: send emails in background, don't block form reset
      sendContactInquiryEmails(values)
        .catch((err) => console.error("[Mailer] Contact email failed:", err));

      setValues(EMPTY);
      window.sessionStorage.removeItem(DRAFT_KEY);
      toast.success("Thank you! We've received your inquiry and will be in touch within one business day.");
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast.error("Failed to send message. Please try again or email us directly at info@bizexpertsjunction.com.");
    } finally {
      setSubmitting(false);
    }
  };

  const field =
    "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-primary outline-none transition-colors duration-200 placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/25";

  return (
    <section id="contact" className="bg-secondary/60 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Connect with us"
          title="Looking for top talent? Let&rsquo;s"
          highlight="connect"
          body="Share your requirement and we'll come back with a sourcing plan and indicative timelines."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <form
              onSubmit={onSubmit}
              noValidate
              aria-label="Talent request form"
              className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" error={errors.name} htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    className={cn(field, errors.name && "border-destructive")}
                    placeholder="Riya Sharma"
                    value={values.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={!!errors.name}
                  />
                </Field>
                <Field label="Company name" error={errors.company} htmlFor="company">
                  <input
                    id="company"
                    name="company"
                    className={cn(field, errors.company && "border-destructive")}
                    placeholder="Acme Industries Pvt Ltd"
                    value={values.company}
                    onChange={(e) => set("company", e.target.value)}
                    aria-invalid={!!errors.company}
                  />
                </Field>
                <Field label="Work email" error={errors.email} htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={cn(field, errors.email && "border-destructive")}
                    placeholder="you@company.com"
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={!!errors.email}
                  />
                </Field>
                <Field label="Phone number" error={errors.phone} htmlFor="phone">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={cn(field, errors.phone && "border-destructive")}
                    placeholder="+91 98765 43210"
                    value={values.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    aria-invalid={!!errors.phone}
                  />
                </Field>
                <Field
                  label="Service needed"
                  error={errors.service}
                  htmlFor="service"
                  className="sm:col-span-2"
                >
                  <select
                    id="service"
                    name="service"
                    className={cn(field, errors.service && "border-destructive")}
                    value={values.service}
                    onChange={(e) => set("service", e.target.value)}
                    aria-invalid={!!errors.service}
                  >
                    <option value="">Select a service…</option>
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="Your requirement"
                  error={errors.message}
                  htmlFor="message"
                  className="sm:col-span-2"
                >
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={cn(field, "resize-y", errors.message && "border-destructive")}
                    placeholder="Roles, locations, headcount and timelines…"
                    value={values.message}
                    onChange={(e) => set("message", e.target.value)}
                    aria-invalid={!!errors.message}
                  />
                </Field>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <MagneticButton type="submit" className="px-7 py-3.5">
                  {submitting ? "Sending…" : "Send Request"}
                  <Send className="size-4" aria-hidden="true" />
                </MagneticButton>
                <p className="text-xs text-muted-foreground">
                  Your draft is saved automatically while you type.
                </p>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="relative overflow-hidden flex h-full flex-col justify-between gap-8 rounded-3xl p-8"
              style={{ backgroundImage: "var(--gradient-navy)" }}
            >
              {/* Background Image & Overlay */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                  alt="Corporate contact background"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center opacity-20 mix-blend-luminosity scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/95" />
                <div className="absolute top-0 right-0 size-60 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
              </div>

              <div className="relative z-10">
                <Logo onDark className="h-9" />
                <p className="mt-6 text-sm leading-relaxed text-slate-200 font-medium">
                  Beyond recruitment — crafting teams that drive results. Reach us on any channel
                  below.
                </p>
              </div>

              <ul className="grid gap-3 relative z-10">
                <ContactRow
                  icon={Mail}
                  label="hr@bizexpertsjunction.com"
                  href="mailto:hr@bizexpertsjunction.com"
                />
                <ContactRow
                  icon={Mail}
                  label="business@bizexpertsjunction.com"
                  href="mailto:business@bizexpertsjunction.com"
                />
                <ContactRow icon={Phone} label="+91 9045766447" href="tel:+919898366447" />
                <ContactRow
                  icon={Globe}
                  label="www.bizexpertsjunction.com"
                  href="https://www.bizexpertsjunction.com"
                />
                <ContactRow
                  icon={Instagram}
                  label="@bizexpertsjunction"
                  href="https://instagram.com/bizexpertsjunction"
                />
              </ul>

              <p className="relative z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-400">
                <AtSign className="size-4 shrink-0" aria-hidden="true" />
                Gujarat, India · Serving pan-India
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-bold uppercase tracking-wide text-primary/70"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
}) {
  return (
    <li>
      <a
        href={href}
        className="group flex items-center gap-3.5 rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:border-orange-400/80 hover:shadow-md hover:scale-[1.01]"
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
          <Icon className="size-4 shrink-0" aria-hidden="true" />
        </div>
        <span className="truncate text-white font-medium">{label}</span>
      </a>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Providing tailored manpower solutions across India — permanent hiring, bulk recruitment,
            contractual staffing, executive search, payroll and SAP hiring.
          </p>
        </div>

        <nav aria-label="Quick links">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Quick links</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <Link
                  to={l.path}
                  className="text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Reach us</h2>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
            <li>
              <a
                className="transition-colors hover:text-accent"
                href="mailto:hr@bizexpertsjunction.com"
              >
                hr@bizexpertsjunction.com
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-accent" href="tel:+919898366447">
                +91 9045766447
              </a>
            </li>
            <li>
              <a
                className="transition-colors hover:text-accent"
                href="https://www.bizexpertsjunction.com"
              >
                www.bizexpertsjunction.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Biz Expert&rsquo;s Junction. All rights reserved.</p>
          <Link to="/terms" className="font-semibold transition-colors hover:text-accent">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
