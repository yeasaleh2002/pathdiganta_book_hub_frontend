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
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations("Auth");
  
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

//   const handleGoogleSSO = async () => {
//     setIsGoogleLoading(true);
//     try {
//       const response = await googleLogin("mock-google-token-data");
//       if (response?.user?.role === 'ADMIN') {
//         router.push('/admin/dashboard');
//       } else {
//         router.push('/dashboard');
//       }
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
      
      {/* Centered Authentication Form */}
      <div className="w-full flex items-center justify-center px-4 py-8 sm:p-12 lg:p-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="w-full max-w-md border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-10 shadow-sm bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">{t("welcomeBack")}</h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 font-medium">{t("loginSubtitle")}</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">{t("emailLabel")}</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-transparent text-gray-900 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 outline-none transition-all font-bold placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder={t("emailPlaceholder")}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs font-bold mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">{t("passwordLabel")}</label>
                {/* <Link href="/forgot-password" className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-500">Forgot?</Link> */}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-transparent text-gray-900 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 outline-none transition-all font-bold placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder={t("passwordPlaceholder")}
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
              className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] text-sm font-black text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-all active:scale-[0.98] mt-4 cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? <><ButtonSpinner /> {t("authenticating")}</> : <>{t("secureSignIn")} <ArrowRight size={18} strokeWidth={3} /></>}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
              {t("noAccount")}{" "}
              <Link href="/register" className="text-blue-600 hover:text-blue-700 dark:text-blue-500">
                {t("createOneNow")}
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
