"use client";

import { useEmployRequest } from "@/hooks/user/useGetUsers";
import { useEffect } from "react";



// import useGetCategoryShopRequest from "@/hooks/category/useGetGategoryShop";
// import useProduct from "@/hooks/product/useProduct";
const InitialDataLoader = () => {
  const {mutate } = useEmployRequest();
  // useGetCategoryShopRequest();
  // useProduct();
useEffect(()=>{
mutate()
},[])
  return null;
};

export default InitialDataLoader;
