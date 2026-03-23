import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Calendar, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import ProjectFeed from "@/components/ProjectFeed";
import HeroHeader from "@/components/HeroHeader";
import DeveloperFooter from "@/components/DeveloperFooter";

export const revalidate = 0; 

export default async function Home() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
  }

  const heroProject = projects?.[0];
  const gridProjects = projects?.slice(1) || [];

  return (
    <main className="min-h-screen p-4 md:p-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        <HeroHeader />

        {/* 2. THE S-TIER HERO CARD (Fully Mobile Responsive) */}
        {heroProject && (
          <div className="mb-20 md:mb-24 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[2.5rem] blur-xl opacity-20 dark:opacity-30"></div>
            
            <Link href={`/project/${heroProject.id}`} className="block group relative">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[2rem] p-4 md:p-6 shadow-2xl border border-white/50 dark:border-gray-700/50 hover:-translate-y-1 transition-transform duration-500 flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                
                {/* Thumbnail */}
                <div className="relative w-full md:w-[55%] aspect-video flex-shrink-0 overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 shadow-inner">
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10 bg-black/70 backdrop-blur-md text-white text-[10px] md:text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-full flex items-center gap-1.5 border border-white/10 shadow-lg">
                    <Sparkles size={14} className="text-yellow-400" /> Latest Drop
                  </div>
                  
                  <Image 
                    src={heroProject.thumbnail_url || heroProject.diagram_url} 
                    alt={heroProject.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Hero Content */}
                <div className="flex-grow w-full flex flex-col justify-center py-2 md:py-6 md:pr-8">
                  {/* Title scaling */}
                  <h3 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-transparent dark:group-hover:bg-clip-text dark:group-hover:bg-gradient-to-r dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all duration-300 mb-3 md:mb-5 line-clamp-3 leading-tight tracking-tight">
                    {heroProject.title}
                  </h3>
                  
                  {/* Description scaling */}
                  <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8 text-sm md:text-lg line-clamp-2">
                    Access the complete C++ source code, wiring schematic, and component breakdown for this build.
                  </p>
                  
                  {/* FLEX WRAP FIX: Allows button to go full-width on mobile! */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-auto w-full">
                    <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-semibold text-xs md:text-sm">
                      <Calendar size={14} className="md:w-4 md:h-4" />
                      {new Date(heroProject.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    
                    {/* Full-width on mobile (w-full), auto-width on desktop (sm:w-auto) */}
                    <span className="flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 w-full sm:w-auto px-6 py-3 md:py-3.5 rounded-full font-bold text-sm md:text-base group-hover:shadow-lg group-hover:scale-[1.02] md:group-hover:scale-105 transition-all duration-300">
                      View Blueprint <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          </div>
        )}

        <ProjectFeed projects={gridProjects} />

        <DeveloperFooter />

      </div>
    </main>
  );
}