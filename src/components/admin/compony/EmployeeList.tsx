// components/admin/company/manage/EmployeeList.tsx
'use client';

import { useState } from 'react';
import { User } from '@/types/server';
import { Button } from '@/components/ui/button';
import AddEmployeeDialog from './AddEmployeeDialog'; // دیالوگ جدید برای افزودن کارمند

interface Props {
  companyId: number;
  initialUsers: User[];
  canUpdate: boolean;
}

export default function EmployeeList({ companyId, initialUsers, canUpdate }: Props) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);

  // منطق حذف کاربر را اینجا پیاده‌سازی کنید...
  const handleRemoveUser = (userId: number) => {
    // ...
  };
  
  const handleAddSuccess = (newUser: User) => {
      setUsers(prev => [...prev, newUser]);
      setIsAddEmployeeOpen(false);
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">کارکنان</h2>
        {canUpdate && (
          <Button onClick={() => setIsAddEmployeeOpen(true)}>افزودن کارمند</Button>
        )}
      </div>
      {/* لیست کاربران اینجا نمایش داده می‌شود */}

      {canUpdate && (
          <AddEmployeeDialog 
            open={isAddEmployeeOpen}
            onClose={() => setIsAddEmployeeOpen(false)}
            companyId={companyId}
            onSuccess={handleAddSuccess}
          />
      )}
    </div>
  );
}