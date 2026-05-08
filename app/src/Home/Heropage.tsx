'use client';

import { useState, useEffect, useRef } from 'react';
import { motion,  useScroll, useTransform,  useSpring } from "framer-motion";
import { FaCode, FaRocket } from 'react-icons/fa6';
import { LiaSlackHash } from 'react-icons/lia';
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
import { useRouter } from 'next/navigation';
import { Button } from './Button';
import { useMemo } from "react";
import { lenisScrollTo } from "@/lib/scroll";


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
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30 });
const router = useRouter();
  const yParallax1 = useTransform(smoothY, [0, 1000], [0, -200]);
  const yParallax2 = useTransform(smoothY, [0, 1000], [0, -100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "circOut" as const,
      } 
    }
  };


  const randomX = useMemo(() => Math.random() * 50 - 25, []);

  useEffect(() => {
    setAnimationsActive(true);

    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

   const scrollToContact = () => {
    lenisScrollTo('#contact');
  };

  const techStack: TechItem[] = [
    { 
      name: "React", 
      icon: SiReact, 
      bg: "bg-linear-to-br from-[#3b82f6]/80 to-[#06b6d4]/80",
      orbitSpeed: 20,
      orbitDirection: "clockwise",
      orbitRadius: 180
    },
    { 
      name: "Next.js", 
      icon: SiNextdotjs, 
      bg: "bg-linear-to-br from-[#111111]/80 to-[#374151]/80",
      orbitSpeed: 25,
      orbitDirection: "counter-clockwise",
      orbitRadius: 260
    },
    { 
      name: "Node.js", 
      icon: SiNodedotjs, 
      bg: "bg-linear-to-br from-[#10b981]/80 to-[#06b6d4]/80",
      orbitSpeed: 15,
      orbitDirection: "clockwise",
      orbitRadius: 100
    },
    { 
      name: "Express", 
      icon: SiExpress, 
      bg: "bg-linear-to-br from-[#6b7280]/80 to-[#374151]/80",
      orbitSpeed: 30,
      orbitDirection: "counter-clockwise",
      orbitRadius: 150
    },
    { 
      name: "TypeScript", 
      icon: SiTypescript, 
      bg: "bg-linear-to-br from-[#3b82f6]/80 to-[#6366f1]/80",
      orbitSpeed: 22,
      orbitDirection: "clockwise",
      orbitRadius: 190
    },
    { 
      name: "MongoDB", 
      icon: SiMongodb, 
      bg: "bg-linear-to-br from-[#10b981]/80 to-[#14b8a]/80",
      orbitSpeed: 35,
      orbitDirection: "counter-clockwise",
      orbitRadius: 230
    },
    { 
      name: "Tailwind", 
      icon: SiTailwindcss, 
      bg: "bg-linear-to-br from-[#06b6d4]/80 to-[#3b82f6]/80",
      orbitSpeed: 28,
      orbitDirection: "clockwise",
      orbitRadius: 210
    },
    { 
      name: "Git", 
      icon: SiGithub, 
      bg: "bg-linear-to-br from-[#374151]/80 to-[#111111]/80",
      orbitSpeed: 40,
      orbitDirection: "counter-clockwise",
      orbitRadius: 140
    },
  ];

  return (
    <section 
      ref={containerRef} 
      className="overflow-hidden mt-25 lg:mt-20 relative px-4 min-h-screen sm:px-8 lg:px-16 bg-white dark:bg-[#0a0a0a] text-black dark:text-[#faf8f0] transition-colors duration-300"
    >

      {/* Background Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: yParallax1 }}
          className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full blur-[100px] bg-linear-to-r from-[#a78bfa]/20 via-[#a78bfa]/10 to-[#ec4899]/20" 
        />
        <motion.div 
          style={{ y: yParallax2 }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-125 lg:h-125 rounded-full blur-[120px] bg-linear-to-r from-[#3b82f6]/20 via-[#3b82f6]/10 to-[#06b6d4]/20" 
        />

        <div className="absolute inset-0 bg-white dark:bg-[#0a0a0a]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#a78bfa,transparent_40%),radial-gradient(circle_at_bottom_right,#06b6d4,transparent_40%)] opacity-30 animate-pulse" />
        </div>

        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03]">
          <div className="w-full h-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
      </div>

      {/* Floating Particles */}
      <div ref={particleRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, randomX, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 5, 
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 rounded-full bg-linear-to-r from-[#a78bfa]/30 to-[#ec4899]/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="grid relative z-10 gap-6 items-center py-10 mx-auto sm:gap-12 sm:py-20 lg:grid-cols-2 lg:gap-16 max-w-7xl">
        {/* Left Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col order-2 lg:order-1"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex gap-2 items-center px-4 py-2 mb-4 text-sm font-medium rounded-full backdrop-blur-sm border shadow-sm bg-slate-100 dark:bg-[#111111]/50 border-slate-200 dark:border-[#a78bfa]/30 text-slate-900 dark:text-[#a78bfa] hover:border-[#a78bfa]/60 transition-colors duration-300">
              <motion.span
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-slate-400 dark:bg-[#a78bfa]"
              />
              <LiaSlackHash size={18} />
              Full-Stack Developer & Problem Solver
            </span>
          </motion.div>

          <motion.h1
            variants={titleVariants}
            className="mb-4 text-3xl sm:text-4xl font-extrabold md:text-5xl lg:text-7xl text-[#faf8f0] tracking-tight"
          >
            Crafting{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#a78bfa] to-[#ec4899]">
                Digital
              </span>
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-1 left-0 h-[4px] bg-linear-to-r from-[#a78bfa] to-[#ec4899] opacity-30 rounded-full"
              />
            </span>{" "}
            <br className="hidden sm:block" />
            Experiences with{" "}
            <motion.span
              animate={{ 
                backgroundPosition: ["0%", "100%", "0%"] 
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "linear" 
              }}
              className="text-transparent bg-clip-text bg-linear-to-r from-[#3b82f6] via-[#06b6d4] to-[#3b82f6] bg-[length:200%_auto]"
            >
              Code
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-8 text-lg md:text-xl text-[#faf8f0]/70 max-w-lg leading-relaxed"
          >
            Hi, I'm <span className="font-semibold text-[#a78bfa] border-b border-[#a78bfa]/30">Firoz</span>. 
            I build performant, accessible, and beautiful web applications using the modern MERN stack and Next.js.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          
          >
            <Button
            onClick={scrollToContact}
            primary={true}>
              Start a Project
            </Button>

            <Button 
            onClick={()=>router.push('/projects')}
            primary={false}>
              View Projects
            </Button>
          </motion.div>

          {/* Tech Stack List (Mobile) */}
        
        </motion.div>

        {/* Right Content - Visual Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1,
            type: "spring",
            stiffness: 50,
            damping: 20
          }}
        
          className="relative z-40 order-1 mb-12 lg:order-2 lg:mb-0 flex justify-center lg:justify-end"
        >
          <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px]">

            {/* Orbiting Rings with Scroll Interaction */}
            {[180, 220, 260].map((radius, index) => (
              <motion.div
                key={`ring-${index}`}
                animate={{ 
                  rotate: index % 2 === 0 ? 360 : -360 
                }}
                transition={{
                  duration: 20 + index * 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute rounded-full border border-[#faf8f0]/5"
                style={{
                  width: `${isMobile ? radius * 1.2 : radius * 2}px`,
                  height: `${isMobile ? radius * 1.2 : radius * 2}px`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}

            {/* Orbiting Tech Items */}
            {techStack.map((tech, index) => {
              const orbitRadius = isMobile ? tech.orbitRadius * 0.7 : tech.orbitRadius;

              return (
                <motion.div
                  key={tech.name}
                  animate={{
                    rotate: tech.orbitDirection === "clockwise" ? 360 : -360,
                  }}
                  transition={{
                    duration: tech.orbitSpeed,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: orbitRadius * 2,
                    height: orbitRadius * 2,
                    marginLeft: -orbitRadius,
                    marginTop: -orbitRadius,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.3, zIndex: 50 }}
                    className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${tech.bg} shadow-2xl backdrop-blur-md border border-white/10 flex items-center justify-center group pointer-events-auto cursor-pointer`}
                  >
                    <tech.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    {/* Tooltip-like before/after */}
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-white text-black text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                      {tech.name}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Center Profile with Magnetic/Float effect */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            >
                <div className="relative group overflow-visible lg:overflow-visible">
                {/* Glow behind profile */}
                <div className="absolute -inset-4 rounded-full bg-linear-to-r from-[#a78bfa] to-[#ec4899] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500" />

                <div className="relative w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-full p-1 bg-linear-to-tr from-[#a78bfa] via-[#ec4899] to-[#3b82f6] overflow-hidden shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0a] relative">
                    <Image
                      fill
                      src="/firoz.jpeg"
                      alt="Firoz - Full Stack Developer"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Floating Stats around profile */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 }}
                  className="absolute -right-20 top-0 lg:-right-28 bg-[#111111]/90 backdrop-blur-md border border-white/10 p-2 sm:p-3 rounded-2xl shadow-2xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-[#10b981]/20 text-[#10b981]">
                      <FaRocket />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#faf8f0]/50 uppercase font-bold tracking-tighter">Experience</p>
                      <p className="text-sm font-bold">2+ Years</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.7 }}
                  className="absolute -left-20 bottom-0 lg:-left-28 bg-[#111111]/90 backdrop-blur-md border border-white/10 p-2 sm:p-3 rounded-2xl shadow-2xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-[#3b82f6]/20 text-[#3b82f6]">
                      <FaCode />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#faf8f0]/50 uppercase font-bold tracking-tighter">Projects</p>
                      <p className="text-sm font-bold">20 + </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Code Snippet Overlay (Repositioned for better responsiveness) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              whileHover={{ y: -10 }}
              className="absolute z-10 hidden md:flex -bottom-20 lg:-bottom-20 left-1/2 -translate-x-1/2  w-full max-w-[280px] sm:max-w-[320px]"
            >
              <div className="rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-4 shadow-2xl font-mono text-[10px] sm:text-xs">
                <div className="flex gap-1.5 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="space-y-1">
                  <p className="text-[#a78bfa]"><span className="text-[#3b82f6]">const</span> developer <span className="text-[#faf8f0]/50">=</span> {"{"}</p>
                  <p className="pl-4">name: <span className="text-[#10b981]">&quot;Firoz&quot;</span>,</p>
                  <p className="pl-4">role: <span className="text-[#10b981]">&quot;Full Stack&quot;</span>,</p>
                  <p className="pl-4">loves: [<span className="text-[#10b981]">&quot;next.js&quot;</span>, <span className="text-[#10b981]">&quot;Node&quot;</span>],</p>
                  <p className="pl-4">creative: <span className="text-[#ec4899]">true</span></p>
                  <p className="text-[#a78bfa]">{"};"}</p>
                </div>
                {/* Before/After style animated line */}
                <motion.div 
                  animate={{ x: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="mt-3 h-[1px] bg-linear-to-r from-transparent via-[#a78bfa] to-transparent w-full"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

