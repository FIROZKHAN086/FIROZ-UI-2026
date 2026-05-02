'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaAnglesRight, FaCode, FaRocket, FaArrowRight } from 'react-icons/fa6';
import { LiaSlackHash } from 'react-icons/lia';
import { IoSparkles } from "react-icons/io5";
import { 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiExpress, 
  SiMongodb, 
  SiTypescript, 
  SiTailwindcss, 
  SiGithub
} from 'react-icons/si';
import { IconType } from 'react-icons';
import Image from 'next/image';

interface ButtonProps {
  primary?: boolean;
  children: React.ReactNode;
  href?: string;
  noArrows?: boolean;
}

export const Button = ({
  primary = true,
  children,
  href,
  noArrows = false,
}: ButtonProps) => {
  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <a
        href={href}
        className={`inline-flex gap-2 items-center px-6 py-3 font-medium rounded-xl transition-all duration-300  
        ${
          primary
            ? `text-[#0a0a0a] bg-gradient-to-r from-[#a78bfa] to-[#ec4899] hover:shadow-lg hover:shadow-[#a78bfa]/30 hover:scale-[1.02]`
            : `backdrop-blur-sm hover:scale-[1.02] border
                bg-[#111111]/50 text-[#faf8f0]/80 hover:bg-[#111111]/80 border-[#faf8f0]/10`
        }`}
      >
        {children}
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className={`${noArrows && 'hidden'}`}
        >
          <FaAnglesRight />
        </motion.span>
      </a>
    </motion.div>
  );
};

interface StatItem {
  label: string;
  value: string;
  icon: IconType;
  color: string;
}

interface TechItem {
  name: string;
  icon: IconType;
  bg: string;
  orbitSpeed: number;
  orbitDirection: "clockwise" | "counter-clockwise";
  orbitRadius: number;
}

const HeroSection = () => {
  const [animationsActive, setAnimationsActive] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const particleRef = useRef<HTMLDivElement>(null);
  const orbitRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const variants = {
    fadeInUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    fadeZoom: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
    scaleUp: {
      hidden: { scale: 0 },
      visible: { scale: 1 },
    },
  };

  useEffect(() => {
    setAnimationsActive(true);
    
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Floating particles animation
    if (particleRef.current) {
      const particles = particleRef.current.querySelectorAll('.particle');
      particles.forEach((particle, i) => {
        // Use GSAP or simple CSS animation
      });
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const techStack: TechItem[] = [
    { 
      name: "React", 
      icon: SiReact, 
      bg: "bg-gradient-to-br from-[#3b82f6]/80 to-[#06b6d4]/80",
      orbitSpeed: 500,
      orbitDirection: "clockwise",
      orbitRadius: 180
    },
    { 
      name: "Next.js", 
      icon: SiNextdotjs, 
      bg: "bg-gradient-to-br from-[#111111] to-[#0a0a0a]",
      orbitSpeed: 600,
      orbitDirection: "counter-clockwise",
      orbitRadius: 260
    },
    { 
      name: "Node.js", 
      icon: SiNodedotjs, 
      bg: "bg-gradient-to-br from-[#10b981]/80 to-[#06b6d4]/80",
      orbitSpeed: 900,
      orbitDirection: "clockwise",
      orbitRadius: 100
    },
    { 
      name: "Express", 
      icon: SiExpress, 
      bg: "bg-gradient-to-br from-[#6b7280]/80 to-[#374151]/80",
      orbitSpeed: 205,
      orbitDirection: "counter-clockwise",
      orbitRadius: 150
    },
    { 
      name: "TypeScript", 
      icon: SiTypescript, 
      bg: "bg-gradient-to-br from-[#3b82f6]/80 to-[#6366f1]/80",
      orbitSpeed: 2000,
      orbitDirection: "clockwise",
      orbitRadius: 190
    },
    { 
      name: "MongoDB", 
      icon: SiMongodb, 
      bg: "bg-gradient-to-br from-[#10b981]/80 to-[#14b8a]/80",
      orbitSpeed: 300,
      orbitDirection: "counter-clockwise",
      orbitRadius: 300
    },
    { 
      name: "Tailwind", 
      icon: SiTailwindcss, 
      bg: "bg-gradient-to-br from-[#06b6d4]/80 to-[#3b82f6]/80",
      orbitSpeed: 35,
      orbitDirection: "clockwise",
      orbitRadius: 210
    },
    { 
      name: "Git", 
      icon: SiGithub, 
      bg: "bg-gradient-to-br from-[#374151]/80 to-[#111111]/80",
      orbitSpeed: 50,
      orbitDirection: "counter-clockwise",
      orbitRadius: 140
    },
  ];

  const stats: StatItem[] = [
    { 
      label: "Projects", 
      value: "26+", 
      icon: FaCode, 
      color: "from-[#a78bfa] to-[#6366f1]"
    },
    { 
      label: "Experience", 
      value: "2+ Years", 
      icon: FaRocket, 
      color: "from-[#a78bfa] to-[#ec4899]"
    },
    { 
      label: "Clients", 
      value: "30+", 
      icon: IoSparkles, 
      color: "from-[#10b981] to-[#06b6d4]"
    },
    { 
      label: "Satisfaction", 
      value: "100%", 
      icon: IoSparkles, 
      color: "from-[#f59e0b] to-[#ef4444]"
    },
  ];

  const scrollToContact = () => {
    const section = document.getElementById('contact');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef} 
      suppressHydrationWarning={true}
      className="overflow-hidden mt-[100px] lg:mt-[5rem] relative px-4 min-h-screen sm:px-8 lg:px-16 bg-[#0a0a0a] text-[#faf8f0]"
    >
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full blur-3xl animate-pulse bg-gradient-to-r from-[#a78bfa]/20 via-[#a78bfa]/10 to-[#ec4899]/20" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] rounded-full blur-3xl animate-pulse delay-1000 bg-gradient-to-r from-[#3b82f6]/20 via-[#3b82f6]/10 to-[#06b6d4]/20" />
        
        {/* Grid Pattern */}
        <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#a78bfa,transparent_40%),radial-gradient(circle_at_bottom_right,#06b6d4,transparent_40%)] animate-pulse" />
        </div>

        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:60px_60px] text-[#faf8f0]" />
        </div>
      </div>

      {/* Floating Particles */}
      <div ref={particleRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="particle absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gradient-to-r from-[#a78bfa]/30 to-[#ec4899]/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="grid relative z-10 gap-6 items-center py-10 mx-auto sm:gap-12 sm:py-20 lg:grid-cols-2 lg:gap-16">
        {/* Left */}
        <div className="flex flex-col order-2 lg:order-1">
          <motion.div
            initial="hidden"
            animate={animationsActive ? 'visible' : 'hidden'}
            variants={variants.fadeInUp}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-flex gap-2 items-center px-4 py-2 mb-4 text-sm font-medium rounded-full backdrop-blur-sm border shadow-sm bg-[#111111]/50 border-[#a78bfa]/30 text-[#a78bfa]">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#a78bfa]"
              />
              <LiaSlackHash size={18} />
              Full-Stack Developer & Problem Solver
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={variants.fadeInUp}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mb-4 text-4xl font-extrabold md:text-5xl lg:text-6xl text-[#faf8f0]"
          >
            Crafting{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#ec4899]">
              Digital
            </span>{" "}
            <br className="hidden sm:block" />
            Experiences with{" "}
            <motion.span
              animate={{ 
                backgroundPosition: ["0%", "100%", "0%"] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "linear" 
              }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] via-[#06b6d4] to-[#3b82f6] bg-[length:200%_auto]"
            >
              Code
            </motion.span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate={animationsActive ? 'visible' : 'hidden'}
            variants={variants.fadeIn}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mb-6 text-lg text-[#faf8f0]/70"
          >
            Hi, I'm <span className="font-semibold text-[#a78bfa]">
              Firoz
            </span>. I create stunning and functional web experiences that help businesses grow. 
            With expertise in modern frameworks and a passion for clean code.
          </motion.p>

         
          {/* Call to action buttons */}
          <motion.div
            initial="hidden"
            animate={animationsActive ? 'visible' : 'hidden'}
            variants={variants.fadeInUp}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(167, 139, 250, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 sm:px-8 sm:py-4 text-[#0a0a0a] font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base bg-gradient-to-r from-[#a78bfa] to-[#ec4899]"
            >
              <a
              onClick={() => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  }}
  className="cursor-pointer"
 >Start a Project</a>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaArrowRight className="text-sm" />
              </motion.span>
            </motion.button>
            
            <Button href="/projects" primary={false}>
              View Project
            </Button>
          </motion.div>

          {/* Tech Stack List (Mobile) */}
          <motion.div
            initial="hidden"
            animate={animationsActive ? 'visible' : 'hidden'}
            variants={variants.fadeInUp}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="mt-6 sm:mt-8 lg:hidden"
          >
            <div className="flex flex-wrap justify-center gap-2">
              {techStack.slice(0, isMobile ? 4 : 6).map((tech, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`px-3 py-1.5 rounded-full ${tech.bg} text-[#0a0a0a] text-xs font-medium shadow-sm flex items-center gap-1 backdrop-blur-sm`}
                >
                  <tech.icon className="w-3 h-3" />
                  <span>{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="relative z-40 order-1 mb-10 sm:mb-20 lg:order-2 lg:mb-0 flex justify-center lg:justify-end"
        >
          <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] lg:w-[460px] lg:h-[460px] xl:w-[520px] xl:h-[520px]">
            
            {/* Orbiting Rings */}
            {[140, 160, 180, 200, 220].map((radius, index) => (
              <motion.div
                key={`ring-${index}`}
                animate={{ 
                  rotate: index % 2 === 0 ? 360 : -360 
                }}
                transition={{
                  duration: 60 + index * 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute rounded-full border border-[#faf8f0]/10"
                style={{
                  width: `${radius * 2}px`,
                  height: `${radius * 2}px`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}

            {/* Orbiting Tech Items */}
            <AnimatePresence>
              {techStack.map((tech, index) => {
                const startAngle = (index * 2 * Math.PI) / techStack.length;
                const orbitRadius = isMobile ? tech.orbitRadius * 0.7 : tech.orbitRadius;
                
                return (
                  <motion.div
                    key={tech.name}
                    ref={(el) => {
  orbitRefs.current[index] = el;
 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={{
                      x: [
                        `calc(${Math.cos(startAngle)} * ${orbitRadius}px)`,
                        `calc(${Math.cos(startAngle + Math.PI)} * ${orbitRadius}px)`,
                        `calc(${Math.cos(startAngle + 2 * Math.PI)} * ${orbitRadius}px)`,
                      ],
                      y: [
                        `calc(${Math.sin(startAngle)} * ${orbitRadius}px)`,
                        `calc(${Math.sin(startAngle + Math.PI)} * ${orbitRadius}px)`,
                        `calc(${Math.sin(startAngle + 2 * Math.PI)} * ${orbitRadius}px)`,
                      ],
                      transition: {
                        x: {
                          duration: tech.orbitSpeed,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        y: {
                          duration: tech.orbitSpeed,
                          repeat: Infinity,
                          ease: "linear",
                        },
                      },
                      rotate: tech.orbitDirection === "clockwise" ? 360 : -360,
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      transition: { duration: 0.2 }
                    }}
                    style={{
                      width: isMobile ? '2rem' : '3rem',
                      height: isMobile ? '2rem' : '3rem',
                    }}
                  >
                    <div className={`w-full h-full rounded-full ${tech.bg} shadow-lg backdrop-blur-sm border flex items-center justify-center border-[#faf8f0]/10`}>
                      <tech.icon className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-[#0a0a0a]`} />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Center Profile */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60">
                {/* Profile Image */}
                <div className="relative w-full z-[10] h-full rounded-full shadow-2xl overflow-hidden border-4 sm:border-6 border-[#0a0a0a]">
                  <Image
                  fill
                    src="/firoz.jpeg"
                    alt="Professional Developer Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full blur-xl -z-10 bg-gradient-to-r from-[#a78bfa]/40 to-[#ec4899]/40 opacity-30" />
                
                {/* Pulsing Ring */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.2, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                  className="absolute -inset-2 sm:-inset-3 rounded-full -z-20 border-2 border-[#a78bfa]/30"
                />
              </div>
            </motion.div>

            {/* Floating Badges */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.1 }}
              className="absolute -top-2 sm:-top-4 left-1/2 transform -translate-x-1/2"
            >
              <div className="rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-xl bg-gradient-to-r from-[#a78bfa]/80 to-[#ec4899]/80 backdrop-blur-sm border border-[#a78bfa]/30">
                <div className="text-[#0a0a0a] text-center">
                  <div className="text-sm sm:text-lg font-bold">2+ Years</div>
                  <div className="text-xs sm:text-sm opacity-90">
                    Experience
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.1 }}
              className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2"
            >
              <div className="rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-xl backdrop-blur-sm border bg-[#111111]/70 border-[#faf8f0]/10">
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#10b981]"
                  />
                  <span className="text-xs sm:text-sm font-semibold whitespace-nowrap text-[#faf8f0]/80">
                    Available for Work
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.1, x: -5 }}
              className="absolute top-1/2 -left-2 sm:-left-4 transform -translate-y-1/2"
            >
              <div className="rounded-xl p-3 sm:p-4 shadow-xl backdrop-blur-sm border bg-[#111111]/70 border-[#faf8f0]/10">
                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-bold text-[#faf8f0]">
                    26+
                  </div>
                  <div className="text-xs sm:text-sm text-[#faf8f0]/60">
                    Projects Built
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
  animate={{ opacity: 1, scale: 1, rotate: 0 }}
  transition={{ 
    delay: 1.2, 
    type: "spring", 
    stiffness: 200, 
    damping: 15 
  }}
  whileHover={{ 
    scale: 1.05, 
    rotate: 1,
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)" 
  }}
  className="absolute z-[4]  top-1/2 -left-4 sm:right-4 transform -translate-y-1/2 "
>
  <div className="
    relative rounded-2xl p-3 sm:p-4 shadow-2xl backdrop-blur-xl border 
    max-w-[140px] sm:max-w-[160px] md:max-w-[180px]
    overflow-hidden
    bg-gradient-to-br from-[#111111]/80 to-[#0a0a0a]/80 border-[#faf8f0]/10
    before:absolute before:inset-0 before:bg-gradient-to-r 
    before:from-transparent before:via-[#3b82f6]/10 before:to-transparent
    before:animate-shimmer
  ">
    
    
    <div className="absolute -inset-1 bg-gradient-to-r from-[#3b82f6]/20 to-[#a78bfa]/20 blur-xl opacity-50" />
    
   
    <div className={`
      absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-2xl
      border-[#3b82f6]/50
    `} />
    <div className={`
      absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-2xl
      border-[#a78bfa]/50
    `} />
    
  
    <div className="relative space-y-1.5">
      
      <div className="flex items-center gap-1.5 mb-2">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
          <div className="w-2 h-2 rounded-full bg-[#10b981]/80" />
        </div>
        <span className="text-[9px] font-mono tracking-wider text-[#faf8f0]/60">
          solution.js
        </span>
      </div>
      
      <div className="font-mono text-[10px] sm:text-xs space-y-1">
        <div className="flex items-center">
          <span className="mr-2 text-[#faf8f0]/40">1</span>
          <span className="text-[#3b82f6]">export</span>
          <span className="mx-1 text-[#faf8f0]/40">const</span>
          <span className="text-[#10b981]">createSolution</span>
          <span className="text-[#faf8f0]/40">=</span>
          <span className="text-[#a78bfa]">(</span>
        </div>
        
        <div className="flex items-center ml-4">
          <span className="mr-2 text-[#faf8f0]/40">2</span>
          <span className="text-[#faf8f0]/60">problem</span>
          <span className="text-[#faf8f0]/40">,</span>
        </div>
        
        <div className="flex items-center">
          <span className="mr-2 text-[#faf8f0]/40">3</span>
          <span className="text-[#faf8f0]/60">creativity</span>
          <span className="text-[#faf8f0]/40">,</span>
        </div>
        
        <div className="flex items-center">
          <span className="mr-2 text-[#faf8f0]/40">4</span>
          <span className="text-[#faf8f0]/60">innovation</span>
        </div>
        
        <div className="flex items-center">
          <span className="mr-2 text-[#faf8f0]/40">5</span>
          <span className="text-[#a78bfa]">)</span>
          <span className="text-[#faf8f0]/40 mx-1">= &gt; </span>
          <span className="text-[#a78bfa]">{"{"}</span>
        </div>
        
        <div className="flex items-center ml-4">
          <span className="mr-2 text-[#faf8f0]/40">6</span>
          <span className="text-[#faf8f0]/40">return</span>
          <span className="mx-2 px-2 py-0.5 rounded text-[9px] font-bold bg-gradient-to-r from-[#3b82f6]/30 to-[#a78bfa]/30 text-[#3b82f6] border border-[#3b82f6]/30">
            &quot;elegant()&ldquo; 
          </span>
        </div>
        
        <div className="flex items-center">
          <span className="mr-2 text-[#faf8f0]/40">7</span>
          <span className="text-[#a78bfa]">{"}"}</span>
        </div>
        
        {/* Cursor blink animation */}
        <div className="flex items-center ml-4">
          <span className="mr-2 text-[#faf8f0]/40">8</span>
          <div className="w-2 h-3 bg-[#3b82f6] animate-pulse rounded-sm" />
        </div>
      </div>
    </div>
    
    {/* Floating dots */}
    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#3b82f6]/40 animate-ping" />
    <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-[#a78bfa]/40 animate-ping delay-300" />
  </div>
</motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
