"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  Github, 
  Star, 
  ArrowUpRight,
  Eye,
  Code,
  Palette,
  Zap,
  ChevronRight,
  Filter,
  Image as ImageIcon,
  Loader2,
  Globe,
  Cpu,
  Sparkles,
  TrendingUp,
  Layers,
  Clock,
  Users
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import toast from "react-hot-toast";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveDemo?: string;
  github?: string;
  category: string;
  featured: boolean;
  createdAt?: string;
}

const techColors: Record<string, string> = {
  // Frontend
  "React": "from-blue-500/20 to-blue-600/20 text-blue-600 dark:text-blue-400 border-blue-500/30",
  "Next.js": "from-gray-900/20 to-black/20 text-gray-900 dark:text-gray-100 border-gray-700/30",
  "TypeScript": "from-blue-600/20 to-blue-700/20 text-blue-700 dark:text-blue-300 border-blue-600/30",
  "JavaScript": "from-yellow-500/20 to-yellow-600/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30",
  "Tailwind CSS": "from-cyan-500/20 to-cyan-600/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
  "HTML": "from-orange-500/20 to-orange-600/20 text-orange-700 dark:text-orange-300 border-orange-500/30",
  "CSS": "from-blue-400/20 to-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-400/30",
  
  // Backend
  "Node.js": "from-green-500/20 to-green-600/20 text-green-700 dark:text-green-300 border-green-500/30",
  "Express": "from-gray-500/20 to-gray-600/20 text-gray-700 dark:text-gray-300 border-gray-500/30",
  "MongoDB": "from-emerald-500/20 to-emerald-600/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  "PostgreSQL": "from-blue-400/20 to-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-400/30",
  "GraphQL": "from-pink-500/20 to-pink-600/20 text-pink-700 dark:text-pink-300 border-pink-500/30",
  "Python": "from-yellow-500/20 to-blue-500/20 text-yellow-700 dark:text-blue-300 border-yellow-500/30",
  "Django": "from-green-600/20 to-green-700/20 text-green-800 dark:text-green-300 border-green-600/30",
  
  // Mobile
  "React Native": "from-blue-400/20 to-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-400/30",
  "Flutter": "from-sky-400/20 to-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-400/30",
  
  // Cloud & Tools
  "Firebase": "from-yellow-500/20 to-orange-500/20 text-yellow-700 dark:text-orange-300 border-yellow-500/30",
  "AWS": "from-orange-500/20 to-orange-600/20 text-orange-700 dark:text-orange-300 border-orange-500/30",
  "Docker": "from-blue-500/20 to-blue-600/20 text-blue-700 dark:text-blue-300 border-blue-500/30",
  "Kubernetes": "from-blue-600/20 to-blue-700/20 text-blue-800 dark:text-blue-300 border-blue-600/30",
  
  // AI/ML
  "TensorFlow": "from-orange-500/20 to-orange-600/20 text-orange-700 dark:text-orange-300 border-orange-500/30",
  "PyTorch": "from-red-500/20 to-red-600/20 text-red-700 dark:text-red-300 border-red-500/30",
  
  // UI/Animation
  "Framer Motion": "from-purple-500/20 to-pink-500/20 text-purple-700 dark:text-pink-300 border-purple-500/30",
  "GSAP": "from-green-400/20 to-green-500/20 text-green-700 dark:text-green-300 border-green-400/30",
  "Three.js": "from-gray-800/20 to-black/20 text-gray-900 dark:text-gray-100 border-gray-700/30",
  
  // Default
  "default": "from-gray-500/20 to-gray-600/20 text-gray-700 dark:text-gray-300 border-gray-500/30",
};

const categories = [
  { id: "all", label: "All Projects", icon: Layers, count: 0 },
  { id: "featured", label: "Featured", icon: Star, count: 0 },
  { id: "web", label: "Web Apps", icon: Globe, count: 0 },
  { id: "mobile", label: "Mobile", icon: Cpu, count: 0 },
  { id: "api", label: "APIs", icon: Code, count: 0 },
  { id: "ai", label: "AI/ML", icon: Sparkles, count: 0 },
  { id: "ecommerce", label: "E-commerce", icon: TrendingUp, count: 0 },
];

export default function ProjectsSection() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    featured: 0,
    webApps: 0,
    mobile: 0,
    api: 0,
    ai: 0,
    ecommerce: 0,
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const currentTheme = mounted ? (theme === 'system' ? systemTheme : theme) : 'dark';

  // Fetch projects from API
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      console.log("Fetching projects from API...");
      
      const response = await axios.get("/api/projects");
      console.log("Projects fetched:", response.data);
      
      setProjects(response.data);
      
      // Calculate stats
      const featured = response.data.filter((p: Project) => p.featured).length;
      const webApps = response.data.filter((p: Project) => 
        p.category.toLowerCase().includes('web') || 
        p.category.toLowerCase().includes('app')
      ).length;
      const mobile = response.data.filter((p: Project) => 
        p.category.toLowerCase().includes('mobile')
      ).length;
      const api = response.data.filter((p: Project) => 
        p.category.toLowerCase().includes('api')
      ).length;
      const ai = response.data.filter((p: Project) => 
        p.category.toLowerCase().includes('ai') || 
        p.tech.some((t: string) => t.toLowerCase().includes('ai'))
      ).length;
      const ecommerce = response.data.filter((p: Project) => 
        p.category.toLowerCase().includes('ecommerce') || 
        p.category.toLowerCase().includes('shop')
      ).length;
      
      setStats({
        total: response.data.length,
        featured,
        webApps,
        mobile,
        api,
        ai,
        ecommerce,
      });
      
      // Update category counts
      categories[0].count = response.data.length;
      categories[1].count = featured;
      categories[2].count = webApps;
      categories[3].count = mobile;
      categories[4].count = api;
      categories[5].count = ai;
      categories[6].count = ecommerce;
      
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  // Filter projects based on active filter
  useEffect(() => {
    if (!projects.length) return;
    
    let filtered = [...projects];
    
    switch (activeFilter) {
      case "featured":
        filtered = projects.filter(p => p.featured);
        break;
      case "web":
        filtered = projects.filter(p => 
          p.category.toLowerCase().includes('web') || 
          p.category.toLowerCase().includes('app')
        );
        break;
      case "mobile":
        filtered = projects.filter(p => 
          p.category.toLowerCase().includes('mobile')
        );
        break;
      case "api":
        filtered = projects.filter(p => 
          p.category.toLowerCase().includes('api')
        );
        break;
      case "ai":
        filtered = projects.filter(p => 
          p.category.toLowerCase().includes('ai') || 
          p.tech.some(t => t.toLowerCase().includes('ai'))
        );
        break;
      case "ecommerce":
        filtered = projects.filter(p => 
          p.category.toLowerCase().includes('ecommerce') || 
          p.category.toLowerCase().includes('shop')
        );
        break;
      default:
        filtered = projects;
    }
    
    setFilteredProjects(filtered);
  }, [activeFilter, projects]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="min-h-screen py-20 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-white">Loading Projects...</div>
      </section>
    );
  }

  const getTechColor = (tech: string) => {
    return techColors[tech] || techColors.default;
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className={`
        min-h-screen relative overflow-hidden py-20 md:py-32
        ${currentTheme === 'dark' 
          ? 'bg-gradient-to-b from-gray-900 via-gray-900/95 to-black' 
          : 'bg-gradient-to-b from-gray-50 via-white to-gray-100'
        }
      `}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, ${currentTheme === 'dark' ? '#fff' : '#000'} 1px, transparent 1px),
                            linear-gradient(to bottom, ${currentTheme === 'dark' ? '#fff' : '#000'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Zap className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              Dynamic Portfolio
            </span>
            <Badge variant="outline" className="ml-2 text-xs bg-white/10 backdrop-blur-sm">
              Live API
            </Badge>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className={`
              block mb-2
              ${currentTheme === 'dark' 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-300' 
                : 'text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600'
              }
            `}>
              Real-World
            </span>
            <span className={`
              ${currentTheme === 'dark' 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient' 
                : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600'
              }
            `}>
              Projects
            </span>
          </h1>
          
          <p className={`
            text-lg md:text-xl max-w-3xl mx-auto mb-8
            ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
          `}>
            A collection of production-ready applications built with modern technologies. 
            Each project demonstrates real-world problem solving and technical expertise.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-5xl mx-auto mt-12">
            {[
              { label: "Total", value: stats.total, icon: Layers, color: "from-blue-500 to-cyan-500" },
              { label: "Featured", value: stats.featured, icon: Star, color: "from-yellow-500 to-orange-500" },
              { label: "Web Apps", value: stats.webApps, icon: Globe, color: "from-green-500 to-emerald-500" },
              { label: "Mobile", value: stats.mobile, icon: Cpu, color: "from-purple-500 to-pink-500" },
              { label: "APIs", value: stats.api, icon: Code, color: "from-red-500 to-pink-500" },
              { label: "AI/ML", value: stats.ai, icon: Sparkles, color: "from-indigo-500 to-purple-500" },
              { label: "E-commerce", value: stats.ecommerce, icon: TrendingUp, color: "from-teal-500 to-cyan-500" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`
                  rounded-xl p-4 text-center backdrop-blur-sm border
                  ${currentTheme === 'dark' 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-gray-50/80 border-gray-200/50 hover:bg-white'
                  }
                  transition-all duration-300
                `}
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} mb-2`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className={`
                  text-2xl font-bold mb-1
                  ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}
                `}>
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          className="max-w-6xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs 
            value={activeFilter} 
            onValueChange={setActiveFilter}
            className="w-full"
          >
            <TabsList className={`
              grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 p-2 rounded-2xl w-full
              ${currentTheme === 'dark' 
                ? 'bg-gray-800/40 border-gray-700/50' 
                : 'bg-white/80 border-gray-200/50 backdrop-blur-sm'
              }
            `}>
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className={`
                    relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                    data-[state=active]:shadow-lg data-[state=active]:scale-105
                    ${currentTheme === 'dark'
                      ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-purple-500/30'
                      : 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/10 data-[state=active]:to-pink-500/10 data-[state=active]:text-gray-900 data-[state=active]:border data-[state=active]:border-purple-500/20'
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    <category.icon className="w-4 h-4" />
                    {category.label}
                    <Badge 
                      variant="secondary" 
                      className={`
                        ml-1 px-1.5 py-0.5 text-xs
                        ${currentTheme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-200/50'}
                      `}
                    >
                      {category.count}
                    </Badge>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className={`
                  h-full overflow-hidden border-2
                  ${currentTheme === 'dark' 
                    ? 'bg-gray-800/20 border-gray-700/30' 
                    : 'bg-white/50 border-gray-200/50'
                  }
                `}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-48 w-full rounded-lg mb-4" />
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Projects Grid */
          <div className="max-w-7xl mx-auto">
            {filteredProjects.length === 0 ? (
              <div className={`
                rounded-2xl p-12 text-center border-2 border-dashed
                ${currentTheme === 'dark' 
                  ? 'bg-gray-800/20 border-gray-700/50' 
                  : 'bg-white/50 border-gray-300/50'
                }
              `}>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-purple-500" />
                </div>
                <h3 className={`
                  text-2xl font-bold mb-3
                  ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}
                `}>
                  No projects found
                </h3>
                <p className={`
                  text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8
                `}>
                  Try selecting a different category or check back later for new projects.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setActiveFilter("all")}
                  className={`
                    ${currentTheme === 'dark' 
                      ? 'border-gray-700 hover:bg-gray-800' 
                      : 'border-gray-300 hover:bg-gray-100'
                    }
                  `}
                >
                  View All Projects
                </Button>
              </div>
            ) : (
              <AnimatePresence>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -8 }}
                      className="group"
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      <Card className={`
                        h-full overflow-hidden border-2 relative
                        ${currentTheme === 'dark' 
                          ? 'bg-gray-800/20 border-gray-700/30 hover:border-purple-500/50' 
                          : 'bg-white/80 border-gray-200/50 hover:border-purple-400/50'
                        }
                        transition-all duration-500 hover:shadow-2xl
                        ${project.featured ? 'ring-2 ring-yellow-500/30' : ''}
                      `}>
                        {/* Featured Badge */}
                        {project.featured && (
                          <div className="absolute top-4 left-4 z-20">
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          </div>
                        )}

                        {/* Category Badge */}
                        <div className="absolute top-4 right-4 z-20">
                          <Badge 
                            variant="outline" 
                            className={`
                              backdrop-blur-sm
                              ${currentTheme === 'dark' 
                                ? 'bg-gray-900/80 border-gray-700 text-gray-300' 
                                : 'bg-white/80 border-gray-300 text-gray-700'
                              }
                            `}
                          >
                            {project.category}
                          </Badge>
                        </div>

                        {/* Image Container */}
                        <div className="relative h-48 overflow-hidden">
                          {/* Image Loading */}
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-black/20 z-10" />
                          
                          {/* Project Image */}
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                              <ImageIcon className="w-12 h-12 text-gray-600" />
                            </div>
                          )}

                          {/* Hover Overlay */}
                          <div className={`
                            absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 
                            transition-all duration-500 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20
                          `}>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: hoveredProject === project.id ? 1 : 0 }}
                              transition={{ type: "spring", stiffness: 300 }}
                              className="flex gap-4"
                            >
                              {project.liveDemo && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="icon"
                                        className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
                                        onClick={() => window.open(project.liveDemo, '_blank')}
                                      >
                                        <Eye className="w-4 h-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Live Demo</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                              
                              {project.github && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="icon"
                                        variant="outline"
                                        className={`
                                          rounded-full border-2 backdrop-blur-sm
                                          ${currentTheme === 'dark' 
                                            ? 'border-white/30 bg-white/10 hover:bg-white/20 text-white' 
                                            : 'border-gray-300 bg-white/80 hover:bg-white text-gray-900'
                                          }
                                        `}
                                        onClick={() => window.open(project.github, '_blank')}
                                      >
                                        <Code className="w-4 h-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>View Code</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </motion.div>
                          </div>

                          {/* Gradient Edge */}
                          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        </div>

                        {/* Card Content */}
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between mb-2">
                            <CardTitle className={`
                              text-xl font-bold line-clamp-1
                              ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}
                            `}>
                              {project.title}
                            </CardTitle>
                            <motion.div
                              animate={{ rotate: hoveredProject === project.id ? 45 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ArrowUpRight className={`
                                w-5 h-5
                                ${currentTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}
                              `} />
                            </motion.div>
                          </div>
                          <p className={`
                            text-sm line-clamp-2
                            ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                          `}>
                            {project.description}
                          </p>
                        </CardHeader>

                        <CardContent className="pb-3">
                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.slice(0, 4).map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className={`
                                  text-xs font-medium px-2 py-1 border backdrop-blur-sm
                                  ${getTechColor(tech)}
                                `}
                              >
                                {tech}
                              </Badge>
                            ))}
                            {project.tech.length > 4 && (
                              <Badge
                                variant="outline"
                                className="text-xs font-medium px-2 py-1 bg-gray-500/10 text-gray-500 border-gray-500/20"
                              >
                                +{project.tech.length - 4} more
                              </Badge>
                            )}
                          </div>

                          {/* Progress Bar (for engagement) */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className={currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                Project Status
                              </span>
                              <span className="font-medium text-purple-600 dark:text-purple-400">
                                {project.featured ? 'Featured' : 'Active'}
                              </span>
                            </div>
                            <Progress 
                              value={project.featured ? 100 : 80} 
                              className={`
                                h-1.5
                                ${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}
                              `}
                            />
                          </div>
                        </CardContent>

                        <CardFooter className="pt-3 border-t">
                          <div className="flex justify-between w-full">
                            {project.liveDemo && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="group/btn"
                                onClick={() => window.open(project.liveDemo, '_blank')}
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                <span>Live Demo</span>
                                <ChevronRight className="w-3 h-3 ml-1 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                              </Button>
                            )}
                            
                            {project.github && (
                              <Button
                                variant={currentTheme === 'dark' ? "secondary" : "outline"}
                                size="sm"
                                className="group/btn"
                                onClick={() => window.open(project.github, '_blank')}
                              >
                                <Github className="w-4 h-4 mr-2" />
                                <span>Code</span>
                              </Button>
                            )}
                          </div>
                        </CardFooter>

                        {/* Animated Border */}
                        <div className={`
                          absolute inset-0 rounded-lg pointer-events-none z-0
                          bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-purple-500/0
                          group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-purple-500/10
                          transition-all duration-700
                        `} />
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}

            {/* API Status Indicator */}
            <motion.div 
              className={`
                mt-12 p-4 rounded-xl border backdrop-blur-sm max-w-md mx-auto
                ${currentTheme === 'dark' 
                  ? 'bg-green-500/5 border-green-500/20' 
                  : 'bg-green-500/10 border-green-500/20'
                }
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <div>
                    <p className={`
                      font-medium
                      ${currentTheme === 'dark' ? 'text-green-400' : 'text-green-600'}
                    `}>
                      API Connected Successfully
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {projects.length} projects loaded in real-time
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={fetchProjects}
                  disabled={loading}
                  className="text-xs"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      Refreshing...
                    </>
                  ) : (
                    'Refresh Data'
                  )}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${currentTheme === 'dark' ? '#111827' : '#f3f4f6'};
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${currentTheme === 'dark' 
            ? 'linear-gradient(to bottom, #8b5cf6, #ec4899)' 
            : 'linear-gradient(to bottom, #7c3aed, #db2777)'};
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${currentTheme === 'dark' 
            ? 'linear-gradient(to bottom, #7c3aed, #db2777)' 
            : 'linear-gradient(to bottom, #6d28d9, #be185d)'};
        }
        
        /* Selection color */
        ::selection {
          background: ${currentTheme === 'dark' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'};
          color: ${currentTheme === 'dark' ? '#fff' : '#000'};
        }
      `}</style>
    </section>
  );
}