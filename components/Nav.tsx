"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import DiceToggle from "./DiceToggle";

const LINKS = [
  { href: "/work",  label: "Work"  },
  { href: "/photo", label: "Photo" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.from(navRef.current, {
      y: -20, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2,
      clearProps: "opacity,transform",
    });
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-8 md:px-10 md:py-12 transition-all duration-500"
        style={{
          background: scrolled
            ? "linear-gradient(135deg, color-mix(in srgb, var(--bg) 55%, transparent) 0%, color-mix(in srgb, var(--bg) 35%, transparent) 100%)"
            : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%) brightness(1.05)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%) brightness(1.05)" : "none",
          borderBottom: scrolled ? "1px solid color-mix(in srgb, var(--fg) 10%, transparent)" : "1px solid transparent",
          borderTop: scrolled ? "1px solid color-mix(in srgb, var(--fg) 18%, transparent)" : "1px solid transparent",
          boxShadow: scrolled ? "inset 0 1px 0 color-mix(in srgb, white 12%, transparent)" : "none",
        }}
      >
        <Link
          href="/"
          className="font-mono text-[14px] tracking-[0.25em] uppercase transition-colors duration-300"
          style={{ color: "var(--fg)" }}
        >
          Nate Shipps
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-mono text-[14px] tracking-[0.2em] uppercase transition-colors duration-300"
              style={{ color: pathname === href ? "var(--fg)" : "var(--fg-subtle)" }}
            >
              {label}
            </Link>
          ))}
          <DiceToggle />
        </div>

        {/* Mobile: dice + hamburger */}
        <div className="flex md:hidden items-center gap-4">
          <DiceToggle />
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-px transition-all duration-300 origin-center"
              style={{
                background: "var(--fg)",
                transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: "var(--fg)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300 origin-center"
              style={{
                background: "var(--fg)",
                transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-between md:hidden transition-all duration-500"
        style={{
          background: "var(--bg)",
          paddingLeft: "clamp(2rem, 8vw, 4rem)",
          paddingRight: "clamp(2rem, 8vw, 4rem)",
          paddingTop: "8rem",
          paddingBottom: "3rem",
          pointerEvents: menuOpen ? "auto" : "none",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
        }}
      >
        <nav className="flex flex-col gap-8">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-bold tracking-tight leading-none transition-colors duration-300"
              style={{
                fontFamily: "var(--font-instrument-sans)",
                fontSize: "clamp(2.5rem, 12vw, 4rem)",
                color: pathname === href ? "var(--fg)" : "var(--fg-subtle)",
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <a
          href="mailto:nateshipps@gmail.com"
          className="font-mono text-[11px] tracking-[0.2em] uppercase"
          style={{ color: "var(--fg-faint)" }}
        >
          nateshipps@gmail.com
        </a>
      </div>
    </>
  );
}
