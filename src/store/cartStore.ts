import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  coverImage: string;
  author: string;
  quantity: number;
}

interface CartState {
  sessionId: string;
  isOpen: boolean;
  items: CartItem[];
  savedForLater: CartItem[];
  loadingItems: Record<string, boolean>;

  // UI Actions
  openDrawer: () => void;
  closeDrawer: () => void;

  // Cart Actions
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  saveForLater: (id: string) => Promise<void>;
  moveToCart: (id: string) => Promise<void>;
  clearCart: () => void;
}

// Mock API Call wrapper to simulate backend synchronization layer
const syncWithBackend = async (action: string, payload: any, sessionId: string) => {
  // Real implementation hits `/api/cart` passing payload & tracking session header.
  await new Promise(resolve => setTimeout(resolve, 400));
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      sessionId: '', // Hydrated immediately below
      isOpen: false,
      items: [],
      savedForLater: [],
      loadingItems: {},

      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),
      clearCart: () => set({ items: [], loadingItems: {} }),

      addItem: async (item) => {
        const state = get();
        const existing = state.items.find(i => i.id === item.id);

        set((s) => ({ loadingItems: { ...s.loadingItems, [item.id]: true } }));

        // Simulating Backend Sync
        await syncWithBackend('ADD', { ...item, quantity: existing ? existing.quantity + (item.quantity || 1) : (item.quantity || 1) }, state.sessionId);

        set((s) => {
          let newItems;
          if (existing) {
            newItems = s.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i);
          } else {
            newItems = [...s.items, { ...item, quantity: item.quantity || 1 }];
          }
          return { items: newItems, isOpen: true, loadingItems: { ...s.loadingItems, [item.id]: false } };
        });
      },

      updateQuantity: async (id, quantity) => {
        if (quantity < 1) return;
        const state = get();
        set((s) => ({ loadingItems: { ...s.loadingItems, [id]: true } }));

        await syncWithBackend('UPDATE', { id, quantity }, state.sessionId);

        set((s) => ({
          items: s.items.map(i => i.id === id ? { ...i, quantity } : i),
          loadingItems: { ...s.loadingItems, [id]: false }
        }));
      },

      removeItem: async (id) => {
        const state = get();
        set((s) => ({ loadingItems: { ...s.loadingItems, [id]: true } }));

        await syncWithBackend('REMOVE', { id }, state.sessionId);

        set((s) => ({
          items: s.items.filter(i => i.id !== id),
          loadingItems: { ...s.loadingItems, [id]: false }
        }));
      },

      saveForLater: async (id) => {
        const state = get();
        const item = state.items.find(i => i.id === id);
        if (!item) return;

        set((s) => ({ loadingItems: { ...s.loadingItems, [id]: true } }));
        await syncWithBackend('SAVE_LATER', { id }, state.sessionId);

        set((s) => ({
          items: s.items.filter(i => i.id !== id),
          savedForLater: [...s.savedForLater, item],
          loadingItems: { ...s.loadingItems, [id]: false }
        }));
      },

      moveToCart: async (id) => {
        const state = get();
        const item = state.savedForLater.find(i => i.id === id);
        if (!item) return;

        set((s) => ({ loadingItems: { ...s.loadingItems, [id]: true } }));
        await syncWithBackend('MOVE_TO_CART', { id }, state.sessionId);

        set((s) => ({
          savedForLater: s.savedForLater.filter(i => i.id !== id),
          items: [...s.items, item],
          loadingItems: { ...s.loadingItems, [id]: false }
        }));
      }
    }),
    {
      name: 'pathdigonto-cart-storage',
      onRehydrateStorage: () => (state) => {
        if (state && !state.sessionId) {
          state.sessionId = uuidv4();
        }
      }
    }
  )
);
