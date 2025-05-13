import api from './api';
import type { LoginData, RegisterData, User, AuthResponse } from '../types';

class AuthService {
    async login(data: LoginData): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/login', data);
        const { token } = response.data.data;
        localStorage.setItem('token', token);
        return response.data;
    }

    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/register', data);
        console.log(response.data);
        const { token } = response.data.data;
        localStorage.setItem('token', token);
        return response.data;
    }

    async logout(): Promise<void> {
        await api.post('/auth/logout');
        localStorage.removeItem('token');
    }

    async getCurrentUser(): Promise<User> {
        const response = await api.get<{ data: User }>('/auth/user');
        return response.data.data;
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
}

export const authService = new AuthService(); 