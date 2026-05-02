'use client';

import { motion } from 'framer-motion';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

// Floating Background Elements Component
export  const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        animate={{
          y: [0, -50, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.3), rgba(236, 72, 153, 0.2))'
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        animate={{
          y: [0, 50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(59, 130, 246, 0.2))'
        }}
      />
      
     
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(90deg, #faf8f0 1px, transparent 1px),
                            linear-gradient(#faf8f0 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      {/* Floating Tech Icons */}
      {[
        { Icon: SiReact, delay: 0 },
        { Icon: SiNextdotjs, delay: 0.5 },
        { Icon: SiTypescript, delay: 1 },
        { Icon: SiTailwindcss, delay: 1.5 }
      ].map((tech, i) => (
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
          <tech.Icon className="w-24 h-24" />
        </motion.div>
      ))}
      
      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${i % 2 === 0 ? 'bg-[#a78bfa]/10' : 'bg-[#faf8f0]/5'}`}
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
          }}
          initial={{
            x: Math.random() * 100 + 'vw',
            y: Math.random() * 100 + 'vh',
          }}
          animate={{
            y: [null, '-100vh'],
            x: [null, (Math.random() - 0.5) * 100 + 'vw'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};
