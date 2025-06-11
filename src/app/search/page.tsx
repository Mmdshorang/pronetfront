"use client";
import { useEffect, useState } from "react";
import { useSearchRequest } from "@/hooks/user/search";
import { SearchResult } from "@/types/server/user";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Search as SearchIcon } from 'lucide-react'; // آیکون برای زیبایی بیشتر

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const { mutate, data, isPending } = useSearchRequest();

  const handleSearch = () => {
    if (query.trim() !== '') {
      mutate(query);
    }
  };

  // بررسی نتیجه‌ها و بارگذاری مجدد داده‌ها
  useEffect(() => {
    if (data) {
      setResults(data.data);
      console.log(data);
    }
  }, [data]);

  return (
    <>
      {/* استفاده از رنگ مورد نظر شما برای پس‌زمینه کل صفحه */}
      <div className="bg-[rgb(31,41,55)] min-h-screen text-white font-sans">
        <Navbar />

        <main className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              جستجوی پیشرفته
            </h1>
            <p className="text-lg text-gray-400">
              کاربران و شرکت‌های مورد نظر خود را به راحتی پیدا کنید.
            </p>
          </div>

          {/* بخش جستجوی مدرن */}
          <div className="flex justify-center items-center gap-2 mb-16">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 text-lg bg-gray-700 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition"
                placeholder="نام کاربر یا شرکت ..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
            </div>
            <button
              onClick={handleSearch}
              disabled={isPending}
              className="bg-blue-600 text-white px-8 py-3 font-semibold rounded-xl hover:bg-blue-700 transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isPending ? '...' : 'جستجو'}
            </button>
          </div>

          {/* نمایش نتایج */}
          <div>
            {isPending && <div className="text-center text-gray-300 text-xl">در حال بارگذاری نتایج...</div>}

            {!isPending && results.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((item) => (
                  <div 
                    key={`${item.type}-${item.id}`} 
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg p-5 flex flex-col items-center text-center transition-transform hover:-translate-y-2"
                  >
                    <img
                      src={`http://localhost:8000/storage/${item.photo}` || '/default-avatar.png'}
                      alt={item.name}
                      className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-gray-600"
                    />
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{item.email}</p>
                    <span className={`text-xs font-bold px-4 py-1 rounded-full ${
                      item.type === 'user' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'
                    }`}>
                      {item.type === 'user' ? 'کاربر' : 'شرکت'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {!isPending && results.length === 0 && query.trim() !== '' && (
              <p className="text-center text-gray-500 text-xl mt-8">نتیجه‌ای برای جستجوی شما یافت نشد.</p>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Search;