"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { techStack, dataSources } from "@/constants/content";

function SkillBar({ name, delay }: { name: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Deterministic width based on tool name for visual variety
  const widths: Record<string, number> = {
    dbt: 90,
    Snowflake: 95,
    Databricks: 80,
    PySpark: 75,
    S3: 85,
    mParticle: 82,
    Redshift: 80,
    SQL: 98,
    Python: 90,
    Statistics: 85,
    Experimentation: 92,
    Optimizely: 85,
    Split: 80,
    Amplitude: 88,
    Tableau: 88,
    Metabase: 82,
    "Claude Code": 78,
  };
  const width = widths[name] || 75;

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-text">{name}</span>
      </div>
      <div className="h-2 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${width}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-20 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-heading font-bold text-text-bright mb-2">
          Tech Stack
        </h2>
        <p className="text-text-muted mb-10">Tools and technologies</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {techStack.map((group, gi) => (
          <motion.div
            key={group.function}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: gi * 0.1 }}
            className="bg-surface border border-border rounded-xl p-6"
          >
            <h3 className="font-heading font-semibold text-primary text-sm uppercase tracking-wider mb-5">
              {group.function}
            </h3>
            <div className="space-y-4">
              {group.tools.map((tool, ti) => (
                <SkillBar
                  key={tool}
                  name={tool}
                  delay={gi * 0.1 + ti * 0.08}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 bg-surface border border-border rounded-xl p-5"
      >
        <p className="text-sm text-text-muted">
          <span className="text-primary font-medium">Data sources: </span>
          {dataSources}
        </p>
      </motion.div>
    </section>
  );
}
