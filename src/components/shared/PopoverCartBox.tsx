// components/CartPopover.tsx
"use client";

import { Product } from "@/types/server/productsType";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Ro from "@/assets/2016-09-20_22-10-04.jpg";

export const product: Product[] = [
  {
    id: 6,
    title: "ست ماگ کادویی وگل ۴۱۵۰-۵۹",
    price: 45450000,
    quantity: 1,
    image: Ro.src,
    description: "",
    discountPercent: 0,
    discountPrice: 0,
    salePrice: 4545,
    stock: 10,
    unit: "عدد",
    category: "لوازم آشپزخانه",
    isAvailable: true,
  },
  {
    id: 1,
    title: "ست ماگ کادویی وگل ۴۱۵۰-۵۹",
    price: 4545,
    quantity: 1,
    image: Ro.src,
    description: "",
    discountPercent: 0,
    discountPrice: 0,
    salePrice: 4545,
    stock: 10,
    unit: "عدد",
    category: "لوازم آشپزخانه",
    isAvailable: true,
  },
  {
    id: 2,
    title: "ست ماگ کادویی وگل ۴۱۵۰-۵۹",
    price: 4545,
    quantity: 1,
    image: Ro.src,
    description: "",
    discountPercent: 0,
    discountPrice: 0,
    salePrice: 4545,
    stock: 10,
    unit: "عدد",
    category: "لوازم آشپزخانه",
    isAvailable: true,
  },
  {
    id: 3,
    title: "ست ماگ کادویی وگل ۴۱۵۰-۵۹",
    price: 4545,
    quantity: 1,
    image: Ro.src,
    description: "",
    discountPercent: 0,
    discountPrice: 0,
    salePrice: 4545,
    stock: 10,
    unit: "عدد",
    category: "لوازم آشپزخانه",
    isAvailable: true,
  },
  {
    id: 4,
    title: "ست ماگ کادویی وگل ۴۱۵۰-۵۹",
    price: 4545,
    quantity: 1,
    image: Ro.src,
    description: "",
    discountPercent: 0,
    discountPrice: 0,
    salePrice: 4545,
    stock: 10,
    unit: "عدد",
    category: "لوازم آشپزخانه",
    isAvailable: true,
  },
  {
    id: 5,
    title: "ست ماگ کادویی وگل ۴۱۵۰-۵۹",
    price: 4545,
    quantity: 1,
    image: Ro.src,
    description: "",
    discountPercent: 0,
    discountPrice: 0,
    salePrice: 4545,
    stock: 10,
    unit: "عدد",
    category: "لوازم آشپزخانه",
    isAvailable: true,
  },
];

const CartPopover: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // برای بستن پنجره وقتی بیرون کلیک شد
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(true);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 500); // کمی تاخیر برای اطمینان از خروج کامل موس
  };

  return (
    <div className="relative inline-block" ref={cartRef}>
      {/* دکمه یا آیکون سبد خرید */}
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="hidden lg:flex relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
          3
        </span>
      </button>
      {/* پنجره بازشو */}
      {isOpen && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute left-0 mt-2 w-100 bg-white shadow-lg border rounded z-50"
        >
          <div className="flex flex-col p-3 bg-white shadow-md rounded-lg border border-gray-200 w-full max-w-md md:max-w-lg">
            {/* تصویر و اطلاعات محصول */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                <Image
                  src={product[0].image}
                  alt={product[0].title}
                  className="rounded-md object-cover w-full h-full"
                  width={80}
                  height={80}
                />
              </div>
              <div className="text-right w-full">
                <h3 className="text-sm md:text-base font-medium text-gray-800 truncate max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {product[0].title}
                </h3>
                <p className="text-green-500 text-xs md:text-sm mt-0.5 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {product[0].discountPrice} تومان تخفیف
                </p>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-lg md:text-xl font-bold max-w-[60%] overflow-hidden text-ellipsis whitespace-nowrap">
                    {product[0].price} تومان
                  </p>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse border px-2 py-1 rounded-md gap-5">
                    <button className="text-xs md:text-sm text-gray-700">
                      ➕
                    </button>
                    <span className="text-sm md:text-base font-medium text-gray-800">
                      {product[0].quantity}
                    </span>
                    <button className="text-xs md:text-sm text-gray-700">
                      ➖
                    </button>
                    <button className="text-red-500 text-sm md:text-lg">
                      ❌
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPopover;
