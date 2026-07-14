import { create } from 'zustand';

interface AuthStore {
  isLoggedIn: boolean;
  user: any | null;
  checkLoginStatus: () => void;
  setLoggedIn: (status: boolean) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://pathdiganta-book-hub-backend.vercel.app";

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  user: null,
  checkLoginStatus: () => set({ isLoggedIn: typeof window !== 'undefined' && !!localStorage.getItem('token') }),
  setLoggedIn: (status) => set({ isLoggedIn: status, user: status ? useAuthStore.getState().user : null }),
  fetchUser: async () => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/v1/users/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.user) {
        set({ user: data.user, isLoggedIn: true });
      } else {
        set({ user: null, isLoggedIn: false });
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
    set({ user: null, isLoggedIn: false });
  },
}));
