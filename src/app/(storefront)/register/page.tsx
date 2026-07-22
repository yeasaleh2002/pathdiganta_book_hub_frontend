"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { ButtonSpinner } from '@/components/ui/ButtonSpinner';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

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
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError("");
    try {
      await authRegister(data.name, data.email, data.password);
      // Redirect to OTP verification page; email is passed as query param
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (err: any) {
      setServerError(err.message || "Registration failed. Please try again.");
    }
  };

//   const handleGoogleSSO = async () => {
//     setIsGoogleLoading(true);
//     try {
//       await googleLogin("mock-google-token-data");
//       router.push('/dashboard');
//     } catch (err: any) {
//       setServerError("Google authentication failed.");
//     } finally {
//       setIsGoogleLoading(false);
//     }
//   };

  return (
    <div className="min-h-screen flex w-full bg-white dark:bg-[#0a0a0a] relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-sky-600/10 to-transparent dark:from-sky-900/20 pointer-events-none" />
      <div className="absolute top-40 right-0 w-96 h-96 bg-sky-500/10 dark:bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Centered Authentication Form */}
      <div className="w-full flex items-center justify-center px-4 py-8 sm:p-12 lg:p-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="w-full max-w-md border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-10 shadow-sm bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">Create Account</h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 font-medium">Join Pathdigonto in under 30 seconds.</p>
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
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-transparent text-gray-900 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 outline-none transition-all font-bold placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
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
              className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] text-sm font-black text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-all active:scale-[0.98] mt-6 cursor-pointer disabled:cursor-not-allowed"
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
