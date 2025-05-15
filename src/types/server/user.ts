export interface Location {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Skill {
    id: number;
    user_id: number;
    name: string;
    category: string;
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
    pivot: {
        job_title: string;
        start_date: string;
        end_date: string | null;
        description: string | null;
        employment_type: string;
    };
}

export interface UserRating {
    id: number;
    user_id: number;
    reviewer_id: number;
    rating: number;
    comment: string | null;
    created_at: string;
    updated_at: string;
    reviewer: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    location_id: number | null;
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