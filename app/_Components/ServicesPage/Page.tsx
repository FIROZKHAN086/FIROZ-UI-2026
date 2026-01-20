"use client";

import React, { JSX, useEffect,  useRef,  useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform, animate, useInView, easeOut, easeInOut,  spring } from "framer-motion";
import { 
  Code, 
  Server, 
  Palette, 
  Cloud, 
  Search, 
  Smartphone,
  ArrowRight,
  X,
  Zap,
  Sparkles,
  CheckCircle,
  Layers,
  Cpu,
  Rocket,
  Globe,
  Shield,
  Terminal,
  GitBranch,
  Database,
  Workflow,
  Brain,
  Target,
  Sparkle,
  Star,
  CircleDashed,
  Braces,
  Infinity as InfinityIcon,
  Flame
} from "lucide-react";
import { useTheme } from "next-themes";

type CountUpProps = {
    value: string;
    duration?: number;
};

const CountUp = ({ value, duration = 2 }: CountUpProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const hasNumber = /\d/.test(value);
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  const rounded = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (!isInView || !hasNumber) return;
    const controls = animate(count, numericValue, {
      duration,
      ease: "easeOut"
    });
    return controls.stop;
  }, [isInView, numericValue, duration, count, hasNumber]);

  if (!hasNumber) {
    return (
      <span ref={ref} className="text-4xl font-bold">
        {value}
      </span>
    );
  }

  return <motion.span ref={ref} className="text-4xl font-bold">{rounded}</motion.span>;
};

type Service = {
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  darkColor: string;
  gradient: string;
  borderColor: string;
  stats: string[];
  features: string[];
};

export function ServicesPage() {
  const [active, setActive] = useState<Service | null |boolean>(null);
  const [hoveredService, setHoveredService] = useState<null | number>(null);
  const ref = useRef<null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  const services = [
    {
      title: "Frontend Development",
      description: "Modern React & Next.js Solutions",
      icon: <Code className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      darkColor: "from-blue-400 to-cyan-400",
      gradient: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/20",
      stats: ["React", "Next.js", "TypeScript", "Tailwind", "Framer"],
      features: [
        "Pixel-perfect responsive designs",
        "Optimized performance & Core Web Vitals",
        "Cross-browser compatibility",
        "Accessibility compliance (WCAG)",
        "Progressive Web Apps (PWA)",
        "State management solutions"
      ]
    },
    {
      title: "Backend Development",
      description: "Scalable API & Database Solutions",
      icon: <Server className="w-6 h-6" />,
      color: "from-emerald-500 to-teal-500",
      darkColor: "from-emerald-400 to-teal-400",
      gradient: "bg-gradient-to-br from-emerald-500/10 to-teal-500/10",
      borderColor: "border-emerald-500/20",
      stats: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Redis"],
      features: [
        "RESTful & GraphQL APIs",
        "Authentication & Authorization",
        "Database optimization",
        "Real-time with WebSockets",
        "Microservices architecture",
        "API security & rate limiting"
      ]
    },
    {
      title: "UI/UX Design",
      description: "User-Centered Design Systems",
      icon: <Palette className="w-6 h-6" />,
      color: "from-violet-500 to-purple-500",
      darkColor: "from-violet-400 to-purple-400",
      gradient: "bg-gradient-to-br from-violet-500/10 to-purple-500/10",
      borderColor: "border-violet-500/20",
      stats: ["Figma", "Adobe XD", "Framer", "Prototyping", "Wireframing"],
      features: [
        "User research & persona development",
        "Wireframing & prototyping",
        "Design system creation",
        "Usability testing",
        "Interaction design",
        "Design-to-code handoff"
      ]
    },
    {
      title: "DevOps & Cloud",
      description: "Infrastructure & Deployment",
      icon: <Cloud className="w-6 h-6" />,
      color: "from-orange-500 to-amber-500",
      darkColor: "from-orange-400 to-amber-400",
      gradient: "bg-gradient-to-br from-orange-500/10 to-amber-500/10",
      borderColor: "border-orange-500/20",
      stats: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
      features: [
        "CI/CD pipeline setup",
        "Cloud infrastructure management",
        "Container orchestration",
        "Monitoring & logging",
        "Infrastructure as Code",
        "Performance optimization"
      ]
    },
    {
      title: "SEO Optimization",
      description: "Performance & Visibility",
      icon: <Search className="w-6 h-6" />,
      color: "from-rose-500 to-pink-500",
      darkColor: "from-rose-400 to-pink-400",
      gradient: "bg-gradient-to-br from-rose-500/10 to-pink-500/10",
      borderColor: "border-rose-500/20",
      stats: ["Technical SEO", "Analytics", "Speed", "Content", "Ranking"],
      features: [
        "Core Web Vitals optimization",
        "Schema markup implementation",
        "Keyword research & strategy",
        "Competitor analysis",
        "SEO auditing",
        "Performance monitoring"
      ]
    },
    {
      title: "Mobile Development",
      description: "Cross-Platform Solutions",
      icon: <Smartphone className="w-6 h-6" />,
      color: "from-indigo-500 to-blue-500",
      darkColor: "from-indigo-400 to-blue-400",
      gradient: "bg-gradient-to-br from-indigo-500/10 to-blue-500/10",
      borderColor: "border-indigo-500/20",
      stats: ["React Native", "PWA", "Responsive", "Touch", "Performance"],
      features: [
        "Mobile-first responsive design",
        "Touch-friendly interfaces",
        "Progressive Web App (PWA)",
        "Device-specific optimizations",
        "Native-like experiences",
        "Cross-platform compatibility"
      ]
    },
  ];

  

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: easeOut
      }
    }),
    hover: {
      y: -10,
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: easeInOut
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: spring,
        stiffness: 100,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section 
      id="services"
      className={`relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden
        ${theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
        }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl
            ${theme === 'dark'
              ? 'bg-gradient-to-r from-blue-900/20 to-cyan-900/10'
              : 'bg-gradient-to-r from-blue-200/30 to-cyan-200/20'
            }`}
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl
            ${theme === 'dark'
              ? 'bg-gradient-to-r from-purple-900/20 to-pink-900/10'
              : 'bg-gradient-to-r from-purple-200/30 to-pink-200/20'
            }`}
        />
        
        {/* Grid Pattern */}
        <div className={`absolute inset-0 opacity-5
          ${theme === 'dark' ? 'opacity-10' : 'opacity-3'}`}
        >
          <div className="w-full h-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-xl border mb-6
              ${theme === 'dark'
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-white/80 border-gray-200'
              }`}
          >
            <Rocket className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              My Services
            </span>
          </motion.div>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight
            ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}
          >
            Crafting Digital{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient-x">
              Solutions
            </span>
          </h1>

          <p className={`text-lg max-w-3xl mx-auto mb-10 leading-relaxed
            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
          >
            From concept to deployment, I provide comprehensive web development services 
            that transform ideas into high-performance digital experiences.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover="hover"
              variants={cardVariants}
              onMouseEnter={() =>{ setHoveredService(index)
              }}
              onMouseLeave={() => {setHoveredService(null)
              }}
              onClick={() => setActive(service)}
              className="group cursor-pointer"
            >
              {/* Card */}
              <div className={`relative rounded-2xl p-6 backdrop-blur-xl border overflow-hidden
                ${theme === 'dark'
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-white/80 border-gray-200'
                }`}
              >
                {/* Animated background */}
                <div className={`absolute inset-0 ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex p-4 rounded-xl mb-6 bg-gradient-to-br ${service.color} shadow-lg`}
                >
                  <div className="text-white">
                    {service.icon}
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative">
                  <h3 className={`text-xl font-bold mb-3
                    ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}
                  >
                    {service.title}
                  </h3>
                  
                  <p className={`text-sm mb-4
                    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                  >
                    {service.description}
                  </p>

                  {/* Tech Tags
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.stats.map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`px-3 py-1 rounded-full text-xs font-medium
                          ${theme === 'dark'
                            ? 'bg-gray-700/50 text-gray-300'
                            : 'bg-gray-100 text-gray-700'
                          }`}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div> */}

                  {/* Hover Indicator */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <span className={`text-sm font-medium bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                      View Details
                    </span>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className={`p-2 rounded-lg
                        ${theme === 'dark'
                          ? 'bg-gray-700/50'
                          : 'bg-gray-100'
                        }`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Glow Effect */}
                <AnimatePresence>
                  {hoveredService === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0.3, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={`absolute -inset-4 rounded-2xl bg-gradient-to-r ${service.color} blur-xl -z-10`}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('Contact')?.scrollIntoView({ behavior: 'smooth' })}
            className={`px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 mx-auto group relative overflow-hidden
              ${theme === 'dark'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-xl shadow-purple-500/20'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl shadow-purple-500/30'
              }`}
          >
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                background: [
                  'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                  'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.4), transparent)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            />
            
            <span className="relative z-10 text-white">Start Your Project</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="relative z-10"
            >
              <Rocket className="w-5 h-5 text-white" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setActive(null)}
            />
            
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl
                  ${theme === 'dark'
                    ? 'bg-gray-900 border-gray-700'
                    : 'bg-white border-gray-200'
                  } border shadow-2xl`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className={`sticky top-0 p-6 border-b backdrop-blur-xl
                  ${theme === 'dark'
                    ? 'bg-gray-900/90 border-gray-700'
                    : 'bg-white/90 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        className={`p-3 rounded-xl bg-gradient-to-br ${(active as typeof services[0]).color} shadow-lg`}
                      >
                        <div className="text-white">
                          {(active as typeof services[0]).icon}
                        </div>
                      </motion.div>
                      <div>
                        <h3 className={`text-2xl font-bold
                          ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}
                        >
                          {(active as typeof services[0]).title}
                        </h3>
                        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                          {(active as typeof services[0]).description}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setActive(null)}
                      className={`p-2 rounded-lg
                        ${theme === 'dark'
                          ? 'hover:bg-gray-800'
                          : 'hover:bg-gray-100'
                        }`}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {/* Features List */}
                  <div className="space-y-4">
                    <h4 className={`text-lg font-bold mb-4
                      ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}
                    >
                      What I Offer
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(active as typeof services[0]).features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex items-start gap-3 p-4 rounded-xl
                            ${theme === 'dark'
                              ? 'bg-gray-800/50'
                              : 'bg-gray-50'
                            }`}
                        >
                          <CheckCircle className={`w-5 h-5 flex-shrink-0
                            ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'}`}
                          />
                          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-8">
                    <h4 className={`text-lg font-bold mb-4
                      ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}
                    >
                      Technologies I Use
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {(active as typeof services[0]).stats.map((tech, index) => (
                        <motion.span
                          key={index}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className={`px-4 py-2 rounded-lg font-medium
                            ${theme === 'dark'
                              ? 'bg-gray-800 text-gray-300'
                              : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className={`sticky bottom-0 p-6 border-t backdrop-blur-xl
                  ${theme === 'dark'
                    ? 'bg-gray-900/90 border-gray-700'
                    : 'bg-white/90 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      Ready to implement this solution?
                    </p>
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActive(null)}
                        className={`px-6 py-3 rounded-xl font-medium
                          ${theme === 'dark'
                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        Close
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          document.getElementById('Contact')?.scrollIntoView({ behavior: 'smooth' });
                          setActive(null);
                        }}
                        className={`px-6 py-3 rounded-xl font-bold bg-gradient-to-r ${(active as typeof services[0]).color} text-white shadow-lg`}
                      >
                        Start Project
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ServicesPage;