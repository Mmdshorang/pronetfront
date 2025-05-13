import { useState, useCallback } from 'react';
import type { Skill, CreateSkillData } from '../types';
import { skillService } from '../services';

export const useSkills = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createSkill = useCallback(async (data: CreateSkillData) => {
        try {
            setLoading(true);
            setError(null);
            const skill = await skillService.createSkill(data);
            setSkills(prev => [...prev, skill]);
            return skill;
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطا در ایجاد مهارت');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteSkill = useCallback(async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            await skillService.deleteSkill(id);
            setSkills(prev => prev.filter(s => s.id !== id));
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطا در حذف مهارت');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        skills,
        loading,
        error,
        createSkill,
        deleteSkill,
    };
}; 