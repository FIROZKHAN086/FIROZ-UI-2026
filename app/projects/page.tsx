"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  Sparkles,
  Layers,
  Monitor,
  Smartphone,
    Star,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import {ProjectCard} from "./ProjectCard";
import { AnimatedCounter } from "./AnimatedCounter";
import { MobileCarousel } from "./MobileCarousel";
import { ProjectModal } from "./ProjectModal";
import {  categories } from "./Value";
import { Project } from "./types";



 export function useElementInView() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  return { ref, isInView };
}

function ScrollReveal({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "scale" }) {
  const { ref, isInView } = useElementInView();

  const getInitial = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: 60 };
      case "left": return { opacity: 0, x: -60 };
      case "right": return { opacity: 0, x: 60 };
      case "scale": return { opacity: 0, scale: 0.8 };
      default: return { opacity: 0, y: 60 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={isInView ? { opacity: 1, y: 0, x: 0, scale: 1 } : getInitial()}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}



export default function ProjectsSection() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const backgroundX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const currentTheme = mounted ? (theme === "system" ? systemTheme : theme) : "dark";

  useEffect(() => {
    fetchProjects();
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/ProjectApi");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!projects.length) return;

    let filtered = [...projects];

    switch (activeFilter) {
      case "featured":
        filtered = projects.filter((p) => p.featured);
        break;
      case "web":
        filtered = projects.filter(
          (p) =>
            p.category.toLowerCase().includes("web") ||
            p.category.toLowerCase().includes("app")
        );
        break;
      case "mobile":
        filtered = projects.filter((p) =>
          p.category.toLowerCase().includes("mobile")
        );
        break;
      case "api":
        filtered = projects.filter((p) =>
          p.category.toLowerCase().includes("api")
        );
        break;
      case "ai":
        filtered = projects.filter(
          (p) =>
            p.category.toLowerCase().includes("ai") ||
            p.tech.some((t) => t.toLowerCase().includes("ai"))
        );
        break;
      case "ecommerce":
        filtered = projects.filter(
          (p) =>
            p.category.toLowerCase().includes("ecommerce") ||
            p.category.toLowerCase().includes("shop")
        );
        break;
      default:
        filtered = projects;
    }

    setFilteredProjects(filtered);
  }, [activeFilter, projects]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const stats = {
    total: projects.length,
    featured: projects.filter((p) => p.featured).length,
    webApps: projects.filter(
      (p) =>
        p.category.toLowerCase().includes("web") ||
        p.category.toLowerCase().includes("app")
    ).length,
    mobile: projects.filter((p) =>
      p.category.toLowerCase().includes("mobile")
    ).length,
  };

  if (!mounted) {
    return (
      <section className="min-h-screen py-20 bg-linear-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-white">Loading Projects...</div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      ref={containerRef}
      className={`
        min-h-screen relative overflow-hidden
        ${currentTheme === "dark"
          ? "bg-linear-to-b from-gray-950 via-gray-900 to-gray-950"
          : "bg-linear-to-b from-gray-50 via-white to-gray-50"
        }
      `}
    >
      {/* Animated Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-purple-500 via-pink-500 to-purple-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-purple-500/20 to-transparent"
          style={{ x: backgroundX }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-linear(circle at 1px 1px, ${currentTheme === "dark" ? "#fff" : "#000"} 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-linear-to-r from-purple-500 to-pink-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24">
          <ScrollReveal delay={0.2}>
            <div className="max-w-5xl mx-auto text-center">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  Portfolio Showcase
                </span>
                <Badge variant="outline" className="ml-2 text-xs bg-white/10 backdrop-blur-sm">
                  {projects.length} Projects
                </Badge>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className={currentTheme === "dark" ? "text-white" : "text-gray-900"}>
                  Creative
                </span>
                <span className="bg-linear-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-linear">
                  {" "}Projects
                </span>
              </motion.h1>

              <motion.p
                className={`text-base md:text-lg max-w-2xl mx-auto ${currentTheme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                A curated collection of production-ready applications showcasing modern technologies and innovative solutions.
              </motion.p>
            </div>
          </ScrollReveal>

          {/* Stats Section */}
          <ScrollReveal delay={0.4} direction="scale">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
              {[
                { label: "Total Projects", value: stats.total, icon: Layers, color: "from-blue-500 to-cyan-500" },
                { label: "Featured", value: stats.featured, icon: Star, color: "from-yellow-500 to-orange-500" },
                { label: "Web Apps", value: stats.webApps, icon: Monitor, color: "from-green-500 to-emerald-500" },
                { label: "Mobile", value: stats.mobile, icon: Smartphone, color: "from-purple-500 to-pink-500" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className={`
                    rounded-xl p-4 text-center backdrop-blur-xl border
                    ${currentTheme === "dark"
                      ? "bg-white/5 border-white/10"
                      : "bg-white/80 border-gray-200/50"
                    }
                    shadow-lg
                  `}
                  whileHover={{ y: -5, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`inline-flex p-2 rounded-lg bg-linear-to-br ${stat.color} mb-2 shadow-lg`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className={`text-2xl font-bold ${currentTheme === "dark" ? "text-white" : "text-gray-900"}`}>
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </motion.div>

      {/* Projects Section */}
      <div className="container mx-auto px-4 sm:px-6  lg:px-8 relative z-10 pb-20">
        {/* Category Filters */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-6xl mx-auto mb-8 overflow-x-scroll md:overflow-hidden scrollbar-hidden  ">
            <div className={`
              flex  md:flex-wrap justify-start md:justify-center gap-2 p-2 rounded-xl backdrop-blur-xl border min-w-max
              ${currentTheme === "dark"
                ? "bg-white/5 border-white/10"
                : "bg-white/80 border-gray-200/50"
              }
            `}>
              {categories.map((category) => {
                const isActive = activeFilter === category.id;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`
                      relative px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap
                      ${isActive
                        ? `bg-linear-to-r ${category.color} text-white shadow-lg`
                        : currentTheme === "dark"
                          ? "text-gray-400 hover:text-white hover:bg-white/10"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center gap-1.5">
                      <category.icon className="w-3.5 h-3.5" />
                      {category.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Projects Display */}
        {loading ? (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`
                    rounded-2xl overflow-hidden border animate-pulse
                    ${currentTheme === "dark"
                      ? "bg-gray-800/20 border-gray-700/30"
                      : "bg-white/50 border-gray-200/50"
                    }
                  `}
                >
                  <div className="h-48 bg-gray-700/30" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gray-700/30 rounded w-3/4" />
                    <div className="h-3 bg-gray-700/30 rounded w-full" />
                    <div className="h-3 bg-gray-700/30 rounded w-5/6" />
                    <div className="flex gap-2">
                      <div className="h-6 w-14 bg-gray-700/30 rounded-full" />
                      <div className="h-6 w-16 bg-gray-700/30 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <ScrollReveal direction="scale">
            <div className={`
              rounded-2xl p-12 text-center border-2 border-dashed max-w-md mx-auto
              ${currentTheme === "dark"
                ? "bg-gray-800/20 border-gray-700/50"
                : "bg-white/50 border-gray-300/50"
              }
            `}>
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-r from-purple-500/10 to-pink-500/10 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <ImageIcon className="w-10 h-10 text-purple-500" />
              </motion.div>
              <h3 className={`text-2xl font-bold mb-3 ${currentTheme === "dark" ? "text-white" : "text-gray-900"}`}>
                No projects found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Try selecting a different category
              </p>
              <Button
                variant="outline"
                onClick={() => setActiveFilter("all")}
              >
                View All Projects
              </Button>
            </div>
          </ScrollReveal>
        ) : isMobile ? (
          <MobileCarousel projects={filteredProjects} onProjectClick={handleProjectClick} />
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} onProjectClick={handleProjectClick} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
   </section>
  );
}

