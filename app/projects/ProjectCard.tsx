import { useState } from "react";
import NextImage from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Project } from "./types";
import { useTheme } from "next-themes";
import { useElementInView } from "./page";
import { techColors } from "./Value";
import { ArrowUpRight, Badge, Code, Eye, ImageIcon, Maximize2, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";



// Project Card Component for Desktop 
export function ProjectCard({ project, index, onProjectClick }: { project: Project; index: number; onProjectClick: (project: Project) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const { ref, isInView } = useElementInView();

  const getTechColor = (tech: string) => techColors[tech] || techColors["default"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 80, rotateX: -15 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer"
      onClick={() => onProjectClick(project)}
    >
      <Card className={`
        h-full overflow-hidden border-0 relative
        ${currentTheme === "dark" 
          ? "bg-linear-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl" 
          : "bg-linear-to-br from-white to-gray-50 backdrop-blur-xl"
        }
        shadow-xl hover:shadow-2xl transition-all duration-500
        ${project.featured ? "ring-2 ring-yellow-500/40" : ""}
      `}>
        <div className="relative h-56 overflow-hidden">
          <div className={`
            absolute inset-0 z-10 transition-opacity duration-500
            ${currentTheme === "dark" ? "bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent" : "bg-linear-to-t from-white via-white/40 to-transparent"}
          `} />

          {project.image ? (
            <NextImage
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-800 to-gray-900">
              <ImageIcon className="w-16 h-16 text-gray-600" />
            </div>
          )}

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex gap-4"
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          className="rounded-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
                          onClick={(e) => { e.stopPropagation(); window.open(project.liveDemo, "_blank"); }}
                        >
                          <Eye className="w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Live Demo</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {project.github && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                            onClick={(e) => { e.stopPropagation(); window.open(project.github, "_blank"); }}
                          >
                            <Code className="w-5 h-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>View Code</p></TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className="rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                          onClick={(e) => { e.stopPropagation(); onProjectClick(project); }}
                        >
                          <Maximize2
                           className="w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>View Details</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {project.featured && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute top-4 left-4 z-30"
            >
              <Badge className="bg-linear-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg px-3 py-1">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </motion.div>
          )}
        </div>

        <CardHeader className="pb-3">
          <motion.div
            className="flex items-start justify-between mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className={`text-xl font-bold line-clamp-1 ${currentTheme === "dark" ? "text-white" : "text-gray-900"}`}>
              {project.title}
            </h3>
            <motion.div
              animate={{ rotate: isHovered ? 45 : 0, scale: isHovered ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className={`w-5 h-5 ${currentTheme === "dark" ? "text-gray-500" : "text-gray-400"}`} />
            </motion.div>
          </motion.div>
          <motion.p
            className={`text-sm line-clamp-2 ${currentTheme === "dark" ? "text-gray-400" : "text-gray-600"}`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            {project.description}
          </motion.p>
        </CardHeader>

        <CardContent className="pb-3">
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
          >
            {project.tech.slice(0, 4).map((tech, techIndex) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 0.4 + techIndex * 0.05 }}
              >
                <Badge  className={`text-xs font-medium px-2 py-1 border ${getTechColor(tech)}`}>
                  {tech}
                </Badge>
              </motion.div>
            ))}
            {project.tech.length > 4 && (
              <Badge  className="text-xs font-medium px-2 py-1 bg-gray-500/10 text-gray-500 border-gray-500/20">
                +{project.tech.length - 4}
              </Badge>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}