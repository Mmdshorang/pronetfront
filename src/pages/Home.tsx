import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            سامانه شبکه‌سازی و ارزیابی حرفها
          </h1>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
            پلتفرم جامع برای ثبت‌نام شرکتها، مدیریت پروفایل کارمندان و نمایش سوابق شغلی به شکلی حرفهای
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ثبت‌نام
            </Link>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              ورود
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            قابلیت‌های اصلی
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-600 text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">مدیریت کارمندان</h3>
              <p className="text-gray-600">
                اضافه کردن و مدیریت کارکنان، مشاهده پروفایل‌ها و ارزیابی عملکرد
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-600 text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">ارزیابی حرفه‌ای</h3>
              <p className="text-gray-600">
                امتیازدهی به همکاران بر اساس قابلیت‌های حرفه‌ای، کار تیمی و اخلاق کاری
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-600 text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">جستجوی پروفایل</h3>
              <p className="text-gray-600">
                مشاهده پروفایل‌های حرفه‌ای و دسترسی به سوابق کاری کارمندان
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            همین حالا شروع کنید
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            به شبکه حرفه‌ای ما بپیوندید و پروفایل خود را بسازید
          </p>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            ثبت‌نام رایگان
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home; 