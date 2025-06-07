import { Achievement } from "../server/user";

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

export interface WorkExperience {
  id: number;
  name: string;
  website: string;
  description: string;
  pivot: {
    job_title: string;
    start_date: string;
    end_date: string | null;
    description: string;
    employment_type: string;
  };
}

interface Rating {
  id: number;
  reviewer_id: number;
  reviewer_name: string;
  reviewer_avatarUrl: string;
  overall_rating: number;
  comment: string;
  created_at: string;
}
interface Location {
  city: string;
  country: string;
}

interface Skill {
  id: number;
  name: string;
}
export interface UserProfileData {
  id: number;
  name: string;
  email: string;
  role: string;
  bio: string | null;
  phone: string | null;
  linkedin_url: string | null;
  github_url: string;
  profile_photo_url: string | null;
  email_verified_at: string;
  location: Location;
  skills: Skill[];
  achievements: Achievement[];
  work_experience: WorkExperience[];
  received_ratings: Rating[];
}
export interface UserProfileDataResponse {
    status: string;
    message: string;
    data: UserProfileData;
}