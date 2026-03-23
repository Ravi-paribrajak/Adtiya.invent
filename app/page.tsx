import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Calendar, ChevronRight, Mail, Sparkles, FolderOpen } from "lucide-react";
import Image from "next/image";
import ProjectFeed from "@/components/ProjectFeed"; // NEW IMPORT

export const revalidate = 0; 

export default async function Home() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
  }

  // Split the data: 1 for the Hero Card, the rest for the Bento Grid
  const heroProject = projects?.[0];
  const gridProjects = projects?.slice(1) || [];

  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* 1. Upgraded Container: max-w-2xl is now max-w-7xl for Desktop! */}
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Premium Profile Header */}
        <div className="text-center mb-16 pt-4">
          <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-blue-200 dark:border-blue-800">
            Developer Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-950 dark:text-white mb-4 tracking-tight">
            Code & Diagram Hub
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Grab the exact C++ code and wiring diagrams from my tutorials.
          </p>
        </div>

        {/* 2. THE HERO CARD (Pinned Latest Project) */}
        {heroProject && (
          <div className="mb-16">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
              <Sparkles className="text-blue-500" size={24} /> 
              Latest Release
            </h2>
            
            <Link href={`/project/${heroProject.id}`} className="block group">
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col md:flex-row gap-8 items-center">
                
                {/* Huge Desktop Thumbnail */}
                <div className="relative w-full md:w-3/5 aspect-video flex-shrink-0 overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
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
                <div className="flex-grow w-full flex flex-col justify-center py-4">
                  <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-4 line-clamp-3">
                    {heroProject.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8 line-clamp-2">
                    Click to view the complete C++ source code, components list, and high-resolution wiring diagram.
                  </p>
                  
                  <div className="flex items-center gap-6 mt-auto">
                    <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium">
                      <Calendar size={18} />
                      {new Date(heroProject.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold ml-auto group-hover:bg-blue-700 transition-colors shadow-sm group-hover:shadow-md">
                      View Project <ChevronRight size={18} />
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          </div>
        )}

        {/* 3. THE BENTO GRID & SEARCH (Replaced with our Client Component!) */}
        {gridProjects.length > 0 && (
          <ProjectFeed projects={gridProjects} />
        )}

        {/* 4. THE DEVELOPER FOOTER */}
        <footer className="mt-24 border-t border-gray-200 dark:border-gray-800 pt-16 pb-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm rotate-3 hover:rotate-0 transition-transform duration-300">
            <Mail size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Let's build something.
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8 text-lg">
            Open for freelance projects, technical writing, and brand sponsorships. 
          </p>
          <a 
            href="mailto:paribrajakravishankarkumar@gmail.com" 
            target = "_blank"
            className="group relative inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Mail size={20} /> Contact Me
            </span>
          </a>
        </footer>

      </div>
    </main>
  );
}