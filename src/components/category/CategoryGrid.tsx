"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useCategoryStore } from "@/stores/categoryStore";
import CategorySkeleton from "../skeleton/CategorySkeleton";
import CategoryItem from "./CategortItem";
import ScrollButtons from "../shared/ScrollButtons";
import classes from "./Category.module.css";

const CategoryGrid = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const categorys = useCategoryStore((state) => state.categories);
  const [isVisible, setIsVisible] = useState(false);
  const nameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });

    if (nameRef.current) {
      observer.observe(nameRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between p-5 rounded-lg ">
        <Link href={"/category"}>
          <span
            ref={nameRef}
            className={`${classes.name} ${isVisible ? classes.visible : ""}`}
          >
            دسته‌بندی ها
          </span>
        </Link>
        <div className="flex space-x-2">
          <ScrollButtons sliderRef={sliderRef} />
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div
          ref={sliderRef}
          className={`${classes.item} ${isVisible ? classes.visible : ""}`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {categorys.length === 0
            ? Array.from({ length: 6 }).map((_, i) => (
                <CategorySkeleton key={i} />
              ))
            : categorys.map((category) => (
                <CategoryItem key={category.RowID} category={category} />
              ))}
        </div>
      </div>
    </>
  );
};

export default CategoryGrid;
