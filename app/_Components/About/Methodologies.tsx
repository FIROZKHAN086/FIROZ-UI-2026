'use client';

import { motion } from 'framer-motion';
import { Palette, Layout, Cloud, CheckCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
  export const Methodologies = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const methodologies = [
    {
      title: 'UI/UX Design',
      description: 'Creating intuitive and engaging user experiences',
      icon: <Palette className="w-6 h-6" />,
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
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
      gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
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
      gradient: 'from-emerald-500 via-green-500 to-teal-500',
      points: [
        'CI/CD Pipelines',
        'Cloud Deployment',
        'Docker Containerization',
        'Performance Monitoring',
        'Security Best Practices'
      ]
    }
  ];

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
          className={`relative rounded-3xl p-8 backdrop-blur-xl border ${
            isDark 
              ? 'bg-gradient-to-br from-gray-900/60 to-gray-800/40 border-gray-700' 
              : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200'
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-4 rounded-xl bg-gradient-to-br ${method.gradient} shadow-lg`}>
              <div className="text-white">
                {method.icon}
              </div>
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {method.title}
              </h3>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
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
                className={`flex items-center gap-3 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <div className="p-1 rounded-full bg-gradient-to-br from-green-400 to-emerald-500">
                  <CheckCircle className="w-4 h-4 text-white" />
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