import api from './api';
import type { Skill, CreateSkillData } from '../types';

class SkillService {
    async createSkill(data: CreateSkillData): Promise<Skill> {
        const response = await api.post('/skills', data);
        return response.data;
    }

    async deleteSkill(id: number): Promise<void> {
        await api.delete(`/skills/${id}`);
    }
}

export const skillService = new SkillService(); 