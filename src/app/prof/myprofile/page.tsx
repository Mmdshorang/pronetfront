// pages/my-profile.tsx
'use client';
import { CompanyWorkExperience, UserProfileData } from '@/types/model/type';
import { Achievement, Company, Skill, User } from '@/types/server/user';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect, ChangeEvent, Fragment, FormEvent } from 'react';
// اطمینان حاصل کنید که مسیر types.ts صحیح است
import {
  FaUserEdit, FaSave, FaTimesCircle, FaPlusCircle, FaTrashAlt,
  FaMapMarkerAlt, FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaBriefcase,
  FaLightbulb, FaStar, FaCalendarAlt, FaBuilding, FaIdBadge, FaEdit
} from 'react-icons/fa';
import { FiUploadCloud } from 'react-icons/fi';
import { Dialog, Transition } from '@headlessui/react'; // برای مودال‌ها
import { useUserInfoStore } from '@/stores/userStore';
import { useUpdateProfileRequest } from '@/hooks/user/updateProfile';

interface EditableSectionProps {
  title: string;
  icon: React.ReactElement;
  children: React.ReactNode;
  isEditing?: boolean; // دیگر برای کنترل فرم‌های داخلی استفاده نمی‌شود
  onToggleEdit?: () => void; // ممکن است برای برخی بخش‌ها لازم باشد
  onAddNew?: () => void; // برای دکمه افزودن جدید
  canEdit?: boolean;
  isSectionEditable?: boolean; // برای فعال/غیرفعال کردن دکمه ویرایش کلی بخش
}

const EditableSection: React.FC<EditableSectionProps> = ({
  title, icon, children, onAddNew, canEdit = true, isSectionEditable = true, isEditing, onToggleEdit
}) => (
  <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 md:p-8 mb-8">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center">
        {icon}
        <span className="mr-3 rtl:ml-3 rtl:mr-0">{title}</span>
      </h2>
      {canEdit && (
        <div className="flex items-center space-x-2 space-x-reverse">
          {isSectionEditable && onToggleEdit && ( // دکمه ویرایش کلی بخش (مثلا برای اطلاعات شخصی)
            isEditing ? (
              <div className="flex space-x-2 space-x-reverse">
                <button onClick={onToggleEdit} className="text-green-500 hover:text-green-700 p-2 rounded-full" title="ذخیره"><FaSave size={20} /></button>
                <button onClick={onToggleEdit} className="text-red-500 hover:text-red-700 p-2 rounded-full" title="لغو"><FaTimesCircle size={20} /></button>
              </div>
            ) : (
              <button onClick={onToggleEdit} className="text-blue-500 hover:text-blue-700 p-2 rounded-full" title="ویرایش بخش"><FaUserEdit size={20} /></button>
            )
          )}
          {onAddNew && ( // دکمه افزودن آیتم جدید (برای مهارت، سابقه، دستاورد)
            <button
              onClick={onAddNew}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded-lg flex items-center text-sm shadow-md"
              title={`افزودن ${title.replace('‌ها', '')}`}
            >
              <FaPlusCircle className="ml-1 rtl:mr-1 rtl:ml-0" /> افزودن
            </button>
          )}
        </div>
      )}
    </div>
    {children}
  </div>
);


// --- مودال برای ویرایش/افزودن سابقه شغلی ---
interface WorkExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (experience: Company) => void;
  initialData?: Company | null;
}

const WorkExperienceModal: React.FC<WorkExperienceModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [experience, setExperience] = useState<Company>(
    initialData || {
      id: initialData?.id ?? Date.now(), // اگر initialData وجود دارد از id آن استفاده کن، در غیر اینصورت id جدید بساز
      name: '', website: '', description: '', location_id: null, created_at: '', updated_at: '',
      pivot: { job_title: '', start_date: '', end_date: null, description: '', employment_type: 'تمام وقت' }
    }
  );

  useEffect(() => {
    if (isOpen) {
      setExperience(
        initialData || {
          id: Date.now(), name: '', website: '', description: '', location_id: null, created_at: '', updated_at: '',
          pivot: { job_title: '', start_date: '', end_date: null, description: '', employment_type: 'تمام وقت' }
        }
      );
    }
  }, [isOpen, initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name in experience.pivot) {
      setExperience(prev => ({ ...prev, pivot: { ...prev.pivot, [name]: value } }));
    } else {
      setExperience(prev => ({ ...prev, [name]: value } as Company));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // اعتبارسنجی ساده
    if (!experience.name.trim() || !experience.pivot.job_title.trim() || !experience.pivot.start_date.trim()) {
      alert('لطفاً نام شرکت، عنوان شغلی و تاریخ شروع را وارد کنید.');
      return;
    }
    onSubmit(experience);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose} dir="rtl">
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-right align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900 dark:text-white mb-4">
                  {initialData ? 'ویرایش سابقه شغلی' : 'افزودن سابقه شغلی'}
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">نام شرکت</label>
                    <input type="text" name="name" id="companyName" value={experience.name} onChange={handleChange} required className="mt-1 input-style" />
                  </div>
                  <div>
                    <label htmlFor="job_title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">عنوان شغلی</label>
                    <input type="text" name="job_title" id="job_title" value={experience.pivot.job_title} onChange={handleChange} required className="mt-1 input-style" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">تاریخ شروع</label>
                      <input type="date" name="start_date" id="start_date" value={experience.pivot.start_date} onChange={handleChange} required className="mt-1 input-style" />
                    </div>
                    <div>
                      <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">تاریخ پایان (خالی اگر شغل فعلی است)</label>
                      <input type="date" name="end_date" id="end_date" value={experience.pivot.end_date || ''} onChange={handleChange} className="mt-1 input-style" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="employment_type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">نوع همکاری</label>
                    <select name="employment_type" id="employment_type" value={experience.pivot.employment_type} onChange={handleChange} className="mt-1 input-style">
                      <option value="تمام وقت">تمام وقت</option>
                      <option value="پاره وقت">پاره وقت</option>
                      <option value="قراردادی">قراردادی</option>
                      <option value="کارآموزی">کارآموزی</option>
                      <option value="فریلنسری">فریلنسری</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="work_description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">توضیحات شغل</label>
                    <textarea name="description" id="work_description" value={experience.pivot.description || ''} onChange={handleChange} rows={3} className="mt-1 input-style" />
                  </div>
                  <div>
                    <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700 dark:text-gray-300">وبسایت شرکت (اختیاری)</label>
                    <input type="url" name="website" id="companyWebsite" value={experience.website || ''} onChange={handleChange} className="mt-1 input-style" placeholder="https://example.com" />
                  </div>
                  <div className="mt-6 flex justify-end space-x-3 space-x-reverse">
                    <button type="button" onClick={onClose} className="btn-secondary">انصراف</button>
                    <button type="submit" className="btn-primary">ذخیره</button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

// --- مودال برای ویرایش/افزودن دستاورد ---
interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (achievement: Achievement) => void;
  initialData?: Achievement | null;
}

const AchievementModal: React.FC<AchievementModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [achievement, setAchievement] = useState<Achievement>(
    initialData || { id: Date.now(), title: '', description: '', date: '', issuer: '', created_at: '', updated_at: '', user_id: 0 }
  );

  useEffect(() => {
    if (isOpen) {
      setAchievement(
        initialData || { id: Date.now(), title: '', description: '', date: '', issuer: '', created_at: '', updated_at: '', user_id: 0 }
      );
    }
  }, [isOpen, initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAchievement(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!achievement.title.trim() || !achievement.date.trim()) {
      alert('لطفاً عنوان دستاورد و تاریخ را وارد کنید.');
      return;
    }
    onSubmit(achievement);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose} dir="rtl">
        {/* ... (کد Transition.Child و Dialog.Panel مشابه مودال قبلی با فرم دستاورد) ... */}
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-right align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900 dark:text-white mb-4">
                  {initialData ? 'ویرایش دستاورد/گواهینامه' : 'افزودن دستاورد/گواهینامه'}
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="ach_title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">عنوان</label>
                    <input type="text" name="title" id="ach_title" value={achievement.title} onChange={handleChange} required className="mt-1 input-style" />
                  </div>
                  <div>
                    <label htmlFor="ach_description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">توضیحات</label>
                    <textarea name="description" id="ach_description" value={achievement.description} onChange={handleChange} rows={3} className="mt-1 input-style" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ach_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">تاریخ</label>
                      <input type="date" name="date" id="ach_date" value={achievement.date} onChange={handleChange} required className="mt-1 input-style" />
                    </div>
                    <div>
                      <label htmlFor="ach_issuer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">صادر کننده / سازمان</label>
                      <input type="text" name="issuer" id="ach_issuer" value={achievement.issuer} onChange={handleChange} className="mt-1 input-style" />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3 space-x-reverse">
                    <button type="button" onClick={onClose} className="btn-secondary">انصراف</button>
                    <button type="submit" className="btn-primary">ذخیره</button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};


const MyProfilePage: NextPage = () => {

  // const [user, setUser] = useState<UserProfileData | null>(null);
  const { user, updateUserInfo } = useUserInfoStore((state) => state)


  // States for edit mode of sections (فقط برای اطلاعات شخصی)
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);

  // States for modals
  const [isWorkExpModalOpen, setIsWorkExpModalOpen] = useState(false);
  const [editingWorkExp, setEditingWorkExp] = useState<CompanyWorkExperience | null>(null);
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);

  const [newSkill, setNewSkill] = useState('');


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

  const handleProfilePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !user) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        useUserInfoStore.getState().updateUserInfo({ profile_photo: result });
      }
    };

    reader.readAsDataURL(file);
  };

  const { addSkill } = useUserInfoStore();
  const handleAddSkill = () => {
    if (!user || !newSkill.trim()) return;
    if (user.skills.find(s => s.name.toLowerCase() === newSkill.trim().toLowerCase())) return;

    const newSkillObject: Skill = {
      id: Date.now(),
      name: newSkill.trim(),
      user_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    addSkill(newSkillObject);
    setNewSkill('');
  };


  const { removeSkill } = useUserInfoStore();
  const handleRemoveSkill = (skillId: number) => {
    removeSkill(skillId);
  };


  // --- Work Experience Handlers ---
  const openWorkExpModal = (exp?: CompanyWorkExperience) => {
    setEditingWorkExp(exp || null);
    setIsWorkExpModalOpen(true);
  };
  const handleWorkExpSubmit = (submittedExp: Company) => {
    if (!user) return;

    const existingCompanyIndex = user.companies.findIndex(exp => exp.id === submittedExp.id);

    if (existingCompanyIndex !== -1) {
      // Edit mode
      const updatedCompanies = [...user.companies];
      updatedCompanies[existingCompanyIndex] = submittedExp;

      updateUserInfo({
        ...user,
        companies: updatedCompanies,
      });
    } else {
      // Add mode
      updateUserInfo({
        ...user,
        companies: [
          ...user.companies,
          { ...submittedExp, id: Date.now() }, // اگر backend id را تولید می‌کند، این خط باید حذف شود
        ],
      });
    }
  };

  const handleRemoveWorkExperience = (id: number) => {
    if (user && window.confirm('آیا از حذف این سابقه شغلی مطمئن هستید؟')) {
      const updatedCompanies = user.companies.filter(company => company.id !== id);
      updateUserInfo({ ...user, companies: updatedCompanies });
    }
  };


  // --- Achievement Handlers ---
  const openAchievementModal = (ach?: Achievement) => {
    setEditingAchievement(ach || null);
    setIsAchievementModalOpen(true);
  };
  const { addAchievement, removeAchievement } = useUserInfoStore();

  const handleAchievementSubmit = (submittedAch: Achievement) => {
    if (!user) return;
    if (editingAchievement) {
      const updated = user.achievements.map(a => a.id === submittedAch.id ? submittedAch : a);
      updateUserInfo({ achievements: updated });
    } else {
      addAchievement({ ...submittedAch, id: Date.now() });
    }
  };

  const handleRemoveAchievement = (id: number) => {
    if (window.confirm('آیا از حذف این دستاورد مطمئن هستید؟')) {
      removeAchievement(id);
    }
  };


  const handleCancelPersonalInfoEdit = () => {

    setIsEditingPersonalInfo(false);
  };

  const handleSavePersonalInfo = () => {
    // منطق ذخیره اطلاعات شخصی (مثلا ارسال به API)
    // if (user) setInitialUser(prev => prev ? { ...prev, ...JSON.parse(JSON.stringify(user)) } : null); // آپدیت initialUser
    setIsEditingPersonalInfo(false);
    // alert('اطلاعات شخصی ذخیره شد.'); // این قسمت را بعدا با نوتیفیکیشن بهتر جایگزین کنید
  };
const {mutate}=useUpdateProfileRequest();
  const handleSaveAll = () => {
    console.log("Saving user data:", user);
  mutate(user);
    setIsEditingPersonalInfo(false); // بستن همه بخش‌های ویرایش پس از ذخیره کلی
    // ... بستن سایر مودال‌ها اگر باز هستند ...
    alert('تمام اطلاعات با موفقیت (به صورت شبیه‌سازی شده) ذخیره شد!');
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Profile Header (همانند قبل با تغییر جزئی در دکمه ذخیره کلی) */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 md:p-8 mb-8 flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8 sm:space-x-reverse">
          <div className="relative group">
            <img src={user.profile_photo || 'https://placehold.co/150x150/cccccc/FFFFFF?text=User&font=arial'} alt={user.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400 shadow-lg" onError={(e) => (e.currentTarget.src = 'https://placehold.co/150x150/cccccc/FFFFFF?text=Error&font=arial')} />
            {(isEditingPersonalInfo) && ( /* فقط در حالت ویرایش اطلاعات شخصی فعال شود */
              <label htmlFor="profilePhotoInput" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FiUploadCloud size={40} className="text-white" />
                <input type="file" id="profilePhotoInput" className="hidden" accept="image/*" onChange={handleProfilePhotoChange} />
              </label>
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
          onToggleEdit={() => isEditingPersonalInfo ? handleSavePersonalInfo() : setIsEditingPersonalInfo(true)}
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
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">عنوان شغلی</label>
                <input type="text" name="role" id="role" value={user.role} onChange={handleInputChange} className={inputStyle} />
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
                <button type="button" onClick={handleSavePersonalInfo} className={btnPrimary}>ذخیره اطلاعات شخصی</button>
              </div>
            </form>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{user.bio || 'بیوگرافی هنوز وارد نشده است.'}</p>
          )}
        </EditableSection>

        {/* Skills Section */}
        <EditableSection title="مهارت‌ها" icon={<FaLightbulb size={24} className="text-yellow-500" />} onAddNew={() => {/* برای مهارت، افزودن مستقیم است و مودال ندارد */ }}>
          <div className="flex items-center mb-4">
            <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="مهارت جدید (مثلا: JavaScript)" className={`${inputStyle} flex-grow rounded-r-none dark:bg-gray-700`} />
            <button onClick={handleAddSkill} className={`${btnPrimary} rounded-l-none`}> <FaPlusCircle size={16} className="ml-1 rtl:mr-1" /> افزودن</button>
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
        <EditableSection title="سوابق شغلی" icon={<FaBriefcase size={24} className="text-green-500" />} onAddNew={() => openWorkExpModal()}>
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

      {/* Global Styles for Modals (can be in globals.css) */}
      <style jsx global>{`
        .input-style {
          margin-top: 0.25rem;
          display: block;
          width: 100%;
          border-radius: 0.375rem; /* rounded-md */
          border-width: 1px;
          border-color: #D1D5DB; /* border-gray-300 */
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
          padding: 0.625rem; /* p-2.5 */
        }
        .dark .input-style {
          border-color: #4B5563; /* dark:border-gray-600 */
          background-color: #374151; /* dark:bg-gray-700 */
          color: #F3F4F6; /* dark:text-gray-200 */
        }
        .dark .input-style::placeholder {
            color: #9CA3AF; /* dark:placeholder-gray-500 */
        }
        .input-style:focus {
          outline: 2px solid transparent;
          outline-offset: 2px;
          --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
          --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
          box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
          border-color: #3B82F6; /* focus:border-blue-500 */
          --tw-ring-color: #3B82F6; /* focus:ring-blue-500 */
        }
        .btn-primary {
          display: inline-flex;
          justify-content: center;
          border-radius: 0.5rem; /* rounded-lg */
          border-width: 1px;
          border-color: transparent;
          background-color: #2563EB; /* bg-blue-600 */
          padding: 0.5rem 1rem; /* px-4 py-2 */
          font-size: 0.875rem; /* text-sm */
          font-weight: 500; /* font-medium */
          color: white;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); /* shadow-md */
          transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }
        .btn-primary:hover {
          background-color: #1D4ED8; /* hover:bg-blue-700 */
        }
        .btn-secondary {
          display: inline-flex;
          justify-content: center;
          border-radius: 0.5rem; /* rounded-lg */
          border-width: 1px;
          border-color: #D1D5DB; /* border-gray-300 */
          background-color: white;
          padding: 0.5rem 1rem; /* px-4 py-2 */
          font-size: 0.875rem; /* text-sm */
          font-weight: 500; /* font-medium */
          color: #374151; /* text-gray-700 */
          box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05); /* shadow-sm */
          transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }
        .dark .btn-secondary {
          border-color: #4B5563; /* dark:border-gray-600 */
          background-color: #374151; /* dark:bg-gray-700 */
          color: #F3F4F6; /* dark:text-gray-200 */
        }
        .btn-secondary:hover {
          background-color: #F9FAFB; /* hover:bg-gray-50 */
        }
        .dark .btn-secondary:hover {
          background-color: #4B5563; /* dark:hover:bg-gray-600 */
        }
      `}</style>
    </div>
  );
};

export default MyProfilePage;
