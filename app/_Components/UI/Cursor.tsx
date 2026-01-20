"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!cursorRef.current || !dotRef.current) return;

      const x = e.clientX;
      const y = e.clientY;

      cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
      dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      {/* Outer Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-purple-500 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out"
      />

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-purple-500 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
