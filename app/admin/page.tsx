"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; 

export default function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [diagram, setDiagram] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  
  const [isUploading, setIsUploading] = useState(false);

  // FIXED: Changed React.SubmitEvent to React.FormEvent
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!diagram || !thumbnail) {
      alert("Please upload BOTH a wiring diagram and a thumbnail!");
      return;
    }

    setIsUploading(true); 

    try {
      // 1. Upload the Custom Thumbnail
      const thumbName = `thumb_${Date.now()}_${thumbnail.name.replace(/\s+/g, '_')}`;
      const { error: thumbUploadError } = await supabase.storage
        .from('diagrams') 
        .upload(thumbName, thumbnail);

      if (thumbUploadError) throw thumbUploadError;

      const { data: thumbUrlData } = supabase.storage
        .from('diagrams')
        .getPublicUrl(thumbName);
      const thumbnailUrl = thumbUrlData.publicUrl;

      // 2. Upload the Wiring Diagram
      const diagramName = `diagram_${Date.now()}_${diagram.name.replace(/\s+/g, '_')}`;
      const { error: diagramUploadError } = await supabase.storage
        .from('diagrams')
        .upload(diagramName, diagram);

      if (diagramUploadError) throw diagramUploadError;

      const { data: diagramUrlData } = supabase.storage
        .from('diagrams')
        .getPublicUrl(diagramName);
      const diagramUrl = diagramUrlData.publicUrl;

      // 3. Save all data to the 'projects' table
      const { error: dbError } = await supabase
        .from('projects')
        .insert([
          {
            title: title,
            video_link: videoLink,
            code_snippet: codeSnippet,
            diagram_url: diagramUrl,
            thumbnail_url: thumbnailUrl 
          }
        ]);

      if (dbError) throw dbError;

      console.log("Uploaded successfully!");
      alert("Project & Thumbnail uploaded Successfully!");

      // 4. Clear the form
      setTitle("");
      setVideoLink("");
      setCodeSnippet("");
      setDiagram(null);
      setThumbnail(null);
      
    } catch (error: any) {
      console.error("Error uploading:", error.message);
      alert(`Error uploading: ${error.message}`);
    } finally {
      setIsUploading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-24">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Upload New Project</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Project Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="e.g., Obstacle Avoiding Robot"
              required
            />
          </div>

          {/* Reel/Video Link */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Instagram/YouTube Link</label>
            <input
              type="url"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="https://instagram.com/reel/..."
              required
            />
          </div>

          {/* Code Snippet */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Arduino Code</label>
            <textarea
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg h-48 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="Paste your C++ code here..."
              required
            />
          </div>

          {/* Custom Thumbnail Upload */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <label className="block text-sm font-bold text-blue-900 mb-1">1. Custom Thumbnail (Cover Image)</label>
            <p className="text-xs text-blue-600 mb-2">This is what users will see on the Home feed.</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files ? e.target.files[0] : null)}
              className="w-full p-2 bg-white border border-blue-200 rounded-md text-gray-900 text-sm"
              required
            />
          </div>

          {/* Wiring Diagram Upload */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="block text-sm font-bold text-gray-900 mb-1">2. Wiring Diagram (Circuit Image)</label>
            <p className="text-xs text-gray-500 mb-2">This is the detailed diagram users will zoom in on.</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setDiagram(e.target.files ? e.target.files[0] : null)}
              className="w-full p-2 bg-white border border-gray-300 rounded-md text-gray-900 text-sm"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isUploading}
            className={`w-full font-bold py-3.5 px-4 rounded-xl transition duration-200 text-white shadow-sm mt-4 ${
              isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-md"
            }`}
          >
            {isUploading ? "Uploading Data & Images..." : "Publish Project"}
          </button>
        </form>
      </div>
    </div>
  );
}