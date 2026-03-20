"use client";

import { useEffect, useRef, useState } from "react";

const W = 320;
const H = 200;
const PADDLE_W = 6;
const PADDLE_H = 48;
const BALL_SIZE = 6;
const PADDLE_SPEED = 4;
const AI_SPEED = 3;

export default function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    playerY: H / 2 - PADDLE_H / 2,
    aiY: H / 2 - PADDLE_H / 2,
    ballX: W / 2,
    ballY: H / 2,
    ballDX: 3,
    ballDY: 2,
    playerScore: 0,
    aiScore: 0,
    keys: { up: false, down: false },
  });
  const rafRef = useRef<number>(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const s = stateRef.current;

    const onKey = (e: KeyboardEvent, down: boolean) => {
      if (e.key === "ArrowUp" || e.key === "w") s.keys.up = down;
      if (e.key === "ArrowDown" || e.key === "s") s.keys.down = down;
    };
    window.addEventListener("keydown", (e) => onKey(e, true));
    window.addEventListener("keyup", (e) => onKey(e, false));

    return () => {
      window.removeEventListener("keydown", (e) => onKey(e, true));
      window.removeEventListener("keyup", (e) => onKey(e, false));
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!started) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const s = stateRef.current;

    const reset = () => {
      s.ballX = W / 2;
      s.ballY = H / 2;
      s.ballDX = (Math.random() > 0.5 ? 1 : -1) * 3;
      s.ballDY = (Math.random() > 0.5 ? 1 : -1) * 2;
    };

    const draw = () => {
      // Move player
      if (s.keys.up) s.playerY = Math.max(0, s.playerY - PADDLE_SPEED);
      if (s.keys.down) s.playerY = Math.min(H - PADDLE_H, s.playerY + PADDLE_SPEED);

      // AI tracks ball
      const aiCenter = s.aiY + PADDLE_H / 2;
      if (aiCenter < s.ballY - 4) s.aiY = Math.min(H - PADDLE_H, s.aiY + AI_SPEED);
      if (aiCenter > s.ballY + 4) s.aiY = Math.max(0, s.aiY - AI_SPEED);

      // Move ball
      s.ballX += s.ballDX;
      s.ballY += s.ballDY;

      // Wall bounce
      if (s.ballY <= 0 || s.ballY >= H - BALL_SIZE) s.ballDY *= -1;

      // Player paddle collision (left)
      if (
        s.ballX <= PADDLE_W + 10 &&
        s.ballY + BALL_SIZE >= s.playerY &&
        s.ballY <= s.playerY + PADDLE_H
      ) {
        s.ballDX = Math.abs(s.ballDX) * 1.05;
        const hit = (s.ballY + BALL_SIZE / 2 - (s.playerY + PADDLE_H / 2)) / (PADDLE_H / 2);
        s.ballDY = hit * 4;
      }

      // AI paddle collision (right)
      if (
        s.ballX >= W - PADDLE_W - 10 - BALL_SIZE &&
        s.ballY + BALL_SIZE >= s.aiY &&
        s.ballY <= s.aiY + PADDLE_H
      ) {
        s.ballDX = -Math.abs(s.ballDX) * 1.05;
        const hit = (s.ballY + BALL_SIZE / 2 - (s.aiY + PADDLE_H / 2)) / (PADDLE_H / 2);
        s.ballDY = hit * 4;
      }

      // Cap speed
      s.ballDX = Math.max(-7, Math.min(7, s.ballDX));
      s.ballDY = Math.max(-6, Math.min(6, s.ballDY));

      // Score
      if (s.ballX < 0) { s.aiScore++; reset(); }
      if (s.ballX > W) { s.playerScore++; reset(); }

      // Draw
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, W, H);

      // Center dashes
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(W / 2, 0);
      ctx.lineTo(W / 2, H);
      ctx.stroke();
      ctx.setLineDash([]);

      // Paddles
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.fillRect(10, s.playerY, PADDLE_W, PADDLE_H);
      ctx.fillRect(W - 10 - PADDLE_W, s.aiY, PADDLE_W, PADDLE_H);

      // Ball
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(s.ballX, s.ballY, BALL_SIZE, BALL_SIZE);

      // Score
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`${s.playerScore}`, W / 2 - 24, 20);
      ctx.fillText(`${s.aiScore}`, W / 2 + 24, 20);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started]);

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{
          border: "1px solid var(--border)",
          display: "block",
          cursor: "default",
        }}
      />
      {!started ? (
        <button
          onClick={() => setStarted(true)}
          className="font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200"
          style={{ color: "var(--fg-faint)" }}
        >
          Play — ↑ ↓ to move
        </button>
      ) : (
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--fg-faint)" }}>
          ↑ ↓ to move
        </p>
      )}
    </div>
  );
}
