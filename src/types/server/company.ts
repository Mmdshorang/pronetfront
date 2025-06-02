// types/company.ts

import { Achievement, Location, Skill } from "./user";

//add company input


//end
export interface CompanyAdd {
    id?: number;
    name: string;
    email: string;
    password: string; // هش‌شده است، اما به هر حال در پاسخ آمده
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
  

export interface CompanyAddResponse {
    status: "success" | "error";
    message: string;
    data: CompanyAdd;
  }
  

//get company home page
// types.ts
export interface getCompany {
  id: number;
  name: string;
  industry: string;
  city: string;
  logo: string;
  ratings_count:number;
  avg_rating: number;
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
export interface ReviewerType {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  profile_photo: string | null;
  role: string;
  location_id: number;
  bio: string | null;
  phone: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface RatingCriteriaPivot {
  company_rating_id: number;
  rating_criteria_id: number;
  score: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface RatingCriteria {
  id: number;
  name: string;
  description: string;
  category: string;
  created_at: string;
  updated_at: string;
  pivot: RatingCriteriaPivot;
}

export interface CompanyRating {
  id: number;
  company_id: number;
  reviewer_id: number;
  overall_rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  reviewer: ReviewerType;
  criteria: RatingCriteria[];
}

export interface CompanyDetails {
  id: number;
  name: string;
  email: string;
  location_id: number;
  logo: string;
  description: string;
  industry: string;
  website: string;
  phone: string;
  created_at: string;
  updated_at: string;
  location: Location;
  ratings: CompanyRating[];
}

export interface getCompanyByIdResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    company: CompanyDetails;
    ratings_count: number;
    average_rating:number
  };
}





//employee for company

export interface EmployeeType {
  id: number;
  name: string;
  email: string;
  profile_photo: string | null;
  skills: Skill[]; // یا می‌توان از نوع دیگری استفاده کرد اگر مهارت‌ها شیء باشند
  achievements: Achievement[]; // مشابه بالا
  location: Location | null; // یا می‌تواند نوع دیگری باشد اگر لوکیشن شیء باشد
}

export interface CompanyEmployeesResponse {
  status: string;
  message: string;
  data: {
    employees: EmployeeType[];
    total_employees: number;
  };
}
