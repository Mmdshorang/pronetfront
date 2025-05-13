// User Types
export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    location: string | null;
    created_at: string;
    updated_at: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    role?: string;
    location: string | null;
    password_confirmation: string;
}

export interface UpdateUserData {
    name?: string;
    email?: string;
}

export interface AuthResponse {
    status: 'success';
    message: string;
    data: {
        user: User;
        token: string;
    };
}

export interface ChangePasswordData {
    current_password: string;
    password: string;
    password_confirmation: string;
}

// Company Types
export interface Company {
    id: number;
    name: string;
    description: string;
    website: string;
    created_at: string;
    updated_at: string;
}

export interface CreateCompanyData {
    name: string;
    description: string;
    website: string;
}

export interface UpdateCompanyData {
    name?: string;
    description?: string;
    website?: string;
}

// Skill Types
export interface Skill {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface CreateSkillData {
    name: string;
}

// Achievement Types
export interface Achievement {
    id: number;
    title: string;
    description: string;
    date: string;
    created_at: string;
    updated_at: string;
}

export interface CreateAchievementData {
    title: string;
    description: string;
    date: string;
}

// Rating Types
export interface RatingCriteria {
    id: number;
    name: string;
    description: string;
    category: string;
    created_at: string;
    updated_at: string;
}

export interface CreateUserRatingData {
    user_id: number;
    reviewer_id: number;
    overall_rating: number;
    comment: string;
    criteria: {
        criteria_id: number;
        score: number;
        comment: string;
    }[];
}

export interface CreateCompanyRatingData {
    company_id: number;
    reviewer_id: number;
    overall_rating: number;
    comment: string;
    criteria: {
        criteria_id: number;
        score: number;
        comment: string;
    }[];
}

// Location Types
export interface Location {
    id: number;
    name: string;
    city: string;
    state: string;
    country: string;
    created_at: string;
    updated_at: string;
}

export interface CreateLocationData {
    name: string;
    city: string;
    state: string;
    country: string;
} 