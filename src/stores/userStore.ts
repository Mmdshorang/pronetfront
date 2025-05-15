import { create } from 'zustand';
import { userService } from '../services/user';
import type { User } from '../types/user';

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
    fetchUser: (id: number) => Promise<void>;
    setUser: (user: User | null) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    loading: false,
    error: null,

    fetchUser: async (id: number) => {
        try {
            set({ loading: true, error: null });
            const response = await userService.getUser(id);
            if (response.status === 'success' && response.data) {
                set({ user: response.data, loading: false });
            } else {
                set({ error: response.message || 'Failed to fetch user', loading: false });
            }
        } catch (error) {
            set({ error: 'Failed to fetch user', loading: false });
        }
    },

    setUser: (user: User | null) => set({ user }),

    clearUser: () => set({ user: null, error: null }),
})); 