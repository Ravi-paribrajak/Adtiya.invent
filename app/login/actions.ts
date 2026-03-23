"use server";

import { cookies } from "next/headers";

export async function authenticate(username: string, password: string) {
  // Check against the secret credentials in your .env.local file
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // If correct, issue a highly secure HTTP-Only cookie valid for 1 week
    const cookieStore = await cookies();
    
    cookieStore.set("admin_token", "true", {
      httpOnly: true, // Prevents hackers from stealing it via JavaScript
      secure: process.env.NODE_ENV === "production", 
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    
    return { success: true };
  }
  
  return { success: false };
}

// NEW LOGOUT FUNCTION
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  return { success: true };
}