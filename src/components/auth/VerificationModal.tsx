"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { ButtonSpinner } from '../ui/ButtonSpinner';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits").regex(/^\d+$/, "Must contain only numbers"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

interface VerificationModalProps {
  email: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export const VerificationModal = ({ email, onClose, onSuccess }: VerificationModalProps) => {
  const [serverError, setServerError] = useState("");
  const { verifyRegistration } = useAuth();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data: OtpFormValues) => {
    setServerError("");
    try {
      await verifyRegistration(email, data.otp);
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/login');
      }
    } catch (err: any) {
      setServerError(err.message || "Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full bg-gray-100 dark:bg-gray-800"
        >
          <X size={20} />
        </button>
        
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verify your email</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
            We've sent a 6-digit code to <span className="font-semibold text-gray-800 dark:text-gray-200">{email}</span>. Please enter it below.
          </p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">One-Time Password</label>
              <input
                {...register("otp")}
                placeholder="123456"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all tracking-widest text-center text-xl font-semibold"
                maxLength={6}
              />
              {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>}
            </div>
            
            {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70"
            >
              {isSubmitting ? <ButtonSpinner /> : "Verify Account"}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">Didn't receive the code? </span>
            <button className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Resend OTP</button>
          </div>
        </div>
      </div>
    </div>
  );
};
