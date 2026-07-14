"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { ButtonSpinner } from '@/components/ui/ButtonSpinner';
import { VerificationModal } from '@/components/auth/VerificationModal';
import { Mail, Lock, ArrowRight, BookOpen } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, googleLogin } = useAuth();
  const router = useRouter();
  
  const [serverError, setServerError] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError("");
    try {
      const response = await login(data.email, data.password);
      if (response?.user?.role === 'ADMIN') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      if (err.status === 403 || err.message?.toLowerCase().includes("verify")) {
        setUnverifiedEmail(data.email);
        setShowVerification(true);
      } else {
        setServerError(err.message || "Invalid email or password.");
      }
    }
  };

  const handleGoogleSSO = async () => {
    setIsGoogleLoading(true);
    try {
      const response = await googleLogin("mock-google-token-data");
      if (response?.user?.role === 'ADMIN') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setServerError("Google authentication failed.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white dark:bg-[#0a0a0a]">
      {showVerification && (
        <VerificationModal 
          email={unverifiedEmail} 
          onClose={() => setShowVerification(false)} 
          onSuccess={(data?: any) => {
            setShowVerification(false);
            // Redirect based on role after OTP verification from login page
            const role = data?.user?.role || data?.role;
            if (role === 'ADMIN') {
              router.push('/admin/dashboard');
            } else {
              router.push('/dashboard');
            }
          }}
        />
      )}
      
      {/* Left Structural Branding Matrix */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 dark:bg-blue-900 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-blue-900/80"></div>
        
        <div className="relative z-10 p-16 max-w-2xl text-white">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-2xl">
            <BookOpen size={32} className="text-white" />
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-6 leading-[1.1]">
            Unlock a world of limitless literature.
          </h1>
          <p className="text-blue-100 text-lg font-medium leading-relaxed max-w-lg">
            Welcome back to Pathdigonto Book Hub. Access your personalized library, track incoming shipments, and discover your next great read within seconds.
          </p>
          
          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-blue-600 bg-blue-${i}00 flex items-center justify-center text-xs font-bold shadow-sm overflow-hidden`}>
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-sm font-bold text-blue-100">Join 50,000+ avid readers.</p>
          </div>
        </div>
      </div>

      {/* Right Authentication Matrix */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 animate-in fade-in slide-in-from-right-8 duration-700">
        <div className="w-full max-w-md">
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">Welcome Back</h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 font-medium">Please enter your details to sign in.</p>
          </div>
          
          <button
            onClick={handleGoogleSSO}
            disabled={isGoogleLoading}
            className="w-full flex justify-center items-center gap-3 py-3.5 px-4 border-2 border-gray-200 dark:border-gray-800 rounded-xl shadow-sm bg-white dark:bg-[#121212] text-sm font-black text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 disabled:opacity-70 transition-all active:scale-[0.98]"
          >
            {isGoogleLoading ? <ButtonSpinner /> : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            Log in with Google
          </button>

          <div className="my-8 flex items-center justify-center">
            <div className="w-full h-px bg-gray-200 dark:bg-gray-800"></div>
            <span className="px-4 text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-600 bg-white dark:bg-[#0a0a0a]">Or continue with Email</span>
            <div className="w-full h-px bg-gray-200 dark:bg-gray-800"></div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-transparent text-gray-900 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 outline-none transition-all font-bold placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs font-bold mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">Password</label>
                <Link href="/forgot-password" className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-500">Forgot?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  {...register("password")}
                  type="password"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-transparent text-gray-900 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 outline-none transition-all font-bold placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs font-bold mt-1">{errors.password.message}</p>}
            </div>

            {serverError && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold text-center animate-in zoom-in-95">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] text-sm font-black text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-all active:scale-[0.98] mt-4"
            >
              {isSubmitting ? <><ButtonSpinner /> Authenticating...</> : <>Secure Sign In <ArrowRight size={18} strokeWidth={3} /></>}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:text-blue-700 dark:text-blue-500">
                Create one now
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
