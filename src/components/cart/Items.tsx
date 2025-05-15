"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CartProduct from "@/components/cart/CartProduct";
import classes from "./styles/Items.module.css";
import Link from "next/link";
import {  ProductTag } from "@/types/server/productsType";
import { useProductStore } from "@/stores/productStore";




const TextSlider: React.FC<{ text: string; link: string; tag: ProductTag }> = ({
  text,
  link,
  tag,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const { mostSaleProducts, newProducts, amazingProducts } = useProductStore();
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
    <div className="w-full">
      <div className="flex items-center justify-between p-5 rounded-lg ">
        <div>
          <Link href={`/${link}`}>
            <span
              ref={nameRef}
              className={`${classes.name} ${isVisible ? classes.visible : ""}`}
            >
              {text}
            </span>
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

      <div className={`${classes.cartItem} ${isVisible ? classes.visible : ""}`}>
        <div
          ref={sliderRef}
          className="flex overflow-x-scroll scroll-smooth scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {tag === "MostSale" && mostSaleProducts?.map((product) => (
            <div key={product.id}>
              <CartProduct product={product} />
            </div>
          ))}
          {tag === "NewGood" && newProducts?.map((product) => (
            <div key={product.id}>
              <CartProduct product={product} />
            </div>
          ))}
          {tag === "Amazing" && amazingProducts?.map((product) => (
            <div key={product.id}>
              <CartProduct product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextSlider;
