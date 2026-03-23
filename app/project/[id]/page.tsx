import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import CodeBlock from "@/components/CodeBlock";
import ZoomableImage from "@/components/ZoomableImage";
import Link from "next/link";
import { ArrowLeft, Calendar, Cpu, Code2, CircuitBoard } from "lucide-react";

export const revalidate = 0;

// Custom YouTube SVG
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (!project) {
    notFound();
  }

  const componentsList = project.components ? project.components.split('\n').filter((c: string) => c.trim() !== '') : [];

  return (
    // Reduced top/bottom padding on mobile (pt-24 pb-16) to save screen real estate
    <main className="min-h-screen p-4 md:p-8 pt-24 md:pt-32 pb-16 md:pb-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation & Header */}
        <Link 
          href="/" 
          className="group inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-8 md:mb-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Hub
        </Link>

        {/* Hero Section of the Project */}
        <div className="mb-10 md:mb-16 border-b border-gray-200/50 dark:border-gray-800/50 pb-8 md:pb-10">
          {/* Smoother responsive text scaling */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
            {project.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
            <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300 font-semibold bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 px-5 py-2.5 rounded-xl shadow-sm w-full sm:w-auto">
              <Calendar size={18} className="text-blue-500" />
              {new Date(project.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            
            {project.video_link && (
              <a 
                href={project.video_link} 
                target="_blank" 
                rel="noopener noreferrer"
                // w-full on mobile, auto width on desktop. Center text on mobile!
                className="group flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 border border-red-500/20 hover:border-red-500 text-red-600 dark:text-red-400 hover:text-white font-bold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-red-500/25 w-full sm:w-auto"
              >
                <YoutubeIcon className="group-hover:scale-110 transition-transform" /> Watch Tutorial
              </a>
            )}
          </div>
        </div>

        {/* THE SAAS DESKTOP GRID */}
        {/* Tighter gap on mobile (gap-8 vs gap-10) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Wiring Diagram Section */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 md:mb-5 flex items-center gap-2 text-gray-900 dark:text-white">
                <CircuitBoard className="text-blue-500" size={24} /> 
                Wiring Schematic
              </h2>
              {/* Responsive rounded corners and padding */}
              <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-[1.5rem] md:rounded-[2rem] p-2 md:p-3 shadow-xl shadow-gray-200/20 dark:shadow-none border border-white/50 dark:border-gray-700/50">
                <ZoomableImage src={project.diagram_url} alt={`${project.title} wiring diagram`} />
              </div>
            </section>

            {/* Components Used Section */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 md:mb-5 flex items-center gap-2 text-gray-900 dark:text-white mt-8 md:mt-12">
                <Cpu className="text-purple-500" size={24} /> 
                Hardware Required
              </h2>
              {/* Responsive rounded corners and padding */}
              <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 shadow-xl shadow-gray-200/20 dark:shadow-none border border-white/50 dark:border-gray-700/50">
                {componentsList.length > 0 ? (
                  // Tighter gap on mobile (gap-3 instead of 4)
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {componentsList.map((item: string, index: number) => (
                      <li key={index} className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 rounded-xl p-2.5 sm:p-3 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-inner">
                          <Cpu size={16} className="text-white" />
                        </div>
                        {/* Smaller font size on mobile */}
                        <span className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic text-center py-6 bg-white/40 dark:bg-gray-800/40 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                    No components listed for this build.
                  </p>
                )}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-32 space-y-4 md:space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white mt-4 lg:mt-0">
                <Code2 className="text-green-500" size={24} /> 
                Source Code
              </h2>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 hidden lg:block"></div>
                {/* Fixed border radius scaling */}
                <div className="relative shadow-2xl rounded-xl md:rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700/60 bg-[#1e1e1e]">
                  <div className="bg-[#2d2d2d] px-3 md:px-4 py-2.5 md:py-3 flex items-center gap-2 border-b border-gray-700/50">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80"></div>
                    <span className="ml-2 text-[10px] md:text-xs text-gray-400 font-mono tracking-wider">main.cpp</span>
                  </div>
                  <CodeBlock code={project.code_snippet} />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}