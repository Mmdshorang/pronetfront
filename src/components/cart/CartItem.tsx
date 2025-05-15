import { Product } from "@/types/server/productsType";
import Image from "next/image";

const CartItemCard: React.FC<Product> = (product: Product) => {
  return (
    <div className="flex flex-col p-3 bg-white shadow-md rounded-lg border border-gray-200 w-full max-w-md md:max-w-lg">
      {/* تصویر و اطلاعات محصول */}
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
          <Image
            src={product.image}
            alt={product.title}
            className="rounded-md object-cover w-full h-full"
            width={80}
            height={80}
          />
        </div>
        <div className="text-right w-full">
          <h3 className="text-sm md:text-base font-medium text-gray-800 truncate max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {product.title}
          </h3>
          <p className="text-green-500 text-xs md:text-sm mt-0.5 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {product.discountPrice} تومان تخفیف
          </p>

          <div className="flex items-center justify-between gap-2">
            <p className="text-lg md:text-xl font-bold max-w-[60%] overflow-hidden text-ellipsis whitespace-nowrap">
              {product.price} تومان
            </p>
            <div className="flex items-center space-x-1 rtl:space-x-reverse border px-2 py-1 rounded-md gap-5">
              <button className="text-xs md:text-sm text-gray-700">➕</button>
              <span className="text-sm md:text-base font-medium text-gray-800">
                {product.quantity}
              </span>
              <button className="text-xs md:text-sm text-gray-700">➖</button>
              <button className="text-red-500 text-sm md:text-lg">❌</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
