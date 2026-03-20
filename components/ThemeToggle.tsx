"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex items-center gap-2 group"
    >
      {/* Label */}
      <span
        className="font-mono text-[10px] tracking-[0.15em] uppercase transition-colors duration-300"
        style={{ color: "var(--fg-subtle)" }}
      >
        {isDark ? "Dark" : "Light"}
      </span>

      {/* Pill */}
      <div
        className="relative w-9 h-[18px] rounded-full transition-all duration-500"
        style={{
          background: isDark ? "var(--fg)" : "transparent",
          border: "1px solid var(--fg-subtle)",
        }}
      >
        {/* Knob */}
        <div
          className="absolute top-[2px] w-[13px] h-[13px] rounded-full transition-all duration-500"
          style={{
            background: isDark ? "var(--bg)" : "var(--fg)",
            left: isDark ? "calc(100% - 15px)" : "2px",
          }}
        />
      </div>
    </button>
  );
}
