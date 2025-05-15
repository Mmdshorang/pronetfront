"use client";
import { FC } from "react";
import Image from "next/image";
import daysReturn from "../../public/days-return.38e82b33.svg";
import support from "../../public/support.924e8154.svg";
import original from "../../public/original-products.c4844dcc.svg";
import express from "../../public/express-delivery.43d4168a.svg";

type Feature = {
  title: string;
  description: string;
  icon: string;
};

const features: Feature[] = [
  {
    title: "پرداخت آسان",
    description: "نقدی، آنلاین، کارت‌خوان",
    icon: daysReturn,
  },
  {
    title: "سرویس‌دهی همه‌روزه",
    description: "همه روزه حتی در روزهای تعطیل",
    icon: support,
  },
  {
    title: "تنوع کالا",
    description: "بیش از ۲۰۰ هزار قلم",
    icon: original,
  },
  {
    title: "ارسال سریع",
    description: "ارسال سفارشات در کمتر از ۲ ساعت",
    icon: express,
  },
];

const Features: FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 p-6  text-center">
      {features.map((feature, idx) => (
        <div key={idx} className="flex flex-col items-center space-y-2">
          <Image
            src={feature.icon}
            alt={feature.title}
            width={60}
            height={60}
          />
          <h3 className="font-bold text-lg text-gray-800">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
