"use client";

import { useState } from "react";

export default function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset button after 2 seconds
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <div className="relative group">
      {/* The Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-gray-800 text-gray-300 hover:text-white px-3 py-1 rounded-md text-sm transition-colors border border-gray-600 z-10"
      >
        {copied ? "Copied!" : "Copy Code"}
      </button>

      {/* The Code Display */}
      <div className="bg-gray-900 rounded-lg p-4 pt-10 overflow-x-auto relative">
        <pre className="text-green-400 font-mono text-sm">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}