import { supabase } from "@/lib/supabase";
import Link from "next/link";

// This tells Next.js to always fetch fresh data when someone visits the page
export const revalidate = 0; 

export default async function Home() {
  // Fetch all projects from Supabase, newest first
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8 text-gray-900">
      <div className="max-w-md mx-auto">
        
        {/* Profile Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Code & Diagram Hub</h1>
          <p className="text-gray-600">Get the exact code and wiring for my projects!</p>
        </div>

        {/* Project Feed */}
        <div className="space-y-4">
          {projects?.map((project) => (
            <Link href={`/project/${project.id}`} key={project.id}>
              <div className="block bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer mb-4">
                <h2 className="text-xl font-bold text-blue-600 mb-2">{project.title}</h2>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>View Code & Wiring →</span>
                  <span>{new Date(project.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}

          {projects?.length === 0 && (
            <p className="text-center text-gray-500 mt-10">No projects uploaded yet.</p>
          )}
        </div>

      </div>
    </main>
  );
}