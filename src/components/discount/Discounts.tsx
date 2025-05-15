"use client";

import { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CartProduct from "@/components/cart/CartProduct";
import classes from "./Discount.module.css";
import Link from "next/link";
import { Product } from "@/types/server/productsType";

export const data: Product = {
  id: 1,
  title: "ژل ماشین ظرفشویی پروشاین",
  description: "ژل شست‌وشوی قوی برای ظروف با حجم 1000 میلی‌لیتر",
  price: 180000,
  discountPrice: 145000,
  image: "/images/products/gel.jpg",
  discountPercent: 20,
  salePrice: 180000,
  stock: 100,
  unit: "عدد",
  category: "شوینده‌ها",
  isAvailable: true,
};

import Amazing from "@/assets/Amazing.svg";
import Amazings from "@/assets/Amazings.svg";
import Image from "next/image";
const Discount: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1020);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {!isMobile && (
        <div className="flex border-2 border-red-500 p-5 bg-red-500 w-[92%] rounded-[50px] mx-auto">
          <div className="items-center justify-between p-5 rounded-lg">
            <div className={classes.amazing}>
              <Link href={`/discounts`}>
                <Image src={Amazings} alt="" />
                <Image src={Amazing} alt="" className="mr-3" />
              </Link>
            </div>
            <div className={classes.LRIcon}>
              <button
                className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-400 transition"
                onClick={scrollRight}
              >
                <FaChevronRight size={18} />
              </button>
              <button
                className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-400 transition"
                onClick={scrollLeft}
              >
                <FaChevronLeft size={18} />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              ref={sliderRef}
              className="flex overflow-x-scroll scroll-smooth scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {[...Array(10)].map((_, index) => (
                <div key={index}>
                  <CartProduct product={data} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <div className=" border-2 border-red-500 p-5 bg-red-500 w-[97%] items-center mr-3 rounded-[50px]">
          <div className="flex items-center justify-between p-5 rounded-lg">
            <div className={classes.amazing}>
              <Link href={`/discounts`} className="flex">
                <Image src={Amazings} alt="" />
                <Image src={Amazing} alt="" className="mr-3" />
              </Link>
            </div>
            <div className={classes.LRIcon}>
              <button
                className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-400 transition"
                onClick={scrollRight}
              >
                <FaChevronRight size={18} />
              </button>
              <button
                className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-400 transition"
                onClick={scrollLeft}
              >
                <FaChevronLeft size={18} />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              ref={sliderRef}
              className="flex overflow-x-scroll scroll-smooth scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {[...Array(10)].map((_, index) => (
                <div key={index}>
                  <CartProduct product={data} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Discount;
