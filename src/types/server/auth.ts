import { User } from "./user";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
  location: string | null;
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
