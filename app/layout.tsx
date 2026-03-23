import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import BackgroundDots from "@/components/BackgroundDots";
import { Toaster } from "react-hot-toast";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adtiya.invents | Official Project Hub",
  description: "The master archive for exact C++ source codes, high-resolution wiring diagrams, and component blueprints.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Google AdSense Script */}
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script>
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 dark:bg-[#0a0a0a] text-gray-950 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider>
          <BackgroundDots />
          <Navbar />
          <Toaster 
            position="bottom-center" 
            toastOptions={{
              duration: 3000,
              style: { background: '#333', color: '#fff', borderRadius: '16px' },
            }} 
          />
          {children}
        </ThemeProvider>
        
        {/* Google Analytics Tag */}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}