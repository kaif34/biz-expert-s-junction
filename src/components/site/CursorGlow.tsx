import { useEffect, useRef, useState } from "react";

/** Subtle trailing cursor ring, desktop + fine-pointer only. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest("a,button,input,textarea,select,[data-tilt]");
      if (ref.current) ref.current.dataset["active"] = interactive ? "true" : "false";
    };
    const loop = () => {
      cx += (x - cx) * 0.16;
      cy += (y - cy) * 0.16;
      if (ref.current) ref.current.style.transform = `translate3d(${cx - 20}px, ${cy - 20}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-active="false"
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden size-10 rounded-full border border-accent/50 bg-accent/10 transition-[opacity,scale,background-color] duration-300 data-[active=true]:scale-150 data-[active=true]:bg-accent/20 md:block"
    />
  );
}
