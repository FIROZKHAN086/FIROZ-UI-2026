"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
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

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}




const categories = [
  { id: "all", label: "All Projects", icon: <Layers className="w-4 h-4" />, count: 3 },
  { id: "Web Platform", label: "Web Platforms", icon: <Globe className="w-4 h-4" />, count: 1 },
  { id: "AI Platform", label: "AI Platforms", icon: <Cpu className="w-4 h-4" />, count: 1 },
  { id: "Mobile App", label: "Mobile Apps", icon: <Smartphone className="w-4 h-4" />, count: 1 },
];


// Stats Card Component

type StatsCardProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
};

const StatsCard = ({ icon, value, label, color }: StatsCardProps) => {
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative group"
    >
        <span
        className={`absolute top-3 right-3 z-10 px-2 py-0.5 rounded-full
        text-[10px] font-semibold tracking-wide
        ${isDark
          ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20'
          : 'bg-yellow-100 text-yellow-700 border border-yellow-300'}
      `}
      >
       hard-coded
      </span>
      <Card className="overflow-hidden border-0 backdrop-blur-sm">
        <div className="p-6">
          <div className={`inline-flex p-3 rounded-full mb-4 ${color}`}>
            <div className="text-white">{icon}</div>
          </div>
          <div className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {value}
          </div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {label}
          </div>
        </div>
      </Card>
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent ${
        theme === 'dark' ? 'to-white/5' : 'to-black/5'
      } rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
    </motion.div>
  );
};

// Filter Component
type FilterTabsProps = {
  activeFilter: string;
  onFilterChange: (value: string) => void;
  viewMode: string;
  onViewModeChange: (mode: string) => void;
};
const FilterTabs = ({ activeFilter, onFilterChange, viewMode, onViewModeChange }: FilterTabsProps) => {
  const { theme } = useTheme();
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
      <Tabs 
        value={activeFilter} 
        onValueChange={onFilterChange}
        className="w-full sm:w-auto"
      >
        <TabsList className="flex-wrap h-auto p-1">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className={`relative px-4 py-2 rounded-lg ${
                theme === 'dark' 
                  ? 'data-[state=active]:bg-gray-800' 
                  : 'data-[state=active]:bg-gray-100'
              }`}
            >
              <span className="flex items-center gap-2">
                {category.icon}
                <span>{category.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  {category.count}
                </span>
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <div className="flex items-center gap-2">
        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mr-2`}>
          View:
        </span>
        <div className={`flex rounded-lg border ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        } p-1`}>
          <Button
            size="sm"
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            onClick={() => onViewModeChange("grid")}
            className="h-8 w-8 p-0"
          >
            <Grid3x3 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={viewMode === "list" ? "secondary" : "ghost"}
            onClick={() => onViewModeChange("list")}
            className="h-8 w-8 p-0"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function ProjectsSection() {
  const { theme } = useTheme();
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
      accent: "#8B5CF6",
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
      accent: "#10B981",
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
      accent: "#3B82F6",
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
    
    // GSAP Animations
    const ctx = gsap.context(() => {
      // Section entrance
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
      
      // Title animation
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
      
      // Subtitle animation
      gsap.from(".section-subtitle", {
        scrollTrigger: {
          trigger: ".section-subtitle",
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out"
      });
      
      // Stats animation
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
      className={`relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden ${
        theme === 'dark' ? 'bg-gradient-to-br from-gray-950 via-black to-gray-950' : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30' 
            : 'bg-gradient-to-r from-purple-300/20 via-pink-300/20 to-blue-300/20'
        }`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-blue-600/30 via-cyan-600/30 to-emerald-600/30' 
            : 'bg-gradient-to-r from-blue-300/20 via-cyan-300/20 to-emerald-300/20'
        }`} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(90deg, currentColor 1px, transparent 1px),
                              linear-gradient(currentColor 1px, transparent 1px)`,
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
            <div className={`w-8 h-px ${
              theme === 'dark' ? 'bg-gradient-to-r from-transparent via-white/30 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-600/30 to-transparent'
            }`} />
            <Badge 
              variant="outline" 
              className="px-4 py-2 rounded-full backdrop-blur-sm"
              style={{
                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium tracking-widest">PORTFOLIO SHOWCASE</span>
            </Badge>
            <div className={`w-8 h-px ${
              theme === 'dark' ? 'bg-gradient-to-r from-transparent via-white/30 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-600/30 to-transparent'
            }`} />
          </motion.div>

          {/* Main Title */}
          <h1 className="section-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className={`block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Building Digital
            </span>
            <span className="block mt-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient-x">
                Experiences
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="section-subtitle text-lg md:text-xl max-w-3xl mx-auto font-light tracking-wide"
            style={{
              color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'
            }}
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
              color="bg-gradient-to-br from-purple-500 to-pink-500"
            />
            <StatsCard
              icon={<Users className="w-5 h-5" />}
              value="100+"
              label="Happy Clients"
              color="bg-gradient-to-br from-blue-500 to-cyan-500"
            />
            <StatsCard
              icon={<Clock className="w-5 h-5" />}
              value="3+"
              label="Years Experience"
              color="bg-gradient-to-br from-green-500 to-emerald-500"
            />
            <StatsCard
              icon={<Star className="w-5 h-5" />}
              value="98%"
              label="Success Rate"
              color="bg-gradient-to-br from-orange-500 to-red-500"
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
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  viewMode={viewMode}
                  theme={theme}
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
            <div className={`text-6xl mb-6 ${theme === 'dark' ? 'text-gray-700' : 'text-gray-300'}`}>
              <Terminal className="inline-block" />
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              No Projects Found
            </h3>
            <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Try selecting a different category or check back soon for new projects.
            </p>
            <Button
              onClick={() => setActiveFilter("all")}
              className="rounded-full"
              style={{
                background: theme === 'dark' 
                  ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' 
                  : 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                color: 'white'
              }}
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
          <Card className={`border-0 overflow-hidden backdrop-blur-xl ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-gray-900/60 to-gray-800/40' 
              : 'bg-gradient-to-br from-white/80 to-gray-50/80'
          }`}>
            <div className="p-12">
              <div className="space-y-8 max-w-3xl mx-auto">
                <div className="space-y-4">
                  <h3 className={`text-3xl sm:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Ready to Build Something 
                    <span className="block">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                        Extraordinary Together?
                      </span>
                    </span>
                  </h3>
                  <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
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
                      className="rounded-full px-8 py-6 text-lg group"
                      style={{
                        background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                        color: 'white',
                        boxShadow: theme === 'dark' 
                          ? '0 20px 60px rgba(139, 92, 246, 0.3)' 
                          : '0 20px 60px rgba(139, 92, 246, 0.2)'
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <span>Start a Project</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </motion.div>
                  
                  <Button
                  onClick={()=>router.push('/projects')}
                    size="lg"
                    variant={theme === 'dark' ? "outline" : "secondary"}
                    className="rounded-full px-8 py-6 text-lg"
                  >
                    <span className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      <span>View All Projects</span>
                    </span>
                  </Button>
                </div>
                
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} pt-4`}>
                  <p>💡 <span className="font-medium">Pro Tip:</span> Looking for specific expertise? I specialize in:</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {['Full-Stack Development', 'UI/UX Design', 'Performance Optimization', 'Scalable Architecture'].map((item) => (
                      <Badge 
                        key={item} 
                        variant="secondary"
                        className="text-xs"
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

      {/* Global Styles */}
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
          background: ${theme === 'dark' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.2)'};
          color: ${theme === 'dark' ? '#ffffff' : '#000000'};
        }
      `}</style>
    </section>
  );
}