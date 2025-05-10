import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import CompanyProfileCard from '../components/CompanyProfileCard';
import CompanyStats from '../components/CompanyStats';

interface Company {
  id: string;
  name: string;
  description: string;
  industry: string;
  location: string;
  website: string;
  logoUrl?: string;
  totalEmployees: number;
  averageRating: number;
  activeProjects: number;
}

const Companies: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [companies] = useState<Company[]>([
    {
      id: '1',
      name: 'شرکت نمونه',
      description: 'شرکت نمونه با بیش از ۱۰ سال سابقه در زمینه نرم‌افزار',
      industry: 'نرم‌افزار',
      location: 'تهران',
      website: 'https://example.com',
      totalEmployees: 50,
      averageRating: 4.5,
      activeProjects: 10,
    },
    // Add more sample companies here
  ]);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">شرکت‌ها</h1>
        <button className="btn btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          افزودن شرکت
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="جستجو..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input pl-10"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>

      <CompanyStats
        totalEmployees={companies.reduce((sum, company) => sum + company.totalEmployees, 0)}
        averageRating={companies.reduce((sum, company) => sum + company.averageRating, 0) / companies.length}
        activeProjects={companies.reduce((sum, company) => sum + company.activeProjects, 0)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map(company => (
          <CompanyProfileCard
            key={company.id}
            name={company.name}
            description={company.description}
            industry={company.industry}
            location={company.location}
            website={company.website}
            logoUrl={company.logoUrl}
            onEdit={() => console.log('Edit company:', company.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Companies; 