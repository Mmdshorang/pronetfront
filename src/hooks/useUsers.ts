import { useState, useCallback } from 'react';
import type { User, UpdateUserData, ChangePasswordData } from '../types';
import { userService } from '../services';

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await userService.getUsers();
            setUsers(data);
            return data;
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطا در دریافت لیست کاربران');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const getUser = useCallback(async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            const user = await userService.getUser(id);
            setSelectedUser(user);
            return user;
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطا در دریافت اطلاعات کاربر');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const searchUsers = useCallback(async (query: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await userService.searchUsers(query);
            setUsers(data);
            return data;
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطا در جستجوی کاربران');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateUser = useCallback(async (data: UpdateUserData) => {
        try {
            setLoading(true);
            setError(null);
            const user = await userService.updateUser(data);
            setSelectedUser(user);
            return user;
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطا در بروزرسانی اطلاعات کاربر');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const changePassword = useCallback(async (data: ChangePasswordData) => {
        try {
            setLoading(true);
            setError(null);
            await userService.changePassword(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطا در تغییر رمز عبور');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        users,
        selectedUser,
        loading,
        error,
        getUsers,
        getUser,
        searchUsers,
        updateUser,
        changePassword,
    };
}; 