"use client";

import { useAuthStore } from '@/store/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://pathdiganta-book-hub-backend.vercel.app";

export const useAuth = () => {
  const register = async (name: string, email: string, password: string) => {
    const res = await fetch(`${API_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }
    return data;
  };

  const verifyRegistration = async (email: string, otp: string) => {
    const res = await fetch(`${API_URL}/api/v1/auth/verify-registration`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || "OTP verification failed");
    }
    // Save JWT token after successful OTP verification so user is immediately logged in
    if (data.token) {
      localStorage.setItem('token', data.token);
      useAuthStore.getState().setLoggedIn(true);
    }
    return data;
  };

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    
    if (!res.ok) {
      const error: any = new Error(data.message || "Login failed");
      error.status = res.status;
      throw error;
    }
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      useAuthStore.getState().setLoggedIn(true);
    }
    return data;
  };

  const googleLogin = async (tokenData: any) => {
    const res = await fetch(`${API_URL}/api/v1/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: tokenData }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || "Google authentication failed");
    }
    if (data.token) {
      localStorage.setItem('token', data.token);
      useAuthStore.getState().setLoggedIn(true);
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    useAuthStore.getState().setLoggedIn(false);
    window.location.href = '/login';
  };

  return { register, verifyRegistration, login, googleLogin, logout };
};
