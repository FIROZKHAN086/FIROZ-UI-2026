'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaPaperPlane, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaInstagram } from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';
import {FloatingSocialIcons} from './FloatingSocialIcons';
import {FormStatus} from './FormStatus';
import {ContactInfoItem} from './ContactInfoItem';
import {AnimatedInput} from './AnimatedInput';



if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


export default function ContactSection() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<'success' | 'error' | 'sending' | null>(null);
  const [formMessage, setFormMessage] = useState<string>('');

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    
    gsap.utils.toArray('.text-reveal').forEach((text, i) => {
        if (typeof text === 'string') {
      gsap.from(text, {
        scrollTrigger: {
          trigger: text,
          start: "top 90%"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: i * 0.2,
        ease: "power3.out"
      });
    }});

    // Floating animation for cards
    gsap.utils.toArray('.float-card').forEach((card, i) => {
        if (typeof card === 'string') {

      gsap.to(card, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3
      });
    }});

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      setFormStatus('sending');
      setFormMessage('Sending your message...');

      const response = await fetch("https://formspree.io/f/mgvkrnjq", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        setFormMessage('Message sent successfully! I\'ll get back to you soon.');
        e.target.reset();
        
        // Success animation
        gsap.fromTo('.success-animation',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setFormStatus('error');
      setFormMessage('Failed to send message. Please try again or email directly.');
    }
  };

  return (
    <>
      
      <FloatingSocialIcons />
      
      <section
        ref={sectionRef}
        id="contact"
        className={`
          min-h-screen relative overflow-hidden
          ${theme === 'dark' 
            ? 'bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900' 
            : 'bg-gradient-to-b from-gray-50 via-purple-50/20 to-gray-50'
          }
        `}
      >
       {theme === 'dark' &&(<><div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl animate-pulse" />
  <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse" /></>)}
{theme === 'light' &&(<>
 <div className="absolute inset-0 bg-gradient-to-r from-rose-50 via-white to-sky-50"></div>

  </>)}
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          {/* Animated Title */}
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-reveal animate-bounce transition"
            style={{animationDuration: "3s"}}
            >
              <span className={`
                ${theme === 'dark' 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400' 
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600'
                }
              `}>
                Let&apos;s Create
              </span>
              <br />
              <span className="block mt-4">
                Something <span className="relative">
                  <span className={`
                    ${theme === 'dark' 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400' 
                      : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600'
                    }
                  `}>
                    Extraordinary
                  </span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </span>
              </span>
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Your vision, my expertise. Let&apos;s build something amazing that stands out.
              Have a project in mind or just want to chat about possibilities?
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            {/* Contact Form Card */}
            <motion.div 
              className="float-card order-2 lg:order-1"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`
                rounded-3xl p-8 shadow-2xl backdrop-blur-xl
                ${theme === 'dark' 
                  ? 'bg-gray-800/60 border border-gray-700/50' 
                  : 'bg-white/80 border border-gray-200/50'
                }
                transform transition-all duration-300 hover:shadow-3xl
              `}>
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-3xl font-bold">
                    <span className={`
                      ${theme === 'dark' 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' 
                        : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'
                      }
                    `}>
                      Send Message
                    </span>
                  </h3>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <FaPaperPlane className={`
                      text-3xl 
                      ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}
                    `} />
                  </motion.div>
                </div>

                <FormStatus status={formStatus} message={formMessage} />

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                  <input type="hidden" name="_replyto" value="firozkhan192006@gmail.com" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimatedInput delay={0.1}>
                      <div className="space-y-2">
                        <label className={`
                          font-semibold text-sm uppercase tracking-wider
                          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                        `}>
                          Your Name
                        </label>
                        <Input 
                          name="name" 
                          required 
                          placeholder="John Doe" 
                          className={`
                            rounded-xl py-6 px-4 text-lg border-2
                            ${theme === 'dark' 
                              ? 'bg-gray-700/50 border-gray-600 text-white focus:border-purple-500' 
                              : 'bg-white border-gray-300 focus:border-purple-500'
                            }
                            transition-all duration-300 focus:ring-2 focus:ring-purple-500/20
                          `}
                        />
                      </div>
                    </AnimatedInput>

                    <AnimatedInput delay={0.2}>
                      <div className="space-y-2">
                        <label className={`
                          font-semibold text-sm uppercase tracking-wider
                          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                        `}>
                          Email Address
                        </label>
                        <Input 
                          name="email" 
                          type="email" 
                          required 
                          placeholder="john@example.com"
                          className={`
                            rounded-xl py-6 px-4 text-lg border-2
                            ${theme === 'dark' 
                              ? 'bg-gray-700/50 border-gray-600 text-white focus:border-pink-500' 
                              : 'bg-white border-gray-300 focus:border-pink-500'
                            }
                            transition-all duration-300 focus:ring-2 focus:ring-pink-500/20
                          `}
                        />
                      </div>
                    </AnimatedInput>
                  </div>

                  <AnimatedInput delay={0.3}>
                    <div className="space-y-2">
                      <label className={`
                        font-semibold text-sm uppercase tracking-wider
                        ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                      `}>
                        Subject
                      </label>
                      <Input 
                        name="subject" 
                        placeholder="Project Inquiry"
                        className={`
                          rounded-xl py-6 px-4 text-lg border-2
                          ${theme === 'dark' 
                            ? 'bg-gray-700/50 border-gray-600 text-white focus:border-blue-500' 
                            : 'bg-white border-gray-300 focus:border-blue-500'
                          }
                          transition-all duration-300 focus:ring-2 focus:ring-blue-500/20
                        `}
                      />
                    </div>
                  </AnimatedInput>

                  <AnimatedInput delay={0.4}>
                    <div className="space-y-2">
                      <label className={`
                        font-semibold text-sm uppercase tracking-wider
                        ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                      `}>
                        Your Message
                      </label>
                      <Textarea 
                        name="message" 
                        required 
                        placeholder="Tell me about your project, timeline, and budget..."
                        rows={6}
                        className={`
                          rounded-xl py-4 px-4 text-lg border-2 resize-none
                          ${theme === 'dark' 
                            ? 'bg-gray-700/50 border-gray-600 text-white focus:border-cyan-500' 
                            : 'bg-white border-gray-300 focus:border-cyan-500'
                          }
                          transition-all duration-300 focus:ring-2 focus:ring-cyan-500/20
                        `}
                      />
                    </div>
                  </AnimatedInput>

                  <AnimatedInput delay={0.5}>
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          type="submit"
                          className={`
                            relative overflow-hidden group rounded-full px-10 py-6 text-lg font-semibold
                            bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600
                            text-white shadow-lg
                            hover:shadow-xl hover:from-purple-700 hover:via-pink-700 hover:to-purple-700
                            transition-all duration-300
                          `}
                          disabled={formStatus === 'sending'}
                        >
                          <span className="relative z-10 flex items-center space-x-2">
                            {formStatus === 'sending' ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                />
                                <span>Sending...</span>
                              </>
                            ) : (
                              <>
                                <FaPaperPlane />
                                <span>Send Message</span>
                              </>
                            )}
                          </span>
                          <span className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </Button>
                      </motion.div>
                      
                      <div className={`
                        text-sm flex items-center space-x-2
                        ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
                      `}>
                        <MdCheckCircle className="text-green-500" />
                        <span>Your data is encrypted and secure</span>
                      </div>
                    </div>
                  </AnimatedInput>
                </form>
              </div>
            </motion.div>

            {/* Contact Info Card */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Contact Information */}
              <motion.div 
                className="float-card"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`
                  rounded-3xl p-8 shadow-2xl backdrop-blur-xl
                  ${theme === 'dark' 
                    ? 'bg-gray-800/60 border border-gray-700/50' 
                    : 'bg-white/80 border border-gray-200/50'
                  }
                  transform transition-all duration-300 hover:shadow-3xl
                `}>
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-3xl font-bold">
                      <span className={`
                        ${theme === 'dark' 
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400' 
                          : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600'
                        }
                      `}>
                        Get In Touch
                      </span>
                    </h3>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </motion.div>
                  </div>

                  <div className="space-y-6">
                    <ContactInfoItem 
                      icon={<FaEnvelope />} 
                      title="Email Address" 
                      delay={0.1}
                      href="mailto:Firozkhan192006@gmail.com"
                    >
                      Firozkhan192006@gmail.com
                    </ContactInfoItem>

                    <ContactInfoItem 
                      icon={<FaPhone />} 
                      title="Phone Number" 
                      delay={0.2}
                      href="tel:+916377047189"
                    >
                      +91 6377047189
                    </ContactInfoItem>

                    <ContactInfoItem 
                      icon={<FaMapMarkerAlt />} 
                      title="Location" 
                      delay={0.3}
                    >
                      <div>
                        <p className="font-medium">Jhunjhunu, Rajasthan</p>
                        <p className="text-sm opacity-75">India</p>
                      </div>
                    </ContactInfoItem>

                    <ContactInfoItem 
                      icon={<FaClock />} 
                      title="Working Hours" 
                      delay={0.4}
                    >
                      <div>
                        <p className="font-medium">Monday - Saturday</p>
                        <p className="text-sm opacity-75">10:00 AM - 6:00 PM IST</p>
                      </div>
                    </ContactInfoItem>
                  </div>
                </div>
              </motion.div>

              {/* Availability Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="relative rounded-3xl p-8 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-20 translate-y-20"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold">Available for Work</h3>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-2 border-white/30 rounded-full"
                      >
                        <div className="w-2 h-2 bg-white rounded-full ml-1 mt-1"></div>
                      </motion.div>
                    </div>
                    
                    <p className="mb-8 text-lg opacity-90">
                      Currently accepting new projects and opportunities.
                      Let's collaborate and create something extraordinary together!
                    </p>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block"
                    >
                      <Button
                        className="bg-white text-purple-700 rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300"
                      >
                        <a
                          href="https://www.instagram.com/khan____0086/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2"
                        >
                          <FaInstagram />
                          <span>Connect on Instagram</span>
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className={`
                  rounded-3xl p-6 backdrop-blur-xl
                  ${theme === 'dark' 
                    ? 'bg-gray-800/40 border border-gray-700/30' 
                    : 'bg-white/60 border border-gray-200/30'
                  }
                `}
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Response Time', value: '< 24h' },
                    { label: 'Projects Done', value: '50+' },
                    { label: 'Satisfaction', value: '100%' },
                    { label: 'Support', value: '24/7' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -3 }}
                      className="text-center p-4 rounded-xl"
                      style={{
                        background: theme === 'dark' 
                          ? 'linear-gradient(135deg, rgba(107, 33, 168, 0.2) 0%, rgba(168, 85, 247, 0.1) 100%)'
                          : 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)'
                      }}
                    >
                      <div className={`
                        text-2xl font-bold mb-1
                        ${theme === 'dark' 
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' 
                          : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'
                        }
                      `}>
                        {stat.value}
                      </div>
                      <div className={`
                        text-sm font-medium
                        ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                      `}>
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Decorative bottom element */}
          <motion.div
            className="mt-32 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className={`
              inline-flex items-center space-x-2 px-6 py-3 rounded-full
              ${theme === 'dark' 
                ? 'bg-gray-800/50 text-gray-400' 
                : 'bg-white/50 text-gray-600'
              }
            `}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
              />
              <span className="text-sm">Always open to new opportunities</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        
        /* Selection color */
        ::selection {
          background: ${theme === 'dark' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(168, 85, 247, 0.2)'};
          color: ${theme === 'dark' ? '#ffffff' : '#000000'};
        }
      `}</style>
    </>
  );
}