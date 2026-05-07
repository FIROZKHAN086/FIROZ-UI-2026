// Mobile Carousel Component
import { useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Project } from "./types";
import { useTheme } from "next-themes";
import { techColors } from "./Value";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import NextImage from "next/image";
import { ImageIcon, ExternalLink, Github, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";


export function MobileCarousel({ projects, onProjectClick }: { projects: Project[]; onProjectClick: (project: Project) => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

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

  const getTechColor = (tech: string) => techColors[tech] || techColors["default"];

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {projects.map((project, index) => (
            <div key={project.id} className="flex-[0_0_85%] min-w-0 px-2 sm:flex-[0_0_70%]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => onProjectClick(project)}
              >
                <Card className={`
                  h-full overflow-hidden border-0
                  ${currentTheme === "dark" 
                    ? "bg-linear-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl" 
                    : "bg-linear-to-br from-white to-gray-50 backdrop-blur-xl"
                  }
                  shadow-xl
                  ${project.featured ? "ring-2 ring-yellow-500/40" : ""}
                `}>
                  <div className="relative h-48 overflow-hidden">
                    <div className={`
                      absolute inset-0 z-10 transition-opacity duration-500
                      ${currentTheme === "dark" ? "bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent" : "bg-linear-to-t from-white via-white/40 to-transparent"}
                    `} />
                    
                    {project.image ? (
                      <NextImage
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-800 to-gray-900">
                        <ImageIcon className="w-12 h-12 text-gray-600" />
                      </div>
                    )}

                    {project.featured && (
                      <div className="absolute top-3 left-3 z-20">
                        <Badge className="bg-linear-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg px-2 py-0.5 text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-2">
                    <h3 className={`text-lg font-bold line-clamp-1 ${currentTheme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {project.title}
                    </h3>
                    <p className={`text-xs line-clamp-2 ${currentTheme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      {project.description}
                    </p>
                  </CardHeader>

                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className={`text-[9px] px-1.5 py-0.5 ${getTechColor(tech)}`}>
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0.5">
                          +{project.tech.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2 pb-3">
                    <div className="flex justify-between w-full">
                      {project.liveDemo && (
                        <Button size="sm" className="h-8 text-xs bg-linear-to-r from-purple-500 to-pink-500" onClick={(e) => { e.stopPropagation(); window.open(project.liveDemo, "_blank"); }}>
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Demo
                        </Button>
                      )}
                      {project.github && (
                        <Button size="sm" variant="outline" className="h-8 text-xs" onClick={(e) => { e.stopPropagation(); window.open(project.github, "_blank"); }}>
                          <Github className="w-3 h-3 mr-1" />
                          Code
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center hover:bg-purple-500/40 transition-all z-10"
      >
        <ChevronLeft className="w-5 h-5 text-purple-500" />
      </button>
      
      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center hover:bg-purple-500/40 transition-all z-10"
      >
        <ChevronRight className="w-5 h-5 text-purple-500" />
      </button>
      
      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {scrollSnaps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi && emblaApi.scrollTo(idx)}
            className={`transition-all duration-300 ${
              idx === selectedIndex
                ? 'w-6 h-1.5 bg-linear-to-r from-purple-500 to-pink-500 rounded-full'
                : 'w-1.5 h-1.5 bg-purple-500/30 rounded-full hover:bg-purple-500/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
