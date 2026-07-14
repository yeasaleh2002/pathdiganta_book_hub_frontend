"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { ButtonSpinner } from '@/components/ui/ButtonSpinner';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: authRegister, googleLogin } = useAuth();
  const router = useRouter();
  
  const [serverError, setServerError] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError("");
    try {
      await authRegister(data.name, data.email, data.password);
      // Backend automatically redirects logic flow after OTP
      router.push('/login');
    } catch (err: any) {
      setServerError(err.message || "Registration failed. Please try again.");
    }
  };

  const handleGoogleSSO = async () => {
    setIsGoogleLoading(true);
    try {
      await googleLogin("mock-google-token-data");
      router.push('/dashboard');
    } catch (err: any) {
      setServerError("Google authentication failed.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white dark:bg-[#0a0a0a]">
      
      {/* Right Structural Branding Matrix (Flipped for Variation) */}
      <div className="hidden lg:flex w-1/2 bg-indigo-950 relative overflow-hidden items-center justify-center order-2">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-indigo-500/10 to-indigo-900/90"></div>
        
        <div className="relative z-10 p-16 max-w-2xl text-white">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-2xl">
            <ShieldCheck size={32} className="text-emerald-400" />
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-6 leading-[1.1]">
            Read with absolute confidence.
          </h1>
          <p className="text-indigo-200 text-lg font-medium leading-relaxed max-w-lg mb-10">
            Create your free account today and join a secure ecosystem designed entirely around delivering the greatest books seamlessly to your front door.
          </p>
          
          <div className="space-y-4">
            {['Fastest Nationwide Delivery', 'Secure Financial Processing', 'Exclusive Member Discounts'].map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
                <span className="font-bold tracking-wide text-indigo-50">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Left Authentication Matrix */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 animate-in fade-in slide-in-from-left-8 duration-700 order-1">
        <div className="w-full max-w-md">
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">Create Account</h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 font-medium">Join Pathdigonto in under 30 seconds.</p>
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
            Sign up with Google
          </button>

          <div className="my-8 flex items-center justify-center">
            <div className="w-full h-px bg-gray-200 dark:bg-gray-800"></div>
            <span className="px-4 text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-600 bg-white dark:bg-[#0a0a0a]">Or register with Email</span>
            <div className="w-full h-px bg-gray-200 dark:bg-gray-800"></div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  {...register("name")}
                  type="text"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-transparent text-gray-900 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 outline-none transition-all font-bold placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs font-bold mt-1">{errors.name.message}</p>}
            </div>

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
              <label className="block text-xs font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">Secure Password</label>
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
              className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] text-sm font-black text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-all active:scale-[0.98] mt-6"
            >
              {isSubmitting ? <><ButtonSpinner /> Registering...</> : <>Create Free Account <ArrowRight size={18} strokeWidth={3} /></>}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-500">
                Sign in here
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
