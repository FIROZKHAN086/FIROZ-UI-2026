'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {  Brain, Code2,  Workflow, TrendingUp, 
  ArrowRight,  Layers, Server, Terminal,
} from 'lucide-react';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, 
  SiMongodb, SiExpress, SiPostgresql, SiDocker,  SiFigma,
 SiGit,
  SiRender
} from 'react-icons/si';
import { Journey } from './Journey';
import { Methodologies } from './Methodologies';
import { lenisScrollTo } from "@/lib/scroll";

const expertiseData = {
  frontend: {
    title: 'Frontend Engineering',
    description: 'Crafting immersive, performant user experiences with modern frameworks',
    icon: <Code2 className="w-6 h-6" />,
    gradient: 'from-[#3b82f6] via-[#06b6d4] to-[#06b6d4]',
    technologies: [
      {
        name: 'React.js',
        level: 'Expert',
        experience: '3 Years',
        icon: <SiReact className="w-5 h-5" />,
        color: '#61DAFB',
        features: ['Hooks', 'Context', 'Performance', 'Testing']
      },
      {
        name: 'Next.js',
        level: 'Advanced',
        experience: '2.5 Years',
        icon: <SiNextdotjs className="w-5 h-5" />,
        color: '#000000',
        features: ['SSR/SSG', 'API Routes', 'Middleware', 'Optimizations']
      },
      {
        name: 'TypeScript',
        level: 'Advanced',
        experience: '2 Years',
        icon: <SiTypescript className="w-5 h-5" />,
        color: '#3178C6',
        features: ['Type Safety', 'Interfaces', 'Generics', 'Tooling']
      },
      {
        name: 'Tailwind CSS',
        level: 'Expert',
        experience: '3 Years',
        icon: <SiTailwindcss className="w-5 h-5" />,
        color: '#06B6D4',
        features: ['Utility First', 'Responsive', 'Customization', 'Plugins']
      }
    ]
  },
  backend: {
    title: 'Backend Development',
    description: 'Building robust, scalable server-side architectures and APIs',
    icon: <Server className="w-6 h-6" />,
    gradient: 'from-[#10b981] via-[#10b981] to-[#06b6d4]',
    technologies: [
      {
        name: 'Node.js',
        level: 'Advanced',
        experience: '3 Years',
        icon: <SiNodedotjs className="w-5 h-5" />,
        color: '#339933',
        features: ['Event Loop', 'NPM', 'Async', 'Streams']
      },
      {
        name: 'Express.js',
        level: 'Advanced',
        experience: '2.5 Years',
        icon: <SiExpress className="w-5 h-5" />,
        color: '#000000',
        features: ['Routing', 'Middleware', 'Security', 'REST APIs']
      },
      {
        name: 'MongoDB',
        level: 'Advanced',
        experience: '2 Years',
        icon: <SiMongodb className="w-5 h-5" />,
        color: '#47A248',
        features: ['Document Model', 'Aggregation', 'Indexing', 'Atlas']
      },
      {
        name: 'PostgreSQL',
        level: 'Advanced',
        experience: '1.5 Years',
        icon: <SiPostgresql className="w-5 h-5" />,
        color: '#336791',
        features: ['ACID', 'JSONB', 'Extensions', 'Performance']
      }
    ]
  },
  devops: {
    title: 'Tools & DevOps',
    description: 'Deployment, version control, and design tools',
    icon: <Terminal className="w-6 h-6" />,
    gradient: 'from-[#f59e0b] via-[#f59e0b] to-[#ea580c]',
    technologies: [
      {
        name: 'Docker',
        level: 'intermediate',
        experience: '1.5 Years',
        icon: <SiDocker className="w-5 h-5" />,
        color: '#2496ED',
        features: ['Containers', 'Images', 'Compose', 'Dockerfile']
      },
      {
        name: 'Git & GitHub',
        level: 'Advanced',
        experience: '3 Years',
        icon: <SiGit className="w-5 h-5" />,
        color: '#181717',
        features: ['CI/CD', 'Actions', 'PRs', 'Collaboration']
      },
      {
        name: 'render',
        level: 'Advanced',
        experience: '2 Years',
        icon: <SiRender className="w-5 h-5" />,
        color: '#000000',
        features: ['Edge Functions', 'Preview', 'Analytics', 'Speed']
      },
      {
        name: 'Figma',
        level: 'Intermediate',
        experience: '2 Years',
        icon: <SiFigma className="w-5 h-5" />,
        color: '#F24E1E',
        features: ['Prototyping', 'Components', 'Collaboration', 'Plugins']
      }
    ]
  }
};

type ExpertiseKey = keyof typeof expertiseData;

export default function AboutMe() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<ExpertiseKey>('frontend');
  const [hoveredTech, setHoveredTech] = useState<number | null>(null);
  const containerRef = useRef(null);
const { scrollYProgress } = useScroll();

const opacity = useTransform(
  scrollYProgress,
  [0, 0.15],
  [1, 1]
);

const scale = useTransform(
  scrollYProgress,
  [0, 0.2],
  [0.9, 1]
);

const smoothScale = useSpring(scale, {
  stiffness: 120,
  damping: 25,
});

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const scrollToContact = () => {
    lenisScrollTo('#contact');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" as const } 
    }
  };



  return (
    <section
      ref={containerRef}
      id="aboutt"
      className="relative min-h-screen py-4  md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-[#0a0a0a] transition-colors duration-500"
    >
    
      <motion.div 
      
        style={{ opacity, scale: smoothScale }}
        className="max-w-7xl mx-auto mt-0 relative z-10"
      >
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px",  }}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-[#a78bfa]/50" />
            <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#a78bfa]/10 text-[#a78bfa] border border-[#a78bfa]/20">
              Personal Profile
            </span>
            <span className="h-px w-8 bg-[#a78bfa]/50" />
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-slate-900 dark:text-[#faf8f0] tracking-tight"
          >
            Passionate About <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#a78bfa] via-[#ec4899] to-[#3b82f6] animate-linear-x bg-size-[200%_auto]">
              Digital Craftsmanship
            </span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 dark:text-[#faf8f0]/60 max-w-3xl mx-auto leading-relaxed"
          >
            I'm a full-stack developer who loves turning complex problems into simple, beautiful, and intuitive digital experiences. With a focus on performance and scalability.
          </motion.p>
        </motion.div>

      

        {/* Content Tabs: Philosophy & Expertise */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-16 lg:mb-32">
          {/* Philosophy Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-linear-to-b from-[#a78bfa] to-transparent rounded-full" />
              <h3 className="text-3xl font-bold text-slate-900 dark:text-[#faf8f0] mb-6 pl-4">My Philosophy</h3>
              <p className="text-lg text-slate-600 dark:text-[#faf8f0]/70 leading-relaxed mb-8">
                I believe that great software isn't just about code—it's about empathy, clarity, and continuous improvement. Every line I write is aimed at making someone's digital life easier.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                { title: 'User-Centric', desc: 'Putting the user at the heart of every decision.', icon: <Brain className="text-[#a78bfa]" /> },
                { title: 'Scalable Architecture', desc: 'Building for today with tomorrow in mind.', icon: <Layers className="text-[#3b82f6]" /> },
                { title: 'Clean & Efficient', desc: 'Writing code that is as beautiful as the UI.', icon: <Code2 className="text-[#10b981]" /> },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10 }}
                  className="flex gap-6 p-6 rounded-3xl bg-slate-50 dark:bg-[#111111]/30 border border-slate-200 dark:border-white/5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#1a1a1a] flex items-center justify-center shadow-md shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-[#faf8f0] mb-2">{item.title}</h4>
                    <p className="text-slate-600 dark:text-[#faf8f0]/50 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/*
           Expertise Tabs 
          */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 dark:bg-[#111111]/50 p-4 sm:p-8 rounded-4xl border border-slate-200 dark:border-white/5 backdrop-blur-xl"
          >
            <div className="flex flex-wrap gap-2 mb-10">
              {(Object.keys(expertiseData) as ExpertiseKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                    activeCategory === key
                      ? 'bg-linear-to-r from-[#a78bfa] to-[#ec4899] text-white shadow-lg'
                      : 'bg-white dark:bg-[#1a1a1a] text-slate-600 dark:text-[#faf8f0]/50 hover:text-[#a78bfa]'
                  }`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="mb-8">
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-[#faf8f0] mb-2">{expertiseData[activeCategory].title}</h4>
                  <p className="text-slate-500 dark:text-[#faf8f0]/40">{expertiseData[activeCategory].description}</p>
                </div>

                <div className="grid gap-4">
                  {expertiseData[activeCategory].technologies.map((tech, i) => (
                    <motion.div
                      key={tech.name}
                      onMouseEnter={() => setHoveredTech(i)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className="p-5 rounded-2xl bg-white dark:bg-[#0a0a0a]/50 border border-slate-200 dark:border-white/5 group hover:border-[#a78bfa]/50 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-inner" style={{ background: tech.color }}>
                            {tech.icon}
                          </div>
                          <div>
                            <h5 className="font-bold text-slate-900 dark:text-[#faf8f0]">{tech.name}</h5>
                            <span className="text-xs text-slate-400 font-medium uppercase tracking-tighter">{tech.level}</span>
                          </div>
                        </div>
                      
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {tech.features.map(f => (
                          <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#1a1a1a] text-slate-500 dark:text-[#faf8f0]/30 font-bold border border-slate-200 dark:border-white/5">
                            {f}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

       { /*
|--------------------------------------------------------------------------
| Methodologies & Journey Sections
|--------------------------------------------------------------------------
*/ }
        <div className="space-y-16 lg:space-y-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-4 mb-16">
              <div className="w-12 h-12 rounded-2xl bg-[#10b981]/20 flex items-center justify-center">
                <Workflow className="text-[#10b981]" />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 dark:text-[#faf8f0]">Workflow</h3>
            </div>
            <Methodologies />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-4 mb-16">
              <div className="w-12 h-12 rounded-2xl bg-[#a78bfa]/20 flex items-center justify-center">
                <TrendingUp className="text-[#a78bfa]" />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 dark:text-[#faf8f0]">The Journey</h3>
            </div>
            <Journey />
          </motion.div>
        </div>

        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 hidden md:block text-center"
        >
          <div className="relative inline-block px-6 sm:px-12 py-10 sm:py-16 rounded-[2rem] sm:rounded-[3rem] bg-slate-900 dark:bg-white overflow-hidden shadow-2xl">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #a78bfa 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }} />
            
            <h3 className="text-3xl md:text-5xl font-extrabold text-white dark:text-slate-900 mb-8 relative z-10">
              Ready to create something <br />
              <span className="text-[#a78bfa]">extraordinary?</span>
            </h3>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="px-10 py-4 rounded-2xl font-bold text-lg bg-[#a78bfa] text-white hover:bg-[#ec4899] transition-all duration-300 flex items-center justify-center gap-3 mx-auto shadow-xl relative z-10"
            >
              Start Collaboration
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 5s ease infinite;
        }
      `}</style>
    </section>
  );
}
