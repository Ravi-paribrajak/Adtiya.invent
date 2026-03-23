"use server";

import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

// Initialize a "Privileged" Supabase client for server-side tasks
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // This key bypasses RLS
);

export async function authenticate(username: string, password: string) {
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_token", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return { success: true };
  }
  return { success: false };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  return { success: true };
}

// NEW ACTION: Securely create a project bypassing RLS
export async function createProject(projectData: {
  title: string;
  video_link: string;
  code_snippet: string;
  components: string;
  diagram_url: string;
  thumbnail_url: string;
}) {
  const { error } = await supabaseAdmin
    .from('projects')
    .insert([projectData]);

  if (error) throw error;
  return { success: true };
}