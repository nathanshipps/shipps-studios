"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const PAD = "clamp(1.5rem, 5vw, 5rem)";

const PHOTOS = [
  { src: "/images/Photos Page/L1030711.jpg",               alt: "Photo"                     },
  { src: "/images/Photos Page/Freres_Tour-42.jpg",         alt: "Freres Tour"               },
  { src: "/images/Photos Page/L1060012.jpg",               alt: "Photo"                     },
  { src: "/images/Photos Page/L1091845.jpg",               alt: "Photo"                     },
  { src: "/images/Photos Page/ColumbianBrandShoot-14.jpg", alt: "The Columbian brand shoot" },
  { src: "/images/Photos Page/L1070674.jpg",               alt: "Photo"                     },
  { src: "/images/Photos Page/Freres_Tour-44.jpg",         alt: "Freres Tour"               },
  { src: "/images/Photos Page/L1021024.jpg",               alt: "Photo"                     },
  { src: "/images/Photos Page/L1030796.jpg",               alt: "Photo"                     },
  { src: "/images/Photos Page/Freres_Tour-38.jpg",         alt: "Freres Tour"               },
  { src: "/images/Photos Page/L1040859.jpg",               alt: "Photo"                     },
  { src: "/images/Photos Page/L1070790.jpg",               alt: "Photo"                     },
  { src: "/images/Photos Page/Lake_LaborDay24-67.jpg",     alt: "Lake Labor Day"            },
  { src: "/images/Photos Page/L1010564.jpg",               alt: "Photo"                     },
  { src: "/images/Photos Page/Freres_Tour-43.jpg",         alt: "Freres Tour"               },
  { src: "/images/Photos Page/L1050077.jpg",               alt: "Photo"                     },
  { src: "/images/Photos Page/L1030729.jpg",               alt: "Photo"                     },
  { src: "/images/Photos Page/RiverSessions_01.jpg",       alt: "River Sessions"            },
  { src: "/images/Photos Page/L1061034.jpg",               alt: "Photo"                     },
  { src: "/images/Photos Page/L1020832.jpg",               alt: "Photo"                     },
  { src: "/images/Photos Page/L1070689.jpg",               alt: "Photo"                     },
  { src: "/images/Photos Page/L1040173.jpg",               alt: "Photo"                     },
  { src: "/images/Photos Page/L1061047.jpg",               alt: "Photo"                     },
  { src: "/images/Photos Page/L1030210.jpg",               alt: "Photo"                     },
];

export default function PhotoPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightbox = lightboxIndex !== null ? PHOTOS[lightboxIndex].src : null;

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + PHOTOS.length) % PHOTOS.length : null));
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % PHOTOS.length : null));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex]);

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      {/* Header */}
      <section
        style={{
          paddingLeft: PAD,
          paddingRight: PAD,
          paddingTop: "clamp(8rem, 14vw, 12rem)",
          paddingBottom: "clamp(2rem, 4vw, 3rem)",
        }}
      >
        <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}>
          <motion.p
            className="font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "var(--fg-subtle)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Photography
          </motion.p>
        </div>
      </section>

      {/* Masonry */}
      <section
        style={{
          paddingLeft: PAD,
          paddingRight: PAD,
          paddingBottom: "clamp(5rem, 10vw, 10rem)",
          paddingTop: "clamp(2rem, 4vw, 3rem)",
        }}
      >
        <div
          style={{ columnGap: "clamp(1rem, 2vw, 2rem)" }}
          className="masonry"
        >
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              style={{ breakInside: "avoid", marginBottom: "clamp(1rem, 2vw, 2rem)", cursor: "zoom-in" }}
              onClick={() => openLightbox(i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1200}
                height={800}
                className="w-full h-auto block"
                style={{ display: "block" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={closeLightbox}
        >
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6" onClick={(e) => e.stopPropagation()}>
            <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.35)" }}>
              {lightboxIndex + 1} / {PHOTOS.length}
            </span>
            <button
              className="font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.4)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              onClick={closeLightbox}
            >
              Close ✕
            </button>
          </div>

          {/* Image */}
          <div
            style={{ position: "relative", maxWidth: "88vw", maxHeight: "85vh", width: "100%", height: "100%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={lightbox} alt="" fill className="object-contain" sizes="88vw" />
          </div>

          {/* Prev / Next */}
          <button
            className="absolute left-4 md:left-8 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-200 p-4"
            style={{ color: "rgba(255,255,255,0.4)", top: "50%", transform: "translateY(-50%)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            ← Prev
          </button>
          <button
            className="absolute right-4 md:right-8 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-200 p-4"
            style={{ color: "rgba(255,255,255,0.4)", top: "50%", transform: "translateY(-50%)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            Next →
          </button>
        </div>
      )}

      <style jsx>{`
        .masonry {
          column-count: 2;
        }
        @media (min-width: 768px) {
          .masonry {
            column-count: 3;
          }
        }
      `}</style>
    </main>
  );
}
