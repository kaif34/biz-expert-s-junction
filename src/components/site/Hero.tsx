import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  const navigateToContact = () => {
    window.location.href = "/contact";
  };

  const navigateToAbout = () => {
    window.location.href = "/about";
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 min-h-[85vh] flex flex-col justify-center bg-slate-50"
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          alt="Corporate City Skyline"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center opacity-75 sm:opacity-85 contrast-[1.05]"
        />
        {/* Soft directional gradient overlays for crisp readability on left and vivid background on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/65 to-white/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/50" />

        {/* Top-Left Blue/White Diamond Dot Grid Pattern */}
        <div
          className="absolute top-4 left-4 sm:top-8 sm:left-8 w-44 sm:w-64 h-44 sm:h-64 opacity-60 mix-blend-multiply pointer-events-none bg-[radial-gradient(#38bdf8_2px,transparent_2px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_top_left,black_40%,transparent_80%)]"
          aria-hidden="true"
        />

        {/* Top-Right Orange/Amber Diamond Dot Grid Pattern */}
        <div
          className="absolute top-4 right-4 sm:top-8 sm:right-8 w-44 sm:w-64 h-44 sm:h-64 opacity-70 pointer-events-none bg-[radial-gradient(#f97316_2px,transparent_2px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_top_right,black_40%,transparent_80%)]"
          aria-hidden="true"
        />

        {/* Bottom Decorative Vector Rings */}
        <div className="absolute -bottom-16 -left-16 size-64 sm:size-80 rounded-full border border-orange-500/20 pointer-events-none" />
        <div className="absolute -bottom-24 -right-16 size-80 sm:size-[26rem] rounded-full border border-orange-500/25 pointer-events-none" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10 z-10 my-auto">
        {/* Eyebrow Studio Tag */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-primary/70">
            Biz Expert's Junction
          </span>
        </motion.div>

        {/* Massive Studio Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#0F172A] leading-[1.08]"
        >
          We craft precision teams for organizations ready to dominate their industry.
        </motion.h1>

        {/* Bottom Actions Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 sm:mt-16 flex flex-wrap items-center gap-4 sm:gap-6"
        >
          {/* Main Orange Pill Button with Circular Arrow */}
          <button
            type="button"
            onClick={navigateToContact}
            className="group inline-flex items-center gap-3 rounded-full bg-[#EA580C] px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-extrabold text-white shadow-xl shadow-orange-500/20 hover:bg-[#D97706] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Start a hiring request</span>
            <span className="grid size-7 sm:size-8 place-items-center rounded-full bg-white text-[#EA580C] transition-transform duration-300 group-hover:translate-x-1 shadow-sm">
              <ArrowRight className="size-4" />
            </span>
          </button>

          {/* Certified Partner / Featured Badge */}
          <button
            type="button"
            onClick={navigateToAbout}
            className="inline-flex items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-md px-4 sm:px-5 py-3 shadow-sm hover:border-slate-300 transition-all hover:bg-white"
          >
            <div className="grid size-6 place-items-center rounded-full bg-amber-100 text-amber-600">
              <Sparkles className="size-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-800">Certified Recruitment Partner</span>
            <span className="rounded-md bg-slate-900 px-2 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-white">
              Featured
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
