 'use client';

import { motion } from 'framer-motion';
import { Target, TrendingUp, Zap, Star } from 'lucide-react';


import { useTheme } from 'next-themes';

 export const StatsGrid = () => {

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const stats = [
    { 
      label: 'Projects', 
      value: '50+', 
      icon: <Target className="w-5 h-5" />, 
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Completed Successfully'
    },
    { 
      label: 'Experience', 
      value: '3+ Years', 
      icon: <TrendingUp className="w-5 h-5" />, 
      gradient: 'from-purple-500 to-pink-500',
      description: 'Professional Journey'
    },
    { 
      label: 'Technologies', 
      value: '25+', 
      icon: <Zap className="w-5 h-5" />, 
      gradient: 'from-emerald-500 to-teal-500',
      description: 'Mastered & Implemented'
    },
    { 
      label: 'Client Satisfaction', 
      value: '100%', 
      icon: <Star className="w-5 h-5" />, 
      gradient: 'from-amber-500 to-orange-500',
      description: 'Positive Feedback'
    },
  ];

  return (
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
      {/* 🔹 HARD-CODED BETA BADGE */}
      <span
        className={`absolute top-3 right-3 z-10 px-2 py-0.5 rounded-full
        text-[10px] font-semibold tracking-wide
        ${isDark
          ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20'
          : 'bg-yellow-100 text-yellow-700 border border-yellow-300'}
      `}
      >
        hard-coded
      </span>

      <div
        className={`p-6 rounded-2xl backdrop-blur-xl border ${
          isDark
            ? 'bg-gray-900/40 border-gray-700'
            : 'bg-white/60 border-gray-200'
        }`}
      >
        <div
          className={`inline-flex p-3 rounded-full mb-4 bg-gradient-to-br ${stat.gradient}`}
        >
          <div className="text-white">{stat.icon}</div>
        </div>

        <div
          className={`text-3xl font-bold mb-1 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {stat.value}
        </div>

        <div
          className={`text-sm font-semibold mb-1 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          {stat.label}
        </div>

        <div
          className={`text-xs ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          {stat.description}
        </div>
      </div>

      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent ${
          isDark ? 'to-white/5' : 'to-black/5'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
      />
    </motion.div>
  ))}
</div>

  );
};