"use client";

import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import Ro from "@/assets/2016-09-20_22-10-04.jpg";
import coca from "@/assets/blog-food-ad-coca.jpg";

const images = [Ro, coca];

const Slideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1020);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      {isMobile && (
        <div className="relative w-full mx-auto aspect-[16/9] sm:aspect-[21/9] ">
          {/* Image container */}
          <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              fill
              className="object-cover transition-transform duration-500"
              priority
            />
          </div>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      )}
      {!isMobile && (
        <div className="relative w-[92%] h-[400px] mx-auto aspect-[16/9] sm:aspect-[21/9]">
          {/* Image container */}
          <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              fill
              className="object-fixed transition-transform duration-500"
              priority
            />
          </div>

          {/* Left arrow */}
          <button
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
            onClick={prevSlide}
            aria-label="Previous Slide"
          >
            <FaChevronLeft size={24} />
          </button>

          {/* Right arrow */}
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
            onClick={nextSlide}
            aria-label="Next Slide"
          >
            <FaChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Slideshow;
