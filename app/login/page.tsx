"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";
import toast from "react-hot-toast";
import { authenticate } from "./actions";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Send the data to our secure server action
    const result = await authenticate(username, password);

    if (result.success) {
      toast.success("Welcome to the Control Center!");
      router.push("/admin"); // Send them to the dashboard!
    } else {
      toast.error("Invalid username or password");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 sm:p-10">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-500 mb-4 shadow-sm">
            <Lock size={26} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Admin Access</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Sign in to publish new projects.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white transition-all"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white transition-all"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-bold py-3.5 px-4 rounded-xl transition duration-200 text-white shadow-md mt-6 ${
              isLoading ? "bg-gray-400 dark:bg-gray-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
            }`}
          >
            {isLoading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

      </div>
    </div>
  );
}