"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ChevronRight, Search, SlidersHorizontal, FolderOpen } from "lucide-react";

// You can easily change these tags later to match your real projects!
const PILLS = ["All", "Robotics", "Sensors", "IoT", "Motors"];

export default function ProjectFeed({ projects }: { projects: any[] }) {
  const [search, setSearch] = useState("");
  const [activePill, setActivePill] = useState("All");

  // Instant Real-Time Filter Logic
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
      // Faking the category filter by checking if the title includes the Pill word
      const matchesPill = activePill === "All" || p.title.toLowerCase().includes(activePill.toLowerCase());
      return matchesSearch && matchesPill;
    });
  }, [projects, search, activePill]);

  return (
    <div className="mb-20">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
        <FolderOpen className="text-blue-500" size={24} /> 
        Project Archive
      </h2>

      {/* Command Center: Search & Filters */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mb-8 transition-colors duration-300">
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Search Bar */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects, code, or components..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white transition-all outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2 md:pb-0">
            <div className="flex items-center gap-2 px-2 border-r border-gray-200 dark:border-gray-700 mr-2 text-gray-400">
              <SlidersHorizontal size={18} />
            </div>
            {PILLS.map((pill) => (
               <button
                 key={pill}
                 onClick={() => setActivePill(pill)}
                 className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                   activePill === pill
                     ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md"
                     : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                 }`}
               >
                 {pill}
               </button>
            ))}
          </div>

        </div>
      </div>

      {/* The Filtered Bento Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link href={`/project/${project.id}`} key={project.id} className="block group h-full">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 mb-5">
                  <Image 
                    src={project.thumbnail_url || project.diagram_url} 
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3 line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {new Date(project.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold ml-auto group-hover:translate-x-1 transition-transform">
                      Code <ChevronRight size={16} />
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty State if Search Fails */
        <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search size={28} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No projects found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">We couldn't find anything matching "{search}"</p>
          <button 
            onClick={() => { setSearch(''); setActivePill('All'); }} 
            className="px-6 py-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}