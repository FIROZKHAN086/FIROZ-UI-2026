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
  Heart, Shield, Lock
} from "lucide-react";

export default function Footer() {

  const [email, setEmail] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = [
    { label: "Home", href: "home", icon: <HiSparkles /> },
    { label: "Projects", href: "projects", icon: <Code size={14} /> },
    { label: "About", href: "about", icon: <FaRocket /> },
    { label: "Skills", href: "skills", icon: <Zap size={14} /> },
    { label: "Testimonials", href: "testimonials", icon: <Heart size={14} /> },
    { label: "Contact", href: "contact", icon: <Mail size={14} /> },
  ];

  const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/FIROZKHAN086", label: "GitHub", color: "#faf8f0" },
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

  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] transition-all duration-500">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#a78bfa]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#3b82f6]/10 rounded-full blur-3xl animate-pulse" />

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Brand & Newsletter */}
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
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#a78bfa] to-[#ec4899] blur-lg opacity-50" />
                <div className="relative p-3 rounded-2xl backdrop-blur-sm border border-[#faf8f0]/10">
                  <Code className="w-8 h-8 text-[#a78bfa]" />
                </div>
              </motion.div>
              <div>
                <h2 className="text-3xl font-bold text-[#faf8f0]">
                  Firoz<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#ec4899]">.dev</span>
                </h2>
                <p className="text-sm text-[#faf8f0]/60 mt-1">Building Digital Experiences</p>
              </div>
            </div>

            <p className="text-[#faf8f0]/60 mb-8 max-w-md leading-relaxed">
              Creating stunning digital experiences with cutting-edge technologies.
              Let's collaborate and build something amazing together.
            </p>

            {/* Newsletter */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Send className="w-5 h-5 text-[#a78bfa]" />
                <h3 className="font-semibold text-[#faf8f0]">Stay Updated</h3>
              </div>

              <motion.form
                onSubmit={handleSubscribe}
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#a78bfa]/10 to-[#ec4899]/10 blur-lg opacity-30" />
                <div className="relative flex flex-col sm:flex-row gap-3 p-1 rounded-2xl backdrop-blur-sm border border-[#faf8f0]/10">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-3 rounded-xl bg-[#111111]/50 border border-[#faf8f0]/10 text-[#faf8f0] placeholder-[#faf8f0]/40 focus:outline-none focus:ring-2 focus:ring-[#a78bfa]/30"
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubscribed}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-xl font-medium transition-all bg-gradient-to-r from-[#a78bfa] to-[#ec4899] text-[#0a0a0a] shadow-lg shadow-[#a78bfa]/30"
                  >
                    {isSubscribed ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <HiSparkles />
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

              <p className="text-xs text-[#faf8f0]/40 mt-3">
                Join {Math.floor(Math.random() * 500) + 1000}+ subscribers
              </p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#a78bfa]/10">
                <Zap className="w-5 h-5 text-[#a78bfa]" />
              </div>
              <h3 className="text-xl font-bold text-[#faf8f0]">Quick Links</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {footerLinks.map((link, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  onMouseEnter={() => setHoveredLink(index)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative p-3 rounded-xl text-left transition-all bg-[#111111]/50 border border-[#faf8f0]/10 text-[#faf8f0]/60 hover:text-[#faf8f0] group"
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-[#a78bfa]"
                    initial={{ x: -10 }}
                    animate={{ x: hoveredLink === index ? 0 : -10 }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#3b82f6]/10">
                <Mail className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <h3 className="text-xl font-bold text-[#faf8f0]">Get In Touch</h3>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                info.href ? (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-4 p-3 rounded-xl transition-all bg-[#111111]/50 border border-[#faf8f0]/10 text-[#faf8f0]/60 hover:text-[#faf8f0] hover:shadow-lg group"
                  >
                    <div className="p-2 rounded-lg bg-[#a78bfa]/10">
                      {info.icon}
                    </div>
                    <span className="font-medium">{info.text}</span>
                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ) : (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-xl bg-[#111111]/50 border border-[#faf8f0]/10 text-[#faf8f0]/60"
                  >
                    <div className="p-2 rounded-lg bg-[#a78bfa]/10">
                      {info.icon}
                    </div>
                    <span className="font-medium">{info.text}</span>
                  </div>
                )
              ))}
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-4 text-[#faf8f0]">Connect With Me</h4>
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
                    className="relative group p-3 rounded-xl bg-[#111111]/50 border border-[#faf8f0]/10 transition-all"
                    style={{ color: social.color }}
                  >
                    <div className="relative z-10 text-xl">{social.icon}</div>

                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-[#111111] text-[#faf8f0] shadow-lg">
                      {social.label}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-inherit" />
                    </div>

                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-lg"
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
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#faf8f0]/20 to-transparent blur-sm" />
          <hr className="border-[#faf8f0]/10 relative" />
        </motion.div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center md:text-left text-[#faf8f0]/60 text-sm"
          >
            <div className="flex items-center gap-2">
              <span>&copy; {new Date().getFullYear()} Firoz.dev</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> in Next.js
              </span>
            </div>
            <p className="mt-2 text-xs text-[#faf8f0]/40">All rights reserved • </p>
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
                className="text-sm text-[#faf8f0]/60 hover:text-[#faf8f0] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a78bfa] to-[#ec4899] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xs text-[#faf8f0]/40 flex items-center gap-2"
          >
            <span className="hidden sm:inline">Built with:</span>
            <div className="flex gap-2">
              <span className="px-2 py-1 rounded-md bg-[#111111]/50 border border-[#faf8f0]/10 text-[#faf8f0]/60">React</span>
              <span className="px-2 py-1 rounded-md bg-[#111111]/50 border border-[#faf8f0]/10 text-[#faf8f0]/60">Next.js</span>
              <span className="px-2 py-1 rounded-md bg-[#111111]/50 border border-[#faf8f0]/10 text-[#faf8f0]/60">Tailwind</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </footer>
  );
}
