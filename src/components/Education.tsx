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
            <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-surface-hover border border-border flex items-center justify-center overflow-hidden p-2">
              <img
                src={edu.school === "USC" ? "/logos/usc_logo.png" : "/logos/iowa.png"}
                alt={`${edu.school} logo`}
                className="w-full h-full object-contain"
              />
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
