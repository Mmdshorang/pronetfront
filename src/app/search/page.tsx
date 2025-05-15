"use client";
import Navbar from "@/components/shared/Navbar";
import classes from "./Search.module.css";
import Footer from "@/components/shared/Footer";

import CartProduct from "@/components/cart/CartProduct";
import { products } from "@/components/cart/Items";

const Search=()=> {
  return (
    <>
      <div className={classes.main}>
        <Navbar />
        <div className={classes.header}>
          <h1 className={classes.title}>جستجو محصولات</h1>
        </div>
        <div className={classes.searchContainer}>
          <div className={classes.searchBox}>
            <input className={classes.searchInput} placeholder="جستجو ..." />
            <span className={classes.searchIcon}>🔍</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-[30px] mr-[20px]">
          <CartProduct product={products} />
          <CartProduct product={products} />
          <CartProduct product={products} />
          <CartProduct product={products} />
          <CartProduct product={products} />
          <CartProduct product={products} />
          <CartProduct product={products} />
          <CartProduct product={products} />
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Search