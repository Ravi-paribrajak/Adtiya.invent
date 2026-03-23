import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ThemeProvider"; // NEW IMPORT

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
    <html lang="en" suppressHydrationWarning>
      {/* Note: suppressHydrationWarning is required by next-themes on the HTML tag */}
      <body className="antialiased bg-gray-50 dark:bg-[#0a0a0a] text-gray-950 dark:text-gray-100 pt-24 pb-12 transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <Toaster 
            position="bottom-center" 
            toastOptions={{
              duration: 3000,
              style: { background: '#333', color: '#fff' },
            }} 
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}