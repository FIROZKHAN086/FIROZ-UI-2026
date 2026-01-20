'use client';
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { MdCheckCircle, MdError } from "react-icons/md";
import { gsap } from "gsap";
type FormStatusProps = {
  status: 'success' | 'error' | null;
  message: string;
};



export const FormStatus = ({ status, message }: FormStatusProps) => {
  const statusRef = useRef(null);
  
  useEffect(() => {
    if (statusRef.current) {
      gsap.fromTo(statusRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
    }
  }, [status]);

  if (!status) return null;

  return (
    <motion.div
      ref={statusRef}
      className={`rounded-xl p-4 mb-6 flex items-center space-x-3 ${
        status === 'success' 
          ? 'bg-green-500/10 border border-green-500/20' 
          : 'bg-red-500/10 border border-red-500/20'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {status === 'success' ? (
        <MdCheckCircle className="text-green-500 text-2xl" />
      ) : (
        <MdError className="text-red-500 text-2xl" />
      )}
      <span className={
        status === 'success' 
          ? 'text-green-600 dark:text-green-400' 
          : 'text-red-600 dark:text-red-400'
      }>
        {message}
      </span>
    </motion.div>
  );
};