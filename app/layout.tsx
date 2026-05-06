import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./src/Style/globals.css";
import Header from "./src/UI/Header";
import Footer from "./src/UI/Footer";
import { Cursor } from "./src/UI/Cursor";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "./src/Theme/Theme";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FIROZ Dev | Portfolio",
  description:
    "A modern portfolio showcasing my web development skills, real client testimonials, and high-quality projects built with React, Next.js, and TypeScript.",
  verification: {
    google: "oL4aejLeDtqxjfIYPPQBOg-GddA4_wZ5Nqi7WFNU_VQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/firoz.png" />
      <meta name="theme-color" content="#0a0a0a" />
      <body
        className={`${jost.variable} antialiased bg-white dark:bg-[#0a0a0a] text-black dark:text-[#faf8f0] transition-colors duration-300`}
      >
        <ThemeProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <Analytics />
          <Cursor />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
