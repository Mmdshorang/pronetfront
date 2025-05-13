import api from './api';
import type { Achievement, CreateAchievementData } from '../types';

class AchievementService {
    async createAchievement(data: CreateAchievementData): Promise<Achievement> {
        const response = await api.post('/achievements', data);
        return response.data;
    }

    async deleteAchievement(id: number): Promise<void> {
        await api.delete(`/achievements/${id}`);
    }
}

export const achievementService = new AchievementService(); 