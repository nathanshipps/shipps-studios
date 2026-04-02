"use client";

import { useEffect, useRef } from "react";

const IMAGES = [
  "/images/BTS Photos/ColumbianBTS-2.jpg",
  "/images/BTS Photos/ColumbianBTS-3.jpg",
  "/images/BTS Photos/Untitled-1.jpg",
];

export default function ImageFlicker() {
  const refs = useRef<(HTMLImageElement | null)[]>([]);
  const current = useRef(0);

  useEffect(() => {
    // Preload all images
    IMAGES.forEach((src) => { const img = new window.Image(); img.src = src; });

    const interval = setInterval(() => {
      const prev = current.current;
      let next = Math.floor(Math.random() * IMAGES.length);
      if (next === prev) next = (prev + 1) % IMAGES.length;

      if (refs.current[prev]) refs.current[prev]!.style.opacity = "0";
      if (refs.current[next]) refs.current[next]!.style.opacity = "1";
      current.current = next;
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", borderRadius: "0.75rem", overflow: "hidden" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMAGES[0]} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
      <div style={{ position: "absolute", inset: 0 }}>
        {IMAGES.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            ref={(el) => { refs.current[i] = el; }}
            src={src}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: i === 0 ? 1 : 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
