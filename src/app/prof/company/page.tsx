'use client';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect, ChangeEvent, FormEvent, Fragment } from 'react';
import {
  FaBuilding, FaEdit, FaSave, FaTimesCircle, FaPlusCircle, FaTrashAlt,
  FaMapMarkerAlt, FaGlobe, FaPhone, FaEnvelope, FaUsers, FaIndustry,
  FaStar, FaUserTie, FaLink, FaInfoCircle
} from 'react-icons/fa';
import { FiUploadCloud } from 'react-icons/fi';
import { Dialog, Transition } from '@headlessui/react';

// ---------------------------------------------------------------------------
// TYPE DEFINITIONS (شامل تایپ‌های قبلی و جدید برای شرکت)
// ---------------------------------------------------------------------------

export interface Location {
  id?: number;
  city: string;
  country: string;
  created_at?: string;
  updated_at?: string;
}

export interface Skill {
  id: number;
  name: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  issuer: string;
}

// --- تایپ‌های جدید برای شرکت ---
export interface ReviewerType {
  id: number;
  name: string;
  email: string; // ممکن است برای نمایش عمومی لازم نباشد
  email_verified_at?: string;
  profile_photo_url: string | null; // استفاده از profile_photo_url برای هماهنگی
  role: string;
  // location_id?: number; // این فیلدها ممکن است برای نمایش خلاصه لازم نباشند
  // bio?: string | null;
  // phone?: string | null;
  // linkedin_url?: string | null;
  // github_url?: string | null;
  // created_at?: string;
  // updated_at?: string;
}

export interface RatingCriteriaPivot {
  company_rating_id: number;
  rating_criteria_id: number;
  score: number;
  comment: string; // نظر برای هر معیار خاص
  created_at?: string;
  updated_at?: string;
}

export interface RatingCriteriaDefinition { // تغییر نام از RatingCriteria برای جلوگیری از تداخل
  id: number;
  name: string; // نام معیار e.g., "Work Environment"
  description: string;
  category: string; // e.g., "EmployeeWelfare", "ProductQuality"
  created_at?: string;
  updated_at?: string;
  pivot?: RatingCriteriaPivot; // pivot وقتی که در کانتکست یک CompanyRating است
}

export interface CompanyRating {
  id: number;
  company_id: number;
  reviewer_id: number;
  overall_rating: number;
  comment: string; // نظر کلی برای امتیاز
  created_at: string;
  updated_at?: string;
  reviewer: ReviewerType;
  criteria: RatingCriteriaDefinition[]; // لیستی از معیارها با امتیازاتشان (از طریق pivot)
}

export interface CompanyDetails {
  id: number;
  name: string;
  email: string;
  location_id: number | null;
  logo_url: string | null; // تغییر نام از logo
  description: string;
  industry: string;
  website: string | null;
  phone: string | null;
  created_at?: string;
  updated_at?: string;
  location: Location | null;
  // ratings: CompanyRating[]; // این از getCompanyByIdResponse می‌آید
}

// EmployeeType برای لیست کارمندان شرکت
export interface EmployeeType {
  id: number; // شناسه کاربر (کارمند)
  name: string;
  email: string; // برای شناسایی یا دعوت
  role?: string; // نقش کارمند در شرکت (می‌تواند از پروفایل کاربر بیاید یا جداگانه تعریف شود)
  profile_photo_url: string | null;
  // skills?: Skill[]; // این موارد می‌توانند در صفحه پروفایل خود کارمند نمایش داده شوند
  // achievements?: Achievement[];
  // location?: Location | null;
  // این موارد می‌توانند بعداً برای نمایش خلاصه‌ای از پروفایل کارمند اضافه شوند
}

// ساختارهای پاسخ API (برای شبیه‌سازی)
export interface GetCompanyByIdResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    company: CompanyDetails;
    ratings_count: number;
    average_rating: number;
    ratings: CompanyRating[]; // انتقال ratings به اینجا
  };
}

export interface CompanyEmployeesResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    employees: EmployeeType[];
    total_employees: number;
  };
}


// ---------------------------------------------------------------------------
// MOCK DATA
// ---------------------------------------------------------------------------
const mockCompanyDetailsFull: GetCompanyByIdResponse = {
  status: 'success',
  message: 'Company data fetched successfully.',
  data: {
    company: {
      id: 101,
      name: 'شرکت فناوری‌های نوین پارسیان',
      email: 'info@parsian-tech.com',
      location_id: 1,
      logo_url: 'https://placehold.co/150x150/0284C7/FFFFFF?text=PNT&font=arial',
      description: 'ما یک شرکت پیشرو در ارائه راهکارهای نرم‌افزاری جامع برای کسب‌وکارهای متوسط و بزرگ هستیم. با تکیه بر تیمی مجرب و خلاق، محصولاتی نوآورانه و با کیفیت بالا تولید می‌کنیم که به رشد و بهره‌وری مشتریانمان کمک می‌کند. تمرکز ما بر روی فناوری‌های ابری، هوش مصنوعی و تحلیل داده است.',
      industry: 'فناوری اطلاعات و نرم‌افزار',
      website: 'https://parsian-tech.com',
      phone: '021-88776655',
      location: { id: 1, city: 'تهران', country: 'ایران' },
    },
    ratings_count: 2,
    average_rating: 4.5,
    ratings: [
      {
        id: 1, company_id: 101, reviewer_id: 1, overall_rating: 5,
        comment: 'محیط کاری بسیار پویا و حرفه‌ای. فرصت‌های زیادی برای یادگیری و پیشرفت وجود دارد.',
        created_at: '2023-10-15T10:00:00Z',
        reviewer: { id: 1, name: 'علی محمدی', email: 'ali@example.com', profile_photo_url: 'https://placehold.co/50x50/16A34A/FFFFFF?text=AM', role: 'توسعه‌دهنده نرم‌افزار' },
        criteria: [
          { id: 1, name: 'محیط کاری', description: '', category: '', pivot: { company_rating_id:1, rating_criteria_id:1, score: 5, comment: 'عالی' } },
          { id: 2, name: 'فرصت‌های رشد', description: '', category: '', pivot: { company_rating_id:1, rating_criteria_id:2, score: 5, comment: 'بسیار خوب' } },
        ],
      },
      {
        id: 2, company_id: 101, reviewer_id: 2, overall_rating: 4,
        comment: 'شرکت خوبی است، اما گاهی اوقات فشار کاری زیاد می‌شود.',
        created_at: '2023-11-01T14:30:00Z',
        reviewer: { id: 2, name: 'زهرا حسینی', email: 'zahra@example.com', profile_photo_url: 'https://placehold.co/50x50/F97316/FFFFFF?text=ZH', role: 'مدیر پروژه' },
        criteria: [
          { id: 1, name: 'محیط کاری', description: '', category: '', pivot: { company_rating_id:2, rating_criteria_id:1, score: 4, comment: 'خوب' } },
          { id: 3, name: 'تعادل کار و زندگی', description: '', category: '', pivot: { company_rating_id:2, rating_criteria_id:3, score: 3, comment: 'متوسط' } },
        ],
      },
    ],
  }
};

const mockCompanyEmployees: CompanyEmployeesResponse = {
  status: 'success',
  message: 'Employees fetched successfully.',
  data: {
    employees: [
      { id: 201, name: 'سارا بهرامی', email: 'sara.b@example.com', role: 'مهندس نرم‌افزار', profile_photo_url: 'https://placehold.co/80x80/7C3AED/FFFFFF?text=SB' },
      { id: 202, name: 'رضا قاسمی', email: 'reza.q@example.com', role: 'طراح UI/UX', profile_photo_url: 'https://placehold.co/80x80/DB2777/FFFFFF?text=RQ' },
      { id: 203, name: 'مریم اکبری', email: 'maryam.a@example.com', role: 'تحلیلگر داده', profile_photo_url: 'https://placehold.co/80x80/E11D48/FFFFFF?text=MA' },
    ],
    total_employees: 3,
  }
};


// --- کامپوننت EditableSection (مشابه قبل، با تغییرات جزئی) ---
interface EditableSectionProps {
  title: string;
  icon: React.ReactElement;
  children: React.ReactNode;
  isEditing?: boolean;
  onToggleEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  onAddNew?: () => void; // برای دکمه افزودن جدید (مثلا برای کارمندان)
  canEdit?: boolean;
}

const EditableSection: React.FC<EditableSectionProps> = ({
  title, icon, children, isEditing, onToggleEdit, onSave, onCancel, onAddNew, canEdit = true,
}) => (
  <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 md:p-8 mb-8">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center">
        {icon}
        <span className="mr-3 rtl:ml-3 rtl:mr-0">{title}</span>
      </h2>
      {canEdit && (
        <div className="flex items-center space-x-2 space-x-reverse">
          {isEditing ? (
            <>
              <button onClick={onSave} className="text-green-500 hover:text-green-700 p-2 rounded-full" title="ذخیره"><FaSave size={20} /></button>
              <button onClick={onCancel} className="text-red-500 hover:text-red-700 p-2 rounded-full" title="لغو"><FaTimesCircle size={20} /></button>
            </>
          ) : (
            onToggleEdit && <button onClick={onToggleEdit} className="text-blue-500 hover:text-blue-700 p-2 rounded-full" title="ویرایش بخش"><FaEdit size={20} /></button>
          )}
          {onAddNew && !isEditing && ( // دکمه افزودن فقط وقتی که در حالت ویرایش کلی بخش نیستیم
            <button onClick={onAddNew} className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded-lg flex items-center text-sm shadow-md" title={`افزودن ${title.includes('کارمندان') ? 'کارمند' : ''}`}>
              <FaPlusCircle className="ml-1 rtl:mr-1 rtl:ml-0" /> افزودن
            </button>
          )}
        </div>
      )}
    </div>
    {children}
  </div>
);

// --- مودال برای افزودن/ویرایش کارمند ---
interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (employee: Pick<EmployeeType, 'email' | 'name' | 'role'>) => void; // فقط فیلدهای لازم برای افزودن
  // initialData?: EmployeeType | null; // برای ویرایش می‌توان اضافه کرد
}
const EmployeeModal: React.FC<EmployeeModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [employeeData, setEmployeeData] = useState({ email: '', name: '', role: '' });

    useEffect(() => {
        if (isOpen) setEmployeeData({ email: '', name: '', role: '' });
    }, [isOpen]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmployeeData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!employeeData.email.trim() || !employeeData.name.trim()) {
            alert('لطفاً نام و ایمیل کارمند را وارد کنید.');
            return;
        }
        onSubmit(employeeData);
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-right align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900 dark:text-white mb-4">افزودن کارمند جدید</Dialog.Title>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="empName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">نام کارمند</label>
                                        <input type="text" name="name" id="empName" value={employeeData.name} onChange={handleChange} required className="mt-1 input-style" />
                                    </div>
                                    <div>
                                        <label htmlFor="empEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">ایمیل کارمند</label>
                                        <input type="email" name="email" id="empEmail" value={employeeData.email} onChange={handleChange} required className="mt-1 input-style" />
                                    </div>
                                    <div>
                                        <label htmlFor="empRole" className="block text-sm font-medium text-gray-700 dark:text-gray-300">نقش کارمند (اختیاری)</label>
                                        <input type="text" name="role" id="empRole" value={employeeData.role} onChange={handleChange} className="mt-1 input-style" />
                                    </div>
                                    <div className="mt-6 flex justify-end space-x-3 space-x-reverse">
                                        <button type="button" onClick={onClose} className="btn-secondary">انصراف</button>
                                        <button type="submit" className="btn-primary">افزودن</button>
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


const MyCompanyProfilePage: NextPage = () => {
  const [companyData, setCompanyData] = useState<GetCompanyByIdResponse['data'] | null>(null);
  const [employeesData, setEmployeesData] = useState<CompanyEmployeesResponse['data'] | null>(null);
  const [initialCompanyDetails, setInitialCompanyDetails] = useState<CompanyDetails | null>(null);

  const [isEditingCompanyInfo, setIsEditingCompanyInfo] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

  useEffect(() => {
    // شبیه‌سازی واکشی داده‌ها
    setCompanyData(mockCompanyDetailsFull.data);
    setInitialCompanyDetails(JSON.parse(JSON.stringify(mockCompanyDetailsFull.data.company)));
    setEmployeesData(mockCompanyEmployees.data);
  }, []);

  const handleCompanyInfoChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!companyData) return;
    const { name, value } = e.target;
    if (name.startsWith("location.")) {
        const locField = name.split(".")[1] as keyof Location;
        setCompanyData(prev => prev ? {
            ...prev,
            company: {
                ...prev.company,
                location: { ...(prev.company.location || { city: '', country: '' }), [locField]: value }
            }
        } : null);
    } else {
        setCompanyData(prev => prev ? { ...prev, company: { ...prev.company, [name]: value } } : null);
    }
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0] && companyData) {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
              setCompanyData(prev => prev ? { ...prev, company: { ...prev.company, logo_url: reader.result as string } } : null);
          };
          reader.readAsDataURL(file);
          // در برنامه واقعی: آپلود فایل و دریافت URL
      }
  };

  const handleSaveCompanyInfo = () => {
    // ارسال companyData.company به API
    console.log("Saving company info:", companyData?.company);
    if (companyData) setInitialCompanyDetails(JSON.parse(JSON.stringify(companyData.company)));
    setIsEditingCompanyInfo(false);
    alert('اطلاعات شرکت (به صورت شبیه‌سازی شده) ذخیره شد.');
  };

  const handleCancelCompanyInfoEdit = () => {
    if (initialCompanyDetails && companyData) {
      setCompanyData({ ...companyData, company: JSON.parse(JSON.stringify(initialCompanyDetails)) });
    }
    setIsEditingCompanyInfo(false);
  };

  const handleAddEmployee = (employee: Pick<EmployeeType, 'email' | 'name' | 'role'>) => {
    if (!employeesData) return;
    const newEmployee: EmployeeType = {
        id: Date.now(), // شناسه موقت
        ...employee,
        profile_photo_url: null, // یا یک آواتار پیش‌فرض
    };
    setEmployeesData(prev => prev ? {
        ...prev,
        employees: [...prev.employees, newEmployee],
        total_employees: prev.total_employees + 1,
    } : null);
    // ارسال newEmployee به API برای افزودن واقعی
    console.log("Adding employee:", newEmployee);
  };

  const handleRemoveEmployee = (employeeId: number) => {
    if (employeesData && window.confirm(`آیا از حذف کارمند با شناسه ${employeeId} مطمئن هستید؟`)) {
        setEmployeesData(prev => prev ? {
            ...prev,
            employees: prev.employees.filter(emp => emp.id !== employeeId),
            total_employees: prev.total_employees - 1,
        } : null);
        // ارسال درخواست حذف به API
        console.log("Removing employee ID:", employeeId);
    }
  };


  if (!companyData || !employeesData) {
    return <div className="flex justify-center items-center min-h-screen">در حال بارگذاری اطلاعات شرکت...</div>;
  }

  const { company, ratings, average_rating, ratings_count } = companyData;

  // کلاس‌های کمکی برای استایل‌دهی (مشابه قبل)
  const inputStyle = "mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2.5 dark:bg-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500";


  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 md:py-12" dir="rtl">
      <Head>
        <title>پروفایل شرکت - {company.name}</title>
        <meta name="description" content={`مدیریت پروفایل شرکت ${company.name}.`} />
      </Head>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Company Header */}
        <header className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center text-center md:text-right space-y-6 md:space-y-0 md:space-x-8 md:space-x-reverse">
            <div className="relative group flex-shrink-0">
                <img
                    src={company.logo_url || 'https://placehold.co/150x150/cccccc/FFFFFF?text=Logo&font=arial'}
                    alt={`لوگوی ${company.name}`}
                    className="w-32 h-32 md:w-36 md:h-36 rounded-lg object-contain border-2 border-gray-200 dark:border-gray-700 shadow-md bg-gray-50 dark:bg-gray-750 p-1"
                    onError={(e) => (e.currentTarget.src = 'https://placehold.co/150x150/cccccc/FFFFFF?text=Error&font=arial')}
                />
                {isEditingCompanyInfo && (
                    <label htmlFor="logoUpload" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                        <FiUploadCloud size={40} className="text-white" />
                        <input type="file" id="logoUpload" className="hidden" accept="image/*" onChange={handleLogoChange} />
                    </label>
                )}
            </div>
            <div className="flex-grow">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">{company.name}</h1>
                <p className="text-md text-gray-600 dark:text-gray-400 font-medium mb-1 flex items-center justify-center md:justify-start">
                    <FaIndustry className="ml-2 rtl:mr-2 rtl:ml-0 text-blue-500" /> {company.industry}
                </p>
                {company.website && (
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center justify-center md:justify-start mb-1">
                        <FaGlobe className="ml-1.5 rtl:mr-1.5 rtl:ml-0" /> {company.website}
                    </a>
                )}
                <div className="flex items-center justify-center md:justify-start text-sm text-gray-500 dark:text-gray-400">
                    <FaStar className="ml-1 rtl:mr-1 rtl:ml-0 text-yellow-400" />
                    <span className="font-semibold">{average_rating ? average_rating.toFixed(1) : 'N/A'}</span>
                    <span className="mx-1">({ratings_count} نظر)</span>
                </div>
            </div>
        </header>

        {/* Company Information Section */}
        <EditableSection
            title="اطلاعات شرکت"
            icon={<FaInfoCircle size={24} className="text-sky-500" />}
            isEditing={isEditingCompanyInfo}
            onToggleEdit={() => setIsEditingCompanyInfo(true)}
            onSave={handleSaveCompanyInfo}
            onCancel={handleCancelCompanyInfoEdit}
        >
            {isEditingCompanyInfo ? (
                <form className="space-y-4">
                    <div>
                        <label htmlFor="compName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">نام شرکت</label>
                        <input type="text" name="name" id="compName" value={company.name} onChange={handleCompanyInfoChange} className={inputStyle} />
                    </div>
                    <div>
                        <label htmlFor="compIndustry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">صنعت</label>
                        <input type="text" name="industry" id="compIndustry" value={company.industry} onChange={handleCompanyInfoChange} className={inputStyle} />
                    </div>
                    <div>
                        <label htmlFor="compDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">توضیحات شرکت</label>
                        <textarea name="description" id="compDescription" rows={4} value={company.description} onChange={handleCompanyInfoChange} className={inputStyle} />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="compEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">ایمیل</label>
                            <input type="email" name="email" id="compEmail" value={company.email} onChange={handleCompanyInfoChange} className={inputStyle} />
                        </div>
                        <div>
                            <label htmlFor="compPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">تلفن</label>
                            <input type="tel" name="phone" id="compPhone" value={company.phone || ''} onChange={handleCompanyInfoChange} className={inputStyle} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="compWebsite" className="block text-sm font-medium text-gray-700 dark:text-gray-300">وبسایت</label>
                        <input type="url" name="website" id="compWebsite" value={company.website || ''} onChange={handleCompanyInfoChange} className={inputStyle} placeholder="https://example.com" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="compCity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">شهر</label>
                            <input type="text" name="location.city" id="compCity" value={company.location?.city || ''} onChange={handleCompanyInfoChange} className={inputStyle} />
                        </div>
                        <div>
                            <label htmlFor="compCountry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">کشور</label>
                            <input type="text" name="location.country" id="compCountry" value={company.location?.country || ''} onChange={handleCompanyInfoChange} className={inputStyle} />
                        </div>
                    </div>
                </form>
            ) : (
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                    <p className="whitespace-pre-wrap leading-relaxed">{company.description}</p>
                    <p><FaEnvelope className="inline ml-2 rtl:mr-2 rtl:ml-0 text-gray-500" />ایمیل: {company.email}</p>
                    {company.phone && <p><FaPhone className="inline ml-2 rtl:mr-2 rtl:ml-0 text-gray-500" />تلفن: {company.phone}</p>}
                    {company.location && <p><FaMapMarkerAlt className="inline ml-2 rtl:mr-2 rtl:ml-0 text-gray-500" />مکان: {company.location.city}, {company.location.country}</p>}
                </div>
            )}
        </EditableSection>

        {/* Employees Section */}
        <EditableSection
            title={`کارمندان (${employeesData.total_employees})`}
            icon={<FaUsers size={24} className="text-green-500" />}
            onAddNew={() => setIsEmployeeModalOpen(true)}
        >
            {employeesData.employees.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {employeesData.employees.map(emp => (
                        <div key={emp.id} className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow relative group">
                            <button onClick={() => handleRemoveEmployee(emp.id)} className="absolute top-2 left-2 rtl:right-2 rtl:left-auto p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" title="حذف کارمند">
                                <FaTrashAlt size={14}/>
                            </button>
                            <div className="flex items-center space-x-3 space-x-reverse mb-2">
                                <img src={emp.profile_photo_url || 'https://placehold.co/60x60/cccccc/FFFFFF?text=Emp&font=arial'} alt={emp.name} className="w-14 h-14 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600" />
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-white">{emp.name}</h4>
                                    {emp.role && <p className="text-xs text-blue-500 dark:text-blue-400">{emp.role}</p>}
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate"><FaEnvelope className="inline ml-1 rtl:mr-1 rtl:ml-0" />{emp.email}</p>
                            {/* Можно добавить ссылку на профиль сотрудника, если существует */}
                            {/* <Link href={`/profile/${emp.id}`}><a className="text-xs text-blue-500 hover:underline mt-1 block">مشاهده پروفایل</a></Link> */}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">هنوز کارمندی برای این شرکت ثبت نشده است.</p>
            )}
        </EditableSection>

        {/* Company Ratings Section (Read-only for now) */}
        <EditableSection title="امتیازات و نظرات دریافتی" icon={<FaStar size={24} className="text-orange-500" />} canEdit={false}>
            {ratings.length > 0 ? (
                <div className="space-y-6">
                    {ratings.map(rating => (
                        <div key={rating.id} className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg shadow">
                            <div className="flex items-start space-x-3 space-x-reverse mb-3">
                                <img src={rating.reviewer.profile_photo_url || 'https://placehold.co/50x50/cccccc/FFFFFF?text=R&font=arial'} alt={rating.reviewer.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                                <div className="flex-grow">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                                        <h5 className="font-semibold text-gray-800 dark:text-white">{rating.reviewer.name} <span className="text-xs text-gray-500 dark:text-gray-400">({rating.reviewer.role})</span></h5>
                                        <div className="flex items-center mt-1 sm:mt-0">
                                            {[...Array(5)].map((_, i) => <FaStar key={i} className={`w-4 h-4 ${i < rating.overall_rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />)}
                                            <span className="mr-1.5 rtl:ml-1.5 rtl:mr-0 text-sm font-bold text-yellow-500">({rating.overall_rating.toFixed(1)})</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{new Date(rating.created_at).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                            {rating.comment && <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-white dark:bg-gray-800 p-3 rounded-md shadow-inner mb-3">{rating.comment}</p>}
                            {rating.criteria && rating.criteria.length > 0 && (
                                <div>
                                    <h6 className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">جزئیات امتیازات:</h6>
                                    <ul className="space-y-1 text-xs">
                                        {rating.criteria.map(crit => crit.pivot && (
                                            <li key={crit.id} className="flex justify-between items-center p-1.5 bg-gray-100 dark:bg-gray-700 rounded">
                                                <span>{crit.name}: <span className="font-medium">{crit.pivot.score}/5</span></span>
                                                {crit.pivot.comment && <span className="text-gray-500 dark:text-gray-400 italic">"{crit.pivot.comment}"</span>}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">هنوز هیچ امتیازی برای این شرکت ثبت نشده است.</p>
            )}
        </EditableSection>
      </div>

      {/* Modals */}
      <EmployeeModal isOpen={isEmployeeModalOpen} onClose={() => setIsEmployeeModalOpen(false)} onSubmit={handleAddEmployee} />

      {/* Global Styles (مشابه قبل) */}
      <style jsx global>{`
        .input-style { margin-top: 0.25rem; display: block; width: 100%; border-radius: 0.375rem; border-width: 1px; border-color: #D1D5DB; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); padding: 0.625rem; }
        .dark .input-style { border-color: #4B5563; background-color: #374151; color: #F3F4F6; }
        .dark .input-style::placeholder { color: #9CA3AF; }
        .input-style:focus { outline: 2px solid transparent; outline-offset: 2px; box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow, 0 0 #0000); border-color: #3B82F6; --tw-ring-color: #3B82F6; }
        .btn-primary { display: inline-flex; justify-content: center; border-radius: 0.5rem; border-width: 1px; border-color: transparent; background-color: #2563EB; padding: 0.5rem 1rem; font-size: 0.875rem; font-weight: 500; color: white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
        .btn-primary:hover { background-color: #1D4ED8; }
        .btn-secondary { display: inline-flex; justify-content: center; border-radius: 0.5rem; border-width: 1px; border-color: #D1D5DB; background-color: white; padding: 0.5rem 1rem; font-size: 0.875rem; font-weight: 500; color: #374151; box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05); transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
        .dark .btn-secondary { border-color: #4B5563; background-color: #374151; color: #F3F4F6; }
        .btn-secondary:hover { background-color: #F9FAFB; }
        .dark .btn-secondary:hover { background-color: #4B5563; }
      `}</style>
    </div>
  );
};

export default MyCompanyProfilePage;