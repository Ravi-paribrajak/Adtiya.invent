import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
        {/* Our new Premium Navbar */}
        <Navbar />
        
        {/* The rest of the page content */}
        {children}
      </body>
    </html>
  );
}