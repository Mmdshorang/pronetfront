// pages/my-profile.tsx
'use client';

import { Achievement, Company, User, UserUpdate } from '@/types/server/user';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, ChangeEvent, Fragment } from 'react';
import {
  FaSave, FaTimesCircle, FaTrashAlt,
  FaMapMarkerAlt, FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaBriefcase,
  FaLightbulb, FaStar, FaCalendarAlt, FaBuilding, FaIdBadge, FaEdit,
  FaHome
} from 'react-icons/fa';
import { FiUploadCloud } from 'react-icons/fi';
import './style.css'
import { useUserInfoStore } from '@/stores/userStore';
import { useUpdateProfileRequest } from '@/hooks/user/updateProfile';
import { addAchievementsRequest, addskillssRequest, addWorkHistoryRequest, deleteAchievementsRequest, deleteskillssRequest, deleteWorkHistoryRequest, updateProfileImageRequest, updateWorkHistoryRequest } from '@/services/user/updaeProfile';
import { showSnackbar } from '@/stores/snackbarStore';
import { StatusCodes } from '@/types/model/generic';
import EditableSection from '@/hooks/user/EditableSection';
import WorkExperienceModal from '@/hooks/user/WorkExperienceModal';
import AchievementModal from '@/hooks/user/AchievementModal';
import { useRouter } from 'next/navigation';




const MyProfilePage: NextPage = () => {

  const { user, updateUserInfo } = useUserInfoStore((state) => state)
  const { mutate } = useUpdateProfileRequest();

  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(true);

  const [isWorkExpModalOpen, setIsWorkExpModalOpen] = useState(false);
  const [editingWorkExp, setEditingWorkExp] = useState<Company | null>(null);
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);

  const [newSkill, setNewSkill] = useState('');
 const router =useRouter()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!user) return;
    const { name, value } = e.target;

    if (name.startsWith("location.")) {
      const locField = name.split(".")[1] as keyof Location;
      const newLocation = { ...(user.location || { city: '', country: '' }), [locField]: value };
      updateUserInfo({ location: newLocation });
    } else {
      updateUserInfo({ [name]: value } as Partial<User>);
    }
  };

  const handleProfilePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !user) return;

    try {
      const data = await updateProfileImageRequest(file);
      console.log(data)
      if (data.status === StatusCodes.Success) {
        showSnackbar(data.message, 'success');

        // نمایش پیش‌نمایش تصویر بعد از موفقیت
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          if (typeof result === 'string') {
            useUserInfoStore.getState().updateUserInfo({ profile_photo: data.profile_photo_url ?? '' });
          }
        };
        reader.readAsDataURL(file);
      } else {
        showSnackbar(data.message, 'error');
      }
    } catch (error) {
      showSnackbar('خطا در آپلود عکس پروفایل', 'error');
      console.error(error);
    }
  };

  const { setSkills } = useUserInfoStore();
  const handleAddSkill = async () => {
    if (!user || !newSkill.trim()) return;
    if (user?.skills?.length >= 2)
      if (user?.skills?.find(s => s.name.toLowerCase() === newSkill.trim().toLowerCase())) return;

    await addskillssRequest(newSkill.trim()).then((res) => {
      console.log(res)
      if (res) {
        setSkills(res);
      }
    })
    setNewSkill('');
  };


  const { removeSkill } = useUserInfoStore();
  const handleRemoveSkill = async (skillId: number) => {
    deleteskillssRequest(skillId)
    removeSkill(skillId);
  };


  // --- Work Experience Handlers ---
  const openWorkExpModal = (exp: Company | null) => {
    setEditingWorkExp(exp || null);
    setIsWorkExpModalOpen(true);
  };

  const handleWorkExpSubmit = async (submittedExp: Company) => {
    if (!user) return;

    try {
      // تشخیص بین حالت افزودن و ویرایش بر اساس وجود ID
      if (submittedExp.id && typeof submittedExp.id === 'number') {
        // --- حالت ویرایش ---
        const response = await addWorkHistoryRequest(submittedExp);
        const updatedCompanies = [...user.companies, response.company];

        updateUserInfo({ ...user, companies: updatedCompanies });
        // state را با داده‌های جدیدی که از سرور آمده، به‌روز کن


      } else {
        // --- حالت افزودن ---
        if (submittedExp.id && typeof submittedExp.id === 'number') {
          const response = await updateWorkHistoryRequest(submittedExp.id, submittedExp);
          const updatedCompanies = user.companies.map(company =>
            company.id === response.company.id ? response.company : company
          );

          updateUserInfo({ ...user, companies: updatedCompanies });
        }
      }
    } catch (error: unknown) {
      console.log(error, "حذف ناموفق بود.");
    }
  };

  /**
   * تابع برای مدیریت حذف سابقه شغلی
   */
  const handleRemoveWorkExperience = async (companyId: number) => {
    if (!user) return;

    try {
      await deleteWorkHistoryRequest(companyId);

      // آیتم حذف شده را از state محلی نیز حذف کن
      const updatedCompanies = user.companies.filter(company => company.id !== companyId);
      updateUserInfo({ ...user, companies: updatedCompanies });

    } catch (error: unknown) {
      console.log(error, "حذف ناموفق بود.");
    }
  };



  // --- Achievement Handlers ---
  const openAchievementModal = (ach?: Achievement) => {
    setEditingAchievement(ach || null);
    setIsAchievementModalOpen(true);
  };
  const { setAchievement, removeAchievement } = useUserInfoStore();

  const handleAchievementSubmit = (submittedAch: Achievement) => {
    if (!user) return;
    if (editingAchievement) {
      const updated = user.achievements.map(a => a.id === submittedAch.id ? submittedAch : a);
      updateUserInfo({ achievements: updated });
    } else {
      addAchievementsRequest(submittedAch).then((res) => {

        if (res.status === StatusCodes.Success) {
          console.log(res.achievements)
          setAchievement(res.achievements ?? []);
        }
      })
      //addAchievement({ ...submittedAch, id: Date.now() });
    }
  };

  const handleRemoveAchievement = (id: number) => {
    if (window.confirm('آیا از حذف این دستاورد مطمئن هستید؟')) {
      deleteAchievementsRequest(id)
      removeAchievement(id);
    }
  };


  const handleCancelPersonalInfoEdit = () => {

    setIsEditingPersonalInfo(false);
  };



  const handleSaveAll = () => {
    console.log("Saving user data:", user);
    const updateInfo: UserUpdate = {
      bio: user?.bio ?? '',
      email: user?.email ?? '',
      name: user?.name ?? '',
      phone: user?.phone ?? '',
      linkedin_url: user?.linkedin_url ?? '',
      city: user?.location?.city ?? '',
      country: user?.location?.country ?? '',
      github_url: user?.github_url ?? '',
    }
    mutate(updateInfo);
  };

  if (!user) { /* ... (کد لودینگ همانند قبل) ... */
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-600 dark:text-gray-300">در حال بارگذاری اطلاعات پروفایل...</p>
      </div>
    );
  }

  // کلاس‌های کمکی برای استایل‌دهی به input و button ها در مودال‌ها
  const inputStyle = "mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2.5 dark:bg-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500";
  const btnPrimary = "inline-flex justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 transition-colors shadow-md";
  const btnSecondary = "inline-flex justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 transition-colors shadow-sm";


  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 md:py-12" dir="rtl">
      <Head>
        <title>پروفایل من - {user.name}</title>
        <meta name="description" content={`پروفایل کاربری ${user.name} در سامانه شبکه‌سازی و ارزیابی حرفه‌ای.`} />
      </Head>
      {/* Breadcrumb Navigation - Enhanced Style */}
      <nav aria-label="Breadcrumb" className="mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
        <ol className="flex items-center space-x-3 space-x-reverse text-base font-semibold">
          
          {/* Home Button */}
          <li>
            <button
              onClick={() => router.push('/')}
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
            >
              <FaHome size={20} className="ml-2 rtl:mr-2 rtl:ml-0" />
              <span>خانه</span>
            </button>
          </li>

          {/* Separator and Current Page */}
          <li>
            <div className="flex items-center">
              <svg className="h-6 w-6 flex-shrink-0 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <span className="mr-3 rtl:ml-3 rtl:mr-0 text-gray-800 dark:text-gray-200">
                پروفایل من
              </span>
            </div>
          </li>
        </ol>
      </div>
    </nav>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Profile Header (همانند قبل با تغییر جزئی در دکمه ذخیره کلی) */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 md:p-8 mb-8 flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8 sm:space-x-reverse">
          <div className="relative group">
            {/* تصویر پروفایل کاربر */}
            <img
              src={user.profile_photo || 'https://placehold.co/150x150/cccccc/FFFFFF?text=User&font=arial'}
              alt={user.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400 shadow-lg"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/150x150/cccccc/FFFFFF?text=Error&font=arial';
              }}
            />

            {/* اگر در حالت ویرایش باشیم، روی عکس کاور آپلود نمایش داده می‌شود */}
            {isEditingPersonalInfo && (
              <>
                <label
                  htmlFor="profilePhotoInput"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <FiUploadCloud size={40} className="text-white" />
                </label>
                <input
                  type="file"
                  id="profilePhotoInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfilePhotoChange}
                />
              </>
            )}
          </div>
          <div className="text-center sm:text-right flex-grow">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">{user.name}</h1>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-3">{user.role}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
              {user.email && <a href={`mailto:${user.email}`} className="hover:text-blue-500 flex items-center"><FaEnvelope className="ml-1 rtl:mr-1 rtl:ml-0" /> {user.email}</a>}
              {user.phone && <a href={`tel:${user.phone}`} className="hover:text-blue-500 flex items-center"><FaPhone className="ml-1 rtl:mr-1 rtl:ml-0" /> {user.phone}</a>}
              {user.location && <span className="flex items-center"><FaMapMarkerAlt className="ml-1 rtl:mr-1 rtl:ml-0" /> {user.location.city}, {user.location.country}</span>}
            </div>
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-3">
              {user.linkedin_url && <a href={user.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700 dark:hover:text-blue-500 p-2 bg-gray-100 dark:bg-gray-700 rounded-full transition-colors"><FaLinkedin size={20} /></a>}
              {user.github_url && <a href={user.github_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white p-2 bg-gray-100 dark:bg-gray-700 rounded-full transition-colors"><FaGithub size={20} /></a>}
            </div>
          </div>
          <button onClick={handleSaveAll} className={`${btnPrimary} sm:self-start mt-4 sm:mt-0`} title="ذخیره تمام تغییرات">
            <FaSave className="ml-2 rtl:mr-2 rtl:ml-0" /> ذخیره کل پروفایل
          </button>
        </div>

        {/* Personal Information Section */}
        <EditableSection
          title="اطلاعات شخصی و درباره من"
          icon={<FaIdBadge size={24} className="text-purple-500" />}
          isEditing={isEditingPersonalInfo}
          onToggleEdit={() => isEditingPersonalInfo ? handleSaveAll() : setIsEditingPersonalInfo(true)}
          isSectionEditable={true} // این بخش دکمه ویرایش/ذخیره/لغو کلی دارد
        >
          {isEditingPersonalInfo ? (
            <form className="space-y-4">
              {/* ... (فیلدهای فرم اطلاعات شخصی همانند قبل) ... */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">نام کامل</label>
                <input type="text" name="name" id="name" value={user.name} onChange={handleInputChange} className={inputStyle} />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">درباره من (Bio)</label>
                <textarea name="bio" id="bio" rows={5} value={user.bio || ''} onChange={handleInputChange} className={inputStyle} />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">شماره تلفن</label>
                <input type="tel" name="phone" id="phone" value={user.phone || ''} onChange={handleInputChange} className={inputStyle} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location.city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">شهر</label>
                  <input type="text" name="location.city" id="location.city" value={user.location?.city || ''} onChange={handleInputChange} className={inputStyle} />
                </div>
                <div>
                  <label htmlFor="location.country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">کشور</label>
                  <input type="text" name="location.country" id="location.country" value={user.location?.country || ''} onChange={handleInputChange} className={inputStyle} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">لینک پروفایل لینکدین</label>
                  <input type="url" name="linkedin_url" id="linkedin_url" value={user.linkedin_url || ''} onChange={handleInputChange} className={inputStyle} placeholder="https://linkedin.com/in/yourprofile" />
                </div>
                <div>
                  <label htmlFor="github_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">لینک پروفایل گیت‌هاب</label>
                  <input type="url" name="github_url" id="github_url" value={user.github_url || ''} onChange={handleInputChange} className={inputStyle} placeholder="https://github.com/yourusername" />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button type="button" onClick={handleCancelPersonalInfoEdit} className={`${btnSecondary} ml-2`}>لغو</button>
                <button type="button" onClick={handleSaveAll} className={btnPrimary}>ذخیره اطلاعات شخصی</button>
              </div>
            </form>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{user.bio || 'بیوگرافی هنوز وارد نشده است.'}</p>
          )}
        </EditableSection>

        {/* Skills Section */}
        <EditableSection title="مهارت‌ها" icon={<FaLightbulb size={24} className="text-yellow-500" />} onAddNew={handleAddSkill} >
          <div className="flex items-center mb-4">
            <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="مهارت جدید (مثلا: JavaScript)" className={`${inputStyle} flex-grow rounded-r-none dark:bg-gray-700`} />
          </div>
          {user?.skills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {user?.skills.map(skill => (
                <div key={skill.id} className="flex items-center bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 py-1.5 px-3 rounded-full text-sm font-medium shadow-sm">
                  <span>{skill.name}</span>
                  <button onClick={() => handleRemoveSkill(skill.id)} className="mr-2 rtl:ml-2 rtl:mr-0 text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors">
                    <FaTimesCircle size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (<p className="text-gray-500 dark:text-gray-400">هنوز مهارتی ثبت نشده است. اولین مهارت خود را اضافه کنید.</p>)}
        </EditableSection>

        {/* Work Experience Section */}
        <EditableSection title="سوابق شغلی" icon={<FaBriefcase size={24} className="text-green-500" />} onAddNew={() => openWorkExpModal(null)}>
          {user.companies.length > 0 ? (
            <div className="space-y-6">
              {user.companies.map(exp => (
                <div key={exp.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg relative group hover:shadow-md transition-shadow">
                  <div className="absolute top-2 left-2 rtl:right-2 rtl:left-auto opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 space-x-reverse">
                    <button onClick={() => openWorkExpModal(exp)} className="p-1.5 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full shadow-sm" title="ویرایش"><FaEdit size={14} /></button>
                    <button onClick={() => handleRemoveWorkExperience(exp.id)} className="p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-full shadow-sm" title="حذف"><FaTrashAlt size={14} /></button>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{exp.pivot.job_title} در <a href={exp.website || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">{exp.name}</a></h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <FaCalendarAlt className="inline ml-1 rtl:mr-1 rtl:ml-0" /> {exp.pivot.start_date} – {exp.pivot.end_date || 'اکنون'} | <FaBuilding className="inline ml-1 rtl:mr-1 rtl:ml-0" /> {exp.pivot.employment_type}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{exp.pivot.description || exp.description}</p>
                </div>
              ))}
            </div>
          ) : (<p className="text-gray-500 dark:text-gray-400">هنوز سابقه شغلی ثبت نشده است. برای افزودن کلیک کنید.</p>)}
        </EditableSection>

        {/* Achievements Section */}
        <EditableSection title="دستاوردها و گواهینامه‌ها" icon={<FaStar size={24} className="text-red-500" />} onAddNew={() => openAchievementModal()}>
          {user.achievements.length > 0 ? (
            <div className="space-y-6">
              {user.achievements.map(ach => (
                <div key={ach.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg relative group hover:shadow-md transition-shadow">
                  <div className="absolute top-2 left-2 rtl:right-2 rtl:left-auto opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 space-x-reverse">
                    <button onClick={() => openAchievementModal(ach)} className="p-1.5 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full shadow-sm" title="ویرایش"><FaEdit size={14} /></button>
                    <button onClick={() => handleRemoveAchievement(ach.id)} className="p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-full shadow-sm" title="حذف"><FaTrashAlt size={14} /></button>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{ach.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1"> <FaCalendarAlt className="inline ml-1 rtl:mr-1 rtl:ml-0" /> {ach.date} | صادرکننده: {ach.issuer} </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{ach.description}</p>
                </div>
              ))}
            </div>
          ) : (<p className="text-gray-500 dark:text-gray-400">هنوز دستاوردی ثبت نشده است. برای افزودن کلیک کنید.</p>)}
        </EditableSection>

        {/* Received Ratings Section (Read-only) */}
        <EditableSection title="امتیازات و نظرات دریافتی" icon={<FaStar size={24} className="text-orange-500" />} canEdit={false}>
          {user?.received_ratings && user?.received_ratings.length > 0 ? (
            <div className="space-y-6">
              {user.received_ratings.map(rating => (
                <div key={rating.id} className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg shadow">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <img src={'https://placehold.co/50x50/cccccc/FFFFFF?text=R&font=arial'} alt={"ناشناس"} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center mb-1">
                        <h5 className="font-semibold text-gray-800 dark:text-white">ناشناس</h5>
                        <span className="mx-2 text-gray-400 dark:text-gray-500 text-xs">&bull;</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (<FaStar key={i} className={i < rating.overall_rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} />))}
                          <span className="mr-1 rtl:ml-1 rtl:mr-0 text-sm font-bold text-yellow-500">({rating.overall_rating})</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{new Date(rating.created_at).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{rating.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (<p className="text-gray-500 dark:text-gray-400">هنوز هیچ امتیازی دریافت نشده است.</p>)}
        </EditableSection>
      </div>

      {/* Modals */}
      <WorkExperienceModal isOpen={isWorkExpModalOpen} onClose={() => setIsWorkExpModalOpen(false)} onSubmit={handleWorkExpSubmit} initialData={editingWorkExp} />
      <AchievementModal isOpen={isAchievementModalOpen} onClose={() => setIsAchievementModalOpen(false)} onSubmit={handleAchievementSubmit} initialData={editingAchievement} />


    </div>
  );
};

export default MyProfilePage;
