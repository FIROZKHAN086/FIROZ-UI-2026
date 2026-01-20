'use client';
import { motion } from "framer-motion"; 
import { ReactNode } from "react";

type AnimatedInputProps = {
  children: ReactNode;
  delay?: number;
};

 export const AnimatedInput = ({ children, delay = 0 }: AnimatedInputProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay, 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -2 }}
    >
      {children}
    </motion.div>
  );
};
