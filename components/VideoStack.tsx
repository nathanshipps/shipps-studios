"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Test: same video repeated
const VIMEO_ID = "1146056329";
const CARD_COUNT = 5;

// Stack offset: back cards are higher, front card is lowest
const Y_PER_DEPTH = 28;      // px upward per level
const SCALE_PER_DEPTH = 0.025;

export default function VideoStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const n = cards.length;

    // cards[n-1] is on top, cards[0] is deepest
    // depth 0 = front (lowest), depth++ = further back (higher up)
    cards.forEach((card, i) => {
      const depth = n - 1 - i; // cards[n-1] is front (depth 0), cards[0] is back (depth n-1)
      gsap.set(card, {
        rotation: 0,
        y: -depth * Y_PER_DEPTH,   // back cards sit higher
        scale: 1 - depth * SCALE_PER_DEPTH,
        zIndex: i,
        opacity: 1,
      });
    });

    const step = 1 / n;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${n * 650}`,
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
      },
    });

    // Each step: peel the top card, bring the rest forward
    for (let topIdx = n - 1; topIdx >= 1; topIdx--) {
      const card = cards[topIdx];
      const tStart = (n - 1 - topIdx) * step;

      // Front card slides down and fades out
      tl.to(
        card,
        { y: "80%", opacity: 0, duration: step * 0.5, ease: "power2.in" },
        tStart
      );

      // Remaining cards drop down one level (forward in stack)
      for (let j = topIdx - 1; j >= 0; j--) {
        const newDepth = topIdx - 1 - j; // new depth after front card leaves
        tl.to(
          cards[j],
          {
            y: -newDepth * Y_PER_DEPTH,
            scale: 1 - newDepth * SCALE_PER_DEPTH,
            duration: step * 0.5,
            ease: "power2.out",
          },
          tStart + step * 0.15
        );
      }
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden flex items-center justify-center"
      style={{ height: "100svh", background: "var(--bg)" }}
    >
      {/* Label */}
      <p
        className="absolute top-8 left-8 font-mono text-[10px] tracking-[0.25em] uppercase"
        style={{ color: "var(--fg-subtle)" }}
      >
        Work
      </p>

      {/* Card stack */}
      <div
        style={{
          position: "relative",
          width: "76vw",
          maxWidth: 1060,
          aspectRatio: "16 / 9",
        }}
      >
        {Array.from({ length: CARD_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el; }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 6,
              overflow: "hidden",
              background: "#000",
              transformOrigin: "50% 50%",
              willChange: "transform, opacity",
            }}
          >
            <iframe
              src={`https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1&muted=1&loop=1&background=1&dnt=1`}
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              allow="autoplay; fullscreen"
              title={`Card ${i + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <p
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.25em] uppercase"
        style={{ color: "var(--fg-faint)" }}
      >
        Scroll
      </p>
    </section>
  );
}
