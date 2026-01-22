"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      // Check touch capability and screen width
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768; // Tailwind's md breakpoint
      setIsMobile(hasTouch || isSmallScreen);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Hide cursor when not needed
  useEffect(() => {
    if (isMobile) {
      return;
    }

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    // Hide cursor when mouse leaves window
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isMobile]);

  // Mouse movement effect
  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      if (!cursorRef.current || !dotRef.current) return;

      const x = e.clientX;
      const y = e.clientY;

      // Smooth animation with requestAnimationFrame
      requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
        }
        if (dotRef.current) {
          dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    };

    // Interactive cursor effects
    const handleMouseDown = () => {
      if (cursorRef.current && dotRef.current) {
        cursorRef.current.style.transform += " scale(0.8)";
        dotRef.current.style.transform += " scale(0.8)";
      }
    };

    const handleMouseUp = () => {
      if (cursorRef.current && dotRef.current) {
        cursorRef.current.style.transform = cursorRef.current.style.transform.replace(" scale(0.8)", "");
        dotRef.current.style.transform = dotRef.current.style.transform.replace(" scale(0.8)", "");
      }
    };

    // Add hover effects for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]');

      if (cursorRef.current && dotRef.current && isInteractive) {
        cursorRef.current.style.width = "40px";
        cursorRef.current.style.height = "40px";
        cursorRef.current.style.backgroundColor = "rgba(168, 85, 247, 0.1)";
        cursorRef.current.style.border = "2px solid rgba(168, 85, 247, 0.8)";
        dotRef.current.style.width = "4px";
        dotRef.current.style.height = "4px";
      }
    };

    const handleMouseOut = () => {
      if (cursorRef.current && dotRef.current) {
        cursorRef.current.style.width = "32px";
        cursorRef.current.style.height = "32px";
        cursorRef.current.style.backgroundColor = "transparent";
        cursorRef.current.style.border = "2px solid rgba(168, 85, 247, 0.6)";
        dotRef.current.style.width = "8px";
        dotRef.current.style.height = "8px";
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isMobile, isVisible]);

  // Don't render cursor on mobile
  if (isMobile) {
    return null;
  }

  // Don't render if not visible
  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Outer Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-purple-500/60 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out mix-blend-difference will-change-transform"
        style={{
          backdropFilter: 'blur(1px)',
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)'
        }}
      />

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-purple-500 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-75 ease-out mix-blend-difference will-change-transform"
        style={{
          boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)'
        }}
      />

      {/* Optional: Trail effect */}
      <style jsx global>{`
        @keyframes fadeOut {
          0% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        }

        .cursor-trail {
          position: fixed;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(168, 85, 247, 0.4);
          pointer-events: none;
          z-index: 9998;
          animation: fadeOut 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
}