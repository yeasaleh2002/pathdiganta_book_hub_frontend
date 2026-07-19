"use client";

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Star, MessageSquareQuote, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CompanyReviewPage() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating!");
      return;
    }

    if (reviewText.trim().length < 10) {
      toast.error("Please write a bit more! Review must be at least 10 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://pathdiganta-book-hub-backend.vercel.app";
      
      const payload = {
        rating,
        reviewText
      };

      const res = await fetch(`${API_URL}/api/v1/site-reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setIsSuccess(true);
        toast.success("Review submitted successfully! Points will be credited soon.");
      } else {
        toast.error(data.message || data.errors?.[0]?.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error("Review submission failed:", error);
      toast.error("An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPointsEstimate = () => {
    if (rating === 5) return 1500;
    if (rating === 4) return 1000;
    if (rating >= 1) return 500;
    return 0;
  };

  if (isSuccess) {
    return (
      <ProtectedRoute>
        <div className="max-w-2xl mx-auto px-4 py-20 min-h-screen">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 text-center shadow-xl border border-gray-100 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Thank you for your feedback!</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Your {rating}-star review has been recorded. You have successfully earned <span className="font-bold text-amber-500">{getPointsEstimate()} bonus points</span> to your wallet!
            </p>
            <Link href="/dashboard">
              <button className="px-8 py-4 bg-gray-900 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Return to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto px-4 py-12 min-h-screen">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800">
          
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageSquareQuote size={32} />
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Rate Your Experience</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
              We value your feedback! Leave a review for Pathdigonto Book Hub and earn instant loyalty points.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 max-w-xl mx-auto">
            
            {/* Interactive Star Rating */}
            <div className="flex flex-col items-center gap-4 bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star 
                      size={48} 
                      className={`transition-colors ${star <= (hoverRating || rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'}`} 
                    />
                  </button>
                ))}
              </div>
              <div className="h-6 flex items-center justify-center">
                {rating > 0 && (
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-2">
                    <Sparkles size={16} /> 
                    {rating === 5 ? 'Awesome! Earn 1500 Points!' : rating === 4 ? 'Great! Earn 1000 Points!' : `Thank you! Earn 500 Points!`}
                  </span>
                )}
              </div>
            </div>

            {/* Review Text Area */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                Tell us about your experience (Minimum 10 characters)
              </label>
              <textarea
                required
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="What did you love about our service? What can we improve?"
                rows={5}
                maxLength={1000}
                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none"
              />
              <div className="flex justify-between items-center mt-2 text-xs font-medium text-gray-500">
                <span>{reviewText.length}/1000 characters</span>
              </div>
            </div>

            {/* Submit */}
            <button 
              type="submit" 
              disabled={isSubmitting || rating === 0}
              className="w-full py-4 bg-gray-900 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-black text-lg rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <><Loader2 size={20} className="animate-spin" /> Submitting...</>
              ) : (
                'Submit Review'
              )}
            </button>

          </form>

        </div>
      </div>
    </ProtectedRoute>
  );
}
