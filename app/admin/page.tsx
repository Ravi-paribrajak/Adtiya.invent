"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Importing our new Supabase client

export default function AdminDashboard() {
    const [title, setTitle] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [codeSnippet, setCodeSnippet] = useState("");
    const [diagram, setDiagram] = useState<File | null>(null);

    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!diagram) {
            alert("Please upload a wiring diagram!");
            return;
        }

        setIsUploading(true);

        try {
            // 1. Create a unique file name and upload the image to the 'diagrams' bucket
            const fileName = `${Date.now()}_${diagram.name.replace(/\s+/g, '_')}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('diagrams')
                .upload(fileName, diagram);

            if (uploadError) throw uploadError;

            // 2. Get the permanent public URL for the image
            const { data: publicUrlData } = supabase.storage
                .from('diagrams')
                .getPublicUrl(fileName);

            const imageUrl = publicUrlData.publicUrl;

            // 3. Save all data to the 'projects' table in the database
            const { error: dbError } = await supabase
                .from('projects')
                .insert([
                    {
                        title: title,
                        video_link: videoLink, // Notice the underscore to match your database column
                        code_snippet: codeSnippet, // Underscore here too
                        diagram_url: imageUrl
                    }
                ]);

            if (dbError) throw dbError;

            // Success!
            console.log("Uploaded successfully!");
            alert("Project uploaded Successfully!");

            // 4. Clear the form
            setTitle("");
            setVideoLink("");
            setCodeSnippet("");
            setDiagram(null);

        } catch (error: any) {
            console.error("Error uploading:", error.message);
            alert(`Error uploading: ${error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Upload New Project</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Project Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            placeholder="e.g., Obstacle Avoiding Robot"
                            required
                        />
                    </div>

                    {/* Reel/Video Link */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instagram/YouTube Link</label>
                        <input
                            type="url"
                            value={videoLink}
                            onChange={(e) => setVideoLink(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            placeholder="https://instagram.com/reel/..."
                            required
                        />
                    </div>

                    {/* Code Snippet */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Arduino Code</label>
                        <textarea
                            value={codeSnippet}
                            onChange={(e) => setCodeSnippet(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded h-48 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            placeholder="Paste your C++ code here..."
                            required
                        />
                    </div>

                    {/* Diagram Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Wiring Diagram (Image)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setDiagram(e.target.files ? e.target.files[0] : null)}
                            className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-black"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isUploading}
                        className={`w-full font-bold py-3 px-4 rounded transition duration-200 text-white ${isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {isUploading ? "Uploading to Database..." : "Save Project to Database"}
                    </button>
                </form>
            </div>
        </div>
    );
}