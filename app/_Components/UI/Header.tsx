'use client';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaArrowRight, 
  FaBars, 
  FaTimes,
  FaDownload,
  FaChevronDown,
  FaRocket,
  FaCode,
  FaPalette
} from "react-icons/fa";
import { FiMail, FiGithub, FiLinkedin, FiFileText, FiHome, FiUser, FiBriefcase, FiSettings, FiGlobe } from "react-icons/fi";
import { SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";
import { useTheme } from "next-themes";
import { MoonStar, Sun } from "lucide-react";
import Link from "next/link";


const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={{ scale: isHovered ? 1.1 : 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <motion.button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center
                   bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800
                   border-2 border-gray-200/50 dark:border-gray-700/50
                   shadow-lg shadow-gray-300/30 dark:shadow-black/40
                   hover:shadow-xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/10
                   backdrop-blur-sm overflow-hidden group"
        aria-label="Toggle Theme"
        whileTap={{ scale: 0.9 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-500/10 to-pink-600/0"
          animate={{
            x: isHovered ? ["0%", "100%"] : "0%",
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "linear"
          }}
        />
        
        {/* Technology particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-purple-500/30"
              initial={{ y: -20, x: Math.random() * 60 }}
              animate={{
                y: [0, 80],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>

        {/* Sun/Moon with tech icons */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {theme === "dark" ? (
              <motion.div
                key="moon"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="relative w-6 h-6 rounded-full bg-white shadow-lg shadow-yellow-500/30">
                  {/* Tech icon inside sun */}
                  <Sun className="absolute inset-0 m-auto w-3 h-3 text-gray-900" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg shadow-black/40">
                  {/* Tech icon inside moon */}
                  <MoonStar className="absolute inset-0 m-auto w-3 h-3 text-gray-300" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent"
          animate={{
            boxShadow: isHovered 
              ? theme === "dark"
                ? "0 0 30px rgba(168, 85, 247, 0.3)"
                : "0 0 30px rgba(139, 92, 246, 0.2)"
              : "none"
          }}
        />
      </motion.button>


      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2
                   bg-gray-900/90 dark:bg-gray-800/90 backdrop-blur-md
                   text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap
                   border border-gray-700/50 shadow-lg"
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900/90 dark:bg-gray-800/90 rotate-45" />
      </motion.div>
    </motion.div>
  );
};


const TechStack = () => {
  const [hoveredTech, setHoveredTech] = useState(null);
  const techs = [
    { icon: SiNextdotjs, label: "Next.js", color: "text-gray-800 dark:text-white" },
    { icon: SiTypescript, label: "TypeScript", color: "text-blue-600 dark:text-blue-400" },
    { icon: SiTailwindcss, label: "Tailwind", color: "text-cyan-500 dark:text-cyan-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="hidden lg:flex items-center gap-2 ml-4"
    >
      <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl
                     bg-white/50 dark:bg-gray-900/50 backdrop-blur-md
                     border border-gray-200/30 dark:border-gray-700/50
                     shadow-lg shadow-black/5 dark:shadow-black/30">
        <FaCode className="w-3 h-3 text-purple-500 mr-1" />
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 mr-2">
          Stack
        </span>
        
    

        {techs.map((tech, index) => (
          <motion.div
            key={tech.label}
            className="relative"
            onMouseEnter={() => setHoveredTech(index)}
            onMouseLeave={() => setHoveredTech(null)}
            whileHover={{ scale: 1.2, y: -2 }}
          >
            <tech.icon className={`w-5 h-5 ${tech.color} transition-all duration-300`} />
            
            {/* Tooltip */}
            <AnimatePresence>
              {hoveredTech === index && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2
                           bg-gray-900/90 dark:bg-gray-800/90 backdrop-blur-md
                           text-white text-xs px-2 py-1 rounded whitespace-nowrap
                           border border-gray-700/50 shadow-lg z-50"
                >
                  {tech.label}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900/90 dark:bg-gray-800/90 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};


type NavLinkProps = {
    to:string;
    label:string;
    scrollTo?: () => void;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const NavLink = ({ to, label, scrollTo, icon: Icon }:NavLinkProps) => {
  const isActive = location.pathname === to;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {scrollTo ? (
        <button onClick={scrollTo} className="relative">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                        bg-white/0 dark:bg-white/0
                        hover:bg-white/80 dark:hover:bg-gray-800/80
                        backdrop-blur-sm transition-all duration-300
                        border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50
                        group">
            
            {/* Icon with animation */}
            {Icon && (
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.5, ease: "backOut" }}
              >
                <Icon className={`w-4 h-4 transition-colors duration-300
                  ${isActive 
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                  }`} />
              </motion.div>
            )}
            
            {/* Text with gradient */}
            <span className={`text-sm font-semibold transition-all duration-300
              ${isActive 
                ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
                : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
              }`}>
              {label}
            </span>
            
            {/* Active/Hover indicator */}
            <motion.div
              layoutId={`nav-${label}`}
              className={`absolute inset-0 rounded-xl -z-10
                ${isActive 
                  ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                  : "group-hover:bg-white/50 dark:group-hover:bg-gray-800/50"
                }`}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </button>
      ) : (
        
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                        bg-white/0 dark:bg-white/0
                        hover:bg-white/80 dark:hover:bg-gray-800/80
                        backdrop-blur-sm transition-all duration-300
                        border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50
                        group cursor-pointer">
            
            {/* Icon with animation */}
            {Icon && (
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.5, ease: "backOut" }}
              >
                <Icon className={`w-4 h-4 transition-colors duration-300
                  ${isActive 
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                  }`} />
              </motion.div>
            )}
            
            {/* Text with gradient */}
            <span className={`text-sm font-semibold transition-all duration-300
              ${isActive 
                ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
                : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
              }`}>
             <Link href={to}>{label}</Link>
            </span>
            
            {/* Active/Hover indicator */}
            <motion.div
              layoutId={`nav-${label}`}
              className={`absolute inset-0 rounded-xl -z-10
                ${isActive 
                  ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                  : "group-hover:bg-white/50 dark:group-hover:bg-gray-800/50"
                }`}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
       
      )}
    </motion.div>
  );
};

/* -------------------- Social Icon Button -------------------- */
const SocialIcon = ({ icon: Icon, href, label }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-12 h-12 rounded-xl flex items-center justify-center
                 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md
                 border border-gray-200/50 dark:border-gray-700/50
                 shadow-lg shadow-black/5 dark:shadow-black/30
                 hover:shadow-xl hover:shadow-purple-500/20
                 overflow-hidden group"
      aria-label={label}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-500/10 to-pink-600/0"
        animate={{
          x: isHovered ? ["0%", "100%"] : "0%",
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          ease: "linear"
        }}
      />
      
      {/* Icon */}
      <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300 
                      group-hover:text-purple-600 dark:group-hover:text-purple-400
                      transition-colors duration-300 relative z-10" />
      
      {/* Floating particles */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-purple-500"
                initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: Math.cos(i * 120 * Math.PI / 180) * 20,
                  y: Math.sin(i * 120 * Math.PI / 180) * 20
                }}
                transition={{ 
                  duration: 0.6,
                  delay: i * 0.1
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

/* -------------------- Main Header Component -------------------- */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id:string) => () => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const navItems = [
    { label: "Home", to: "/", icon: FiHome  },
    { label: "Projects", to: "/projects", icon: FiBriefcase  },
    { label: "About", action: scrollToSection("aboutt"), icon: FiUser  },
    { label: "Skills", action: scrollToSection("skill"), icon: FiSettings  },
    { label: "Contact", action: scrollToSection("contact"), icon: FiGlobe },
  ];

  const socialLinks = [
    { icon: FiGithub, href: "https://github.com/FIROZKHAN086", label: "GitHub" },
    { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FiMail, href: "mailto:firozkhan192006@gmail.com", label: "Email" },
  ];

  if (!mounted) return null;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500
        ${isScrolled
          ? "backdrop-blur-2xl bg-white/80 dark:bg-gray-900/90 py-3 shadow-2xl shadow-black/10 dark:shadow-black/40 border-b border-gray-200/30 dark:border-gray-800/50"
          : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl py-5"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group"
        >
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              {/* Animated logo container */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "backOut" }}
                className="relative"
              >
                {/* Outer glow ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-20 blur-md"
                />
                
                {/* Main logo */}
                <div className="relative w-14 h-14 rounded-2xl 
                              bg-gradient-to-br from-gray-900 to-black dark:from-gray-800 dark:to-gray-900
                              border-2 border-gray-700 dark:border-gray-600 
                              flex items-center justify-center 
                              shadow-2xl shadow-black/30 dark:shadow-black/60
                              overflow-hidden">
                  
                  {/* Inner gradient animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
                    animate={{ x: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  {/* Tech icon */}
                  <SiNextdotjs className="relative z-10 w-7 h-7 text-white" />
                  
                  {/* Small floating particles */}
                  {[...Array(2)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-white/30"
                      animate={{
                        y: [0, -10, 0],
                        x: i === 0 ? [0, -5, 0] : [0, 5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                    />
                  ))}
                </div>
              </motion.div>
              
              {/* Logo text with tech badge */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                      Firoz
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">.dev</span>
                  </span>
                  
                  {/* Tech badge */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="px-2 py-1 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                  >
                    <span className="text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      NEXT.js
                    </span>
                  </motion.div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium tracking-wide flex items-center gap-1">
                  <FaRocket className="w-3 h-3 text-purple-500" />
                  Full Stack Developer & UI/UX Designer
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Tech Stack Display */}
        <TechStack />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              label={item.label}
              scrollTo={item.action}
              icon={item.icon}
            />
          ))}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Social Icons */}
          <div className="flex items-center gap-2 mr-2">
            {socialLinks.map((link) => (
              <SocialIcon key={link.label} {...link} />
            ))}
          </div>
          
          {/* Resume Button */}
          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-3 rounded-xl font-semibold text-sm
                     bg-gradient-to-r from-gray-900 to-black dark:from-gray-800 dark:to-gray-900
                     text-white shadow-lg shadow-black/30 dark:shadow-black/50
                     hover:shadow-xl hover:shadow-purple-500/20
                     transition-all duration-300
                     flex items-center gap-2 group relative overflow-hidden"
          >
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-xl p-[1px]"
              animate={{
                background: ["linear-gradient(45deg, #8B5CF6, #EC4899, #8B5CF6)", 
                           "linear-gradient(45deg, #EC4899, #8B5CF6, #EC4899)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            />
            
            <div className="absolute inset-[1px] rounded-xl bg-gradient-to-r from-gray-900 to-black dark:from-gray-800 dark:to-gray-900" />
            
            <FiFileText className="w-4 h-4 text-white relative z-10 group-hover:animate-pulse" />
            <span className="relative z-10">Resume</span>
            <FaDownload className="w-3 h-3 text-white relative z-10 transform group-hover:translate-y-1 transition-transform duration-300" />
          </motion.a>
          
         
          <ThemeToggle />
          
        
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToSection("contact")}
            className="px-7 py-3 rounded-xl font-bold text-sm
                     bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500
                     text-white shadow-2xl shadow-purple-500/40
                     hover:shadow-3xl hover:shadow-purple-500/60
                     transition-all duration-300
                     flex items-center gap-2 group relative overflow-hidden"
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500"
              animate={{
                background: ["linear-gradient(45deg, #8B5CF6, #EC4899, #8B5CF6)", 
                           "linear-gradient(45deg, #EC4899, #8B5CF6, #EC4899)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            />
            
            {/* Sparkle particles */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.random() * 40 - 20,
                  y: Math.random() * 40 - 20
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
            
            <span className="relative z-10">Hire Me</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FaArrowRight className="w-3 h-3 relative z-10" />
            </motion.div>
            
            {/* Ripple effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-white/30"
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Theme Toggle */}
          <div className="scale-75">
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            className="relative w-12 h-12 rounded-xl flex items-center justify-center
                     bg-white/80 dark:bg-gray-800/80 backdrop-blur-md
                     border border-gray-200/50 dark:border-gray-700/50
                     shadow-lg shadow-black/5 dark:shadow-black/30
                     overflow-hidden group"
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-500/10 to-pink-600/0"
              animate={{
                x: isOpen ? ["0%", "100%"] : "0%",
              }}
              transition={{
                duration: 2,
                repeat: isOpen ? Infinity : 0,
                ease: "linear"
              }}
            />
            
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  className="relative z-10"
                >
                  <FaTimes className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -180, opacity: 0 }}
                  className="relative z-10"
                >
                  <FaBars className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu with enhanced animation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 dark:bg-black/70 backdrop-blur-sm lg:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-24 right-4 left-4 z-50 rounded-2xl 
                       bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl
                       border border-gray-200/40 dark:border-gray-800/60
                       shadow-2xl shadow-black/30 dark:shadow-black/60
                       overflow-hidden lg:hidden"
            >
              {/* Menu Header */}
              <div className="p-6 border-b border-gray-200/30 dark:border-gray-800/40">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                    <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      Navigation
                    </span>
                  </div>
                  <span className="text-xs px-3 py-1.5 rounded-full 
                                 bg-gradient-to-r from-purple-500/20 to-pink-500/20 
                                 text-purple-600 dark:text-purple-400 font-semibold">
                    Menu
                  </span>
                </div>
                
                {/* Tech Stack in Mobile */}
                <div className="flex items-center justify-center gap-3 mt-4">
                  <div className="flex items-center gap-2">
                    <SiNextdotjs className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    <SiTypescript className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <SiTailwindcss className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
                  </div>
                </div>
              </div>
              
              {/* Menu Items */}
              <div className="p-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={item.action || (() => setIsOpen(false))}
                    className="flex items-center gap-4 p-4 rounded-xl mb-2
                             hover:bg-gray-100/50 dark:hover:bg-gray-800/50
                             transition-colors duration-300 cursor-pointer
                             group relative overflow-hidden"
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Icon */}
                    <div className="relative z-10 p-2 rounded-lg 
                                  bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900
                                  border border-gray-200/50 dark:border-gray-700/50">
                      <item.icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </div>
                    
                    {/* Label */}
                    <span className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex-grow relative z-10">
                      {item.label}
                    </span>
                    
                    {/* Arrow */}
                    <FaChevronDown className="w-3 h-3 text-gray-400 transform -rotate-90 relative z-10" />
                  </motion.div>
                ))}
              </div>
              
              {/* Menu Footer */}
              <div className="p-6 border-t border-gray-200/30 dark:border-gray-800/40 bg-gradient-to-b from-transparent to-gray-100/30 dark:to-gray-900/30">
                {/* Social Links */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  {socialLinks.map((link) => (
                    <SocialIcon
                      key={link.label}
                      {...link}
                      className="!w-10 !h-10"
                    />
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.a
                    href="/resume.pdf"
                    download
                    whileTap={{ scale: 0.95 }}
                    className="col-span-1 px-4 py-3 rounded-xl font-semibold text-sm
                             bg-gradient-to-r from-gray-900 to-black dark:from-gray-800 dark:to-gray-900
                             text-white shadow-lg text-center
                             flex items-center justify-center gap-2"
                  >
                    <FiFileText className="w-4 h-4" />
                    Resume
                  </motion.a>
                  
                  <motion.button
                    onClick={scrollToSection("Contact")}
                    whileTap={{ scale: 0.95 }}
                    className="col-span-1 px-4 py-3 rounded-xl font-bold text-sm
                             bg-gradient-to-r from-purple-600 to-pink-600
                             text-white shadow-lg shadow-purple-500/30
                             text-center flex items-center justify-center gap-2"
                  >
                    Hire Me
                    <FaArrowRight className="w-3 h-3" />
                  </motion.button>
                </div>
                
                {/* Theme Info */}
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                                bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                    <FaPalette className="w-3 h-3 text-purple-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {theme === "dark" ? "Dark Mode" : "Light Mode"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}