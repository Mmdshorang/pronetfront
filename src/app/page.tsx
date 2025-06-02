'use client';
import Navbar from "@/components/shared/Navbar";
import Slideshow from "@/components/slideShow/SlideShow";
import Footer from "@/components/shared/Footer";
import classes from "./Home.module.css";
import Items from "@/components/cart/Items";
import CompaniesGrid from "@/components/company/CompaniesGrid";




export default function Home() {
  

 
  return (
    <div className={classes.main}>
      <Navbar />
      <div className="mt-10">
        <Slideshow />
      </div>
     
      <CompaniesGrid />
      
      <div className=" mb-10">
        <Items text="جدیدترین ها" link="newproducts" tag="NewGood" />
      </div>
      
      <div className="mt-10 ">
        <Footer />
      </div>
    </div>
  );
}
