import React from 'react';
import { Building2, Users, Star } from 'lucide-react';

interface CompanyProfileCardProps {
  name: string;
  industry: string;
  location: string;
  employeeCount: number;
  rating: number;
  onViewDetails: () => void;
}

const CompanyProfileCard: React.FC<CompanyProfileCardProps> = ({
  name,
  industry,
  location,
  employeeCount,
  rating,
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <div className="mr-4">
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{industry}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="mr-1 text-sm font-medium text-gray-900">{rating}</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <Building2 className="w-4 h-4 ml-2" />
          <span>{location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Users className="w-4 h-4 ml-2" />
          <span>{employeeCount} کارمند</span>
        </div>
      </div>

      <button
        onClick={onViewDetails}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        مشاهده جزئیات
      </button>
    </div>
  );
};

export default CompanyProfileCard;
