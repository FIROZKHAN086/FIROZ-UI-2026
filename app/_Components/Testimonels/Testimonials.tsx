"use client";

import { useEffect, useState, useRef } from "react";
import { Star, Quote, Sparkles, Heart, TrendingUp, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import axios from "axios";


type Testimonial = {
  id: number;
  name: string;
  role: string;
  message: string;
  rating: number;
  date: string;
  avatarColor: string;
};

type ThemeName = "light" | "dark";


export default function TestimonialsShow() {
   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

    const containerRef = useRef<HTMLElement | null>(null);

    const { theme, setTheme } = useTheme();
  const currentThemeName = (theme ?? "light") as ThemeName;

  const isDark = currentThemeName === "dark";

  // Sample testimonials for demo
  const sampleTestimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Product Manager at TechCorp",
      message: "Working with this developer was an absolute pleasure. Their attention to detail and problem-solving skills are exceptional. Delivered ahead of schedule with perfect quality!",
      rating: 5,
      date: new Date().toISOString(),
      avatarColor: "#6366f1"
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "CEO at StartupXYZ",
      message: "Incredible work! The project exceeded all expectations. Professional, communicative, and highly skilled. Will definitely work together again.",
      rating: 5,
      date: new Date(Date.now() - 86400000).toISOString(),
      avatarColor: "#10b981"
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Lead Developer at InnovateCo",
      message: "Technical expertise at its finest. Clean code, scalable architecture, and innovative solutions. A true partner in development.",
      rating: 4,
      date: new Date(Date.now() - 172800000).toISOString(),
      avatarColor: "#f59e0b"
    },
    {
      id: 4,
      name: "Emma Davis",
      role: "Design Director at CreativeLab",
      message: "Brought our vision to life with stunning execution. The attention to UX/UI details was remarkable. Highly recommended!",
      rating: 5,
      date: new Date(Date.now() - 259200000).toISOString(),
      avatarColor: "#8b5cf6"
    },
    {
      id: 5,
      name: "David Miller",
      role: "CTO at ScaleFast",
      message: "Outstanding performance under tight deadlines. The solution was elegant, efficient, and well-documented. A reliable technical partner.",
      rating: 5,
      date: new Date(Date.now() - 345600000).toISOString(),
      avatarColor: "#ef4444"
    },
    {
      id: 6,
      name: "Lisa Rodriguez",
      role: "Marketing Director at BrandBoost",
      message: "Transformed our digital presence completely. The results speak for themselves - 40% increase in user engagement. Exceptional work!",
      rating: 4,
      date: new Date(Date.now() - 432000000).toISOString(),
      avatarColor: "#06b6d4"
    }
  ];


useEffect(() => {
  const fetchTestimonials = async () => {
    try {
    
      const res = await axios.get<Testimonial[]>("/api/testimonials");
      setTestimonials(res.data);
      
    } catch (err) {
      console.error("Failed to fetch testimonials", err);
     
    } 
  };

  fetchTestimonials();
}, []);

 
   const totalReviews = testimonials.length;

const avgRating =
  totalReviews > 0
    ? (
        testimonials.reduce((sum, t) => sum + t.rating, 0) /
        totalReviews
      ).toFixed(1)
    : "0.0";

const happyClients = testimonials.filter(t => t.rating >= 4).length;

const successRate =
  totalReviews > 0
    ? `${Math.round((happyClients / totalReviews) * 100)}%`
    : "0%";

 
 const stats = [
 {
   label: "Total Reviews",
   value: totalReviews,
   icon: <Quote className="w-5 h-5" />,
 },
 {
   label: "Avg Rating",
   value: avgRating,
   icon: <Star className="w-5 h-5" />,
 },
 {
   label: "Happy Clients",
   value: happyClients,
   icon: <Heart className="w-5 h-5" />,
 },
 {
   label: "Success Rate",
   value: successRate,
   icon: <TrendingUp className="w-5 h-5" />,
 },
];



  const themes:Record<ThemeName, any> = {
    light: {
        bg: "white",
        card: "bg-white/80 backdrop-blur-md",
        border: "border-white/30",
        textPrimary: "text-gray-900",
        textSecondary: "text-gray-600",
        accent: "from-blue-500 to-purple-600",
        grid: "rgba(99, 102, 241, 0.05)",
        shadow: "shadow-xl shadow-blue-500/10"
    },
    dark: {
        bg: "blak",
      card: "bg-gray-900/80 backdrop-blur-md",
      border: "border-white/10",
      textPrimary: "text-white",
      textSecondary: "text-gray-300",
      accent: "from-cyan-500 to-purple-600",
      grid: "rgba(139, 92, 246, 0.05)",
      shadow: "shadow-xl shadow-purple-500/10"
    }
  };

  const currentTheme = themes[currentThemeName];

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-700"} transition-transform hover:scale-110`}
      />
    ));
  };

  const getAvatarInitials = (name:string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

 



  return (
    <section 
      ref={containerRef}
      className={`relative min-h-screen py-20 px-4 overflow-hidden bg-${currentTheme.bg} transition-colors duration-500`}
      style={{
        backgroundImage: `radial-gradient(${currentTheme.grid} 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}
    >
      {/* Background Effects */}
     {theme === 'dark' &&(<><div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl animate-pulse" />
  <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse" /></>)}
{theme === 'light' &&(<>
 <div className="absolute inset-0 bg-gradient-to-r from-rose-50 via-white to-sky-50"></div>

  </>)}

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header with Theme Selector */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              Client Feedback
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className={`bg-gradient-to-r ${currentTheme.accent} bg-clip-text text-transparent`}>
              Testimonials
            </span>
            <span className={`block text-4xl md:text-5xl mt-2 ${currentTheme.textPrimary}`}>
              What People Say
            </span>
          </h1>
          
          <p className={`text-xl max-w-2xl mx-auto ${currentTheme.textSecondary}`}>
            Real feedback from amazing clients and colleagues
          </p>

         
        </div>

        {/* Stats Bar */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
  {stats.map((stat, i) => (
    <div
      key={i}
      className={`${currentTheme.card} ${currentTheme.border} border rounded-2xl p-6 backdrop-blur-sm ${currentTheme.shadow} transition-all hover:scale-105`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg bg-gradient-to-r ${currentTheme.accent}`}>
          {stat.icon}
        </div>
        <span className="text-3xl font-bold">
          {stat.value}
        </span>
      </div>
      <p className={`text-sm ${currentTheme.textSecondary}`}>
        {stat.label}
      </p>
    </div>
  ))}
</div>

      

        {/* All Testimonials Grid */}
        {testimonials.length > 0 && (
          <div className="mb-12">
            <h2 className={`text-3xl font-bold mb-8 ${currentTheme.textPrimary}`}>
              All Testimonials
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className={`${currentTheme.card} ${currentTheme.border} border rounded-2xl p-6 backdrop-blur-sm ${currentTheme.shadow} transition-all hover:scale-105 hover:shadow-2xl`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: t.avatarColor }}
                      >
                        {getAvatarInitials(t.name)}
                      </div>
                      <div>
                        <h4 className={`font-bold ${currentTheme.textPrimary}`}>
                          {t.name}
                        </h4>
                       <p className={`text-sm flex items-center gap-2`}>
  <svg className="w-3 h-3 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
  <span className="font-medium text-gray-500 dark:text-gray-400">Role:</span>
  <span className="font-semibold text-gray-800 dark:text-gray-100">{t.role}</span>
</p>
                      </div>
                    </div>
                    <div className="flex">{renderStars(t.rating)}</div>
                  </div>

                  <p className={`mb-4 leading-relaxed ${currentTheme.textSecondary}`}>
                    &quot;{t.message}&quot;
                  </p>

                  <div className={`text-xs flex items-center justify-between ${currentTheme.textSecondary}`}>
                    <span>
                      {new Date(t.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
                      Verified Review
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

       
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(20px) rotate(240deg);
          }
        }
        
        .animate-float {
          animation: float infinite linear;
        }
      `}</style>
    </section>
  );
}