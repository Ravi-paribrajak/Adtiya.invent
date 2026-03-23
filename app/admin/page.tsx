"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; 
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { logout, createProject } from "@/app/login/actions"; // Imported createProject
import { UploadCloud, Image as ImageIcon, Type, Cpu, Code2, CircuitBoard, LogOut } from "lucide-react";

// Custom YouTube SVG
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export default function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [diagram, setDiagram] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [components, setComponents] = useState(""); 
  
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    toast.loading("Logging out...", { id: "logout-toast" });
    await logout();
    toast.success("Logged out successfully", { id: "logout-toast" });
    router.push("/login"); 
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!title || !videoLink || !codeSnippet) {
      toast.error("Please fill out all text fields!");
      return;
    }

    if (!diagram || !thumbnail) {
      toast.error("Please upload BOTH a wiring diagram and a thumbnail!");
      return;
    }

    setIsUploading(true); 
    toast.loading("Uploading Data & Images...", { id: "upload-toast" }); 

    try {
      // 1. Upload Thumbnail (Client-side storage upload is still okay)
      const thumbName = `thumb_${Date.now()}_${thumbnail.name.replace(/\s+/g, '_')}`;
      const { error: thumbUploadError } = await supabase.storage
        .from('diagrams') 
        .upload(thumbName, thumbnail);

      if (thumbUploadError) throw thumbUploadError;

      const { data: thumbUrlData } = supabase.storage.from('diagrams').getPublicUrl(thumbName);
      const thumbnailUrl = thumbUrlData.publicUrl;

      // 2. Upload Wiring Diagram
      const diagramName = `diagram_${Date.now()}_${diagram.name.replace(/\s+/g, '_')}`;
      const { error: diagramUploadError } = await supabase.storage
        .from('diagrams')
        .upload(diagramName, diagram);

      if (diagramUploadError) throw diagramUploadError;

      const { data: diagramUrlData } = supabase.storage.from('diagrams').getPublicUrl(diagramName);
      const diagramUrl = diagramUrlData.publicUrl;

      // 3. Save to Database via SECURE SERVER ACTION (Bypasses RLS)
      await createProject({
          title: title,
          video_link: videoLink,
          code_snippet: codeSnippet,
          components: components,
          diagram_url: diagramUrl,
          thumbnail_url: thumbnailUrl 
      });

      toast.success("Project published successfully!", { id: "upload-toast" });

      // 4. Clear form
      setTitle("");
      setVideoLink("");
      setCodeSnippet("");
      setComponents("");
      setDiagram(null);
      setThumbnail(null);
      
    } catch (error: any) {
      console.error("Error uploading:", error.message);
      toast.error(`Upload failed: ${error.message}`, { id: "upload-toast" });
    } finally {
      setIsUploading(false); 
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 md:pt-32 pb-24 overflow-x-hidden">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-100/50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 border border-purple-200/50 dark:border-purple-800/50 backdrop-blur-md">
              <UploadCloud size={16} /> Creator Studio
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Publish Blueprint
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm md:text-base">
              Upload your latest hardware project to the global hub.
            </p>
          </div>
          
          <button 
            type="button"
            onClick={handleLogout}
            className="group flex items-center justify-center gap-2 bg-red-50/80 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-sm mx-auto md:mx-0"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            Sign Out
          </button>
        </div>

        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-gray-200/20 dark:shadow-none border border-white/50 dark:border-gray-700/50">
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            
            {/* Project Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                <Type size={18} className="text-blue-500" /> Project Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-gray-900 dark:text-white transition-all outline-none shadow-sm"
                placeholder="e.g., Obstacle Avoiding Robot"
              />
            </div>

            {/* Video Link */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                <YoutubeIcon className="text-red-500" /> Tutorial Link
              </label>
              <input
                type="url"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                className="w-full p-3.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-gray-900 dark:text-white transition-all outline-none shadow-sm"
                placeholder="https://instagram.com/reel/..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                  <Cpu size={18} className="text-purple-500" /> Components Used
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">One component per line.</p>
                <textarea
                  value={components}
                  onChange={(e) => setComponents(e.target.value)}
                  className="w-full p-3.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl h-40 focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 text-gray-900 dark:text-white transition-all outline-none shadow-sm resize-none"
                  placeholder="Arduino Uno&#10;L298N Motor Driver&#10;Ultrasonic Sensor"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                  <Code2 size={18} className="text-green-500" /> Source Code
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">Paste exact C++ blueprint.</p>
                <textarea
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  className="w-full p-3.5 bg-[#1e1e1e] border border-gray-200 dark:border-gray-700/60 rounded-xl h-40 font-mono text-sm focus:ring-4 focus:ring-green-500/10 focus:border-green-500 text-gray-100 transition-all outline-none shadow-inner resize-none custom-scrollbar"
                  placeholder="void setup() {&#10;  Serial.begin(9600);&#10;}"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-4 border-t border-gray-200 dark:border-gray-800/50">
              <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-4 md:p-5 rounded-xl transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <label className="flex items-center gap-2 text-sm font-bold text-blue-900 dark:text-blue-400 mb-2">
                  <ImageIcon size={18} /> 1. Home Thumbnail
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 dark:file:bg-blue-500 dark:hover:file:bg-blue-600 cursor-pointer transition-all"
                />
              </div>

              <div className="bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 p-4 md:p-5 rounded-xl transition-colors hover:bg-purple-50 dark:hover:bg-purple-900/20">
                <label className="flex items-center gap-2 text-sm font-bold text-purple-900 dark:text-purple-400 mb-2">
                  <CircuitBoard size={18} /> 2. Wiring Diagram
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setDiagram(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-purple-600 file:text-white hover:file:bg-purple-700 dark:file:bg-purple-500 dark:hover:file:bg-purple-600 cursor-pointer transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 text-white shadow-md mt-4 flex items-center justify-center gap-2 ${
                isUploading 
                  ? "bg-gray-400 dark:bg-gray-700 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
              }`}
            >
              {isUploading ? (
                <>
                  <UploadCloud size={20} className="animate-bounce" /> Uploading to Server...
                </>
              ) : (
                <>
                  <UploadCloud size={20} /> Publish to CodeHub
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}