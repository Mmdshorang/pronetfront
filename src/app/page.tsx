'use client';
import Navbar from "@/components/shared/Navbar";
import Slideshow from "@/components/slideShow/SlideShow";
import Footer from "@/components/shared/Footer";
import CategoryGrid from "@/components/category/CategoryGrid";
import classes from "./Home.module.css";
import Items from "@/components/cart/Items";
import Discount from "@/components/discount/Discounts";
import Features from "@/components/Feature";
import CompaniesGrid from "@/components/company/CompaniesGrid";




export default function Home() {
  

 
  return (
    <div className={classes.main}>
      <Navbar />
      <div className="mt-10">
        <Slideshow />
      </div>
      <div className="mt-10 mb-10 h-[500px]">
        <Discount />
      </div>
      <CompaniesGrid />
      <div className="mt-10">
        <CategoryGrid />
      </div>
      <div className=" mb-10">
        <Items text="جدیدترین ها" link="newproducts" tag="NewGood" />
      </div>
      <div>
        <Features />
      </div>
      <div className="mt-10 ">
        <Footer />
      </div>
    </div>
  );
}
