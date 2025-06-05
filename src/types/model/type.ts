export interface RatingCriterionValue {
  criterionId: string; // شناسه معیار مانند 'professionalism'
  score: number;       // امتیاز داده شده (مثلا 1 تا 5)
}

export interface RatingSubmission {
  id: string; // شناسه یکتا برای این امتیازدهی
  raterName: string; // نام امتیاز دهنده
  criteriaValues: RatingCriterionValue[];
  comment?: string;
  timestamp: Date;
  averageScore?: number;
}


export interface CreateRatingRequest {
  rateable_type: 'user' | 'company'; // نوع چیزی که امتیاز می‌گیره
  rateable_id: number;               // آیدی اون کاربر یا شرکت
  criteriaValues: RatingCriterionValue[]; // امتیازهای معیارها
  comment?: string;                  // توضیح اختیاری
}

export interface Profile {
  id: string;
  name: string;
  type: 'company' | 'employee';
  avatarUrl?: string;
  description?: string;
  ratings: RatingSubmission[];
  overallAverageRating?: number;
}
export interface GetUsersData {
  users: Profile[];
  total: number;
  current_page: number;
  per_page: number;
}
export interface UserListResponse {
  status: 'success' | 'error';
  message: string;
  data?: GetUsersData
  error?: string;
}


export interface RatingCriterionDefinition {
  id: string;
  name: string; // نام فارسی معیار
  description?: string; // توضیح کوتاه در مورد معیار
}

export const RATING_CRITERIA_DEFINITIONS: RatingCriterionDefinition[] = [
  { id: 'professionalism', name: 'قابلیت‌های حرفه‌ای', description: 'مهارت و تخصص در انجام وظایف' },
  { id: 'teamwork', name: 'کار تیمی', description: 'توانایی همکاری موثر با دیگران' },
  { id: 'ethics', name: 'اخلاق و روابط اجتماعی', description: 'پایبندی به اصول اخلاقی و ارتباط مناسب' },
  { id: 'communication', name: 'مهارت‌های ارتباطی', description: 'توانایی انتقال و دریافت اطلاعات به طور موثر' },
  { id: 'innovation', name: 'نوآوری و خلاقیت', description: 'ارائه ایده‌های جدید و حل خلاقانه مسائل' },
];

// --- انواع داده جدید برای پروفایل کاربری دقیق ---
export interface Location {
  id?: number; // ممکن است در زمان ایجاد وجود نداشته باشد
  city: string;
  country: string;
  created_at?: string;
  updated_at?: string;
}

export interface Skill {
  id: number; // شناسه مهارت در دیتابیس
  // user_id: number; // این فیلد در User.skills وجود دارد، شاید اینجا لازم نباشد اگر همیشه در کانتکست کاربر است
  name: string;
  // created_at: string; // این فیلدها ممکن است برای نمایش در فرانت‌اند لازم نباشند
  // updated_at: string;
}

export interface Achievement {
  id: number; // شناسه دستاورد در دیتابیس
  // user_id: number;
  title: string;
  description: string;
  date: string; // فرمت تاریخ باید مشخص شود (e.g., "YYYY-MM-DD")
  issuer: string; // صادر کننده گواهی یا دستاورد
  // created_at: string;
  // updated_at: string;
}

export interface CompanyPivotJob { // اطلاعات مربوط به شغل در یک شرکت خاص
  job_title: string;
  start_date: string; // فرمت "YYYY-MM-DD"
  end_date: string | null; // null اگر شغل فعلی باشد
  description: string | null;
  employment_type: string; // e.g., "Full-time", "Part-time"
}

export interface CompanyWorkExperience { // برای نمایش سابقه کاری
  id: number; // شناسه شرکت در دیتابیس
  name: string;
  description: string | null;
  website: string | null;
  location_id: number | null; // اگر شرکت لوکیشن مجزا دارد
  // created_at: string;
  // updated_at: string;
  pivot: CompanyPivotJob; // اطلاعات شغل در این شرکت
  location?: Location; // اطلاعات مکان شرکت (اختیاری، اگر بخواهید همراه با شرکت لود شود)
}

export interface UserRating { // امتیازی که کاربر دریافت کرده
  id: number;
  // user_id: number; // کاربری که امتیاز را دریافت کرده
  reviewer_id: number; // کاربری که امتیاز داده
  reviewer_name?: string; // نام امتیاز دهنده (برای نمایش)
  reviewer_avatarUrl?: string; // آواتار امتیاز دهنده
  overall_rating: number; // امتیاز کلی (مثلا 1 تا 5)
  comment: string;
  created_at: string; // تاریخ ثبت امتیاز
  // updated_at: string;
  // criteria_ratings?: RatingCriterionValue[]; // اگر امتیازات جزئی هم ذخیره می‌شوند
}

// این User برای صفحه پروفایل شخصی کاربر استفاده می‌شود
export interface UserProfileData {
  id: number;
  name: string;
  email: string;
  role: string; // e.g., "Software Engineer", "Project Manager"
  bio: string | null;
  phone: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  profile_photo_url: string | null; // تغییر نام برای وضوح بیشتر
  email_verified_at?: string | null;
  location: Location | null;
  // created_at?: string;
  // updated_at?: string;
  skills: Skill[];
  achievements: Achievement[];
  received_ratings: UserRating[]; // امتیازاتی که این کاربر دریافت کرده
  work_experience: CompanyWorkExperience[]; // تغییر نام از companies برای وضوح
}
