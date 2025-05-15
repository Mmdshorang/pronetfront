"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBestSellGoodRequest } from "@/services/product/product";
import { ProductDto } from "@/types/server/productsType";
import { useProductStore } from "@/stores/productStore";

const useProduct = () => {
  const { data, isLoading, ...query } = useQuery<ProductDto[]>({
    queryKey: ["all-products"],
    queryFn: () => getBestSellGoodRequest(),
    staleTime: 1000 * 60 * 5,
  });

  const setMostSaleProducts = useProductStore((state) => state.setMostSaleProducts);
  const setNewProducts = useProductStore((state) => state.setNewProducts);
  const setAmazingProducts = useProductStore((state) => state.setAmazingProducts);

  useEffect(() => {
    if (data) {
      // جداسازی محصولات بر اساس تگ
      const mostSaleProducts = data.filter(product => product.tags?.includes("MostSale"));
      const newProducts = data.filter(product => product.tags?.includes("NewGood"));
      const amazingProducts = data.filter(product => product.tags?.includes("Amazing"));

      // ذخیره در استور
      setMostSaleProducts(mostSaleProducts);
      setNewProducts(newProducts);
      setAmazingProducts(amazingProducts);
    }
  }, [data, setMostSaleProducts, setNewProducts, setAmazingProducts]);

  return { isLoading, ...query };
};

export default useProduct;
