'use client';

import { motion } from 'framer-motion';
import { Palette, Layout, Cloud, CheckCircle } from 'lucide-react';

const methodologies = [
  {
    title: 'UI/UX Design',
    description: 'Creating intuitive and engaging user experiences',
    icon: <Palette className="w-6 h-6" />,
    gradient: 'from-[#a78bfa] via-[#ec4899] to-[#a78bfa]',
    points: [
      'Responsive Design Principles',
      'Wireframing & Prototyping',
      'Design Systems',
      'Accessibility (WCAG)',
      'User Research & Testing'
    ]
  },
  {
    title: 'Development Approach',
    description: 'Methodology for building scalable applications',
    icon: <Layout className="w-6 h-6" />,
    gradient: 'from-[#3b82f6] via-[#06b6d4] to-[#3b82f6]',
    points: [
      'Mobile-First Development',
      'Component-Based Architecture',
      'Clean Code Principles',
      'Test-Driven Development',
      'Performance Optimization'
    ]
  },
  {
    title: 'DevOps & Deployment',
    description: 'Deployment and continuous integration practices',
    icon: <Cloud className="w-6 h-6" />,
    gradient: 'from-[#10b981] via-[#06b6d4] to-[#10b981]',
    points: [
      'CI/CD Pipelines',
      'Cloud Deployment',
      'Docker Containerization',
      'Performance Monitoring',
      'Security Best Practices'
    ]
  }
];

export const Methodologies = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {methodologies.map((method, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="relative rounded-3xl p-8 backdrop-blur-xl border bg-[#111111]/50 border-[#faf8f0]/10"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-4 rounded-xl bg-gradient-to-br ${method.gradient} shadow-lg`}>
              <div className="text-[#0a0a0a]">
                {method.icon}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#faf8f0]">
                {method.title}
              </h3>
              <p className="text-sm text-[#faf8f0]/60">
                {method.description}
              </p>
            </div>
          </div>
          
          <ul className="space-y-3">
            {method.points.map((point, pointIndex) => (
              <motion.li
                key={pointIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: pointIndex * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 text-[#faf8f0]/70"
              >
                <div className="p-1 rounded-full bg-gradient-to-br from-[#10b981] to-[#06b6d4]">
                  <CheckCircle className="w-4 h-4 text-[#0a0a0a]" />
                </div>
                <span className="font-medium">{point}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};
