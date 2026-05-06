"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { 
  FiMail, 
  FiGithub, 
  FiLinkedin, 
  FiTwitter, 
  FiMessageSquare,
  FiSend,
  FiMapPin,
  FiPhone,
  FiClock,
  FiGlobe
} from "react-icons/fi";
import { FaRocket, FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const ContactPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    subject: "Project Inquiry",
    message: ""
  });
  const[lodding,setLoading]= useState<boolean>(false);

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
setLoading(true);
  try {
    const formDataToSend = new FormData();

    formDataToSend.append("name", formdata.name);
    formDataToSend.append("email", formdata.email);
    formDataToSend.append("subject", formdata.subject);
    formDataToSend.append("message", formdata.message);

    // optional settings
    formDataToSend.append("_captcha", "false");
    formDataToSend.append("_template", "table");

    const res = await fetch(
      "https://formsubmit.co/ajax/firozkhan192006@gmail.com",
      {
        method: "POST",
        body: formDataToSend,
      }
    );

    if (res.ok) {
      toast.success("Message sent successfully! I'll get back to you soon.", {
        style: {
          background: "#111111",
          color: "#faf8f0",
          border: "1px solid rgba(167, 139, 250, 0.2)",
        },
        iconTheme: {
          primary: "#a78bfa",
          secondary: "#faf8f0",
        },
      });

      formRef.current?.reset();

      // reset state also (important 🔥)
      setFormData({
        name: "",
        email: "",
        subject: "Project Inquiry",
        message: "",
      });

      setLoading(false);

    } else {
      toast.error("Something went wrong. Try again.");
      setLoading(false);
    }
  } catch (error) {
    console.error(error);
    toast.error("Network error!");
    setLoading(false);
  }
};
  const contactInfo = [
    {
      icon: FiMail,
      label: "Email",
      value: "firozkhan192006@gmail.com",
      link: "mailto:firozkhan192006@gmail.com",
      color: "text-blue-400"
    },
    {
      icon: FiPhone,
      label: "Phone",
      value: "+91 6377047189",
      link: "tel:+916377047189",
      color: "text-green-400"
    },
    {
      icon: FiMapPin,
      label: "Location",
      value: "Rajasthan, India",
      link: "#",
      color: "text-red-400"
    },
    {
      icon: FiClock,
      label: "Working Hours",
      value: "Mon - Sat, 9am - 6pm",
      link: "#",
      color: "text-purple-400"
    }
  ];

  const socialLinks = [
    { icon: FiGithub, href: "https://github.com/FIROZKHAN086", label: "GitHub" },
    { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FiGlobe, href: "https://firozkhan.site", label: "Website" },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-4 overflow-hidden relative">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] bg-[#a78bfa]/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-[#ec4899]/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-[#a78bfa]/30 mb-6"
          >
            <FiMessageSquare className="text-[#a78bfa]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#a78bfa]">Get In Touch</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black mb-8 tracking-tighter"
          >
            Let&apos;s Build Your <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#a78bfa] via-[#ec4899] to-[#a78bfa] animate-gradient-x">
              Next Masterpiece
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#faf8f0]/60 max-w-2xl mx-auto"
          >
            Have a project in mind? Or just want to say hi? I&apos;m always open to new
            opportunities and interesting conversations.
          </motion.p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Info */}
          <section className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-6 rounded-3xl bg-[#111111]/50 border border-[#faf8f0]/10 hover:border-[#a78bfa]/30 transition-all duration-300 group"
                >
                  <info.icon className={`w-8 h-8 mb-4 ${info.color} group-hover:scale-110 transition-transform`} />
                  <h3 className="text-sm font-bold text-[#faf8f0]/40 uppercase tracking-widest mb-1">{info.label}</h3>
                  <a href={info.link} className="text-[#faf8f0] font-medium hover:text-[#a78bfa] transition-colors break-words">
                    {info.value}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Why Work With Me */}
            <div className="p-8 rounded-3xl bg-linear-to-br from-[#111111] to-transparent border border-[#faf8f0]/10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FaRocket className="text-[#ec4899]" /> Why Collaborate?
              </h3>
              <ul className="space-y-4">
                {[
                  "Rapid turnaround and clear communication",
                  "Performance-first development approach",
                  "Pixel-perfect responsive design systems",
                  "Post-launch support and optimization"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#faf8f0]/70">
                    <FaCheckCircle className="text-[#a78bfa] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-2xl bg-[#111111] border border-[#faf8f0]/10 flex items-center justify-center text-[#faf8f0]/60 hover:text-[#a78bfa] hover:border-[#a78bfa]/30 transition-all shadow-xl"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </section>

          {/* Right Column: Form */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 sm:p-10 rounded-[2.5rem] bg-[#111111] border border-[#faf8f0]/10 shadow-2xl relative"
          >
            {/* Form Background Accent */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#a78bfa,transparent)] rounded-[2.5rem]" />
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#faf8f0]/40 uppercase ml-2">Name</label>
                  <input
                    required
                    name="name"
                    onChange={(e) => setFormData({ ...formdata, name: e.target.value })}
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-[#0a0a0a] border border-[#faf8f0]/10 rounded-2xl px-6 py-4 text-[#faf8f0] focus:outline-none focus:border-[#a78bfa]/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#faf8f0]/40 uppercase ml-2">Email</label>
                  <input
                    required
                    name="email"
                    onChange={(e) => setFormData({ ...formdata, email: e.target.value })}
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-[#0a0a0a] border border-[#faf8f0]/10 rounded-2xl px-6 py-4 text-[#faf8f0] focus:outline-none focus:border-[#a78bfa]/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#faf8f0]/40 uppercase ml-2">Subject</label>
                <select
                  name="subject"
                  onChange={(e) => setFormData({ ...formdata, subject: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-[#faf8f0]/10 rounded-2xl px-6 py-4 text-[#faf8f0] focus:outline-none focus:border-[#a78bfa]/50 transition-all appearance-none"
                >
                  <option>Project Inquiry</option>
                  <option>Collaboration Request</option>
                  <option>General Message</option>
                  <option>Freelance Work</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#faf8f0]/40 uppercase ml-2">Message</label>
                <textarea
                  name="message"
                  onChange={(e) => setFormData({ ...formdata, message: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-[#faf8f0]/10 rounded-2xl px-6 py-4 text-[#faf8f0] focus:outline-none focus:border-[#a78bfa]/50 transition-all resize-none"
                 required
                  rows={5}
                  placeholder="Tell me about your vision..."
                   />
              </div>

              <motion.button
  whileHover={!lodding ? { scale: 1.02 } : {}}
  whileTap={!lodding ? { scale: 0.98 } : {}}
  type="submit"
  disabled={lodding}
  className={`w-full py-5 rounded-2xl bg-linear-to-r from-[#a78bfa] to-[#ec4899] text-[#0a0a0a] font-bold text-lg shadow-xl shadow-[#a78bfa]/20 flex items-center justify-center gap-3 group
    ${lodding ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-2xl transition-all duration-300'}`}
>
  {lodding ? (
    <>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-5 h-5 border-2 border-[#0a0a0a] border-t-transparent rounded-full"
      />
      <span>Sending...</span>
    </>
  ) : (
    <>
      Send Message
      <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
    </>
  )}
</motion.button>
            </form>
          </motion.section>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;

