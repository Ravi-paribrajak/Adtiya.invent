import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import CodeBlock from "@/components/CodeBlock";
import ZoomableImage from "@/components/ZoomableImage";
import Link from "next/link";
// Removed the deprecated 'Youtube' icon from lucide-react
import { ArrowLeft, Calendar, Cpu, Code2, CircuitBoard } from "lucide-react";

export const revalidate = 0;

// Custom YouTube SVG to replace the deprecated Lucide icon
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

// FIX: Next.js 15+ requires params to be a Promise!
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  
  // We MUST await the params before we can read the 'id'
  const resolvedParams = await params;
  
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (!project) {
    notFound();
  }

  // Convert the text block of components into an array (splitting by new lines)
  const componentsList = project.components ? project.components.split('\n').filter((c: string) => c.trim() !== '') : [];

  return (
    <main className="min-h-screen p-4 md:p-8 pt-24">
      {/* Upgraded to max-w-7xl to match the new Desktop Home Page */}
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation & Header */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        <div className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
              <Calendar size={18} />
              {new Date(project.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            
            {project.video_link && (
              <a 
                href={project.video_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-red-600 dark:text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg transition-colors"
              >
                <YoutubeIcon /> Watch Video Tutorial
              </a>
            )}
          </div>
        </div>

        {/* THE SAAS DESKTOP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: Diagram & Components (Spans 7 columns on Desktop) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Wiring Diagram Section */}
            <section>
              <h2 className="text-2xl font-bold mb-5 flex items-center gap-2 text-gray-900 dark:text-white">
                <CircuitBoard className="text-blue-500" size={24} /> 
                Wiring Diagram
              </h2>
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-3 shadow-sm border border-gray-100 dark:border-gray-800">
                <ZoomableImage src={project.diagram_url} alt={`${project.title} wiring diagram`} />
              </div>
            </section>

            {/* NEW: Components Used Section */}
            <section>
              <h2 className="text-2xl font-bold mb-5 flex items-center gap-2 text-gray-900 dark:text-white">
                <Cpu className="text-purple-500" size={24} /> 
                Components Used
              </h2>
              <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                {componentsList.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {componentsList.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0"></span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic text-center py-4">
                    No components listed for this project.
                  </p>
                )}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Code Block (Spans 5 columns & STICKY on Desktop) */}
          <div className="lg:col-span-5 relative">
            {/* The sticky wrapper keeps the code visible while scrolling the left column! */}
            <div className="lg:sticky lg:top-32 space-y-5">
              <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                <Code2 className="text-green-500" size={24} /> 
                Arduino Code
              </h2>
              <div className="shadow-2xl rounded-xl overflow-hidden border border-gray-800/50">
                <CodeBlock code={project.code_snippet} />
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}