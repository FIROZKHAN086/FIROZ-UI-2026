"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaGithub, FaInstagram, FaLinkedinIn,
  FaTwitter, FaHeart, FaRocket
} from "react-icons/fa";
import { ArrowRight, Send,
} from "lucide-react";
import { lenisScrollTo } from "@/lib/scroll";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  // Handle mouse move for interactive background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

 



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };



  return (
    <motion.footer
      ref={footerRef}
      style={{ opacity, scale }}
      className="relative min-h-screen bg-[#050505] flex flex-col justify-end overflow-hidden pt-20"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 opacity-[0.03]"
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </motion.div>
        
        {/* Glow Following Mouse */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-linear-to-r from-[#a78bfa]/20 to-[#ec4899]/10 blur-[120px] mix-blend-screen opacity-50"
          animate={{
            x: mousePosition.x - 300,
            y: mousePosition.y - 300,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 50, mass: 1 }}
        />
        
        {/* Fixed Background Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3b82f6]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#a78bfa]/5 rounded-full blur-[100px]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        
        {/* Top Section: CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-none">
              LET&apos;S <span className="text-transparent bg-clip-text bg-linear-to-r from-[#a78bfa] to-[#ec4899]">CREATE</span> <br />
              SOMETHING GREAT.
            </h2>
            <div className="flex flex-wrap gap-6">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all"
              >
                <span className="relative z-10 flex items-center gap-2">
                  START A PROJECT <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-linear-to-r from-[#a78bfa] to-[#ec4899] opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
              </motion.a>
              <div className="flex items-center gap-4 text-[#faf8f0]/60">
                <div className="w-12 h-[1px] bg-[#faf8f0]/20" />
                <p className="text-sm font-medium tracking-widest uppercase">Available for freelance</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="glass p-8 md:p-12 rounded-[2rem] border-white/5 relative overflow-hidden group"
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4">Stay in the loop</h3>
              <p className="text-[#faf8f0]/60 mb-8">Get the latest insights on web development and design directly in your inbox.</p>
              
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a78bfa]/50 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-6 bg-[#a78bfa] text-black font-bold rounded-xl hover:bg-white transition-colors flex items-center gap-2"
                >
                  {isSubscribed ? "JOINED" : "JOIN"}
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="mt-4 text-xs text-[#faf8f0]/30 italic">No spam, just quality content. Unsubscribe anytime.</p>
            </div>
            
            {/* Before/After style animation for the card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ec4899]/10 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
          </motion.div>
        </div>

      

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 md:pt-12 border-t border-white/5 gap-6 md:gap-8">
          <div className="flex items-center gap-2 text-[#faf8f0] text-xs">
            <span>&copy; {new Date().getFullYear()} Firozkhan.site</span>
            <span>BUILDING IN THE OPEN.</span>
          </div>

          <motion.div 
            className="flex items-center gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            <div className="flex items-center gap-2 text-[#faf8f0] text-[10px] font-bold tracking-widest uppercase">
              Made with <FaHeart className="text-red-500 animate-pulse" /> using
            </div>
            <div className="flex gap-4">
              {["Next.js", "Framer", "Tailwind"].map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-[#faf8f0] font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <button 
            onClick={() => lenisScrollTo(0)}
            className="group flex items-center gap-2 text-[#faf8f0] hover:text-white transition-colors text-xs font-bold tracking-widest uppercase"
          >
            Back to top 
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FaRocket className="group-hover:text-[#a78bfa] transition-colors" />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Extreme Bottom Text (Visual Flourish) */}
      <div className="relative w-full overflow-hidden pointer-events-none select-none h-20 md:h-40 flex items-end">
        <h1 className="text-[15vw] leading-[0.8] font-black text-white/[0.9] whitespace-nowrap -mb-2 md:-mb-6">
          FIROZ KHAN 
        </h1>
      </div>
    </motion.footer>
  );
}
