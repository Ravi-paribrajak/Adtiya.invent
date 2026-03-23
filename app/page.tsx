import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import Image from "next/image";

export const revalidate = 0; 

export default async function Home() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Premium Profile Header */}
        <div className="text-center mb-10 pt-4">
          <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
            Latest Projects
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-950 mb-4 tracking-tight">
            Code & Diagram Hub
          </h1>
          <p className="text-gray-500 text-lg">
            Grab the exact C++ code and wiring diagrams from my tutorials.
          </p>
        </div>

        {/* Upgraded Project Feed */}
        <div className="space-y-6">
          {projects?.map((project) => (
            <Link href={`/project/${project.id}`} key={project.id} className="block group">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-center">
                
                {/* Optimized Thumbnail Image (With Fallback!) */}
                <div className="relative w-full sm:w-40 h-40 sm:h-28 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                  <Image 
                    src={project.thumbnail_url || project.diagram_url} 
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 160px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Content */}
                <div className="flex-grow w-full flex flex-col justify-center">
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                    {project.title}
                  </h2>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-gray-400" />
                      {new Date(project.created_at).toLocaleDateString(undefined, { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1 text-blue-600 font-medium ml-auto group-hover:translate-x-1 transition-transform">
                      View Code <ChevronRight size={16} />
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          ))}

          {projects?.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500">No projects uploaded yet.</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}