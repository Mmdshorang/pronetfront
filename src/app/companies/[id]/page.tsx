'use client';

import Head from 'next/head';
import Image from 'next/image'; // برای بهینه‌سازی تصاویر Next.js
import { FaBuilding, FaGlobe, FaPhone, FaMapMarkerAlt, FaStar, FaUserCircle, FaEnvelope, FaIndustry, FaCommentDots, FaCalendarAlt, FaListUl } from 'react-icons/fa';
import type { CompanyRating, CompanyEmployee, CompanyShowResponse, CompanyEmployeesResponse } from '../../../types/server/company'; // مسیر را به فایل تایپ‌های خود تغییر دهید
import { use, useEffect } from 'react';
import { useCompanyGetByIDRequest } from '@/hooks/company/getCompany';
import { useCompanyEmployeesGetByIDRequest } from '@/hooks/company/getCompanyEmployees';

// کاپوننت کوچکی برای نمایش ستاره‌ها
const StarRating: React.FC<{ score: number; maxScore?: number; className?: string }> = ({ score, maxScore = 5, className = '' }) => {
  const fullStars = Math.floor(score);
  const halfStar = score % 1 >= 0.5 ? 1 : 0;
  const emptyStars = maxScore - fullStars - halfStar;
  return (
    <div className={`flex items-center ${className}`}>
      {Array(fullStars).fill(0).map((_, i) => <FaStar key={`full-${i}`} className="text-yellow-400" />)}
      {halfStar === 1 && <FaStar key="half" className="text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />}
      {Array(emptyStars).fill(0).map((_, i) => <FaStar key={`empty-${i}`} className="text-gray-300" />)}
      <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-300">({score.toFixed(1)}/{maxScore})</span>
    </div>
  );
};

// کامپوننت برای نمایش یک کارت کارمند
const EmployeeCard: React.FC<{ employee: CompanyEmployee }> = ({ employee }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 flex items-center space-x-4 space-x-reverse">
    {employee.profile_photo ? (
      <Image
        src={employee.profile_photo}
        alt={employee.name}
        width={60}
        height={60}
        className="rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
        onError={(e) => (e.currentTarget.src = 'https://placehold.co/60x60/cccccc/333333?text=E')}
      />
    ) : (
      <FaUserCircle size={60} className="text-gray-400 dark:text-gray-500 rounded-full" />
    )}
    <div>
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{employee.name}</h4>
      <a href={`mailto:${employee.email}`} className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
        <FaEnvelope className="ml-1 rtl:mr-1 rtl:ml-0" />
        {employee.email}
      </a>
    </div>
  </div>
);

// کامپوننت برای نمایش یک کارت امتیاز
const RatingCard: React.FC<{ rating: CompanyRating }> = ({ rating }) => {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      return "تاریخ نامعتبر";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">{rating.rater}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
            <FaCalendarAlt className="ml-1 rtl:mr-1 rtl:ml-0" />
            {formatDate(rating.timestamp)}
          </p>
        </div>
        <div className="mt-2 sm:mt-0">
          <StarRating score={rating.averageScore} className="justify-end" />
        </div>
      </div>

      {rating.comment && (
        <p className="text-gray-700 dark:text-gray-300 italic mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
          <FaCommentDots className="inline ml-2 rtl:mr-2 rtl:ml-0 text-gray-500 dark:text-gray-400" />
          {rating.comment}
        </p>
      )}

      {rating.criteria && rating.criteria.length > 0 && (
        <div>
          <h5 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center">
            <FaListUl className="ml-2 rtl:mr-2 rtl:ml-0" />
            معیارهای امتیازدهی:
          </h5>
          <ul className="space-y-2">
            {rating.criteria.map((criterion, index) => (
              <li key={index} className="flex justify-between items-center text-sm p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                <span className="text-gray-600 dark:text-gray-300">{criterion.criterion}:</span>
                <StarRating score={criterion.score} maxScore={5} className="text-xs" /> {/* فرض می کنیم امتیاز معیارها از 5 است */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


interface CompanyDetailPageProps {
  params: Promise<{ id: string }>;  // 👈 توجه: params حالا Promise هست
}

const CompanyDetailPage = ({ params }: CompanyDetailPageProps) => {


  const { id } = use(params);  // ✅ پارامترها را با use() باز کن
  const { data: companyData, error, isPending, mutate } = useCompanyGetByIDRequest();
  const { data: dataEmployees, error: errorEmployees, isPending: isPendingEmployees, mutate: mutateEmployees } = useCompanyEmployeesGetByIDRequest();

  useEffect(() => {
    if (id) {

      mutate(Number(id));
      mutateEmployees(Number(id));
    }
  }, [id]);
  if (!companyData) {
    // می‌توانید یک کامپوننت لودینگ یا پیام خطا نمایش دهید
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200" dir="rtl">
        داده‌های شرکت در دسترس نیست یا در حال بارگذاری است...
      </div>
    );
  }
  const ratings_count = companyData.data?.ratings_count;
  const average_rating = companyData.data?.average_rating;
  const company = companyData.data?.company;


  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen" dir="rtl">
      <Head>
        <title>{`جزئیات شرکت ${company?.name || 'نامشخص'}`}</title>
        <meta name="description" content={`اطلاعات کامل در مورد شرکت ${company?.name} و کارمندان آن.`} />
      </Head>

      {/* هدر صفحه */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 text-white shadow-lg">
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center">
            {/* {company?.logo ? (
              <Image
                src={company.logo??""}
                alt={`لوگو ${company.name}`}
                width={120}
                height={120}
                className="rounded-full object-cover border-4 border-white shadow-md mb-6 md:mb-0 md:ml-8 rtl:md:mr-8 rtl:md:ml-0"
                onError={(e) => (e.currentTarget.src = 'https://placehold.co/120x120/ffffff/333333?text=C')}
              />
            ) : ( */}
              <FaBuilding size={120} className="rounded-full bg-white p-4 text-indigo-600 shadow-md mb-6 md:mb-0 md:ml-8 rtl:md:mr-8 rtl:md:ml-0" />
            {/* )} */}
            <div className="text-center md:text-right rtl:md:text-left">
              <h1 className="text-4xl font-bold">{company?.name}</h1>
              {company?.industry && (
                <p className="text-lg text-indigo-200 mt-2 flex items-center justify-center md:justify-start">
                  <FaIndustry className="ml-2 rtl:mr-2 rtl:ml-0" />
                  {company.industry}
                </p>
              )}
              <div className="mt-3 flex items-center justify-center md:justify-start">
                <StarRating score={average_rating ?? 0} className="text-xl" />
                <span className="ml-3 rtl:mr-3 text-sm text-indigo-100">({ratings_count} نظر)</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ستون اطلاعات شرکت و امتیازات */}
          <div className="lg:col-span-2 space-y-8">
            {/* بخش درباره شرکت */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 border-b-2 border-blue-500 pb-3">درباره شرکت</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {company?.description || 'توضیحاتی برای این شرکت ارائه نشده است.'}
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                {company?.website && (
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <FaGlobe className="ml-3 rtl:mr-3 rtl:ml-0 text-blue-500" size={20} />
                    <a href={company.website.startsWith('http') ? company.website : `https://${company.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 break-all">
                      {company.website}
                    </a>
                  </div>
                )}
                {company?.phone && (
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <FaPhone className="ml-3 rtl:mr-3 rtl:ml-0 text-blue-500" size={20} />
                    <span>{company.phone}</span>
                  </div>
                )}
                {(company?.city || company?.country) && (
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <FaMapMarkerAlt className="ml-3 rtl:mr-3 rtl:ml-0 text-blue-500" size={20} />
                    <span>{`${company.city || ''}${company.city && company.country ? '، ' : ''}${company.country || ''}`}</span>
                  </div>
                )}
              </div>
            </section>

            {/* بخش امتیازات */}
            {company?.ratings && company.ratings.length > 0 && (
              <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 border-b-2 border-blue-500 pb-3">
                  امتیازات کاربران ({ratings_count})
                </h2>
                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2"> {/* pr-2 for scrollbar space */}
                  {company.ratings.map(rating => <RatingCard key={rating.id} rating={rating} />)}
                </div>
              </section>
            )}
            {(!company?.ratings || company.ratings.length === 0) && (
              <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl text-center">
                <FaCommentDots size={40} className="mx-auto text-gray-400 dark:text-gray-500 mb-3" />
                <p className="text-gray-600 dark:text-gray-300">هنوز هیچ امتیازی برای این شرکت ثبت نشده است.</p>
              </section>
            )}
          </div>

          {/* ستون کارمندان */}
          <aside className="lg:col-span-1 space-y-8">
            <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl sticky top-8"> {/* sticky for fun */}
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 border-b-2 border-blue-500 pb-3">
                کارمندان شرکت ({dataEmployees?.data?.total_employees ?? 0})
              </h2>
              {dataEmployees && dataEmployees.data.employees.length > 0 ? (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2"> {/* pr-2 for scrollbar space */}
                  {dataEmployees.data.employees.map(employee => <EmployeeCard key={employee.id} employee={employee} />)}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaUserCircle size={40} className="mx-auto text-gray-400 dark:text-gray-500 mb-3" />
                  <p className="text-gray-600 dark:text-gray-300">لیست کارمندان در حال حاضر خالی است.</p>
                </div>
              )}
            </section>
          </aside>
        </div>
      </main>

      <footer className="bg-gray-800 dark:bg-gray-900 text-white text-center py-6 mt-12">
        <p>&copy; {new Date().getFullYear()} {company?.name}. تمامی حقوق محفوظ است.</p>
      </footer>
    </div>
  );
};

export default CompanyDetailPage;

// برای استفاده از این کامپوننت، باید داده‌های شرکت و کارمندان را به آن پاس دهید.
// مثال نحوه استفاده (مثلا در getServerSideProps یا getStaticProps یا یک Client Component دیگر که داده‌ها را fetch می‌کند):
/*
// فرض کنید این داده‌ها از API شما آمده‌اند
const sampleCompanyShowResponseData: CompanyShowResponse['data'] = {
  company: {
    id: '1',
    name: 'شرکت فناوری پیشرو پارس',
    description: 'شرکت فناوری پیشرو پارس یک شرکت پیشرو در زمینه ارائه راهکارهای نوین نرم‌افزاری و مشاوره‌های تخصصی فناوری اطلاعات در ایران است. ما به دنبال تحول دیجیتال کسب‌وکارها با استفاده از جدیدترین تکنولوژی‌ها هستیم.\nما تیمی از متخصصان خلاق و متعهد هستیم که به کیفیت و نوآوری اهمیت می‌دهیم.',
    industry: 'فناوری اطلاعات و نرم‌افزار',
    logo: 'https://placehold.co/200x200/4A90E2/FFFFFF?text=PTP', // آدرس لوگوی واقعی شرکت
    city: 'تهران',
    country: 'ایران',
    website: 'www.ptp.example.com',
    phone: '۰۲۱-۱۲۳۴۵۶۷۸',
    ratings: [
      {
        id: 'rating1',
        rater: 'کاربر مهمان ۱',
        comment: 'محیط کاری بسیار پویا و تیم حرفه‌ای. فرصت‌های یادگیری زیادی وجود دارد.',
        timestamp: '2024-05-01T10:00:00Z',
        criteria: [
          { criterion: 'فرهنگ سازمانی', score: 5 },
          { criterion: 'حقوق و مزایا', score: 4 },
          { criterion: 'فرصت پیشرفت', score: 4.5 },
        ],
        averageScore: 4.5,
      },
      {
        id: 'rating2',
        rater: 'رضا احمدی',
        comment: null,
        timestamp: '2024-04-15T14:30:00Z',
        criteria: [
          { criterion: 'فرهنگ سازمانی', score: 4 },
          { criterion: 'تعادل کار و زندگی', score: 3.5 },
        ],
        averageScore: 3.75,
      },
    ],
  },
  average_rating: 4.2,
  ratings_count: 2,
};

const sampleCompanyEmployeesResponseData: CompanyEmployeesResponse['data'] = {
  employees: [
    { id: 1, name: 'سارا رضایی', email: 's.rezaei@example.com', profile_photo: 'https://placehold.co/100x100/FFC0CB/333333?text=SR' },
    { id: 2, name: 'علی محمدی', email: 'a.mohammadi@example.com', profile_photo: null },
    { id: 3, name: 'مریم حسینی', email: 'm.hosseini@example.com', profile_photo: 'https://placehold.co/100x100/ADD8E6/333333?text=MH' },
  ],
  total_employees: 3,
};

// ... در کامپوننت والد یا صفحه Next.js
// return <CompanyDetailPage companyData={sampleCompanyShowResponseData} employeeData={sampleCompanyEmployeesResponseData} />;

*/