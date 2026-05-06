"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaRocket, FaArrowRight, FaBolt } from "react-icons/fa";
import { FiMousePointer } from "react-icons/fi";
import Link from "next/link";

const ContactCTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax and Reveal transforms
  const xLeft = useTransform(scrollYProgress, [0, 0.5], [-100, 0]);
  const xRight = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  
  // Before/After Reveal Swipe
  const revealWidth = useTransform(scrollYProgress, [0.4, 0.6], ["0%", "100%"]);

  return (
    <section 
      id="contact"
      ref={containerRef}
      className="relative min-h-[120vh] flex items-center justify-center py-20 px-4 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a78bfa]/5 blur-[120px] rounded-full" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#ec4899]/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <motion.div 
            style={{ x: xLeft, opacity, scale }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#111111]/80 backdrop-blur-xl border border-[#a78bfa]/30 shadow-2xl">
              <FaBolt className="text-[#a78bfa] animate-pulse" />
              <span className="text-sm font-black uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-[#a78bfa] to-[#ec4899]">
                Ready to Level Up?
              </span>
            </div>

            <h2 className="text-5xl sm:text-7xl font-black text-[#faf8f0] leading-[1.1] tracking-tighter">
              Stop Dreaming, <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#a78bfa] via-[#ec4899] to-[#a78bfa] animate-gradient-x">
                Start Building.
              </span>
            </h2>

            <p className="text-xl text-[#faf8f0]/60 max-w-lg leading-relaxed">
              Don&apos;t settle for average. Let&apos;s create a digital experience that 
              dominates your market and delights your users.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link href="/Contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-2xl bg-linear-to-r from-[#a78bfa] to-[#ec4899] text-[#0a0a0a] font-bold text-lg shadow-2xl shadow-[#a78bfa]/20 flex items-center justify-center gap-3 group"
                >
                  Contact Me Now
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

            </div>
          </motion.div>

          {/* Right Side: Before/After Interactive Visual */}
          <motion.div 
            style={{ x: xRight, opacity, scale }}
            className="relative h-[400px] sm:h-[500px] group cursor-pointer"
          >
            {/* After State (The Solution) */}
            <div className="absolute inset-0 rounded-[3rem] bg-linear-to-br from-[#111111] to-[#0a0a0a] border border-[#a78bfa]/20 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(167,139,250,0.15),transparent)]" />
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                 <motion.div
                   animate={{ 
                     y: [0, -10, 0],
                     rotate: [0, 5, 0]
                   }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="mb-6 p-6 rounded-3xl bg-[#a78bfa]/10 border border-[#a78bfa]/20 shadow-2xl"
                 >
                    <FaRocket className="text-5xl text-[#a78bfa]" />
                 </motion.div>
                 <h3 className="text-3xl font-bold text-[#faf8f0] mb-4">The Firoz Standard</h3>
                 <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#10b981]/10 text-[#10b981] text-[10px] font-black uppercase tracking-widest border border-[#10b981]/20">Fast</span>
                    <span className="px-3 py-1 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] text-[10px] font-black uppercase tracking-widest border border-[#3b82f6]/20">Scalable</span>
                    <span className="px-3 py-1 rounded-full bg-[#ec4899]/10 text-[#ec4899] text-[10px] font-black uppercase tracking-widest border border-[#ec4899]/20">Secure</span>
                 </div>
              </div>
            </div>

            {/* Before State (The Problem) - revealed by scroll */}
            <motion.div 
              style={{ width: revealWidth }}
              className="absolute top-0 right-0 bottom-0 z-20 bg-[#111111] rounded-[3rem] grayscale border border-white/5 overflow-hidden"
            >
              <div className="flex flex-col items-center justify-center h-full w-[100%] text-center p-8 opacity-40">
                 <div className="mb-6 p-6 rounded-3xl bg-white/5 border border-white/10">
                    <FaBolt className="text-5xl text-white/50" />
                 </div>
                 <h3 className="text-3xl font-bold text-white/50 mb-4 whitespace-nowrap">Average Quality</h3>
                 <p className="text-xs text-white/20 uppercase tracking-widest font-black">Slow & Unoptimized</p>
              </div>
            </motion.div>

            {/* Reveal Line/Handle */}
            <motion.div 
              style={{ right: revealWidth }}
              className="absolute top-0 bottom-0 w-1 bg-linear-to-b from-[#a78bfa] to-[#ec4899] z-30"
            >
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#a78bfa] flex items-center justify-center shadow-2xl">
                  <FiMousePointer className="text-[#0a0a0a]" />
               </div>
            </motion.div>

            {/* Floating Stats */}
            <motion.div
              animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-6 -right-6 p-4 rounded-2xl bg-[#111111]/90 backdrop-blur-xl border border-[#a78bfa]/30 shadow-2xl z-40 hidden sm:block"
            >
               <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#a78bfa]/20 text-[#a78bfa]">
                     <FaBolt />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#faf8f0]/40 uppercase font-black tracking-widest">Performance</p>
                    <p className="text-lg font-black text-[#faf8f0]">99+</p>
                  </div>
               </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#faf8f0]/20 font-black">Scroll to Reveal</span>
        <div className="w-[1px] h-12 bg-linear-to-b from-[#a78bfa]/40 to-transparent" />
      </motion.div>
    </section>
  );
};

export default ContactCTA;


