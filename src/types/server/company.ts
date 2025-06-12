// types/company.ts

import { RatingSubmission } from "../model/type";
import { Company, User } from "./user";


export interface CompanyAdd {
    id?: number;
    name: string;
    city:string;
    country:string;
    logo?: File | null;
    description?: string;
    industry?: string;
    website?: string;
    phone?: string;
    created_at?: string; // ISO datetime string
    updated_at?: string; // ISO datetime string
  }
  
//  * پاسخ برای ایجاد یا ویرایش موفق یک شرکت (متدهای store و update)

export interface CompanyMutationResponse {
  status: 'success';
  message: string;
  company: Company;
}

  
export interface AddUserResponse {
  status: 'success';
  message: string;
  user: User; // کاربری که به تازگی اضافه شده است
}
//get company home page
// types.ts
export interface getCompany {
  id: number;
  name: string;
  industry: string;
  city: string;
  logo: string;
  ratings:RatingSubmission[];
  overallAverageRating: number;
}


export interface getCompaniesData {
  companies: getCompany[];
  total: number;
  current_page: number;
  per_page: number;
}

export interface getCompaniesResponse {
  status: "success" | "error";
  message: string;
  data: getCompaniesData;
}





//company datalis
export interface CriterionScore {
  criterion: string; // عنوان معیار
  score: number;      // امتیاز داده‌شده به آن معیار
}

export interface CompanyRating {
  id: string;
  rater: string;
  comment: string | null;
  timestamp: string; // ISO datetime string
  criteria: CriterionScore[];
  averageScore: number;
}

export interface CompanyDetail {
  id: string;
  name: string;
  description: string | null;
  industry: string | null;
  logo: string | null;
  city: string | null;
  country: string | null;
  website: string | null;
  phone: string | null;
  ratings: CompanyRating[];
}

export interface CompanyShowResponse {
  status: 'success' | 'error';
  message: string;
  data?: {
    company: CompanyDetail;
    average_rating: number | null;
    ratings_count: number;
  };
  error?: string;
}




//employee for company

export interface CompanyEmployee {
  id: number;
  name: string;
  email: string;
  profile_photo: string | null;
}

export interface CompanyEmployeesResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    employees: CompanyEmployee[];
    total_employees: number;
  };
  error?: string; // فقط در حالت error وجود دارد
}



//add user to company
export interface AddUserToCompanyResponse {
  message: string;
  user: CompanyUser;
}

export interface CompanyUser {
  id: number;
  name: string;
  email: string;
  profile_photo: string;
  pivot: CompanyUserPivot;
}

export interface CompanyUserPivot {
  company_id: number;
  user_id: number;
  job_title: string;
  start_date: string; // e.g. "2024-10-01"
  end_date: string | null;
  description: string | null;
  employment_type: 'تمام وقت' | 'پاره وقت' | 'قراردادی' | 'کارآموزی' | 'فریلنسری';
  role: 'admin' | 'member';
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}



//update company
export interface CompanyUpdateInput {
  name?: string;
  city?: string;
  country?: string;
  logo?: string; 
  description?: string;
  industry?: string;
  website?: string;
  phone?: string;
}
export interface CompanyUpdateResponse {
  status: 'success' | 'error';
  message: string;
  company?: {
    id: number;
    name: string;
    logo: string | null;
    description: string | null;
    industry: string | null;
    website: string | null;
    phone: string | null;
    location_id: number;
    location: {
      id: number;
      city: string;
      country: string;
      created_at: string;
      updated_at: string;
    };
    created_at: string;
    updated_at: string;
  };
  error?: string; // فقط در صورت بروز خطا
}
export interface CompanyAddUserInput {
  user_id: number;
  job_title: string;
  start_date: string; // تاریخ به فرمت ISO یا "YYYY-MM-DD"
  end_date?: string | null;
  description?: string | null;
  employment_type: 'تمام وقت' | 'پاره وقت' | 'قراردادی' | 'کارآموزی' | 'فریلنسری';
  role: 'admin' | 'member';
}

export interface CompanyAddUserResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string; // نقش کلی کاربر در سیستم
    bio: string | null;
    phone: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    location_id: number | null;
    profile_photo: string | null;
    location?: {
      id: number;
      name: string;
      // اگر بخواهی روابط location را هم لود کنی، می‌تونم گسترش بدم
    };
    pivot: {
      company_id: number;
      user_id: number;
      job_title: string;
      start_date: string; // ISO date format
      end_date: string | null;
      description: string | null;
      employment_type: 'تمام وقت' | 'پاره وقت' | 'قراردادی' | 'کارآموزی' | 'فریلنسری';
      role: 'admin' | 'member';
      created_at: string;
      updated_at: string;
    };
    created_at: string;
    updated_at: string;
  };
}


//remove user in company 

export interface CompanyRemoveUserSuccessResponse {
  message: string; // "کاربر با موفقیت از شرکت حذف شد."
}
