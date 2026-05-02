"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

// Simple theme placeholder - no longer needed but kept for compatibility
export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// No-op theme toggle - single theme only
export const AnimatedThemeToggle = () => {
  return null; // Theme toggle removed - single black + cream theme
};
