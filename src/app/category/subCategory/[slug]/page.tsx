"use client";

import { useState } from "react";
import ProductCard from "@/components/cart/CartProduct";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import classes from "@/app/products/Product.module.css";
import Pagination from "@/components/Pagination";
import CategoryAccordion from "@/components/category/CategoryAccordion";
import { useParams } from "next/navigation";
import { useCategoryStore } from "@/stores/categoryStore";
import { categorymodel } from "@/types/server/category";
import { cartItems } from "@/types/common/createRegisterPayload";


const CategoryItem = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const params = useParams();
  const slug = decodeURIComponent(params?.slug as string);
  const categorys = useCategoryStore(
    (state: { categories: categorymodel[] }) => state.categories
  );
  const category = categorys.find((cat: categorymodel) => cat.RowName === slug);

  return (
    <div className={classes.main}>
      <Navbar />
      <h1 className={classes.name} dir="rtl">
        محصولات دسته {category?.RowID || slug}
      </h1>
      <div className={classes.category}>
        <CategoryAccordion />

        <div className={classes.products}>
          {cartItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
      <div className="mt-10 mb-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <Footer />
    </div>
  );
};
export default CategoryItem;
