"use client";

import { useState, useEffect } from "react";

export default function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Los_Angeles",
          hour12: false,
        })
      );
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] z-40 bg-background/80 backdrop-blur-xl border-b border-border font-mono text-[10px] tracking-[0.2em] uppercase flex justify-between items-center px-6 md:px-8 h-10">
      <div className="flex items-center gap-4">
        <span className="text-text-muted">dylanwu.me v2.0</span>
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
      </div>
      <div className="flex items-center gap-6">
        <span className="text-text-muted hidden sm:block">LA, CA</span>
        <span className="text-text-muted hidden sm:block">{time} PST</span>
        <span className="text-primary font-bold">Status: Available</span>
      </div>
    </header>
  );
}
