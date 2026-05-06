'use client';

import { motion } from "framer-motion";
import { ExternalLink, Github,  Badge, Star } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tech: string[];
  liveDemo?: string;
  github?: string;
};

interface ProjectCardProps {
  project: Project;
  size?: "small" | "big";
  index: number;
  isHovered: number | null;
  onHover: (index: number | null) => void;
}

export default function ProjectCard({ project, index, isHovered, onHover }: ProjectCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => onHover(index)}
      onHoverEnd={() => onHover(null)}
      className="group h-full"
    >
      <div className={`
        relative h-full rounded-2xl overflow-hidden
        ${isDark ? 'bg-linear-to-br from-[#111111] to-[#0a0a0a]' : 'bg-white'}
        border ${isDark ? 'border-white/10' : 'border-gray-200'}
        transition-all duration-500 hover:shadow-2xl hover:border-purple-500/30
      `}>
        
        {/* Image Section */}
        <div className="relative w-full h-56 overflow-hidden bg-gray-800">
          <motion.div
            animate={{ scale: isHovered === index ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute top-4 left-4">
            <Badge className="bg-black/50 backdrop-blur-sm border-white/20 text-white">
              {project.category}
            </Badge>
          </div>

          {index === 0 && (
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-4 right-4"
            >
              <Badge className="bg-linear-to-r from-yellow-500 to-orange-500 border-none">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className={`
              text-xl font-bold line-clamp-1
              ${isDark ? 'text-white' : 'text-gray-900'}
              group-hover:text-purple-500 transition-colors
            `}>
              {project.title}
            </h3>
            <ExternalLink className={`w-4 h-4 shrink-0 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          </div>

          <p className={`text-sm line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className={`
                  text-xs px-2.5 py-1 rounded-full font-medium
                  ${isDark 
                    ? 'bg-white/10 text-gray-300 border border-white/5' 
                    : 'bg-gray-100 text-gray-700'
                  }
                `}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  px-4 py-2 text-sm font-medium rounded-lg border
                  ${isDark
                    ? 'border-white/10 text-gray-300 hover:bg-white/5'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}