import { useState, useCallback } from 'react';
import type { Company, CreateCompanyData, UpdateCompanyData } from '../types';
import { companyService } from '../services';

export const useCompanies = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getCompanies = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await companyService.getCompanies();
            setCompanies(data);
            return data;
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطا در دریافت لیست شرکت‌ها');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const getCompany = useCallback(async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            const company = await companyService.getCompany(id);
            setSelectedCompany(company);
            return company;
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطا در دریافت اطلاعات شرکت');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const createCompany = useCallback(async (data: CreateCompanyData) => {
        try {
            setLoading(true);
            setError(null);
            const company = await companyService.createCompany(data);
            setCompanies(prev => [...prev, company]);
            return company;
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطا در ایجاد شرکت');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateCompany = useCallback(async (id: number, data: UpdateCompanyData) => {
        try {
            setLoading(true);
            setError(null);
            const company = await companyService.updateCompany(id, data);
            setCompanies(prev => prev.map(c => c.id === id ? company : c));
            setSelectedCompany(company);
            return company;
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطا در بروزرسانی اطلاعات شرکت');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteCompany = useCallback(async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            await companyService.deleteCompany(id);
            setCompanies(prev => prev.filter(c => c.id !== id));
            if (selectedCompany?.id === id) {
                setSelectedCompany(null);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'خطا در حذف شرکت');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [selectedCompany]);

    return {
        companies,
        selectedCompany,
        loading,
        error,
        getCompanies,
        getCompany,
        createCompany,
        updateCompany,
        deleteCompany,
    };
}; 