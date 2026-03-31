"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/constants/content";

// Rocket icon SVG — the time-travel vehicle
function RocketIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
      />
    </svg>
  );
}

// Card content shared between desktop and mobile layouts
function CardContent({ exp }: { exp: (typeof experience)[number] }) {
  return (
    <>
      <h3 className="font-heading font-semibold text-text-bright text-lg">
        {exp.company}
      </h3>
      <p className="text-primary text-sm mt-1 font-mono">{exp.role}</p>
      <p className="text-text-muted text-sm mt-1 font-mono">{exp.period}</p>
      <p className="text-text-muted text-sm mt-2 border-t border-border pt-2">
        {exp.domain}
      </p>
      {exp.highlights && (
        <ul className="mt-3 space-y-1.5 border-t border-border pt-3">
          {exp.highlights.map((h, hi) => (
            <li key={hi} className="text-text-muted text-xs leading-relaxed flex gap-2">
              <span className="text-primary mt-1 shrink-0">▸</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// Single experience card with barrel scroll transforms
function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experience)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  // Track this card's scroll position through the viewport
  // 0 = card just entering from bottom, 0.5 = card centered, 1 = card exiting top
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Barrel transforms: entering (0) -> center (0.5) -> exiting (1)
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [45, 0, -45]);
  const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0.3, 0.8, 1, 0.8, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        translateZ,
        opacity,
        scale,
        transformOrigin: "center center",
      }}
      className="relative flex items-start"
    >
      {/* Diamond marker — pulses when in view */}
      <motion.div
        className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rotate-45 z-10 mt-2"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.2 }}
      />

      {/* Desktop: alternating layout */}
      <div className="hidden md:grid md:grid-cols-2 w-full gap-8">
        {isLeft ? (
          <>
            <div className="text-right pr-8">
              <div className="bg-surface border border-border rounded-xl p-6 inline-block text-left hover:border-primary/30 transition-colors max-w-md">
                <CardContent exp={exp} />
              </div>
            </div>
            <div />
          </>
        ) : (
          <>
            <div />
            <div className="pl-8">
              <div className="bg-surface border border-border rounded-xl p-6 inline-block hover:border-primary/30 transition-colors max-w-md">
                <CardContent exp={exp} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mobile: all left-aligned */}
      <div className="md:hidden ml-10">
        <div className="bg-surface border border-border rounded-xl p-5 hover:border-primary/30 transition-colors">
          <CardContent exp={exp} />
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Timeline line draws as you scroll
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);
  // Rocket travels down the timeline
  const rocketY = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section id="experience" className="py-20 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-primary font-mono text-[10px] tracking-[0.3em] uppercase mb-4">
          Professional Chronology
        </p>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-bright tracking-tight mb-10">
          Experience
        </h2>
      </motion.div>

      <div
        ref={containerRef}
        className="relative"
        style={{ perspective: "800px" }}
      >
        {/* Static track line (faint) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border/30 md:-translate-x-px" />

        {/* Animated drawing line (bright) */}
        <motion.div
          className="absolute left-4 md:left-1/2 top-0 w-px bg-primary/60 md:-translate-x-px origin-top"
          style={{ height: lineHeight }}
        />

        {/* Rocket vehicle traveling down the timeline */}
        <motion.div
          className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 text-primary hidden md:block"
          style={{ top: rocketY }}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/10 rounded-full blur-md" />
            <RocketIcon />
          </div>
        </motion.div>

        <div className="space-y-16">
          {experience.map((exp, i) => (
            <ExperienceCard key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
