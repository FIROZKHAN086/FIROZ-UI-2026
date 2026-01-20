'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Brain, Code2, Palette, Shield, Zap, Workflow, TrendingUp, ArrowRight } from 'lucide-react';
import { Journey } from './Journey';
import { Methodologies } from './Methodologies';
import {StatsGrid} from './StatsGrid';
import {FloatingElements} from './FloatingElements';
import { AboutC } from './AboutC';




export default function AboutMe() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
    
    // Check mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // GSAP Animations
    const ctx = gsap.context(() => {
      // Section entrance
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Title animation
      gsap.from('.section-title', {
        scrollTrigger: {
          trigger: '.section-title',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
      });
    }, sectionRef);

    return () => {
      window.removeEventListener('resize', checkMobile);
      ctx.revert();
    };
  }, []);

  if (!mounted) return null;

  const scrollToContact = () => {
    const section = document.getElementById('Contact');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Highlighted text with gradients
  const highlightWords = [
    { word: 'Full-Stack Developer', color: 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent' },
    { word: 'innovative', color: 'bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent' },
    { word: 'performant', color: 'bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent' },
    { word: 'scalable', color: 'bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent' },
    { word: 'user-centric', color: 'bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent' },
    { word: 'cutting-edge', color: 'bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent' },
    { word: 'elegant', color: 'bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent' },
    { word: 'robust', color: 'bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent' },
  ];

  const renderHighlightedText = (text) => {
    let result = text;
    highlightWords.forEach(({ word, color }) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      result = result.replace(regex, `<span class="${color} font-bold">${word}</span>`);
    });
    return result;
  };

  const description = `I'm a passionate Full-Stack Developer dedicated to crafting innovative digital solutions. With expertise in modern web technologies, I build performant, scalable applications that deliver exceptional user experiences.

My approach combines technical excellence with creative problem-solving, ensuring every project is not just functional, but also elegant and user-centric. I thrive on turning complex challenges into simple, effective solutions that drive real value.

Driven by curiosity and a commitment to quality, I continuously explore cutting-edge technologies to stay ahead in the rapidly evolving digital landscape.`;

  return (
    <section 
    suppressHydrationWarning
      ref={sectionRef}
      id="about"
      className={`relative min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-gray-950 via-black to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}
    >


      

      <FloatingElements />
  
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-24"
        >
          {/* Section Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className={`w-8 h-px ${
              isDark ? 'bg-gradient-to-r from-transparent via-white/30 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-600/30 to-transparent'
            }`} />
            <div className={`px-4 py-2 rounded-full text-sm font-medium tracking-widest uppercase backdrop-blur-sm border ${
              isDark 
                ? 'bg-gray-900/50 border-gray-700 text-purple-400' 
                : 'bg-white/50 border-gray-300 text-purple-600'
            }`}>
              <Sparkles className="inline-block w-4 h-4 mr-2" />
              About Me
            </div>
            <div className={`w-8 h-px ${
              isDark ? 'bg-gradient-to-r from-transparent via-white/30 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-600/30 to-transparent'
            }`} />
          </motion.div>

          {/* Main Title */}
          <h1 className="section-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-bounce transition"
          style={{ animationDuration: "3s" }}>
            <span className={isDark ? 'text-white' : 'text-gray-900'}>
              Crafting Digital
            </span>
            <span className="block mt-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient-x">
                Excellence
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{
              color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Transforming vision into reality through code, creativity, and technical expertise
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <StatsGrid />

        {/* Main Description Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mb-20 rounded-3xl p-8 lg:p-12 backdrop-blur-xl border ${
            isDark 
              ? 'bg-gradient-to-br from-gray-900/60 to-gray-800/40 border-gray-700' 
              : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200'
          }`}
        >
          <div className="flex items-center gap-6 mb-8">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl"
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h3 className={`text-3xl font-bold mb-2 animate-bounce ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                My Philosophy
              </h3>
              <p className={`text-lg ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Building with purpose, precision, and passion
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Text Content */}
            <div>
              <div 
                className={`text-lg leading-relaxed space-y-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
                dangerouslySetInnerHTML={{ 
                  __html: renderHighlightedText(description).replace(/\n/g, '<br /><br />') 
                }}
              />
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { label: 'Code Quality', value: '99%', color: 'from-green-500 to-emerald-500' },
                  { label: 'Project Success', value: '100%', color: 'from-blue-500 to-cyan-500' },
                  { label: 'Client Retention', value: '95%', color: 'from-purple-500 to-pink-500' },
                  { label: 'On-Time Delivery', value: '98%', color: 'from-amber-500 to-orange-500' },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl backdrop-blur-sm border ${
                      isDark 
                        ? 'bg-gray-800/50 border-gray-700' 
                        : 'bg-white/60 border-gray-200'
                    }`}
                  >
                    <div className={`text-2xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Principles Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: <Code2 className="w-5 h-5" />,
                  title: 'Clean Code',
                  description: 'Maintainable, efficient, well-documented',
                  gradient: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: <Palette className="w-5 h-5" />,
                  title: 'Design First',
                  description: 'Intuitive, accessible interfaces',
                  gradient: 'from-purple-500 to-pink-500'
                },
                {
                  icon: <Shield className="w-5 h-5" />,
                  title: 'Security',
                  description: 'Robust protection measures',
                  gradient: 'from-green-500 to-emerald-500'
                },
                {
                  icon: <Zap className="w-5 h-5" />,
                  title: 'Performance',
                  description: 'Fast, optimized solutions',
                  gradient: 'from-amber-500 to-orange-500'
                }
              ].map((principle, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-xl backdrop-blur-sm border ${
                    isDark 
                      ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700' 
                      : 'bg-gradient-to-br from-white/60 to-gray-50/60 border-gray-200'
                  }`}
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${principle.gradient} mb-4`}>
                    <div className="text-white">
                      {principle.icon}
                    </div>
                  </div>
                  <h5 className={`font-bold text-sm mb-1 ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {principle.title}
                  </h5>
                  <p className={`text-xs ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {principle.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Methodologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-12">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl"
            >
              <Workflow className="w-8 h-8 text-white animate-bounce" />
            </motion.div>
            <div className="text-center">
              <h2 className={`text-4xl font-bold mb-2 animate-bounce ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Development Methodologies
              </h2>
              <p className={`text-lg ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Structured approach to building exceptional software
              </p>
            </div>
          </div>

          <Methodologies />
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-12">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-xl"
            >
              <TrendingUp className="w-8 h-8 text-white" />
            </motion.div>
            <div className="text-center" id='aboutt'>
              <h2 className={`text-4xl font-bold mb-2 animate-bounce ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{ animationDuration: "3s" }}
            >
              My Journey
            </h2>
            <p className={`text-lg ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                From passion to professional expertise
              </p>
            </div>
          </div>

          <Journey />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl backdrop-blur-xl border mb-6 ${
            isDark 
              ? 'bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-700/30' 
              : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
          }`}>
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className={`text-sm font-bold ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`}>
              Ready to Collaborate?
            </span>
          </div>
          
          <h3 className={`text-3xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Let's Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Amazing Together
            </span>
          </h3>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 mx-auto relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              boxShadow: '0 20px 60px rgba(139, 92, 246, 0.3)'
            }}
          >
            <span className="relative z-10 text-white">Start a Project</span>
            <ArrowRight className="w-5 h-5 text-white relative z-10" />
          </motion.button>
        </motion.div>
        <AboutC/>
      </div>

      {/* Floating action button for mobile */}
      {isMobile && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={scrollToContact}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      )}

      {/* Global Styles */}
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