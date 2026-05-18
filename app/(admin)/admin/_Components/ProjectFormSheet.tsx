'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  X, Upload, Loader2, Sparkles, Code, Globe, Github as GithubIcon, 
  Tag, Eye, ImageIcon, FileText, Layers, Link2, Check, ChevronLeft,
  Zap, Shield, Rocket, Star, Award, Briefcase, Server, Database,
  Cloud, Cpu, Palette, Heart, Share2, Upload as UploadIcon,
  Coffee
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Enhanced popular tech suggestions with icons
const POPULAR_TECH = [
  { name: 'React', icon: <Zap className="h-3 w-3" />, color: '#61DAFB' },
  { name: 'Next.js', icon: <Rocket className="h-3 w-3" />, color: '#000000' },
  { name: 'TypeScript', icon: <Shield className="h-3 w-3" />, color: '#3178C6' },
  { name: 'JavaScript', icon: <Code className="h-3 w-3" />, color: '#F7DF1E' },
  { name: 'Tailwind CSS', icon: <Palette className="h-3 w-3" />, color: '#38BDF8' },
  { name: 'Node.js', icon: <Server className="h-3 w-3" />, color: '#339933' },
  { name: 'Express', icon: <Coffee className="h-3 w-3" />, color: '#000000' },
  { name: 'MongoDB', icon: <Database className="h-3 w-3" />, color: '#47A248' },
  { name: 'PostgreSQL', icon: <Database className="h-3 w-3" />, color: '#4169E1' },
  { name: 'Prisma', icon: <Database className="h-3 w-3" />, color: '#2D3748' },
  { name: 'GraphQL', icon: <Share2 className="h-3 w-3" />, color: '#E10098' },
  { name: 'Python', icon: <Code className="h-3 w-3" />, color: '#3776AB' },
  { name: 'Django', icon: <Server className="h-3 w-3" />, color: '#092E20' },
  { name: 'Flask', icon: <Coffee className="h-3 w-3" />, color: '#000000' },
  { name: 'Vue.js', icon: <Heart className="h-3 w-3" />, color: '#4FC08D' },
  { name: 'Angular', icon: <Award className="h-3 w-3" />, color: '#DD0031' },
  { name: 'Svelte', icon: <Heart className="h-3 w-3" />, color: '#FF3E00' },
  { name: 'Redux', icon: <Share2 className="h-3 w-3" />, color: '#764ABC' },
  { name: 'Zustand', icon: <Zap className="h-3 w-3" />, color: '#443E38' },
  { name: 'Framer Motion', icon: <Sparkles className="h-3 w-3" />, color: '#0055FF' },
  { name: 'GSAP', icon: <Rocket className="h-3 w-3" />, color: '#88CE02' },
  { name: 'Three.js', icon: <Cpu className="h-3 w-3" />, color: '#000000' },
  { name: 'WebGL', icon: <Cpu className="h-3 w-3" />, color: '#990000' },
  { name: 'Firebase', icon: <Cloud className="h-3 w-3" />, color: '#FFCA28' },
  { name: 'Supabase', icon: <Database className="h-3 w-3" />, color: '#3ECF8E' },
  { name: 'Docker', icon: <Server className="h-3 w-3" />, color: '#2496ED' },
  { name: 'Kubernetes', icon: <Server className="h-3 w-3" />, color: '#326CE5' },
  { name: 'AWS', icon: <Cloud className="h-3 w-3" />, color: '#FF9900' },
  { name: 'Vercel', icon: <Rocket className="h-3 w-3" />, color: '#000000' },
  { name: 'Netlify', icon: <Cloud className="h-3 w-3" />, color: '#00C7B7' },
  { name: 'Git', icon: <Code className="h-3 w-3" />, color: '#F05032' },
  { name: 'GitHub Actions', icon: <Zap className="h-3 w-3" />, color: '#2088FF' },
];

const CATEGORY_SUGGESTIONS = [
  'Web Application', 'Mobile App', 'Full Stack', 'Frontend', 'Backend',
  'E-commerce', 'Portfolio', 'Dashboard', 'API', 'Library', 'Tool',
  'Game', 'AI/ML', 'Blockchain', 'DevOps', 'CMS', 'Blog', 'SaaS',
];

interface ProjectFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: Project | null;
  onSubmit: (data: any) => void;
}

const sectionsList = [
  { id: 'image', label: 'Media', icon: ImageIcon, gradient: 'from-purple-500 to-pink-500' },
  { id: 'details', label: 'Details', icon: FileText, gradient: 'from-blue-500 to-cyan-500' },
  { id: 'category', label: 'Stack', icon: Layers, gradient: 'from-emerald-500 to-teal-500' },
  { id: 'links', label: 'Links', icon: Link2, gradient: 'from-orange-500 to-red-500' },
];

export default function ProjectFormSheet({ open, onOpenChange, project, onSubmit }: ProjectFormSheetProps) {
  const [activeSection, setActiveSection] = useState('image');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tech: '',
    liveDemo: '',
    github: '',
    featured: false,
    image: '',
  });
  const [uploading, setUploading] = useState(false);
  const [techTags, setTechTags] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  const [showTechSuggestions, setShowTechSuggestions] = useState(false);
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const techInputRef = useRef<HTMLInputElement>(null);
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Load project data when editing
  useEffect(() => {
    if (project && open) {
      setIsEditing(true);
      setFormData({
        title: project.title || '',
        description: project.description || '',
        category: project.category || '',
        tech: project.tech?.join(', ') || '',
        liveDemo: project.liveDemo || '',
        github: project.github || '',
        featured: project.featured || false,
        image: project.image || '',
      });
      setTechTags(project.tech || []);
    } else if (!open) {
      // Reset form when closing
      setTimeout(() => {
        if (!project) {
          setFormData({
            title: '',
            description: '',
            category: '',
            tech: '',
            liveDemo: '',
            github: '',
            featured: false,
            image: '',
          });
          setTechTags([]);
          setTechInput('');
          setIsEditing(false);
          setActiveSection('image');
        }
      }, 300);
    }
  }, [project, open]);

  // Scroll to top when section changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection]);

  const filteredTechSuggestions = POPULAR_TECH.filter(tech =>
    tech.name.toLowerCase().includes(techInput.toLowerCase()) && 
    !techTags.includes(tech.name)
  ).slice(0, 12);

  const filteredCategorySuggestions = CATEGORY_SUGGESTIONS.filter(cat =>
    cat.toLowerCase().includes(formData.category.toLowerCase())
  ).slice(0, 8);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    
    setUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('image', file);
    
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formDataObj });
      const data = await res.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, image: data.url }));
        toast.success('Image uploaded successfully', {
          style: { background: '#10b981', color: 'white', border: 'none' },
        });
      } else {
        toast.error('Upload failed');
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif', '.svg'] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = techInput.trim();
      if (value && !techTags.includes(value)) {
        setTechTags([...techTags, value]);
        setTechInput('');
        setShowTechSuggestions(false);
      }
    }
  };

  const addTechTag = (tech: string) => {
    if (!techTags.includes(tech)) {
      setTechTags([...techTags, tech]);
      setTechInput('');
      setShowTechSuggestions(false);
      techInputRef.current?.focus();
    }
  };

  const removeTechTag = (tag: string) => {
    setTechTags(techTags.filter(t => t !== tag));
  };

  const selectCategory = (category: string) => {
    setFormData(prev => ({ ...prev, category }));
    setShowCategorySuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.image) {
      toast.error('Please upload a project image');
      setActiveSection('image');
      return;
    }
    if (!formData.title.trim()) {
      toast.error('Please enter a project title');
      setActiveSection('details');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Please enter a project description');
      setActiveSection('details');
      return;
    }
    if (!formData.category.trim()) {
      toast.error('Please select a category');
      setActiveSection('category');
      return;
    }
    if (techTags.length === 0) {
      toast.error('Please add at least one technology');
      setActiveSection('category');
      return;
    }

    onSubmit({ ...formData, tech: techTags });
  };

  const sectionStatus = (id: string) => {
    if (id === 'image') return !!formData.image;
    if (id === 'details') return !!(formData.title && formData.description);
    if (id === 'category') return !!(formData.category && techTags.length > 0);
    if (id === 'links') return true;
    return false;
  };

  const nextSection = () => {
    const idx = sectionsList.findIndex(s => s.id === activeSection);
    if (idx < sectionsList.length - 1) {
      setActiveSection(sectionsList[idx + 1].id);
    }
  };

  const prevSection = () => {
    const idx = sectionsList.findIndex(s => s.id === activeSection);
    if (idx > 0) setActiveSection(sectionsList[idx - 1].id);
  };

  const getTechColor = (techName: string) => {
    const tech = POPULAR_TECH.find(t => t.name === techName);
    return tech?.color || '#6B7280';
  };

  return (
    <TooltipProvider>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-[900px] lg:max-w-[1000px] bg-linear-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] border-white/10 p-0 flex flex-col shadow-2xl">
          {/* Animated Background Gradients */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          </div>

          {/* Top Border Glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple-500/80 to-transparent" />

          {/* Sticky Header */}
          <div className="relative shrink-0 p-6 pb-0 bg-linear-to-b from-[#0a0a0a]/95 to-transparent backdrop-blur-sm z-10">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-3">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="p-2.5 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30"
                >
                  {isEditing ? (
                    <Sparkles className="h-5 w-5 text-white" />
                  ) : (
                    <Rocket className="h-5 w-5 text-white" />
                  )}
                </motion.div>
                <div>
                  <span className="text-2xl font-bold bg-linear-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                    {isEditing ? 'Edit Project' : 'Create New Project'}
                  </span>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {isEditing ? 'Update your project details' : 'Add a new project to your portfolio'}
                  </p>
                </div>
              </SheetTitle>
            </SheetHeader>

            {/* Section Navigation */}
            <div className="flex gap-2 mt-6 p-1 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              {sectionsList.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                const isCompleted = sectionStatus(section.id);
                
                return (
                  <Tooltip key={section.id}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => setActiveSection(section.id)}
                        className={`relative flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 group overflow-hidden ${
                          isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeSection"
                            className={`absolute inset-0 rounded-xl bg-linear-to-r ${section.gradient} opacity-20`}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        )}
                        <motion.div
                          animate={{ scale: isActive ? 1.1 : 1 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                          className="relative z-10"
                        >
                          <Icon className={`h-4 w-4 ${isActive ? 'text-purple-400' : 'group-hover:text-gray-400'}`} />
                        </motion.div>
                        <span className="relative z-10 hidden sm:inline text-[11px] font-medium">
                          {section.label}
                        </span>
                        {isCompleted && !isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="relative z-10"
                          >
                            <Check className="h-3 w-3 text-emerald-400" />
                          </motion.div>
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-gray-900 border-white/10 text-xs">
                      {isCompleted ? `${section.label} completed ✓` : section.label}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="mt-4 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-linear-to-r from-purple-500 via-pink-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${(sectionsList.filter(s => sectionStatus(s.id)).length / sectionsList.length) * 100}%` }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              />
            </div>

            {/* Progress Text */}
            <div className="flex justify-between items-center mt-2">
              <p className="text-[10px] text-gray-600">
                {sectionsList.filter(s => sectionStatus(s.id)).length} of {sectionsList.length} completed
              </p>
              {isEditing && (
                <p className="text-[10px] text-purple-400 flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5" />
                  Editing Mode
                </p>
              )}
            </div>
          </div>

          {/* Scrollable Form Area */}
          <div 
            ref={scrollContainerRef}
            className="relative flex-1 overflow-y-auto px-6 py-6 space-y-6 custom-scroll"
            style={{ maxHeight: 'calc(100vh - 280px)' }}
          >
            <AnimatePresence mode="wait">
              {/* Image Section */}
              {activeSection === 'image' && (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <div className="p-6 rounded-2xl bg-linear-to-br from-white/[0.03] to-transparent border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20">
                        <ImageIcon className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">Project Media</h3>
                        <p className="text-xs text-gray-500">Upload a cover image for your project</p>
                      </div>
                    </div>

                    {formData.image ? (
                      <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative group"
                      >
                        <div className="relative h-64 w-full rounded-xl overflow-hidden bg-gray-800/50 border border-white/10 ring-1 ring-white/5">
                          <Image 
                            src={formData.image} 
                            alt="Preview" 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-start p-5">
                            <Button
                              type="button"
                              size="sm"
                              variant="secondary"
                              onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white"
                            >
                              <UploadIcon className="h-3.5 w-3.5 mr-1.5" />
                              Change Image
                            </Button>
                          </div>
                        </div>
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="mt-3 flex items-center gap-2 text-xs text-emerald-400"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Image uploaded successfully
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        {...(getRootProps() as any)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 group ${
                          isDragActive
                            ? 'border-purple-500 bg-purple-500/10 scale-[1.02]'
                            : 'border-white/15 bg-white/[0.02] hover:border-purple-500/50 hover:bg-purple-500/5'
                        }`}
                      >
                        <input {...getInputProps()} />
                        
                        {uploading ? (
                          <div className="space-y-4">
                            <div className="relative mx-auto w-fit">
                              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
                              <Loader2 className="h-14 w-14 animate-spin text-purple-500 relative" />
                            </div>
                            <p className="text-sm text-gray-400 font-medium">Uploading your image...</p>
                            <div className="max-w-[250px] mx-auto h-1.5 rounded-full bg-white/5 overflow-hidden">
                              <motion.div
                                className="h-full rounded-full bg-linear-to-r from-purple-500 to-pink-500"
                                animate={{ width: ['0%', '100%'] }}
                                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            <motion.div 
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                              className="relative mx-auto w-fit mb-4"
                            >
                              <div className="p-5 rounded-2xl bg-linear-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                                <Upload className="h-12 w-12 text-purple-400" />
                              </div>
                            </motion.div>
                            <p className="text-gray-200 font-medium">
                              {isDragActive ? 'Drop it here' : 'Drop your image here'}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {isDragActive ? "We'll handle the rest" : 'or click to browse files'}
                            </p>
                            <div className="flex items-center justify-center gap-3 mt-4 text-xs text-gray-600">
                              <span className="px-2 py-1 rounded bg-white/5">PNG</span>
                              <span className="px-2 py-1 rounded bg-white/5">JPG</span>
                              <span className="px-2 py-1 rounded bg-white/5">WEBP</span>
                              <span className="px-2 py-1 rounded bg-white/5">GIF</span>
                              <span className="px-2 py-1 rounded bg-white/5">SVG</span>
                            </div>
                            <p className="text-[11px] text-gray-600 mt-3">Max file size: 10MB</p>
                          </>
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Details Section */}
              {activeSection === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="space-y-5"
                >
                  <div className="p-6 rounded-2xl bg-linear-to-br from-white/[0.03] to-transparent border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded-xl bg-linear-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20">
                        <FileText className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">Project Information</h3>
                        <p className="text-xs text-gray-500">Tell the world about your amazing project</p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      {/* Title */}
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-gray-300 text-sm font-medium flex items-center gap-2">
                          <Tag className="h-3.5 w-3.5 text-blue-400" />
                          Project Title <span className="text-red-400">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="e.g., AI-Powered Portfolio Dashboard"
                            className="bg-white/[0.03] border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all rounded-xl h-12 pl-4 pr-10"
                          />
                          {formData.title && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                              <Check className="h-4 w-4 text-emerald-400" />
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-gray-300 text-sm font-medium">
                          Description <span className="text-red-400">*</span>
                        </Label>
                        <div className="relative">
                          <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            rows={6}
                            placeholder="Describe your project's features, goals, and impact..."
                            className="bg-white/[0.03] border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all rounded-xl resize-none"
                          />
                          <div className="absolute bottom-3 right-3 text-[10px] text-gray-600 font-mono">
                            {formData.description.length} chars
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Category & Tech Section */}
              {activeSection === 'category' && (
                <motion.div
                  key="category"
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="space-y-5"
                >
                  <div className="p-6 rounded-2xl bg-linear-to-br from-white/[0.03] to-transparent border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded-xl bg-linear-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20">
                        <Layers className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">Classification</h3>
                        <p className="text-xs text-gray-500">Categorize your project and list technologies used</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Category */}
                      <div className="space-y-2 relative">
                        <Label htmlFor="category" className="text-gray-300 text-sm font-medium flex items-center gap-2">
                          <Briefcase className="h-3.5 w-3.5 text-emerald-400" />
                          Category <span className="text-red-400">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="category"
                            ref={categoryInputRef}
                            value={formData.category}
                            onChange={(e) => { 
                              setFormData(prev => ({ ...prev, category: e.target.value })); 
                              setShowCategorySuggestions(true); 
                            }}
                            onFocus={() => setShowCategorySuggestions(true)}
                            onBlur={() => setTimeout(() => setShowCategorySuggestions(false), 200)}
                            placeholder="Select or type a category..."
                            className="bg-white/[0.03] border-white/10 text-white placeholder:text-gray-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all rounded-xl h-12 pl-4"
                          />
                          <AnimatePresence>
                            {showCategorySuggestions && filteredCategorySuggestions.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 5, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                className="absolute z-20 w-full mt-1 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                              >
                                <div className="p-2.5 border-b border-white/5">
                                  <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Suggestions</p>
                                </div>
                                <div className="max-h-48 overflow-y-auto">
                                  {filteredCategorySuggestions.map((cat) => (
                                    <button
                                      key={cat}
                                      type="button"
                                      onClick={() => selectCategory(cat)}
                                      className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center justify-between group"
                                    >
                                      <span>{cat}</span>
                                      <span className="text-[10px] text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">Select</span>
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="space-y-3">
                        <Label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                          <Code className="h-3.5 w-3.5 text-emerald-400" />
                          Tech Stack <span className="text-red-400">*</span>
                        </Label>
                        
                        {/* Tech Input */}
                        <div className="relative">
                          <Input
                            ref={techInputRef}
                            value={techInput}
                            onChange={(e) => { 
                              setTechInput(e.target.value); 
                              setShowTechSuggestions(true); 
                            }}
                            onFocus={() => setShowTechSuggestions(true)}
                            onKeyDown={handleTechKeyDown}
                            placeholder="Type technology name and press Enter or comma..."
                            className="bg-white/[0.03] border-white/10 text-white placeholder:text-gray-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all rounded-xl h-12 pl-4"
                          />
                          <AnimatePresence>
                            {showTechSuggestions && filteredTechSuggestions.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 5, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                className="absolute z-20 w-full mt-1 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                              >
                                <div className="p-2.5 border-b border-white/5">
                                  <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Popular Technologies</p>
                                </div>
                                <div className="max-h-56 overflow-y-auto grid grid-cols-2 gap-0">
                                  {filteredTechSuggestions.map((tech) => (
                                    <button
                                      key={tech.name}
                                      type="button"
                                      onClick={() => addTechTag(tech.name)}
                                      className="w-full px-3 py-2.5 text-left text-xs text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center justify-between group"
                                    >
                                      <div className="flex items-center gap-2">
                                        <span style={{ color: tech.color }}>{tech.icon}</span>
                                        <span>{tech.name}</span>
                                      </div>
                                      <span className="text-[9px] text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">Add +</span>
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Tech Tags Display */}
                        <AnimatePresence>
                          {techTags.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="flex flex-wrap gap-2 p-4 bg-white/[0.02] rounded-xl border border-white/5"
                            >
                              {techTags.map((tag) => (
                                <motion.span
                                  key={tag}
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  layout
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-linear-to-r from-purple-500/10 to-pink-500/10 text-xs font-medium border border-purple-500/20 hover:from-purple-500/20 hover:to-pink-500/20 transition-all group/badge"
                                >
                                  <span 
                                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                                    style={{ backgroundColor: getTechColor(tag) }}
                                  />
                                  <span className="text-purple-300">{tag}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeTechTag(tag)}
                                    className="ml-0.5 p-0.5 rounded hover:bg-red-500/20 transition-colors"
                                  >
                                    <X className="h-2.5 w-2.5 text-gray-500 hover:text-red-400 transition-colors" />
                                  </button>
                                </motion.span>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {techTags.length === 0 && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                            <p className="text-xs text-amber-400/90">
                              * At least one technology is required - add your tech stack above
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Links Section */}
              {activeSection === 'links' && (
                <motion.div
                  key="links"
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="space-y-5"
                >
                  <div className="p-6 rounded-2xl bg-linear-to-br from-white/[0.03] to-transparent border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded-xl bg-linear-to-br from-orange-500/20 to-red-500/20 border border-orange-500/20">
                        <Link2 className="h-5 w-5 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">External Links</h3>
                        <p className="text-xs text-gray-500">Add live demo and source code links</p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      {/* Links Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="liveDemo" className="text-gray-300 text-sm font-medium flex items-center gap-2">
                            <Globe className="h-3.5 w-3.5 text-orange-400" />
                            Live Demo URL
                          </Label>
                          <Input
                            id="liveDemo"
                            type="url"
                            value={formData.liveDemo}
                            onChange={(e) => setFormData(prev => ({ ...prev, liveDemo: e.target.value }))}
                            placeholder="https://your-project-demo.com"
                            className="bg-white/[0.03] border-white/10 text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-all rounded-xl h-12 pl-4"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="github" className="text-gray-300 text-sm font-medium flex items-center gap-2">
                            <GithubIcon className="h-3.5 w-3.5 text-orange-400" />
                            GitHub URL
                          </Label>
                          <Input
                            id="github"
                            type="url"
                            value={formData.github}
                            onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                            placeholder="https://github.com/username/project"
                            className="bg-white/[0.03] border-white/10 text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-all rounded-xl h-12 pl-4"
                          />
                        </div>
                      </div>

                      {/* Featured Switch */}
                      <div className="flex items-center justify-between p-5 bg-linear-to-r from-white/[0.02] to-transparent rounded-xl border border-white/5 hover:border-purple-500/30 transition-all group">
                        <div>
                          <Label htmlFor="featured" className="text-gray-200 font-medium text-sm flex items-center gap-2">
                            <Star className="h-3.5 w-3.5 text-amber-400" />
                            Featured Project
                          </Label>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Feature this project on your portfolio homepage
                          </p>
                        </div>
                        <Switch
                          id="featured"
                          checked={formData.featured}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                          className="data-[state=checked]:bg-linear-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
                        />
                      </div>

                      {/* Info Box */}
                      <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                        <div className="flex gap-3">
                          <div className="p-1.5 rounded-lg bg-blue-500/10">
                            <Rocket className="h-4 w-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-xs text-blue-400 font-medium">Pro Tip</p>
                            <p className="text-[11px] text-gray-500 mt-0.5">
                              Adding live demo and GitHub links increases engagement and showcases your work professionally.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sticky Footer */}
          <div className="relative shrink-0 p-6 pt-4 border-t border-white/10 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent backdrop-blur-sm z-10">
            <div className="flex items-center gap-3">
              {activeSection !== 'image' && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevSection}
                    className="border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl h-11 px-5"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1.5" />
                    Back
                  </Button>
                </motion.div>
              )}

              <div className="flex-1 flex gap-3">
                {/* Preview Button */}
                {formData.title && formData.description && formData.image && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowPreviewDialog(true)}
                      className="w-full border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl h-11"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </motion.div>
                )}

                {/* Next/Submit Button */}
                {activeSection !== 'links' ? (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Button
                      type="button"
                      onClick={nextSection}
                      className="w-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25 rounded-xl h-11 text-sm font-semibold"
                    >
                      Continue
                      <ChevronLeft className="h-4 w-4 ml-1.5 rotate-180" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }} 
                    className="flex-2"
                  >
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      className="w-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30 rounded-xl h-11 text-sm font-semibold"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      {isEditing ? 'Update Project' : 'Create Project'}
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Custom Scrollbar Styles */}
          <style jsx global>{`
            .custom-scroll::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scroll::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.03);
              border-radius: 10px;
            }
            .custom-scroll::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, #a855f7, #ec4899);
              border-radius: 10px;
            }
            .custom-scroll::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, #c084fc, #f472b6);
            }
          `}</style>
        </SheetContent>
      </Sheet>

      {/* Enhanced Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-2xl w-[95vw] max-h-[85vh] overflow-y-auto bg-linear-to-br from-[#0a0a0a] to-[#0f0f0f] border-white/10 p-0 shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple-500/60 to-transparent" />
          
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-pink-600/10 rounded-full blur-3xl" />
          </div>

          <DialogHeader className="relative p-6 pb-0">
            <DialogTitle className="flex items-center gap-2 text-xl font-bold bg-linear-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              <Eye className="h-5 w-5 text-purple-400" />
              Project Preview
            </DialogTitle>
          </DialogHeader>

          <div className="relative p-6 space-y-6">
            {/* Image */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative h-52 w-full rounded-xl overflow-hidden bg-gray-800/50 border border-white/10 group"
            >
              {formData.image ? (
                <Image 
                  src={formData.image} 
                  alt={formData.title || 'Project preview'} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-600">
                  <ImageIcon className="h-12 w-12" />
                </div>
              )}
              {formData.featured && (
                <motion.div 
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="absolute top-3 right-3"
                >
                  <Badge className="bg-linear-to-r from-amber-500 to-orange-500 border-0 text-white shadow-lg shadow-amber-500/30 px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                </motion.div>
              )}
            </motion.div>

            {/* Title & Category */}
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-2xl font-bold text-white">
                {formData.title || 'Untitled Project'}
              </h3>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/5 px-3 py-1">
                  <Briefcase className="h-3 w-3 mr-1" />
                  {formData.category || 'Uncategorized'}
                </Badge>
                <span className="text-xs text-gray-600">•</span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Code className="h-3 w-3" />
                  {techTags.length} {techTags.length === 1 ? 'technology' : 'technologies'}
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-xl bg-white/[0.02] border border-white/5"
            >
              <p className="text-sm text-gray-400 leading-relaxed">
                {formData.description || 'No description provided.'}
              </p>
            </motion.div>

            {/* Tech Stack */}
            {techTags.length > 0 && (
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Code className="h-3 w-3" />
                  Technology Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {techTags.map((tech, idx) => (
                    <motion.div
                      key={tech}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + idx * 0.02 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="text-xs bg-white/[0.04] border-white/10 text-gray-300 px-3 py-1.5"
                      >
                        <span 
                          className="w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse"
                          style={{ backgroundColor: getTechColor(tech) }}
                        />
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Links */}
            {(formData.liveDemo || formData.github) && (
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Link2 className="h-3 w-3" />
                  External Links
                </p>
                <div className="flex flex-wrap gap-3">
                  {formData.liveDemo && (
                    <a
                      href={formData.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-sm text-purple-400 hover:bg-purple-500/20 transition-all group"
                    >
                      <Globe className="h-4 w-4" />
                      Live Demo
                      <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </a>
                  )}
                  {formData.github && (
                    <a
                      href={formData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-all group"
                    >
                      <GithubIcon className="h-4 w-4" />
                      Source Code
                      <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          <div className="relative p-6 pt-4 border-t border-white/10 bg-linear-to-t from-black/50 to-transparent">
            <Button
              onClick={() => setShowPreviewDialog(false)}
              className="w-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25 rounded-xl h-11"
            >
              Close Preview
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}