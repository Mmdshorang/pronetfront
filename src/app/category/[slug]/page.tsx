"use client";

import React from "react";
import { useParams } from "next/navigation";

import classes from "../Category.module.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import { useCategoryStore } from "@/stores/categoryStore";
import CategorySkeleton from "@/components/skeleton/CategorySkeleton";
import CategoryItem from "@/components/category/CategortItem";

const Category = () => {
  const params = useParams();
  const slug = decodeURIComponent(params?.slug as string);
  const categorys = useCategoryStore((state) => state.categories);
  const category = categorys.find((cat) => cat.RowID === parseInt(slug));

  return (
    <>
      <div className={classes.main}>
        <Navbar />
        <div className={classes.header}>
          <div className={classes.title}>
            زیردسته‌بندی {category?.RowName || slug}
          </div>
        </div>
        <div className={classes.searchContainer}>
          <div className={classes.searchBox}>
            <input className={classes.searchInput} placeholder="جستجو ..." />
            <span className={classes.searchIcon}>🔍</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-[15px] mr-[20px]">
          {categorys.length === 0
            ? Array.from({ length: 6 }).map((_, i) => (
                <CategorySkeleton key={i} />
              ))
            : categorys.map((category) => (
                <CategoryItem
                  key={category.RowID}
                  category={category.SubCategory}
                  route={`category/${category.RowName}`}
                />
              ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Category;
