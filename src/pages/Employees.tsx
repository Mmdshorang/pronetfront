import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import EmployeeList from '../components/EmployeeList';
import AddEmployeeDialog from '../components/AddEmployeeDialog';

interface Employee {
  id: string;
  name: string;
  position: string;
  email: string;
  avatarUrl?: string;
}

const Employees: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [employees] = useState<Employee[]>([
    {
      id: '1',
      name: 'علی محمدی',
      position: 'توسعه‌دهنده فرانت‌اند',
      email: 'ali@example.com',
    },
    {
      id: '2',
      name: 'مریم احمدی',
      position: 'توسعه‌دهنده بک‌اند',
      email: 'maryam@example.com',
    },
  ]);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEmployee = (employeeData: { name: string; email: string; position: string }) => {
    console.log('Add employee:', employeeData);
    // TODO: Implement add employee logic
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">کارمندان</h1>
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="w-5 h-5" />
          افزودن کارمند
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

      <EmployeeList employees={filteredEmployees} />

      <AddEmployeeDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddEmployee}
      />
    </div>
  );
};

export default Employees; 