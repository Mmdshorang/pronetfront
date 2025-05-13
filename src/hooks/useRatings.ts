import { useState, useCallback } from 'react';
import type { CreateUserRatingData, CreateCompanyRatingData } from '../types';
import { ratingService } from '../services';

export const useRatings = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createUserRating = useCallback(async (data: CreateUserRatingData) => {
        try {
            setLoading(true);
            setError(null);
            return await ratingService.createUserRating(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطا در ثبت امتیاز کاربر');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const createCompanyRating = useCallback(async (data: CreateCompanyRatingData) => {
        try {
            setLoading(true);
            setError(null);
            return await ratingService.createCompanyRating(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطا در ثبت امتیاز شرکت');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        createUserRating,
        createCompanyRating,
    };
}; 