"use client";

import { useState, useEffect } from "react";

export default function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [isOpen, setIsOpen] = useState(false);

  // This prevents the background page from scrolling when the image is zoomed in
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <>
      {/* The standard image shown on the page */}
      <img
        src={src}
        alt={alt}
        onClick={() => setIsOpen(true)}
        className="w-full rounded-lg border border-gray-200 cursor-zoom-in hover:opacity-95 transition-opacity shadow-sm"
      />

      {/* The Fullscreen Modal (only renders if isOpen is true) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 md:p-8 cursor-zoom-out backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          {/* Close Button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white bg-black/50 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors"
            aria-label="Close fullscreen"
          >
            ✕
          </button>
          
          {/* The enlarged image */}
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[90vh] object-contain rounded-md"
            onClick={(e) => e.stopPropagation()} // Prevents clicking the image itself from closing the modal
          />
        </div>
      )}
    </>
  );
}