"use client";

import { motion } from "framer-motion";
import { Mail, Sparkles, ArrowUpRight } from "lucide-react";

export default function DeveloperFooter() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }} // Triggers the animation right before it comes into view!
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mt-32 mb-12 relative"
    >
      {/* 1. Ambient Background Glow */}
      <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
       
      {/* 2. The Premium CTA Card */}
      <div className="relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-800/50 rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl shadow-gray-200/20 dark:shadow-none overflow-hidden">
         
        {/* Decorative Top Edge Highlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

        {/* Floating Animated Icon */}
        <motion.div 
          whileHover={{ scale: 1.05, rotate: -5 }}
          className="w-20 h-20 bg-gradient-to-tr from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-white/80 dark:border-gray-700/50 cursor-pointer transition-colors"
        >
          <Mail size={36} strokeWidth={1.5} />
        </motion.div>

        {/* Hero Text with Gradient Highlight */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
          Let's build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">the future.</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-10 text-lg md:text-xl leading-relaxed">
          Open for freelance engineering, technical writing, and hardware sponsorships.
        </p>

        {/* Upgraded S-Tier Button */}
        <a 
          href="mailto:paribrajakravishankarkumar@gmail.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles size={18} className="text-yellow-400 dark:text-yellow-500" /> 
            Get in Touch
            <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
          {/* Invisible hover overlay to give it a slight tint */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300"></div>
        </a>
      </div>

      {/* 3. The Actual Footer Copyright */}
      <div className="mt-8 flex flex-col items-center justify-center text-center text-sm text-gray-400 dark:text-gray-600 font-medium">
        <p>© {new Date().getFullYear()} Adtiya.invents. All rights reserved.</p>
        <p className="mt-1 text-xs opacity-70">Designed for the builder community.</p>
      </div>
    </motion.footer>
  );
}