"use client";

import React, { JSX, useRef } from "react";
import {
  motion,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  Server,
  Palette,
  Cloud,
  Search,
  ArrowRight,
  CheckCircle,
  Layers,
  Cpu,
  Rocket,
  Shield,
  Layout,
  Terminal,
  Sparkles,
  Code,
} from "lucide-react";

// --- Types ---

interface Service {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  features: string[];
  tech: string[];
}

// --- Components ---

/**
 * 3D Tilt Card Component
 */
const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-full bg-card/40 backdrop-blur-xl border border-border rounded-3xl p-8 overflow-hidden transition-colors hover:border-primary/50"
    >
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
          <div className="text-white dark:text-black">
            {service.icon}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-3 text-foreground tracking-tight">
          {service.title}
        </h3>
        
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {service.description}
        </p>

        <ul className="space-y-3 mb-8">
          {service.features.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-6 border-t border-border">
          {service.tech.map((t) => (
            <span key={t} className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider rounded-md bg-secondary text-secondary-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Background Glow */}
      <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-linear-to-br ${service.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />
    </motion.article>
  );
};



/**
 * Process Timeline Component
 */
const ProcessTimeline = () => {
  const processes = [
    { title: "Discovery", desc: "Understanding your goals, users, and market position.", icon: <Search className="w-6 h-6" /> },
    { title: "Strategy", desc: "Defining the technical stack and architecture.", icon: <Layers className="w-6 h-6" /> },
    { title: "Design", desc: "Creating high-fidelity prototypes and design systems.", icon: <Palette className="w-6 h-6" /> },
    { title: "Development", desc: "Building with clean code and modern standards.", icon: <Code className="w-6 h-6" /> },
    { title: "Testing", desc: "Rigorous quality assurance and performance tuning.", icon: <Shield className="w-6 h-6" /> },
    { title: "Launch", desc: "Seamless deployment and initial growth tracking.", icon: <Rocket className="w-6 h-6" /> },
  ];

  return (
    <div className="py-20 max-w-4xl hidden md:block mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">My Workflow</h2>
        <p className="text-muted-foreground">A systematic approach to delivering excellence.</p>
      </div>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
        
        {processes.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`relative flex items-center gap-8 mb-20 ${i % 2 === 0 ? "sm:flex-row-reverse" : ""}`}
          >
            <div className="flex-1 hidden sm:block" />
            
            <div className="relative z-10 w-16 h-16 rounded-full bg-card border-4 border-background flex items-center justify-center text-primary shadow-xl shrink-0">
               {step.icon}
            </div>

            <div className="flex-1 bg-card p-6 rounded-2xl border border-border shadow-sm">
               <h3 className="text-xl font-bold mb-2">{step.title}</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Main Page ---

export function ServicesPage() {
  const services: Service[] = [
    {
      id: "frontend",
      title: "Frontend Engineering",
      description: "Crafting immersive, pixel-perfect user interfaces that are fast, accessible, and delight users.",
      icon: <Layout className="w-6 h-6" />,
      color: "from-[#a78bfa] to-[#6366f1]",
      features: ["Next.js & React Expert", "Advanced Animations", "Responsive Optimization"],
      tech: ["React", "TypeScript", "Tailwind", "Framer Motion", "GSAP"]
    },
    {
      id: "backend",
      title: "Backend Architecture",
      description: "Building robust, secure, and scalable server-side systems that power complex applications.",
      icon: <Server className="w-6 h-6" />,
      color: "from-[#10b981] to-[#06b6d4]",
      features: ["REST & GraphQL APIs", "Microservices", "Database Modeling"],
      tech: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis"]
    },
    {
      id: "fullstack",
      title: "Full-Stack Solutions",
      description: "End-to-end development of dynamic web applications from initial concept to production.",
      icon: <Terminal className="w-6 h-6" />,
      color: "from-[#f59e0b] to-[#ea580c]",
      features: ["End-to-End Delivery", "Real-time Systems", "Custom SaaS"],
      tech: ["Next.js", "Prisma", "Auth.js", "Stripe", "tRPC"]
    },
    {
      id: "cloud",
      title: "Cloud & DevOps",
      description: "Deploying and managing infrastructure that grows with your business while maintaining 99.9% uptime.",
      icon: <Cloud className="w-6 h-6" />,
      color: "from-[#3b82f6] to-[#06b6d4]",
      features: ["CI/CD Pipelines", "Docker & Kubernetes", "Cloud Hosting"],
      tech: ["AWS", "Render", "Docker", "Actions", "Terraform"]
    },
    {
      id: "seo",
      title: "SEO & Performance",
      description: "Strategic optimization to ensure your site ranks high and converts visitors into customers.",
      icon: <Search className="w-6 h-6" />,
      color: "from-[#ec4899] to-[#be185d]",
      features: ["Core Web Vitals", "Semantic SEO", "Conversion Rate Opt."],
      tech: ["Ahrefs", "Search Console", "Schema", "Lighthouse"]
    },
    {
      id: "ai",
      title: "AI & Automation",
      description: "Integrating modern AI capabilities and automating workflows to increase operational efficiency.",
      icon: <Cpu className="w-6 h-6" />,
      color: "from-[#8b5cf6] to-[#d946ef]",
      features: ["LLM Integration", "Workflow Automation", "Predictive UX"],
      tech: ["OpenAI", "Gemini", "JavaScript", "Node.js"]
    }
  ];

  return (
    <section 
      id="services" 
      className="relative min-h-screen bg-background pt-32 pb-20 overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Expert Solutions</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black mb-8 tracking-tighter"
          >
            Transforming Ideas into <br />
            <span className="gradient-text">Digital Reality</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            I deliver high-performance full-stack applications with a focus on 
            unmatched speed, security, and world-class user experience.
          </motion.p>
        </header>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>

     

      {/* Process Section */}
      <ProcessTimeline />

      {/* Final CTA */}
      <div className="container mx-auto px-4 py-20">
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="relative overflow-hidden bg-primary rounded-[3rem] p-12 sm:p-20 text-center text-primary-foreground shadow-2xl shadow-primary/20"
         >
            {/* CTA Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4),transparent)]" />
               <div className="w-full h-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
               <h2 className="text-4xl sm:text-6xl font-black mb-8 tracking-tighter">
                  Ready to Build Something <br /> Extraordinary?
               </h2>
               <p className="text-xl text-primary-foreground/80 mb-12">
                  Let&apos;s collaborate to create a digital product that sets you apart from the competition.
               </p>
               
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full sm:w-auto px-12 py-5 rounded-2xl bg-white text-black font-bold text-lg shadow-xl flex items-center justify-center gap-3 transition-transform"
                  >
                    Get Started <ArrowRight className="w-5 h-5" />
                  </motion.button>
               </div>
            </div>
         </motion.div>
      </div>

      {/* Floating Elements for SEO & Aesthetics */}
      <footer className="sr-only">
        <h2>Full Stack Developer Services</h2>
        <p>I offer Frontend Development, Backend Architecture, Cloud Solutions, and SEO optimization.</p>
        <ul>
          <li>React & Next.js Development</li>
          <li>Node.js & Express APIs</li>
          <li>AWS & Cloud Infrastructure</li>
          <li>Search Engine Optimization</li>
        </ul>
      </footer>
    </section>
  );
}

export default ServicesPage;