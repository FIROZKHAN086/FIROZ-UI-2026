"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  FaCode,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaArrowRight,
} from "react-icons/fa6";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiTypescript,
  SiTailwindcss,
  SiPrisma,
  SiDocker,
} from "react-icons/si";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";
import { IconType } from "react-icons";
import { useRouter } from "next/navigation";
import { lenisScrollTo } from "@/lib/scroll";
import Image from "next/image";

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
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30 });

  const yParallax1 = useTransform(smoothY, [0, 1000], [0, -200]);
  const yParallax2 = useTransform(smoothY, [0, 1000], [0, -100]);

  const textY = useTransform(scrollY, [0, 300], [0, -80]);

  const textOpacity = useTransform(scrollY, [0, 150, 300], [1, 1, 0]);

  const textScale = useTransform(scrollY, [0, 300], [1, 0.9]);

  const particles = useMemo(
  () =>
    [...Array(30)].map(() => ({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      moveX: Math.random() * 200 - 100,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
    })),
  []
);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  useEffect(() => {
    setAnimationsActive(true);

    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearInterval(cursorInterval);
    };
  }, []);

  const scrollToContact = () => {
    lenisScrollTo("#contact");
  };

  const techStack: TechItem[] = [
    {
      name: "React",
      icon: SiReact,
      bg: "bg-gradient-to-br from-[#3b82f6]/80 to-[#06b6d4]/80",
      orbitSpeed: 20,
      orbitDirection: "clockwise",
      orbitRadius: 180,
    },
    {
      name: "Next.js",
      icon: SiNextdotjs,
      bg: "bg-gradient-to-br from-[#111111]/80 to-[#374151]/80",
      orbitSpeed: 25,
      orbitDirection: "counter-clockwise",
      orbitRadius: 260,
    },
    {
      name: "Node.js",
      icon: SiNodedotjs,
      bg: "bg-gradient-to-br from-[#10b981]/80 to-[#06b6d4]/80",
      orbitSpeed: 15,
      orbitDirection: "clockwise",
      orbitRadius: 100,
    },
    {
      name: "TypeScript",
      icon: SiTypescript,
      bg: "bg-gradient-to-br from-[#3b82f6]/80 to-[#6366f1]/80",
      orbitSpeed: 22,
      orbitDirection: "clockwise",
      orbitRadius: 190,
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
      bg: "bg-gradient-to-br from-[#10b981]/80 to-[#14b8a6]/80",
      orbitSpeed: 35,
      orbitDirection: "counter-clockwise",
      orbitRadius: 230,
    },
    {
      name: "Tailwind",
      icon: SiTailwindcss,
      bg: "bg-gradient-to-br from-[#06b6d4]/80 to-[#3b82f6]/80",
      orbitSpeed: 28,
      orbitDirection: "clockwise",
      orbitRadius: 210,
    },
    {
      name: "Prisma",
      icon: SiPrisma,
      bg: "bg-gradient-to-br from-[#0c344b]/80 to-[#1a5d7a]/80",
      orbitSpeed: 32,
      orbitDirection: "counter-clockwise",
      orbitRadius: 150,
    },
    {
      name: "Docker",
      icon: SiDocker,
      bg: "bg-gradient-to-br from-[#2496ed]/80 to-[#1a6bbf]/80",
      orbitSpeed: 38,
      orbitDirection: "clockwise",
      orbitRadius: 120,
    },
  ];

  return (
    <section
      ref={containerRef}
      suppressHydrationWarning
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white dark:from-[#0a0a0a] dark:via-[#0f0f0f] dark:to-[#0a0a0a] transition-colors duration-300"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: yParallax1 }}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-transparent blur-3xl"
        />
        <motion.div
          style={{ y: yParallax2 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-transparent blur-3xl"
        />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,transparent_2px,currentColor_2px,currentColor_4px,transparent_4px)] bg-[size:40px_40px]" />
        </div>

        {/* Floating Particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            initial={{
              x: p.x,
              y: p.y,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              y: [p.y, p.y - 200],
              x: [p.x, p.x + p.moveX],
              opacity: [0, 0.7, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-[1px]"
          />
        ))}
      </div>

      <div className="relative w-full z-10 container mx-auto px-4 gap-x-2.5 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <motion.div
          style={{
            y: textY,
            opacity: textOpacity,
            scale: textScale,
          }}
          className="grid lg:grid-cols-2 gap-10 items-center py-20 lg:py-0"
        >
          {/* Left Content - Text Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              y: textY,
              opacity: textOpacity,
              scale: textScale,
            }}
            className="order-2 lg:order-3"
          >
            {/* Hand Wave and Greeting */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 mb-6"
            >
              <motion.div
                animate={{
                  rotate: [0, 15, -10, 15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 0.2,
                  ease: "easeInOut",
                }}
                className="text-4xl sm:text-5xl"
              >
                👋
              </motion.div>
              <span className="text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-300">
                Hello, I&apos;m
              </span>
            </motion.div>

            {/* Name with Animation */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter"
            >
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Firoz
              </span>
              <span className="text-gray-900 dark:text-white"> Khan</span>
            </motion.h1>

            {/* Typing Animation for Title */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
                <span>I&apos;m a</span>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  <TypeAnimation
                    sequence={[
                      "Full Stack Developer",
                      2000,

                      "React & Next.js Expert",
                      2000,

                      "Modern UI Engineer",
                      2000,

                      "Creative Frontend Developer",
                      2000,

                      "Scalable Backend Architect",
                      2000,

                      "MERN Stack Specialist",
                      2000,

                      "Interactive Web Designer",
                      2000,

                      "Performance Optimization Expert",
                      2000,

                      "Smooth Animation Creator",
                      2000,

                      "Building Premium Digital Experiences",
                      2000,

                      "Open Source Contributor",
                      2000,

                      "Freelance Web Developer",
                      2000,

                      "Transforming Ideas Into Reality",
                      2000,

                      "Crafting Modern Web Applications",
                      2000,

                      "Passionate About Clean Code",
                      2000,

                      "User Experience Focused Developer",
                      2000,

                      "JavaScript & TypeScript Developer",
                      2000,

                      "Always Learning New Technologies",
                      2000,

                      "Problem Solver & Creative Thinker",
                      2000,
                    ]}
                    wrapper="span"
                    speed={80}
                    repeat={Infinity}
                    cursor={true}
                    className="font-bold"
                  />
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed"
            >
              I craft beautiful, performant, and scalable web applications with
              modern technologies. Let&apos;s turn your ideas into reality with
              code that matters.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="hidden md:flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg overflow-hidden shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Hire Me
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/projects")}
                className="px-8 py-4 rounded-2xl border-2 border-purple-500/50 dark:border-purple-500/30 text-purple-600 dark:text-purple-400 font-bold text-lg hover:bg-purple-500/10 transition-all"
              >
                View Work
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={()=>router.push('resume.pdf')}
                target="_blank"
                className="px-8 py-4 rounded-2xl bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 font-bold text-lg hover:bg-gray-200 dark:hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <HiOutlineDocumentText className="w-5 h-5" />
                Resume
              </motion.a>
            </motion.div>
            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4 mt-8">
              {[
                {
                  icon: FaGithub,
                  href: "https://github.com/firozkhan086",
                  label: "GitHub",
                  color: "hover:text-gray-900 dark:hover:text-white",
                },
                {
                  icon: FaLinkedin,
                  href: "https://linkedin.com/in/firozkhan",
                  label: "LinkedIn",
                  color: "hover:text-blue-600",
                },
                {
                  icon: FaInstagram,
                  href: "https://instagram.com/khan____0086",
                  label: "Instagram",
                  color: "hover:text-pink-600",
                },
                {
                  icon: HiOutlineMail,
                  href: "mailto:firoz@example.com",
                  label: "Email",
                  color: "hover:text-red-500",
                },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  onClick={()=>router.push(`${social.href}`)}
                  target="_blank"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300 hover:shadow-lg`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content*/}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.3,
            }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px]">
              {/*
               Animated Rings
                */}
              {[180, 240, 300].map((radius, index) => (
                <motion.div
                  key={`ring-${index}`}
                  animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
                  transition={{
                    duration: 30 + index * 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute rounded-full border border-purple-500/20 dark:border-purple-500/30"
                  style={{
                    width: radius,
                    height: radius,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}

              {/* 
              Orbiting Tech Icons 
              */}
              {!isMobile &&
                techStack.map((tech, index) => {
                  const angle =
                    (((index * 360) / techStack.length) * Math.PI) / 180;
                  const orbitRadius = tech.orbitRadius;
                  const x = Math.cos(angle) * orbitRadius;
                  const y = Math.sin(angle) * orbitRadius;

                  return (
                    <motion.div
                      key={tech.name}
                      className="absolute"
                      animate={{
                        rotate:
                          tech.orbitDirection === "clockwise" ? 360 : -360,
                      }}
                      transition={{
                        duration: tech.orbitSpeed,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        left: "50%",
                        top: "50%",
                        marginLeft: x - 25,
                        marginTop: y - 25,
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{
                          delay: 1 + index * 0.1,
                          duration: 0.5,
                          type: "spring",
                        }}
                        whileHover={{ scale: 1.3, rotate: 180 }}
                        className={`w-12 h-12 rounded-2xl ${tech.bg} shadow-2xl backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer group`}
                      >
                        <tech.icon className="w-6 h-6 text-white" />
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-gray-900 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                          {tech.name}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}

              {/* Center Avatar / Profile Circle */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="relative group">
                  {/* Animated Glow */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-2xl opacity-30 group-hover:opacity-60 transition-opacity"
                  />

                  {/* Avatar Circle */}
                  <div className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full p-1 bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500 shadow-2xl">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                      {/* Animated Code in Avatar */}
                      <div className="text-center">
                        <Image
                          src="/FIROZ.webp"
                          alt="FIROZ "
                          width={176}
                          height={176}
                          loading="lazy"
                          className="rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Floating Badges */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    className="absolute hidden md:block -right-10 top-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-purple-500/30 rounded-2xl p-3 shadow-xl"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        Available for work
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.7, type: "spring" }}
                    className="absolute hidden md:block -left-10 bottom-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-blue-500/30 rounded-2xl p-3 shadow-xl"
                  >
                    <div className="flex items-center gap-2">
                      <FaCode className="w-4 h-4 text-blue-500" />
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        20+ Projects
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Code Snippet Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, type: "spring" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[280px] sm:w-[320px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-4 shadow-2xl"
              >
                <div className="flex gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 ml-2 font-mono">
                    developer.js
                  </span>
                </div>
                <div className="space-y-1 font-mono text-[10px] sm:text-xs">
                  <p>
                    <span className="text-purple-600 dark:text-purple-400">
                      const
                    </span>{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      developer
                    </span>{" "}
                    = {"{"}
                  </p>
                  <p className="pl-4">
                    name:{" "}
                    <span className="text-green-600 dark:text-green-400">
                      'Firoz Khan'
                    </span>
                    ,
                  </p>
                  <p className="pl-4">
                    role:{" "}
                    <span className="text-green-600 dark:text-green-400">
                      'Full Stack'
                    </span>
                    ,
                  </p>
                  <p className="pl-4">
                    passion: [
                    <span className="text-green-600 dark:text-green-400">
                      'coding'
                    </span>
                    ,{" "}
                    <span className="text-green-600 dark:text-green-400">
                      'design'
                    </span>
                    ,{" "}
                    <span className="text-green-600 dark:text-green-400">
                      'innovation'
                    </span>
                    ],
                  </p>
                  <p>{"}"};</p>
                </div>
                <motion.div
                  animate={{ x: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="mt-3 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Scroll
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-purple-500/50 flex justify-center">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1"
            />
          </div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
