"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ContactModal from "@/components/ContactModal";

const PAD = "clamp(2rem, 8vw, 8rem)";

const META = [
  {
    label: "Currently",
    lines: ["Director & Creative Lead"],
  },
  {
    label: "Based In",
    lines: ["Portland, OR", "Available worldwide"],
  },
  {
    label: "Disciplines",
    lines: ["Direction · Cinematography", "Design · Strategy · Production"],
  },
  {
    label: "Contact",
    lines: ["nateshipps@gmail.com"],
    href: "mailto:nateshipps@gmail.com",
  },
];


const BIO = [
  "I'm a creative production leader who thrives in fast-moving environments — the kind where the idea is big, the timeline is short, and someone needs to make sense of it all.",
  "My background spans video, design, and content. I work at the intersection of strategy and execution: streamlining workflows, guiding projects from concept to delivery, and building the kind of creative partnerships that hold up under pressure.",
  "I'm drawn to mission-focused work. I believe storytelling is how complex ideas become accessible — and how organizations stop informing people and start actually moving them.",
  "What I'm working toward: studios that run like well-organized ecosystems. Where the process is tight enough that talent can focus, and the work is good enough to matter.",
];

export default function About() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <section
        style={{
          paddingLeft: PAD,
          paddingRight: PAD,
          paddingTop: "clamp(9rem, 16vw, 14rem)",
          paddingBottom: "clamp(5rem, 10vw, 10rem)",
        }}
      >
        <div className="grid md:grid-cols-12 gap-16 md:gap-24 items-start">

          {/* ── Left: photo + metadata ── */}
          <motion.div
            className="md:col-span-4 flex flex-col gap-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/NateHeadshot.jpg"
              alt="Nate Shipps"
              className="w-full rounded-sm object-cover"
              style={{ aspectRatio: "3/4" }}
            />

            <div className="flex flex-col gap-6">
              {META.map(({ label, lines, href }) => (
                <div key={label}>
                  <p
                    className="font-mono text-[9px] tracking-[0.25em] uppercase mb-2"
                    style={{ color: "var(--fg-subtle)" }}
                  >
                    {label}
                  </p>
                  {lines.map((line, i) =>
                    href && i === 0 ? (
                      <a
                        key={i}
                        href={href}
                        className="hover-accent block transition-colors duration-300 text-[0.875rem] leading-snug"
                        style={{ color: "var(--fg)" }}
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={i} className="text-[0.875rem] leading-snug" style={{ color: "var(--fg)" }}>
                        {line}
                      </p>
                    )
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: bio paragraphs ── */}
          <motion.div
            className="md:col-span-8 flex flex-col gap-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1
              className="font-bold tracking-tight leading-none"
              style={{ fontFamily: "var(--font-instrument-sans)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "var(--fg)" }}
            >
              Hi, I&apos;m Nate.
            </h1>
            {BIO.map((graf, i) => (
              <p
                key={i}
                style={{
                  fontSize: "clamp(1.1rem, 1.9vw, 1.4rem)",
                  lineHeight: 1.65,
                  color: i === 0 ? "var(--fg)" : "var(--fg-body)",
                }}
              >
                {graf}
              </p>
            ))}
          </motion.div>

        </div>
      </section>

      <div style={{ height: "1px", background: "var(--border)", margin: `0 ${PAD}` }} />

      {/* ── Contact ── */}
      <section
        style={{
          paddingLeft: PAD,
          paddingRight: PAD,
          paddingTop: "clamp(4rem, 8vw, 7rem)",
          paddingBottom: "clamp(4rem, 8vw, 7rem)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <p className="font-mono text-[9px] tracking-[0.25em] uppercase mb-4" style={{ color: "var(--fg-subtle)" }}>
              Get In Touch
            </p>
            <h2
              className="font-bold tracking-tight leading-none"
              style={{ fontFamily: "var(--font-instrument-sans)", fontSize: "clamp(2.5rem, 5vw, 5rem)", color: "var(--fg)" }}
            >
              Let&apos;s make something.
            </h2>
          </div>
          <button
            onClick={() => setContactOpen(true)}
            className="group relative font-mono uppercase transition-all duration-300 shrink-0 overflow-hidden"
            style={{
              background: "transparent",
              color: "var(--fg)",
              border: "1px solid var(--fg)",
              borderRadius: 999,
              padding: "0.85rem 2.25rem",
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--fg)"; e.currentTarget.style.color = "var(--bg)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--fg)"; }}
          >
            Get In Touch →
          </button>
        </motion.div>
      </section>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
