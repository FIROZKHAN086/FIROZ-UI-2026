import { FaAnglesRight } from "react-icons/fa6";
import { motion } from "framer-motion";

interface ButtonProps {
  primary?: boolean;
  children: React.ReactNode;
  href?: string;
  noArrows?: boolean;
  onClick?: () => void;
}

export const Button = ({
  primary = true,
  children,
  noArrows = false,
onClick,

}: ButtonProps) => {
  return (
    <motion.div 
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className="relative group"
    >
      {/* Before/After Animation simulation with spans */}
      <span className="absolute -inset-0.5 bg-linear-to-r from-[#a78bfa] to-[#ec4899] rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-500"></span>
      <div
        onClick={onClick}
        className={`relative inline-flex gap-2 items-center px-6 py-3 font-medium rounded-xl transition-all duration-300  
        ${
          primary
            ? `text-[#0a0a0a] bg-linear-to-r from-[#a78bfa] to-[#ec4899] hover:shadow-lg hover:shadow-[#a78bfa]/30`
            : `backdrop-blur-sm border bg-[#111111]/50 text-[#faf8f0]/80 hover:bg-[#111111]/80 border-[#faf8f0]/10`
        }`}
      >
        {children}
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className={`${noArrows && 'hidden'}`}
        >
          <FaAnglesRight />
        </motion.span>
      </div>
    </motion.div>
  );
};