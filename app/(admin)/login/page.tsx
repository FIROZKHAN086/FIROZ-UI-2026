'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Shield, LogIn, Sparkles, Eye, EyeOff, Mail, Lock, 
  Fingerprint, AlertCircle, CheckCircle2, Loader2,
  Zap, Rocket, Star, Crown, Key, UserCheck
} from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Load saved email if remember me was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem('adminEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
     const envUsername = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const envPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    

    if (email === envUsername && password === envPassword) {
      toast.success("Login successful!");
      // encription 
      const Admin = "admin";
      localStorage.setItem("adminAuth", "true");
      router.push("/admin");
      } else {
        setError( 'Invalid credentials');
        toast.error('Invalid email or password');
        // Shake animation for error
        const form = document.getElementById('login-form');
        if (form) {
          form.classList.add('shake');
          setTimeout(() => form.classList.remove('shake'), 500);
        }
      }
    } catch (err: any) {
      setError('Network error. Please try again.');
      toast.error('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Floating shapes animation variants
  const floatingShapes = [
    { delay: 0, duration: 20, x: [0, 100, 0], y: [0, -80, 0], size: 'w-[400px] h-[400px]', color: 'bg-purple-600/20' },
    { delay: 5, duration: 25, x: [0, -80, 0], y: [0, 100, 0], size: 'w-[450px] h-[450px]', color: 'bg-pink-600/15' },
    { delay: 10, duration: 30, x: [0, 60, 0], y: [0, -100, 0], size: 'w-[500px] h-[500px]', color: 'bg-blue-600/10' },
    { delay: 15, duration: 35, x: [0, -120, 0], y: [0, 60, 0], size: 'w-[350px] h-[350px]', color: 'bg-emerald-600/8' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#030303] via-[#0a0a0a] to-[#050505] flex items-center justify-center overflow-hidden">
      {/* Animated Background Orbs */}
      {floatingShapes.map((shape, idx) => (
        <motion.div
          key={idx}
          animate={{ 
            x: shape.x, 
            y: shape.y,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: shape.duration, 
            repeat: Infinity, 
            ease: 'linear',
            delay: shape.delay
          }}
          className={`absolute ${shape.size} rounded-full ${shape.color} blur-[120px] pointer-events-none`}
          style={{
            top: `${20 + idx * 15}%`,
            left: `${10 + idx * 20}%`,
          }}
        />
      ))}

      {/* Animated Grid Pattern */}
      <motion.div
        animate={{ opacity: [0.02, 0.05, 0.02] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400/30 rounded-full pointer-events-none"
          animate={{
            y: [0, -100, 0],
            x: [0, (Math.random() - 0.5) * 200, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear',
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
        className="relative w-full max-w-md px-4 sm:px-6"
      >
        {/* Glow Effect Behind Card */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-3xl blur-2xl"
        />

        {/* Main Card */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-950/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Top Gradient Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          
          {/* Side Decorations */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500/0" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-pink-500/0 via-pink-500/50 to-pink-500/0" />

          <div className="p-6 sm:p-8 md:p-10">
            {/* Header Section */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="text-center mb-8"
            >
              {/* Animated Logo */}
              <div className="relative mx-auto mb-6 w-fit">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-50"
                />
                <div className="relative p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                  <Shield className="h-8 w-8 sm:h-9 sm:w-9 text-white" />
                </div>
                
                {/* Floating Badges */}
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-2 -right-2"
                >
                  <div className="p-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                    <Crown className="h-3 w-3 text-emerald-400" />
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute -bottom-2 -left-2"
                >
                  <div className="p-1.5 rounded-full bg-blue-500/20 border border-blue-500/30">
                    <Star className="h-3 w-3 text-blue-400" />
                  </div>
                </motion.div>
              </div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
              >
                <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                  Welcome Back
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 mt-2 text-xs sm:text-sm"
              >
                Sign in to access your admin dashboard
              </motion.p>
            </motion.div>

            {/* Login Form */}
            <motion.form
              id="login-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-gray-300 font-medium flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-purple-400" />
                  Email Address
                </Label>
                <div className={`relative transition-all duration-300 ${emailFocused ? 'scale-[1.01]' : ''}`}>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    required
                    placeholder="admin@example.com"
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all rounded-xl h-11 pl-11"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  {email && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-gray-300 font-medium flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5 text-purple-400" />
                  Password
                </Label>
                <div className={`relative transition-all duration-300 ${passwordFocused ? 'scale-[1.01]' : ''}`}>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    required
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all rounded-xl h-11 pl-11 pr-11"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border transition-all duration-200 ${rememberMe ? 'bg-purple-500 border-purple-500' : 'border-white/20 bg-white/5 group-hover:border-purple-500/50'}`}>
                      {rememberMe && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                    Remember me
                  </span>
                </label>
                
                <button
                  type="button"
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  onClick={() => {
                    toast.info('Contact admin to reset password', {
                      icon: <Key className="h-4 w-4" />,
                    });
                  }}
                >
                  Forgot password?
                </button>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20"
                  >
                    <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-red-400 flex-1">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 hover:from-purple-600 hover:via-purple-700 hover:to-pink-600 text-white border-0 shadow-lg shadow-purple-500/25 h-12 rounded-xl text-base font-semibold relative overflow-hidden group"
                  disabled={loading}
                >
                  {/* Button Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-white/20 to-pink-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Authenticating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      <span>Sign In</span>
                      <Rocket className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </motion.div>

              {/* Demo Credentials Hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 p-3 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
                  <Fingerprint className="h-3 w-3 text-purple-400" />
                  <span>Demo Credentials:</span>
                  <span className="text-gray-400">admin@example.com</span>
                  <span className="text-gray-600">/</span>
                  <span className="text-gray-400">admin123</span>
                </div>
              </motion.div>
            </motion.form>
          </div>

          {/* Footer */}
          <div className="px-6 sm:px-8 pb-6 text-center">
            <p className="text-[10px] text-gray-600">
              Secure admin panel • Protected with industry standard encryption
            </p>
          </div>
        </div>
      </motion.div>

      {/* Custom Styles for Shake Animation */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .shake {
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
      `}</style>
    </div>
  );
}