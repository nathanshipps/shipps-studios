"use client";

import { useRef } from "react";

type Preset = {
  name: string;
  bg?: string;
  fg?: string;
  reset?: boolean; // if true, clear overrides and restore :root defaults
};

const PRESETS: Preset[] = [
  { name: "forest", bg: "#283927", fg: "#39C135" },
  { name: "ocean",  bg: "#00146D", fg: "#1988FF" },
  { name: "ember",  bg: "#301B00", fg: "#FE6F00" },
  { name: "light",  reset: true },
];

const OVERRIDE_VARS = [
  "--bg", "--fg", "--fg-body", "--fg-muted", "--fg-subtle",
  "--fg-faint", "--border", "--accent", "--gradient-from",
];

function applyPreset(preset: Preset) {
  const r = document.documentElement;
  if (preset.reset) {
    OVERRIDE_VARS.forEach((v) => r.style.removeProperty(v));
    r.removeAttribute("data-theme");
    return;
  }
  const { fg, bg } = preset as Required<Preset>;
  r.style.setProperty("--bg", bg);
  r.style.setProperty("--fg", fg);
  r.style.setProperty("--fg-body",   fg + "cc");
  r.style.setProperty("--fg-muted",  fg + "99");
  r.style.setProperty("--fg-subtle", fg + "66");
  r.style.setProperty("--fg-faint",  fg + "33");
  r.style.setProperty("--border",    fg + "22");
  r.style.setProperty("--accent",    fg);
  r.style.setProperty("--gradient-from", bg);
  r.removeAttribute("data-theme");
}

// SVG die face with given pip count
function Die({ pips }: { pips: number }) {
  const pipPositions: Record<number, [number, number][]> = {
    1: [[50, 50]],
    2: [[30, 30], [70, 70]],
    3: [[30, 30], [50, 50], [70, 70]],
    4: [[30, 30], [70, 30], [30, 70], [70, 70]],
    5: [[30, 30], [70, 30], [50, 50], [30, 70], [70, 70]],
    6: [[30, 25], [70, 25], [30, 50], [70, 50], [30, 75], [70, 75]],
  };

  return (
    <svg viewBox="0 0 100 100" width="18" height="18">
      <rect x="5" y="5" width="90" height="90" rx="18" ry="18"
        fill="none" stroke="currentColor" strokeWidth="7" />
      {pipPositions[pips].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="7" fill="currentColor" />
      ))}
    </svg>
  );
}

export default function DiceToggle() {
  const currentRef = useRef<string | null>(null);

  const roll = () => {
    const others = PRESETS.filter((p) => p.name !== currentRef.current);
    const next = others[Math.floor(Math.random() * others.length)];
    currentRef.current = next.name;
    applyPreset(next);
  };

  const d1 = Math.floor(Math.random() * 6) + 1;
  const d2 = Math.floor(Math.random() * 6) + 1;

  return (
    <button
      onClick={roll}
      aria-label="Roll random color theme"
      className="flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-60"
      style={{ color: "var(--fg-subtle)" }}
    >
      <Die pips={d1} />
      <Die pips={d2} />
    </button>
  );
}
