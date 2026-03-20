"use client";

import { useEffect, useState } from "react";

export default function ClockWidget() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZoneName: "short",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <p className="font-mono text-[10px] tracking-[0.15em]" style={{ color: "var(--fg-faint)" }}>
      {time}
    </p>
  );
}
