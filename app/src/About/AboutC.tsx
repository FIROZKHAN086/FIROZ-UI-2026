'use client';

import React, { JSX, useEffect,  useRef,  useState } from 'react';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Rocket,
  ChevronRight,
  Target,
  TrendingUp,
  Zap,
  Sparkles,
  Code2,
  Server,
  Terminal,
  GitBranch,
  Palette,
  Globe,
  Layers,
  Database,
  Cpu,
  Shield,
  Clock,
  Users,
  Braces,
  TerminalSquare,
  Code,
  FileCode,
  GitPullRequest,
  Monitor,
  Smartphone,
  Cloud,
  DatabaseZap,
  Workflow,
  LayoutDashboard,
  Fingerprint,
  ShieldCheck,
  Lock,
  Cpu as CpuIcon,
  Award,
  Lightbulb,
  Users as UsersIcon,
  BarChart,
  Puzzle,
  Brain,
  Target as TargetIcon,
  ArrowRight,
  Star,
  Sparkle,
  Zap as ZapIcon,
  TrendingUp as TrendingUpIcon,
  Layers as LayersIcon,
  Briefcase,
  UserCheck,
  Heart,
  Compass,
  Bot
} from 'lucide-react';
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiVercel,
  SiNetlify,
  SiFigma,
  SiPostman,
  SiGithub,
  SiPrisma,
  SiGraphql,
  SiDocker,
  SiRedux,
  SiSocketdotio,
  SiStripe,
  SiExpress,
  SiJavascript,
  SiPython,
  SiGit,
  SiNotion,
  SiDiscord,
  SiSlack,
  SiJest
} from 'react-icons/si';
import { BiLogoVisualStudio } from "react-icons/bi";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
        description: 'Building interactive UIs with modern patterns & hooks',
        projects: '30+ Projects',
        icon: <SiReact className="w-5 h-5" />,
        color: '#61DAFB',
        category: 'Library',
        features: ['Hooks', 'Context', 'Performance', 'Testing']
      },
      {
        name: 'Next.js',
        level: 'Advanced',
        experience: '2.5 Years',
        description: 'Full-stack framework with SSR, SSG, and App Router',
        projects: '25+ Projects',
        icon: <SiNextdotjs className="w-5 h-5" />,
        color: '#000000',
        category: 'Framework',
        features: ['SSR/SSG', 'API Routes', 'Middleware', 'Optimizations']
      },
      {
        name: 'TypeScript',
        level: 'Advanced',
        experience: '2 Years',
        description: 'Type-safe JavaScript for scalable applications',
        projects: '20+ Projects',
        icon: <SiTypescript className="w-5 h-5" />,
        color: '#3178C6',
        category: 'Language',
        features: ['Type Safety', 'Interfaces', 'Generics', 'Tooling']
      },
      {
        name: 'Tailwind CSS',
        level: 'Expert',
        experience: '3 Years',
        description: 'Utility-first CSS framework for rapid UI development',
        projects: '40+ Projects',
        icon: <SiTailwindcss className="w-5 h-5" />,
        color: '#06B6D4',
        category: 'CSS Framework',
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
        description: 'JavaScript runtime for scalable network applications',
        projects: '25+ Projects',
        icon: <SiNodedotjs className="w-5 h-5" />,
        color: '#339933',
        category: 'Runtime',
        features: ['Event Loop', 'NPM', 'Async', 'Streams']
      },
      {
        name: 'Express.js',
        level: 'Advanced',
        experience: '2.5 Years',
        description: 'Fast, unopinionated web framework for Node.js',
        projects: '20+ Projects',
        icon: <SiExpress className="w-5 h-5" />,
        color: '#000000',
        category: 'Framework',
        features: ['Routing', 'Middleware', 'Security', 'REST APIs']
      },
      {
        name: 'MongoDB',
        level: 'Intermediate',
        experience: '2 Years',
        description: 'NoSQL database for modern applications',
        projects: '15+ Projects',
        icon: <SiMongodb className="w-5 h-5" />,
        color: '#47A248',
        category: 'Database',
        features: ['Document Model', 'Aggregation', 'Indexing', 'Atlas']
      },
      {
        name: 'PostgreSQL',
        level: 'Intermediate',
        experience: '1.5 Years',
        description: 'Powerful open-source relational database',
        projects: '12+ Projects',
        icon: <SiPostgresql className="w-5 h-5" />,
        color: '#336791',
        category: 'Database',
        features: ['ACID', 'JSONB', 'Extensions', 'Performance']
      }
    ]
  },
  devops: {
    title: 'DevOps & Tools',
    description: 'Development workflow, deployment, and collaboration tools',
    icon: <Terminal className="w-6 h-6" />,
    gradient: 'from-[#f59e0b] via-[#f59e0b] to-[#ea580c]',
    technologies: [
      {
        name: 'Docker',
        level: 'Intermediate',
        experience: '1.5 Years',
        description: 'Containerization platform for consistent environments',
        projects: '10+ Projects',
        icon: <SiDocker className="w-5 h-5" />,
        color: '#2496ED',
        category: 'Container',
        features: ['Containers', 'Images', 'Compose', 'Dockerfile']
      },
      {
        name: 'Git & GitHub',
        level: 'Expert',
        experience: '3 Years',
        description: 'Version control and collaborative development',
        projects: 'All Projects',
        icon: <SiGithub className="w-5 h-5" />,
        color: '#181717',
        category: 'Version Control',
        features: ['CI/CD', 'Actions', 'PRs', 'Collaboration']
      },
      {
        name: 'Vercel',
        level: 'Advanced',
        experience: '2 Years',
        description: 'Cloud platform for static sites and Serverless Functions',
        projects: '20+ Projects',
        icon: <SiVercel className="w-5 h-5" />,
        color: '#000000',
        category: 'Deployment',
        features: ['Edge Functions', 'Preview', 'Analytics', 'Speed']
      },
      {
        name: 'Figma',
        level: 'Intermediate',
        experience: '2 Years',
        description: 'Design and prototyping tool for UI/UX',
        projects: '15+ Projects',
        icon: <SiFigma className="w-5 h-5" />,
        color: '#F24E1E',
        category: 'Design',
        features: ['Prototyping', 'Components', 'Collaboration', 'Plugins']
      }
    ]
  }
};

type ExpertiseKey = keyof typeof expertiseData;

export const AboutC = () => {
  const [activeCategory, setActiveCategory] = useState<ExpertiseKey>('frontend');
  const [hoveredTech, setHoveredTech] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    const ctx = gsap.context(() => {
      gsap.from('.section-title', {
        scrollTrigger: {
          trigger: '.section-title',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
      });

      gsap.from('.stat-item', {
        scrollTrigger: {
          trigger: '.stats-container',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out'
      });

      gsap.from('.tech-card', {
        scrollTrigger: {
          trigger: '.tech-cards',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out'
      });
    });

    return () => ctx.revert();
  }, []);

  if (!mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const floatVariants = {
    initial: { y: 0 },
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  };

  const rotateVariants = {
    initial: { rotate: 0 },
    rotate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  const stats = [
    {
      label: 'Projects Delivered',
      value: '50+',
      icon: <Target className="w-5 h-5" />,
      gradient: 'from-[#a78bfa] to-[#ec4899]',
      suffix: 'Successfully',
      description: 'From MVPs to enterprise solutions'
    },
    {
      label: 'Years Experience',
      value: '3+',
      icon: <TrendingUp className="w-5 h-5" />,
      gradient: 'from-[#a78bfa] to-[#ec4899]',
      suffix: 'Professional',
      description: 'Building modern web applications'
    },
    {
      label: 'Technologies',
      value: '25+',
      icon: <Zap className="w-5 h-5" />,
      gradient: 'from-[#10b981] to-[#06b6d4]',
      suffix: 'Mastered',
      description: 'Modern stack expertise'
    },
    {
      label: 'Client Satisfaction',
      value: '100%',
      icon: <Star className="w-5 h-5" />,
      gradient: 'from-[#f59e0b] to-[#ef4444]',
      suffix: 'Happy Clients',
      description: 'Positive feedback & retention'
    },
  ];

  const principles = [
    {
      icon: <Code className="w-5 h-5" />,
      title: 'Clean Code',
      description: 'Writing maintainable, efficient, and well-documented code following best practices',
      gradient: 'from-[#3b82f6] to-[#06b6d4]',
      points: ['DRY Principle', 'SOLID Principles', 'Readability', 'Documentation']
    },
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      title: 'User Experience',
      description: 'Creating intuitive, accessible, and engaging interfaces that users love',
      gradient: 'from-[#a78bfa] to-[#ec4899]',
      points: ['Accessibility', 'Responsive', 'Performance', 'Intuitive']
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: 'Security First',
      description: 'Implementing robust security measures to protect applications and data',
      gradient: 'from-[#10b981] to-[#06b6d4]',
      points: ['Authentication', 'Authorization', 'Encryption', 'Validation']
    },
    {
      icon: <ZapIcon className="w-5 h-5" />,
      title: 'Performance',
      description: 'Optimizing for speed, efficiency, and optimal resource utilization',
      gradient: 'from-[#f59e0b] to-[#ea580c]',
      points: ['Lazy Loading', 'Caching', 'Optimization', 'Monitoring']
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery',
      description: 'Understanding requirements, goals, and target audience',
      icon: <Compass className="w-5 h-5" />
    },
    {
      step: '02',
      title: 'Strategy',
      description: 'Planning architecture, technology stack, and development approach',
      icon: <Brain className="w-5 h-5" />
    },
    {
      step: '03',
      title: 'Development',
      description: 'Building robust, scalable solutions with clean code and best practices',
      icon: <Code className="w-5 h-5" />
    },
    {
      step: '04',
      title: 'Launch & Support',
      description: 'Deploying, monitoring, and providing ongoing maintenance',
      icon: <Rocket className="w-5 h-5" />
    }
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          variants={floatVariants}
          animate="float"
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{
            background: 'linear-gradient(135deg, #a78bfa, #ec4899)'
          }}
        />
        <motion.div
          variants={floatVariants}
          animate="float"
          transition={{ delay: 1 }}
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{
            background: 'linear-gradient(135deg, #10b981, #3b82f6)'
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(90deg, #faf8f0 1px, transparent 1px),
                              linear-gradient(#faf8f0 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        {/* Floating Tech Icons */}
        {[SiReact, SiNextdotjs, SiTypescript, SiTailwindcss].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-[#faf8f0]/5"
            initial={{
              x: Math.random() * 80 + 'vw',
              y: Math.random() * 80 + 'vh',
              rotate: Math.random() * 360
            }}
            animate={{
              x: [null, Math.random() * 100 + 'vw'],
              y: [null, Math.random() * 100 + 'vh'],
              rotate: [null, 360]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            <Icon className="w-24 h-24" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-24"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className="w-8 h-px bg-linear-to-r from-transparent via-[#faf8f0]/30 to-transparent" />
            <div className="px-4 py-2 rounded-full text-sm font-medium tracking-widest uppercase glass text-[#a78bfa] border-[#a78bfa]/30">
              <Sparkles className="inline-block w-4 h-4 mr-2" />
              About Me
            </div>
            <div className="w-8 h-px bg-linear-to-r from-transparent via-[#faf8f0]/30 to-transparent" />
          </motion.div>

          {/* Title */}
          <h1 className="section-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-[#faf8f0]">
              Crafting Digital
            </span>
            <span className="block mt-2">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#a78bfa] via-[#ec4899] to-[#a78bfa] animate-gradient-x">
                Masterpieces
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto text-[#faf8f0]/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Transforming complex challenges into elegant, high-performance digital solutions through
            innovative technology, meticulous design, and strategic thinking.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div
                className="p-6 rounded-2xl backdrop-blur-xl border bg-[#111111]/50 border-[#faf8f0]/10"
              >
                <div
                  className={`inline-flex p-3 rounded-full mb-4 bg-linear-to-br ${stat.gradient}`}
                >
                  <div className="text-[#0a0a0a]">{stat.icon}</div>
                </div>

                <div
                  className="text-3xl font-bold mb-1 text-[#faf8f0]"
                >
                  {stat.value}
                </div>

                <div
                  className="text-sm font-semibold mb-1 text-[#faf8f0]/80"
                >
                  {stat.label}
                </div>

                <div
                  className="text-xs text-[#faf8f0]/60"
                >
                  {stat.description}
                </div>
              </div>

              <div
                className="absolute inset-0 rounded-2xl bg-linear-to-br from-transparent via-transparent to-[#faf8f0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Journey & Principles */}
          <div>
            {/* Journey Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="mb-12 rounded-3xl p-8 glass"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-linear-to-br from-[#a78bfa] to-[#ec4899] shadow-lg">
                  <Rocket className="w-7 h-7 text-[#0a0a0a]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-[#faf8f0]">
                    My Development Journey
                  </h3>
                  <p className="text-sm text-[#faf8f0]/60">
                    From passion to craftsmanship
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: '🚀',
                    title: 'Passion-Driven Start',
                    description: 'Began with HTML/CSS fundamentals, evolved through JavaScript mastery to modern frameworks like React and Next.js'
                  },
                  {
                    icon: '💡',
                    title: 'Problem-Solving Focus',
                    description: 'Specialized in transforming complex business requirements into elegant technical solutions with scalable architecture'
                  },
                  {
                    icon: '📈',
                    title: 'Continuous Evolution',
                    description: 'Constantly learning and adapting to new technologies while maintaining excellence in core web development principles'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex gap-4 p-4 rounded-xl bg-[#111111]/50 border border-[#faf8f0]/10"
                  >
                    <div className="text-2xl p-3 rounded-lg bg-[#111111]">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-[#faf8f0]/90">
                        {item.title}
                      </h4>
                      <p className="text-sm text-[#faf8f0]/60">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Development Process */}
              <div className="mt-10">
                <h4 className="text-lg font-bold mb-6 text-[#faf8f0]">
                  Development Process
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="p-4 rounded-xl border bg-[#111111]/50 border-[#faf8f0]/10"
                    >
                      <div className="text-sm font-bold mb-2 text-[#a78bfa]">
                        {step.step}
                      </div>
                      <div className="flex items-center gap-2 mb-2 text-[#faf8f0]/80">
                        {step.icon}
                        <span className="font-bold">{step.title}</span>
                      </div>
                      <p className="text-xs text-[#faf8f0]/60">
                        {step.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Principles Grid */}
            <div className="grid grid-cols-2 gap-4">
              {principles.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-4 rounded-xl glass"
                >
                  <div className={`inline-flex p-2 rounded-lg bg-linear-to-br ${principle.gradient} mb-3`}>
                    <div className="text-[#0a0a0a]">{principle.icon}</div>
                  </div>
                  <h5 className="font-bold text-sm mb-1 text-[#faf8f0]">
                    {principle.title}
                  </h5>
                  <p className="text-xs mb-3 text-[#faf8f0]/60">
                    {principle.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {principle.points.map((point, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-full text-xs bg-[#111111] text-[#faf8f0]/70"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Tech Stack */}
          <div>
            {/* Tech Stack Header */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-linear-to-br from-[#a78bfa] to-[#ec4899]">
                  <Cpu className="w-6 h-6 text-[#0a0a0a]" />
                </div>
                <div
                  id='skill'>
                  <h3 className="text-3xl font-bold mb-2 text-[#faf8f0]">
                    Tech Stack
                  </h3>
                  <p className="text-lg text-[#faf8f0]/60">
                    Technologies & tools I work with daily
                  </p>
                </div>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {Object.entries(expertiseData).map(([key, category]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(key as ExpertiseKey)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === key
                      ? `bg-linear-to-r ${category.gradient} text-[#0a0a0a] shadow-lg`
                      : 'bg-[#111111]/50 text-[#faf8f0]/70 hover:bg-[#111111]/80 border border-[#faf8f0]/10'
                  }`}
                >
                  {category.icon}
                  <span className="capitalize">{key}</span>
                </motion.button>
              ))}
            </div>

            {/* Active Category Technologies */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="tech-cards mb-10"
              >
                <div className="rounded-3xl p-8 glass">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-4 rounded-2xl bg-linear-to-r ${expertiseData[activeCategory].gradient} shadow-xl`}>
                      <div className="text-[#0a0a0a]">
                        {expertiseData[activeCategory].icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold mb-2 text-[#faf8f0]">
                        {expertiseData[activeCategory].title}
                      </h4>
                      <p className="text-sm text-[#faf8f0]/60">
                        {expertiseData[activeCategory].description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {expertiseData[activeCategory].technologies.map((tech, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                        onMouseEnter={() => setHoveredTech(index as any)}
                        onMouseLeave={() => setHoveredTech(null)}
                        className="tech-card rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 cursor-pointer bg-linear-to-br from-[#111111]/50 to-[#0a0a0a]/30 border-[#faf8f0]/10 hover:border-[#faf8f0]/20"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div
                              className="p-3 rounded-xl shadow-lg"
                              style={{ background: tech.color }}
                            >
                              <div className="text-[#0a0a0a]">
                                {tech.icon}
                              </div>
                            </div>
                            <div>
                              <h5 className="font-bold text-lg mb-1 text-[#faf8f0]">
                                {tech.name}
                              </h5>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-1 rounded-full text-xs font-bold bg-[#111111] text-[#faf8f0]/70">
                                  {tech.category}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                  tech.level === 'Expert'
                                    ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30'
                                    : tech.level === 'Advanced'
                                    ? 'bg-[#3b82f6]/20 text-[#3b82f6] border border-[#3b82f6]/30'
                                    : 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30'
                                }`}>
                                  {tech.level}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm font-bold text-[#faf8f0]/60">
                            {tech.experience}
                          </div>
                        </div>
                        
                        <p className="text-sm mb-4 text-[#faf8f0]/60">
                          {tech.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tech.features.map((feature, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 rounded-full text-xs bg-[#111111] text-[#faf8f0]/70"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold px-3 py-1 rounded-full bg-[#111111] text-[#faf8f0]/70">
                            {tech.projects}
                          </div>
                          <ChevronRight className={`w-4 h-4 transition-transform ${
                            hoveredTech === index ? 'translate-x-1' : ''
                          } text-[#faf8f0]/40`} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Category Switch */}
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(expertiseData).map(([key, category]) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(key as ExpertiseKey)}
                  className={`p-4 rounded-xl backdrop-blur-sm border text-center cursor-pointer transition-all duration-300 ${
                    activeCategory === key
                      ? `bg-linear-to-r ${category.gradient} text-[#0a0a0a] shadow-xl`
                      : 'bg-[#111111]/60 border-[#faf8f0]/10 hover:bg-[#111111]/80'
                  }`}
                >
                  <div className={`p-3 rounded-lg mb-3 inline-flex ${
                    activeCategory === key
                      ? 'bg-[#0a0a0a]/20'
                      : `bg-linear-to-r ${category.gradient}`
                  }`}>
                    <div className={activeCategory === key ? 'text-[#0a0a0a]' : 'text-[#0a0a0a]'}>
                      {category.icon}
                    </div>
                  </div>
                  <div className={`text-sm font-bold ${
                    activeCategory === key
                      ? 'text-[#0a0a0a]'
                      : 'text-[#faf8f0]/70'
                  }`}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass mb-6">
            <Sparkles className="w-5 h-5 text-[#a78bfa]" />
            <span className="text-sm font-bold text-[#a78bfa]">
              Ready to Collaborate?
            </span>
          </div>
          
          <h3 className="text-3xl font-bold mb-6 text-[#faf8f0]">
            Let's Build Something{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#a78bfa] to-[#ec4899]">
              Amazing Together
            </span>
          </h3>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const section = document.getElementById('Contact');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-10 py-4 rounded-2xl font-bold text-lg text-[#0a0a0a] transition-all duration-300 flex items-center justify-center gap-3 mx-auto relative overflow-hidden bg-linear-to-r from-[#a78bfa] to-[#ec4899] shadow-lg shadow-[#a78bfa]/30"
          >
            <span className="relative z-10">Start a Project</span>
            <ArrowRight className="w-5 h-5 relative z-10" />
          </motion.button>
        </motion.div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 5s ease infinite;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Selection styles */
        ::selection {
          background: rgba(167, 139, 250, 0.3);
          color: #faf8f0;
        }
      `}</style>
    </section>
  );
};
