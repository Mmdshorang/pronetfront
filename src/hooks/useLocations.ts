import { useState, useCallback } from 'react';
import type { Location, CreateLocationData } from '../types';
import { locationService } from '../services';

export const useLocations = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getLocations = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await locationService.getLocations();
            setLocations(data);
            return data;
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطا در دریافت لیست لوکیشن‌ها');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const createLocation = useCallback(async (data: CreateLocationData) => {
        try {
            setLoading(true);
            setError(null);
            const location = await locationService.createLocation(data);
            setLocations(prev => [...prev, location]);
            return location;
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطا در ایجاد لوکیشن');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        locations,
        loading,
        error,
        getLocations,
        createLocation,
    };
}; 