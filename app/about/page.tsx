"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const DISCIPLINES = [
  "Direction", "Cinematography", "Editing", "Color", "Creative Direction", "Production",
];

const RESUME = [
  {
    section: "Experience",
    items: [
      { years: "2018–Present", title: "Founder & Director", org: "Shipps Studios" },
      { years: "2019–Present", title: "Riff Creative", org: "" },
    ],
  },
];

const PAD = "clamp(2rem, 8vw, 8rem)";

export default function About() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>

      {/* ── Headline ── */}
      <section className="pb-32" style={{ paddingLeft: PAD, paddingRight: PAD, paddingTop: "clamp(9rem, 16vw, 14rem)" }}>
        <motion.p
          className="font-mono text-[10px] tracking-[0.3em] uppercase mb-12"
          style={{ color: "#000000" }}
          initial="hidden" animate="visible" variants={fadeUp}
        >
          About
        </motion.p>
        <motion.h1
          className="font-bold leading-[0.9] tracking-tight max-w-5xl"
          style={{ fontFamily: "var(--font-instrument-sans)", fontSize: "clamp(3.5rem, 8vw, 8rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          The work comes first. <span style={{ color: "#000000" }}>Always.</span>
        </motion.h1>
      </section>

      <div style={{ height: "1px", background: "var(--border)", margin: `0 ${PAD}` }} />

      {/* ── Bio + Headshot ── */}
      <section className="py-40" style={{ paddingLeft: PAD, paddingRight: PAD }}>
        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">

          {/* Headshot */}
          <motion.div
            className="md:col-span-4"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/headshotnate.png"
              alt="Nate Shipps on set"
              className="w-full rounded-sm object-cover"
              style={{ aspectRatio: "3/4" }}
            />
          </motion.div>

          {/* Bio */}
          <motion.div
            className="md:col-span-8 space-y-8 md:pt-2 md:pl-20"
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] } } }}
          >
            <p style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)", lineHeight: 1.55, color: "var(--fg-body)" }}>
              Nate Shipps is a filmmaker and director built on the belief that the most powerful stories are the ones told with absolute conviction — in the edit, behind the lens, in the details nobody else would notice.
            </p>
            <p className="leading-relaxed text-base" style={{ color: "var(--fg-muted)" }}>
              Based between Seattle and Los Angeles, we work with brands, artists, and institutions who are serious about their work and need a creative partner who is too. Our projects range from feature documentaries to commercial campaigns to music videos — connected by a consistent visual sensibility and a refusal to settle for the obvious frame.
            </p>
            <p className="leading-relaxed text-base" style={{ color: "var(--fg-muted)" }}>
              We keep crews small, move fast, and take the time to understand what actually matters about the story we&apos;re telling. That approach has taken us to seven continents and put our work in front of audiences at Sundance, SXSW, and screens around the world.
            </p>
          </motion.div>

        </div>
      </section>

      <div style={{ height: "1px", background: "var(--border)", margin: `0 ${PAD}` }} />

      {/* ── Disciplines ── */}
      <section className="py-36" style={{ paddingLeft: PAD, paddingRight: PAD }}>
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">
          <motion.div className="md:col-span-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--fg-subtle)" }}>
              Disciplines
            </p>
          </motion.div>
          <motion.div
            className="md:col-span-9 flex flex-wrap gap-3"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {DISCIPLINES.map((d) => (
              <span
                key={d}
                className="font-mono text-[11px] tracking-[0.1em] uppercase px-4 py-2 rounded-full"
                style={{ border: "1px solid var(--border)", color: "var(--fg-muted)" }}
              >
                {d}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <div style={{ height: "1px", background: "var(--border)", margin: `0 ${PAD}` }} />

      {/* ── Resume ── */}
      {RESUME.map((block, bi) => (
        <section key={block.section} className="py-20" style={{ paddingLeft: PAD, paddingRight: PAD }}>
          <div className="grid md:grid-cols-12 gap-12 md:gap-20">
            <motion.div className="md:col-span-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--fg-subtle)" }}>
                {block.section}
              </p>
            </motion.div>
            <div className="md:col-span-9">
              {block.items.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-baseline gap-8 py-6"
                  style={{ borderBottom: "1px solid var(--border)" }}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <span className="font-mono text-[10px] tracking-[0.1em] shrink-0" style={{ color: "var(--fg-faint)", minWidth: "4.5rem" }}>
                    {item.years}
                  </span>
                  <span className="flex-1 text-sm font-medium" style={{ color: "var(--fg)" }}>
                    {item.title}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-right hidden md:block" style={{ color: "var(--fg-subtle)" }}>
                    {item.org}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          {bi < RESUME.length - 1 && (
            <div style={{ height: "1px", background: "var(--border)", marginTop: "5rem" }} />
          )}
        </section>
      ))}


    </main>
  );
}
