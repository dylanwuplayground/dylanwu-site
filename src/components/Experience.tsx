"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useMemo, useState } from "react";
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

function RoleContent({
  role,
  period,
  domain,
  highlights,
}: {
  role: string;
  period: string;
  domain?: string;
  highlights: string[];
}) {
  return (
    <>
      <p className="text-primary text-base mt-2 font-mono">{role}</p>
      <p className="text-text-muted text-base mt-1 font-mono">{period}</p>
      {domain && (
        <p className="text-text-muted text-sm mt-1">{domain}</p>
      )}
      {highlights.length > 0 && (
        <ul className="mt-3 space-y-2 border-t border-border pt-3">
          {highlights.map((h, hi) => (
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

function CardContent({ exp }: { exp: (typeof experience)[number] }) {
  return (
    <>
      <h3 className="font-heading font-bold text-text-bright text-2xl">
        {exp.company}
      </h3>
      <p className="text-primary text-base mt-2 font-mono">{exp.role}</p>
      <p className="text-text-muted text-base mt-1 font-mono">{exp.period}</p>
      <p className="text-text-muted text-sm mt-1">{exp.domain}</p>
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

  // Drum effect: scale + Y-offset + opacity only (no rotateX = sharp text)
  // scaleY compresses cards at edges = cylinder surface illusion
  const y = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [100, 25, 0, -25, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.82, 0.94, 1, 0.94, 0.82]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35, 0.65, 0.8, 1],
    [0, 0.5, 1, 1, 0.5, 0],
  );

  // SubRole crossfade: trigger around 0.35–0.45 to align with ~2022 on timeline
  const role1Opacity = useTransform(scrollYProgress, [0.35, 0.45], [1, 0]);
  const role2Opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);

  const hasSubRole = !!exp.subRole;

  return (
    <motion.div
      ref={cardRef}
      style={{
        y,
        scale,
        opacity,
        transformOrigin: "center center",
      }}
      className="bg-surface border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
    >
      {hasSubRole ? (
        <>
          <h3 className="font-heading font-bold text-text-bright text-2xl">
            {exp.company}
          </h3>

          {/* Crossfade container for role content */}
          <div className="relative">
            {/* Role 1 (primary) */}
            <motion.div style={{ opacity: role1Opacity }}>
              <RoleContent
                role={exp.role}
                period={exp.period}
                domain={exp.domain}
                highlights={exp.highlights ?? []}
              />
            </motion.div>

            {/* Role 2 (subRole) — absolute-positioned to overlap */}
            <motion.div
              className="absolute inset-0"
              style={{ opacity: role2Opacity }}
            >
              <RoleContent
                role={exp.subRole!.role}
                period={exp.subRole!.period}
                domain={exp.domain}
                highlights={exp.subRole!.highlights ?? []}
              />
            </motion.div>
          </div>
        </>
      ) : (
        <CardContent exp={exp} />
      )}
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

// Directional rocket that follows scroll and flips based on direction
function DirectionalRocket({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [scrollDir, setScrollDir] = useState<"down" | "up">("down");
  const prevProgress = useRef(0);

  // Track scroll direction
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > prevProgress.current + 0.001) {
      setScrollDir("down");
    } else if (latest < prevProgress.current - 0.001) {
      setScrollDir("up");
    }
    prevProgress.current = latest;
  });

  // Rocket position follows scroll
  const rocketTop = useTransform(scrollYProgress, [0.05, 0.9], ["0%", "100%"]);
  // Trail follows rocket position
  const trailProgress = useTransform(scrollYProgress, [0.05, 0.9], [0, 100]);

  return (
    <>
      {/* Trail line — switches sides based on scroll direction */}
      {/* Scrolling down: trail above rocket (top-anchored) */}
      <motion.div
        className="absolute w-[2px] origin-top"
        style={{
          left: "140px",
          top: 0,
          height: useTransform(trailProgress, (v) => `${v}%`),
          translateX: "-0.5px",
          opacity: scrollDir === "down" ? 1 : 0,
          background: "linear-gradient(to bottom, transparent, var(--color-primary))",
        }}
      />
      {/* Scrolling up: trail below rocket (bottom-anchored) */}
      <motion.div
        className="absolute w-[2px] origin-bottom"
        style={{
          left: "140px",
          bottom: 0,
          height: useTransform(trailProgress, (v) => `${100 - v}%`),
          translateX: "-0.5px",
          opacity: scrollDir === "up" ? 1 : 0,
          background: "linear-gradient(to top, transparent, var(--color-primary))",
        }}
      />

      {/* Rocket icon */}
      <motion.div
        className="absolute z-20"
        style={{
          left: "140px",
          top: rocketTop,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{ rotate: scrollDir === "down" ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 drop-shadow-[0_0_6px_rgba(194,109,77,0.6)]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              className="text-primary"
            />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // lineHeight removed — replaced by rocket trail

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

          {/* --- Directional rocket + trail --- */}
          <DirectionalRocket scrollYProgress={scrollYProgress} />

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
