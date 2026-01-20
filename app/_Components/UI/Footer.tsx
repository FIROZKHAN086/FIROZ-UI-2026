"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FaGithub, FaInstagram, FaFacebookF, FaLinkedinIn, 
  FaArrowRight, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaTwitter, FaYoutube, FaDribbble, FaBehance,
  FaHeart, FaRocket
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { 
  Mail, Phone, MapPin, ArrowRight, Send, 
  ChevronRight, Sparkles, Zap, Globe, Code,
  Heart, Shield, Lock, Sun, Moon
} from "lucide-react";
import { useTheme } from "next-themes";


type ThemeName = "light" | "dark";

export default function Footer() {

  const [email, setEmail] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  
  
  const {theme, setTheme} = useTheme();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate subscription
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  const scrollToSection = (id:string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = [
    { label: "Home", href: "home", icon: <HiSparkles  /> },
    { label: "Projects", href: "projects", icon: <Code size={14} /> },
    { label: "About", href: "about", icon: <FaRocket /> },
    { label: "Skills", href: "skills", icon: <Zap size={14} /> },
    { label: "Testimonials", href: "testimonials", icon: <Heart size={14} /> },
    { label: "Contact", href: "contact", icon: <Mail size={14} /> },
  ];

  const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/FIROZKHAN086", label: "GitHub", color: `${theme === "dark" ? "#ffffff" : "#000000"}` },
    { icon: <FaInstagram />, href: "https://www.instagram.com/khan____0086/", label: "Instagram", color: "#E1306C" },
    { icon: <FaLinkedinIn />, href: "https://linkedin.com", label: "LinkedIn", color: "#0077B5" },
    { icon: <FaTwitter />, href: "https://twitter.com", label: "Twitter", color: "#1DA1F2" },
    { icon: <FaDribbble />, href: "https://dribbble.com", label: "Dribbble", color: "#EA4C89" },
    { icon: <FaYoutube />, href: "https://youtube.com", label: "YouTube", color: "#FF0000" },
  ];

  const contactInfo = [
    { icon: <Mail size={16} />, text: "firozkhan192006@gmail.com", href: "mailto:firozkhan192006@gmail.com" },
    { icon: <Phone size={16} />, text: "+91 6377047189", href: "tel:+916377047189" },
    { icon: <MapPin size={16} />, text: "Jhunjhunu, Rajasthan, India", href: null },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
  ];

  type ThemeConfig = {
  bg: string;
  card: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  gradientBorder: string;
  shadow: string;
  overlay: string;
};

  
  const themes:Record<ThemeName, ThemeConfig> = {
    dark: {
      bg: "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950",
      card: "bg-gradient-to-br from-gray-900/80 to-gray-800/80",
      border: "border-gray-800",
      textPrimary: "text-gray-100",
      textSecondary: "text-gray-400",
      textMuted: "text-gray-600",
      accent: "from-purple-600 via-pink-500 to-rose-500",
      accentHover: "from-purple-700 via-pink-600 to-rose-600",
      gradientBorder: "border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500",
      shadow: "shadow-2xl shadow-purple-500/10",
      overlay: "bg-gradient-to-t from-gray-950 to-transparent",
    },
    light: {
      bg: "bg-gradient-to-br from-gray-50 via-white to-blue-50",
      card: "bg-gradient-to-br from-white/90 to-gray-50/90",
      border: "border-gray-200",
      textPrimary: "text-gray-900",
      textSecondary: "text-gray-600",
      textMuted: "text-gray-400",
      accent: "from-blue-600 via-purple-500 to-pink-500",
      accentHover: "from-blue-700 via-purple-600 to-pink-600",
      gradientBorder: "border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
      shadow: "shadow-2xl shadow-blue-500/10",
      overlay: "bg-gradient-to-t from-white to-transparent",
    }
  };

   const currentThemeName: ThemeName = (theme ?? "light") as ThemeName;
  const currentTheme = themes[currentThemeName];

  return (
    <footer className={`relative overflow-hidden ${currentTheme.bg} transition-all duration-500`}>
      
      
{theme === 'dark' &&(<><div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl animate-pulse" />
  <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse" /></>)}
{theme === 'light' &&(<>
 <div className="absolute inset-0 bg-gradient-to-r from-rose-50 via-white to-sky-50"></div>

  </>)}
   
   

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand & Newsletter - Span 5 columns */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            {/* Brand Logo */}
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${currentTheme.accent} blur-xl opacity-50`} />
                <div className={`relative p-3 rounded-2xl backdrop-blur-sm border ${currentTheme.border}`}>
                  <Code className={`w-8 h-8 ${theme === 'dark' ? 'text-purple-400' : 'text-blue-500'}`} />
                </div>
              </motion.div>
              <div>
                <h2 className={`text-3xl font-bold ${currentTheme.textPrimary}`}>
                  Firoz<span className="text-transparent bg-gradient-to-r bg-clip-text ${currentTheme.accent}">.dev</span>
                </h2>
                <p className={`text-sm ${currentTheme.textSecondary} mt-1`}>Building Digital Experiences</p>
              </div>
            </div>

            <p className={`${currentTheme.textSecondary} mb-8 max-w-md leading-relaxed`}>
              Creating stunning digital experiences with cutting-edge technologies. 
              Let&apos;s collaborate and build something amazing together.
            </p>

            {/* Newsletter */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Send className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-blue-500'}`} />
                <h3 className={`font-semibold ${currentTheme.textPrimary}`}>Stay Updated</h3>
              </div>
              
              <motion.form
                onSubmit={handleSubscribe}
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${currentTheme.accent} blur-lg opacity-30`} />
                <div className={`relative flex flex-col sm:flex-row gap-3 p-1 rounded-2xl backdrop-blur-sm border ${currentTheme.border}`}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`flex-1 px-5 py-3 rounded-xl ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-white/50'} border ${currentTheme.border} ${currentTheme.textPrimary} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30`}
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubscribed}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-xl font-medium transition-all bg-gradient-to-r ${currentTheme.accent} hover:${currentTheme.accentHover} text-white ${currentTheme.shadow}`}
                  >
                    {isSubscribed ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <HiSparkles  />
                        </motion.div>
                        Subscribed!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Subscribe
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </motion.button>
                </div>
              </motion.form>
              
              <p className={`text-xs ${currentTheme.textMuted} mt-3`}>
                Join {Math.floor(Math.random() * 500) + 1000}+ subscribers
              </p>
            </div>

          </motion.div>

          {/* Quick Links - Span 3 columns */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <Zap className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className={`text-xl font-bold ${currentTheme.textPrimary}`}>Quick Links</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {footerLinks.map((link, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  onMouseEnter={() => setHoveredLink(index)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative p-3 rounded-xl text-left transition-all ${
                    currentTheme.card
                  } border ${
                    currentTheme.border
                  } ${currentTheme.textSecondary} hover:${currentTheme.textPrimary} group`}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={hoveredLink === index ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {link.icon}
                    </motion.div>
                    <span className="font-medium">{link.label}</span>
                  </div>
                  <motion.div
                    className={`absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 ${
                      theme === 'dark' ? 'text-purple-400' : 'text-blue-500'
                    }`}
                    initial={{ x: -10 }}
                    animate={{ x: hoveredLink === index ? 0 : -10 }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Contact & Social - Span 4 columns */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className={`text-xl font-bold ${currentTheme.textPrimary}`}>Get In Touch</h3>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                info.href ? (
                  <a
                    key={index}
                    href={info.href}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all ${currentTheme.card} border ${currentTheme.border} ${currentTheme.textSecondary} hover:${currentTheme.textPrimary} hover:shadow-lg group`}
                  >
                    <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-blue-500/10'}`}>
                      {info.icon}
                    </div>
                    <span className="font-medium">{info.text}</span>
                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ) : (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-3 rounded-xl ${currentTheme.card} border ${currentTheme.border} ${currentTheme.textSecondary}`}
                  >
                    <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-blue-500/10'}`}>
                      {info.icon}
                    </div>
                    <span className="font-medium">{info.text}</span>
                  </div>
                )
              ))}
            </div>

            {/* Social Media */}
            <div>
              <h4 className={`font-semibold mb-4 ${currentTheme.textPrimary}`}>Connect With Me</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative group p-3 rounded-xl ${currentTheme.card} border ${currentTheme.border} transition-all`}
                    style={{ color: social.color }}
                  >
                    <div className="relative z-10 text-xl ">{social.icon}</div>
                    
                   
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} shadow-lg`}>
                      {social.label}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-inherit" />
                    </div>
                    
                    
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                         style={{ backgroundColor: social.color, opacity: 0.2 }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative my-12"
        >
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/20 to-transparent blur-sm`} />
          <hr className={`border ${currentTheme.border} relative`} />
        </motion.div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-center md:text-left ${currentTheme.textMuted} text-sm`}
          >
            <div className="flex items-center gap-2 text-black dark:text-white ">
              <span>&copy; {new Date().getFullYear()} Firoz.dev</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> in Next.js
              </span>
            </div>
            <p className="mt-2 text-xs text-black dark:text-white">All rights reserved • </p>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-6 justify-center"
          >
            {legalLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                whileHover={{ y: -2 }}
                className={`text-sm ${currentTheme.textSecondary} hover:${currentTheme.textPrimary} transition-colors relative group`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${currentTheme.accent} group-hover:w-full transition-all duration-300`} />
              </motion.a>
            ))}
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`text-xs ${currentTheme.textMuted} flex items-center gap-2`}
          >
            <span className="hidden sm:inline text-black dark:text-white">Built with:</span>
            <div className="flex gap-2">
              <span className="px-2 py-1 rounded-md bg-gray-800/30 dark:bg-gray-800/50 text-black dark:text-white ">React</span>
              <span className="px-2 py-1 rounded-md bg-gray-800/30 dark:bg-gray-800/50 text-black dark:text-white ">Next.js</span>
              <span className="px-2 py-1 rounded-md bg-gray-800/30 dark:bg-gray-800/50 text-black dark:text-white ">Tailwind</span>
            </div>
          </motion.div>
        </div>

      
      </div>

      {/* Bottom Gradient Overlay */}
      <div className={`absolute bottom-0 left-0 w-full h-32 ${currentTheme.overlay}`} />
    </footer>
  );
}