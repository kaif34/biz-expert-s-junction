import { motion, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "span";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

/** Button-like element that leans toward the pointer and emits a click ripple. */
export function MagneticButton({
  children,
  className,
  onClick,
  href,
  type = "button",
  variant = "brand",
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  variant?: "brand" | "outline" | "ghost-light";
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    el.style.transform = `translate3d(${x * 7}px, ${y * 5}px, 0) scale(1.02)`;
  };
  const leave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0,0,0) scale(1)";
  };
  const ripple = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const span = document.createElement("span");
    const size = Math.max(r.width, r.height) * 2;
    span.style.cssText = `position:absolute;left:${e.clientX - r.left - size / 2}px;top:${
      e.clientY - r.top - size / 2
    }px;width:${size}px;height:${size}px;border-radius:9999px;background:currentColor;opacity:.22;pointer-events:none;transform:scale(0);transition:transform .6s cubic-bezier(.22,1,.36,1),opacity .6s ease`;
    el.appendChild(span);
    requestAnimationFrame(() => {
      span.style.transform = "scale(1)";
      span.style.opacity = "0";
    });
    window.setTimeout(() => span.remove(), 650);
  };

  const styles = {
    brand:
      "text-primary-foreground shadow-[var(--shadow-brand)] [background-image:var(--gradient-brand)] hover:brightness-[1.06]",
    outline: "border border-primary/25 bg-card text-primary hover:border-accent/60",
    "ghost-light":
      "border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10",
  }[variant];

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-[transform,filter,border-color,background-color] duration-300 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    styles,
    className,
  );

  const handlers = {
    onMouseMove: move,
    onMouseLeave: leave,
    onClick: (e: React.MouseEvent) => {
      ripple(e);
      onClick?.();
    },
  };

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className={classes}
        {...handlers}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      aria-label={ariaLabel}
      className={classes}
      {...handlers}
    >
      {children}
    </button>
  );
}

/** Adds a 3D tilt on pointer move. Wrap cards with it. */
export function TiltCard({ children, className, onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    el.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 6}deg) translateY(-6px)`;
  };
  const leave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
  };

  return (
    <div
      ref={ref}
      data-tilt
      onMouseMove={move}
      onMouseLeave={leave}
      onClick={onClick}
      className={cn("tilt-card", className)}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  body,
  align = "center",
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  body?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em]",
          tone === "dark"
            ? "border-primary-foreground/25 text-accent"
            : "border-accent/30 bg-brand-soft text-accent",
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          "mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl",
          tone === "dark" ? "text-primary-foreground" : "text-primary",
        )}
      >
        {title} {highlight ? <span className="text-gradient-brand">{highlight}</span> : null}
      </h2>
      {body ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            tone === "dark" ? "text-primary-foreground/70" : "text-muted-foreground",
          )}
        >
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}
