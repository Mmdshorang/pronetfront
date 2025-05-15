"use client";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { categorymodel } from "@/types/server/category";
import convertUint8ArrayToBase64 from "@/util/convertUint8ArrayToBase64";
import Link from "next/link";

interface Props {
  category: categorymodel | null;
  route?: string;
}

const CategoryItem = ({ category, route = "#" }: Props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  if (!category) {
    return (
      <div className="text-center text-gray-500 p-4">دسته‌بندی وجود ندارد</div>
    );
  }

  return (
    <div ref={ref} className="items-center p-4 w-[200px] min-w-[200px]">
      <Link
        className="h-[230px] rounded-[20px] bg-white flex flex-col items-center justify-center mb-4 cursor-pointer"
        href={route}
      >
        {inView ? (
          <Image
            src={
              category.Image
                ? convertUint8ArrayToBase64(category.Image)
                : "/DefaultImageGood.png"
            }
            alt={category.RowName}
            width={150}
            height={150}
            className="object-contain"
          />
        ) : (
          <div className="w-[150px] h-[150px] bg-gray-200 animate-pulse rounded-lg" />
        )}
        <span className="text-base font-medium mt-7 px-2 text-center max-w-[180px] w-full break-words line-clamp-2 leading-snug ">
          {category.RowName}
        </span>
      </Link>
    </div>
  );
};

export default CategoryItem;
