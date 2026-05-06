"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



type ContactInfoItemProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  delay?: number;
  href?: string;
};

(gsap as any).registerPlugin(ScrollTrigger);
export const ContactInfoItem = ({
  icon,
  title,
  children,
  delay = 0,
  href,
}: ContactInfoItemProps) => {
  const itemRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (!itemRef.current) return;
    
  gsap.fromTo(
    itemRef.current,
    { opacity: 0, 
    duration: 2,
    x: -50 },
    {
      opacity: 1,
    x: 0,
    delay,
    ease: "power3.out",
    scrollTrigger: {
      trigger: itemRef.current,
      start: "top 85%",
    },
  }
);

  }, [delay]);

  const content = href ? (
    <a
      href={href}
      className="group relative inline-block"
      target={href.startsWith("http") ? "_blank" : "_self"}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
    </a>
  ) : (
    <span>{children}</span>
  );

  return (
    <div ref={itemRef} className="relative">
      <motion.div
        whileHover={{ x: 10 }}
        className="flex items-start space-x-4 p-4 rounded-xl hover:bg-linear-to-r hover:from-white/10 hover:to-transparent transition-all duration-300 group"
      >
        <motion.div
          className="relative"
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-purple-500 to-pink-500 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
          <div className="relative text-2xl bg-linear-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {icon}
          </div>
        </motion.div>

        <div className="flex-1">
          <h4 className="font-bold text-lg mb-2 bg-linear-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            {title}
          </h4>
          <div className="text-gray-600 dark:text-gray-300">
            {content}
          </div>
        </div>

        <motion.div
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <FaPaperPlane className="text-purple-500" />
        </motion.div>
      </motion.div>
    </div>
  );
};