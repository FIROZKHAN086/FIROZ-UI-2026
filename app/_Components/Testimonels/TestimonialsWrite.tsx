"use client";

import { useState, useEffect } from "react";
import { Star, Send, Sparkles, User, Briefcase, MessageSquare, CheckCircle, Award, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import axios from "axios";
type ThemeName = "light" | "dark";

type TestimonialForm = {
  name: string;
  role: string;
  message: string;
  rating: number;
};

export default function TestimonialsWrite() {
  const [form, setForm] = useState<TestimonialForm>({
    name: "",
    role: "",
    message: "",
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);


 const { theme, setTheme } = useTheme();



const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!form.name || !form.message) {
    alert("Please fill in all required fields");
    return;
  }

  try {
    setIsSubmitting(true);

    const newTestimonial = {
      id: Date.now(),
      ...form,
      date: new Date().toISOString(),
      avatarColor: getRandomColor(),
    };


    const res = await axios.post("/api/testimonials", newTestimonial);

  

    setIsSubmitted(true);
    setForm({ name: "", role: "", message: "", rating: 5 });

    setTimeout(() => setIsSubmitted(false), 3000);
  } catch (error) {
    console.error("Failed to submit testimonial:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    setIsSubmitting(false);
    window.location.reload();
  }
};

  const getRandomColor = () => {
    const colors = [
      "#6366f1", "#10b981", "#f59e0b", "#8b5cf6", 
      "#ef4444", "#06b6d4", "#ec4899", "#84cc16"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  type ThemeConfig = {
  bg: string;
  card: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  inputBg: string;
  shadow: string;
  glow: string;
};


  const themes:Record<ThemeName, ThemeConfig> = {
    dark: {
        bg: "bg-black",
        card: "bg-gray-900/90 backdrop-blur-md",
        border: "border-purple-500/20",
      textPrimary: "text-white",
      textSecondary: "text-gray-300",
      accent: "from-cyan-500 to-purple-600",
      inputBg: "bg-gray-800/50 border-gray-700",
      shadow: "shadow-2xl shadow-purple-500/10",
      glow: "0 0 40px rgba(168, 85, 247, 0.2)"
    },
    light: {
        bg: "bg-white",
      card: "bg-white/90 backdrop-blur-md",
      border: "border-purple-300/30",
      textPrimary: "text-gray-900",
      textSecondary: "text-gray-700",
      accent: "from-blue-500 to-purple-600",
      inputBg: "bg-white/80 border-gray-200",
      shadow: "shadow-2xl shadow-blue-500/10",
      glow: "0 0 40px rgba(99, 102, 241, 0.1)"
    }
  };

   const currentThemeName: ThemeName = (theme ?? "light") as ThemeName;
  const currentTheme = themes[currentThemeName];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <button
        type="button"
        key={i}
        onClick={() => setForm({ ...form, rating: i + 1 })}
        className="p-1 hover:scale-110 transition-transform duration-200"
      >
        <Star
          size={28}
          className={`transition-all duration-300 ${
            i < rating
              ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"
              : "text-gray-400 dark:text-gray-600"
          }`}
        />
      </button>
    ));
  };

  if (isSubmitted) {
    return (
      <section className={`min-h-[80vh] flex items-center justify-center p-4 ${currentTheme.bg}`}>
        <div className={`${currentTheme.card} ${currentTheme.border} border rounded-3xl p-12 text-center max-w-md ${currentTheme.shadow} backdrop-blur-xl`}>
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 blur-xl opacity-20 rounded-full" />
            <CheckCircle className="relative w-20 h-20 mx-auto text-emerald-500" />
          </div>
          
          <h2 className={`text-3xl font-bold mb-4 ${currentTheme.textPrimary}`}>
            Thank You! 🎉
          </h2>
          <p className={`mb-8 ${currentTheme.textSecondary}`}>
            Your testimonial has been submitted successfully. It will be visible shortly.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-sm text-emerald-500">Submitted Successfully</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`min-h-screen py-12 px-4 ${currentTheme.bg}`}>
   

      <div className="relative max-w-6xl mx-auto z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column - Form */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-400">Share Your Experience</span>
              </div>
              
              <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${currentTheme.textPrimary}`}>
                Write a 
                <span className="block text-transparent bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text">
                  Testimonial
                </span>
              </h1>
              
              <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl`}>
                Your feedback helps showcase the impact of my work and inspires others.
              </p>
            </div>

            <form 
              onSubmit={handleSubmit} 
              className={`${currentTheme.card} ${currentTheme.border} border rounded-3xl p-8 ${currentTheme.shadow} backdrop-blur-xl`}
              style={{ boxShadow: currentTheme.glow }}
            >
              {/* Name Field */}
              <div className="mb-6">
                <label className={`flex items-center gap-2 mb-2 text-sm font-medium ${currentTheme.textPrimary}`}>
                  <User className="w-4 h-4" />
                  Your Name *
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`relative w-full px-4 py-3 rounded-xl ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.textPrimary} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300`}
                    required
                  />
                </div>
              </div>

              {/* Role Field */}
              <div className="mb-6">
                <label className={`flex items-center gap-2 mb-2 text-sm font-medium ${currentTheme.textPrimary}`}>
                  <Briefcase className="w-4 h-4" />
                  Your Role / Company
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  <input
                    type="text"
                    placeholder="e.g., Product Manager at TechCorp"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className={`relative w-full px-4 py-3 rounded-xl ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.textPrimary} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300`}
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="mb-8">
                <label className={`flex items-center gap-2 mb-2 text-sm font-medium ${currentTheme.textPrimary}`}>
                  <MessageSquare className="w-4 h-4" />
                  Your Experience *
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  <textarea
                    placeholder="Share your experience working together..."
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`relative w-full px-4 py-3 rounded-xl ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.textPrimary} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 resize-none`}
                    required
                  />
                </div>
                <div className="mt-2 text-sm text-gray-500 flex justify-end">
                  {form.message.length}/500 characters
                </div>
              </div>

              {/* Rating */}
              <div className="mb-8">
                <label className={`block mb-3 text-sm font-medium ${currentTheme.textPrimary}`}>
                  How would you rate your experience?
                </label>
                <div className="flex items-center gap-1 justify-center p-4 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 dark:from-gray-800/30 dark:to-gray-900/30">
                  {renderStars(form.rating)}
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>Not Satisfied</span>
                  <span>Perfect!</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 hover:shadow-2xl hover:shadow-purple-500/30'
                }`}
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      Submit Testimonial
                    </>
                  )}
                </div>
                
                {!isSubmitting && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Guidelines */}
          <div className="lg:col-span-2">
            <div className={`${currentTheme.card} ${currentTheme.border} border rounded-3xl p-8 ${currentTheme.shadow} backdrop-blur-xl sticky top-8`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20">
                  <Award className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className={`text-xl font-bold ${currentTheme.textPrimary}`}>
                  Review Guidelines
                </h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-1 ${currentTheme.textPrimary}`}>
                      Be Specific
                    </h4>
                    <p className={`text-sm ${currentTheme.textSecondary}`}>
                      Mention specific projects, skills, or outcomes that impressed you
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 mt-1">
                    <Zap className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-1 ${currentTheme.textPrimary}`}>
                      Keep it Authentic
                    </h4>
                    <p className={`text-sm ${currentTheme.textSecondary}`}>
                      Share your genuine experience - honesty helps everyone
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/10 mt-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-1 ${currentTheme.textPrimary}`}>
                      Include Impact
                    </h4>
                    <p className={`text-sm ${currentTheme.textSecondary}`}>
                      How did the work affect your project or business?
                    </p>
                  </div>
                </div>
              </div>

              {/* Example Review */}
              <div className="mt-8 pt-8 border-t border-gray-800/30">
                <h4 className={`font-semibold mb-4 ${currentTheme.textPrimary}`}>
                  Example Review
                </h4>
                <div className={`p-4 rounded-xl ${currentTheme.inputBg} italic`}>
                  <p className={`text-sm ${currentTheme.textSecondary} mb-2`}>
                    &quot;Working with [Name] was exceptional. They delivered our e-commerce platform 2 weeks ahead of schedule with flawless performance. Their attention to detail and problem-solving skills are top-notch!&quot;
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-purple-400">- Satisfied Client</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}