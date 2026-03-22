import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast"; // NEW IMPORT

export const metadata: Metadata = {
  title: "Ravi's Code & Diagram Hub",
  description: "Arduino project codes, wiring diagrams, and tutorials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-950 pt-24 pb-12">
        <Navbar />
        
        {/* The Toaster Container - we set it to bottom-center for a mobile-friendly feel */}
        <Toaster 
          position="bottom-center" 
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }} 
        />
        
        {children}
      </body>
    </html>
  );
}