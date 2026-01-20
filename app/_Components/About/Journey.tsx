'use client';
import { motion } from 'framer-motion';
import { Globe, Layers, Cpu } from 'lucide-react';
import { useTheme } from 'next-themes';

 export const Journey = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const timeline = [
    {
      year: '2023 - Present',
      title: 'Started Web Development',
      company: 'Self-Taught Journey',
      description: 'Mastered fundamentals of HTML, CSS, and JavaScript. Built responsive websites and engaging user interfaces.',
      icon: <Globe className="w-5 h-5" />,
      gradient: 'from-purple-500 via-pink-500 to-rose-500'
    },
    {
      year: '2023 - 2024',
      title: 'Full Stack Development',
      company: 'MERN Stack Projects',
      description: 'Expanded into full-stack development with React, Node.js, Express, and MongoDB. Built complete web applications.',
      icon: <Layers className="w-5 h-5" />,
      gradient: 'from-blue-500 via-cyan-500 to-teal-500'
    },
    {
      year: '2025',
      title: 'Advanced Skills',
      company: 'Skill Enhancement',
      description: 'Mastered advanced concepts, system design, and expanded into new technologies and architectures.',
      icon: <Cpu className="w-5 h-5" />,
      gradient: 'from-green-500 via-emerald-500 to-lime-500'
    }
  ];

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Center Line */}
      <div className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-300 via-pink-300 to-cyan-300" />
      
      {/* Timeline Items */}
      <div className="space-y-12"
      >
        {timeline.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="relative flex flex-col lg:flex-row items-center"
          >
            {/* Timeline Dot */}
            <div className={`
              absolute lg:left-1/2 lg:-translate-x-1/2
              top-6 lg:top-1/2 lg:-translate-y-1/2
              w-6 h-6 rounded-full
              bg-gradient-to-br from-purple-500 to-pink-500
              border-4 ${isDark ? 'border-gray-900' : 'border-white'} shadow-xl z-10
              flex items-center justify-center
            `}>
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>

            {/* Content */}
            <div className={`
              w-full lg:w-5/12
              ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:ml-auto'}
              relative
            `}>
              <motion.div
                whileHover={{ y: -5 }}
                className={`relative overflow-hidden rounded-3xl ${
                  isDark 
                    ? 'bg-gradient-to-br from-gray-900/60 to-gray-800/40 border-gray-700' 
                    : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200'
                } border`}
              >
                <div className="relative p-8">
                  <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'lg:justify-end lg:flex-row-reverse' : ''}`}>
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient}`}>
                      <div className="text-white">
                        {item.icon}
                      </div>
                    </div>
                    <div className={index % 2 === 0 ? 'lg:text-right' : ''}>
                      <div className="text-sm font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {item.year}
                      </div>
                      <h3 className={`text-2xl font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.title}
                      </h3>
                      <div className={`${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      } text-sm`}>
                        {item.company}
                      </div>
                    </div>
                  </div>
                  
                  <p className={`leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};