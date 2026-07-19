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
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  
  // Checkout State Machine
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  
  // Order Summary State (lifted up for API submission)
  const [orderSummary, setOrderSummary] = useState({ couponCode: '', pointsUsed: 0 });

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

  const handlePaymentComplete = async (method: string) => {
    setPaymentMethod(method);
    
    try {
      const token = localStorage.getItem('token');
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://pathdiganta-book-hub-backend.vercel.app";
      
      const payload: any = {
        shippingAddress: (address as any)?._id || (address as any)?.id,
        paymentMethod: method,
        items: items.map(item => ({
          book: item.id || (item as any)._id,
          quantity: item.quantity
        }))
      };

      if (orderSummary.couponCode) {
        payload.couponCode = orderSummary.couponCode;
      }
      
      if (orderSummary.pointsUsed > 0) {
        payload.pointsUsed = orderSummary.pointsUsed;
      }

      const res = await fetch(`${API_URL}/api/v1/orders/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        const orderId = data.order?._id || data.order?.id || `PHB-${Math.floor(Math.random() * 900000) + 100000}`;
        // Clear cart after successful checkout
        clearCart();
        router.push(`/order-confirmation/${orderId}`);
      } else {
        toast.error(data.message || data.errors?.[0]?.message || 'Failed to place order');
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("An error occurred during checkout.");
    }
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
              <AddressStep 
                onComplete={handleAddressComplete} 
                onAddressSelect={(selectedAddr) => setAddress(selectedAddr)}
              />
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
            <OrderSummary address={address} onSummaryChange={setOrderSummary} />
          </div>

        </div>

      </div>
    </ProtectedRoute>
  );
}
