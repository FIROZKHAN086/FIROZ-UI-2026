'use client';

import { motion } from 'framer-motion';
import { Target, TrendingUp, Zap, Star } from 'lucide-react';

export const StatsGrid = () => {

  const stats = [
    {
      label: 'Projects',
      value: '50+',
      icon: <Target className="w-5 h-5" />,
      gradient: 'from-[#a78bfa] to-[#ec4899]',
      description: 'Completed Successfully'
    },
    {
      label: 'Experience',
      value: '3+ Years',
      icon: <TrendingUp className="w-5 h-5" />,
      gradient: 'from-[#a78bfa] to-[#ec4899]',
      description: 'Professional Journey'
    },
    {
      label: 'Technologies',
      value: '25+',
      icon: <Zap className="w-5 h-5" />,
      gradient: 'from-[#10b981] to-[#06b6d4]',
      description: 'Mastered & Implemented'
    },
    {
      label: 'Client Satisfaction',
      value: '100%',
      icon: <Star className="w-5 h-5" />,
      gradient: 'from-[#f59e0b] to-[#ef4444]',
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
          <div
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl backdrop-blur-xl border bg-[#111111]/50 border-[#faf8f0]/10"
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
  );
};
