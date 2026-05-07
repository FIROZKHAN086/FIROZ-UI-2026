'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Palette, Layout, Cloud, CheckCircle, 
  Sparkles, Rocket, Zap, TrendingUp, Code2,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

type Methodology = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  bgGradient: string;
  level: string;
  levelColor: string;
  progress: number;
  points: { name: string; level: string; learned: boolean }[];
  futureTopics: { name: string; priority: string; eta: string }[];
};

const methodologies : Methodology[] = [
  {
    id: 'design',
    title: 'UI/UX Design',
    shortTitle: 'Design',
    description: 'Creating intuitive and engaging user experiences',
    icon: <Palette className="w-6 h-6" />,
    gradient: 'from-[#a78bfa] via-[#ec4899] to-[#a78bfa]',
    bgGradient: 'from-purple-500/10 via-pink-500/10 to-purple-500/10',
    level: 'Advanced',
    levelColor: 'from-purple-500 to-pink-500',
    progress: 95,
    points: [
      { name: 'Responsive Design Principles', level: 'Expert', learned: true },
      { name: 'Wireframing & Prototyping', level: 'Advanced', learned: true },
      { name: 'Design Systems', level: 'Advanced', learned: true },
      { name: 'Accessibility (WCAG)', level: 'Intermediate', learned: true },
      { name: 'User Research & Testing', level: 'Intermediate', learned: true }
    ],
    futureTopics: [
      { name: 'Micro-interactions', priority: 'High', eta: 'Q1 2024' },
      { name: '3D Design Integration', priority: 'Medium', eta: 'Q2 2024' },
      { name: 'Voice UI Design', priority: 'Low', eta: 'Q3 2024' }
    ],
  },
  {
    id: 'development',
    title: 'Development Approach',
    shortTitle: 'Dev',
    description: 'Methodology for building scalable applications',
    icon: <Layout className="w-6 h-6" />,
    gradient: 'from-[#3b82f6] via-[#06b6d4] to-[#3b82f6]',
    bgGradient: 'from-blue-500/10 via-cyan-500/10 to-blue-500/10',
    level: 'Advanced',
    levelColor: 'from-blue-500 to-cyan-500',
    progress: 90,
    points: [
      { name: 'Mobile-First Development', level: 'Expert', learned: true },
      { name: 'Component-Based Architecture', level: 'Advanced', learned: true },
      { name: 'Clean Code Principles', level: 'Advanced', learned: true },
      { name: 'Test-Driven Development', level: 'Intermediate', learned: true },
      { name: 'Performance Optimization', level: 'Advanced', learned: true }
    ],
    futureTopics: [
      { name: 'WebAssembly Integration', priority: 'High', eta: 'Q1 2024' },
      { name: 'Micro-frontends', priority: 'Medium', eta: 'Q2 2024' },
      { name: 'Edge Computing', priority: 'Low', eta: 'Q3 2024' }
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Deployment',
    shortTitle: 'Ops',
    description: 'Deployment and continuous integration practices',
    icon: <Cloud className="w-6 h-6" />,
    gradient: 'from-[#10b981] via-[#06b6d4] to-[#10b981]',
    bgGradient: 'from-emerald-500/10 via-teal-500/10 to-emerald-500/10',
    level: 'Intermediate',
    levelColor: 'from-emerald-500 to-teal-500',
    progress: 85,
    points: [
      { name: 'CI/CD Pipelines', level: 'Intermediate', learned: true },
      { name: 'Cloud Deployment', level: 'Intermediate', learned: true },
      { name: 'Docker Containerization', level: 'Intermediate', learned: true },
      { name: 'Performance Monitoring', level: 'Intermediate', learned: true },
      { name: 'Security Best Practices', level: 'Intermediate', learned: true }
    ],
    futureTopics: [
      { name: 'Kubernetes Orchestration', priority: 'High', eta: 'Q1 2024' },
      { name: 'Infrastructure as Code', priority: 'High', eta: 'Q1 2024' },
      { name: 'Serverless Architecture', priority: 'Medium', eta: 'Q2 2024' }
    ],
  }
];

type Level = "Beginner" | "Intermediate" | "Advanced" | "Expert";

const colors: Record<Level, string> = {
  Beginner: "from-emerald-500 to-green-500",
  Intermediate: "from-blue-500 to-cyan-500",
  Advanced: "from-orange-500 to-amber-500",
  Expert: "from-purple-500 to-pink-500",
};

const SkillLevelBadge = ({
  level,
  colorGradient,
}: {
  level: Level;
  colorGradient: string;
}) => {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r ${
        colors[level] || colorGradient
      } text-white shadow-lg`}
    >
      {level}
    </motion.span>
  );
};

type Priority = "High" | "Medium" | "Low";

const colorsPriority: Record<Priority, string> = {
  High: 'from-red-500 to-orange-500',
  Medium: 'from-yellow-500 to-amber-500',
  Low: 'from-green-500 to-emerald-500'
};

const PriorityBadge = ({ priority }: { priority: Priority }) => {
  return (
    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold bg-gradient-to-r ${colorsPriority[priority]} text-white`}>
      {priority}
    </span>
  );
};

const Card = ({ method, index, isExpanded, onToggle }: { method: Methodology; index: number; isExpanded: boolean; onToggle: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: false, amount: 0.3 }}
      whileHover={{ y: -8 }}
      className="relative rounded-3xl overflow-hidden backdrop-blur-xl border bg-gradient-to-br dark:from-[#111111]/80 dark:to-[#0a0a0a]/80 from-white/80 to-gray-50/80 dark:border-white/10 border-gray-200 shadow-2xl"
    >
      {/* Animated Background Gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${method.bgGradient} opacity-0`}
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Glowing Border Effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="relative p-6 md:p-8">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className={`p-4 rounded-2xl bg-gradient-to-br ${method.gradient} shadow-lg`}
            >
              <div className="text-white">
                {method.icon}
              </div>
            </motion.div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-[#faf8f0]">
                  {method.title}
                </h3>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative group"
                >
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {method.level} Level
                  </div>
                </motion.div>
              </div>
              <p className="text-sm text-gray-500 dark:text-[#faf8f0]/60">
                {method.description}
              </p>
            </div>
          </div>
          
          {/* Level Progress Ring */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative w-16 h-16"
          >
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-gray-200 dark:text-white/10"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                stroke="url(#grad)"
                strokeWidth="4"
                fill="none"
                initial={{ strokeDasharray: 175.9, strokeDashoffset: 175.9 }}
                whileInView={{ strokeDashoffset: 175.9 * (1 - method.progress / 100) }}
                transition={{ duration: 1.5, delay: index * 0.2 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-900 dark:text-white">
                {method.progress}%
              </span>
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Core Competencies
            </h4>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 'auto' }}
              transition={{ duration: 0.5 }}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r ${method.levelColor} text-white`}
            >
              {method.level}
            </motion.span>
          </div>
          <div className="space-y-2">
            {method.points.map((point: any, pointIndex: number) => (
              <motion.div
                key={pointIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: pointIndex * 0.05 }}
                viewport={{ once: false }}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-2 flex-1">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    className="p-0.5 rounded-full bg-gradient-to-br from-[#10b981] to-[#06b6d4]"
                  >
                    <CheckCircle className="w-3 h-3 text-white" />
                  </motion.div>
                  <span className="text-sm text-gray-600 dark:text-[#faf8f0]/70 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {point.name}
                  </span>
                </div>
                <SkillLevelBadge level={point.level} colorGradient={method.levelColor} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Learning Section */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                Learning Roadmap
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                >
                  COMING SOON
                </motion.span>
              </h4>
              <motion.button
                whileHover={{ scale: 0.95 }}
                onClick={onToggle}
                className="text-xs text-blue-500 hover:text-blue-600"
              >
                Show Less
              </motion.button>
            </div>
            
            <div className="space-y-3">
              {method.futureTopics.map((topic: any, topicIndex: number) => (
                <motion.div
                  key={topicIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: topicIndex * 0.1 }}
                  className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-white/50 to-transparent dark:from-white/5"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs text-gray-700 dark:text-white/80">{topic.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PriorityBadge priority={topic.priority} />
                    <span className="text-[9px] text-gray-400">{topic.eta}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Expand/Collapse Button */}
        {!isExpanded && (
          <motion.button
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggle}
            className="w-full mt-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-white/10 dark:to-white/5 text-gray-700 dark:text-white/80 hover:shadow-lg transition-all"
          >
            🔮 Explore Future Learning Path
          </motion.button>
        )}

        {/* Decorative Elements */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl" />
      </div>
    </motion.div>
  );
};

// Mobile Carousel Component
const MobileCarousel = ({ methodologies, expandedCard, setExpandedCard }: { 
  methodologies: Methodology[]; 
  expandedCard: number | null; 
  setExpandedCard: (index: number | null) => void;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {methodologies.map((method, index) => (
            <div key={method.id} className="flex-[0_0_85%] min-w-0 px-2 sm:flex-[0_0_70%] md:flex-[0_0_60%]">
              <Card
                method={method}
                index={index}
                isExpanded={expandedCard === index}
                onToggle={() => setExpandedCard(expandedCard === index ? null : index)}
              />
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
      <div className="flex justify-center gap-2 mt-8">
        {scrollSnaps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi && emblaApi.scrollTo(idx)}
            className={`transition-all duration-300 ${
              idx === selectedIndex
                ? 'w-8 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full'
                : 'w-2 h-2 bg-purple-500/30 rounded-full hover:bg-purple-500/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export const Methodologies = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none"
      />
      
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="text-center mb-12"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2,  ease: "linear" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm mb-4"
        >
          <TrendingUp className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
            Continuous Learning Journey
          </span>
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent">
          Methodology & Future Skills
        </h2>
        <p className="text-gray-600 dark:text-white/60 max-w-2xl mx-auto">
          My approach to building exceptional digital experiences, constantly evolving with industry trends
        </p>
      </motion.div>

      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="gradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Responsive Layout */}
      {isMobile ? (
        <MobileCarousel 
          methodologies={methodologies}
          expandedCard={expandedCard}
          setExpandedCard={setExpandedCard}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {methodologies.map((method, index) => (
            <Card
              key={method.id}
              method={method}
              index={index}
              isExpanded={expandedCard === index}
              onToggle={() => setExpandedCard(expandedCard === index ? null : index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};