'use client';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { FaStar, FaBuilding, FaUserTie, FaPlusCircle } from 'react-icons/fa';
import Link from 'next/link';
import { RatingDialog } from '@/components/admin/rating/RatingDialog';
import { Profile, RATING_CRITERIA_DEFINITIONS, RatingCriterionValue, RatingSubmission } from '@/types/model/type'; // فرض بر اینکه همه تایپ‌ها در این فایل هستند
import useCompanyStore from '@/stores/companyStore';
import { useCompanyGetRequest } from '@/hooks/company/getCompany';
import useUserStore from '@/stores/employStore';
import { calculateOverallAverage } from '@/util/calculateOverallAverage';
import { addRatingRequest } from '@/services/user/rating';

// ✅ کامپوننت کارت پروفایل یکپارچه شده
const ProfileCard: React.FC<{ profile: Profile; handleOpenRatingDialog: (profile: Profile) => void }> = ({ profile, handleOpenRatingDialog }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 flex flex-col">
    <div className="p-6 flex-grow">
      <div className="flex items-start space-x-4 space-x-reverse">
        <img
          src={profile.avatarUrl || 'https://placehold.co/80x80/cccccc/333333?text=P'}
          alt={`لوگو/آواتار ${profile.name}`}
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 flex-shrink-0"
          onError={(e) => (e.currentTarget.src = 'https://placehold.co/80x80/cccccc/333333?text=Error')}
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 truncate">
            {/* ✅ لینک داینامیک بر اساس نوع پروفایل */}
            <Link href={profile.type === 'company' ? `/companies/${profile.id}` : `/prof/${profile.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
              {profile.name}
            </Link>
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex items-center">
            {profile.type === 'company' ? <FaBuilding className="ml-1 rtl:mr-1 rtl:ml-0 flex-shrink-0" /> : <FaUserTie className="ml-1 rtl:mr-1 rtl:ml-0 flex-shrink-0" />}
            {profile.type === 'company' ? 'شرکت' : 'کارمند'}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2 mb-3">
            {profile.description || 'توضیحاتی برای این پروفایل ارائه نشده است.'}
          </p>
        </div>
      </div>
    </div>
    <div className="mt-auto pt-4 p-6 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FaStar className={`mr-1 rtl:ml-1 rtl:mr-0 ${profile.overallAverageRating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} size={20} />
          <span className="text-lg font-bold text-gray-700 dark:text-gray-200">
            {profile.overallAverageRating !== undefined ? profile?.overallAverageRating?.toFixed(1) : 'بدون امتیاز'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mr-1 rtl:ml-1 rtl:mr-0">
            ({profile.ratings.length} نظر)
          </span>
        </div>
        <button
          onClick={() => handleOpenRatingDialog(profile)}
          className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-2 px-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out flex items-center"
        >
          <FaPlusCircle className="ml-1 rtl:mr-1 rtl:ml-0" />
          امتیاز دهید
        </button>
      </div>
    </div>
  </div>
);


const ProfilesPage: NextPage = () => {
  const companies = useCompanyStore((state) => state.companies);
  const employees = useUserStore((state) => state.users);
  const setCompanyList = useCompanyStore((state) => state.setCompanyList);
  const setProfiles = useUserStore((state) => state.setProfiles);
  const { mutate } = useCompanyGetRequest();

  useEffect(() => {
    mutate(1);
  }, []);

  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState<'companies' | 'employees'>('companies');

  // ✅ تابع باز کردن دیالوگ حالا همیشه یک پروفایل یکپارچه دریافت می‌کند
  const handleOpenRatingDialog = (profile: Profile) => {
    setSelectedProfile(profile);
    setIsRatingDialogOpen(true);
  };

  const handleCloseRatingDialog = () => {
    setIsRatingDialogOpen(false);
    setSelectedProfile(null);
  };

  const handleRateSubmit = (criteriaValues: RatingCriterionValue[], comment?: string) => {
    if (!selectedProfile) return;

    const newSubmission: RatingSubmission = {
      id: `rating-${Date.now()}`,
      raterName: 'کاربر مهمان',
      criteriaValues,
      comment,
      timestamp: new Date(),
      averageScore: parseFloat((criteriaValues.reduce((sum, cv) => sum + cv.score, 0) / criteriaValues.length).toFixed(1)),
    };
    
    // ✅ منطق آپدیت کردن امتیاز حالا کاملا درست کار می‌کند
    if (selectedProfile.type === 'company') {
        addRatingRequest({ rateable_type: 'company', rateable_id: Number(selectedProfile.id), criteriaValues: newSubmission.criteriaValues, comment: newSubmission.comment });
        const updatedCompanyList = companies.map(c => {
            if (c.id === Number(selectedProfile.id)) {
                const updatedRatings = [...c.ratings, newSubmission];
                return {
                    ...c,
                    ratings: updatedRatings,
                    overallAverageRating: calculateOverallAverage(updatedRatings),
                };
            }
            return c;
        });
        setCompanyList(updatedCompanyList);
    } else { // type is 'employee'
        addRatingRequest({ rateable_type: 'user', rateable_id: Number(selectedProfile.id), criteriaValues: newSubmission.criteriaValues, comment: newSubmission.comment });
        const updatedEmployeeList = employees.map(p => {
            if (p.id === selectedProfile.id) {
                const updatedRatings = [...p.ratings, newSubmission];
                return { 
                    ...p, 
                    ratings: updatedRatings, 
                    overallAverageRating: calculateOverallAverage(updatedRatings) 
                };
            }
            return p;
        });
        setProfiles(updatedEmployeeList);
    }

    handleCloseRatingDialog();
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen" dir="rtl">
      <Head>
        <title>لیست شرکت‌ها و کارمندان | سامانه ارزیابی</title>
        <meta name="description" content="مشاهده و امتیازدهی به شرکت‌ها و کارمندان در سامانه شبکه‌سازی و ارزیابی حرفه‌ای." />
      </Head>

      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            لیست شرکت‌ها و کارمندان
          </h1>
          <div className="mt-4">
            <nav className="flex space-x-2 sm:space-x-4 space-x-reverse border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('companies')}
                className={`py-2 px-3 sm:px-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'companies'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <FaBuilding className="inline ml-1 rtl:mr-1 rtl:ml-0" /> شرکت‌ها
              </button>
              <button
                onClick={() => setActiveTab('employees')}
                className={`py-2 px-3 sm:px-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'employees'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <FaUserTie className="inline ml-1 rtl:mr-1 rtl:ml-0" /> کارمندان
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeTab === 'companies'
            ? companies.map(company => {
                // ✅ تبدیل داده شرکت به پروفایل استاندارد قبل از ارسال به کامپوننت کارت
                const profile: Profile = {
                  id: company.id.toString(),
                  name: company.name,
                  type: 'company',
                  avatarUrl: company.logo,
                  description: company.industry,
                  ratings: company.ratings,
                  overallAverageRating: company.overallAverageRating,
                };
                return <ProfileCard key={company.id} profile={profile} handleOpenRatingDialog={handleOpenRatingDialog} />;
              })
            : employees.map(profile => (
                <ProfileCard key={profile.id} profile={profile} handleOpenRatingDialog={handleOpenRatingDialog} />
              ))}
        </div>
        
        {/* Loding And Empty State ... */}

      </main>

      {selectedProfile && (
        <RatingDialog
          isOpen={isRatingDialogOpen}
          onClose={handleCloseRatingDialog}
          onSubmit={handleRateSubmit}
          targetName={selectedProfile.name}
          criteriaDefinitions={RATING_CRITERIA_DEFINITIONS}
        />
      )}
    </div>
  );
};

export default ProfilesPage;