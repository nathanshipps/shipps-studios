"use client";

import { useRef, useEffect, useState } from "react";
// ScrollTrigger used for bg parallax only
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  project: Project;
  index: number;
}

export default function ProjectReel({ project, index }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.to(bgRef.current, {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  // Magnetic cursor follow
  useEffect(() => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;
    if (!section || !cursor) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      gsap.to(cursor, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", cursor: "none" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background image with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{ top: "-12%", height: "124%" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>


      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Top-left: index */}
      <div className="absolute top-8 left-8 text-[11px] text-[#444] tracking-[0.12em]">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Top-right: category */}
      <div className="absolute top-8 right-8 text-[11px] text-[#555] tracking-[0.1em] uppercase">
        {project.category}
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-10">
        {/* Meta line */}
        <div className="flex items-center gap-4 mb-3">
          <span className="text-[11px] text-[#555] tracking-[0.1em] uppercase">
            {project.client}
          </span>
          <span className="w-4 h-px bg-[#333]" />
          <span className="text-[11px] text-[#444] tracking-[0.1em]">
            {project.year}
          </span>
        </div>

        {/* Full-width title */}
        <div className="flex items-end justify-between gap-4">
          <h2
            className="font-black uppercase leading-none tracking-tight transition-colors duration-500"
            style={{ color: "var(--fg)", fontSize: "clamp(3.5rem, 9vw, 10rem)", letterSpacing: "-0.02em", fontFamily: "var(--font-instrument-sans)" }}
          >
            {project.title}
          </h2>

          <Link
            href={`/work/${project.slug}`}
            className="shrink-0 mb-2 text-[11px] tracking-[0.1em] uppercase transition-colors duration-300 flex items-center gap-3 pointer-events-auto"
            style={{ color: "var(--fg-subtle)" }}
          >
            <span>Case Study</span>
            <span className="w-5 h-px bg-current" />
          </Link>
        </div>
      </div>

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="absolute z-20 pointer-events-none"
        style={{ top: 0, left: 0, width: 88, height: 88, marginLeft: -44, marginTop: -44 }}
      >
        <Link
          href={`/work/${project.slug}`}
          className={`w-full h-full rounded-full border border-white flex items-center justify-center pointer-events-auto transition-all duration-300 ${
            isHovered ? "opacity-100 scale-100 bg-white" : "opacity-0 scale-75 bg-transparent"
          }`}
          style={{ cursor: "none" }}
        >
          <span className="font-mono text-[9px] text-black tracking-[0.2em] uppercase font-bold">
            View
          </span>
        </Link>
      </div>
    </section>
  );
}
