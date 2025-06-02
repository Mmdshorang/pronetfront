import { User } from "./user";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  city?: string | null;
  country?: string | null;
  password_confirmation: string;
}


export interface LoginData {
  email: string;
  password: string;
}



export interface AuthResponse {
  status: 'success' | 'error';
  message: string;
  data: {
      user: User;
      token: string;
  };
}
