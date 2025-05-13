import api from './api';
import type { User, UpdateUserData, ChangePasswordData } from '../types';

class UserService {
    async getUsers(): Promise<User[]> {
        const response = await api.get('/users');
        return response.data;
    }

    async getUser(id: number): Promise<User> {
        const response = await api.get(`/users/${id}`);
        return response.data;
    }

    async searchUsers(query: string): Promise<User[]> {
        const response = await api.get(`/users/search?q=${query}`);
        return response.data;
    }

    async updateUser(data: UpdateUserData): Promise<User> {
        const response = await api.put('/users', data);
        return response.data;
    }

    async changePassword(data: ChangePasswordData): Promise<void> {
        await api.put('/users/password', data);
    }
}

export const userService = new UserService(); 