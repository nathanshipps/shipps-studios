"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Cards: index 0 = back of stack, index 4 = front (first visible)
// Each card is either a vimeo video or an image
type CardMedia = (
  | { type: "vimeo"; id: string; hash?: string }
  | { type: "image"; src: string; alt?: string }
) & { href?: string; label?: string; year?: string };

const CARDS: CardMedia[] = [
  { type: "image", src: "/images/w&p - test shoot-27.jpg", alt: "W&P Test Shoot", href: "/work/wool-and-prince",     label: "Wool & Prince",         year: "2024" },
  { type: "vimeo", id: "1152006062",                                               href: "/work/on-water",             label: "onWater",               year: "2025" },
  { type: "vimeo", id: "1033218792",                                               href: "/work/dream-the-museum",      label: "Dream The Museum",      year: "2024" },
  { type: "vimeo", id: "1106263702", hash: "b3042e8f6d",                          href: "/work/riffle-ranch",          label: "Riffle Ranch",          year: "2025" },
  { type: "vimeo", id: "1146056329",                                               href: "/work/the-columbian",         label: "The Columbian",         year: "2025" },
];

const HERO_META = {
  left: "Director · Cinematographer",
  right: "Nate Shipps",
};

const LETTERS = ["S", "H", "I", "P", "P", "S"];

const CYCLE_FONTS = [
  "var(--font-inter-tight), sans-serif",          // Inter Tight
  "var(--font-jacquard-12), cursive",             // Jacquard 12
  "var(--font-instrument-serif), serif",          // Instrument Serif
  "var(--font-league-gothic), sans-serif",        // League Gothic
  "-apple-system, 'SF Pro Display', sans-serif",  // San Francisco
  "Futura, 'Century Gothic', sans-serif",         // Futura PT (system fallback)
  "var(--font-jacquard-12), cursive",             // Jacquard 12 again for drama
  "", // final: revert to font-black (Geist Sans)
];

const CARD_COUNT = 5;
const Y_PER_DEPTH = 22;
const SCALE_PER_DEPTH = 0.025;
const CARD_STEP = 1.0;

export default function HeroIntro() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metaRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const startTimeRef = useRef(Date.now());
  const transitionFiredRef = useRef(false);

  useEffect(() => {
    // ── Set initial card stack positions ──
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    cards.forEach((card, i) => {
      const depth = CARD_COUNT - 1 - i; // 0 = front
      gsap.set(card, {
        y: -depth * Y_PER_DEPTH,
        scale: 1 - depth * SCALE_PER_DEPTH,
        zIndex: i,
        opacity: 1,
      });
    });

    // ── Center SHIPPS vertically on load ──
    const containerRect = containerRef.current!.getBoundingClientRect();
    const wordRect = wordRef.current!.getBoundingClientRect();
    const yOffset = containerRect.height * 0.5 - (containerRect.height * 0.08 + wordRect.height / 2);
    const letterEls = Array.from(wordRef.current!.querySelectorAll("span"));
    gsap.set(letterEls, { opacity: 0, y: -80, filter: "blur(20px)" });
    gsap.set(wordRef.current, { y: yOffset, opacity: 1 });

    // ── Stagger letters in: blur drop from above ──
    gsap.to(letterEls, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.7,
      ease: "expo.out",
      stagger: 0.07,
      delay: 0.15,
    });

    // ── Font cycling: shuffle through fonts, land on final ──
    const word = wordRef.current!;
    let fontIdx = 0;
    // Start fast, slow down toward the end (slot-machine feel)
    const delays = [60, 70, 80, 100, 120, 150, 200, 280];
    const cycleFont = () => {
      word.style.fontFamily = CYCLE_FONTS[fontIdx];
      fontIdx++;
      if (fontIdx < CYCLE_FONTS.length) {
        setTimeout(cycleFont, delays[fontIdx - 1] ?? 200);
      }
    };
    cycleFont();

    // ── Keep video stack + meta hidden until load ──
    gsap.set(videoRef.current, { opacity: 0, y: 24 });
    gsap.set(metaRef.current, { opacity: 0 });

    // ── Slide wordmark up + reveal video once loaded ──
    const triggerTransition = () => {
      if (transitionFiredRef.current) return;
      transitionFiredRef.current = true;
      gsap.to(wordRef.current, { y: 0, duration: 1.3, ease: "power3.inOut" });
      gsap.to(videoRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.4 });
      gsap.to(metaRef.current, { opacity: 1, duration: 0.6, delay: 0.9 });
    };

    const handleIframeLoad = () => {
      const elapsed = Date.now() - startTimeRef.current;
      setTimeout(triggerTransition, Math.max(0, 1500 - elapsed));
    };

    const iframe = iframeRef.current;
    if (iframe) iframe.addEventListener("load", handleIframeLoad);
    const fallback = setTimeout(triggerTransition, 3000);

    // ── Scroll: card cycling only ──
    const cardTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${CARD_COUNT * 550}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1.8,
      },
    });

    for (let k = 0; k < CARD_COUNT - 1; k++) {
      const stepStart = k * CARD_STEP;
      const frontIdx = CARD_COUNT - 1 - k;

      cardTl.to(
        cards[frontIdx],
        { y: "120%", opacity: 0, duration: CARD_STEP * 0.5, ease: "power2.in" },
        stepStart
      );

      for (let j = frontIdx - 1; j >= 0; j--) {
        const newDepth = frontIdx - 1 - j;
        cardTl.to(
          cards[j],
          {
            y: -newDepth * Y_PER_DEPTH,
            scale: 1 - newDepth * SCALE_PER_DEPTH,
            duration: CARD_STEP * 0.5,
            ease: "power2.out",
          },
          stepStart + CARD_STEP * 0.15
        );
      }
    }

    return () => {
      if (iframe) iframe.removeEventListener("load", handleIframeLoad);
      clearTimeout(fallback);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden transition-colors duration-500"
      style={{ background: "var(--bg)", height: "100svh" }}
    >
      {/* ── WORDMARK ── */}
      <div
        ref={wordRef}
        className="absolute z-10 select-none pointer-events-none flex justify-center overflow-visible"
        style={{ top: "8%", left: 0, right: 0 }}
      >
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            className="font-black uppercase inline-block transition-colors duration-500"
            style={{
              color: "var(--fg)",
              fontSize: "clamp(4rem, 22vw, 24rem)",
              lineHeight: 0.85,
              marginRight: i < LETTERS.length - 1 ? "-0.02em" : 0,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* ── CARD STACK ── */}
      <div
        ref={videoRef}
        className="absolute z-20"
        style={{ top: "34%", left: "5%", right: "5%", bottom: "11%" }}
      >
        {Array.from({ length: CARD_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 6,
              transformOrigin: "50% 50%",
              willChange: "transform, opacity",
            }}
          >
            {/* Inner wrapper handles hover lift independently from GSAP stack */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 6,
                overflow: "hidden",
                background: "#000",
                transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-10px)";
                (e.currentTarget as HTMLDivElement).style.cursor = "pointer";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "";
                (e.currentTarget as HTMLDivElement).style.cursor = "";
              }}
              onClick={() => { if (CARDS[i].href) router.push(CARDS[i].href!); }}
            >
            {CARDS[i].type === "vimeo" ? (
              <iframe
                ref={i === CARD_COUNT - 1 ? iframeRef : undefined}
                src={`https://player.vimeo.com/video/${(CARDS[i] as Extract<CardMedia, { type: "vimeo" }>).id}?autoplay=1&muted=1&loop=1&background=1&byline=0&title=0&portrait=0&dnt=1${(CARDS[i] as Extract<CardMedia, { type: "vimeo" }>).hash ? `&h=${(CARDS[i] as Extract<CardMedia, { type: "vimeo" }>).hash}` : ""}`}
                allow="autoplay; fullscreen"
                style={{
                  border: "none",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "177.78vh",
                  height: "56.25vw",
                  minWidth: "100%",
                  minHeight: "100%",
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                }}
                title={`Card ${i + 1}`}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={(CARDS[i] as Extract<CardMedia, { type: "image" }>).src}
                alt={(CARDS[i] as Extract<CardMedia, { type: "image" }>).alt ?? ""}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            )}
            {/* Card labels */}
            {(CARDS[i].label || CARDS[i].year) && (
              <div
                className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-8 pb-7 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)", paddingTop: "3rem" }}
              >
                <span className="font-mono text-[12px] tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {CARDS[i].label}
                </span>
                <span className="font-mono text-[12px] tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {CARDS[i].year}
                </span>
              </div>
            )}
            </div>
          </div>
        ))}
      </div>

      {/* ── METADATA ── */}
      <div
        ref={metaRef}
        className="absolute z-30 flex items-center justify-between"
        style={{ bottom: "4.5%", left: "5%", right: "5%" }}
      >
        <span className="text-[11px] tracking-[0.1em] uppercase transition-colors duration-500" style={{ color: "var(--fg-subtle)" }}>
          {HERO_META.left}
        </span>
        <span className="text-[11px] tracking-[0.1em] uppercase transition-colors duration-500" style={{ color: "var(--fg-subtle)" }}>
          {HERO_META.right}
        </span>
      </div>
    </div>
  );
}
