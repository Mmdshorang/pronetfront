import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import type { NextPage } from 'next';
import Head from 'next/head';

import Link from 'next/link';
import { FaUsers, FaChartLine, FaNetworkWired, FaUserCheck, FaBuilding, FaStar, FaArrowRight } from 'react-icons/fa';
import { FiZap, FiThumbsUp, FiAward } from 'react-icons/fi'; // Using Fi for a slightly different style


interface FeatureCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
      {icon}
    </div>
    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

interface BenefitPillProps {
  text: string;
  icon: React.ReactElement;
}

const BenefitPill: React.FC<BenefitPillProps> = ({ text, icon }) => (
  <div className="flex items-center bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 py-2 px-4 rounded-full text-sm font-medium">
    {icon}
    <span className="ml-2 rtl:mr-2 rtl:ml-0">{text}</span>
  </div>
);


const Home: NextPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200">
      <Navbar  />
      <Head>
        <title>سامانه ارزیابی حرفه‌ای | شبکه سازی و رشد شغلی</title>
        <meta name="description" content="پلتفرم جامع برای ارزیابی عملکرد، نمایش سوابق شغلی و ایجاد شبکه حرفه‌ای برای کارمندان و شرکت‌ها." />
        <link rel="icon" href="/favicon.ico" /> {/* Make sure you have a favicon */}
      </Head>

      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-700 dark:via-blue-800 dark:to-indigo-900 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {/* Decorative background pattern or image can go here */}
          {/* Example: <img src="/path-to-your-abstract-bg.svg" alt="Abstract background" className="w-full h-full object-cover" /> */}
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            آینده شغلی خود را <span className="text-yellow-300">متحول</span> کنید
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-blue-100 dark:text-blue-200">
            به پلتفرم نوین شبکه‌سازی و ارزیابی حرفه‌ای بپیوندید. مهارت‌های خود را به نمایش بگذارید، بازخورد دریافت کنید و مسیر رشد خود را هموار سازید.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/register/company"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              ثبت نام شرکت
            </Link>

            <Link
              href="/register/employee"
              className="bg-transparent hover:bg-white hover:text-blue-700 border-2 border-white text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              ثبت نام کارمند
            </Link>

          </div>
        </div>
      </header>

      <main>
        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                امکانات قدرتمند در دستان شما
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                با استفاده از ابزارهای پیشرفته ما، پتانسیل کامل خود و تیمتان را شکوفا کنید.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FaUserCheck size={28} />}
                title="پروفایل حرفه‌ای کارمندان"
                description="ایجاد و مدیریت پروفایل‌های جامع شامل مهارت‌ها، سوابق شغلی، دستاوردها و پروژه‌ها."
              />
              <FeatureCard
                icon={<FaNetworkWired size={28} />}
                title="شبکه‌سازی داخلی و خارجی"
                description="ارتباط موثر با همکاران، مدیران و مشاهده پروفایل‌ها توسط کاربران بیرونی برای فرصت‌های جدید."
              />
              <FeatureCard
                icon={<FaChartLine size={28} />}
                title="ارزیابی عملکرد و بازخورد"
                description="سیستم امتیازدهی و بازخورد ۳۶۰ درجه بر اساس معیارهای متنوع مانند کار تیمی و اخلاق حرفه‌ای."
              />
              <FeatureCard
                icon={<FaBuilding size={28} />}
                title="مدیریت آسان برای شرکت‌ها"
                description="ثبت‌نام سریع شرکت‌ها، افزودن و مدیریت کارمندان، و بررسی بازخوردهای دریافتی."
              />
              <FeatureCard
                icon={<FiAward size={28} />}
                title="نمایش دستاوردها"
                description="به اشتراک‌گذاری موفقیت‌ها و دریافت تقدیر برای ایجاد انگیزه و اعتبار بیشتر."
              />
              <FeatureCard
                icon={<FiZap size={28} />}
                title="رابط کاربری جذاب و مدرن"
                description="تجربه کاربری روان و دلپذیر برای تمامی کاربران با طراحی واکنش‌گرا و زیبا."
              />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-16 md:py-24 bg-gray-100 dark:bg-gray-850">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                چرا سامانه ما؟ مزایا برای شما و سازمانتان
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                کشف کنید چگونه پلتفرم ما به رشد فردی و موفقیت سازمانی کمک می‌کند.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">برای کارمندان:</h3>
                  <div className="flex flex-wrap gap-3">
                    <BenefitPill icon={<FaStar className="text-green-500" />} text="افزایش اعتبار حرفه‌ای" />
                    <BenefitPill icon={<FiThumbsUp className="text-green-500" />} text="دریافت بازخورد سازنده" />
                    <BenefitPill icon={<FaNetworkWired className="text-green-500" />} text="گسترش شبکه ارتباطی" />
                    <BenefitPill icon={<FaChartLine className="text-green-500" />} text="شناسایی مسیر پیشرفت" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">برای شرکت‌ها:</h3>
                  <div className="flex flex-wrap gap-3">
                    <BenefitPill icon={<FaUsers className="text-green-500" />} text="شناسایی استعدادها" />
                    <BenefitPill icon={<FiAward className="text-green-500" />} text="بهبود فرهنگ سازمانی" />
                    <BenefitPill icon={<FaChartLine className="text-green-500" />} text="افزایش بهره‌وری تیم‌ها" />
                    <BenefitPill icon={<FaBuilding className="text-green-500" />} text="تقویت برند کارفرمایی" />
                  </div>
                </div>
              </div>
              <div className="mt-8 md:mt-0">
                {/* You can place an illustrative image or a more complex graphic here */}
                {/* <Image
                  src="https://placehold.co/600x400/3B82F6/FFFFFF?text=نمودار+رشد+سازمانی&font=arial"
                  alt="تصویر مزایای سامانه"
                 className="rounded-xl shadow-xl w-full h-auto object-cover"
                //  onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400/cccccc/333333?text=Image+Not+Found')}
                /> */}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-blue-600 dark:bg-blue-800 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              آماده‌اید تا به جمع حرفه‌ای‌ها بپیوندید؟
            </h2>
            <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto text-blue-100 dark:text-blue-200">
              همین امروز ثبت‌نام کنید و از تمامی امکانات بی‌نظیر سامانه بهره‌مند شوید.
            </p>
            <Link href="/register"passHref
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-10 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 inline-flex items-center">
          
                شروع کنید <FaArrowRight className="mr-2 rtl:ml-2 rtl:mr-0" />
          
            </Link>
          </div>
        </section>
      </main>
<Footer />
      {/* <Footer /> */} {/* Uncomment if you have a Footer component and want to use it here */}
    </div>
  );
};

export default Home;
