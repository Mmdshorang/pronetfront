// components/EmployeeSearchInput.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';

import { debounce } from 'lodash';
import { SearchResult } from '@/types/server/user';
import { useSearchRequest } from '@/hooks/user/search';

interface EmployeeSearchInputProps {
  initialValue: string;
  onEmployeeSelect: (employee: { id: number; name: string; photo?: string | null }) => void;
}

const EmployeeSearchInput: React.FC<EmployeeSearchInputProps> = ({ initialValue, onEmployeeSelect }) => {
  const [query, setQuery] = useState(initialValue);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { mutate, data, isPending } = useSearchRequest();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // این useEffect کامپوننت را با مقدار اولیه‌ی ارسال شده از والد همگام می‌کند
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  // استفاده از debounce برای جلوگیری از ارسال درخواست‌های زیاد به سرور
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim().length > 1) {
        mutate(searchQuery);
        setIsDropdownOpen(true);
      } else {
        setIsDropdownOpen(false);
      }
    }, 500), // ۵۰۰ میلی‌ثانیه تاخیر
    [mutate]
  );

  useEffect(() => {
    debouncedSearch(query);
    // Cleanup تابع debounce در زمان unmount شدن کامپوننت
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  // به‌روزرسانی نتایج جستجو وقتی داده‌های جدید از هوک دریافت می‌شود
  useEffect(() => {
    if (data?.data) {
      // فقط کارمندان (کاربران) را نمایش می‌دهیم
      const employeeResults = data.data.filter(item => item.type === 'user');
      setResults(employeeResults);
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
  };

  const handleSelectEmployee = (employee: SearchResult) => {
    setQuery(employee.name);
    onEmployeeSelect({ id: employee.id, name: employee.name, photo: employee.photo });
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative font-sans" ref={wrapperRef}>
      <label htmlFor="employeeName" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
        نام کارمند
      </label>
      <input
        type="text"
        name="name"
        id="employeeName"
        value={query}
        onChange={handleInputChange}
        onFocus={() => query && results.length > 0 && setIsDropdownOpen(true)}
        required
        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-gray-900 dark:text-white"
        autoComplete="off"
        placeholder="جستجوی کارمند..."
      />
      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto animate-fade-in-down">
          {isPending && <div className="p-3 text-center text-gray-500 dark:text-gray-400">درحال جستجو...</div>}
          
          {!isPending && results.length === 0 && query.length > 1 && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">کارمندی با این مشخصات یافت نشد.</div>
          )}

          {!isPending && results.length > 0 && (
            <ul>
              {results.map((employee) => (
                <li
                  key={employee.id}
                  onClick={() => handleSelectEmployee(employee)}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors duration-150 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  <img src={employee.photo || '/default-avatar.png'} alt={employee.name} className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">{employee.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeSearchInput;