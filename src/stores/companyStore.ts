// stores/companyStore.ts
import { create } from 'zustand';
import { getCompaniesData } from '@/types/server/company';

interface CompanyStore extends getCompaniesData {
  setCompanies: (data: getCompaniesData) => void;
  resetCompanies: () => void;
}

const useCompanyStore = create<CompanyStore>((set) => ({
  companies: [],
  total: 0,
  current_page: 1,
  per_page: 10,

  setCompanies: (data) => set({ ...data }),
  resetCompanies: () =>
    set({
      companies: [],
      total: 0,
      current_page: 1,
      per_page: 10,
    }),
}));

export default useCompanyStore;
