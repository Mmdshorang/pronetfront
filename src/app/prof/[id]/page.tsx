'use client';
import type { NextPage } from 'next';
import Head from 'next/head';

import {
  FaMapMarkerAlt, FaLinkedin, FaGithub, FaEnvelope, FaBriefcase,
  FaLightbulb, FaStar, FaCalendarAlt, FaBuilding, FaIdBadge, FaLink
} from 'react-icons/fa';


import { use, useEffect } from 'react';

import { useUserGetByIDRequest } from '@/hooks/user/useGetUsers';


interface CompanyDetailPageProps {
  params: Promise<{ id: string }>;  // 👈 توجه: params حالا Promise هست
}

const SectionWrapper: React.FC<{ title: string; icon: React.ReactElement; children: React.ReactNode; isEmpty?: boolean; emptyMessage?: string }> =
  ({ title, icon, children, isEmpty, emptyMessage = "اطلاعاتی برای نمایش در این بخش وجود ندارد." }) => (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 md:p-8 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center mb-6">
        {icon}
        <span className="mr-3 rtl:ml-3 rtl:mr-0">{title}</span>
      </h2>
      {isEmpty ? <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p> : children}
    </div>
  );


const PublicProfilePage: NextPage<CompanyDetailPageProps> = ({ params }) => {

  const { id } = use(params);  // ✅ پارامترها را با use() باز کن
  const { data, mutate, isPending, isError } = useUserGetByIDRequest();
  useEffect(() => {
    if (id) {
      mutate(Number(id));
      console.log(data);
      if (data) {
      }
    }
  }, [id]);
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 md:py-12" dir="rtl">
      <Head>
        <title>پروفایل {data?.data?.name}</title>
        <meta name="description" content={`مشاهده پروفایل حرفه‌ای ${data?.data?.name}. ${data?.data?.bio?.substring(0, 150) || ''}`} />
      </Head>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Profile Header */}
        <header className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-800 text-white shadow-xl rounded-xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center text-center md:text-right space-y-6 md:space-y-0 md:space-x-8 md:space-x-reverse">
          <img
            src={data?.data?.profile_photo_url || 'https://placehold.co/150x150/cccccc/FFFFFF?text=User&font=arial'}
            alt={data?.data?.name}
            className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-white dark:border-gray-300 shadow-lg flex-shrink-0"
            onError={(e) => (e.currentTarget.src = 'https://placehold.co/150x150/cccccc/FFFFFF?text=Error&font=arial')}
          />
          <div className="flex-grow">
            <h1 className="text-3xl lg:text-4xl font-bold mb-1">{data?.data?.name}</h1>
            <p className="text-lg lg:text-xl text-blue-200 dark:text-indigo-300 font-medium mb-3">{data?.data?.job_title}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 text-sm text-blue-100 dark:text-indigo-200">
              {data?.data?.email && (
                <a href={`mailto:${data.data?.email}`} className="hover:text-yellow-300 flex items-center transition-colors">
                  <FaEnvelope className="ml-1.5 rtl:mr-1.5 rtl:ml-0" /> {data.data?.email}
                </a>
              )}
              {data?.data?.location && (
                <span className="flex items-center">
                  <FaMapMarkerAlt className="ml-1.5 rtl:mr-1.5 rtl:ml-0" /> {data?.data?.location?.city}, {data?.data?.location?.country}
                </span>
              )}
            </div>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
              {data?.data?.linkedin_url && (
                <a href={data.data?.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label={`${data.data?.name} on LinkedIn`}
                  className="text-white hover:text-yellow-300 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all transform hover:scale-110">
                  <FaLinkedin size={22} />
                </a>
              )}
              {data?.data?.github_url && (
                <a href={data.data?.github_url} target="_blank" rel="noopener noreferrer" aria-label={`${data.data?.name} on GitHub`}
                  className="text-white hover:text-yellow-300 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all transform hover:scale-110">
                  <FaGithub size={22} />
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Bio Section */}
        {data?.data?.bio && (
          <SectionWrapper title="درباره من" icon={<FaIdBadge size={24} className="text-purple-500" />}>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-justify">
              {data.data?.bio}
            </p>
          </SectionWrapper>
        )}
        <SectionWrapper
          title="مهارت‌ها"
          icon={<FaLightbulb size={24} className="text-yellow-500" />}
          isEmpty={data?.data?.skills?.length === 0}>
          <div className="flex flex-wrap gap-3">
            {(data?.data?.skills ?? []).map(skill => (
              <span key={skill.id} className="bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 py-1.5 px-4 rounded-full text-sm font-medium shadow-sm">
                {skill.name}
              </span>
            ))}
          </div>
        </SectionWrapper>


        {/* Work Experience Section */}
        <SectionWrapper
          title="سوابق شغلی"
          icon={<FaBriefcase size={24} className="text-green-500" />}
          isEmpty={data?.data?.work_experience?.length === 0}>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:rtl:mr-5 before:rtl:ml-0 before:h-full before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
            {(data?.data?.work_experience ?? []).map(exp => (
              <div key={exp.id} className="relative pl-8 rtl:pr-8 rtl:pl-0">
                <div className="absolute left-0 rtl:right-0 top-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 -translate-x-1/2 rtl:translate-x-1/2"></div>
                <div className="bg-gray-50 dark:bg-gray-850 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {exp.pivot.job_title}
                  </h4>
                  <a href={exp.website || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center my-1">
                    <FaBuilding className="ml-1.5 rtl:mr-1.5 rtl:ml-0 text-sm" /> {exp.name}
                  </a>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <FaCalendarAlt className="inline ml-1 rtl:mr-1 rtl:ml-0" /> {exp.pivot.start_date} – {exp.pivot.end_date || 'اکنون'}
                    <span className="mx-1.5">|</span>
                    <FaLink className="inline ml-1 rtl:mr-1 rtl:ml-0" /> {exp.pivot.employment_type}
                  </p>
                  {exp.pivot.description && <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap text-justify">{exp.pivot.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>


        <SectionWrapper
          title="دستاوردها و گواهینامه‌ها"
          icon={<FaStar size={24} className="text-red-500" />}
          isEmpty={data?.data?.achievements?.length === 0}>
          <div className="space-y-6">
            {(data?.data?.achievements ?? []).map(ach => (
              <div key={ach.id} className="bg-gray-50 dark:bg-gray-850 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{ach.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <FaCalendarAlt className="inline ml-1 rtl:mr-1 rtl:ml-0" /> {ach.date} | صادرکننده: {ach.issuer}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap text-justify">{ach.description}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper
          title="امتیازات و نظرات دریافتی"
          icon={<FaStar size={24} className="text-orange-500" />}
          isEmpty={data?.data?.received_ratings?.length === 0}
          emptyMessage="هنوز هیچ امتیازی برای این کاربر ثبت نشده است.">
          <div className="space-y-6">
            {(data?.data?.received_ratings ?? []).map(rating => (
              <div key={rating.id} className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg shadow-md">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <img
                    src={rating.reviewer_avatarUrl || 'https://placehold.co/50x50/cccccc/FFFFFF?text=R&font=arial'}
                    alt={rating.reviewer_name || 'Reviewer'}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    onError={(e) => (e.currentTarget.src = 'https://placehold.co/50x50/cccccc/FFFFFF?text=Error&font=arial')}
                  />
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                      <h5 className="font-semibold text-gray-800 dark:text-white">{rating.reviewer_name || 'ناشناس'}</h5>
                      <div className="flex items-center mt-1 sm:mt-0">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={`w-4 h-4 ${i < rating.overall_rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                        ))}
                        <span className="mr-1.5 rtl:ml-1.5 rtl:mr-0 text-sm font-bold text-yellow-500">({rating.overall_rating.toFixed(1)})</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {new Date(rating.created_at).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-white dark:bg-gray-800 p-3 rounded-md shadow-inner">
                      {rating.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>


      </div>
    </div>
  );
};

export default PublicProfilePage;
