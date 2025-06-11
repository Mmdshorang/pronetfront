'use client';
import Head from 'next/head';
import { FaBuilding, FaGlobe, FaPhone, FaMapMarkerAlt, FaUserCircle, FaIndustry, FaCommentDots } from 'react-icons/fa';

import { use, useEffect } from 'react';
import { useCompanyGetByIDRequest } from '@/hooks/company/getCompany';
import { useCompanyEmployeesGetByIDRequest } from '@/hooks/company/getCompanyEmployees';
import RatingCard, { StarRating } from '@/components/admin/compony/RatingCard';
import EmployeeCard from '@/components/admin/compony/EmployeeCard';


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

