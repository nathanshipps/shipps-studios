"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import DiceToggle from "./DiceToggle";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
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
        boxShadow: scrolled
          ? "inset 0 1px 0 color-mix(in srgb, white 12%, transparent)"
          : "none",
      }}
    >
      <Link
        href="/"
        className="font-mono text-[14px] tracking-[0.25em] uppercase transition-colors duration-300"
        style={{ color: "var(--fg)" }}
      >
        Nate Shipps
      </Link>

      <div className="flex items-center gap-5 md:gap-8">
        <Link
          href="/work"
          className="font-mono text-[14px] tracking-[0.2em] uppercase transition-colors duration-300"
          style={{ color: pathname === "/work" ? "var(--fg)" : "var(--fg-subtle)" }}
        >
          Work
        </Link>
        <Link
          href="/photo"
          className="font-mono text-[14px] tracking-[0.2em] uppercase transition-colors duration-300"
          style={{ color: pathname === "/photo" ? "var(--fg)" : "var(--fg-subtle)" }}
        >
          Photo
        </Link>
        <Link
          href="/about"
          className="font-mono text-[14px] tracking-[0.2em] uppercase transition-colors duration-300"
          style={{ color: pathname === "/about" ? "var(--fg)" : "var(--fg-subtle)" }}
        >
          About
        </Link>
        <DiceToggle />
      </div>
    </nav>
  );
}
