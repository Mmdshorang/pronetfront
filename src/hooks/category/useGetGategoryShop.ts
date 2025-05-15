"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { categorymodel } from "@/types/server/category";
import { getCategoryShopRequest } from "@/services/category/getCategoryShopt";
import { useCategoryStore } from "@/stores/categoryStore";

const useGetCategoryShopRequest = () => {
  const { data, ...query } = useQuery<categorymodel[]>({
    queryKey: ["shop-categories"],
    queryFn: () => getCategoryShopRequest(),
    staleTime: 1000 * 60 * 5,
  });

  const setCategories = useCategoryStore((state) => state.setCategories);

  useEffect(() => {
    if (data) {
      setCategories(data); 
    }
  }, [data, setCategories]);

  return { data, ...query };
};

export default useGetCategoryShopRequest;
