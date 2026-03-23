"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2, Home, Moon, Sun, Mail, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Upload", href: "/admin", icon: Settings }, // The Secure Admin Portal
    { name: "Contact", href: "mailto:paribrajakravishankarkumar@gmail.com", icon: Mail }, // The New Contact Link
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-5 px-4"
    >
      {/* Upgraded Glassmorphism: More blur, slightly less opacity, softer borders */}
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-lg shadow-gray-200/20 dark:shadow-none rounded-full p-1.5 flex items-center transition-colors duration-500">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 px-4 group">
          <div className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white p-1.5 rounded-lg shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
            <Code2 size={18} />
          </div>
          <span className="font-bold text-gray-900 dark:text-white tracking-tight hidden sm:block">CodeHub</span>
        </Link>

        {/* Vertical Divider */}
        <div className="w-[1px] h-6 bg-gray-300 dark:bg-gray-700 mx-2"></div>

        {/* Navigation Links with "Pill" Active States */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            // Check if the current path matches the link, or if we are inside the /admin section
            const isActive = pathname === link.href || (pathname.startsWith('/admin') && link.href === '/admin');
            const Icon = link.icon;
            
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive 
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-sm" // The Active Pill
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon size={16} className={isActive ? "stroke-[2.5]" : "stroke-[2]"} />
                <span className="hidden md:block">{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Vertical Divider */}
        <div className="w-[1px] h-6 bg-gray-300 dark:bg-gray-700 mx-3"></div>

        {/* External Social & Theme Toggle */}
        <div className="flex items-center gap-2 pr-2">
          <a 
            href="https://www.youtube.com/@Adityainvents" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-all duration-300"
            aria-label="YouTube Channel"
          >
            <YoutubeIcon />
          </a>
          
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>

      </div>
    </motion.nav>
  );
}