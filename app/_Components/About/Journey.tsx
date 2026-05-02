'use client';
import { motion } from 'framer-motion';
import { Globe, Layers, Cpu } from 'lucide-react';

const timeline = [
  {
    year: '2023 - Present',
    title: 'Started Web Development',
    company: 'Self-Taught Journey',
    description: 'Mastered fundamentals of HTML, CSS, and JavaScript. Built responsive websites and engaging user interfaces.',
    icon: <Globe className="w-5 h-5" />,
    gradient: 'from-[#a78bfa] via-[#ec4899] to-[#a78bfa]'
  },
  {
    year: '2023 - 2024',
    title: 'Full Stack Development',
    company: 'MERN Stack Projects',
    description: 'Expanded into full-stack development with React, Node.js, Express, and MongoDB. Built complete web applications.',
    icon: <Layers className="w-5 h-5" />,
    gradient: 'from-[#3b82f6] via-[#06b6d4] to-[#3b82f6]'
  },
  {
    year: '2025',
    title: 'Advanced Skills',
    company: 'Skill Enhancement',
    description: 'Mastered advanced concepts, system design, and expanded into new technologies and architectures.',
    icon: <Cpu className="w-5 h-5" />,
    gradient: 'from-[#10b981] via-[#06b6d4] to-[#10b981]'
  }
];

export const Journey = () => {
  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Center Line */}
      <div className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#a78bfa]/30 via-[#ec4899]/30 to-[#3b82f6]/30" />
      
      {/* Timeline Items */}
      <div className="space-y-12">
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
              absolute lg:left-1/2 lg:-translate-x-1/2 top-6 lg:top-1/2 lg:-translate-y-1/2
              w-6 h-6 rounded-full
              bg-gradient-to-br from-[#a78bfa] to-[#ec4899]
              border-4 border-[#0a0a0a] shadow-xl z-10
              flex items-center justify-center
            `}>
              <div className="w-2 h-2 rounded-full bg-[#0a0a0a]" />
            </div>
            
            {/* Content */}
            <div className={`
              w-full lg:w-5/12
              ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:ml-auto'}
              relative
            `}>
              <motion.div
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-3xl border bg-[#111111]/50 border-[#faf8f0]/10"
              >
                <div className="relative p-8">
                  <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'lg:justify-end lg:flex-row-reverse' : ''}`}>
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient}`}>
                      <div className="text-[#0a0a0a]">
                        {item.icon}
                      </div>
                    </div>
                    <div className={index % 2 === 0 ? 'lg:text-right' : ''}>
                      <div className="text-sm font-bold bg-gradient-to-r from-[#a78bfa] to-[#ec4899] bg-clip-text text-transparent">
                        {item.year}
                      </div>
                      <h3 className="text-2xl font-bold text-[#faf8f0]">
                        {item.title}
                      </h3>
                      <div className="text-sm text-[#faf8f0]/60">
                        {item.company}
                      </div>
                    </div>
                  </div>
                  <p className={`leading-relaxed text-[#faf8f0]/60 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
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
