import api from './api';
import type { Company, CreateCompanyData, UpdateCompanyData } from '../types';

class CompanyService {
    async getCompanies(): Promise<Company[]> {
        const response = await api.get('/companies');
        return response.data;
    }

    async getCompany(id: number): Promise<Company> {
        const response = await api.get(`/companies/${id}`);
        return response.data;
    }

    async createCompany(data: CreateCompanyData): Promise<Company> {
        const response = await api.post('/companies', data);
        return response.data;
    }

    async updateCompany(id: number, data: UpdateCompanyData): Promise<Company> {
        const response = await api.put(`/companies/${id}`, data);
        return response.data;
    }

    async deleteCompany(id: number): Promise<void> {
        await api.delete(`/companies/${id}`);
    }
}

export const companyService = new CompanyService(); 