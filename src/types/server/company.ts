// types/company.ts

//add company input


//end
export interface CompanyAdd {
    id?: number;
    name: string;
    email: string;
    password: string; // هش‌شده است، اما به هر حال در پاسخ آمده
    city:string;
    country:string;
    logo?: string;
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
