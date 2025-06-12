'use client';

// ------------------- ایمپورت‌های مورد نیاز -------------------
import Head from 'next/head';
import { use, useEffect, useState } from 'react';
import {
    FaBuilding, FaUserCircle, FaIndustry, FaEdit, FaPlus, FaTrash, FaTimes,
    FaGlobe, FaPhone, FaMapMarkerAlt, FaCommentDots, FaUser, FaCalendarAlt
} from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query'; // برای آپدیت آنی UI

// --- هوک‌ها ---
import { useCompanyGetByIDRequest } from '@/hooks/company/getCompany';
import {
    useAddCompanyEmployeesRequest,
    useCompanyEmployeesGetByIDRequest,
    useDeleteCompanyEmployeesRequest,
    useUpdateCompanyRequest
} from '@/hooks/company/getCompanyEmployees'; // مسیر هوک‌ها را بررسی کنید

// --- کامپوننت‌های UI ---
import { StarRating } from '@/components/admin/compony/RatingCard';
import EmployeeCard from '@/components/admin/compony/EmployeeCard';

// --- تایپ‌ها ---
// این تایپ‌ها را بر اساس ساختار واقعی پاسخ API خودتان تنظیم کنید

import { CompanyAddUserInput, CompanyUpdateInput, CompanyUpdateResponse, CompanyAddUserResponse, CompanyRating, CompanyShowResponse, CompanyEmployeesResponse, CompanyEmployee } from '@/types/server/company';


// ------------------- کامپوننت کارت امتیاز (تعریف شده در همین فایل) -------------------
interface DetailedRatingCardProps {
    rating: CompanyRating;
}

const DetailedRatingCard = ({ rating }: DetailedRatingCardProps) => {
    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch {
            return dateString; // در صورت فرمت نامعتبر، خود رشته را برگردان
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                        <FaUser className="text-blue-500 dark:text-blue-300" />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800 dark:text-white">{rating.rater}</p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <FaCalendarAlt className="ml-1.5" />
                            <span>{formatDate(rating.timestamp)}</span>
                        </div>
                    </div>
                </div>
                <div className="text-left">
                    <StarRating score={rating.averageScore} />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        میانگین: {rating.averageScore.toFixed(1)} از ۵
                    </p>
                </div>
            </div>

            {rating.comment && (
                <div className="my-4 pl-4 border-r-4 border-blue-500 dark:border-blue-400">
                    <p className="text-gray-700 dark:text-gray-300 italic">{rating.comment}</p>
                </div>
            )}

            {rating.criteria && rating.criteria.length > 0 && (
                <div>
                    <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-200 mb-2 mt-4">امتیازدهی بر اساس معیارها:</h4>
                    <div className="space-y-2">
                        {rating.criteria.map((criterion, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700/50 p-2 rounded-lg">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{criterion.criterion}</span>
                                <StarRating score={criterion.score} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


// ------------------- کامپوننت اصلی صفحه -------------------
interface CompanyDetailPageProps {
    params: Promise<{ id: string }>;
}

const CompanyDetailPage = ({ params }: CompanyDetailPageProps) => {
    const { id } = use(params);
    const queryClient = useQueryClient();

    // کلیدهای کوئری برای مدیریت کش
    const queryKeyCompany = ['company', Number(id)];
    const queryKeyEmployees = ['companyEmployees', Number(id)];

    // --- هوک‌های دریافت دیتا ---
    const { data: companyData, isPending: isCompanyLoading, mutate: refetchCompany } = useCompanyGetByIDRequest();
    const { data: dataEmployees, isPending: isEmployeesLoading, mutate: refetchEmployees } = useCompanyEmployeesGetByIDRequest();

    // --- هوک‌های ویرایش، افزودن و حذف ---
    const { mutate: updateCompany, isPending: isUpdatingCompany } = useUpdateCompanyRequest();
    const { mutate: addEmployee, isPending: isAddingEmployee } = useAddCompanyEmployeesRequest();
    const { mutate: deleteEmployee } = useDeleteCompanyEmployeesRequest();

    // --- State ها ---
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
    const [companyFormData, setCompanyFormData] = useState<CompanyUpdateInput>({});
    const [newEmployeeFormData, setNewEmployeeFormData] = useState<CompanyAddUserInput>({
        user_id: 0,
        job_title: '',
        start_date: '',
        employment_type: 'تمام وقت',
        role: 'member',
    });

    useEffect(() => {
        if (id) {
            refetchCompany(Number(id));
            refetchEmployees(Number(id));
        }
    }, [id, refetchCompany, refetchEmployees]);

    const company = companyData?.data?.company;
    const ratings_count = companyData?.data?.ratings_count;
    const average_rating = companyData?.data?.average_rating;

    // --- هندلرهای مودال و فرم ---
    const handleOpenEditModal = () => {
        if (company) {
            setCompanyFormData({
                name: company.name,
                industry: company.industry ?? '',
                description: company.description ?? '',
                website: company.website ?? '',
                phone: company.phone ?? '',
                city: company.city ?? '',
                country: company.country ?? '',
            });
            setIsEditModalOpen(true);
        }
    };


    // مدیریت تغییرات در فرم ویرایش شرکت
    const handleCompanyFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // 'prev' در اینجا به درستی از نوع CompanyUpdateInput است
        setCompanyFormData(prev => ({ ...prev, [name]: value }));
    };

    // مدیریت تغییرات در فرم افزودن کارمند
    const handleEmployeeFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // 'prev' در اینجا به درستی از نوع CompanyAddUserInput است
        setNewEmployeeFormData(prev => ({ ...prev, [name]: name === 'user_id' ? Number(value) : value }));
    };
    const handleUpdateCompanySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateCompany({ id: Number(id), data: companyFormData }, {
            onSuccess: (updatedData: CompanyUpdateResponse) => {
                setIsEditModalOpen(false);

                queryClient.setQueryData<CompanyShowResponse | undefined>(queryKeyCompany, (oldData) => {
                    // Guard against invalid or missing data
                    if (!oldData?.data?.company || !updatedData.company) {
                        return oldData;
                    }

                    // Create a new object from the update response
                    const correctedUpdate = {
                        ...updatedData.company,
                        // Explicitly convert the conflicting 'id' from number to string
                        id: String(updatedData.company.id),
                    };

                    // Now, merge the data with consistent types
                    return {
                        ...oldData,
                        data: {
                            ...oldData.data,
                            company: {
                                ...oldData.data.company,
                                ...correctedUpdate
                            }
                        }
                    };
                });

            }
        });
    };
    const handleAddEmployeeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addEmployee({ id: Number(id), data: newEmployeeFormData }, {
            onSuccess: (newData: CompanyAddUserResponse) => {
                setIsAddEmployeeModalOpen(false);
                // آپدیت آنی لیست کارمندان
                queryClient.setQueryData<CompanyEmployeesResponse | undefined>(queryKeyEmployees, (oldData) => {
                    if (!oldData) return oldData;
                    const newEmployee = newData.user;
                    return {
                        ...oldData,
                        data: {
                            ...oldData.data,
                            employees: [newEmployee, ...oldData.data.employees],
                            total_employees: (oldData.data.total_employees ?? 0) + 1,
                        }
                    };
                });
            }
        });
    };

    const handleDeleteEmployee = (userId: number) => {
        if (window.confirm('آیا از حذف این کارمند اطمینان دارید؟')) {
            deleteEmployee({ companyId: Number(id), userId }, {
                onSuccess: () => {
                    // آپدیت آنی لیست کارمندان
                    queryClient.setQueryData<CompanyEmployeesResponse | undefined>(queryKeyEmployees, (oldData) => {
                        if (!oldData) return oldData;
                        return {
                            ...oldData,
                            data: {
                                ...oldData.data,
                                employees: oldData.data.employees.filter((emp: CompanyEmployee) => emp.id !== userId),
                                total_employees: (oldData.data.total_employees ?? 1) - 1,
                            }
                        };
                    });
                }
            });
        }
    };

    if (isCompanyLoading) {
        return <div className="flex justify-center items-center min-h-screen">در حال بارگذاری...</div>;
    }

    if (!company) {
        return <div className="flex justify-center items-center min-h-screen">شرکتی با این شناسه یافت نشد.</div>;
    }

    // --- رندر کردن کامپوننت ---
    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen" dir="rtl">
            <Head>
                <title>{`جزئیات شرکت ${company.name}`}</title>
            </Head>

            <header className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 text-white shadow-lg">
                <div className="container mx-auto px-6 py-10">
                    <div className="flex flex-col md:flex-row items-center">
                        <FaBuilding size={120} className="rounded-full bg-white p-4 text-indigo-600 shadow-md mb-6 md:mb-0 md:ml-8 rtl:md:mr-8 rtl:md:ml-0" />
                        <div className="text-center md:text-right rtl:md:text-left flex-grow">
                            <h1 className="text-4xl font-bold">{company.name}</h1>
                            {company.industry && (
                                <p className="text-lg text-indigo-200 mt-2 flex items-center justify-center md:justify-start">
                                    <FaIndustry className="ml-2 rtl:mr-2 rtl:ml-0" />{company.industry}
                                </p>
                            )}
                            <div className="mt-3 flex items-center justify-center md:justify-start">
                                <StarRating score={average_rating ?? 0} className="text-xl" />
                                <span className="ml-3 rtl:mr-3 text-sm text-indigo-100">({ratings_count ?? 0} نظر)</span>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <button onClick={handleOpenEditModal} className="bg-white text-blue-600 hover:bg-blue-100 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 font-bold py-2 px-4 rounded-lg shadow-md flex items-center transition-colors">
                                <FaEdit className="ml-2 rtl:mr-2" /> ویرایش شرکت
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ستون اطلاعات و امتیازات */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* بخش درباره شرکت */}
                        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 border-b-2 border-blue-500 pb-3">درباره شرکت</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                {company.description || 'توضیحاتی برای این شرکت ارائه نشده است.'}
                            </p>
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                {company.website && (
                                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                                        <FaGlobe className="ml-3 rtl:mr-3 rtl:ml-0 text-blue-500" size={20} />
                                        <a href={company.website.startsWith('http') ? company.website : `https://${company.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 break-all">
                                            {company.website}
                                        </a>
                                    </div>
                                )}
                                {company.phone && (
                                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                                        <FaPhone className="ml-3 rtl:mr-3 rtl:ml-0 text-blue-500" size={20} />
                                        <span>{company.phone}</span>
                                    </div>
                                )}
                                {(company.city || company.country) && (
                                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                                        <FaMapMarkerAlt className="ml-3 rtl:mr-3 rtl:ml-0 text-blue-500" size={20} />
                                        <span>{`${company.city || ''}${company.city && company.country ? '، ' : ''}${company.country || ''}`}</span>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* بخش امتیازات و نقدها */}
                        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 border-b-2 border-blue-500 pb-3">
                                امتیازات و نقدها ({ratings_count ?? 0})
                            </h2>
                            {company.ratings && company.ratings.length > 0 ? (
                                <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2">
                                    {company.ratings.map(rating => (
                                        <DetailedRatingCard key={rating.id} rating={rating} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <FaCommentDots size={40} className="mx-auto text-gray-400 dark:text-gray-500 mb-3" />
                                    <p className="text-gray-600 dark:text-gray-300">هنوز هیچ امتیازی برای این شرکت ثبت نشده است.</p>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* ستون کارمندان */}
                    <aside className="lg:col-span-1 space-y-8">
                        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl sticky top-8">
                            <div className="flex justify-between items-center mb-6 border-b-2 border-blue-500 pb-3">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                    کارمندان ({dataEmployees?.data?.total_employees ?? 0})
                                </h2>
                                <button onClick={() => setIsAddEmployeeModalOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-transform transform hover:scale-110" aria-label="افزودن کارمند">
                                    <FaPlus />
                                </button>
                            </div>
                            {isEmployeesLoading ? <p className="text-center">درحال بارگذاری...</p> : (
                                dataEmployees?.data?.employees && dataEmployees.data.employees.length > 0 ? (
                                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                                        {dataEmployees.data.employees.map(employee => (
                                            <div key={employee.id} className="flex items-center justify-between group">
                                                <EmployeeCard employee={employee} />
                                                <button onClick={() => handleDeleteEmployee(employee.id)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2 rounded-full transition-opacity opacity-0 group-hover:opacity-100" aria-label="حذف کارمند">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <FaUserCircle size={40} className="mx-auto text-gray-400 dark:text-gray-500 mb-3" />
                                        <p className="text-gray-600 dark:text-gray-300">لیست کارمندان خالی است.</p>
                                    </div>
                                )
                            )}
                        </section>
                    </aside>
                </div>
            </main>

            {/* --- مودال ویرایش شرکت --- */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" dir="rtl">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">ویرایش اطلاعات شرکت</h2>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"><FaTimes size={24} /></button>
                        </div>
                        <form onSubmit={handleUpdateCompanySubmit} className="space-y-4">
                            <input name="name" value={companyFormData.name} onChange={(e) => handleCompanyFormChange(e)} placeholder="نام شرکت" className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-500" />
                            <textarea name="description" value={companyFormData.description} onChange={(e) => handleCompanyFormChange(e)} placeholder="توضیحات" className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-500 h-32" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input name="industry" value={companyFormData.industry} onChange={(e) => handleCompanyFormChange(e)} placeholder="صنعت" className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-500" />
                                <input name="website" value={companyFormData.website} onChange={(e) => handleCompanyFormChange(e)} placeholder="وب‌سایت" className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-500" />
                                <input name="phone" value={companyFormData.phone} onChange={(e) => handleCompanyFormChange(e)} placeholder="تلفن" className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-500" />
                                <input name="city" value={companyFormData.city} onChange={(e) => handleCompanyFormChange(e)} placeholder="شهر" className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-500" />
                                <input name="country" value={companyFormData.country} onChange={(e) => handleCompanyFormChange(e)} placeholder="کشور" className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-500" />
                            </div>
                            <button type="submit" disabled={isUpdatingCompany} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:bg-gray-400 transition-colors">
                                {isUpdatingCompany ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* --- مودال افزودن کارمند --- */}
            {isAddEmployeeModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" dir="rtl">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">افزودن کارمند جدید</h2>
                            <button onClick={() => setIsAddEmployeeModalOpen(false)} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"><FaTimes size={24} /></button>
                        </div>
                        <form onSubmit={handleAddEmployeeSubmit} className="space-y-4">
                            <input type="number" name="user_id" value={newEmployeeFormData.user_id} onChange={(e) => handleEmployeeFormChange(e)} placeholder="شناسه کاربر (User ID)" required className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700" />
                            <input name="job_title" value={newEmployeeFormData.job_title} onChange={(e) => handleEmployeeFormChange(e)} placeholder="عنوان شغلی" required className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700" />
                            <input type="date" name="start_date" value={newEmployeeFormData.start_date} onChange={(e) => handleEmployeeFormChange(e)} required className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700" />
                            <select name="employment_type" value={newEmployeeFormData.employment_type} onChange={(e) => handleEmployeeFormChange(e)} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                                <option>تمام وقت</option>
                                <option>پاره وقت</option>
                                <option>قراردادی</option>
                                <option>کارآموزی</option>
                                <option>فریلنسری</option>
                            </select>
                            <select name="role" value={newEmployeeFormData.role} onChange={(e) => handleEmployeeFormChange(e)} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                                <option value="member">عضو (Member)</option>
                                <option value="admin">مدیر (Admin)</option>
                            </select>
                            <button type="submit" disabled={isAddingEmployee} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg disabled:bg-gray-400 transition-colors">
                                {isAddingEmployee ? 'در حال افزودن...' : 'افزودن کارمند'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyDetailPage;