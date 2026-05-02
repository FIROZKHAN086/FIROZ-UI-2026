'use client';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowRight,
  FaBars,
  FaTimes,
  FaDownload,
  FaRocket,
  FaCode,
  FaPalette
} from "react-icons/fa";
import { FiMail, FiGithub, FiLinkedin, FiFileText, FiHome, FiUser, FiBriefcase, FiSettings, FiGlobe } from "react-icons/fi";
import { SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";
import Link from "next/link";

const TechStack = () => {
  const [hoveredTech, setHoveredTech] = useState<number | null>(null);
  const techs = [
    { icon: SiNextdotjs, label: "Next.js", color: "text-white" },
    { icon: SiTypescript, label: "TypeScript", color: "text-[#a78bfa]" },
    { icon: SiTailwindcss, label: "Tailwind", color: "text-[#06b6d4]" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="hidden lg:flex items-center gap-2 ml-4"
    >
      <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#111111]/80 backdrop-blur-md border border-[#faf8f0]/10 shadow-lg">
        <FaCode className="w-3 h-3 text-[#a78bfa] mr-1" />
        <span className="text-xs font-semibold text-[#faf8f0]/60 mr-2">
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
                           bg-[#111111]/90 backdrop-blur-md
                           text-[#faf8f0] text-xs px-2 py-1 rounded whitespace-nowrap
                           border border-[#faf8f0]/10 shadow-lg z-50"
                >
                  {tech.label}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#111111]/90 rotate-45" />
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
  to?: string;
  label: string;
  scrollTo?: () => void;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const NavLink = ({ to, label, scrollTo, icon: Icon }: NavLinkProps) => {
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
                        bg-transparent
                        hover:bg-[#111111]/80
                        backdrop-blur-sm transition-all duration-300
                        border border-transparent hover:border-[#faf8f0]/10
                        group">

            {/* Icon with animation */}
            {Icon && (
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.5, ease: "backOut" }}
              >
                <Icon className={`w-4 h-4 transition-colors duration-300
                  text-[#faf8f0]/40 group-hover:text-[#faf8f0]/80
                `} />
              </motion.div>
            )}

            {/* Text */}
            <span className="text-sm font-semibold text-[#faf8f0]/70 group-hover:text-[#faf8f0] transition-all duration-300">
              {label}
            </span>

            {/* Hover indicator */}
            <motion.div
              className="absolute inset-0 rounded-xl -z-10
                group-hover:bg-[#a78bfa]/5
              "
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </button>
      ) : (

        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                          bg-transparent
                          hover:bg-[#111111]/80
                          backdrop-blur-sm transition-all duration-300
                          border border-transparent hover:border-[#faf8f0]/10
                          group cursor-pointer">

          {/* Icon with animation */}
          {Icon && (
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              <Icon className={`w-4 h-4 transition-colors duration-300
                text-[#faf8f0]/40 group-hover:text-[#f8f0]/80
              `} />
            </motion.div>
          )}

          {/* Text */}
          <span className="text-sm font-semibold text-[#faf8f0]/70 group-hover:text-[#faf8f0] transition-all duration-300">
            <Link href={to ?? "/"}>{label}</Link>
          </span>

          {/* Hover indicator */}
          <motion.div
            className="absolute inset-0 rounded-xl -z-10
              group-hover:bg-[#a78bfa]/5
            "
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      )}
    </motion.div>
  );
};

type SocialIconProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  label: string;
};

const SocialIcon = ({ icon: Icon, href, label }: SocialIconProps) => {
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
                 bg-[#111111]/80 backdrop-blur-md
                 border border-[#faf8f0]/10
                 shadow-lg shadow-black/30
                 hover:shadow-xl hover:shadow-[#a78bfa]/20
                 overflow-hidden group"
      aria-label={label}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#a78bfa]/0 via-[#a78bfa]/10 to-[#ec4899]/0"
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
      <Icon className="w-5 h-5 text-[#faf8f0]/60
                      group-hover:text-[#a78bfa]
                      transition-colors duration-300 relative z-10" />

      {/* Floating particles */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#a78bfa]"
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

/* ------------------- Main Header Component ------------------- */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => () => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const navItems = [
    { label: "Home", to: "/", icon: FiHome },
    { label: "Projects", to: "/projects", icon: FiBriefcase },
    { label: "About", action: scrollToSection("aboutt"), icon: FiUser },
    { label: "Skills", action: scrollToSection("skill"), icon: FiSettings },
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
          ? "backdrop-blur-2xl bg-[#0a0a0a]/90 py-3 shadow-2xl shadow-black/40 border-b border-[#faf8f0]/5"
          : "bg-[#0a0a0a]/70 backdrop-blur-xl py-5"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
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
                  className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#a78bfa] via-[#ec4899] to-[#a78bfa] opacity-20 blur-md"
                />

                {/* Main logo */}
                <div className="relative w-14 h-14 rounded-2xl
                              bg-[#111111]
                              border-2 border-[#faf8f0]/10
                              flex items-center justify-center
                              shadow-2xl shadow-black/60
                              overflow-hidden">

                  {/* Inner gradient animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#a78bfa]/20 to-[#ec4899]/20"
                    animate={{ x: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Tech icon */}
                  <SiNextdotjs className="relative z-10 w-7 h-7 text-[#faf8f0]" />

                  {/* Small floating particles */}
                  {[...Array(2)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-[#faf8f0]/30"
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

              {/* Logo text */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#ec4899] to-[#a78bfa] animate-gradient-x">
                      Firoz
                    </span>
                    <span className="text-[#faf8f0]">.dev</span>
                  </span>

                  {/* Tech badge */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="px-2 py-1 rounded-lg bg-[#a78bfa]/10 border border-[#a78bfa]/20"
                  >
                    <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#ec4899]">
                      NEXT.js
                    </span>
                  </motion.div>
                </div>
                <span className="text-sm text-[#faf8f0]/60 font-medium tracking-wide flex items-center gap-1">
                  <FaRocket className="w-3 h-3 text-[#a78bfa]" />
                  Full Stack Developer & UI/UX Designer
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

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
                     bg-[#111111] text-[#faf8f0]
                     shadow-lg shadow-black/30
                     hover:shadow-xl hover:shadow-[#a78bfa]/20
                     transition-all duration-300
                     flex items-center gap-2 group relative overflow-hidden"
          >
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-xl p-[1px]"
              animate={{
                background: ["linear-gradient(45deg, #a78bfa, #ec4899, #a78bfa)",
                           "linear-gradient(45deg, #ec4899, #a78bfa, #ec4899)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            />

            <div className="absolute inset-[1px] rounded-xl bg-[#111111]" />

            <FiFileText className="w-4 h-4 text-[#faf8f0] relative z-10 group-hover:animate-pulse" />
            <span className="relative z-10">Resume</span>
            <FaDownload className="w-3 h-3 text-[#faf8f0] relative z-10 transform group-hover:translate-y-1 transition-transform duration-300" />
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToSection("contact")}
            className="px-7 py-3 rounded-xl font-bold text-sm
                     bg-gradient-to-r from-[#a78bfa] via-[#a78bfa] to-[#ec4899]
                     text-[#0a0a0a] shadow-2xl shadow-[#a78bfa]/40
                     hover:shadow-3xl hover:shadow-[#a78bfa]/60
                     transition-all duration-300
                     flex items-center gap-2 group relative overflow-hidden"
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#a78bfa] via-[#ec4899] to-[#a78bfa]"
              animate={{
                background: ["linear-gradient(45deg, #a78bfa, #ec4899, #a78bfa)",
                           "linear-gradient(45deg, #ec4899, #a78bfa, #ec4899)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            />

            {/* Sparkle particles */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#0a0a0a]"
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
              <FaArrowRight className="w-3 h-3 relative z-10 text-[#0a0a0a]" />
            </motion.div>

            {/* Ripple effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-[#0a0a0a]/30"
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            className="relative w-12 h-12 rounded-xl flex items-center justify-center
                       bg-[#111111]/80 backdrop-blur-md
                       border border-[#faf8f0]/10
                       shadow-lg shadow-black/30
                       overflow-hidden group"
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#a78bfa]/0 via-[#a78bfa]/10 to-[#ec4899]/0"
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
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <FaTimes className="w-5 h-5 text-[#faf8f0]/80" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <FaBars className="w-5 h-5 text-[#faf8f0]/80" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-24 right-4 left-4 z-50 rounded-2xl
                        bg-[#111111]/95 backdrop-blur-2xl
                        border border-[#faf8f0]/10
                        shadow-2xl shadow-black/30
                        overflow-hidden lg:hidden"
            >
              {/* Menu Header */}
              <div className="p-6 border-b border-[#faf8f0]/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#a78bfa] to-[#ec4899]" />
                    <span className="text-lg font-bold text-[#faf8f0]">
                      Navigation
                    </span>
                  </div>
                  <span className="text-xs px-3 py-1.5 rounded-full
                                 bg-[#a78bfa]/10 text-[#a78bfa] font-semibold">
                    Menu
                  </span>
                </div>

                {/* Tech Stack in Mobile */}
                <div className="flex items-center justify-center gap-3 mt-4">
                  <div className="flex items-center gap-2">
                    <SiNextdotjs className="w-6 h-6 text-[#faf8f0]/80" />
                    <SiTypescript className="w-6 h-6 text-[#a78bfa]" />
                    <SiTailwindcss className="w-6 h-6 text-[#06b6d4]" />
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
                              hover:bg-[#a78bfa]/5
                              transition-colors duration-300 cursor-pointer
                              group relative overflow-hidden"
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#a78bfa]/0 via-[#a78bfa]/5 to-[#ec4899]/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Icon */}
                    <div className="relative z-10 p-2 rounded-lg
                                  bg-[#111111]
                                  border border-[#faf8f0]/10">
                      <item.icon className="w-4 h-4 text-[#faf8f0]/60" />
                    </div>

                    {/* Label */}
                    <span className="text-[#faf8f0]/80 font-semibold text-sm flex-grow relative z-10">
                      {item.label}
                    </span>

                    {/* Arrow */}
                    <FaArrowRight className="w-3 h-3 text-[#faf8f0]/40 transform -rotate-90 relative z-10" />
                  </motion.div>
                ))}
              </div>

              {/* Menu Footer */}
              <div className="p-6 border-t border-[#faf8f0]/5 bg-gradient-to-b from-transparent to-[#111111]/30">
                {/* Social Links */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  {socialLinks.map((link) => (
                    <SocialIcon
                      key={link.label}
                      {...link}
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
                              bg-[#111111] text-[#faf8f0]
                              shadow-lg text-center
                              flex items-center justify-center gap-2"
                  >
                    <FiFileText className="w-4 h-4" />
                    Resume
                  </motion.a>

                  <motion.button
                    onClick={scrollToSection("Contact")}
                    whileTap={{ scale: 0.95 }}
                    className="col-span-1 px-4 py-3 rounded-xl font-bold text-sm
                              bg-gradient-to-r from-[#a78bfa] to-[#ec4899]
                              text-[#0a0a0a] shadow-lg shadow-[#a78bfa]/30
                              text-center flex items-center justify-center gap-2"
                  >
                    Hire Me
                    <FaArrowRight className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
