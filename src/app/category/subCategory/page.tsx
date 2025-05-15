"use client";

import React from "react";

import classes from "../Category.module.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import { useCategoryStore } from "@/stores/categoryStore";
import CategorySkeleton from "@/components/skeleton/CategorySkeleton";
import CategoryItem from "@/components/category/CategortItem";

const SubCategory = () => {
  const categorys = useCategoryStore((state) => state.categories);

  return (
    <div className={classes.main}>
      <Navbar />
      <div className={classes.name}>زیردسته‌بندی</div>
      <div className={classes.searchContainer}>
        <input className={classes.searchInput} placeholder="جستجو ..." />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-[15px] mr-[20px]">
        {categorys.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <CategorySkeleton key={i} />
            ))
          : categorys.map((category) => (
              <CategoryItem key={category.RowID} category={category} route={`category/subCategory/${category.SubCategory}`}/>
            ))}
      </div>
      <Footer />
    </div>
  );
};

export default SubCategory;
