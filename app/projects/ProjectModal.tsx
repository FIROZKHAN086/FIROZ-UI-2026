import { AnimatePresence, motion } from "framer-motion";
import { Project } from "./types";
import { useTheme } from "next-themes";
import NextImage from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, ExternalLink, Github, Code, Calendar, Star, ImageIcon } from "lucide-react";
import { techColors } from "./Value";



export function ProjectModal({ project, isOpen, onClose }: { project: Project | null; isOpen: boolean; onClose: () => void }) {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`
            relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl
            ${currentTheme === "dark" 
              ? "bg-linear-to-br from-gray-900 to-gray-800" 
              : "bg-white"
            }
            shadow-2xl
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative h-48 sm:h-64 md:h-96">
            {project.image ? (
              <NextImage
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-800 to-gray-900">
                <ImageIcon className="w-20 h-20 text-gray-600" />
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
            
            {project.featured && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-linear-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
                  <Star className="w-3 h-3 mr-1" />
                  Featured Project
                </Badge>
              </div>
            )}
          </div>

          <div className="p-6 md:p-8">
            <h2 className={`text-3xl font-bold mb-3 ${currentTheme === "dark" ? "text-white" : "text-gray-900"}`}>
              {project.title}
            </h2>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="text-sm">
                {project.category}
              </Badge>
              {project.createdAt && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
              )}
            </div>

            <p className={`text-base leading-relaxed mb-6 ${currentTheme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              {project.description}
            </p>

            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${currentTheme === "dark" ? "text-white" : "text-gray-900"}`}>
                <Code className="w-4 h-4" />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="outline" className={`px-3 py-1.5 text-sm ${techColors[tech] || techColors["default"]}`}>
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              {project.liveDemo && (
                <Button
                  className="bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={() => window.open(project.liveDemo, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live Demo
                </Button>
              )}
              {project.github && (
                <Button
                  variant="outline"
                  onClick={() => window.open(project.github, "_blank")}
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Source Code
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}