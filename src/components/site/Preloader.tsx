import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { LogoMark } from "./Logo";

export function Preloader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1100, 1);
      setProgress(8 + t * 92);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 220);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-6 bg-background"
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="relative grid place-items-center">
            <span className="absolute size-24 rounded-full bg-accent/25 animate-pulse-ring" />
            <LogoMark className="relative h-16 animate-float-slow" />
          </div>
          <div className="h-1 w-52 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full [background-image:var(--gradient-brand)] transition-[width] duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Biz Expert&rsquo;s Junction
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
