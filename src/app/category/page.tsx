"use client";

import React from "react";
import classes from "./Category.module.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { useCategoryStore } from "@/stores/categoryStore";
import CategorySkeleton from "@/components/skeleton/CategorySkeleton";
import CategoryItem from "@/components/category/CategortItem";
import { motion } from "framer-motion";

const Category = () => {
  const categories = useCategoryStore((state) => state.categories);

  return (
    <>
      <div className={classes.main}>
        <Navbar />

        <div className={classes.header}>
          <h1 className={classes.title}>دسته‌بندی‌ها</h1>
        </div>

        <div className={classes.searchContainer}>
          <div className={classes.searchBox}>
            <input className={classes.searchInput} placeholder="جستجو ..." />
            <span className={classes.searchIcon}>🔍</span>
          </div>
        </div>

        <div className={classes.gridContainer}>
          {categories.length === 0
            ? Array.from({ length: 6 }).map((_, i) => (
                <CategorySkeleton key={i} />
              ))
            : categories.map((category, i) => (
                <motion.div
                  key={category.RowID}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={classes.itemWrapper}
                >
                  <CategoryItem
                    category={category}
                    route={`category/${category.RowID}`}
                  />
                </motion.div>
              ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Category;
