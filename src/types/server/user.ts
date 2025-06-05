export interface Location {
    id?: number;
    city: string;
    country: string;
    created_at?: string;
    updated_at?: string;
}

export interface Skill {
    id: number;
    user_id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Achievement {
    id: number;
    user_id: number;
    title: string;
    description: string;
    date: string;
    issuer: string;
    created_at: string;
    updated_at: string;
}

export interface Company {
    id: number;
    name: string;
    description: string | null;
    website: string | null;
    location_id: number | null;
    created_at: string;
    updated_at: string;
    pivot: CompanyPivotJob;
}
export interface CompanyPivotJob {
    job_title: string;
        start_date: string;
        end_date: string | null;
        description: string | null;
        employment_type: string;
}

export interface UserRating {
    id: number;
    user_id: number;
    reviewer_id: number;
    overall_rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
  }
export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    bio:string;
    phone: string;
    linkedin_url: string;
    github_url: string | null;
    profile_photo: string | null;
    email_verified_at?: string | null;
    location: Location | null;
    created_at?: string;
    updated_at?: string;
    skills: Skill[];
    achievements: Achievement[];
    received_ratings: UserRating[];
    companies: Company[];
}

export interface UserResponse {
    status: 'success' | 'error';
    message: string;
    data?: User;
    error?: string;
} 
  export interface UserBase {
    id: number;
    name: string;
    email: string;
    role: string;
    bio:string;
    phone: string;
    linkedin_url: string;
    github_url: string | null;
    profile_photo: string | null;
    email_verified_at?: string | null;
    location: Location | null;
    created_at?: string;
    updated_at?: string;
}





//update user
export interface UpdateUserRequest {
    name?: string;
    email?: string;
    password?: string;
    profile_photo?: string;
    bio?: string;
    phone?: string;
    linkedin_url?: string;
    city?: string;
    country?: string;
    github_url?: string;
}


  

//response update user

export interface UserUpdate {
    name?: string; // 'sometimes|required|string|max:255' -> Optional string
    email?: string; // 'sometimes|required|email|unique:users,email'
    profile_photo?: File | null;
    // 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
    password?: string; // 'nullable|string|min:6'
    bio?: string; // 'nullable|string'
    phone?: string; // 'nullable|string|max:20'
    linkedin_url?: string; // 'nullable|url|max:255'
    city?: string; // 'sometimes|required|string|max:255' -> Optional string
    country?: string; // 'sometimes|required|string|max:255' -> Optional string
    github_url?: string; // 'nullable|url|max:255'
  }
  
export interface UpdatedUserResponse {
    status: string;
    message: string;
    data: User;
}


//search
export interface SearchResult {
    id: number;
    name: string;
    email: string;
    photo: string | null;
    type: 'user' | 'company';
  }
  
export  interface SearchResponse {
    status: string;
    message: string;
    data: SearchResult[];
    hasMore: boolean;
    currentPage: number;
  }
  