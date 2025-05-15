"use client";
import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { BsBag } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Head from "next/head";
import { useUserStore } from "@/stores/userStore";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  plate: string;
}

interface Errors {
  [key: string]: string;
}

const EditProfile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    plate: "",
  });
const {user}=useUserStore()
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tempErrors: Errors = {};

    if (!formData.lastName.trim()) {
      tempErrors.lastName = "لطفا نام خانوادگی را وارد نمایید";
    }
    if (!formData.firstName.trim()) {
      tempErrors.firstName = "لطفا نام را وارد نمایید";
    }
    if (!formData.address.trim()) {
      tempErrors.address = "لطفا آدرس را وارد نمایید";
    }
    if (!formData.plate.trim()) {
      tempErrors.plate = "لطفا پلاک را وارد نمایید";
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    alert("فرم با موفقیت ارسال شد!");
  };

  const getInputClass = (fieldName: keyof FormData): string => {
    return `
      w-full px-3 py-2 rounded-md shadow-sm focus:outline-none
      focus:ring-2 focus:ring-blue-500
      ${
        errors[fieldName] ? "border-2 border-red-500" : "border border-gray-300"
      }
    `;
  };

  return (
    // صفحه اصلی
    <>
      <Navbar />
      <Head>
        <title>ویرایش حساب کاربری | فروشگاه شما</title>
        <meta
          name="description"
          content="در این صفحه می‌توانید اطلاعات حساب کاربری خود را ویرایش کنید."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="ویرایش حساب کاربری | فروشگاه شما" />
        <meta
          property="og:description"
          content="اطلاعات حساب کاربری خود را در فروشگاه ویرایش کنید."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/profile" />
        <meta
          property="og:image"
          content="https://yourdomain.com/images/profile-cover.jpg"
        />
      </Head>

      <div
        className="min-h-screen bg-gray-100 p-4 mt-5 flex flex-col items-center gap-6"
        dir="rtl"
      >
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Image
                  src="/pwa-192x192.svg"
                  width={50}
                  height={50}
                  alt="User Avatar"
                  className="rounded-full"
                />
                <div className="flex flex-col text-right ">
                  <span className="font-semibold">نام کاربری</span>
                  <span className="text-sm text-gray-500">{user?.Name??""}</span>
                </div>
              </div>
              <div className="bg-red-100 text-red-500 p-3 rounded-full self-end sm:self-auto">
                <FaSignOutAlt size={20} />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-4 grid grid-cols-2 sm:grid-cols-1 gap-4">
              <div className="flex items-center justify-between w-full bg-gray-50 p-3 rounded-xl">
                <span className="font-medium">سفارشات من</span>
                <BsBag />
              </div>
              <div className="flex items-center justify-between w-full bg-yellow-100 text-yellow-600 font-medium p-3 rounded-xl">
                <span>اطلاعات کاربری</span>
                <FiUser />
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-md p-4 sm:p-6 col-span-1 md:col-span-2">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-gray-700">
                ویرایش حساب کاربری
              </h1>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">
                    نام خانوادگی
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className={`w-full text-right border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputClass(
                      "lastName"
                    )}`}
                    placeholder="نام خانوادگی"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">
                    نام
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className={`w-full text-right border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputClass(
                      "firstName"
                    )}`}
                    placeholder="نام"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">
                    ایمیل
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={`w-full text-right border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputClass(
                      "email"
                    )}`}
                    placeholder="ایمیل"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">
                    شماره ثابت
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className={`w-full text-right border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputClass(
                      "phone"
                    )}`}
                    placeholder="شماره ثابت"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-gray-700 font-medium">
                  آدرس
                </label>
                <textarea
                  name="address"
                  className={`w-full text-right resize-none border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputClass(
                    "address"
                  )}`}
                  placeholder="آدرس"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-gray-700 font-medium">
                  پلاک
                </label>
                <input
                  type="text"
                  name="plate"
                  className={`w-full text-right border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputClass(
                    "plate"
                  )}`}
                  placeholder="پلاک"
                  value={formData.plate}
                  onChange={handleChange}
                />
                {errors.plate && (
                  <p className="text-red-500 text-sm mt-1">{errors.plate}</p>
                )}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  ذخیره
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EditProfile;
