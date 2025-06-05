'use client';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
 // مسیر types.ts را بر اساس ساختار پروژه خود تنظیم کنید
import {
  FaMapMarkerAlt, FaLinkedin, FaGithub, FaEnvelope, FaBriefcase,
  FaLightbulb, FaStar, FaCalendarAlt, FaBuilding, FaIdBadge, FaLink
} from 'react-icons/fa';
import { ParsedUrlQuery } from 'querystring';
import { UserProfileData } from '@/types/model/type';


  const mockUsers: UserProfileData[] = [
    {
      id: 1, // مطابقت با id در URL
      name: 'خانم الناز شاکردوست',
      email: 'elnaz.public@example.com', // ایمیل عمومی می‌تواند متفاوت باشد
      role: 'مهندس نرم‌افزار ارشد',
      bio: 'برنامه‌نویس فول استک با بیش از ۷ سال تجربه در توسعه برنامه‌های وب و موبایل. علاقه‌مند به فناوری‌های جدید و حل چالش‌های پیچیده. مسلط به React، Node.js و Python. همواره به دنبال یادگیری و رشد حرفه‌ای.',
      phone: null, // شماره تلفن ممکن است در پروفایل عمومی نمایش داده نشود
      linkedin_url: 'https://linkedin.com/in/elnazshakerdoost',
      github_url: 'https://github.com/elnazshakerdoost',
      profile_photo_url: 'https://placehold.co/150x150/E91E63/FFFFFF?text=ES&font=arial',
      email_verified_at: new Date().toISOString(),
      location: {
        city: 'تهران',
        country: 'ایران',
      },
      skills: [
        { id: 1, name: 'React & Next.js' }, { id: 2, name: 'Node.js & Express' },
        { id: 3, name: 'TypeScript' }, { id: 4, name: 'Python (Django/Flask)' },
        { id: 5, name: 'Docker & Kubernetes' }, { id: 6, name: 'AWS Cloud Services' },
        { id: 7, name: 'Database (SQL & NoSQL)' }, { id: 8, name: 'Agile Methodologies' },
      ],
      achievements: [
        {
          id: 1, title: 'بهترین توسعه‌دهنده سال شرکت X',
          description: 'دریافت جایزه بهترین توسعه‌دهنده در کنفرانس سالانه شرکت X برای مشارکت برجسته در پروژه آلفا.',
          date: '2022-08-15', issuer: 'شرکت X',
        },
        {
          id: 2, title: 'گواهینامه AWS Certified Solutions Architect - Associate',
          description: 'اخذ گواهینامه معتبر از آمازون وب سرویسز در زمینه معماری راه‌حل‌های ابری.',
          date: '2021-05-20', issuer: 'Amazon Web Services',
        },
      ],
      work_experience: [
        {
          id: 101, name: 'شرکت فناوری پیشگامان', website: 'https://pishgaman.com',
          description: 'یک شرکت پیشرو در زمینه هوش مصنوعی و راهکارهای سازمانی.', location_id: 1,
          pivot: {
            job_title: 'مهندس نرم‌افزار ارشد (Team Lead)', start_date: '2020-01-01', end_date: null,
            description: 'رهبری تیم توسعه فرانت‌اند، توسعه و نگهداری پلتفرم اصلی شرکت با استفاده از React و Node.js. همکاری در تیم‌های چابک و راهبری توسعه‌دهندگان جوان‌تر. معرفی و پیاده‌سازی تست‌های خودکار که منجر به کاهش ۳۰٪ باگ‌ها شد.',
            employment_type: 'تمام وقت',
          },
        },
        {
          id: 102, name: 'استارتاپ نوآوران آینده', website: 'https://noavaran.io',
          description: 'ارائه دهنده راهکارهای نوآورانه مبتنی بر ابر برای کسب‌وکارهای کوچک و متوسط.', location_id: 2,
          pivot: {
            job_title: 'توسعه‌دهنده فول استک', start_date: '2018-06-01', end_date: '2019-12-31',
            description: 'طراحی و پیاده‌سازی ویژگی‌های جدید برای محصولات مشتریان با تمرکز بر تجربه کاربری و عملکرد بالا. مشارکت در تمامی مراحل چرخه عمر محصول از ایده تا استقرار.',
            employment_type: 'تمام وقت',
          },
        },
      ],
      received_ratings: [
        {
          id: 1, reviewer_id: 2, reviewer_name: 'آقای رضایی',
          reviewer_avatarUrl: 'https://placehold.co/50x50/3F51B5/FFFFFF?text=AR&font=arial',
          overall_rating: 5, comment: 'الناز یک همکار فوق‌العاده و بسیار حرفه‌ای است. دانش فنی بالا و تعهد کاری او مثال‌زدنی است. توانایی حل مسئله و ارائه راهکارهای خلاقانه از نقاط قوت ایشان است.',
          created_at: '2023-05-10T10:00:00Z',
        },
        {
          id: 2, reviewer_id: 3, reviewer_name: 'خانم محمدی',
          reviewer_avatarUrl: 'https://placehold.co/50x50/4CAF50/FFFFFF?text=ZM&font=arial',
          overall_rating: 4, comment: 'تجربه همکاری خوبی با ایشان داشتم. همیشه پاسخگو و آماده کمک بودند. در کار تیمی بسیار موثر عمل می‌کنند.',
          created_at: '2023-04-22T14:30:00Z',
        },
      ],
    },
    {
      id: 2, // کاربر نمونه دیگر
      name: 'آقای بهرام رادان',
      email: 'bahram.public@example.com',
      role: 'مدیر محصول',
      bio: 'مدیر محصول با سابقه درخشان در تعریف، توسعه و عرضه محصولات نرم‌افزاری موفق. تمرکز بر تحقیقات بازار، تحلیل نیازمندی‌های کاربران و همکاری نزدیک با تیم‌های مهندسی و طراحی.',
      phone: null,
      linkedin_url: 'https://linkedin.com/in/bahramradan',
      github_url: null,
      profile_photo_url: 'https://placehold.co/150x150/009688/FFFFFF?text=BR&font=arial',
      email_verified_at: new Date().toISOString(),
      location: { city: 'اصفهان', country: 'ایران' },
      skills: [{ id: 10, name: 'Product Management' }, { id: 11, name: 'Agile & Scrum' }, { id: 12, name: 'Market Research' }, { id: 13, name: 'User Story Mapping' }],
      achievements: [{ id: 10, title: 'راه اندازی موفق محصول X', description: 'محصول X با مدیریت ایشان بیش از ۱ میلیون کاربر فعال جذب کرد.', date: '2021-11-01', issuer: 'شرکت Y' }],
      work_experience: [
        {
          id: 201, name: 'شرکت راهکارهای دیجیتال', website: 'https://digitalsolutions.com',
          description: 'ارائه دهنده پلتفرم‌های دیجیتال مارکتینگ', location_id: 3,
          pivot: { job_title: 'مدیر محصول ارشد', start_date: '2019-03-01', end_date: null, description: 'مسئول استراتژی و نقشه راه محصولات کلیدی شرکت.', employment_type: 'تمام وقت' }
        }
      ],
      received_ratings: [
        { id: 10, reviewer_id: 4, reviewer_name: 'آقای کریمی', overall_rating: 5, comment: 'بهرام دیدگاه محصولی بسیار قوی دارد و تیم را به خوبی هدایت می‌کند.', created_at: '2023-01-15T12:00:00Z' }
      ],
    }
  ];




interface PublicProfilePageProps {
  userProfile: UserProfileData | null;
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


const PublicProfilePage: NextPage<PublicProfilePageProps> = () => {
 // const router = useRouter();
const userProfile = mockUsers[0];
//   if (router.isFallback || !userProfile) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
//         <p className="text-xl text-gray-600 dark:text-gray-300">در حال بارگذاری اطلاعات پروفایل...</p>
//       </div>
//     );
//   }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 md:py-12" dir="rtl">
      <Head>
        <title>پروفایل {userProfile.name}</title>
        <meta name="description" content={`مشاهده پروفایل حرفه‌ای ${userProfile.name}. ${userProfile.bio?.substring(0,150) || ''}`} />
      </Head>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Profile Header */}
        <header className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-800 text-white shadow-xl rounded-xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center text-center md:text-right space-y-6 md:space-y-0 md:space-x-8 md:space-x-reverse">
          <img
            src={userProfile.profile_photo_url || 'https://placehold.co/150x150/cccccc/FFFFFF?text=User&font=arial'}
            alt={userProfile.name}
            className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-white dark:border-gray-300 shadow-lg flex-shrink-0"
            onError={(e) => (e.currentTarget.src = 'https://placehold.co/150x150/cccccc/FFFFFF?text=Error&font=arial')}
          />
          <div className="flex-grow">
            <h1 className="text-3xl lg:text-4xl font-bold mb-1">{userProfile.name}</h1>
            <p className="text-lg lg:text-xl text-blue-200 dark:text-indigo-300 font-medium mb-3">{userProfile.role}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 text-sm text-blue-100 dark:text-indigo-200">
              {userProfile.email && (
                <a href={`mailto:${userProfile.email}`} className="hover:text-yellow-300 flex items-center transition-colors">
                  <FaEnvelope className="ml-1.5 rtl:mr-1.5 rtl:ml-0" /> {userProfile.email}
                </a>
              )}
              {userProfile.location && (
                <span className="flex items-center">
                  <FaMapMarkerAlt className="ml-1.5 rtl:mr-1.5 rtl:ml-0" /> {userProfile.location.city}, {userProfile.location.country}
                </span>
              )}
            </div>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
              {userProfile.linkedin_url && (
                <a href={userProfile.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label={`${userProfile.name} on LinkedIn`}
                   className="text-white hover:text-yellow-300 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all transform hover:scale-110">
                  <FaLinkedin size={22}/>
                </a>
              )}
              {userProfile.github_url && (
                <a href={userProfile.github_url} target="_blank" rel="noopener noreferrer" aria-label={`${userProfile.name} on GitHub`}
                   className="text-white hover:text-yellow-300 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all transform hover:scale-110">
                  <FaGithub size={22}/>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Bio Section */}
        {userProfile.bio && (
          <SectionWrapper title="درباره من" icon={<FaIdBadge size={24} className="text-purple-500"/>}>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-justify">
              {userProfile.bio}
            </p>
          </SectionWrapper>
        )}

        {/* Skills Section */}
        <SectionWrapper title="مهارت‌ها" icon={<FaLightbulb size={24} className="text-yellow-500"/>} isEmpty={userProfile.skills.length === 0}>
          <div className="flex flex-wrap gap-3">
            {userProfile.skills.map(skill => (
              <span key={skill.id} className="bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 py-1.5 px-4 rounded-full text-sm font-medium shadow-sm">
                {skill.name}
              </span>
            ))}
          </div>
        </SectionWrapper>

        {/* Work Experience Section */}
        <SectionWrapper title="سوابق شغلی" icon={<FaBriefcase size={24} className="text-green-500"/>} isEmpty={userProfile.work_experience.length === 0}>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:rtl:mr-5 before:rtl:ml-0 before:h-full before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
            {userProfile.work_experience.map(exp => (
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

        {/* Achievements Section */}
        <SectionWrapper title="دستاوردها و گواهینامه‌ها" icon={<FaStar size={24} className="text-red-500"/>} isEmpty={userProfile.achievements.length === 0}>
          <div className="space-y-6">
            {userProfile.achievements.map(ach => (
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
        
        {/* Received Ratings Section */}
        <SectionWrapper title="امتیازات و نظرات دریافتی" icon={<FaStar size={24} className="text-orange-500"/>} isEmpty={userProfile.received_ratings.length === 0} emptyMessage="هنوز هیچ امتیازی برای این کاربر ثبت نشده است.">
          <div className="space-y-6">
            {userProfile.received_ratings.map(rating => (
              <div key={rating.id} className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg shadow-md">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <img src={rating.reviewer_avatarUrl || 'https://placehold.co/50x50/cccccc/FFFFFF?text=R&font=arial'} 
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
