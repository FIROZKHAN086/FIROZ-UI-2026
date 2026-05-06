"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={true}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

export const AnimatedThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="w-12 h-12 rounded-xl bg-[#111111]/80 border border-[#faf8f0]/10" />
  );

  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-12 h-12 rounded-xl flex items-center justify-center
                 bg-[#111111]/80 dark:bg-[#111111]/80 backdrop-blur-md
                 border border-[#faf8f0]/10 dark:border-white/10
                 shadow-lg shadow-black/30
                 hover:shadow-xl hover:shadow-[#a78bfa]/20
                 overflow-hidden group transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-[#a78bfa]/0 via-[#a78bfa]/10 to-[#ec4899]/0"
        animate={{
          x: ["0%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ y: 20, opacity: 0, rotate: 45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -45 }}
            transition={{ duration: 0.3, ease: "backOut" }}
          >
            <FiMoon className="w-5 h-5 text-[#a78bfa]" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.3, ease: "backOut" }}
          >
            <FiSun className="w-5 h-5 text-[#ec4899]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className={`absolute inset-0 blur-md ${isDark ? 'bg-[#a78bfa]/20' : 'bg-[#ec4899]/20'}`} />
      </div>
    </motion.button>
  );
};
