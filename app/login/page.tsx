"use client";

import { useState } from "react";
import { ShieldCheck, User, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authenticate } from "./actions"; // Importing your exact action!


export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Extract the exact strings your action is expecting
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    
    try {
      // Pass the strings directly to your secure Server Action
      const result = await authenticate(username, password);
      
      if (result.success) {
        toast.success("Access Granted. Welcome back.", { id: "login-toast" });
        router.push("/admin"); // Teleport the user to the admin dashboard
      } else {
        // If they type the wrong password, let them know!
        toast.error("Invalid credentials. Access Denied.", { id: "login-toast" });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during authentication.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      
      {/* 1. Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-500/20 dark:bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-purple-500/20 dark:bg-purple-600/10 blur-[80px] rounded-full pointer-events-none translate-x-1/4 translate-y-1/4" />

      {/* 2. Glassmorphic Login Card */}
      <div className="relative w-full max-w-md bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl border border-white/50 dark:border-gray-700/50 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl shadow-blue-900/10 dark:shadow-none z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-blue-500/30">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
            Secure Portal
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Authorized creator access only.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Username Input */}
          <div className="space-y-1.5 group">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider ml-1">
              Admin ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                name="username"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-white/80 dark:bg-gray-950/80 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-gray-900 dark:text-white transition-all outline-none placeholder:text-gray-400 shadow-sm text-sm sm:text-base"
                placeholder="Enter username"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5 group">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider ml-1">
              Passcode
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="password"
                name="password"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-white/80 dark:bg-gray-950/80 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-gray-900 dark:text-white transition-all outline-none placeholder:text-gray-400 shadow-sm text-sm sm:text-base"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full group relative inline-flex items-center justify-center gap-2 py-4 mt-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 overflow-hidden ${
              isLoading 
                ? "bg-gray-400 dark:bg-gray-700 text-white cursor-not-allowed" 
                : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:shadow-xl hover:-translate-y-0.5"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Authenticating...
              </>
            ) : (
              <>
                <span className="relative z-10 flex items-center gap-2">
                  Verify Access <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Subtle gradient hover effect inside the button */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300"></div>
              </>
            )}
          </button>

        </form>

        {/* Decorative Bottom Line */}
        <div className="mt-8 flex items-center justify-center gap-2 opacity-50">
          <div className="w-12 h-[1px] bg-gray-300 dark:bg-gray-600"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="w-12 h-[1px] bg-gray-300 dark:bg-gray-600"></div>
        </div>

      </div>
    </main>
  );
}