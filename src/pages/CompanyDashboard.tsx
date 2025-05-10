import React, { useState } from 'react';
import EmployeeList from '../components/EmployeeList';
import CompanyStats from '../components/CompanyStats';
import AddEmployeeDialog from '../components/AddEmployeeDialog';
import CompanyProfileCard from '../components/CompanyProfileCard';
import { ArrowDownToDotIcon } from 'lucide-react';

const CompanyDashboard: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddEmployee = (employeeData: {
    name: string;
    email: string;
    position: string;
  }) => {
    // TODO: Implement adding employee
    console.log('Adding employee:', employeeData);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6">
        {/* کارت پروفایل شرکت */}
        <div>
          <CompanyProfileCard
            name="شرکت نمونه"
            industry="فناوری اطلاعات"
            location="تهران"
            employeeCount={50}
            rating={4.5}
            onViewDetails={() => console.log('View details clicked')}
          />
        </div>

        {/* آمار شرکت */}
        <div>
          <CompanyStats
            totalEmployees={50}
            averageRating={4.5}
            activeProjects={10}
          />
        </div>

        {/* لیست کارمندان */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">کارمندان</h2>
            <button
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setOpenDialog(true)}
            >
              <ArrowDownToDotIcon className="mr-2" />
              افزودن کارمند
            </button>
          </div>
          <EmployeeList
            employees={[
              {
                id: '1',
                name: 'علی محمدی',
                position: 'توسعه‌دهنده فرانت‌اند',
                email: 'ali@example.com',
              },
              {
                id: '2',
                name: 'مریم احمدی',
                position: 'طراح رابط کاربری',
                email: 'maryam@example.com',
              },
            ]}
          />
        </div>
      </div>

      {/* دیالوگ افزودن کارمند */}
      <AddEmployeeDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAdd={handleAddEmployee}
      />
    </div>

  );
};

export default CompanyDashboard;
