"use client";
import { useState, ReactNode } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Menu, ShoppingCart, Home, User, Box } from "lucide-react";
import Image from "next/image";

const DrawerNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer text-black font-medium rounded-lg text-sm focus:outline-none dark:focus:ring-blue-800"
      >
        <Menu />
      </div>


      <Transition
        show={isOpen}
        enter="transition-transform"
        enterFrom="translate-x-full"
        enterTo="-translate-x-0"
        leave="transition-transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="fixed top-0 right-0 z-[9999] w-64 h-screen p-4 overflow-y-auto bg-white shadow-md">
          <div className="flex justify-between items-center mb-4">
            <Image
              src="/pwa-512x512.svg"
              width={60}
              height={60}
              alt="ShopLogo"
              className="w-10 h-10"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="color-black rounded-lg p-1.5"
            >
              <XMarkIcon className="w-5 h-5" />
              <span className="sr-only color-black">Close menu</span>
            </button>
          </div>
          <ul className="space-y-2 font-medium">
            <DrawerItem label="صفحه اصلی فروشگاه" icone={<Home />} />
            <DrawerItem label="دسته بندی ها" icone={<Menu />} />
            <DrawerItem label="تخفیفات شگفت انگیز" icone={<Box />} />
            <DrawerItem label="سبد خرید" badge="3" icone={<ShoppingCart />} />
            <DrawerItem label="ورود و ثبت نام" icone={<User />} />
          </ul>
        </div>
      </Transition>
    </>
  );
};

const DrawerItem = ({
  label,
  badge,
  icone,
}: {
  icone: ReactNode;
  label: string;
  badge?: string;
}) => (
  <li>
    <a
      href="#"
      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black dark:hover:bg-gray-200 group"
    >
      {icone}
      <span className="flex-1 whitespace-nowrap">{label}</span>
      {badge && (
        <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-white bg-red-500 rounded-full ">
          {badge}
        </span>
      )}
    </a>
  </li>
);

export default DrawerNavigation;
