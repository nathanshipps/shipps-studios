"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import VideoEmbed from "@/components/VideoEmbed";
import type { Project, HeroMedia } from "@/lib/projects";
import { projects } from "@/lib/projects";

const PAD = "clamp(1.5rem, 6vw, 7rem)";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--fg-subtle)" }}>
      {children}
    </p>
  );
}

export default function CaseStudyClient({ project }: { project: Project }) {
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article style={{ background: "var(--bg)", color: "var(--fg)" }}>

      {/* ── HERO TEXT ── */}
      <section style={{ paddingLeft: PAD, paddingRight: PAD, paddingTop: "clamp(8rem, 14vw, 12rem)", paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>

        {/* Back link */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Link
            href="/work"
            className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase mb-16 transition-colors duration-300"
            style={{ color: "var(--fg-subtle)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-subtle)")}
          >
            <span className="w-5 h-px bg-current" />
            All Work
          </Link>
        </motion.div>

        {/* Category + year */}
        <motion.div
          className="flex items-center gap-6 mb-8"
          initial="hidden" animate="visible"
          variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.7, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } } }}
        >
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--fg-faint)" }}>
            {project.category}
          </span>
          <span style={{ width: 1, height: 12, background: "var(--border)", display: "inline-block" }} />
          <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>
            {project.year}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="leading-[0.92] tracking-tight mb-12"
          style={{ fontFamily: "var(--font-instrument-sans)", fontSize: "clamp(3.5rem, 9vw, 9rem)", fontWeight: 700, maxWidth: "14ch" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {project.title}
        </motion.h1>

        {/* Meta strip */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10"
          style={{ borderTop: "1px solid var(--border)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div>
            <Label>Client</Label>
            <p className="mt-2 text-sm" style={{ color: "var(--fg-body)" }}>{project.client}</p>
          </div>
          <div>
            <Label>Services</Label>
            <ul className="mt-2 space-y-1">
              {project.caseStudy.role.map((r) => (
                <li key={r} className="text-sm" style={{ color: "var(--fg-body)" }}>{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <Label>Year</Label>
            <p className="mt-2 text-sm" style={{ color: "var(--fg-body)" }}>{project.year}</p>
          </div>
          <div>
            <Label>Category</Label>
            <p className="mt-2 text-sm" style={{ color: "var(--fg-body)" }}>{project.category}</p>
          </div>
        </motion.div>
      </section>

      {/* ── HERO MEDIA ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ paddingLeft: PAD, paddingRight: PAD, paddingBottom: "clamp(4rem, 8vw, 7rem)" }}
      >
        {project.hero.type === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={(project.hero as Extract<HeroMedia, { type: "image" }>).url}
            alt={(project.hero as Extract<HeroMedia, { type: "image" }>).alt ?? project.title}
            className="w-full object-cover"
            style={{ maxHeight: "80vh" }}
          />
        ) : (
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <div className="absolute inset-0">
              <VideoEmbed
                source={project.hero as Extract<HeroMedia, { type: "vimeo" | "mp4" }>}
                autoplay={false}
                controls={true}
                muted={false}
                loop={false}
                poster={project.thumbnail}
              />
            </div>
          </div>
        )}
      </motion.section>

      {/* ── OVERVIEW ── */}
      <section style={{ paddingLeft: PAD, paddingRight: PAD, paddingBottom: "clamp(4rem, 8vw, 7rem)", borderTop: "1px solid var(--border)" }}>
        <div className="grid md:grid-cols-12 gap-8 pt-12">
          <div className="md:col-span-3">
            <Label>Overview</Label>
          </div>
          <motion.div
            className="md:col-span-8"
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
          >
            <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", lineHeight: 1.6, color: "var(--fg-body)" }}>
              {project.caseStudy.overview}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CHALLENGE / SOLUTION ── */}
      <section style={{ paddingLeft: PAD, paddingRight: PAD, paddingBottom: "clamp(4rem, 8vw, 7rem)", borderTop: "1px solid var(--border)" }}>
        <div className="grid md:grid-cols-2 gap-12 pt-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Label>Challenge</Label>
            <p className="mt-6 leading-relaxed" style={{ color: "var(--fg-body)" }}>{project.caseStudy.challenge}</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Label>Solution</Label>
            <p className="mt-6 leading-relaxed" style={{ color: "var(--fg-body)" }}>{project.caseStudy.solution}</p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTIONS ── */}
      {project.caseStudy.sections.map((section, i) => {
        if (section.type === "text") return (
          <section key={i} style={{ paddingLeft: PAD, paddingRight: PAD, paddingBottom: "clamp(4rem, 8vw, 7rem)", borderTop: "1px solid var(--border)" }}>
            <div className="grid md:grid-cols-12 gap-8 pt-12">
              <div className="md:col-span-3">
                <Label>{section.heading}</Label>
              </div>
              <motion.div className="md:col-span-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <p className="leading-relaxed text-lg" style={{ color: "var(--fg-body)" }}>{section.body}</p>
              </motion.div>
            </div>
          </section>
        );

        if (section.type === "stats") return (
          <section key={i} style={{ paddingLeft: PAD, paddingRight: PAD, paddingBottom: "clamp(4rem, 8vw, 7rem)", borderTop: "1px solid var(--border)" }}>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 pt-12 gap-12"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              {section.items.map((item) => (
                <div key={item.label}>
                  <p className="font-bold leading-none mb-3" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--fg)" }}>
                    {item.value}
                  </p>
                  <Label>{item.label}</Label>
                </div>
              ))}
            </motion.div>
          </section>
        );

        if (section.type === "video") return (
          <section key={i} style={{ paddingLeft: PAD, paddingRight: PAD, paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <div className="absolute inset-0">
                  <VideoEmbed source={section.source} controls muted={false} loop={false} />
                </div>
              </div>
              {section.caption && <p className="font-mono text-[10px] tracking-[0.15em] uppercase mt-4" style={{ color: "var(--fg-faint)" }}>{section.caption}</p>}
            </motion.div>
          </section>
        );

        if (section.type === "image") return (
          <section key={i} style={{ paddingLeft: PAD, paddingRight: PAD, paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={section.url} alt={section.alt} className="w-full object-cover" />
              {section.caption && <p className="font-mono text-[10px] tracking-[0.15em] uppercase mt-4" style={{ color: "var(--fg-faint)" }}>{section.caption}</p>}
            </motion.div>
          </section>
        );

        if (section.type === "pair") return (
          <section key={i} style={{ paddingLeft: PAD, paddingRight: PAD, paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>
            <motion.div
              className="grid grid-cols-2 gap-3"
              style={section.small ? { maxWidth: "55%", margin: "0 auto" } : undefined}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              {section.images.map((img, j) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={j} src={img.url} alt={img.alt} className="w-full object-cover" />
              ))}
            </motion.div>
            {section.caption && <p className="font-mono text-[10px] tracking-[0.15em] uppercase mt-4" style={{ color: "var(--fg-faint)" }}>{section.caption}</p>}
          </section>
        );

        if (section.type === "carousel") return (
          <section key={i} style={{ paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                }}
              >
                {section.images.map((img, j) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={j}
                    src={img.url}
                    alt={img.alt}
                    style={{
                      height: "clamp(180px, 25vw, 360px)",
                      flex: 1,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                ))}
              </div>
              {section.caption && (
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase mt-4" style={{ color: "var(--fg-faint)", paddingLeft: PAD }}>
                  {section.caption}
                </p>
              )}
            </motion.div>
          </section>
        );

        if (section.type === "grid") return (
          <section key={i} style={{ paddingLeft: PAD, paddingRight: PAD, paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              {section.images.map((img, j) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={j} src={img.url} alt={img.alt} className="w-full object-cover" />
              ))}
            </motion.div>
            {section.caption && <p className="font-mono text-[10px] tracking-[0.15em] uppercase mt-4" style={{ color: "var(--fg-faint)" }}>{section.caption}</p>}
          </section>
        );

        return null;
      })}

      {/* ── NEXT PROJECT ── */}
      <section style={{ paddingLeft: PAD, paddingRight: PAD, paddingBottom: "clamp(4rem, 8vw, 7rem)", borderTop: "1px solid var(--border)" }}>
        <div className="pt-12">
          <Label>Next Project</Label>
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-end justify-between mt-8"
            onMouseEnter={(e) => { const h = e.currentTarget.querySelector("h2") as HTMLElement; if (h) h.style.opacity = "0.5"; }}
            onMouseLeave={(e) => { const h = e.currentTarget.querySelector("h2") as HTMLElement; if (h) h.style.opacity = "1"; }}
          >
            <h2
              className="leading-none tracking-tight"
              style={{ fontFamily: "var(--font-instrument-sans)", fontSize: "clamp(2.5rem, 7vw, 7rem)", fontWeight: 700, transition: "opacity 0.4s ease" }}
            >
              {next.title}
            </h2>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2 shrink-0" style={{ color: "var(--fg-subtle)" }}>
              View →
            </span>
          </Link>
        </div>
      </section>

    </article>
  );
}
