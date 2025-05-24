export interface RatingCriteriaInput {
    id: number;
    score: number;
    comment?: string; 
}
  
export interface CompanyRatingInput {
    company_id: number;
    overall_rating: number;
    comment: string;
    criteria: RatingCriteriaInput[];
  }
  

  //res company
  // Pivot اطلاعات امتیاز هر معیار برای شرکت
export interface CompanyRatingPivot {
    company_rating_id: number;
    rating_criteria_id: number;
    score: number;
    comment: string | null;
    created_at: string;
    updated_at: string;
  }
  
  // معیار ارزیابی
export  interface RatingCriteria {
    id: number;
    name: string;
    description: string;
    category: string;
    created_at: string;
    updated_at: string;
    pivot: CompanyRatingPivot;
  }
  
  // کل امتیاز شرکت
 export interface CompanyRatingRes {
    id: number;
    company_id: number;
    reviewer_id: number;
    overall_rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
    criteria: RatingCriteria[];
  }
  
























  
//res user rating
  // Pivot اطلاعات امتیاز هر معیار
export interface RatingPivotUser {
    user_rating_id: number;
    rating_criteria_id: number;
    score: number;
    comment: string | null;
    created_at: string;
    updated_at: string;
  }
  
  // معیار ارزیابی
export  interface RatingCriteriaUser {
    id: number;
    name: string;
    description: string;
    category: string;
    created_at: string;
    updated_at: string;
    pivot: RatingPivotUser;
  }
  
  // کل امتیاز کاربر
 export interface UserRating {
    id: number;
    user_id: number;
    reviewer_id: number;
    overall_rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
    criteria: RatingCriteriaUser[];
  }
  