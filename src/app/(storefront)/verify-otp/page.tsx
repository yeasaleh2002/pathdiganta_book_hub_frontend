"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';
import { Mail, ShieldCheck, RefreshCw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ButtonSpinner } from '@/components/ui/ButtonSpinner';

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const { verifyRegistration } = useAuth();

  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // If no email, redirect back to register
  useEffect(() => {
    if (!email) {
      router.replace('/register');
    }
  }, [email, router]);

  const handleDigitChange = (index: number, value: string) => {
    // Only allow numeric characters
    const numeric = value.replace(/\D/g, '');
    if (!numeric && value !== '') return;

    const newDigits = [...digits];
    // Handle paste of full OTP
    if (numeric.length > 1) {
      const pastedDigits = numeric.slice(0, 6).split('');
      pastedDigits.forEach((d, i) => {
        if (index + i < 6) newDigits[index + i] = d;
      });
      setDigits(newDigits);
      const nextFocus = Math.min(index + pastedDigits.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    newDigits[index] = numeric.slice(-1);
    setDigits(newDigits);

    // Auto-advance to next field
    if (numeric && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const otp = digits.join('');
  const isComplete = otp.length === 6;

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!isComplete || isSubmitting) return;

    setIsSubmitting(true);
    setServerError('');

    try {
      const data = await verifyRegistration(email, otp);
      setIsSuccess(true);

      // Save token if backend returns one
      if (data?.token) {
        localStorage.setItem('token', data.token);
        useAuthStore.getState().setLoggedIn(true);
      }

      // Redirect based on role after short success animation
      setTimeout(() => {
        const role = data?.user?.role || data?.role;
        if (role === 'ADMIN') {
          router.push('/admin/dashboard');
        } else {
          router.push('/dashboard');
        }
      }, 1200);
    } catch (err: any) {
      setServerError(err.message || 'Invalid OTP. Please check your email and try again.');
      // Shake effect - clear digits on persistent error
    } finally {
      setIsSubmitting(false);
    }
  }, [otp, isComplete, isSubmitting, email, verifyRegistration, router]);

  // Auto-submit when all digits are filled
  useEffect(() => {
    if (isComplete && !isSubmitting && !serverError) {
      handleSubmit();
    }
  }, [isComplete]);  // eslint-disable-line react-hooks/exhaustive-deps

  const handleResend = async () => {
    if (resendCooldown > 0 || isResending) return;
    setIsResending(true);
    setServerError('');
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      await fetch(`${API_URL}/api/v1/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setResendCooldown(60);
    } catch {
      // Silently ignore resend errors
    } finally {
      setIsResending(false);
    }
  };

  const maskedEmail = email
    ? email.replace(/(.{2})[^@]+(@.+)/, '$1••••$2')
    : '';

  return (
    <div className="min-h-screen flex w-full bg-white dark:bg-[#0a0a0a]">

      {/* Left Branding Panel */}
      <div className="hidden lg:flex w-1/2 bg-indigo-950 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 mix-blend-overlay" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-indigo-900/90" />

        {/* Decorative OTP digit art */}
        <div className="relative z-10 p-16 max-w-2xl text-white select-none">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-2xl">
            <ShieldCheck size={32} className="text-emerald-400" />
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-6 leading-[1.1]">
            One last step to secure your account.
          </h1>
          <p className="text-indigo-200 text-lg font-medium leading-relaxed max-w-lg mb-10">
            We sent a verification code to your inbox. Enter the 6-digit code to activate your Pathdigonto account and start exploring.
          </p>

          {/* Decorative digit boxes */}
          <div className="flex gap-3">
            {['●', '●', '●', '●', '●', '●'].map((dot, i) => (
              <div
                key={i}
                className="w-10 h-12 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center text-white/40 text-xl font-black"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {dot}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right OTP Verification Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 animate-in fade-in slide-in-from-right-8 duration-700">
        <div className="w-full max-w-md">

          {isSuccess ? (
            /* Success State */
            <div className="flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 ring-8 ring-emerald-100/50 dark:ring-emerald-900/20">
                <CheckCircle2 size={48} className="text-emerald-500" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
                Account Verified!
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Your account has been successfully verified. Redirecting you to your dashboard...
              </p>
              <div className="mt-8 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
                <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                Setting up your workspace
              </div>
            </div>
          ) : (
            /* OTP Input State */
            <>
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-6">
                  <Mail size={14} className="text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Email Verification</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                  Check your inbox
                </h2>
                <p className="mt-3 text-gray-500 dark:text-gray-400 font-medium">
                  We've sent a 6-digit code to{' '}
                  <span className="font-black text-gray-800 dark:text-gray-200">{maskedEmail}</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                {/* 6 Individual OTP Digit Boxes */}
                <div className="flex gap-3 justify-between mb-6">
                  {digits.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => { inputRefs.current[index] = el; }}
                      id={`otp-digit-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      value={digit}
                      onChange={e => handleDigitChange(index, e.target.value)}
                      onKeyDown={e => handleKeyDown(index, e)}
                      onFocus={e => e.target.select()}
                      disabled={isSubmitting || isSuccess}
                      className={`
                        w-full aspect-square max-w-[60px] text-center text-2xl font-black rounded-xl border-2 outline-none
                        transition-all duration-200 bg-gray-50 dark:bg-gray-900
                        text-gray-900 dark:text-white
                        ${digit
                          ? 'border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 shadow-[0_0_0_4px_rgba(37,99,235,0.1)]'
                          : 'border-gray-200 dark:border-gray-800 focus:border-blue-600 dark:focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)]'
                        }
                        ${serverError ? 'border-red-400 dark:border-red-600 animate-pulse' : ''}
                        disabled:opacity-50 disabled:cursor-not-allowed
                      `}
                      aria-label={`OTP digit ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Progress indicator */}
                <div className="flex gap-1.5 justify-center mb-6">
                  {digits.map((digit, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        digit ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-800'
                      }`}
                    />
                  ))}
                </div>

                {/* Error Message */}
                {serverError && (
                  <div className="p-4 mb-5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold text-center animate-in zoom-in-95">
                    {serverError}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isComplete || isSubmitting}
                  className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] text-sm font-black text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all active:scale-[0.98]"
                >
                  {isSubmitting
                    ? <><ButtonSpinner /> Verifying...</>
                    : <>Verify Account <ArrowRight size={18} strokeWidth={3} /></>
                  }
                </button>
              </form>

              {/* Resend OTP */}
              <div className="mt-8 text-center">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Didn't receive the code?{' '}
                  <button
                    onClick={handleResend}
                    disabled={resendCooldown > 0 || isResending}
                    className="font-black text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1.5 transition-colors"
                  >
                    {isResending
                      ? <><RefreshCw size={13} className="animate-spin" /> Sending...</>
                      : resendCooldown > 0
                        ? `Resend in ${resendCooldown}s`
                        : <><RefreshCw size={13} /> Resend OTP</>
                    }
                  </button>
                </p>
              </div>

              {/* Back to register */}
              <div className="mt-4 text-center">
                <button
                  onClick={() => router.push('/register')}
                  className="text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  ← Wrong email? Go back to register
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <VerifyOtpContent />
    </React.Suspense>
  );
}
