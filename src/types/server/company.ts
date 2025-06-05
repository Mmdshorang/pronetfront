// types/company.ts

import { RatingSubmission } from "../model/type";
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
