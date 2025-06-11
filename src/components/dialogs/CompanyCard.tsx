// components/CompanyCard.tsx
import React from "react";
import { getCompany } from "@/types/server/company";
import Image from "next/image";

interface Props {
  company: getCompany;
  onClick?: () => void;
}

const CompanyCard: React.FC<Props> = ({ company, onClick }) => {
  return (
    <div
      className="max-w-sm w-full bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center px-6 py-4 space-x-4">
        <Image
          className="w-14 h-14 rounded-full object-cover border border-gray-300"
          src={company.logo}
          alt={company.name}
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{company.name}</h2>
          <p className="text-sm text-gray-500">{company.industry}</p>
        </div>
      </div>
      <div className="px-6 pb-4">
        <div className="flex items-center text-yellow-400 mb-1">
          <svg
            className="w-5 h-5 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.564-.954L10 0l2.946 5.956 6.564.954-4.755 4.635 1.123 6.545z" />
          </svg>
          <span className="ml-1 text-gray-700 font-medium">
            {company.overallAverageRating.toFixed(1) ?? "0.0"} از ۵
          </span>
          <span className="ml-1 text-gray-700 font-medium">
            {company.overallAverageRating.toFixed(1) ?? "0.0"} از ۵
          </span>
        </div>
        <p className="text-sm text-gray-600">شهر: {company.city}</p>
      </div>
    </div>
  );
};

export default CompanyCard;
