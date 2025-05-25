"use client";
import Image from "next/image";
import Link from "next/link";
import { getCompany } from "@/types/server/company";

interface Props {
  company: getCompany;
  route?: string;
}

const CompanyItem = ({ company }: Props) => {
  return (
    <Link
      href={`/companies/${company.id}`} // لینک به صفحه جزئیات شرکت
      className="w-[240px] min-w-[240px] h-[300px] bg-white shadow-md rounded-[24px] flex flex-col items-center justify-center p-6 hover:shadow-lg transition-all"
    >
      <Image
        src={company.logo ? `/logos/${company.logo}` : "/DefaultImageGood.png"}
        alt={company.name}
        width={120}
        height={120}
        className="object-contain rounded-full"
      />
      <span className="mt-6 text-center text-lg font-semibold text-gray-800 line-clamp-2 leading-tight">
        {company.name}
      </span>
      <span className="text-sm text-gray-500 mt-2">{company.city}</span>
      <span className="text-sm text-yellow-500 mt-2">
        ⭐ {company.avg_rating.toFixed(1)}
      </span>
      <span className="text-sm text-yellow-500 mt-2">
        تعدادکل رای {company.ratings_count}
      </span>
    </Link>
  );
};

export default CompanyItem;
