"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { experience } from "@/constants/content";

// ---------------------------------------------------------------------------
// Helpers: parse year ranges from period strings like "Mar 2025 – Present"
// ---------------------------------------------------------------------------

const MONTH_MAP: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

function parsePreciseRange(period: string): { start: number; end: number } {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const isPresent = /present/i.test(period);

  const matches = [...period.matchAll(/([A-Za-z]{3})\s+(\d{4})/g)];
  if (matches.length === 0) return { start: currentYear, end: currentYear + 1 };

  const startMonth = MONTH_MAP[matches[0][1].toLowerCase()] ?? 0;
  const startYear = Number(matches[0][2]);
  const start = startYear + startMonth / 12;

  if (isPresent) {
    return { start, end: currentYear + (currentMonth + 1) / 12 };
  }

  if (matches.length >= 2) {
    const endMonth = MONTH_MAP[matches[1][1].toLowerCase()] ?? 0;
    const endYear = Number(matches[1][2]);
    return { start, end: endYear + (endMonth + 1) / 12 };
  }

  return { start, end: start + 1 };
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TimelineRole {
  exp: (typeof experience)[number];
  preciseStart: number;
  preciseEnd: number;
  duration: number;
}

// ---------------------------------------------------------------------------
// Card content (kept from original)
// ---------------------------------------------------------------------------

function CardContent({ exp }: { exp: (typeof experience)[number] }) {
  return (
    <>
      <h3 className="font-heading font-semibold text-text-bright text-xl">
        {exp.company}
      </h3>
      <p className="text-primary text-sm mt-1.5 font-mono">{exp.role}</p>
      <p className="text-text-muted text-sm mt-1 font-mono">{exp.period}</p>
      <p className="text-text-muted text-sm mt-3 border-t border-border pt-3">
        {exp.domain}
      </p>
      {exp.highlights && (
        <ul className="mt-3 space-y-2 border-t border-border pt-3">
          {exp.highlights.map((h, hi) => (
            <li
              key={hi}
              className="text-text-muted text-sm leading-relaxed flex gap-2"
            >
              <span className="text-primary mt-1 shrink-0">▸</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Single experience card with barrel scroll transforms
// ---------------------------------------------------------------------------

function ExperienceCard({ exp }: { exp: (typeof experience)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Cylinder/drum rotation: cards bend around a barrel surface
  // Outer wrapper rotates in 3D, inner card stays flat for sharp text
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [40, 12, 0, -12, -40]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [60, 15, 0, -15, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.88, 0.96, 1, 0.96, 0.88]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.7, 0.85, 1],
    [0, 0.4, 1, 1, 0.4, 0],
  );

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        y,
        scale,
        opacity,
        transformOrigin: "center center",
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
      }}
    >
      {/* Inner card: force own compositing layer to keep text sharp */}
      <div
        className="bg-surface border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
        style={{
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      >
        <CardContent exp={exp} />
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Compute which year labels each role "owns" (no duplicates across roles)
// ---------------------------------------------------------------------------

function computeYearLabelsForRoles(roles: TimelineRole[]) {
  const currentYear = new Date().getFullYear();
  const claimed = new Set<number>();
  // Track if "Present" has already been used
  let presentClaimed = false;

  return roles.map((role) => {
    // Cap endCeil at currentYear to avoid showing future years (2027, etc.)
    const endCeil = Math.min(Math.ceil(role.preciseEnd), currentYear);
    const startFloor = Math.floor(role.preciseStart);
    const ownedYears: { year: number; label: string; posPercent: number }[] = [];

    // If this role spans into the present, add a "Present" marker at the top
    const isCurrentRole = role.preciseEnd >= currentYear;
    if (isCurrentRole && !presentClaimed) {
      presentClaimed = true;
      ownedYears.push({ year: currentYear + 1, label: "Present", posPercent: 0 });
    }

    for (let y = endCeil; y >= startFloor; y--) {
      if (claimed.has(y)) continue;
      claimed.add(y);

      // Skip the current year if "Present" already represents it for this role
      if (isCurrentRole && y === currentYear) continue;

      // Position within this role's band: 0% = top (recent), 100% = bottom (old)
      const pos =
        role.duration > 0.1
          ? Math.max(0, Math.min(1, (role.preciseEnd - y) / role.duration))
          : 0.5;

      ownedYears.push({ year: y, label: String(y), posPercent: pos * 100 });
    }

    return ownedYears;
  });
}

// ---------------------------------------------------------------------------
// Main Experience component
// ---------------------------------------------------------------------------

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Drawing line animation
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  // Build timeline model
  const roles: TimelineRole[] = useMemo(
    () =>
      experience.map((exp) => {
        const precise = parsePreciseRange(exp.period);
        return {
          exp,
          preciseStart: precise.start,
          preciseEnd: precise.end,
          duration: precise.end - precise.start,
        };
      }),
    [],
  );

  const yearLabelsPerRole = useMemo(
    () => computeYearLabelsForRoles(roles),
    [roles],
  );

  return (
    <section id="experience" className="py-20 px-6 md:px-12 text-center md:text-left">
      {/* Section header */}
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

      {/* ============================================================= */}
      {/* DESKTOP LAYOUT: year markers left | timeline | cards right     */}
      {/* ============================================================= */}
      <div
        ref={containerRef}
        className="relative hidden md:block max-w-4xl mx-auto"
        style={{ perspective: "600px" }}
      >
        <div className="relative">
          {/* --- Static track line (faint) --- */}
          <div
            className="absolute top-0 bottom-0 w-px bg-border/30"
            style={{ left: "140px" }}
          />

          {/* --- Animated drawing line (bright) --- */}
          <motion.div
            className="absolute top-0 w-px bg-primary/60 origin-top"
            style={{ left: "140px", height: lineHeight }}
          />

          {/* --- Role rows --- */}
          <div className="space-y-20">
            {roles.map((role, i) => {
              const yearLabels = yearLabelsPerRole[i];

              return (
                <div
                  key={role.exp.company}
                  className="relative grid"
                  style={{
                    gridTemplateColumns: "140px 30px 1fr",
                  }}
                >
                  {/* LEFT COLUMN: year markers stacked vertically */}
                  <div className="relative flex flex-col justify-between py-2">
                    {yearLabels.map((ym) => (
                      <div
                        key={ym.year}
                        className="flex items-center"
                      >
                        <span className="font-mono text-2xl font-bold text-text-muted/60 text-right pr-4 flex-1 select-none">
                          {ym.label}
                        </span>
                        {/* Tick mark */}
                        <div className="w-3 h-px bg-text-muted/40 shrink-0" />
                      </div>
                    ))}
                  </div>

                  {/* CENTER COLUMN: diamond on the timeline */}
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      className="w-3 h-3 bg-primary rotate-45 z-10"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    />
                  </div>

                  {/* RIGHT COLUMN: card */}
                  <div className="pl-4">
                    <div className="max-w-xl">
                      <ExperienceCard exp={role.exp} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* MOBILE LAYOUT: year range above card, stacked vertically       */}
      {/* ============================================================= */}
      <div className="md:hidden space-y-10" style={{ perspective: "600px" }}>
        {roles.map((role) => {
          const isPresent = /present/i.test(role.exp.period);
          // Extract years directly from the period string for clean labels
          const periodYears = role.exp.period.match(/\d{4}/g)?.map(Number) ?? [];
          const startLabel = String(periodYears[0] ?? Math.floor(role.preciseStart));
          const endLabel = isPresent ? "Present" : String(periodYears[1] ?? periodYears[0]);
          const yearLabel =
            endLabel === startLabel ? endLabel : `${endLabel} \u2013 ${startLabel}`;

          return (
            <div key={role.exp.company}>
              {/* Year range */}
              <p className="font-mono text-xl font-bold text-text-muted/60 mb-3">
                {yearLabel}
              </p>

              {/* Diamond + connecting line */}
              <div className="flex items-center gap-2 mb-3">
                <motion.div
                  className="w-2.5 h-2.5 bg-primary rotate-45 shrink-0"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
                <div className="h-px flex-1 bg-border/40" />
              </div>

              <ExperienceCard exp={role.exp} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
