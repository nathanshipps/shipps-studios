"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export default function Contact() {
  return (
    <main className="min-h-screen pt-32 pb-24 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto w-full" style={{ paddingLeft: "clamp(2rem, 8vw, 8rem)", paddingRight: "clamp(2rem, 8vw, 8rem)" }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-24"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: "var(--accent)" }}>
            Contact
          </p>
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-bold leading-none tracking-tight mb-8" style={{ fontFamily: "var(--font-instrument-sans)" }}>
            Let&apos;s Make
            <br />
            <span style={{ color: "var(--accent)" }}>Something.</span>
          </h1>
          <p className="text-[#6b6560] text-lg max-w-lg leading-relaxed">
            Whether you have a clear brief or just an idea — get in touch. We&apos;re always interested in projects that matter.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-8"
          >
            <div>
              <p className="text-[11px] text-[#9a9490] tracking-[0.1em] uppercase mb-3">
                General Inquiries
              </p>
              <a
                href="mailto:hello@shippsstudios.com"
                className="text-lg transition-colors duration-300"
                style={{ color: "var(--fg)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg)")}
              >
                hello@shippsstudios.com
              </a>
            </div>
            <div>
              <p className="text-[11px] text-[#9a9490] tracking-[0.1em] uppercase mb-3">
                Commercial &amp; Brand Work
              </p>
              <a
                href="mailto:commercial@shippsstudios.com"
                className="text-lg transition-colors duration-300"
                style={{ color: "var(--fg)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg)")}
              >
                commercial@shippsstudios.com
              </a>
            </div>
            <div>
              <p className="text-[11px] text-[#9a9490] tracking-[0.1em] uppercase mb-3">
                Based In
              </p>
              <p className="text-[#6b6560]">Seattle, WA &amp; Los Angeles, CA</p>
              <p className="font-mono text-[10px] text-[#9a9490] tracking-[0.1em] mt-1">Available worldwide</p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-6"
          >
            <p className="text-[11px] text-[#9a9490] tracking-[0.1em] uppercase mb-6">
              Elsewhere
            </p>
            {[
              { label: "Vimeo", href: "https://vimeo.com" },
              { label: "Instagram", href: "https://instagram.com" },
              { label: "IMDb", href: "https://imdb.com" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <span className="w-6 h-px group-hover:w-12 transition-all duration-300" style={{ background: "var(--fg-faint)" }} />
                <span className="font-mono text-sm tracking-[0.15em] uppercase transition-colors duration-300" style={{ color: "var(--fg-subtle)" }}>
                  {link.label}
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
