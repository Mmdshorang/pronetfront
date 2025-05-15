"use client";
import { useState, useEffect } from "react";
import { Menu, ShoppingCart, Home, Folder, User, Box } from "lucide-react";
import Link from "next/link";
import UserMenu from "../profile&login/UserMenu";
import Image from "next/image";
import { usePathname } from "next/navigation";
import DrawerNavigation from "../drawer/DrawerNavigation";
import { useUserStore } from "@/stores/userStore";
import Popover from "./PopoverCartBox";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isLoggedIn } = useUserStore();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1020);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pathname = usePathname();

  const items = [
    {
      key: "cart",
      label: "سبد خرید",
      icon: <ShoppingCart className="w-5 h-5" />,
      href: "/cart",
    },
    {
      key: "menu",
      label: "دسته بندی",
      icon: <Menu className="w-5 h-5" />,
      href: "/menu",
    },
    {
      key: "home",
      label: "خانه",
      icon: <Home className="w-5 h-5" />,
      href: "/",
    },
    {
      key: "products",
      label: "محصولات",
      icon: <Box className="w-5 h-5" />,
      href: "/products",
    },
    {
      key: "profile",
      label: "پروفایل",
      icon: <User className="w-5 h-5" />,
      href: "/profile",
    },
  ];

  return (
    <>
      {!isMobile && (
        <nav className="bg-gray-800 shadow-md p-8 sticky top-[25px] z-50 bg-opacity-50 backdrop-blur-md rounded-[30px] w-[92%] mx-auto">
          <div className="container mx-auto flex justify-between items-center ">
            <div className="text-xl gap-4 font-bold flex items-center">
              <Image
                src="/pwa-512x512.svg"
                width={60}
                height={60}
                alt="ShopLogo"
                className="w-10 h-10"
              />
              <p className="text-white">آدینا رایانه</p>
            </div>
            <ul className="hidden lg:flex items-center gap-20 text-white text-gray-700 text-lg font-bold">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-2 hover:text-yellow-400"
                >
                  <Home className="w-5 h-5" />
                  خانه
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="flex items-center gap-2 hover:text-yellow-400"
                >
                  <Box className="w-5 h-5" />
                  محصولات
                </Link>
              </li>
              <li>
                <Link
                  href="/discounts"
                  className="flex items-center gap-2 hover:text-yellow-400"
                >
                  <Folder className="w-5 h-5" />
                  تخفیفات شگفت انگیز
                </Link>
              </li>
            </ul>
            <div className="flex items-center gap-4">
              <Link href={"/search"}>
                <button className="relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2">
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
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              </Link>

              <Link href="/cart">
                <Popover />
              </Link>
              {isLoggedIn ? (
                <UserMenu />
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hidden lg:flex relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    ثبت نام | ورود
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      )}

      {isMobile && (
        <>
          <nav className="bg-gray-300 shadow-md p-5 sticky top-0 z-50 bg-opacity-70 backdrop-blur-md">
            <div className="container flex justify-between">
              <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
                <DrawerNavigation />
              </button>
              {isLoggedIn ? (
                <UserMenu />
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hidden lg:flex relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    ثبت نام | ورود
                  </Link>
                </>
              )}

              <div className="text-xl gap-4 font-bold text-gray-800 flex items-center">
                <Image
                  src="/pwa-512x512.svg"
                  width={60}
                  height={60}
                  alt="ShopLogo"
                  className="w-10 h-10"
                />
              </div>
              <Link href={"/search"}>
                <button className="relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2">
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
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </nav>

          <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around items-center py-2 z-50 rounded-t-2xl">
            {items.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  href={item.href}
                  key={item.key}
                  className="flex flex-col items-center"
                >
                  {isActive ? (
                    <div className="flex flex-col items-center text-purple-600">
                      <div className="bg-purple-600 text-white p-2 rounded-full shadow-md">
                        {item.icon}
                      </div>
                      <span className="text-sm mt-1 font-bold">
                        {item.label}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-gray-700">
                      {item.icon}
                      <span className="text-xs mt-1">{item.label}</span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
