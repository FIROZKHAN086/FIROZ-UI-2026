'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Brain, Code2, Palette, Shield, Zap, Workflow, TrendingUp, ArrowRight } from 'lucide-react';
import { Journey } from './Journey';
import { Methodologies } from './Methodologies';
import {StatsGrid} from './StatsGrid';
import {FloatingElements} from './FloatingElements';

export default function AboutMe() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const ctx = gsap.context(() => {
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

  const highlightWords = [
    { word: 'Full-Stack Developer', color: 'gradient-text' },
    { word: 'innovative', color: 'gradient-text-blue' },
    { word: 'performant', color: 'gradient-text' },
    { word: 'scalable', color: 'gradient-text-blue' },
    { word: 'user-centric', color: 'gradient-text' },
    { word: 'cutting-edge', color: 'gradient-text' },
    { word: 'elegant', color: 'gradient-text-blue' },
    { word: 'robust', color: 'gradient-text' },
  ];

  const renderHighlightedText = (text:string) => {
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
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a0a0a]"
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
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#faf8f0]/30 to-transparent" />
            <div className="px-4 py-2 rounded-full text-sm font-medium tracking-widest uppercase glass text-[#a78bfa] border-[#a78bfa]/30">
              <Sparkles className="inline-block w-4 h-4 mr-2" />
              About Me
            </div>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#faf8f0]/30 to-transparent" />
          </motion.div>

          {/* Main Title */}
          <h1 className="section-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-[#faf8f0]">
              Crafting Digital
            </span>
            <span className="block mt-2">
              <span className="gradient-text animate-gradient-x">
                Excellence
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
          className="mb-20 rounded-3xl p-8 lg:p-12 glass"
        >
          <div className="flex items-center gap-6 mb-8">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="p-5 rounded-2xl gradient-bg shadow-xl"
            >
              <Brain className="w-8 h-8 text-[#0a0a0a]" />
            </motion.div>
            <div>
              <h3 className="text-3xl font-bold mb-2 text-[#faf8f0]">
                My Philosophy
              </h3>
              <p className="text-lg text-[#faf8f0]/60">
                Building with purpose, precision, and passion
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Text Content */}
            <div>
              <div
                className="text-lg leading-relaxed space-y-4 text-[#faf8f0]/80"
                dangerouslySetInnerHTML={{
                  __html: renderHighlightedText(description).replace(/\n/g, '<br /><br />')
                }}
              />

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { label: 'Code Quality', value: '99%', color: 'gradient-text' },
                  { label: 'Project Success', value: '100%', color: 'gradient-text-blue' },
                  { label: 'Client Retention', value: '95%', color: 'gradient-text' },
                  { label: 'On-Time Delivery', value: '98%', color: 'gradient-text-blue' },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl glass"
                  >
                    <div className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-[#faf8f0]/60">
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
                  gradient: 'gradient-bg'
                },
                {
                  icon: <Palette className="w-5 h-5" />,
                  title: 'Design First',
                  description: 'Intuitive, accessible interfaces',
                  gradient: 'gradient-bg'
                },
                {
                  icon: <Shield className="w-5 h-5" />,
                  title: 'Security',
                  description: 'Robust protection measures',
                  gradient: 'gradient-bg-secondary'
                },
                {
                  icon: <Zap className="w-5 h-5" />,
                  title: 'Performance',
                  description: 'Fast, optimized solutions',
                  gradient: 'gradient-bg-secondary'
                }
              ].map((principle, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-xl glass"
                >
                  <div className={`inline-flex p-3 rounded-lg ${principle.gradient} mb-4`}>
                    <div className="text-[#0a0a0a]">
                      {principle.icon}
                    </div>
                  </div>
                  <h5 className="font-bold text-sm mb-1 text-[#faf8f0]">
                    {principle.title}
                  </h5>
                  <p className="text-xs text-[#faf8f0]/60">
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
              className="p-4 rounded-2xl gradient-bg shadow-xl"
            >
              <Workflow className="w-8 h-8 text-[#0a0a0a] animate-bounce" />
            </motion.div>
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-2 text-[#faf8f0]">
                Development Methodologies
              </h2>
              <p className="text-lg text-[#faf8f0]/60">
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
              className="p-4 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#06b6d4] shadow-xl"
            >
              <TrendingUp className="w-8 h-8 text-[#0a0a0a]" />
            </motion.div>
            <div className="text-center" id='aboutt'>
              <h2 className="text-4xl font-bold mb-2 text-[#faf8f0]">
                My Journey
              </h2>
              <p className="text-lg text-[#faf8f0]/60">
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
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass mb-6">
            <Sparkles className="w-5 h-5 text-[#a78bfa]" />
            <span className="text-sm font-bold text-[#a78bfa]">
              Ready to Collaborate?
            </span>
          </div>

          <h3 className="text-3xl font-bold mb-6 text-[#faf8f0]">
            Let&#44;s Build Something{' '}
            <span className="gradient-text">
              Amazing Together
            </span>
          </h3>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="px-10 py-4 rounded-2xl font-bold text-lg text-[#0a0a0a] transition-all duration-300 flex items-center justify-center gap-3 mx-auto relative overflow-hidden gradient-bg"
          >
            <span className="relative z-10">Start a Project</span>
            <ArrowRight className="w-5 h-5 relative z-10 text-[#0a0a0a]" />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating action button for mobile */}
      {isMobile && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={scrollToContact}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full gradient-bg text-[#0a0a0a] shadow-xl shadow-[#a78bfa]/30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      )}

      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 5s ease infinite;
        }
        .gradient-bg {
          background: linear-gradient(135deg, #a78bfa, #ec4899, #6366f1);
        }
      `}</style>
    </section>
  );
}
