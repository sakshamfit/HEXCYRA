"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineMilestone {
  id?: string | number;
  period: string; // e.g. "Step 01" or "2021"
  date?: string;   // e.g. "Discovery & Context"
  title: string;
  description: string;
  category?: string;
  status?: "completed" | "active" | "upcoming";
  accentColor?: string;
}

export interface TimelineProps {
  title?: string;
  periodLabel?: string;
  lead?: string;
  milestones?: TimelineMilestone[];
  backgroundColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  duration?: number;
  className?: string;
  id?: string;
}

const DEFAULT_MILESTONES: TimelineMilestone[] = [
  {
    id: "step-1",
    period: "Step 01",
    date: "Understand",
    title: "Deep Business Discovery",
    description: "We map business context, user audience, existing technical architecture, operational bottlenecks, and clear commercial goals.",
    category: "Strategy",
    status: "completed",
    accentColor: "#a3e635", // lime-400
  },
  {
    id: "step-2",
    period: "Step 02",
    date: "Plan",
    title: "Architecture & Roadmap",
    description: "Detailed system design, interface schematics, scope boundaries, priorities, and an actionable route forward with zero fluff.",
    category: "Architecture",
    status: "completed",
    accentColor: "#38bdf8", // sky-400
  },
  {
    id: "step-3",
    period: "Step 03",
    date: "Build",
    title: "Engineering & Security",
    description: "Design systems, performant frontend code, robust backend services, and built-in security auditing with continuous visible progress.",
    category: "Development",
    status: "active",
    accentColor: "#d946ef", // fuchsia-500
  },
  {
    id: "step-4",
    period: "Step 04",
    date: "Improve",
    title: "Launch, Secure & Scale",
    description: "Production deployment, real-time performance monitoring, proactive threat mitigation, and iterative enhancements that grow with your company.",
    category: "Evolution",
    status: "upcoming",
    accentColor: "#f59e0b", // amber-500
  },
];

export const Timeline: React.FC<TimelineProps> = ({
  title = "The Process",
  periodLabel = "Step 01 — Step 04",
  lead = "No unnecessary layers. We understand the requirement, shape the solution, show you what it looks like, then build and support it.",
  milestones = DEFAULT_MILESTONES,
  backgroundColor = "#000000",
  textColor = "#ffffff",
  mutedTextColor = "#94a3b8",
  activeColor = "#a3e635",
  imageUrl = "/img/work-business.jpg",
  imageAlt = "HEXCYRA process architecture",
  className,
  id = "timeline",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(milestones.length - 1, index));
    setActiveIndex(clamped);

    if (trackRef.current) {
      const card = trackRef.current.children[clamped] as HTMLElement;
      if (card) {
        card.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [milestones.length]);

  const handleNext = () => scrollToIndex(activeIndex + 1);
  const handlePrev = () => scrollToIndex(activeIndex - 1);

  // Sync activeIndex with scroll position
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      const trackCenter = track.scrollLeft + track.offsetWidth / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(trackCenter - cardCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIndex = i;
        }
      });

      setActiveIndex(closestIndex);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id={id}
      ref={containerRef}
      className={cn("relative w-full overflow-hidden py-24 md:py-32", className)}
      style={{ backgroundColor, color: textColor }}
    >
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-40 right-10 h-[32rem] w-[32rem] rounded-full bg-lime-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-10 h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header Row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-12">
          <div className="max-w-2xl">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest ring-1 ring-white/15 backdrop-blur-md"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", color: activeColor }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {periodLabel}
            </span>

            <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.12] tracking-tight md:text-6xl text-white">
              {title}{" "}
              <span className="bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text pr-3 pb-1 inline-block italic text-transparent">
                in motion.
              </span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
              {lead}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous process milestone"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === milestones.length - 1}
              aria-label="Next process milestone"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Timeline Horizontal Progress Bar */}
        <div className="relative mt-12 w-full">
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-lime-400 via-fuchsia-500 to-indigo-400 transition-all duration-500 ease-out"
              style={{
                width: `${((activeIndex + 1) / milestones.length) * 100}%`,
              }}
            />
          </div>

          {/* Stepper Dots */}
          <div className="flex justify-between -mt-2">
            {milestones.map((m, i) => (
              <button
                key={`dot-${m.id || i}`}
                onClick={() => scrollToIndex(i)}
                className="group flex flex-col items-center cursor-pointer focus:outline-none"
              >
                <span
                  className={cn(
                    "h-3.5 w-3.5 rounded-full border-2 transition-all duration-300",
                    i <= activeIndex
                      ? "border-lime-400 bg-lime-400 scale-125 shadow-lg shadow-lime-400/50"
                      : "border-white/30 bg-black group-hover:border-white/60"
                  )}
                />
                <span className="mt-2 text-[10px] font-mono uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">
                  {m.period}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Milestone Track */}
        <div
          ref={trackRef}
          tabIndex={0}
          aria-label="Process timeline track"
          className="no-scrollbar mt-12 flex gap-6 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory focus:outline-none"
        >
          {milestones.map((milestone, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={milestone.id || idx}
                onClick={() => scrollToIndex(idx)}
                className={cn(
                  "group relative shrink-0 snap-center rounded-[2.5rem] border p-8 transition-all duration-500 cursor-pointer",
                  "w-[85vw] sm:w-[420px] md:w-[460px]",
                  isActive
                    ? "border-lime-400/80 bg-white/[0.08] shadow-2xl shadow-lime-400/10 scale-[1.01]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
                )}
              >
                {/* Milestone Card Top Row */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-xl font-mono text-sm font-bold"
                      style={{
                        backgroundColor: isActive ? milestone.accentColor || activeColor : "rgba(255,255,255,0.1)",
                        color: isActive ? "#000000" : "#ffffff",
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-widest text-white/90">
                        {milestone.period}
                      </span>
                      <span className="text-[11px] font-medium text-white/50">
                        {milestone.category}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white/10 text-white/70">
                    {milestone.status === "completed" ? (
                      <CheckCircle2 className="h-3 w-3 text-lime-400" />
                    ) : (
                      <Clock className="h-3 w-3 text-fuchsia-400 animate-spin" />
                    )}
                    {milestone.date}
                  </span>
                </div>

                {/* Milestone Content */}
                <div className="mt-6">
                  <h3 className="font-display text-2xl font-extrabold text-white tracking-tight group-hover:text-lime-300 transition-colors">
                    {milestone.title}
                  </h3>
                  <p
                    className="mt-4 text-sm leading-relaxed"
                    style={{ color: mutedTextColor }}
                  >
                    {milestone.description}
                  </p>
                </div>

                {/* Bottom Stem & Pulse Indicator */}
                <div className="mt-8 flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                    Step {idx + 1} of {milestones.length}
                  </span>
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full transition-all duration-300",
                      isActive ? "bg-lime-400 animate-ping" : "bg-white/20"
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
