"use client";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import React, { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

// Theme change animation component
const ThemeChangeEffects = () => {
  const [isChanging, setIsChanging] = useState<boolean>(false);
  
  useEffect(() => {
    const handleThemeChange = () => {
      setIsChanging(true);
      
      // Reset after animation completes
      setTimeout(() => setIsChanging(false), 1000);
    };

    // Listen for theme changes
    window.addEventListener('theme-change', handleThemeChange);
    
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  return (
    <AnimatePresence>
      {isChanging && (
        <>
          {/* Overlay animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] pointer-events-none"
          >
            {/* Sun/Moon burst effect */}
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 4, rotate: 180 }}
              exit={{ scale: 0, rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-500/20 dark:from-blue-400/30 dark:to-indigo-500/20 blur-xl"
            />
            
            {/* Particle burst */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  scale: 0,
                  x: 0,
                  y: 0,
                  opacity: 1
                }}
                animate={{
                  scale: 1,
                  x: Math.cos((i * 30) * Math.PI / 180) * 100,
                  y: Math.sin((i * 30) * Math.PI / 180) * 100,
                  opacity: 0
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: i * 0.02
                }}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-blue-400 to-indigo-500"
              />
            ))}
          </motion.div>
          
          {/* Ripple effect */}
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 20, opacity: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9998] pointer-events-none bg-gradient-radial from-yellow-200/10 via-transparent to-transparent dark:from-blue-200/10"
          />
        </>
      )}
    </AnimatePresence>
  );
};

interface ThemeProviderProps {
  children: ReactNode;
}

// Enhanced Theme Provider with animations
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <NextThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemeProvider>
    );
  }

  return (
    <>
      <ThemeChangeEffects />
      <NextThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        
        {/* Theme change listener */}
        <ThemeChangeListener />
      </NextThemeProvider>
    </>
  );
}

// Component to listen for theme changes and trigger animations
const ThemeChangeListener = () => {
  useEffect(() => {
    const handleSystemThemeChange = () => {
      // Trigger animation
      window.dispatchEvent(new CustomEvent('theme-change'));
    };

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          handleSystemThemeChange();
        }
      });
    });

    // Observe document element for class changes
    observer.observe(document.documentElement, { attributes: true });

    // Also listen for theme change events
    window.addEventListener('theme-change-trigger', handleSystemThemeChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('theme-change-trigger', handleSystemThemeChange);
    };
  }, []);

  return null;
};

interface UseAnimatedThemeReturn {
  toggleThemeWithAnimation: (theme: string, setTheme: (theme: string) => void) => void;
  isAnimating: boolean;
}

// Custom hook for animated theme toggle
export const useAnimatedTheme = (): UseAnimatedThemeReturn => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const toggleThemeWithAnimation = (theme: string, setTheme: (theme: string) => void) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Trigger theme change animation
    window.dispatchEvent(new CustomEvent('theme-change', { 
      detail: { theme: theme === 'dark' ? 'light' : 'dark' } 
    }));
    
    // Change theme after a short delay
    setTimeout(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      setIsAnimating(false);
    }, 300);
  };

  return { toggleThemeWithAnimation, isAnimating };
};

interface AnimatedThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
  className?: string;
}

// Animated Theme Toggle Button Component
export const AnimatedThemeToggle = ({ theme, setTheme, className = "" }: AnimatedThemeToggleProps) => {
  const { toggleThemeWithAnimation, isAnimating } = useAnimatedTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      onClick={() => toggleThemeWithAnimation(theme, setTheme)}
      disabled={isAnimating}
      className={`relative w-14 h-8 rounded-full p-1 overflow-hidden ${className}
        ${theme === 'dark' 
          ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black' 
          : 'bg-gradient-to-r from-gray-300 via-gray-200 to-white'
        } shadow-lg border
        ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}
      aria-label="Toggle theme"
    >
      {/* Animated background gradient */}
      <motion.div
        animate={isAnimating ? {
          background: [
            theme === 'dark' 
              ? 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)' 
              : 'linear-gradient(45deg, #fbbf24, #f97316, #ef4444)',
            theme === 'dark' 
              ? 'linear-gradient(45deg, #fbbf24, #f97316, #ef4444)' 
              : 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)',
            theme === 'dark' 
              ? 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)' 
              : 'linear-gradient(45deg, #fbbf24, #f97316, #ef4444)',
          ]
        } : {}}
        transition={{ 
          duration: 0.8, 
          repeat: isAnimating ? Infinity : 0,
          ease: "linear"
        }}
        className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300"
      />
      
      {/* Sun/Moon toggle */}
      <motion.div
        layout
        initial={false}
        animate={{ 
          x: theme === 'dark' ? 24 : 0,
          rotate: theme === 'dark' ? 180 : 0
        }}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
        className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
      >
        {/* Sun/Moon icon with rotation */}
        <motion.div
          animate={isAnimating ? { rotate: 360 } : {}}
          transition={{ 
            duration: 0.5, 
            repeat: isAnimating ? Infinity : 0,
            ease: "linear"
          }}
          className="w-5 h-5"
        >
          {theme === "dark" ? (
            <FiSun className="w-5 h-5 text-yellow-400" />
          ) : (
            <FiMoon className="w-5 h-5 text-gray-300" />
          )}
        </motion.div>
        
        {/* Glow effect */}
        <motion.div
          animate={isAnimating ? {
            boxShadow: [
              "0 0 10px rgba(251, 191, 36, 0.5)",
              "0 0 20px rgba(59, 130, 246, 0.5)",
              "0 0 10px rgba(251, 191, 36, 0.5)",
            ]
          } : {}}
          transition={{ 
            duration: 0.8, 
            repeat: isAnimating ? Infinity : 0 
          }}
          className={`absolute inset-0 rounded-full blur-md
            ${theme === 'dark' 
              ? 'bg-yellow-400/30' 
              : 'bg-blue-500/30'
            }`}
        />
      </motion.div>
      
      {/* Stars for dark mode */}
      {theme === 'dark' && (
        <>
          <div className="absolute top-1/4 left-2 w-0.5 h-0.5 bg-blue-400 rounded-full animate-pulse" />
          <div className="absolute top-1/2 right-3 w-0.5 h-0.5 bg-blue-400 rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-1/3 left-3 w-0.5 h-0.5 bg-blue-400 rounded-full animate-pulse delay-500" />
        </>
      )}
      
      {/* Clouds for light mode */}
      {theme === 'light' && (
        <>
          <div className="absolute top-1/4 right-2 w-3 h-1 bg-white/50 rounded-full blur-sm" />
          <div className="absolute bottom-1/3 left-2 w-2 h-0.5 bg-white/40 rounded-full blur-sm" />
        </>
      )}
    </motion.button>
  );
};

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

export default function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}