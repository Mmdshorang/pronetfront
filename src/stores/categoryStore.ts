import { create } from "zustand";
import { persist } from "zustand/middleware";
import { categorymodel } from "@/types/server/category";

interface CategoryState {
  categories: categorymodel[];
  setCategories: (categories: categorymodel[]) => void;
  clearCategories: () => void;
}

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      categories: [],
      setCategories: (categories) => set({ categories }),
      clearCategories: () => set({ categories: [] }),
    }),
    {
      name: "category-storage", // نام کلید در localStorage
      partialize: (state) => ({ categories: state.categories }), // اگر فقط بخوای دسته‌ها ذخیره بشن
    }
  )
);
