"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
      const matchesPill = activePill === "All" || p.title.toLowerCase().includes(activePill.toLowerCase());
      return matchesSearch && matchesPill;
    });
  }, [projects, search, activePill]);

  return (
    <div className="mb-16 md:mb-24">
      {/* Header: Responsive text sizing */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white tracking-tight">
          <FolderOpen className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6" /> 
          Project Archive
        </h2>
        <div className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full">
          {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}
        </div>
      </div>

      {/* Command Center: Slimmer padding on mobile */}
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl p-3 md:p-4 rounded-[1.5rem] md:rounded-3xl shadow-lg shadow-gray-200/20 dark:shadow-none border border-gray-200/50 dark:border-gray-800/50 mb-8 md:mb-10 transition-colors duration-500">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          
          {/* Search Bar: Responsive padding and text size */}
          <div className="relative flex-grow group">
            <div className="absolute inset-y-0 left-0 pl-3.5 md:pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500">
              <Search size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-10 md:pl-11 pr-4 py-2.5 md:py-3 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-gray-900 dark:text-white transition-all outline-none placeholder:text-gray-400 shadow-inner text-sm md:text-base"
            />
          </div>

          {/* Filter Pills: Added shrink-0 and scaled down sizes for mobile */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0 w-full md:w-auto">
            <div className="flex items-center gap-2 px-1 md:px-2 border-r border-gray-200 dark:border-gray-700 mr-1 md:mr-2 text-gray-400 shrink-0">
              <SlidersHorizontal size={16} className="md:w-[18px] md:h-[18px]" />
            </div>
            {PILLS.map((pill) => (
               <button
                 key={pill}
                 onClick={() => setActivePill(pill)}
                 className={`shrink-0 whitespace-nowrap px-4 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold transition-all duration-300 ${
                   activePill === pill
                     ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md scale-105"
                     : "bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
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
        <motion.div 
          layout 
          // Grid gap shrinks from gap-6 to gap-4 on mobile!
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                className="h-full"
              >
                <Link href={`/project/${project.id}`} className="block group h-full relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl blur opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 transition duration-500"></div>
                  
                  {/* Card padding shrinks from p-5 to p-4 on mobile */}
                  <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[1.25rem] md:rounded-[1.5rem] p-4 md:p-5 shadow-sm hover:shadow-xl border border-white/50 dark:border-gray-700/50 transition-all duration-300 flex flex-col h-full z-10">
                    
                    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl border border-gray-100/50 dark:border-gray-800/50 bg-gray-50 dark:bg-gray-900 mb-4 md:mb-5 shadow-inner">
                      <Image 
                        src={project.thumbnail_url || project.diagram_url} 
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>

                    <div className="flex flex-col flex-grow">
                      {/* Font scales down on mobile */}
                      <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all duration-300 mb-2 md:mb-3 line-clamp-2 leading-snug">
                        {project.title}
                      </h3>
                      
                      <div className="flex items-center gap-3 text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-auto pt-3 md:pt-4 border-t border-gray-100 dark:border-gray-800/50">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Calendar size={14} className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          {new Date(project.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold ml-auto group-hover:translate-x-1 transition-transform">
                          Code <ChevronRight size={14} className="md:w-4 md:h-4" />
                        </span>
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State: Slimmer padding on mobile */
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center py-16 md:py-24 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2rem] border border-dashed border-gray-300 dark:border-gray-700 mx-2 md:mx-0"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-inner">
            <Search size={28} className="md:w-8 md:h-8" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3 tracking-tight">No projects found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8 text-sm md:text-lg px-4">We couldn't find anything matching "{search}"</p>
          <button 
            onClick={() => { setSearch(''); setActivePill('All'); }} 
            className="px-6 py-2.5 md:px-8 md:py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm md:text-base rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}