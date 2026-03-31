"use client";

import { motion } from "framer-motion";
import { education } from "@/constants/content";

export default function Education() {
  return (
    <section id="education" className="py-20 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-primary font-heading text-[10px] tracking-[0.3em] uppercase mb-4">
          Academic Background
        </p>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-bright tracking-tight mb-10">
          Education
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {education.map((edu, i) => (
          <motion.div
            key={edu.school}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-surface border border-border rounded-xl p-8 hover:border-primary/30 transition-colors text-center"
          >
            {/* School logo */}
            <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-surface-hover border border-border flex items-center justify-center overflow-hidden">
              {edu.school === "USC" ? (
                /* USC interlocking SC - cardinal and gold */
                <svg viewBox="0 0 48 48" className="w-12 h-12">
                  <rect width="48" height="48" fill="#990000" rx="4" />
                  <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="bold" fontSize="22" fill="#FFC72C" letterSpacing="-2">SC</text>
                </svg>
              ) : (
                /* Iowa Hawkeye - black and gold */
                <svg viewBox="0 0 48 48" className="w-12 h-12">
                  <rect width="48" height="48" fill="#000000" rx="4" />
                  {/* Simplified Hawkeye shape */}
                  <ellipse cx="24" cy="24" rx="14" ry="11" fill="#FFCD00" />
                  <ellipse cx="28" cy="22" rx="5" ry="5" fill="#000000" />
                  <ellipse cx="29" cy="21" rx="2" ry="2" fill="#FFCD00" />
                  <path d="M10 24 Q14 14 24 13 Q18 18 16 24 Z" fill="#FFCD00" />
                </svg>
              )}
            </div>
            <h3 className="font-heading font-bold text-text-bright text-lg">
              {edu.school}
            </h3>
            <p className="text-text mt-2">{edu.degree}</p>
            <p className="text-text-muted text-sm mt-1">{edu.year}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
