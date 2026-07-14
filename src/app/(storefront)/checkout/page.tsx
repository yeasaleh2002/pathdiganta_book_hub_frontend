"use client";

import React, { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AddressStep } from '@/components/checkout/AddressStep';
import { PaymentStep } from '@/components/checkout/PaymentStep';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { CheckCircle2, PackageCheck } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);
  
  // Checkout State Machine
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    setMounted(true);
    // Hard check: Redirect away if the cart is completely empty, preventing phantom orders
    if (items.length === 0) {
      router.push('/books');
    }
  }, [items.length, router]);

  if (!mounted) return null;

  // State Transitions
  const handleAddressComplete = (selectedAddress: any) => {
    setAddress(selectedAddress);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentComplete = (method: string) => {
    setPaymentMethod(method);
    // In actual implementation, payload goes to POST /api/orders
    const orderId = `PHB-${Math.floor(Math.random() * 900000) + 100000}`;
    router.push(`/order-confirmation/${orderId}`);
  };

  return (
    <ProtectedRoute>
      <div className="max-w-[1400px] mx-auto px-4 py-10 min-h-screen">
        
        {/* Checkout Progress Stepper */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Secure Checkout</h1>
          <div className="flex items-center justify-center gap-4 text-sm font-bold">
             <div className={`flex items-center gap-2 transition-colors ${step >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
               <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border-2 ${step >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-400'}`}>
                 {step > 1 ? <CheckCircle2 size={16} /> : 1}
               </div>
               Shipping Details
             </div>
             
             <div className={`w-16 h-0.5 transition-colors ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
             
             <div className={`flex items-center gap-2 transition-colors ${step >= 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
               <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border-2 ${step >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-400'}`}>
                 2
               </div>
               Payment
             </div>
          </div>
        </div>

        {/* Layout Grid Matrix */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Main Funnel Form (Left/Center) */}
          <div className="flex-1 w-full space-y-8 relative">
            
            {/* Step 1 Lock/Unlock logic */}
            <div className={`transition-all duration-500 ${step !== 1 ? 'opacity-50 pointer-events-none hidden lg:block' : ''}`}>
              <AddressStep onComplete={handleAddressComplete} />
            </div>

            {/* Step 2 Injection logic */}
            {step === 2 && (
              <div className="transition-all duration-500 animate-in fade-in slide-in-from-bottom-8">
                <PaymentStep onComplete={handlePaymentComplete} />
                
                {/* Back button logic */}
                <button 
                  onClick={() => setStep(1)} 
                  className="mt-6 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
                >
                  ← Back to Shipping
                </button>
              </div>
            )}

          </div>

          {/* Sticky Order Price Summary (Right) */}
          <div className="w-full lg:w-[420px] flex-shrink-0">
            <OrderSummary />
          </div>

        </div>

      </div>
    </ProtectedRoute>
  );
}
