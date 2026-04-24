"use client";

import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { useState } from "react";

const CATEGORIES = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function WorkPage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? projects : projects.filter((p) => (p.tags ?? [p.category]).includes(filter));

  return (
    <main
      className="min-h-screen"
      style={{
        background: "var(--bg)",
        paddingTop: "clamp(4rem, 7vw, 6rem)",
        paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
        paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        paddingBottom: "6rem",
      }}
    >
      {/* Header */}
      <div className="flex items-baseline justify-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem", marginBottom: "1.5rem" }}>
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--fg-subtle)" }}>
          Selected Work
        </p>
        <p className="font-mono text-[10px] tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>
          {filtered.length} Projects
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2" style={{ marginBottom: "2.5rem" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="font-mono uppercase tracking-[0.1em] transition-colors duration-200"
            style={{
              fontSize: "0.65rem",
              padding: "0.35rem 0.85rem",
              borderRadius: "999px",
              border: "1px solid",
              borderColor: filter === cat ? "var(--fg)" : "var(--border)",
              background: filter === cat ? "var(--fg)" : "transparent",
              color: filter === cat ? "var(--bg)" : "var(--fg-subtle)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, index) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group block"
            onMouseEnter={() => setHovered(project.slug)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Thumbnail */}
            <div
              className="relative w-full overflow-hidden rounded-xl"
              style={{
                aspectRatio: "1 / 1",
                background: "var(--fg-faint)",
              }}
            >
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                style={{
                  transform: hovered === project.slug ? "scale(1.03)" : "scale(1)",
                  transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={90}
              />
              {/* Category badge */}
              <span
                className="absolute bottom-3 right-3 font-mono uppercase tracking-[0.12em]"
                style={{
                  fontSize: "0.6rem",
                  background: "rgba(0,0,0,0.55)",
                  color: "rgba(255,255,255,0.9)",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "999px",
                  backdropFilter: "blur(6px)",
                }}
              >
                {project.category}
              </span>
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between pt-3 pb-1 gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-[10px] shrink-0" style={{ color: "var(--fg-faint)" }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2
                  className="font-bold leading-none tracking-tight shrink-0"
                  style={{
                    fontFamily: "var(--font-instrument-sans)",
                    fontSize: "clamp(0.85rem, 1.2vw, 1.1rem)",
                    color: "var(--fg)",
                  }}
                >
                  {project.title}
                </h2>
              </div>
              <span className="font-mono text-[10px] tracking-[0.1em] shrink-0" style={{ color: "var(--fg-faint)" }}>
                {project.year}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
