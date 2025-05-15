"use client";

import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { RefObject } from "react";

interface Props {
  sliderRef: RefObject<HTMLDivElement|null>;
}

const ScrollButtons = ({ sliderRef }: Props) => {
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  return (
    <div className="flex">
      <button
        className="bg-white text-gray-800 p-2 m-2 rounded-full hover:bg-gray-400 transition"
        onClick={scrollRight}
      >
        <FaChevronRight size={18} />
      </button>
      <button
        className="bg-white text-gray-800 p-2 m-2 rounded-full hover:bg-gray-400 transition"
        onClick={scrollLeft}
      >
        <FaChevronLeft size={18} />
      </button>
    </div>
  );
};

export default ScrollButtons;
