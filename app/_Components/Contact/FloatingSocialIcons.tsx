"use client";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export const FloatingSocialIcons = () => {
  const socialLinks = [
    { icon: <FaInstagram />, href: "https://www.instagram.com/khan____0086/", color: "from-pink-500 to-purple-500" },
    { icon: <FaLinkedin />, href: "/", color: "from-blue-500 to-blue-700" },
    { icon: <FaGithub />, href: "https://github.com/FIROZKHAN086", color: "from-gray-700 to-gray-900" },
    { icon: <FaTwitter />, href: "/", color: "from-blue-400 to-blue-600" }
  ];

  return (
    <div className="fixed hidden md:block  left-6 bottom-6 z-40 space-y-4">
      {socialLinks.map((social, index) => (
        <motion.a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-12 h-12 rounded-full bg-gradient-to-br ${social.color} shadow-lg flex items-center justify-center text-white`}
          whileHover={{ scale: 1.2, y: -5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          aria-label={`${social.icon.type.displayName} profile`}
        >
          {social.icon}
        </motion.a>
      ))}
    </div>
  );
};