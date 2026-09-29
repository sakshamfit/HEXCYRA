"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export interface Walker {
  x: number;
  y: number;
  speed: number;
  direction: 1 | -1; // 1 = right, -1 = left
  scale: number;
  phase: number;
  strideSpeed: number;
  height: number;
  color: string;
  clothingColor: string;
  hasBag: boolean;
  hasHat: boolean;
}

const PALETTE = [
  { body: "#a3e635", clothes: "#4d7c0f" }, // lime
  { body: "#d946ef", clothes: "#86198f" }, // fuchsia
  { body: "#38bdf8", clothes: "#0369a1" }, // sky
  { body: "#fbbf24", clothes: "#b45309" }, // amber
  { body: "#f43f5e", clothes: "#9f1239" }, // rose
  { body: "#94a3b8", clothes: "#334155" }, // slate
  { body: "#ffffff", clothes: "#475569" }, // white / charcoal
];

export interface CrowdCanvasProps {
  className?: string;
  density?: number;
  walkerSpeed?: number;
  height?: number | string;
}

export const CrowdCanvas: React.FC<CrowdCanvasProps> = ({
  className,
  density = 28,
  walkerSpeed = 1,
  height = "100%",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const walkersRef = useRef<Walker[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let heightPx = (canvas.height = canvas.parentElement?.clientHeight || 240);

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = window.devicePixelRatio || 1;
      width = canvas.parentElement.clientWidth;
      heightPx = canvas.parentElement.clientHeight || 240;
      canvas.width = width * dpr;
      canvas.height = heightPx * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize walkers with varied depth, styles and directions
    const walkers: Walker[] = [];
    for (let i = 0; i < density; i++) {
      const scale = 0.5 + Math.random() * 0.7; // 0.5 (back) to 1.2 (front)
      const direction = Math.random() > 0.5 ? 1 : -1;
      const colors = PALETTE[Math.floor(Math.random() * PALETTE.length)];

      walkers.push({
        x: Math.random() * width,
        y: heightPx * 0.45 + Math.random() * (heightPx * 0.45),
        speed: (0.6 + Math.random() * 0.9) * walkerSpeed * (scale * 0.9),
        direction,
        scale,
        phase: Math.random() * Math.PI * 2,
        strideSpeed: 0.08 + Math.random() * 0.04,
        height: 38 + Math.random() * 8,
        color: colors.body,
        clothingColor: colors.clothes,
        hasBag: Math.random() > 0.6,
        hasHat: Math.random() > 0.7,
      });
    }

    walkersRef.current = walkers;

    // Check prefers-reduced-motion
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Render loop driven by GSAP ticker for precision timing
    const render = () => {
      ctx.clearRect(0, 0, width, heightPx);

      // Sort walkers by Y position so characters in front render over characters in back
      walkers.sort((a, b) => a.y - b.y);

      for (const w of walkers) {
        if (!reducedMotion) {
          w.x += w.speed * w.direction;
          w.phase += w.strideSpeed;

          // Wrap around edges seamlessly
          if (w.direction === 1 && w.x > width + 40) {
            w.x = -40;
          } else if (w.direction === -1 && w.x < -40) {
            w.x = width + 40;
          }
        }

        ctx.save();
        ctx.translate(w.x, w.y);
        ctx.scale(w.direction * w.scale, w.scale);

        // Ground shadow
        ctx.beginPath();
        ctx.ellipse(0, 0, 10, 3, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
        ctx.fill();

        // Walking kinematics (leg swing & arm swing)
        const leftLegAngle = Math.sin(w.phase) * 0.45;
        const rightLegAngle = Math.sin(w.phase + Math.PI) * 0.45;
        const leftArmAngle = Math.sin(w.phase + Math.PI) * 0.35;
        const rightArmAngle = Math.sin(w.phase) * 0.35;

        // Legs
        ctx.lineWidth = 3;
        ctx.lineCap = "round";

        // Back leg
        ctx.strokeStyle = w.clothingColor;
        ctx.beginPath();
        ctx.moveTo(0, -18);
        ctx.lineTo(Math.sin(leftLegAngle) * 18, 0);
        ctx.stroke();

        // Front leg
        ctx.strokeStyle = w.color;
        ctx.beginPath();
        ctx.moveTo(0, -18);
        ctx.lineTo(Math.sin(rightLegAngle) * 18, 0);
        ctx.stroke();

        // Torso / Jacket
        ctx.fillStyle = w.clothingColor;
        ctx.beginPath();
        ctx.roundRect(-4.5, -36, 9, 18, 3);
        ctx.fill();

        // Back Arm
        ctx.strokeStyle = w.clothingColor;
        ctx.beginPath();
        ctx.moveTo(-1, -32);
        ctx.lineTo(Math.sin(leftArmAngle) * 12, -22);
        ctx.stroke();

        // Head
        ctx.fillStyle = w.color;
        ctx.beginPath();
        ctx.arc(0, -42, 5, 0, Math.PI * 2);
        ctx.fill();

        // Optional Hat
        if (w.hasHat) {
          ctx.fillStyle = w.clothingColor;
          ctx.beginPath();
          ctx.ellipse(0, -45, 6, 2, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        // Front Arm
        ctx.strokeStyle = w.color;
        ctx.beginPath();
        ctx.moveTo(1, -32);
        ctx.lineTo(Math.sin(rightArmAngle) * 12, -22);
        ctx.stroke();

        // Optional Bag / Laptop
        if (w.hasBag) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(Math.sin(rightArmAngle) * 10 - 2, -24, 4, 6);
        }

        ctx.restore();
      }
    };

    gsap.ticker.add(render);

    return () => {
      gsap.ticker.remove(render);
      window.removeEventListener("resize", resize);
    };
  }, [density, walkerSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ height }}
    />
  );
};

export interface Skiper39Props {
  className?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  density?: number;
}

export const Skiper39: React.FC<Skiper39Props> = ({
  className,
  badge = "Global Crowd",
  title = "Building for everyone, everywhere.",
  subtitle = "From startups to global enterprises, thousands walk with us every day.",
  density = 32,
}) => {
  return (
    <div className={cn("relative w-full overflow-hidden bg-black py-16", className)}>
      {/* Background Street Horizon */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 border-t border-white/10 bg-gradient-to-t from-white/[0.04] to-transparent" />

      {/* The Lively Animated Walking Crowd */}
      <CrowdCanvas density={density} className="z-0 opacity-80" />

      {/* Optional Foreground Banner Overlay */}
      {(title || subtitle) && (
        <div className="relative z-10 mx-auto max-w-7xl px-6 pointer-events-none text-center">
          {badge && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-lime-400 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-pulse" />
              {badge}
            </span>
          )}

          {title && (
            <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              {title}
            </h3>
          )}

          {subtitle && (
            <p className="mt-2 text-sm text-white/50 max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Skiper39;
