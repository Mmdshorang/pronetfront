export interface Location {
  id: number;
  name: string;
}

export type UserRole = 'admin' | 'user';

export interface UserType {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  location_id: number | null;
  location?: Location;
  created_at?: string;
  updated_at?: string;
}


export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  location_id?: number | null;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  location_id?: number | null;
}

export interface UserLoginType {
  user:UserType;
  access_token:string;
  token_type:string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
