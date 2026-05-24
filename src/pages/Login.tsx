import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Dumbbell } from 'lucide-react';
import { signInWithGoogle } from '../firebase';
import { useAuth } from '../AuthContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-primary/10 border-primary/20 flex h-10 w-full min-w-0 rounded-lg border bg-transparent px-3 py-2 text-base shadow-xs transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-primary/50 focus-visible:ring-primary/20 focus-visible:ring-[3px]",
        className
      )}
      {...props}
    />
  );
}

export default function Login() {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  // For 3D card effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleEmailPasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('يتم حالياً استخدام تسجيل الدخول الموحد عبر Google لتأمين حسابك. يرجى الضغط على زر "Sign in with Google" أدناه.');
    }, 1500);
  };

  // Redirect if already logged in (excluding the mock user template)
  if (user && user.uid !== 'mock-user-123') {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen w-screen bg-[#191022] relative overflow-hidden flex items-center justify-center p-4">
      {/* Background gradient effect - coordinated with deep dark purple #191022 and primary #7311d4 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7311d4]/20 via-[#191022]/80 to-[#191022]" />
      
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      {/* Top radial glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vh] h-[60vh] rounded-b-[50%] bg-[#7311d4]/15 blur-[80px]" />
      
      <motion.div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100vh] h-[60vh] rounded-b-full bg-[#7311d4]/10 blur-[60px]"
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [0.98, 1.02, 0.98]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90vh] h-[90vh] rounded-t-full bg-[#7311d4]/15 blur-[60px]"
        animate={{ 
          opacity: [0.2, 0.35, 0.2],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          repeatType: "mirror",
          delay: 1
        }}
      />

      {/* Animated glow spots */}
      <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-[#7311d4]/5 rounded-full blur-[100px] animate-pulse opacity-40" />
      <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-[#7311d4]/5 rounded-full blur-[100px] animate-pulse delay-1000 opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm relative z-10"
        style={{ perspective: 1500 }}
      >
        <motion.div
          className="relative"
          style={{ rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ z: 10 }}
        >
          <div className="relative group">
            {/* Card glow effect */}
            <motion.div 
              className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"
              animate={{
                boxShadow: [
                  "0 0 10px 2px rgba(115,17,212,0.05)",
                  "0 0 15px 5px rgba(115,17,212,0.1)",
                  "0 0 10px 2px rgba(115,17,212,0.05)"
                ],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut", 
                repeatType: "mirror" 
              }}
            />

            {/* Traveling light beam effect - aligned with primary color #7311d4 */}
            <div className="absolute -inset-[1px] rounded-2xl overflow-hidden pointer-events-none">
              {/* Top light beam */}
              <motion.div 
                className="absolute top-0 left-0 h-[2px] w-[50%] bg-gradient-to-r from-transparent via-[#7311d4] to-transparent opacity-75"
                initial={{ filter: "blur(1px)" }}
                animate={{ 
                  left: ["-50%", "100%"],
                  opacity: [0.4, 0.8, 0.4],
                  filter: ["blur(0.5px)", "blur(2px)", "blur(0.5px)"]
                }}
                transition={{ 
                  left: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 },
                  opacity: { duration: 1.5, repeat: Infinity, repeatType: "mirror" },
                  filter: { duration: 1.5, repeat: Infinity, repeatType: "mirror" }
                }}
              />
              
              {/* Right light beam */}
              <motion.div 
                className="absolute top-0 right-0 h-[50%] w-[2px] bg-gradient-to-b from-transparent via-[#7311d4] to-transparent opacity-75"
                initial={{ filter: "blur(1px)" }}
                animate={{ 
                  top: ["-50%", "100%"],
                  opacity: [0.4, 0.8, 0.4],
                  filter: ["blur(0.5px)", "blur(2px)", "blur(0.5px)"]
                }}
                transition={{ 
                  top: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5, delay: 0.8 },
                  opacity: { duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 0.8 },
                  filter: { duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 0.8 }
                }}
              />
              
              {/* Bottom light beam */}
              <motion.div 
                className="absolute bottom-0 right-0 h-[2px] w-[50%] bg-gradient-to-r from-transparent via-[#7311d4] to-transparent opacity-75"
                initial={{ filter: "blur(1px)" }}
                animate={{ 
                  right: ["-50%", "100%"],
                  opacity: [0.4, 0.8, 0.4],
                  filter: ["blur(0.5px)", "blur(2px)", "blur(0.5px)"]
                }}
                transition={{ 
                  right: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5, delay: 1.6 },
                  opacity: { duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 1.6 },
                  filter: { duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 1.6 }
                }}
              />
              
              {/* Left light beam */}
              <motion.div 
                className="absolute bottom-0 left-0 h-[50%] w-[2px] bg-gradient-to-b from-transparent via-[#7311d4] to-transparent opacity-75"
                initial={{ filter: "blur(1px)" }}
                animate={{ 
                  bottom: ["-50%", "100%"],
                  opacity: [0.4, 0.8, 0.4],
                  filter: ["blur(0.5px)", "blur(2px)", "blur(0.5px)"]
                }}
                transition={{ 
                  bottom: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5, delay: 2.4 },
                  opacity: { duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 2.4 },
                  filter: { duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 2.4 }
                }}
              />
            </div>

            {/* Card border glow */}
            <div className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-r from-[#7311d4]/10 via-[#7311d4]/30 to-[#7311d4]/10 opacity-0 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />
            
            {/* Glass card background - integrated with dark background #191022 */}
            <div className="relative bg-[#191022]/65 backdrop-blur-xl rounded-2xl p-6 border border-[#7311d4]/20 shadow-2xl overflow-hidden">
              
              {/* Subtle card inner patterns */}
              <div className="absolute inset-0 opacity-[0.02]" 
                style={{
                  backgroundImage: `linear-gradient(135deg, white 0.5px, transparent 0.5px), linear-gradient(45deg, white 0.5px, transparent 0.5px)`,
                  backgroundSize: '30px 30px'
                }}
              />

              {/* Logo and header */}
              <div className="text-center space-y-1 mb-5">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="mx-auto w-12 h-12 rounded-full border border-[#7311d4]/30 bg-[#7311d4]/10 flex items-center justify-center relative overflow-hidden"
                >
                  <Dumbbell className="w-6 h-6 text-[#7311d4]" />
                  {/* Inner lighting effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70"
                >
                  HELMY
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-slate-400 text-xs"
                >
                  Your ultimate fitness and training companion
                </motion.p>
              </div>

              {/* Login form */}
              <form onSubmit={handleEmailPasswordSubmit} className="space-y-4">
                <div className="space-y-3">
                  {/* Email input */}
                  <motion.div 
                    className={`relative ${focusedInput === "email" ? 'z-10' : ''}`}
                    whileFocus={{ scale: 1.01 }}
                    whileHover={{ scale: 1.005 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="relative flex items-center overflow-hidden rounded-lg">
                      <Mail className={`absolute left-3 w-4 h-4 transition-all duration-300 ${
                        focusedInput === "email" ? 'text-primary' : 'text-slate-500'
                      }`} />
                      
                      <Input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedInput("email")}
                        onBlur={() => setFocusedInput(null)}
                        className="w-full bg-[#191022]/40 border-[#7311d4]/20 focus:border-[#7311d4]/50 text-white placeholder:text-slate-500 h-10 transition-all duration-300 pl-10 pr-3 focus:bg-[#7311d4]/5"
                      />
                      
                      {focusedInput === "email" && (
                        <motion.div 
                          layoutId="input-highlight"
                          className="absolute inset-0 bg-[#7311d4]/5 -z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Password input */}
                  <motion.div 
                    className={`relative ${focusedInput === "password" ? 'z-10' : ''}`}
                    whileFocus={{ scale: 1.01 }}
                    whileHover={{ scale: 1.005 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="relative flex items-center overflow-hidden rounded-lg">
                      <Lock className={`absolute left-3 w-4 h-4 transition-all duration-300 ${
                        focusedInput === "password" ? 'text-primary' : 'text-slate-500'
                      }`} />
                      
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedInput("password")}
                        onBlur={() => setFocusedInput(null)}
                        className="w-full bg-[#191022]/40 border-[#7311d4]/20 focus:border-[#7311d4]/50 text-white placeholder:text-slate-500 h-10 transition-all duration-300 pl-10 pr-10 focus:bg-[#7311d4]/5"
                      />
                      
                      {/* Toggle password visibility */}
                      <div 
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-3 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-slate-500 hover:text-white transition-colors duration-300" />
                        ) : (
                          <Eye className="w-4 h-4 text-slate-500 hover:text-white transition-colors duration-300" />
                        )}
                      </div>
                      
                      {focusedInput === "password" && (
                        <motion.div 
                          layoutId="input-highlight"
                          className="absolute inset-0 bg-[#7311d4]/5 -z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between pt-1 text-[11px] md:text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="relative flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="appearance-none h-4 w-4 rounded border border-[#7311d4]/30 bg-primary/5 checked:bg-primary checked:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all duration-200"
                      />
                      {rememberMe && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 flex items-center justify-center text-white pointer-events-none"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </motion.div>
                      )}
                    </div>
                    <label htmlFor="remember-me" className="text-slate-400 hover:text-white transition-colors duration-200 mr-2 cursor-pointer select-none">
                      Remember me
                    </label>
                  </div>
                  
                  <div className="relative group/link">
                    <Link to="/forgot-password" className="text-slate-400 hover:text-white transition-colors duration-200">
                      Forgot password?
                    </Link>
                  </div>
                </div>

                {/* Sign in button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative group/button mt-5"
                >
                  <div className="absolute inset-0 bg-[#7311d4]/20 rounded-lg blur-lg opacity-0 group-hover/button:opacity-75 transition-opacity duration-300" />
                  
                  <div className="relative overflow-hidden bg-[#7311d4] hover:bg-[#8522e7] text-white font-medium h-10 rounded-lg transition-all duration-300 flex items-center justify-center">
                    
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10"
                      animate={{ 
                        x: ['-100%', '100%'],
                      }}
                      transition={{ 
                        duration: 1.5, 
                        ease: "easeInOut", 
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                      style={{ 
                        opacity: isLoading ? 1 : 0,
                        transition: 'opacity 0.3s ease'
                      }}
                    />
                    
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center"
                        >
                          <div className="w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                        </motion.div>
                      ) : (
                        <motion.span
                          key="button-text"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-1.5 text-sm font-medium"
                        >
                          Sign In
                          <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-300" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>

                {/* Minimal Divider */}
                <div className="relative mt-2 mb-5 flex items-center">
                  <div className="flex-grow border-t border-[#7311d4]/10"></div>
                  <motion.span 
                    className="mx-3 text-xs text-slate-500"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: [0.7, 0.9, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    or
                  </motion.span>
                  <div className="flex-grow border-t border-[#7311d4]/10"></div>
                </div>

                {/* Google Sign In */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={signInWithGoogle}
                  className="w-full relative group/google"
                >
                  <div className="absolute inset-0 bg-[#7311d4]/5 rounded-lg blur opacity-0 group-hover/google:opacity-75 transition-opacity duration-300" />
                  
                  <div className="relative overflow-hidden bg-[#7311d4]/5 hover:bg-[#7311d4]/10 text-white font-medium h-10 rounded-lg border border-[#7311d4]/20 hover:border-[#7311d4]/40 transition-all duration-300 flex items-center justify-center gap-3">
                    <svg className="w-4 h-4 text-white/80 group-hover/google:text-white transition-colors" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    
                    <span className="text-white/80 group-hover/google:text-white transition-colors text-xs font-semibold">
                      Sign in with Google
                    </span>
                  </div>
                </motion.button>

                {/* Sign up link */}
                <motion.p 
                  className="text-center text-xs text-slate-400 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Don't have an account?{' '}
                  <Link 
                    to="/signup" 
                    className="relative inline-block group/signup"
                  >
                    <span className="relative z-10 text-primary group-hover:text-primary/80 transition-colors font-medium">
                      Sign up
                    </span>
                  </Link>
                </motion.p>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
