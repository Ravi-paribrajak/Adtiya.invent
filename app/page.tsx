import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Calendar, ChevronRight, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import ProjectFeed from "@/components/ProjectFeed";
import HeroHeader from "@/components/HeroHeader"; // THE NEW ANIMATED HEADER
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
        
        {/* 1. THE NEW ANIMATED TYPEWRITER HEADER */}
        <HeroHeader />

        {/* 2. THE S-TIER HERO CARD (Pinned Latest Project) */}
        {heroProject && (
          <div className="mb-24 relative">
            
            {/* The Gradient Halo Effect behind the card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[2.5rem] blur-xl opacity-20 dark:opacity-30"></div>
            
            <Link href={`/project/${heroProject.id}`} className="block group relative">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[2rem] p-4 md:p-6 shadow-2xl border border-white/50 dark:border-gray-700/50 hover:-translate-y-1 transition-transform duration-500 flex flex-col md:flex-row gap-8 items-center">
                
                {/* Huge Desktop Thumbnail with Floating Badge */}
                <div className="relative w-full md:w-[55%] aspect-video flex-shrink-0 overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 shadow-inner">
                  {/* Floating 'Latest Drop' Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-full flex items-center gap-1.5 border border-white/10 shadow-lg">
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

                {/* Upgraded Hero Content */}
                <div className="flex-grow w-full flex flex-col justify-center py-6 md:pr-8">
                  <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-transparent dark:group-hover:bg-clip-text dark:group-hover:bg-gradient-to-r dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all duration-300 mb-5 line-clamp-3 leading-tight tracking-tight">
                    {heroProject.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg line-clamp-2">
                    Access the complete C++ source code, wiring schematic, and component breakdown for this build.
                  </p>
                  
                  <div className="flex items-center gap-6 mt-auto">
                    <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-semibold text-sm">
                      <Calendar size={16} />
                      {new Date(heroProject.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    
                    {/* SaaS-Style Arrow Button */}
                    <span className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-full font-bold ml-auto group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                      View Blueprint <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          </div>
        )}

        {/* 3. THE BENTO GRID & SEARCH */}
        {gridProjects.length > 0 && (
          <ProjectFeed projects={gridProjects} />
        )}

        {/* 4. THE DEVELOPER FOOTER */}
        <DeveloperFooter />

      </div>
    </main>
  );
}