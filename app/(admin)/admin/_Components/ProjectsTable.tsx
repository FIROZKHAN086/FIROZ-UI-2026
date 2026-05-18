'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, ExternalLink, Github, ChevronDown, ChevronUp, Star, Calendar, Code, FolderOpen } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ProjectsTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const fadeInUp = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" as const }
  }),
};

const cardVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: i * 0.08, duration: 0.3, ease: "easeOut" as const }
  }),
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

export default function ProjectsTable({ projects, onEdit, onDelete }: ProjectsTableProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Desktop Table View (md and above)
  const DesktopTableView = () => (
    <div className="hidden md:block">
      <div className="rounded-2xl bg-linear-to-br from-gray-900/80 via-gray-900/60 to-gray-950/80 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent bg-linear-to-r from-gray-900/50 to-gray-950/50">
                <TableHead className="text-gray-400 font-semibold uppercase tracking-wider text-[11px] py-5 px-6">
                  Project Details
                </TableHead>
                <TableHead className="text-gray-400 font-semibold uppercase tracking-wider text-[11px] py-5">
                  Category
                </TableHead>
                <TableHead className="text-gray-400 font-semibold uppercase tracking-wider text-[11px] py-5">
                  Status
                </TableHead>
                <TableHead className="text-gray-400 font-semibold uppercase tracking-wider text-[11px] py-5">
                  Tech Stack
                </TableHead>
                <TableHead className="text-gray-400 font-semibold uppercase tracking-wider text-[11px] py-5">
                  Links
                </TableHead>
                <TableHead className="text-gray-400 font-semibold uppercase tracking-wider text-[11px] py-5 text-right pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {projects.map((project, index) => (
                  <motion.tr
                    key={project.id}
                    custom={index}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -20 }}
                    className="group border-white/5 hover:bg-white/[0.03] transition-all duration-300"
                  >
                    <TableCell className="py-4 px-6">
                      <motion.div 
                        className="flex items-center gap-3"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="relative h-12 w-16 rounded-xl overflow-hidden bg-linear-to-br from-gray-800 to-gray-900 shrink-0 ring-1 ring-white/10 group-hover:ring-purple-500/50 transition-all duration-300">
                          {project.image ? (
                            <Image 
                              src={project.image} 
                              alt={project.title} 
                              fill 
                              className="object-cover transition-transform duration-500 group-hover:scale-110" 
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <FolderOpen className="h-5 w-5 text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white group-hover:text-purple-300 transition-colors text-sm">
                            {project.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 max-w-[200px]">
                            {project.description}
                          </p>
                        </div>
                      </motion.div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-linear-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400 text-xs font-medium px-3 py-1">
                        {project.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {project.featured ? (
                        <motion.div 
                          className="flex items-center gap-1.5"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="relative">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <div className="absolute inset-0 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping opacity-75" />
                          </div>
                          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            Featured
                          </span>
                        </motion.div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                          <span className="text-xs font-medium text-gray-500">Draft</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                        {project.tech.slice(0, 2).map((tech, i) => (
                          <motion.span
                            key={i}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="text-[11px] font-medium px-2 py-1 rounded-md bg-white/5 text-gray-300 border border-white/10 hover:border-purple-500/30 transition-all"
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {project.tech.length > 2 && (
                          <motion.span 
                            whileHover={{ scale: 1.05 }}
                            className="text-[11px] font-medium px-2 py-1 rounded-md bg-linear-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/20 cursor-help"
                            title={project.tech.slice(2).join(', ')}
                          >
                            +{project.tech.length - 2}
                          </motion.span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1.5">
                        {project.liveDemo && (
                          <motion.a
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.liveDemo} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200"
                          >
                            <ExternalLink size={15} />
                          </motion.a>
                        )}
                        {project.github && (
                          <motion.a
                            whileHover={{ scale: 1.15, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-200"
                          >
                            <Github size={15} />
                          </motion.a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(project)}
                            className="h-8 w-8 text-gray-500 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all"
                          >
                            <Edit size={15} />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(project.id)}
                            className="h-8 w-8 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                          >
                            <Trash2 size={15} />
                          </Button>
                        </motion.div>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
        
        {projects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 text-gray-500"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl mb-4 opacity-30"
            >
              📁
            </motion.div>
            <p className="font-semibold text-gray-400">No projects yet</p>
            <p className="text-sm text-gray-600 mt-1">Click &quot;Add Project&quot; to get started</p>
          </motion.div>
        )}
      </div>
    </div>
  );

  // Mobile Card View (below md)
  const MobileCardView = () => (
    <div className="md:hidden space-y-4">
      <AnimatePresence>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.9 }}
            layout
          >
            <Card className="bg-linear-to-br from-gray-900/90 to-gray-950/90 border-white/10 backdrop-blur-sm overflow-hidden">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start gap-3">
                  <div className="relative h-16 w-20 rounded-xl overflow-hidden bg-linear-to-br from-gray-800 to-gray-900 ring-1 ring-white/10 shrink-0">
                    {project.image ? (
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        className="object-cover" 
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <FolderOpen className="h-6 w-6 text-gray-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-white text-base font-semibold line-clamp-1">
                        {project.title}
                      </CardTitle>
                      <div className="flex gap-1 shrink-0">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(project)}
                            className="h-8 w-8 text-gray-500 hover:text-purple-400 hover:bg-purple-500/10"
                          >
                            <Edit size={14} />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(project.id)}
                            className="h-8 w-8 text-gray-500 hover:text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <Badge className="bg-linear-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400 text-[10px] px-2 py-0.5">
                        {project.category}
                      </Badge>
                      {project.featured && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-emerald-400" />
                          <span className="text-[10px] font-medium text-emerald-400">Featured</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 pt-2">
                <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tech.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium px-2 py-1 rounded-md bg-white/5 text-gray-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-[10px] font-medium px-2 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
                
                {/* Expandable Section */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {project.liveDemo && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        href={project.liveDemo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-all"
                      >
                        <ExternalLink size={12} />
                        Demo
                      </motion.a>
                    )}
                    {project.github && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-medium hover:bg-blue-500/20 transition-all"
                      >
                        <Github size={12} />
                        Code
                      </motion.a>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedCard(expandedCard === project.id ? null : project.id)}
                    className="text-gray-500 hover:text-purple-400 text-xs"
                  >
                    {expandedCard === project.id ? (
                      <>
                        <ChevronUp size={14} className="mr-1" />
                        Less
                      </>
                    ) : (
                      <>
                        <ChevronDown size={14} className="mr-1" />
                        More
                      </>
                    )}
                  </Button>
                </div>
                
                <AnimatePresence>
                  {expandedCard === project.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-3 pt-3 border-t border-white/10"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          <Calendar className="h-3 w-3 text-gray-500" />
                          <span className="text-gray-400">Created:</span>
                          <span className="text-gray-500">
                            {new Date(project.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Code className="h-3 w-3 text-gray-500" />
                          <span className="text-gray-400">Tech Stack:</span>
                          <span className="text-gray-500 truncate">
                            {project.tech.join(', ')}
                          </span>
                        </div>
                        {project.liveDemo && (
                          <div className="flex items-center gap-2 text-xs">
                            <ExternalLink className="h-3 w-3 text-gray-500" />
                            <span className="text-gray-400">Live Demo:</span>
                            <a 
                              href={project.liveDemo} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-purple-400 hover:underline truncate"
                            >
                              {project.liveDemo}
                            </a>
                          </div>
                        )}
                        {project.github && (
                          <div className="flex items-center gap-2 text-xs">
                            <Github className="h-3 w-3 text-gray-500" />
                            <span className="text-gray-400">GitHub:</span>
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-purple-400 hover:underline truncate"
                            >
                              {project.github}
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 bg-linear-to-r from-transparent via-purple-500/5 to-transparent">
                <div className="w-full h-px bg-linear-to-r from-transparent via-purple-500/20 to-transparent" />
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {projects.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-linear-to-br from-gray-900/50 to-gray-950/50 rounded-2xl border border-white/10"
        >
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-6xl mb-4 opacity-30"
          >
            📁
          </motion.div>
          <p className="font-semibold text-gray-400">No projects yet</p>
          <p className="text-sm text-gray-600 mt-1">Click &quot;Add Project&quot; to get started</p>
        </motion.div>
      )}
    </div>
  );

  // Tablet View (lg and below, but better than mobile)
  const TabletAdaptiveView = () => (
    <div className="hidden sm:block md:hidden">
      <div className="space-y-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            custom={index}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="bg-linear-to-r from-gray-900/80 to-gray-950/80 rounded-xl border border-white/10 p-4 hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative h-14 w-20 rounded-lg overflow-hidden bg-gray-800/50 shrink-0">
                  {project.image ? (
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <FolderOpen className="h-5 w-5 text-gray-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm truncate">{project.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-purple-500/10 text-purple-400 text-[10px] border-purple-500/20">
                      {project.category}
                    </Badge>
                    {project.featured && (
                      <div className="flex items-center gap-1">
                        <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] text-emerald-400">Featured</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(project)}
                  className="h-8 w-8 text-gray-500 hover:text-purple-400"
                >
                  <Edit size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(project.id)}
                  className="h-8 w-8 text-gray-500 hover:text-red-400"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs text-gray-400 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.tech.slice(0, 3).map((tech, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400">
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
              <div className="flex gap-2 mt-3">
                {project.liveDemo && (
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" 
                     className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
                    <ExternalLink size={12} /> Demo
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                     className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                    <Github size={12} /> Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <DesktopTableView />
      <TabletAdaptiveView />
      <MobileCardView />
    </>
  );
}