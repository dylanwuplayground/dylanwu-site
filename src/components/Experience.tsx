"use client";

import { motion } from "framer-motion";
import { experience } from "@/constants/content";

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-primary font-heading text-[10px] tracking-[0.3em] uppercase mb-4">
          Professional Chronology
        </p>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-bright tracking-tight mb-12">
          Experience
        </h2>
      </motion.div>

      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

        <div className="space-y-12">
          {experience.map((exp, i) => {
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex items-start"
              >
                {/* Diamond marker */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rotate-45 z-10 mt-2" />

                {/* Desktop: alternating layout */}
                <div className={`hidden md:grid md:grid-cols-2 w-full gap-8 ${isLeft ? "" : ""}`}>
                  {isLeft ? (
                    <>
                      <div className="text-right pr-8">
                        <div className="bg-surface border border-border rounded-xl p-6 inline-block text-left hover:border-primary/30 transition-colors max-w-md">
                          <h3 className="font-heading font-semibold text-text-bright text-lg">
                            {exp.company}
                          </h3>
                          <p className="text-primary text-sm mt-1">{exp.role}</p>
                          <p className="text-text-muted text-sm mt-1">{exp.period}</p>
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
                        </div>
                      </div>
                      <div />
                    </>
                  ) : (
                    <>
                      <div />
                      <div className="pl-8">
                        <div className="bg-surface border border-border rounded-xl p-6 inline-block hover:border-primary/30 transition-colors max-w-md">
                          <h3 className="font-heading font-semibold text-text-bright text-lg">
                            {exp.company}
                          </h3>
                          <p className="text-primary text-sm mt-1">{exp.role}</p>
                          <p className="text-text-muted text-sm mt-1">{exp.period}</p>
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
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile: all left-aligned */}
                <div className="md:hidden ml-10">
                  <div className="bg-surface border border-border rounded-xl p-5 hover:border-primary/30 transition-colors">
                    <h3 className="font-heading font-semibold text-text-bright">
                      {exp.company}
                    </h3>
                    <p className="text-primary text-sm mt-1">{exp.role}</p>
                    <p className="text-text-muted text-sm mt-1">{exp.period}</p>
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
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
