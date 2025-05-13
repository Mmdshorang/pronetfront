import { useState, useCallback } from 'react';
import type { Achievement, CreateAchievementData } from '../types';
import { achievementService } from '../services';

export const useAchievements = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createAchievement = useCallback(async (data: CreateAchievementData) => {
        try {
            setLoading(true);
            setError(null);
            const achievement = await achievementService.createAchievement(data);
            setAchievements(prev => [...prev, achievement]);
            return achievement;
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطا در ایجاد دستاورد');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteAchievement = useCallback(async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            await achievementService.deleteAchievement(id);
            setAchievements(prev => prev.filter(a => a.id !== id));
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطا در حذف دستاورد');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        achievements,
        loading,
        error,
        createAchievement,
        deleteAchievement,
    };
}; 