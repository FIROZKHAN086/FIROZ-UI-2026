import type { Metadata } from "next";
import { Geist, Geist_Mono, Inconsolata, Jost, Unbounded } from "next/font/google";
import "./_Components/Style/globals.css";
import { ThemeProvider } from "./_Components/Theme/Theme";
import Header from "./_Components/UI/Header";
import Footer from "./_Components/UI/Footer";
import { Cursor } from "./_Components/UI/Cursor";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const unbounded = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FIROZ Dev | Portfolio ",
  description: "A modern portfolio showcasing my web development skills, real client testimonials, and high-quality projects built with React, Next.js, and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en" suppressHydrationWarning={true}>
       <link rel="icon" href="/firoz.png" />
        <meta name="theme-color" content="#000000" />
      <body
      suppressHydrationWarning
        className={` ${unbounded.variable} antialiased`}
        >
      <ThemeProvider>
        <Toaster
  position="top-right"
  reverseOrder={false}
/>  
        <Analytics />
        <Cursor/>
        <Header/>
        {children}
        <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
