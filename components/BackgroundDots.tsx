"use client";

import { useEffect, useRef } from "react";

export default function BackgroundDots() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        window.requestAnimationFrame(() => {
          glowRef.current!.style.setProperty("--x", `${e.clientX}px`);
          glowRef.current!.style.setProperty("--y", `${e.clientY}px`);
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      {/* 1. The Base Layer: Increased visibility 
          (Using #d1d5db for light mode and #374151 for dark mode so they are slightly more visible) */}
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* 2. The Spotlight Layer: Spread reduced from 300px to 200px for a tighter glow */}
      <div 
        ref={glowRef}
        className="absolute inset-0 bg-[radial-gradient(#9ca3af_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-0 md:opacity-100 transition-opacity duration-500"
        style={{
          WebkitMaskImage: `radial-gradient(200px circle at var(--x, 50%) var(--y, 50%), black, transparent)`,
          maskImage: `radial-gradient(200px circle at var(--x, 50%) var(--y, 50%), black, transparent)`
        }}
      ></div>
    </div>
  );
}