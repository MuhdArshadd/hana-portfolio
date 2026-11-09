"use client";
import { useEffect, useRef } from "react";

// Sprite layout and behavior adapted from crgimenes/neko (BSD-2-Clause).
// Upstream notice and pinned source revision: /neko/ATTRIBUTION.txt.
const directions = [
  [[3, 0], [3, 1]], [[5, 1], [5, 2]],
  [[6, 3], [7, 2]], [[5, 3], [6, 1]],
  [[4, 2], [4, 3]], [[1, 0], [1, 1]],
  [[1, 2], [1, 3]], [[0, 2], [0, 3]],
];
const size = 48;
export default function CursorCat() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 721px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const pet = ref.current;
    if (!pet) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    let x = 32, y = 32, targetX = 32, targetY = 32;
    let idle = 0, tick = 0, sleeping = false, wakeTicks = 0;
    const draw = (cell: number[]) => {
      pet.style.backgroundPosition = `${-cell[0] * size}px ${-cell[1] * size}px`;
      pet.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
    };
    const stop = () => {
      if (timer !== undefined) clearInterval(timer);
      timer = undefined;
      pet.hidden = true;
      idle = tick = wakeTicks = 0;
      sleeping = false;
    };
    const update = () => {
      tick++;
      const dx = targetX - x, dy = targetY - y;
      const distance = Math.hypot(dx, dy);
      if (distance > 8) {
        if (sleeping) { wakeTicks = 6; sleeping = false; }
        idle = 0;
        if (wakeTicks > 0) { wakeTicks--; draw([7, 3]); return; }
        const direction = Math.round(Math.atan2(dy, dx) / (Math.PI / 4) + 8) % 8;
        const speed = Math.min(12, distance);
        x += dx / distance * speed;
        y += dy / distance * speed;
        draw(directions[direction][Math.floor(tick / 2) % 2]);
      } else {
        idle++;
        if (idle < 20) draw([7, 3]);
        else if (idle < 40) draw(Math.floor(tick / 3) % 2 ? [5, 0] : [6, 0]);
        else if (idle < 55) draw([7, 0]);
        else if (idle < 70) draw([3, 2]);
        else { sleeping = true; draw(Math.floor(tick / 6) % 2 ? [2, 0] : [2, 1]); }
      }
    };
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse" || document.hidden) return;
      targetX = Math.max(0, Math.min(window.innerWidth - size, event.clientX - size - 12));
      targetY = Math.max(0, Math.min(window.innerHeight - size, event.clientY + 16));
      if (timer === undefined) {
        x = Math.max(0, Math.min(window.innerWidth - size, targetX - 100));
        y = Math.max(0, Math.min(window.innerHeight - size, targetY + 60));
        pet.hidden = false;
        draw([7, 3]);
        timer = setInterval(update, 100);
      }
    };
    const changed = () => { if (!media.matches) stop(); };
    const visibility = () => { if (document.hidden) stop(); };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", stop);
    window.addEventListener("blur", stop);
    window.addEventListener("resize", stop);
    document.addEventListener("visibilitychange", visibility);
    media.addEventListener("change", changed);
    return () => {
      stop();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", stop);
      window.removeEventListener("blur", stop);
      window.removeEventListener("resize", stop);
      document.removeEventListener("visibilitychange", visibility);
      media.removeEventListener("change", changed);
    };
  }, []);
  return <div ref={ref} className="cursor-cat" hidden aria-hidden="true"/>;
}
