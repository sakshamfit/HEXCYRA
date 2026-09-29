"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ==========================================================================
   Animated hero — the rolling-word headline pattern from Tommy Jepsen's
   "Animated hero" (twblocks hero5, MIT).

   A static phrase sits in the heading and one word at a time rolls up into
   an overflow-hidden line while the outgoing word exits downward. Words are
   stacked; the active one sits at translateY(0) and the others are parked a
   full line above or below.

   Implementation note: the original animates this with framer-motion's
   `motion.span` + a spring. Here the same motion is expressed with a CSS
   transition on `transform`/`opacity` using the site's overshoot curve
   (cubic-bezier(0.34, 1.56, 0.64, 1)), which reproduces the spring visually
   while keeping framer-motion — 46 kB gzipped — out of the critical path.
   The lazy showcase band still uses framer-motion for the 3D scroll morph.
   ========================================================================== */

export interface AnimatedHeroAction {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "secondary" | "outline" | "ghost";
}

export interface AnimatedHeroProps {
  /** Static phrase that the rolling word continues. */
  staticText: string;
  /** Words that roll through the second line. */
  words: string[];
  /** Optional supporting paragraph. */
  paragraph?: string;
  /** Optional small line rendered under the paragraph. */
  note?: string;
  primaryAction?: AnimatedHeroAction;
  secondaryAction?: AnimatedHeroAction;
  /** Dwell time per word, in ms. */
  interval?: number;
  className?: string;
  /** Sizing hooks so the same component works at hero and section scale. */
  headingClassName?: string;
  rollingClassName?: string;
}

export default function AnimatedHero({
  staticText,
  words,
  paragraph,
  note,
  primaryAction,
  secondaryAction,
  interval = 2600,
  className,
  headingClassName,
  rollingClassName,
}: AnimatedHeroProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  const renderAction = (action: AnimatedHeroAction, key: string) => {
    const Comp = action.href ? "a" : "button";
    return (
      <Button
        key={key}
        asChild
        variant={action.variant ?? "default"}
        size="lg"
        className="rounded-full"
      >
        <Comp href={action.href} onClick={action.onClick}>
          {action.label}
        </Comp>
      </Button>
    );
  };

  return (
    <div className={cn("block", className)}>
      <h2 className={cn("font-display font-extrabold tracking-tight", headingClassName)}>
        <span className="block">{staticText}</span>

        {/* Rolling word — the line is clipped so words roll in and out of it. */}
        <span
          className={cn("relative block overflow-hidden align-bottom", rollingClassName)}
          aria-live="polite"
        >
          {words.map((word, i) => {
            const active = i === index;
            return (
              <span
                key={word}
                aria-hidden={active ? "false" : "true"}
                className={cn(
                  "absolute inset-x-0 top-0 block transition-[transform,opacity] duration-700 ease-pop will-change-transform",
                  active ? "opacity-100" : "opacity-0",
                )}
                style={{
                  transform: active
                    ? "translateY(0%)"
                    : `translateY(${i > index ? "100%" : "-100%"})`,
                }}
              >
                <span className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 bg-clip-text pr-4 italic text-transparent">
                  {word}
                </span>
              </span>
            );
          })}
        </span>
      </h2>

      {paragraph && (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
          {paragraph}
        </p>
      )}

      {note && (
        <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          {note}
        </p>
      )}

      {(primaryAction || secondaryAction) && (
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {primaryAction && renderAction(primaryAction, "primary")}
          {secondaryAction && renderAction(secondaryAction, "secondary")}
        </div>
      )}
    </div>
  );
}
