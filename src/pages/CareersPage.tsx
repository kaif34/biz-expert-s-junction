import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Coins,
  Filter,
  Heart,
  HelpCircle,
  IndianRupee,
  MapPin,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Upload,
  UserCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

import { Footer } from "@/components/site/Contact";
import { CursorGlow } from "@/components/site/CursorGlow";
import { Navbar } from "@/components/site/Navbar";
import { CAREER_BENEFITS, CAREER_FAQS, CAREER_JOBS, JobOpening } from "@/components/site/data";
import { cn } from "@/lib/utils";

const DEPARTMENTS = [
  "All Departments",
  "IT & Software",
  "SAP & Enterprise Solutions",
  "Non-IT & Operations",
  "Healthcare & Life Sciences",
  "Sales & Business Development",
  "HR & Talent Acquisition",
];

const DEPT_SHORT: Record<string, string> = {
  "All Departments": "All",
  "IT & Software": "IT & Dev",
  "SAP & Enterprise Solutions": "SAP",
  "Non-IT & Operations": "Operations",
  "Healthcare & Life Sciences": "Healthcare",
  "Sales & Business Development": "Sales & BD",
  "HR & Talent Acquisition": "HR & Payroll",
};

const BENEFIT_ICONS: Record<string, React.ElementType> = {
  TrendingUp,
  Coins,
  Building: Building2,
  Sparkles,
  ShieldCheck,
  Heart,
};

const TYPE_COLORS: Record<string, string> = {
  "Full-time": "bg-emerald-50 text-emerald-700 border-emerald-200",
  Hybrid: "bg-blue-50 text-blue-700 border-blue-200",
  Remote: "bg-purple-50 text-purple-700 border-purple-200",
  Contract: "bg-amber-50 text-amber-700 border-amber-200",
};

export function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    currentCtc: "",
    expectedCtc: "",
    noticePeriod: "",
    message: "",
    fileName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [talentData, setTalentData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    fileName: "",
  });
  const [isTalentSubmitting, setIsTalentSubmitting] = useState(false);

  const filteredJobs = CAREER_JOBS.filter((job) => {
    const matchesDept =
      selectedDept === "All Departments" ||
      job.department.toLowerCase() === selectedDept.toLowerCase();
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleOpenApply = (job: JobOpening) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsApplyModalOpen(false);
      toast.success(`Application submitted for ${selectedJob?.title}! We'll reach out within 24-48 hrs.`);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        experience: "",
        currentCtc: "",
        expectedCtc: "",
        noticePeriod: "",
        message: "",
        fileName: "",
      });
    }, 1200);
  };

  const handleTalentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!talentData.name || !talentData.email || !talentData.phone) {
      toast.error("Please provide your name, email and phone number.");
      return;
    }
    setIsTalentSubmitting(true);
    setTimeout(() => {
      setIsTalentSubmitting(false);
      toast.success("Added to Talent Network! We'll match your profile with upcoming openings.");
      setTalentData({ name: "", email: "", phone: "", role: "", fileName: "" });
    }, 1200);
  };

  return (
    <>
      <CursorGlow />
      <Navbar />

      <main className="pt-24 sm:pt-28 overflow-x-hidden">

        {/* ─── HERO ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[var(--gradient-hero)] pb-20 pt-14 sm:pb-28 sm:pt-20">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -right-32 -top-32 size-[520px] rounded-full bg-accent/8 blur-[100px]" />
          <div className="pointer-events-none absolute -left-24 bottom-0 size-[400px] rounded-full bg-accent/6 blur-[90px]" />

          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-white/70 px-4 py-1.5 text-[0.7rem] font-extrabold uppercase tracking-[0.15em] text-accent shadow-sm backdrop-blur-sm">
                <Sparkles className="size-3.5 animate-pulse" />
                Join the Biz Expert's Junction Team
              </div>

              {/* Headline */}
              <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                Build Your Career in{" "}
                <span
                  className="relative inline-block"
                  style={{
                    background: "var(--gradient-brand)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Talent & Executive Search
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed">
                Shape the future of workforce recruitment across India. Competitive compensation, uncapped incentives, hybrid work & a high-growth environment at Gujarat's premier staffing agency.
              </p>

              {/* CTA row */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#openings"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white shadow-[var(--shadow-brand)] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  View Open Roles <ArrowRight className="size-4" />
                </a>
                <a
                  href="#talent-pool"
                  className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/80 px-6 py-3 text-sm font-bold text-primary backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:bg-white"
                >
                  Drop Your Resume
                </a>
              </div>
            </motion.div>

            {/* Stat pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {[
                { icon: Briefcase, label: "Open Roles", val: `${CAREER_JOBS.length}+` },
                { icon: Zap, label: "HR Review Time", val: "24–48 hrs" },
                { icon: TrendingUp, label: "Appraisal Cycle", val: "Bi-Annual" },
                { icon: Building2, label: "Work Mode", val: "Hybrid & Flex" },
              ].map(({ icon: Icon, label, val }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-border/60 bg-white/80 px-4 py-4 shadow-sm backdrop-blur-sm"
                >
                  <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-accent">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                    <p className="text-lg font-extrabold leading-tight text-primary">{val}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── OPEN ROLES ───────────────────────────────────── */}
        <section id="openings" className="py-16 sm:py-24 bg-background">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">

            {/* Section header */}
            <div className="mb-10 flex flex-col gap-2">
              <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-accent">
                Active Opportunities
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                Explore open roles <span className="text-accent">&amp; apply today</span>
              </h2>
            </div>

            {/* Search + Filters */}
            <div className="mb-8 rounded-2xl border border-border/70 bg-card p-3 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by job title, skill, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-9 text-sm text-primary placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}
                </div>

                {/* Department pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                  <Filter className="size-3.5 shrink-0 text-accent hidden sm:block" />
                  {DEPARTMENTS.map((dept) => (
                    <button
                      key={dept}
                      type="button"
                      onClick={() => setSelectedDept(dept)}
                      className={cn(
                        "shrink-0 rounded-full border px-3 py-1.5 text-[0.7rem] font-bold whitespace-nowrap transition-all duration-200",
                        selectedDept === dept
                          ? "border-accent bg-accent text-white shadow-sm"
                          : "border-border/60 bg-secondary/50 text-muted-foreground hover:border-accent/40 hover:text-primary",
                      )}
                    >
                      {DEPT_SHORT[dept]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Job Grid */}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filteredJobs.map((job) => (
                  <motion.article
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() => setHoveredCard(job.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={cn(
                      "group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card transition-all duration-300",
                      hoveredCard === job.id
                        ? "border-accent/50 shadow-[var(--shadow-lift)] -translate-y-1"
                        : "border-border/70 shadow-sm",
                    )}
                  >
                    {/* Top accent bar */}
                    <div
                      className={cn(
                        "absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transition-opacity duration-300",
                        hoveredCard === job.id ? "opacity-100" : "opacity-0",
                      )}
                    />

                    <div className="p-6">
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-[0.65rem] font-bold text-accent border border-accent/15">
                          {job.department}
                        </span>
                        <span className="flex shrink-0 items-center gap-1 text-[0.65rem] text-muted-foreground">
                          <Clock className="size-3" /> {job.postedDate}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-extrabold leading-snug text-primary group-hover:text-accent transition-colors duration-200">
                        {job.title}
                      </h3>

                      {/* Meta info */}
                      <div className="mt-3 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="size-3.5 shrink-0 text-accent/70" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Briefcase className="size-3.5 shrink-0 text-accent/70" />
                          <span>{job.experience}</span>
                          <span className={cn("ml-1 rounded-md border px-1.5 py-0.5 text-[0.6rem] font-bold", TYPE_COLORS[job.type] ?? "bg-secondary text-primary border-border")}>
                            {job.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-primary">
                          <IndianRupee className="size-3.5 shrink-0 text-accent/70" />
                          <span>{job.salary}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-3.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {job.description}
                      </p>

                      {/* Skills */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {job.skills.slice(0, 3).map((sk) => (
                          <span
                            key={sk}
                            className="rounded-md bg-secondary/70 px-2 py-0.5 text-[0.65rem] font-semibold text-primary/80"
                          >
                            {sk}
                          </span>
                        ))}
                        {job.skills.length > 3 && (
                          <span className="rounded-md bg-secondary/40 px-2 py-0.5 text-[0.65rem] text-muted-foreground">
                            +{job.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="border-t border-border/50 p-4">
                      <button
                        type="button"
                        onClick={() => handleOpenApply(job)}
                        className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-all duration-300 hover:bg-accent"
                      >
                        <span>View Details &amp; Apply</span>
                        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                      </button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty state */}
            {filteredJobs.length === 0 && (
              <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-border bg-card py-16 text-center">
                <Search className="size-10 text-muted-foreground/40" />
                <h3 className="mt-3 text-sm font-bold text-primary">No matching roles found</h3>
                <p className="mt-1 text-xs text-muted-foreground">Try a different search term or department filter</p>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(""); setSelectedDept("All Departments"); }}
                  className="mt-4 rounded-full border border-border px-4 py-1.5 text-xs font-bold text-primary hover:bg-secondary"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ─── BENEFITS ─────────────────────────────────────── */}
        <section className="relative overflow-hidden border-t border-border/50 bg-card py-16 sm:py-24">
          <div className="pointer-events-none absolute -right-40 -top-40 size-[500px] rounded-full bg-accent/5 blur-[90px]" />

          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="mb-10 flex flex-col gap-2">
              <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-accent">
                Company Culture & Perks
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                Why top talent <span className="text-accent">thrives here</span>
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {CAREER_BENEFITS.map((ben, i) => {
                const Icon = BENEFIT_ICONS[ben.icon] ?? Sparkles;
                return (
                  <motion.div
                    key={ben.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.45 }}
                    className="group relative overflow-hidden rounded-2xl border border-border/70 bg-background p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-[var(--shadow-lift)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 transition-all duration-500 group-hover:from-accent/3 group-hover:to-accent/0" />
                    <div className="relative">
                      <div className="mb-4 inline-grid size-11 place-items-center rounded-xl bg-brand-soft text-accent ring-1 ring-accent/15 transition-all duration-300 group-hover:[background-image:var(--gradient-brand)] group-hover:text-white group-hover:ring-0">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="text-sm font-extrabold text-primary">{ben.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{ben.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── TALENT POOL ──────────────────────────────────── */}
        <section id="talent-pool" className="border-t border-border/50 bg-background py-16 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-card to-brand-soft/30 shadow-[var(--shadow-soft)]">
              <div className="grid lg:grid-cols-2">
                {/* Left content */}
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <div className="w-fit">
                    <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-brand-soft px-3.5 py-1 text-[0.7rem] font-extrabold uppercase tracking-widest text-accent">
                      <UserCheck className="size-3.5" /> Talent Network
                    </span>
                  </div>
                  <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl lg:text-4xl">
                    No matching role right now?
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    We're constantly expanding across IT, SAP, Executive Search & Manufacturing. Drop your CV — our hiring managers will reach out when the right position opens.
                  </p>

                  <ul className="mt-8 space-y-3.5">
                    {[
                      "Direct review by Biz Expert's Junction HR leads",
                      "Priority matching for future internal openings",
                      "100% confidential resume handling & data privacy",
                    ].map((pt) => (
                      <li key={pt} className="flex items-center gap-3 text-xs font-medium text-primary/80">
                        <CheckCircle2 className="size-4 shrink-0 text-accent" />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  {/* Decorative avatars */}
                  <div className="mt-10 flex items-center gap-3">
                    <div className="flex -space-x-2.5">
                      {["bg-blue-400", "bg-purple-400", "bg-emerald-400", "bg-amber-400"].map((c, i) => (
                        <div key={i} className={cn("size-8 rounded-full border-2 border-white", c)} />
                      ))}
                    </div>
                    <p className="text-[0.7rem] font-semibold text-muted-foreground">
                      500+ professionals in our talent network
                    </p>
                  </div>
                </div>

                {/* Right form */}
                <div className="border-t border-accent/10 bg-card/60 p-8 sm:p-12 lg:border-l lg:border-t-0">
                  <form onSubmit={handleTalentSubmit} className="space-y-5">
                    <h3 className="text-lg font-extrabold text-primary mb-2">Drop Your Resume</h3>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-primary">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={talentData.name}
                        onChange={(e) => setTalentData({ ...talentData, name: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-primary placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-primary">Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={talentData.email}
                          onChange={(e) => setTalentData({ ...talentData, email: e.target.value })}
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-primary placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-primary">Phone *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98980 00000"
                          value={talentData.phone}
                          onChange={(e) => setTalentData({ ...talentData, phone: e.target.value })}
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-primary placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-primary">Target Role / Domain</label>
                      <input
                        type="text"
                        placeholder="e.g. IT Recruiter, SAP Consultant, HR Manager"
                        value={talentData.role}
                        onChange={(e) => setTalentData({ ...talentData, role: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-primary placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
                      />
                    </div>

                    {/* File upload */}
                    <label className="block cursor-pointer pt-1">
                      <span className="mb-2 block text-xs font-bold text-primary">Resume (PDF / DOCX)</span>
                      <div className="flex flex-col items-center justify-center gap-2.5 rounded-xl border border-dashed border-border bg-secondary/30 px-4 py-8 text-center transition-colors hover:border-accent/50 hover:bg-brand-soft/30">
                        <Upload className="size-6 text-accent mb-1" />
                        <span className="text-sm font-bold text-primary">
                          {talentData.fileName || "Click to upload CV"}
                        </span>
                        <span className="text-[0.7rem] text-muted-foreground">Maximum file size: 5MB</span>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) setTalentData({ ...talentData, fileName: f.name });
                        }}
                      />
                    </label>

                    <button
                      type="submit"
                      disabled={isTalentSubmitting}
                      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-extrabold text-white shadow-[var(--shadow-brand)] transition-all hover:bg-accent/90 disabled:opacity-50"
                    >
                      <Send className="size-4" />
                      {isTalentSubmitting ? "Submitting…" : "Submit to Talent Network"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ ──────────────────────────────────────────── */}
        <section className="border-t border-border/50 bg-card py-16 sm:py-24">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
            <div className="mb-10 flex flex-col gap-2 text-center">
              <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-accent">
                Candidate Guidance
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {CAREER_FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={cn(
                      "overflow-hidden rounded-2xl border transition-colors duration-200",
                      isOpen ? "border-accent/40 bg-brand-soft/20" : "border-border/70 bg-background",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn("mt-0.5 grid size-6 shrink-0 place-items-center rounded-md transition-colors", isOpen ? "bg-accent text-white" : "bg-brand-soft text-accent")}>
                          <HelpCircle className="size-3.5" />
                        </div>
                        <span className="text-sm font-bold text-primary">{faq.q}</span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="size-4 shrink-0 text-accent" />
                      ) : (
                        <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="border-t border-accent/15 px-5 py-4 pl-14 text-xs leading-relaxed text-muted-foreground">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ─── APPLICATION MODAL ────────────────────────────── */}
      <AnimatePresence>
        {isApplyModalOpen && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/30 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card shadow-[var(--shadow-lift)]"
            >
              {/* Modal header */}
              <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-border/60 bg-card/95 p-6 backdrop-blur-md">
                <div>
                  <span className="inline-block rounded-full bg-brand-soft px-2.5 py-0.5 text-[0.65rem] font-bold text-accent">
                    {selectedJob.department}
                  </span>
                  <h2 className="mt-1.5 text-lg font-extrabold text-primary sm:text-xl">
                    {selectedJob.title}
                  </h2>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[0.7rem] text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="size-3 text-accent" />{selectedJob.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="size-3 text-accent" />{selectedJob.type} · {selectedJob.experience}</span>
                    <span className="flex items-center gap-1 font-bold text-primary"><IndianRupee className="size-3 text-accent" />{selectedJob.salary}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="mt-0.5 shrink-0 rounded-xl border border-border p-2 text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="p-6">
                {/* Job details */}
                <div className="space-y-4 text-xs text-muted-foreground">
                  <div>
                    <h4 className="mb-1.5 text-[0.65rem] font-extrabold uppercase tracking-widest text-primary">Role Overview</h4>
                    <p className="leading-relaxed">{selectedJob.description}</p>
                  </div>
                  <div>
                    <h4 className="mb-1.5 text-[0.65rem] font-extrabold uppercase tracking-widest text-primary">Key Responsibilities</h4>
                    <ul className="space-y-1.5">
                      {selectedJob.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-accent" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-1.5 text-[0.65rem] font-extrabold uppercase tracking-widest text-primary">Requirements</h4>
                    <ul className="space-y-1.5">
                      {selectedJob.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-accent" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Application form */}
                <form onSubmit={handleApplySubmit} className="mt-6 space-y-4 border-t border-border/60 pt-6">
                  <h3 className="text-sm font-extrabold text-primary">Submit Your Application</h3>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-primary">Full Name *</label>
                      <input type="text" required placeholder="e.g. Anjali Verma" value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold text-primary">Email Address *</label>
                      <input type="email" required placeholder="anjali@example.com" value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-primary">Phone *</label>
                      <input type="tel" required placeholder="+91 90000 00000" value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold text-primary">Experience</label>
                      <input type="text" placeholder="e.g. 4 Years" value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold text-primary">Notice Period</label>
                      <input type="text" placeholder="e.g. Immediate / 30 Days" value={formData.noticePeriod}
                        onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition" />
                    </div>
                  </div>

                  {/* File upload */}
                  <label className="block cursor-pointer">
                    <span className="mb-1 block text-xs font-bold text-primary">Upload CV / Resume</span>
                    <div className="flex items-center gap-3 rounded-xl border border-dashed border-border/70 bg-secondary/30 px-4 py-3 transition-colors hover:border-accent/50 hover:bg-brand-soft/20">
                      <Upload className="size-4 text-accent" />
                      <span className="text-xs font-medium text-primary">{formData.fileName || "Choose PDF or DOCX file"}</span>
                    </div>
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) setFormData({ ...formData, fileName: f.name });
                      }} />
                  </label>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-primary">Cover Note</label>
                    <textarea rows={2} placeholder="Tell us why you're a great fit…" value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background p-3 text-xs text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition" />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-1">
                    <button type="button" onClick={() => setIsApplyModalOpen(false)}
                      className="rounded-xl border border-border px-4 py-2 text-xs font-bold text-muted-foreground hover:bg-secondary transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting}
                      className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2 text-xs font-bold text-white shadow-[var(--shadow-brand)] transition-all hover:bg-accent/90 disabled:opacity-50">
                      <Send className="size-3.5" />
                      {isSubmitting ? "Sending…" : "Submit Application"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
