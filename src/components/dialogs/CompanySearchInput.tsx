// components/CompanySearchInput.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';

import { debounce } from 'lodash';
import { SearchResult } from '@/types/server/user';
import { useSearchRequest } from '@/hooks/user/search';

interface CompanySearchInputProps {
  initialValue: string;
  onCompanySelect: (company: { id: number | null; name: string; website?: string | null }) => void;
}

const CompanySearchInput: React.FC<CompanySearchInputProps> = ({ initialValue, onCompanySelect }) => {
  const [query, setQuery] = useState(initialValue);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { mutate, data, isPending } = useSearchRequest();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // استفاده از debounce برای جلوگیری از ارسال درخواست‌های زیاد به سرور
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim().length > 1) {
        mutate(searchQuery);
        setIsDropdownOpen(true);
      } else {
        setIsDropdownOpen(false);
      }
    }, 500), // 500 میلی‌ثانیه تاخیر
    [mutate]
  );

  useEffect(() => {
    debouncedSearch(query);
    // Cleanup a تابع debounce در زمان unmount شدن کامپوننت
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  // به‌روزرسانی نتایج جستجو وقتی داده‌های جدید از هوک دریافت می‌شود
  useEffect(() => {
    if (data?.data) {
      // فقط شرکت‌ها را نمایش می‌دهیم
      const companyResults = data.data.filter(item => item.type === 'company');
      setResults(companyResults);
    }
  }, [data]);
  
  // بستن دراپ‌داون هنگام کلیک بیرون از کامپوننت
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    // اگر کاربر نام شرکت را دستی وارد کند، آن را به عنوان یک شرکت جدید در نظر می‌گیریم
    onCompanySelect({ id: null, name: newQuery });
  };

  const handleSelectCompany = (company: SearchResult) => {
    setQuery(company.name);
    // چون در API شما فیلد website وجود ندارد، آن را خالی می‌گذاریم
    // اگر در آینده اضافه شد، می‌توانید آن را اینجا مقداردهی کنید.
    onCompanySelect({ id: company.id, name: company.name });
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">نام شرکت</label>
      <input
        type="text"
        name="name"
        id="companyName"
        value={query}
        onChange={handleInputChange}
        onFocus={() => query && results.length > 0 && setIsDropdownOpen(true)}
        required
        className="mt-1 input-style"
        autoComplete="off"
      />
      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {isPending && <div className="p-3 text-center text-gray-500">درحال جستجو...</div>}
          {!isPending && results.length === 0 && query.length > 1 && (
            <div className="p-3 text-center text-gray-500">شرکتی یافت نشد.</div>
          )}
          {!isPending && results.length > 0 && (
            <ul>
              {results.map((company) => (
                <li
                  key={company.id}
                  onClick={() => handleSelectCompany(company)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-3"
                >
                  <img src={company.photo || '/default-logo.png'} alt={company.name} className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-gray-900 dark:text-white">{company.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanySearchInput;