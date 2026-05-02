"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  Globe,
  Cpu,
  Smartphone,
  Layers,
  Clock,
  Users,
  Star,
  Zap,
  Terminal,
  Filter,
  Grid3x3,
  List,
  ChevronRight,
  Eye
} from "lucide-react";
import ProjectCard from "./ProjectCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = [
  { id: "all", label: "All Projects", icon: <Layers className="w-4 h-4" />, count: 3 },
  { id: "Web Platform", label: "Web Platforms", icon: <Globe className="w-4 h-4" />, count: 1 },
  { id: "AI Platform", label: "AI Platforms", icon: <Cpu className="w-4 h-4" />, count: 1 },
  { id: "Mobile App", label: "Mobile Apps", icon: <Smartphone className="w-4 h-4" />, count: 1 },
];

type StatsCardProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
};

const StatsCard = ({ icon, value, label, color }: StatsCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative group"
    >
      <Card className="overflow-hidden border-0 backdrop-blur-sm bg-[#111111]/50 border-[#faf8f0]/10">
        <div className="p-6">
          <div className={`inline-flex p-3 rounded-full ${color}`}>
            <div className="text-[#0a0a0a]">{icon}</div>
          </div>
          <div className="text-3xl font-bold mb-2 text-[#faf8f0]">
            {value}
          </div>
          <div className="text-sm text-[#faf8f0]/60">
            {label}
          </div>
        </div>
      </Card>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#faf8f0]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

type FilterTabsProps = {
  activeFilter: string;
  onFilterChange: (value: string) => void;
  viewMode: string;
  onViewModeChange: (mode: string) => void;
};

const FilterTabs = ({ activeFilter, onFilterChange, viewMode, onViewModeChange }: FilterTabsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
      <Tabs
        value={activeFilter}
        onValueChange={onFilterChange}
        className="w-full sm:w-auto"
      >
        <TabsList className="flex-wrap h-auto p-1 bg-[#111111]/50 border border-[#faf8f0]/10">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="relative px-4 py-2 rounded-lg data-[state=active]:bg-[#a78bfa]/20"
            >
              <span className="flex items-center gap-2 text-[#faf8f0]/70 data-[state=active]:text-[#a78bfa]">
                {category.icon}
                <span>{category.label}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#111111] text-[#faf8f0]/60">
                  {category.count}
                </span>
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-2">
        <span className="text-sm text-[#faf8f0]/60 mr-2">
          View:
        </span>
        <div className="flex rounded-lg border border-[#faf8f0]/10 p-1 bg-[#111111]/50">
          <Button
            size="sm"
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            onClick={() => onViewModeChange("grid")}
            className="h-8 w-8 p-0 bg-[#111111] hover:bg-[#a78bfa]/20 text-[#faf8f0]/70"
          >
            <Grid3x3 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={viewMode === "list" ? "secondary" : "ghost"}
            onClick={() => onViewModeChange("list")}
            className="h-8 w-8 p-0 bg-[#111111] hover:bg-[#a78bfa]/20 text-[#faf8f0]/70"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Chai & Churi",
      subtitle: "Culinary Digital Experience",
      description: "A premium restaurant platform transforming dining through seamless digital interaction with real-time ordering, AI-powered recommendations, and immersive UI/UX.",
      longDescription: "Complete restaurant management system with real-time ordering, table booking, payment integration, kitchen management, and customer analytics dashboard.",
      image: "/Img/Chaa.png",
      tags: ["Next.js", "Real-time", "Microservices", "TypeScript", "Tailwind", "Redis"],
      technologies: ["React", "Node.js", "MongoDB", "GraphQL", "Docker", "AWS"],
      live: "https://chaa-curi.vercel.app/",
      github: "https://github.com/FIROZKHAN086",
      category: "Web Platform",
      accent: "#a78bfa",
      pattern: "grid",
      stats: {
        performance: "98%",
        users: "10K+",
        uptime: "99.9%",
        loadTime: "1.2s"
      },
      features: [
        "Real-time order tracking",
        "AI-powered recommendations",
        "Multi-language support",
        "Advanced analytics dashboard"
      ]
    },
    {
      id: 2,
      title: "VidGN-AI",
      subtitle: "Intelligent Video Synthesis",
      description: "AI-driven platform that converts text narratives into compelling visual stories with advanced neural networks and real-time rendering.",
      longDescription: "Cutting-edge AI video generation platform using GPT-4 for scriptwriting, Stable Diffusion for image generation, and neural voice synthesis for complete video production.",
      image: "/Img/Screenshot (161).png",
      tags: ["AI/ML", "Generative", "Cloud", "TensorFlow", "OpenAI", "Python"],
      technologies: ["React", "FastAPI", "PostgreSQL", "Redis", "Google Cloud", "FFmpeg"],
      live: "https://vidgn-ai.vercel.app/",
      github: "https://github.com/FIROZKHAN086",
      category: "AI Platform",
      accent: "#10b981",
      pattern: "circuit",
      stats: {
        accuracy: "95%",
        videos: "5K+",
        speed: "2x faster",
        models: "10+"
      },
      features: [
        "Text-to-video generation",
        "Voice synthesis",
        "Auto-editing",
        "Multi-format export"
      ]
    },
    {
      id: 3,
      title: "Kings Food",
      subtitle: "Mobile Food Ecosystem",
      description: "Complete food delivery system with real-time tracking, intelligent logistics, and seamless payment integration for optimal user experience.",
      longDescription: "Full-stack food delivery application with real-time order tracking, driver allocation algorithms, dynamic pricing, and comprehensive restaurant management portal.",
      image: "/Img/Screenshot (17).png",
      tags: ["React Native", "Firebase", "Redux", "Mapbox", "Stripe", "Expo"],
      technologies: ["Node.js", "Express", "MongoDB", "WebSocket", "AWS S3", "Twilio"],
      live: "https://kings-food.vercel.app/",
      github: "https://github.com/FIROZKHAN086",
      category: "Mobile App",
      accent: "#3b82f6",
      pattern: "wave",
      stats: {
        orders: "50K+",
        rating: "4.9/5",
        delivery: "<30min",
        partners: "200+"
      },
      features: [
        "Real-time tracking",
        "AI route optimization",
        "Multi-payment options",
        "Loyalty program"
      ]
    }
  ];

  const router = useRouter();

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    setIsMounted(true);

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".section-title", {
        scrollTrigger: {
          trigger: ".section-title",
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });

      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse bg-gradient-to-r from-[#a78bfa]/30 via-[#ec4899]/30 to-[#6366f1]/30" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-2000 bg-gradient-to-r from-[#3b82f6]/30 via-[#06b6d4]/30 to-[#10b981]/30" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(90deg, #faf8f0 1px, transparent 1px),
                          linear-gradient(#faf8f0 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-24"
        >
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#faf8f0]/30 to-transparent" />
            <Badge
              variant="outline"
              className="px-4 py-2 rounded-full backdrop-blur-sm bg-[#111111]/50 border-[#faf8f0]/10"
            >
              <Sparkles className="w-4 h-4 mr-2 text-[#a78bfa]" />
              <span className="text-sm font-medium tracking-widest text-[#faf8f0]/70">PORTFOLIO SHOWCASE</span>
            </Badge>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#faf8f0]/30 to-transparent" />
          </motion.div>

          {/* Main Title */}
          <h1 className="section-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-[#faf8f0]">
              Building Digital
            </span>
            <span className="block mt-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#ec4899] to-[#6366f1] animate-gradient-x">
                Experiences
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="section-subtitle text-lg md:text-xl max-w-3xl mx-auto font-light tracking-wide text-[#faf8f0]/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Transforming innovative ideas into exceptional digital solutions through cutting-edge technology
            and user-centered design. Each project represents a unique challenge solved with precision,
            performance, and passion.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <div className="stats-section mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard
              icon={<Layers className="w-5 h-5" />}
              value="50+"
              label="Projects Delivered"
              color="bg-gradient-to-br from-[#a78bfa] to-[#ec4899]"
            />
            <StatsCard
              icon={<Users className="w-5 h-5" />}
              value="100+"
              label="Happy Clients"
              color="bg-gradient-to-br from-[#3b82f6] to-[#06b6d4]"
            />
            <StatsCard
              icon={<Clock className="w-5 h-5" />}
              value="3+"
              label="Years Experience"
              color="bg-gradient-to-br from-[#10b981] to-[#06b6d4]"
            />
            <StatsCard
              icon={<Star className="w-5 h-5" />}
              value="98%"
              label="Success Rate"
              color="bg-gradient-to-br from-[#f59e0b] to-[#ef4444]"
            />
          </div>
        </div>

        {/* Filters */}
        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-8'
          }>

            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6 text-[#faf8f0]/30">
              <Terminal className="inline-block" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#faf8f0]">
              No Projects Found
            </h3>
            <p className="mb-8 text-[#faf8f0]/60">
              Try selecting a different category or check back soon for new projects.
            </p>
            <Button
              onClick={() => setActiveFilter("all")}
              className="rounded-full bg-gradient-to-r from-[#a78bfa] to-[#6366f1] text-[#0a0a0a]"
            >
              View All Projects
            </Button>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <Card className="border-0 overflow-hidden backdrop-blur-xl bg-[#111111]/50 border-[#faf8f0]/10">
            <div className="p-12">
              <div className="space-y-8 max-w-3xl mx-auto">
                <div className="space-y-4">
                  <h3 className="text-3xl sm:text-4xl font-bold text-[#faf8f0]">
                    Ready to Build Something{" "}
                    <span className="block">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#ec4899]">
                        Amazing Together?
                      </span>
                    </span>
                  </h3>
                  <p className="text-lg text-[#faf8f0]/70">
                    Let's collaborate on your next digital masterpiece. Whether it's a complex web application,
                    innovative AI solution, or seamless mobile experience - I'm ready to bring your vision to life.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div
                    onClick={() => {
                      const contactSection = document.getElementById("contact");
                      contactSection?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-[#a78bfa] to-[#6366f1] text-[#0a0a0a] shadow-lg hover:shadow-xl"
                    >
                      <span className="flex items-center gap-2">
                        <span>Start a Project</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </motion.div>

                  <Button
                    onClick={() => router.push('/projects')}
                    size="lg"
                    variant="secondary"
                    className="rounded-full px-8 py-6 text-lg bg-[#111111] text-[#faf8f0]/80 border border-[#faf8f0]/10 hover:bg-[#111111]/80"
                  >
                    <span className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      <span>View All Projects</span>
                    </span>
                  </Button>
                </div>

                <div className="text-sm text-[#faf8f0]/60 pt-4">
                  <p>💡 <span className="font-medium">Pro Tip:</span> Looking for specific expertise? I specialize in:</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {['Full-Stack Development', 'UI/UX Design', 'Performance Optimization', 'Scalable Architecture'].map((item) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="text-xs bg-[#111111] text-[#faf8f0]/60 border border-[#faf8f0]/10"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 5s ease infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Selection styles */
        ::selection {
          background: rgba(167, 139, 250, 0.3);
          color: #faf8f0;
        }
      `}</style>
    </section>
  );
}
