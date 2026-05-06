"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import useEmblaCarousel from "embla-carousel-react";
import projectsData from "../../_data/projects.json";
import CButton from "./CButton";
import ProjectCard from "./ProjectCard";
import { Project } from "../Types/ProjectsSection";


interface ProjectsSectionProps {
  initialProjects?: Project[];
}

export default function ProjectsSection({ initialProjects }: ProjectsSectionProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [hoveredCard, setHoveredCard] = useState<null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<Array<number>>([]);
  
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { theme } = useTheme();
  const isDark : boolean = theme === 'dark';

  // Use initialProjects if provided, otherwise fallback to local data (client-side)
  const allProjects = initialProjects || projectsData;
  const displayProjects: Project[] = allProjects.slice(0, 6);

  const { scrollYProgress } = useScroll();

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    setIsMounted(true);
    
    // Check for mobile screen
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList());
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  if (!isMounted) return null;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-linear-to-r from-purple-500/20 via-pink-500/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-linear-to-l from-blue-500/20 via-cyan-500/20 to-transparent rounded-full blur-3xl"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-linear-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
            <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">
              Portfolio Showcase
            </span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4">
            <span className={isDark ? "text-white" : "text-gray-900"}>
              Featured{" "}
            </span>
            <span className="bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h2>
          
          <motion.p className={`max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Exploring innovative solutions through code and creativity
          </motion.p>
        </motion.div>

        {/* Projects Grid/Slider */}
        {isMobile ? (
          // Mobile: Carousel Slider
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {displayProjects.map((project, index) => (
                  <div key={project.id} className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_70%] px-2">
                    <ProjectCard
                      project={project}
                      index={index}
                      isHovered={hoveredCard}
                      onHover={setHoveredCard}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all z-10"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all z-10"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {scrollSnaps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                  className={`transition-all duration-300 ${
                    idx === selectedIndex
                      ? 'w-8 h-2 bg-purple-500 rounded-full'
                      : 'w-2 h-2 bg-white/30 rounded-full hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          // Desktop: Grid Layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isHovered={hoveredCard}
                onHover={setHoveredCard}
              />
            ))}
          </div>
        )}

           {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button
            onClick={() => router.push("/projects")}
            variant="outline"
            className={`
              group px-8 py-6 text-lg font-semibold rounded-full
              ${isDark 
                ? 'border-white/10 hover:bg-white/5 text-white' 
                : 'border-gray-300 hover:bg-gray-100 text-gray-900'
              }
              transition-all duration-300 hover:scale-105
            `}
          >
            <span>View All Projects</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* CTA Section */}
      <div>
        <CButton/>
      </div>
      </div>
    </section>
  );
}

// ProjectCard Component
