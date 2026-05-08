import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { lenisScrollTo } from "@/lib/scroll"

const CButton = () => {
  
  return (
    <div className="mt-32 flex flex-col items-center text-center relative overflow-hidden">
  {/* Animated Background Orbs */}
  <motion.div
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"
  />
  <motion.div
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.2, 0.5, 0.2],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1,
    }}
    className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-pink-500/20 blur-3xl"
  />
  <motion.div
    animate={{
      rotate: 360,
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    }}
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-purple-500/10 rounded-full"
  />
  <motion.div
    animate={{
      rotate: -360,
    }}
    transition={{
      duration: 25,
      repeat: Infinity,
      ease: "linear",
    }}
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-pink-500/10 rounded-full"
  />

  {/* Floating Particles */}
  {[...Array(12)].map((_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 rounded-full bg-purple-400"
      initial={{
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        opacity: 0,
      }}
      animate={{
        x: [
          Math.random() * 400 - 200,
          Math.random() * 400 - 200,
          Math.random() * 400 - 200,
        ],
        y: [
          Math.random() * 400 - 200,
          Math.random() * 400 - 200,
          Math.random() * 400 - 200,
        ],
        opacity: [0, 0.5, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: i * 0.3,
        ease: "easeInOut",
      }}
    />
  ))}

  {/* Badge with Hover Effect */}
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, type: "spring" }}
    whileHover={{ scale: 1.05 }}
    className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
  >
    <motion.div
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    >
      <Sparkles className="w-4 h-4 text-purple-500" />
    </motion.div>
    <motion.span
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="text-xs font-black text-white/60 tracking-widest uppercase"
    >
      Available for new projects
    </motion.span>
  </motion.div>

  {/* Main Heading with Split Text Animation */}
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="relative"
  >
    <motion.h3
      className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 sm:mb-10 max-w-2xl relative z-10"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {"LET'S BUILD THE".split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 + index * 0.03 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      <br />
      <motion.span
        className="text-purple-500 italic underline decoration-purple-500/30 inline-block"
        animate={{
          textShadow: [
            "0 0 0px rgba(168, 85, 247, 0)",
            "0 0 20px rgba(168, 85, 247, 0.5)",
            "0 0 0px rgba(168, 85, 247, 0)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        {"FUTURE".split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.3,
              delay: 0.8 + index * 0.05,
              type: "spring",
            }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
      {" TOGETHER".split("").map((char, index) => (
        <motion.span
          key={index + 100}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.9 + index * 0.03 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h3>
  </motion.div>

  {/* Button with Multiple Animations  */}
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
  >
    <button
      onClick={() => lenisScrollTo('#contact')}
      className="group relative px-6 sm:px-10 py-6 sm:py-8 bg-white text-black font-black text-base sm:text-xl rounded-2xl overflow-hidden cursor-pointer outline-none border-none"
    >
      {/* Animated Background  */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500"
        initial={{ x: "-100%" }}
        whileHover={{ x: "0%" }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      />
      
      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-white">
        <motion.span
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          GET IN TOUCH
        </motion.span>
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </motion.div>
      </span>
      
      {/* Ripple Effect on Click */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        whileTap={{
          scale: 1.5,
          opacity: 0,
          backgroundColor: "rgba(255,255,255,0.3)",
        }}
        transition={{ duration: 0.3 }}
      />
    </button>
  </motion.div>

  {/* Animated Pulse Rings Around Button */}
  <motion.div
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.5, 0, 0.5],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute -z-10 w-64 h-64 rounded-full border-2 border-purple-500/30"
    style={{ top: "calc(50% + 200px)", left: "calc(50% - 128px)" }}
  />
  <motion.div
    animate={{
      scale: [1, 1.8, 1],
      opacity: [0.3, 0, 0.3],
    }}
    transition={{
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.5,
    }}
    className="absolute -z-10 w-80 h-80 rounded-full border border-pink-500/20"
    style={{ top: "calc(50% + 190px)", left: "calc(50% - 160px)" }}
  />
</div>
  )
}

export default CButton
