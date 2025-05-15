"use client";

import { useState } from "react";
import ProductCard from "@/components/cart/CartProduct";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import classes from "./Product.module.css";

import Pagination from "@/components/Pagination";
import { cartItems } from "@/types/common/createRegisterPayload";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  return (
    <div className={classes.main}>
      <Navbar />
      <div className={classes.header}>
          <h1 className={classes.title}>محصولات</h1>
        </div>

      <div className={classes.products}>
        {cartItems.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
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
}
