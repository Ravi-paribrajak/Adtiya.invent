"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function HeroHeader() {
  const text = "Aditya.invents";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 120);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="text-center mb-16 md:mb-20 pt-8">
      {/* Animated Status Pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase mb-6 border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-md shadow-sm"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        Official Project Hub
      </motion.div>

      {/* Typewriter Heading - SMOOTH RESPONSIVE SCALING */}
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-950 dark:text-white mb-4 md:mb-6 tracking-tight min-h-[1.2em]">
        {displayedText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-[4px] h-[0.9em] bg-blue-500 ml-1 md:ml-2 align-middle rounded-full"
        />
      </h1>

      {/* Fade-in Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="text-gray-500 dark:text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-2"
      >
        The master archive for exact C++ source codes, high-resolution wiring diagrams, and component blueprints.
      </motion.p>
    </div>
  );
}