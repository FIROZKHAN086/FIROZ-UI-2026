'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaAnglesRight, FaCode, FaRocket, FaArrowRight } from 'react-icons/fa6';
import { LiaSlackHash } from 'react-icons/lia';
import { IoSparkles } from "react-icons/io5";
import gsap from "gsap";
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
import { useTheme } from 'next-themes';
import Image from 'next/image';

interface ButtonProps {
  primary?: boolean;
  children: React.ReactNode;
  href?: string;
  noArrows?: boolean;
  theme?: string;
}

export const Button = ({
  primary = true,
  children,
  href,
  noArrows = false,
  theme
}: ButtonProps) => {
  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <a
        href={href}
        className={`inline-flex gap-2 items-center px-6 py-3 font-medium rounded-xl transition-all duration-300  
        ${
          primary
            ? `text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] 
               ${theme === 'dark' ? 'dark:from-purple-500 dark:to-pink-500 dark:hover:shadow-purple-500/50' : ''}`
            : `backdrop-blur-sm hover:scale-[1.02] border
               ${theme === 'dark' 
                 ? 'bg-gray-800/30 text-gray-200 hover:bg-gray-700/50 border-gray-700/50' 
                 : 'bg-white/10 text-gray-900 hover:bg-white/20 border-white/20'}`
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
  bg: string;
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

  const { theme } = useTheme(); 

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
        gsap.to(particle, {
          y: -20,
          x: Math.sin(i) * 10,
          duration: 2 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2
        });
      });
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Tech stack with orbit configuration
  const techStack: TechItem[] = [
    { 
      name: "React", 
      icon: SiReact, 
      bg: theme === 'dark' 
        ? "bg-gradient-to-br from-cyan-500/80 to-blue-600/80 dark:border-cyan-500/30" 
        : "bg-gradient-to-br from-cyan-500 to-blue-500",
      orbitSpeed: 500,
      orbitDirection: "clockwise",
      orbitRadius: 180
    },
    { 
      name: "Next.js", 
      icon: SiNextdotjs, 
      bg: theme === 'dark'
        ? "bg-gradient-to-br from-gray-800/80 to-gray-900/80 dark:border-gray-700/30"
        : "bg-gradient-to-br from-gray-800 to-gray-900",
      orbitSpeed: 600,
      orbitDirection: "counter-clockwise",
      orbitRadius: 260
    },
    { 
      name: "Node.js", 
      icon: SiNodedotjs, 
      bg: theme === 'dark'
        ? "bg-gradient-to-br from-green-500/80 to-emerald-600/80 dark:border-green-500/30"
        : "bg-gradient-to-br from-green-500 to-emerald-600",
      orbitSpeed: 900,
      orbitDirection: "clockwise",
      orbitRadius: 100
    },
    { 
      name: "Express", 
      icon: SiExpress, 
      bg: theme === 'dark'
        ? "bg-gradient-to-br from-gray-600/80 to-gray-800/80 dark:border-gray-600/30"
        : "bg-gradient-to-br from-gray-600 to-gray-800",
      orbitSpeed: 205,
      orbitDirection: "counter-clockwise",
      orbitRadius: 150
    },
    { 
      name: "TypeScript", 
      icon: SiTypescript, 
      bg: theme === 'dark'
        ? "bg-gradient-to-br from-blue-600/80 to-indigo-600/80 dark:border-blue-500/30"
        : "bg-gradient-to-br from-blue-600 to-indigo-600",
      orbitSpeed: 2000,
      orbitDirection: "clockwise",
      orbitRadius: 190
    },
    { 
      name: "MongoDB", 
      icon: SiMongodb, 
      bg: theme === 'dark'
        ? "bg-gradient-to-br from-green-600/80 to-teal-600/80 dark:border-green-400/30"
        : "bg-gradient-to-br from-green-600 to-teal-600",
      orbitSpeed: 300,
      orbitDirection: "counter-clockwise",
      orbitRadius: 300
    },
    { 
      name: "Tailwind", 
      icon: SiTailwindcss, 
      bg: theme === 'dark'
        ? "bg-gradient-to-br from-cyan-400/80 to-blue-400/80 dark:border-cyan-400/30"
        : "bg-gradient-to-br from-cyan-400 to-blue-400",
      orbitSpeed: 35,
      orbitDirection: "clockwise",
      orbitRadius: 210
    },
    { 
      name: "Git", 
      icon: SiGithub, 
      bg: theme === 'dark'
        ? "bg-gradient-to-br from-gray-700/80 to-gray-900/80 dark:border-gray-600/30"
        : "bg-gradient-to-br from-gray-700 to-gray-900",
      orbitSpeed: 50,
      orbitDirection: "counter-clockwise",
      orbitRadius: 140
    },
  ];

  // Stats for dark/light theme
  const stats: StatItem[] = [
    { 
      label: "Projects", 
      value: "26+", 
      icon: FaCode, 
      color: theme === 'dark' ? "from-blue-400 to-cyan-400" : "from-blue-500 to-cyan-500",
      bg: theme === 'dark' 
        ? "bg-gray-800/50 dark:border-gray-700/50" 
        : "bg-white/80 border-gray-100"
    },
    { 
      label: "Experience", 
      value: "2+ Years", 
      icon: FaRocket, 
      color: theme === 'dark' ? "from-purple-400 to-pink-400" : "from-purple-500 to-pink-500",
      bg: theme === 'dark'
        ? "bg-gray-800/50 dark:border-gray-700/50"
        : "bg-white/80 border-gray-100"
    },
    { 
      label: "Clients", 
      value: "30+", 
      icon: IoSparkles, 
      color: theme === 'dark' ? "from-green-400 to-emerald-400" : "from-green-500 to-emerald-500",
      bg: theme === 'dark'
        ? "bg-gray-800/50 dark:border-gray-700/50"
        : "bg-white/80 border-gray-100"
    },
    { 
      label: "Satisfaction", 
      value: "100%", 
      icon: IoSparkles, 
      color: theme === 'dark' ? "from-orange-400 to-red-400" : "from-orange-500 to-red-500",
      bg: theme === 'dark'
        ? "bg-gray-800/50 dark:border-gray-700/50"
        : "bg-white/80 border-gray-100"
    },
  ];

  return (
    <section 
      ref={containerRef} 
      suppressHydrationWarning={true}
      className={`overflow-hidden mt-[100px] lg:mt-[5rem] relative px-4 min-h-screen sm:px-8 lg:px-16 transition-colors duration-500
        ${theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-gray-100' 
          : 'bg-gradient-to-br from-purple-50 via-white to-blue-50 text-gray-900'
        }`}
    >
      
      {/* Background Elements with dark theme support */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className={`absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full blur-3xl animate-pulse
          ${theme === 'dark'
            ? 'bg-gradient-to-r from-purple-900/20 via-purple-800/10 to-pink-900/20'
            : 'bg-gradient-to-r from-purple-300/20 to-pink-300/20'
          }`} 
        />
        <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] rounded-full blur-3xl animate-pulse delay-1000
          ${theme === 'dark'
            ? 'bg-gradient-to-r from-blue-900/20 via-blue-800/10 to-cyan-900/20'
            : 'bg-gradient-to-r from-blue-300/20 to-cyan-300/20'
          }`} 
        />
        
        {/* Grid Pattern */}
        <div className="relative min-h-screen overflow-hidden dark:bg-black">
          <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_top_left,#7c3aed,transparent_40%),radial-gradient(circle_at_bottom_right,#22d3ee,transparent_40%)] animate-pulse" />
        </div>

        {theme === "light" && (
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full 
              bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),
              linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
              bg-[size:60px_60px] text-black"
            />
          </div>
        )}
      </div>

      {/* Floating Particles */}
      <div ref={particleRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className={`particle absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full
              ${theme === 'dark'
                ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30'
                : 'bg-gradient-to-r from-purple-400/40 to-pink-400/40'
              }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="grid relative z-10 gap-6 items-center py-10 mx-auto sm:gap-12 sm:py-20 lg:grid-cols-2 lg:gap-16">
        {/* Left  */}
        <div className="flex flex-col order-2 lg:order-1">
          <motion.div
            initial="hidden"
            animate={animationsActive ? 'visible' : 'hidden'}
            variants={variants.fadeInUp}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className={`inline-flex gap-2 items-center px-4 py-2 mb-4 text-sm font-medium rounded-full backdrop-blur-sm border shadow-sm
              ${theme === 'dark'
                ? 'bg-gray-800/30 border-purple-900/50 text-purple-300 dark:hover:bg-gray-800/50'
                : 'bg-white/80 border-purple-100 text-purple-600'
              }`}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full
                  ${theme === 'dark' ? 'bg-purple-400' : 'bg-purple-500'}`}
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
            className={`mb-4 text-4xl font-extrabold md:text-5xl lg:text-6xl
              ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}
          >
            Crafting{" "}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r
              ${theme === 'dark' 
                ? 'from-purple-400 to-pink-400' 
                : 'from-purple-600 to-pink-600'
              }`}>
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
              className={`text-transparent bg-clip-text bg-gradient-to-r bg-[length:200%_auto]
                ${theme === 'dark'
                  ? 'from-blue-400 via-cyan-400 to-blue-400'
                  : 'from-blue-600 via-cyan-600 to-blue-600'
                }`}
            >
              Code
            </motion.span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate={animationsActive ? 'visible' : 'hidden'}
            variants={variants.fadeIn}
            transition={{ delay: 0.4, duration: 0.7 }}
            className={`mb-6 text-lg
              ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Hi, I&apos;m <span className={`font-semibold
              ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
              Firoz
            </span>. I create stunning and functional web experiences that help businesses grow. 
            With expertise in modern frameworks and a passion for clean code.
          </motion.p>

          {/* Stats Grid */}
          <div>
            <motion.span
             initial="hidden"
              animate={animationsActive ? 'visible' : 'hidden'}
              variants={variants.fadeInUp}
              transition={{ delay: 0.8, duration: 0.5 }}
            className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide
              ${theme === 'dark'
                ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20'
                : 'bg-yellow-100 text-yellow-700 border border-yellow-300'}
            `}>
              Hardcode values for demo purposes
            </motion.span>

            <motion.div 
              initial="hidden"
              animate={animationsActive ? 'visible' : 'hidden'}
              variants={variants.fadeInUp}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={variants.fadeInUp}
                  custom={index}
                  whileHover={{ 
                    y: -4,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className={`relative group rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-300 backdrop-blur-sm border
                    ${stat.bg}`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                      <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className={`text-xl sm:text-2xl md:text-3xl font-bold
                      ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                      {stat.value}
                    </div>
                  </div>
                  <div className={`text-xs sm:text-sm
                    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

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
                boxShadow: theme === 'dark' 
                  ? "0 10px 30px rgba(168, 85, 247, 0.4)"
                  : "0 10px 30px rgba(168, 85, 247, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 sm:px-8 sm:py-4 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base
                ${theme === 'dark'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/40'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-purple-500/30'
                }`}
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
            
            <Button href="/projects" primary={false} theme={theme}>
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
                  className={`px-3 py-1.5 rounded-full ${tech.bg} text-white text-xs font-medium shadow-sm flex items-center gap-1 backdrop-blur-sm`}
                >
                  <tech.icon className="w-3 h-3" />
                  <span>{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right  */}
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
                className={`absolute rounded-full border
                  ${theme === 'dark' 
                    ? 'border-gray-600/30 dark:border-gray-700/30' 
                    : 'border-gray-300/20'
                  }`}
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
                    <div className={`w-full h-full rounded-full ${tech.bg} shadow-lg backdrop-blur-sm border flex items-center justify-center
                      ${theme === 'dark' 
                        ? 'border-white/10 dark:border-gray-600/30' 
                        : 'border-white/20'
                      }`}>
                      <tech.icon className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-white`} />
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
                <div className={`relative w-full z-[10] h-full rounded-full shadow-2xl overflow-hidden border-4 sm:border-6
                  ${theme === 'dark' 
                    ? 'border-gray-800 dark:border-gray-700' 
                    : 'border-white'
                  }`}>
                  <Image
                  fill
                    src="/firoz.png"
                    alt="Professional Developer Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-full blur-xl -z-10
                  ${theme === 'dark'
                    ? 'bg-gradient-to-r from-purple-900/40 to-pink-900/40'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 opacity-30'
                  }`} 
                />
                
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
                  className={`absolute -inset-2 sm:-inset-3 rounded-full -z-20 border-2
                    ${theme === 'dark'
                      ? 'border-purple-500/30 dark:border-purple-400/20'
                      : 'border-purple-400/50'
                    }`}
                />
              </div>
            </motion.div>

            {/* Floating Badges with Dark Theme Support */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.1 }}
              className="absolute -top-2 sm:-top-4 left-1/2 transform -translate-x-1/2"
            >
              <div className={`rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-xl
                ${theme === 'dark'
                  ? 'bg-gradient-to-r from-purple-900/80 to-pink-900/80 backdrop-blur-sm border border-purple-700/30'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600'
                }`}
              >
                <div className="text-white text-center">
                  <div className="text-sm sm:text-lg font-bold">2+ Years</div>
                  <div className={`text-xs sm:text-sm
                    ${theme === 'dark' ? 'opacity-80' : 'opacity-90'}`}>
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
              <div className={`rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-xl backdrop-blur-sm border
                ${theme === 'dark'
                  ? 'bg-gray-800/70 border-gray-700/50'
                  : 'bg-white/90 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full
                      ${theme === 'dark' ? 'bg-green-400' : 'bg-green-500'}`}
                  />
                  <span className={`text-xs sm:text-sm font-semibold whitespace-nowrap
                    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
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
              <div className={`rounded-xl p-3 sm:p-4 shadow-xl backdrop-blur-sm border
                ${theme === 'dark'
                  ? 'bg-gray-800/70 border-gray-700/50'
                  : 'bg-white/90 border-gray-200'
                }`}
              >
                <div className="text-center">
                  <div className={`text-lg sm:text-2xl font-bold
                    ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    26+
                  </div>
                  <div className={`text-xs sm:text-sm
                    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
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
  <div className={`
    relative rounded-2xl p-3 sm:p-4 shadow-2xl backdrop-blur-xl border 
    max-w-[140px] sm:max-w-[160px] md:max-w-[180px]
    overflow-hidden
    ${theme === 'dark'
      ? 'bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/30'
      : 'bg-gradient-to-br from-white/95 to-gray-50/95 border-gray-200/50'
    }
    before:absolute before:inset-0 before:bg-gradient-to-r 
    before:from-transparent before:via-blue-500/10 before:to-transparent
    before:animate-shimmer
  `}>
    
    
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-50" />
    
   
    <div className={`
      absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-2xl
      ${theme === 'dark' 
        ? 'border-blue-500/50' 
        : 'border-blue-400/50'
      }
    `} />
    <div className={`
      absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-2xl
      ${theme === 'dark' 
        ? 'border-purple-500/50' 
        : 'border-purple-400/50'
      }
    `} />
    
  
    <div className="relative space-y-1.5">
     
      <div className="flex items-center gap-1.5 mb-2">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
          <div className="w-2 h-2 rounded-full bg-green-500/80" />
        </div>
        <span className={`text-[9px] font-mono tracking-wider
          ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
        `}>
          solution.js
        </span>
      </div>
      
      <div className="font-mono text-[10px] sm:text-xs space-y-1">
        <div className="flex items-center">
          <span className={`mr-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            1
          </span>
          <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>
            export
          </span>
          <span className="mx-1 text-gray-400">const</span>
          <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>
            createSolution
          </span>
          <span className="text-gray-400">=</span>
          <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>
            (
          </span>
        </div>
        
        <div className="flex items-center ml-4">
          <span className={`mr-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            2
          </span>
          <span className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}>
            problem
          </span>
          <span className="text-gray-400">,</span>
        </div>
        
        <div className="flex items-center">
          <span className={`mr-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            3
          </span>
          <span className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}>
            creativity
          </span>
          <span className="text-gray-400">,</span>
        </div>
        
        <div className="flex items-center">
          <span className={`mr-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            4
          </span>
          <span className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}>
            innovation
          </span>
        </div>
        
        <div className="flex items-center">
          <span className={`mr-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            5
          </span>
          <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>
            )
          </span>
          <span className="text-gray-400 mx-1"> =&#62;</span>
          <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>
            {"{"}
          </span>
        </div>
        
        <div className="flex items-center ml-4">
          <span className={`mr-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            6
          </span>
          <span className="text-gray-400">return</span>
          <span className={`mx-2 px-2 py-0.5 rounded text-[9px] font-bold
            ${theme === 'dark' 
              ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 text-blue-300 border border-blue-700/30' 
              : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200'
            }
          `}>
            &quot;elegant()&quot;
          </span>
        </div>
        
        <div className="flex items-center">
          <span className={`mr-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            7
          </span>
          <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>
            {"}"}
          </span>
        </div>
        
        {/* Cursor blink animation */}
        <div className="flex items-center ml-4">
          <span className={`mr-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            8
          </span>
          <div className="w-2 h-3 bg-blue-500 animate-pulse rounded-sm" />
        </div>
      </div>
    </div>
    
    {/* Floating dots */}
    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-500/40 animate-ping" />
    <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-purple-500/40 animate-ping delay-300" />
  </div>
</motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;