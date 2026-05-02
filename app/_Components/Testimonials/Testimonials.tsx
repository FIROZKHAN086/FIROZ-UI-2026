"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Quote, Star } from "lucide-react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

// Testimonials data
const testimonials = [
  {
    name: "Rahul Sharma",
    role: "CEO, TechStart Inc.",
    image: "/firoz.jpeg",
    content: "Working with Firoz was an absolute pleasure. He transformed our vision into a stunning, high-performance web application that exceeded all our expectations.",
    rating: 5,
    project: "E-commerce Platform"
  },
  {
    name: "Priya Patel",
    role: "Marketing Director, GrowthMedia",
    image: "/firoz.jpeg",
    content: "Firoz's attention to detail and technical expertise helped us launch our platform weeks ahead of schedule. His code quality is exceptional.",
    rating: 5,
    project: "Marketing Dashboard"
  },
  {
    name: "Amit Kumar",
    role: "Founder, FoodExpress",
    image: "/firoz.jpeg",
    content: "The food delivery app Firoz built for us handles thousands of orders daily with zero downtime. His backend architecture is rock solid.",
    rating: 5,
    project: "Mobile App Development"
  }
];

export default function TestimonialsShow() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#faf8f0]/30 to-transparent" />
            <div className="px-4 py-2 rounded-full bg-[#111111]/50 border border-[#a78bfa]/30">
              <Sparkles className="inline-block w-4 h-4 mr-2 text-[#a78bfa]" />
              <span className="text-sm font-medium tracking-widest uppercase text-[#a78bfa]">
                Testimonials
              </span>
            </div>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#faf8f0]/30 to-transparent" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-[#faf8f0]">What Clients Say</span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#ec4899] to-[#a78bfa]">
              About My Work
            </span>
          </h2>
        </motion.div>

        {/* Testimonials Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            <div className="rounded-3xl p-8 md:p-12 glass border border-[#faf8f0]/10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-[#a78bfa]/30">
                    <img
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <Quote className="w-8 h-8 text-[#a78bfa]/40 mb-4 mx-auto md:mx-0" />

                  <p className="text-lg md:text-xl leading-relaxed mb-6 text-[#faf8f0]/80">
                    "{testimonials[activeIndex].content}"
                  </p>

                  {/* Rating */}
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4 text-[#f59e0b]" />
                    ))}
                  </div>

                  {/* Author */}
                  <div>
                    <h4 className="text-lg font-bold text-[#faf8f0]">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-sm text-[#faf8f0]/60">
                      {testimonials[activeIndex].role}
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs bg-[#a78bfa]/10 text-[#a78bfa] border border-[#a78bfa]/20">
                      {testimonials[activeIndex].project}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-gradient-to-r from-[#a78bfa] to-[#ec4899]'
                  : 'bg-[#faf8f0]/20 hover:bg-[#faf8f0]/40'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
