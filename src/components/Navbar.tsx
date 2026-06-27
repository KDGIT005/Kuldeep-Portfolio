import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", to: "/#about" as const, isAnchor: true },
  { label: "Skills", to: "/skills" as const, isAnchor: false },
  { label: "Projects", to: "/projects" as const, isAnchor: false },
  { label: "Achievements", to: "/experience" as const, isAnchor: false },
  { label: "Certifications", to: "/certifications" as const, isAnchor: false },
  { label: "Contact", to: "/#contact" as const, isAnchor: true },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (to: string, isAnchor: boolean) => {
    if (isAnchor) return false;
    return currentPath === to;
  };

  return (
    <nav className="sticky top-4 z-50 mx-auto max-w-5xl px-4">
      <div className="glass rounded-full px-6 py-3 flex items-center justify-between shadow-[0_10px_40px_-10px_oklch(0.65_0.25_305/0.35)]">
        <Link to="/" className="font-display font-bold text-lg">
          <span className="gradient-text">Kuldeep</span>
          <span className="text-foreground/60 font-mono text-xs ml-1">.dev</span>
        </Link>
        <ul className="hidden md:flex gap-7 text-sm text-foreground/70">
          {links.map((l) =>
            l.isAnchor ? (
              <li key={l.label}>
                <a href={l.to} className="hover:text-foreground transition-colors">
                  {l.label}
                </a>
              </li>
            ) : (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className={`transition-colors ${
                    isActive(l.to, l.isAnchor)
                      ? "text-foreground font-semibold nav-link-active"
                      : "hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ),
          )}
        </ul>
        <Link
          to="/#contact"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full gradient-bg-primary text-primary-foreground text-sm font-semibold glow-purple hover:scale-105 transition-transform"
        >
          Hire Me
        </Link>
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-full glass text-foreground/80 hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden mt-2 glass rounded-2xl p-4 shadow-[0_20px_60px_-15px_oklch(0.65_0.25_305/0.4)]"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l) =>
                l.isAnchor ? (
                  <li key={l.label}>
                    <a
                      href={l.to}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2.5 rounded-xl text-sm text-foreground/80 hover:text-foreground hover:bg-white/5 transition-all"
                    >
                      {l.label}
                    </a>
                  </li>
                ) : (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-2.5 rounded-xl text-sm transition-all ${
                        isActive(l.to, l.isAnchor)
                          ? "text-foreground bg-white/5 font-semibold"
                          : "text-foreground/80 hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ),
              )}
              <li>
                <Link
                  to="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block mt-2 text-center px-4 py-2.5 rounded-full gradient-bg-primary text-primary-foreground text-sm font-semibold"
                >
                  Hire Me
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
