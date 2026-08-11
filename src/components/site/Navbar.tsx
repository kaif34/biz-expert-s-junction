import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown, Clock, Menu, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { NAV_ITEMS, SERVICES } from "./data";
import { Logo } from "./Logo";
import { MagneticButton } from "./motion-primitives";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const barWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time as HH:MM in Indian Standard Time (Ahmedabad / Gujarat)
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }),
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isGroupActive = (item: (typeof NAV_ITEMS)[number]) => {
    if ("dropdown" in item && item.dropdown) {
      return item.dropdown.some((sub) => location.pathname.startsWith(sub.path));
    }
    if ("isServicesDropdown" in item && item.isServicesDropdown) {
      return location.pathname.startsWith("/services");
    }
    if (item.path === "/") return location.pathname === "/";
    return location.pathname.startsWith(item.path);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[padding] duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6" ref={navRef}>
        <nav
          aria-label="Primary Navigation"
          className={cn(
            "flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5 transition-all duration-500",
            scrolled
              ? "glass-panel shadow-[var(--shadow-soft)]"
              : "bg-card/90 backdrop-blur-md border border-border/60 shadow-sm",
          )}
        >
          <Link
            to="/"
            className="flex min-w-0 items-center shrink-0"
            aria-label="Biz Expert's Junction — Home"
          >
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const groupActive = isGroupActive(item);

              // 1. SERVICES MEGA DROPDOWN
              if ("isServicesDropdown" in item && item.isServicesDropdown) {
                const isOpen = activeDropdown === "Services";
                return (
                  <li
                    key="services-menu"
                    className="relative"
                    onMouseEnter={() => setActiveDropdown("Services")}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="flex items-center">
                      <Link
                        to="/services"
                        className={cn(
                          "relative inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-xs font-bold transition-colors duration-200",
                          groupActive ? "text-accent" : "text-primary/80 hover:text-primary",
                        )}
                      >
                        <span>Services</span>
                        <ChevronDown
                          className={cn(
                            "size-3.5 transition-transform duration-300",
                            isOpen && "rotate-180 text-accent",
                          )}
                        />
                        {groupActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-brand-soft"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                      </Link>
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 top-full mt-2 w-[540px] -translate-x-1/2 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-lift)] backdrop-blur-xl"
                        >
                          <div className="mb-2.5 flex items-center justify-between border-b border-border/60 pb-2 px-2">
                            <span className="text-[0.7rem] font-extrabold uppercase tracking-wider text-accent flex items-center gap-1.5">
                              <Sparkles className="size-3.5" /> Our 6 Recruitment Tracks
                            </span>
                            <Link
                              to="/services"
                              className="text-xs font-semibold text-primary hover:text-accent hover:underline flex items-center gap-1"
                              onClick={() => setActiveDropdown(null)}
                            >
                              All Services Overview <ArrowRight className="size-3" />
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 gap-1.5">
                            {SERVICES.map((srv) => (
                              <button
                                type="button"
                                key={srv.slug}
                                onClick={() => {
                                  setActiveDropdown(null);
                                  navigate(`/services?service=${srv.slug}`);
                                }}
                                className="group flex items-start gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-secondary/80"
                              >
                                <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-brand-soft text-accent transition-colors group-hover:[background-image:var(--gradient-brand)] group-hover:text-primary-foreground">
                                  <srv.icon className="size-4" aria-hidden="true" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-primary group-hover:text-accent">
                                    {srv.title}
                                  </p>
                                  <p className="line-clamp-1 text-[0.7rem] text-muted-foreground">
                                    {srv.body}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              // 2. STANDARD DROPDOWN (ABOUT, EXPLORE)
              if ("dropdown" in item && item.dropdown) {
                const isOpen = activeDropdown === item.label;
                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="flex items-center">
                      <Link
                        to={item.path as never}
                        className={cn(
                          "relative inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-xs font-bold transition-colors duration-200",
                          groupActive ? "text-accent" : "text-primary/80 hover:text-primary",
                        )}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "size-3.5 transition-transform duration-300",
                            isOpen && "rotate-180 text-accent",
                          )}
                        />
                        {groupActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-brand-soft"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                      </Link>
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-0 top-full mt-2 w-64 rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-lift)] backdrop-blur-xl"
                        >
                          <div className="grid gap-1">
                            {item.dropdown.map((sub) => {
                              const subActive = isActive(sub.path);
                              return (
                                <Link
                                  key={sub.path}
                                  to={sub.path}
                                  onClick={() => setActiveDropdown(null)}
                                  className={cn(
                                    "group flex flex-col rounded-xl p-2.5 text-left transition-colors",
                                    subActive
                                      ? "bg-brand-soft text-accent"
                                      : "hover:bg-secondary/80 text-primary",
                                  )}
                                >
                                  <span className="text-xs font-bold group-hover:text-accent">
                                    {sub.label}
                                  </span>
                                  <span className="text-[0.7rem] text-muted-foreground">
                                    {sub.desc}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              // 3. REGULAR DIRECT LINK (HOME, CONTACT)
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "relative inline-block rounded-full px-3.5 py-2 text-xs font-bold transition-colors duration-200",
                      groupActive ? "text-accent" : "text-primary/80 hover:text-primary",
                    )}
                  >
                    {item.label}
                    {groupActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-brand-soft"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-3">
            {/* Signature Studio Orange Pill CTA */}
            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="group hidden sm:inline-flex items-center gap-2.5 rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-primary-foreground shadow-md transition-all duration-300 hover:scale-105 hover:bg-accent/90"
            >
              <span>Book a strategy call</span>
              <span className="grid size-6 place-items-center rounded-full bg-primary-foreground text-accent transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-xl border border-primary/15 bg-card text-primary lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-drawer"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel mt-2 overflow-hidden rounded-2xl p-4 shadow-[var(--shadow-lift)] lg:hidden"
            >
              <ul className="grid gap-1.5">
                {NAV_ITEMS.map((item) => {
                  if ("isServicesDropdown" in item && item.isServicesDropdown) {
                    const isExpanded = mobileExpandedGroup === "Services";
                    return (
                      <li key="mobile-services" className="rounded-xl bg-secondary/40 p-2">
                        <div className="flex items-center justify-between">
                          <Link
                            to="/services"
                            onClick={() => setOpen(false)}
                            className="text-sm font-bold text-primary hover:text-accent"
                          >
                            Services
                          </Link>
                          <button
                            type="button"
                            onClick={() => setMobileExpandedGroup(isExpanded ? null : "Services")}
                            className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-accent bg-card border border-border/50"
                          >
                            <span>6 Services</span>
                            <ChevronDown
                              className={cn(
                                "size-3.5 transition-transform",
                                isExpanded && "rotate-180",
                              )}
                            />
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="mt-2.5 grid gap-1 border-t border-border/60 pt-2 pl-1">
                            {SERVICES.map((srv) => (
                              <button
                                type="button"
                                key={srv.slug}
                                onClick={() => {
                                  setOpen(false);
                                  navigate(`/services?service=${srv.slug}`);
                                }}
                                className="flex items-center gap-2.5 rounded-lg p-2 text-left text-xs font-semibold text-primary hover:bg-card"
                              >
                                <srv.icon className="size-3.5 text-accent shrink-0" />
                                <span>{srv.title}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </li>
                    );
                  }

                  if ("dropdown" in item && item.dropdown) {
                    const isExpanded = mobileExpandedGroup === item.label;
                    return (
                      <li key={`mobile-${item.label}`} className="rounded-xl bg-secondary/40 p-2">
                        <div className="flex items-center justify-between">
                          <Link
                            to={item.path as never}
                            onClick={() => setOpen(false)}
                            className="text-sm font-bold text-primary hover:text-accent"
                          >
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            onClick={() => setMobileExpandedGroup(isExpanded ? null : item.label)}
                            className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-accent bg-card border border-border/50"
                          >
                            <span>Sub-pages</span>
                            <ChevronDown
                              className={cn(
                                "size-3.5 transition-transform",
                                isExpanded && "rotate-180",
                              )}
                            />
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="mt-2.5 grid gap-1 border-t border-border/60 pt-2 pl-1">
                            {item.dropdown.map((sub) => (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                onClick={() => setOpen(false)}
                                className="block rounded-lg p-2 text-xs font-semibold text-primary hover:bg-card"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </li>
                    );
                  }

                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl px-3.5 py-2 text-sm font-bold text-primary hover:bg-secondary/60"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <MagneticButton
                className="mt-4 w-full justify-center"
                onClick={() => {
                  setOpen(false);
                  navigate("/contact");
                }}
              >
                Get Talent Now
              </MagneticButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
