export interface Location {
    id: number;
    city: string;
    country: string;
    created_at: string;
    updated_at: string;
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
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    skills: Skill[];
    achievements: Achievement[];
    receivedRatings: UserRating[];
    companies: Company[];
    location: Location | null;
}

export interface UserResponse {
    status: 'success' | 'error';
    message: string;
    data?: User;
    error?: string;
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
export interface UpdatedUserResponse {
    status: string;
    message: string;
    data: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string;
        role: string;
        location_id: number;
        bio: string | null;
        phone: string;
        linkedin_url: string;
        github_url: string | null;
        created_at: string;
        updated_at: string;
        skills: Skill[];
        achievements: Achievement[];
        location: Location;
    };
}
