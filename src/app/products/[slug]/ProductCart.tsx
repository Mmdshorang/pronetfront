"use client";
import Image from "next/image";
import { useState } from "react";
import imgAddress from "@/assets/Srsf4Xqkzlبارگیری-۳.jpeg";
import img2 from "@/assets/2016-09-20_22-10-04.jpg";
import Navbar from "@/components/shared/Navbar";
import Items from "@/components/cart/Items";
import Footer from "@/components/shared/Footer";
import classes from "./Product.module.css";
import { ShoppingCart } from "lucide-react";

const ProductCart: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(imgAddress);
  const [count, setCount] = useState(0);

  return (
    <div className={classes.main}>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen p-4 w-full h-full">
        <div className="flex flex-col md:flex-row rounded-xl p-4 space-x-4 w-full h-full">
          <div className="flex flex-col items-center w-full h-full">
            <div className="w-full h-full mb-[10px]">
              <Image
                src={selectedImage}
                alt="پودر ژله هندوانه فرمند"
                className="object-cover mt-2 w-[450px] h-[450px]"
              />
            </div>
            <div className="flex">
              <button onClick={() => setSelectedImage(imgAddress)}>
                <Image
                  src={imgAddress}
                  alt=""
                  className={`w-[100px] h-[100px] ml-[15px] ${
                    selectedImage === imgAddress
                      ? "border-2 border-blue-500"
                      : ""
                  }`}
                />
              </button>
              <button onClick={() => setSelectedImage(img2)}>
                <Image
                  src={img2}
                  alt=""
                  className={`w-[100px] h-[100px] ${
                    selectedImage === img2 ? "border-2 border-blue-500" : ""
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center text-right w-full h-full mb-5">
            <span className="bg-red-500 text-white  px-5 py-2 rounded-md w-fit h-10px mb-2 mt-4">
              25% تخفیف ویژه
            </span>
            <h1 className="text-xl font-bold text-gray-800  mt-2">
              ژل ماشین ظرفشویی
            </h1>
          </div>
          <div className="items-center space-x-2 bg-white p-3 rounded-lg w-full h-full">
            <div className="mt-5 w-full h-full mb-10 flex items-center justify-center gap-2">
              <span className="text-gray-400 line-through text-lg">
                ۳۰,۰۰۰ تومان
              </span>
              <span className="text-green-600 font-bold text-xl mr-2">
                ۲۲,۵۰۰ تومان
              </span>
            </div>
            <div>
              {count > 0 ? (
                <div className={classes.counterBox}>
                  <button
                    className={classes.addButton}
                    onClick={() => setCount(count + 1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                  <div className="flex gap-[10px]">
                    <div className={classes.count}>{count}</div>
                    <div className={classes.unit}>عدد</div>
                  </div>
                  <button
                    className={classes.deleteButton}
                    onClick={() => setCount(count - 1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  className={classes.addToCart}
                  onClick={() => setCount(1)}
                >
                  <span className={classes.addToCartText}>
                    افزودن به سبد خرید
                  </span>
                  <ShoppingCart className={classes.addToCartIcon} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[10px] mb-[30px]">
        <Items text="محصولات مشابه" link="" />
      </div>
      <Footer />
    </div>
  );
};

export default ProductCart;
