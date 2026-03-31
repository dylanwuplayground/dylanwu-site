"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { hero } from "@/constants/content";

function TypingAnimation({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, 30 + Math.random() * 40);

    return () => clearTimeout(timer);
  }, [displayed, started, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-primary ml-0.5 animate-pulse align-text-bottom" />
      )}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center px-6 md:px-12 overflow-hidden">
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20 opacity-[0.015]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />

      {/* Background data viz simulation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-primary"
              style={{
                top: `${5 + i * 5}%`,
                left: 0,
                right: 0,
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, delay: i * 0.1, ease: "easeOut" }}
            />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute w-px bg-primary"
              style={{
                left: `${6.66 + i * 6.66}%`,
                top: 0,
                bottom: 0,
              }}
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 2, delay: 0.5 + i * 0.1, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading text-[10px] tracking-[0.3em] uppercase mb-6">
            {hero.location}
          </p>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl md:text-7xl font-heading font-bold text-text-bright tracking-tighter mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {hero.name}
        </motion.h1>

        {/* Big statement tagline — Stitch style with color accents */}
        <motion.h2
          className="text-4xl md:text-6xl font-heading font-bold leading-[1.05] tracking-tight mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="text-primary italic">Analytics Leader</span>
          <span className="text-text-bright"> &amp; </span>
          <span className="text-primary italic">AI Builder.</span>
          <br />
          <span className="text-text-muted/70 text-2xl md:text-3xl font-normal tracking-normal leading-relaxed mt-2 block min-h-[3rem]">
            <TypingAnimation text="10 years building data-driven cultures at high-growth startups." delay={1200} />
          </span>
        </motion.h2>

        <motion.div
          className="flex gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <a
            href="#contact"
            className="px-8 py-4 bg-primary hover:bg-primary-hover text-text-bright font-bold text-sm tracking-widest uppercase transition-colors"
          >
            Get in Touch
          </a>
          <a
            href="#expertise"
            className="px-8 py-4 bg-surface border border-border hover:border-primary/50 text-text-bright font-bold text-sm tracking-widest uppercase transition-colors"
          >
            Expertise
          </a>
        </motion.div>
      </div>
    </section>
  );
}
