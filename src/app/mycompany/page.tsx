'use client';
import CompanyCard from '@/components/admin/compony/CompanyCard';
import { useUserInfoStore } from '@/stores/userStore';
import type {NextPage } from 'next';
import '../prof/myprofile/style.css'

const CompaniesPage: NextPage= () => {
    const user =useUserInfoStore((state) => state.user);
  return (
    <main className="min-h-screen bg-slate-800 p-4 sm:p-6 md:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white., mb-8 border-b-4 border-blue-600 pb-2">
           شرکت های من 
        </h1>

        {user?.companies && user.companies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-600">
              هنوز هیچ سابقه‌ی شغلی ثبت نکرده‌اید.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};



export default CompaniesPage;