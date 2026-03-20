"use client";

import { useEffect, useRef, useState } from "react";

const COLS = 32;
const ROWS = 20;
const CELL = 10;
const W = COLS * CELL;
const H = ROWS * CELL;
const TICK = 100;

type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Point = { x: number; y: number };

function rand() {
  return { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef({
    snake: [{ x: 16, y: 10 }] as Point[],
    dir: "RIGHT" as Dir,
    nextDir: "RIGHT" as Dir,
    food: rand(),
    alive: true,
    score: 0,
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [dead, setDead] = useState(false);

  const start = () => {
    const g = gameRef.current;
    g.snake = [{ x: 16, y: 10 }];
    g.dir = "RIGHT";
    g.nextDir = "RIGHT";
    g.food = rand();
    g.alive = true;
    g.score = 0;
    setScore(0);
    setDead(false);
    setStarted(true);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const g = gameRef.current;
      if (e.key === "ArrowUp"    || e.key === "w") { if (g.dir !== "DOWN")  g.nextDir = "UP"; }
      if (e.key === "ArrowDown"  || e.key === "s") { if (g.dir !== "UP")    g.nextDir = "DOWN"; }
      if (e.key === "ArrowLeft"  || e.key === "a") { if (g.dir !== "RIGHT") g.nextDir = "LEFT"; }
      if (e.key === "ArrowRight" || e.key === "d") { if (g.dir !== "LEFT")  g.nextDir = "RIGHT"; }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!started) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const g = gameRef.current;

    const tick = () => {
      if (!g.alive) return;
      g.dir = g.nextDir;

      const head = g.snake[0];
      const next: Point = {
        x: (head.x + (g.dir === "RIGHT" ? 1 : g.dir === "LEFT" ? -1 : 0) + COLS) % COLS,
        y: (head.y + (g.dir === "DOWN"  ? 1 : g.dir === "UP"   ? -1 : 0) + ROWS) % ROWS,
      };

      // Self collision
      if (g.snake.some((s) => s.x === next.x && s.y === next.y)) {
        g.alive = false;
        setDead(true);
        return;
      }

      g.snake.unshift(next);
      if (next.x === g.food.x && next.y === g.food.y) {
        g.score++;
        setScore(g.score);
        // Ensure food doesn't spawn on snake
        let f: Point;
        do { f = rand(); } while (g.snake.some((s) => s.x === f.x && s.y === f.y));
        g.food = f;
      } else {
        g.snake.pop();
      }

      // Draw
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, W, H);

      // Food
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.fillRect(g.food.x * CELL + 2, g.food.y * CELL + 2, CELL - 4, CELL - 4);

      // Snake
      g.snake.forEach((seg, i) => {
        const alpha = i === 0 ? 1 : Math.max(0.2, 1 - i / g.snake.length);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
      });
    };

    // Initial draw
    const canvas2 = canvasRef.current;
    if (canvas2) {
      const c = canvas2.getContext("2d")!;
      c.fillStyle = "#0a0a0a";
      c.fillRect(0, 0, W, H);
    }

    intervalRef.current = setInterval(tick, TICK);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [started]);

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{ border: "1px solid var(--border)", display: "block" }}
      />
      <div className="flex items-center gap-6">
        {!started || dead ? (
          <button
            onClick={start}
            className="font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200"
            style={{ color: "var(--fg-faint)" }}
          >
            {dead ? `Game over · ${score} · Play again` : "Play — arrow keys to move"}
          </button>
        ) : (
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--fg-faint)" }}>
            Score: {score} · Arrow keys to move
          </p>
        )}
      </div>
    </div>
  );
}
