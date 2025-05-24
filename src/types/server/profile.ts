import { Achievement, Skill } from "./user";




  
  export interface UserProfile {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role: string;
    location_id: number | null;
    bio: string;
    phone: string;
    linkedin_url: string;
    github_url: string | null;
    created_at: string;
    updated_at: string;
    skills: Skill[];
    achievements: Achievement[];
    location: string | null;
  }
  
  export interface ProfileResponse {
    status: string;
    message: string;
    data: UserProfile;
  }
  


  