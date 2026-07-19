import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Book {
  id: string;
  title: string;
  price: number;
  imageUrls: string[];
  author?: { id: string; name: string };
  publisher?: { id: string; name: string };
  [key: string]: any;
}

interface WishlistState {
  items: Book[];
  addItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (book) => set((state) => {
        if (state.items.find((item) => item.id === book.id)) {
          return state;
        }
        return { items: [...state.items, book] };
      }),
      removeItem: (bookId) => set((state) => ({
        items: state.items.filter((item) => item.id !== bookId),
      })),
      isInWishlist: (bookId) => {
        return get().items.some((item) => item.id === bookId);
      },
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'pathdigonto-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
