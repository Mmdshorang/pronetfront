import React from 'react';
import { Users, Star, Briefcase } from 'lucide-react';

interface CompanyStatsProps {
  totalEmployees: number;
  averageRating: number;
  activeProjects: number;
}

const CompanyStats: React.FC<CompanyStatsProps> = ({
  totalEmployees,
  averageRating,
  activeProjects,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">تعداد کارمندان</h3>
            <p className="text-2xl font-bold text-gray-900">{totalEmployees}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-yellow-100 rounded-full">
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">میانگین امتیاز</h3>
            <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full">
            <Briefcase className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">پروژه‌های فعال</h3>
            <p className="text-2xl font-bold text-gray-900">{activeProjects}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyStats; 