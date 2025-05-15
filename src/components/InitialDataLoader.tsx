"use client";

import useGetCategoryShopRequest from "@/hooks/category/useGetGategoryShop";
import useProduct from "@/hooks/product/useProduct";
const InitialDataLoader = () => {
  useGetCategoryShopRequest();
  useProduct();
  return null;
};

export default InitialDataLoader;
