"use client";

import React from "react";
import Timeline from "@/components/ui/timeline";

const settings = {
  textColor: "var(--color-foreground, #ffffff)",
  mutedTextColor: "var(--color-muted-foreground, #a1a1aa)",
  activeColor: "#a3e635",
  backgroundColor: "var(--color-background, #0a0a0a)",
  duration: 1.4,
};

export default function TimelineDemo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  return (
    <main className="bg-black text-white">
      <section className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
          Product roadmap
        </p>
        <h1 className="max-w-[18ch] text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl text-white">
          The Process in Motion.
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-white/60">
          Follow the journey from understanding requirements to launch and continuous optimization.
        </p>
      </section>

      <Timeline
        title="Our Execution Process"
        periodLabel="Step 01 — Step 04"
        backgroundColor={s.backgroundColor}
        textColor={s.textColor}
        mutedTextColor={s.mutedTextColor}
        activeColor={s.activeColor}
        duration={s.duration}
      />
    </main>
  );
}
