import { create } from 'zustand';
import { ProductDto } from '@/types/server/productsType';

interface ProductState {
  mostSaleProducts: ProductDto[];
  newProducts: ProductDto[];
  amazingProducts: ProductDto[];
  setMostSaleProducts: (products: ProductDto[]) => void;
  setNewProducts: (products: ProductDto[]) => void;
  setAmazingProducts: (products: ProductDto[]) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  mostSaleProducts: [],
  newProducts: [],
  amazingProducts: [],
  setMostSaleProducts: (products) => set({ mostSaleProducts: products }),
  setNewProducts: (products) => set({ newProducts: products }),
  setAmazingProducts: (products) => set({ amazingProducts: products }),
})); 