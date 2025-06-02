"use client";
import { useEffect, useState } from "react";

import classes from "./Search.module.css"; // کلاس‌های استایل (بسته به پروژه شما)
import { useSearchRequest } from "@/hooks/user/search";
import { SearchResult } from "@/types/server/user";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const { mutate, data, isPending } = useSearchRequest();

  const handleSearch = () => {
    mutate(query); // درخواست جستجو
  };

  // بررسی نتیجه‌ها و بارگذاری مجدد داده‌ها
  useEffect(() => {
    if (data) {
      setResults(data.data);
    }
  }, [data]);

  return (
    <>
      <div className={classes.main}>
        <Navbar />
        <div className={classes.header}>
          <h1 className={classes.title}>جستجو محصولات</h1>
        </div>
        <div className={classes.searchContainer}>
          <div className={classes.searchBox}>
            <input 
              className={classes.searchInput} 
              placeholder="جستجو ..." 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
            />
            <span className={classes.searchIcon}>🔍</span>
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
          >
            جستجو
          </button>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {isPending && <div className="text-center">در حال بارگذاری...</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {results.map((item) => (
              <div key={`${item.type}-${item.id}`} className="border rounded-2xl shadow-md p-4 bg-white">
                <div className="flex items-center gap-3">
                  <img
                    src={item.photo || '/default-avatar.png'}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.email}</p>
                    <span className={`text-xs mt-1 inline-block px-2 py-1 rounded ${
                      item.type === 'user' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {item.type === 'user' ? 'کاربر' : 'شرکت'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!isPending && results.length === 0 && query.trim() !== '' && (
            <p className="text-center text-gray-500 mt-6">نتیجه‌ای یافت نشد.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
