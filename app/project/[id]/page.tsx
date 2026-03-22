import { supabase } from "@/lib/supabase";
import Link from "next/link";

// Update: In Next.js 15+, params is a Promise that must be awaited
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  
  // 1. Wait for the URL parameters to load
  const { id } = await params;
  
  // 2. Fetch the single project that matches the ID
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  // If there's an error, let's print it to your VS Code terminal so we can see what went wrong!
  if (error) console.error("Supabase Error:", error);

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl text-red-500 mb-4">Project not found!</h1>
        <Link href="/" className="text-blue-600 hover:underline">← Go back home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 text-gray-900">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        
        {/* Back Button */}
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to all projects
        </Link>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        
        {/* Video Link */}
        <a 
          href={project.video_link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-colors mb-8"
        >
          Watch Full Tutorial
        </a>

        {/* Wiring Diagram */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 border-b pb-2">Wiring Diagram</h2>
          <img 
            src={project.diagram_url} 
            alt={`Wiring diagram for ${project.title}`}
            className="w-full rounded-lg border border-gray-200"
          />
        </div>

        {/* Arduino Code */}
        <div>
          <h2 className="text-xl font-bold mb-3 border-b pb-2">Arduino Code</h2>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 font-mono text-sm">
              <code>{project.code_snippet}</code>
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}