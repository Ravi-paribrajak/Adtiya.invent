"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2, Home, Settings } from "lucide-react"; // Removed Youtube from here!

// Custom YouTube SVG that perfectly matches the Lucide icon style
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="22" 
    height="22" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Upload", href: "/admin", icon: Settings },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-4 px-4"
    >
      <div className="bg-white/70 backdrop-blur-xl border border-gray-200 shadow-sm rounded-full px-6 py-3 flex items-center gap-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-brand-500 text-white p-1.5 rounded-lg group-hover:bg-brand-600 transition-colors">
            <Code2 size={20} />
          </div>
          <span className="font-bold text-gray-900 tracking-tight hidden sm:block">CodeHub</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 border-l border-gray-300 pl-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive ? "text-brand-600" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Icon size={18} className={isActive ? "stroke-2" : "stroke-[1.5]"} />
                <span className="hidden sm:block">{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* External Social Link */}
        <a 
          href="https://www.youtube.com/@Adityainvents" // Update to your channel link
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-red-500 transition-colors ml-2 flex items-center"
          aria-label="YouTube Channel"
        >
          <YoutubeIcon />
        </a>

      </div>
    </motion.nav>
  );
}