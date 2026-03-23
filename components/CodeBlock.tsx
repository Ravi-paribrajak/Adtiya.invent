"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from "lucide-react";

export default function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-gray-800 bg-[#1e1e1e] shadow-xl font-mono">
      
      {/* Premium Mac-style Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-gray-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">Arduino / C++</span>
        
        {/* Interactive Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-md"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* The Syntax Highlighted Code */}
      <div className="text-sm max-h-[500px] overflow-y-auto custom-scrollbar">
        <SyntaxHighlighter 
          language="cpp" 
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          showLineNumbers={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}