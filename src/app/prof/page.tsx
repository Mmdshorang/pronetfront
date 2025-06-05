'use client';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
// import { Profile, RatingCriterionValue, RATING_CRITERIA_DEFINITIONS } from '../types'; // مسیر را در صورت نیاز تصحیح کنید // این خط کامنت شد
// import { RatingDialog } from '../components/RatingDialog'; // مسیر را در صورت نیاز تصحیح کنید // این خط کامنت شد
import { FaStar, FaBuilding, FaUserTie, FaPlusCircle } from 'react-icons/fa';
import Link from 'next/link';
import { RatingDialog } from '@/components/admin/rating/RatingDialog';
import { Profile, RATING_CRITERIA_DEFINITIONS, RatingCriterionValue } from '@/types/model/type';
import useCompanyStore from '@/stores/companyStore';
import { useCompanyGetRequest } from '@/hooks/company/getCompany';

import useUserStore from '@/stores/employStore';
import { getCompany } from '@/types/server/company';
import { calculateOverallAverage } from '@/util/calculateOverallAverage';
import { addRatingRequest } from '@/services/user/rating';



const ProfileCard: React.FC<{ profile: Profile, handleOpenRatingDialog: (profile: Profile) => void }> = ({ profile, handleOpenRatingDialog }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 flex flex-col">
    <div className="p-6 flex-grow">
      <div className="flex items-start space-x-4 space-x-reverse">
        <img
          src={profile.avatarUrl || (profile.type === 'company' ? 'https://placehold.co/80x80/cccccc/333333?text=C' : 'https://placehold.co/80x80/cccccc/333333?text=E')}
          alt={`لوگو/آواتار ${profile.name}`}
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 flex-shrink-0" // Added flex-shrink-0
          onError={(e) => (e.currentTarget.src = 'https://placehold.co/80x80/cccccc/333333?text=Error')}
        />
        <div className="flex-1 min-w-0"> {/* Added min-w-0 for better text wrapping */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 truncate"> {/* Added truncate for long names */}
            <Link href={`/prof/${profile.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
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
    </div> {/* Moved closing div for p-6 flex-grow to wrap content before border */}
    <div className="mt-auto pt-4 p-6 border-t border-gray-200 dark:border-gray-700"> {/* Added p-6 here for consistent padding */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FaStar className={`mr-1 rtl:ml-1 rtl:mr-0 ${profile.overallAverageRating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} size={20} />
          <span className="text-lg font-bold text-gray-700 dark:text-gray-200">
            {profile.overallAverageRating !== undefined ? profile?.overallAverageRating : 'بدون امتیاز'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mr-1 rtl:ml-1 rtl:mr-0">
            ({profile.overallAverageRating ? profile.ratings.length : '0'} نظر)
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
const ProfileCompqanyCard: React.FC<{ profile: getCompany, handleOpenRatingDialog: (profile: getCompany) => void }> = ({ profile, handleOpenRatingDialog }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 flex flex-col">
    <div className="p-6 flex-grow">
      <div className="flex items-start space-x-4 space-x-reverse">
        <img
          src={profile.logo || 'https://placehold.co/80x80/cccccc/333333?text=C'}
          alt={`لوگو/آواتار ${profile.name}`}
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 flex-shrink-0" // Added flex-shrink-0
          onError={(e) => (e.currentTarget.src = 'https://placehold.co/80x80/cccccc/333333?text=Error')}
        />
        <div className="flex-1 min-w-0"> {/* Added min-w-0 for better text wrapping */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 truncate"> {/* Added truncate for long names */}
            <Link href={`/companies/${profile.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
              {profile.name}
            </Link>
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex items-center">
            {<FaBuilding className="ml-1 rtl:mr-1 rtl:ml-0 flex-shrink-0" />}
            {'شرکت'}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2 mb-3">
            {profile.industry || 'توضیحاتی برای این پروفایل ارائه نشده است.'}
          </p>
        </div>
      </div>
    </div> {/* Moved closing div for p-6 flex-grow to wrap content before border */}
    <div className="mt-auto pt-4 p-6 border-t border-gray-200 dark:border-gray-700"> {/* Added p-6 here for consistent padding */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FaStar className={`mr-1 rtl:ml-1 rtl:mr-0 ${profile.overallAverageRating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} size={20} />
          <span className="text-lg font-bold text-gray-700 dark:text-gray-200">
            {profile.overallAverageRating !== undefined ? profile?.overallAverageRating : 'بدون امتیاز'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mr-1 rtl:ml-1 rtl:mr-0">
            ({profile.overallAverageRating ? profile.ratings.length : '0'} نظر)
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

// Function to calculate overall average rating for a profile

const ProfilesPage: NextPage = () => {
  const companies = useCompanyStore((state) => state.companies);
  const employees = useUserStore((state) => state.users);
  const setCompanyList = useCompanyStore((state) => state.setCompanyList);
  const setProfiles = useUserStore((state) => state.setProfiles);
  const { mutate } = useCompanyGetRequest();
  useEffect(() => {
    mutate(1);
  }, [])
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState<'companies' | 'employees'>('companies');

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

    const newSubmission = {
      id: `rating-${Date.now()}`, // Simple unique ID
      raterName: 'کاربر مهمان', // Placeholder for rater identity
      criteriaValues,
      comment,
      timestamp: new Date(),
      averageScore: parseFloat((criteriaValues.reduce((sum, cv) => sum + cv.score, 0) / criteriaValues.length).toFixed(1)),
    };
    const updateProfileCompanyList = (prevList: getCompany[]) =>
      prevList.map(p => {
        if (p.id == Number(selectedProfile.id)) {
          const updatedRatings = [...p.ratings, newSubmission];
          return {
            ...p,
            ratings: updatedRatings,
            overallAverageRating: calculateOverallAverage(updatedRatings), // ✅ حالا همیشه number
          };
        }
        return p;
      });

    const updateProfileList = (prevList: Profile[]) =>
      prevList.map(p => {
        if (p.id === selectedProfile.id) {
          const updatedRatings = [...p.ratings, newSubmission];
          return { ...p, ratings: updatedRatings, overallAverageRating: calculateOverallAverage(updatedRatings) };
        }
        return p;
      });

    if (selectedProfile.type === 'company') {
      const temp = updateProfileCompanyList(companies);
      addRatingRequest({  rateable_type:'company', rateable_id: Number(selectedProfile.id) ,criteriaValues: newSubmission.criteriaValues,comment: newSubmission.comment });
      setCompanyList(temp);
    } else {
      const temp = updateProfileList(employees);
      addRatingRequest({  rateable_type:'user', rateable_id: Number(selectedProfile.id) ,criteriaValues: newSubmission.criteriaValues,comment: newSubmission.comment });

      setProfiles(temp);
    }
  };

  const profilesToDisplay = activeTab === 'companies' ? companies : employees;



  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen" dir="rtl">
      <Head>
        <title>لیست شرکت‌ها و کارمندان | سامانه ارزیابی</title>
        <meta name="description" content="مشاهده و امتیازدهی به شرکت‌ها و کارمندان در سامانه شبکه‌سازی و ارزیابی حرفه‌ای." />
      </Head>

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40"> {/* z-index هدر کمتر از دیالوگ */}
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            لیست شرکت‌ها و کارمندان
          </h1>
          {/* Navigation Tabs */}
          <div className="mt-4">
            <nav className="flex space-x-2 sm:space-x-4 space-x-reverse border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('companies')}
                className={`py-2 px-3 sm:px-4 font-medium text-sm whitespace-nowrap ${ /* Added whitespace-nowrap */
                  activeTab === 'companies'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
              >
                <FaBuilding className="inline ml-1 rtl:mr-1 rtl:ml-0" /> شرکت‌ها
              </button>
              <button
                onClick={() => setActiveTab('employees')}
                className={`py-2 px-3 sm:px-4 font-medium text-sm whitespace-nowrap ${ /* Added whitespace-nowrap */
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
        {profilesToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"> {/* Changed lg to xl for 3 columns */}
            {activeTab === 'employees' ? employees.map(profile => <ProfileCard key={profile.id} profile={profile} handleOpenRatingDialog={handleOpenRatingDialog} />) : companies.map(profile => (
              <ProfileCompqanyCard key={profile.id} profile={profile} handleOpenRatingDialog={handleOpenRatingDialog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-block bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
              <FaBuilding className={`mx-auto text-6xl mb-4 ${activeTab === 'companies' ? 'text-blue-500' : 'text-gray-400'}`} />
              <FaUserTie className={`mx-auto text-6xl mb-4 ${activeTab === 'employees' ? 'text-blue-500' : 'text-gray-400'}`} style={{ display: activeTab === 'companies' ? 'none' : 'block' }} />
              <p className="text-xl text-gray-600 dark:text-gray-300">
                در حال حاضر هیچ {activeTab === 'companies' ? 'شرکتی' : 'کارمندی'} برای نمایش وجود ندارد.
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                به زودی اطلاعات بیشتری در این بخش قرار خواهد گرفت.
              </p>
            </div>
          </div>
        )}
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
      {/* Footer can be added here */}
    </div>
  );
};

export default ProfilesPage;