import CartItemCard from "@/components/cart/CartItem";
import Footer from "@/components/shared/Footer";
import { cartItems } from "@/types/common/createRegisterPayload";
import { Product } from "@/types/server/productsType";
import Navbar from "@/components/shared/Navbar";

const CartItemsList: React.FC<{ items: Product[] }> = ({ items }) => (
  <div className="space-y-4 animate-slide-in-left">
    <h2 className="text-2xl font-bold">سبد خرید شما</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {items.map((item) => (
        <CartItemCard key={item.id} {...item} />
      ))}
    </div>
  </div>
);

const PaymentInvoice: React.FC = () => (
  <div className="bg-gray-100 p-4 rounded-2xl shadow-lg">
    <h3 className="text-2xl font-bold text-center">فاکتور پرداخت</h3>
    <textarea
      placeholder="توضیحات سفارش خود را وارد نمایید. (اختیاری)"
      className="w-full p-3 rounded-lg border border-gray-300 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <div className="mt-4 p-4 bg-blue-100 text-blue-700 rounded-lg text-center">
      کالاهای موجود در سبد شما ثبت و رزرو نشده‌اند، برای ثبت سفارش مراحل بعدی را
      تکمیل کنید.
    </div>
    <div className="mt-2 p-4 bg-gray-200 text-gray-700 rounded-lg text-center">
      سفارش شما در ساعات کاری از ساعت ۱۰ صبح تا ۲۲:۳۰ شب ارسال خواهد شد.
    </div>
    <div className="w-full flex flex-row sm:flex-row justify-start items-center gap-2 mt-4">
      <span className="text-gray-500 dark:text-white-10">جزئیات فاکتور :</span>
      <span className="text-textPrimaryLightColor dark:text-textPrimaryDarkColor">
        8 کالا در سبد خرید
      </span>
    </div>
    <div className="w-full flex flex-row sm:flex-row justify-start items-center gap-2 mt-2">
      <span className="text-gray-500 dark:text-white-10">جمع سبد خرید:</span>
      <span className="text-xl font-semibold text-green-500">
        5,022,485 تومان
      </span>
    </div>
    <div className="w-full flex flex-row sm:flex-row justify-start items-center gap-2 mt-2">
      <span className="text-gray-500 dark:text-white-10">ارسال به :</span>
      <span className="text-gray-500 dark:text-white-10">دزفول</span>
    </div>
    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl mt-6 transition duration-300">
      تکمیل فرآیند خرید
    </button>
  </div>
);

const ShoppingCartPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-[#f5f7fa] to-[#c3cfe2] flex flex-col lg:flex-row gap-8 p-8">
        <div className="lg:w-3/4 w-full">
          <CartItemsList items={cartItems} />
        </div>
        <div className="lg:w-1/4 w-full">
          <PaymentInvoice />
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = `
@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in-left {
  animation: slideInLeft 0.5s ease-out forwards;
}
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default ShoppingCartPage;
