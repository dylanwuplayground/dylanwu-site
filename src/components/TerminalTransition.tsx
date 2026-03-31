"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function TerminalTransition({ command }: { command: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    if (typed.length >= command.length) {
      setDone(true);
      return;
    }

    const timer = setTimeout(() => {
      setTyped(command.slice(0, typed.length + 1));
    }, 25 + Math.random() * 30);

    return () => clearTimeout(timer);
  }, [isInView, typed, command]);

  return (
    <div ref={ref} className="py-6 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="font-mono text-xs text-text-muted/50"
      >
        <span className="text-primary/60">$</span>{" "}
        <span>{typed}</span>
        {!done && (
          <span className="inline-block w-[6px] h-[14px] bg-primary/60 ml-0.5 animate-pulse align-text-bottom" />
        )}
        {done && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-green-500/60 ml-2"
          >
            OK
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
