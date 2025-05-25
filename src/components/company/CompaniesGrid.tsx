"use client";

import { useEffect, useRef, useState } from "react";

import CompanySkeleton from "./CompanySkeleton";
import CompanyItem from "./CompanyItem";
import useCompanyStore from "@/stores/companyStore";
import { useCompanyGetRequest } from "@/hooks/company/getCompany";
import ScrollButtons from "../shared/ScrollButtons";

const CompaniesGrid = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const {
    companies,
    current_page,
    total,
    per_page,
  } = useCompanyStore();
  const companyMutation = useCompanyGetRequest();
console.log(companies)
  useEffect(() => {
    companyMutation.mutate(1); // بار اول صفحه ۱
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });

    if (nameRef.current) observer.observe(nameRef.current);
    return () => observer.disconnect();
  }, []);

  const handleNextPage = () => {
    if (current_page * per_page < total) {
      companyMutation.mutate(current_page + 1);
    }
  };

  const handlePrevPage = () => {
    if (current_page > 1) {
      companyMutation.mutate(current_page - 1);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-5 py-3">
        <span
          ref={nameRef}
          className={`text-2xl font-bold transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          شرکت‌ها
        </span>
        <ScrollButtons sliderRef={sliderRef} />
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={sliderRef}
          className={`flex gap-5 px-6 overflow-x-auto transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {companies.length === 0
            ? Array.from({ length: 6 }).map((_, i) => (
                <CompanySkeleton key={i} />
              ))
            : companies.map((company ) => (
                <CompanyItem key={company.id} company={company} />
              ))}
        </div>
      </div>

      {/* 🟡 Pagination زیر اسلایدر */}
      <div className="flex justify-center mt-5 gap-4">
        <button
          onClick={handlePrevPage}
          disabled={current_page === 1}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          قبلی
        </button>
        <span className="text-gray-600 font-semibold">
          صفحه {current_page} از {Math.ceil(total / per_page)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={current_page * per_page >= total}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          بعدی
        </button>
      </div>
    </>
  );
};

export default CompaniesGrid;
