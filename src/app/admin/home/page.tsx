// app/admin/companies/page.tsx
'use client';

import { useState } from 'react';
// این هوک را باید بسازید

import { Button } from '@/components/ui/button'; // فرض می‌شود از shadcn/ui یا کتابخانه مشابه استفاده می‌کنید
import CompanyList from '@/components/admin/compony/CompanyList';
import AddCompanyDialog from '@/components/admin/compony/AddCompanyDialog';
import { useCompanyGetRequest } from '@/hooks/company/getCompany';

export default function CompaniesPage() {
  // هوک برای گرفتن لیست شرکت‌ها از API
const { data,isPending, error, mutate } = useCompanyGetRequest();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // تابع برای رفرش کردن لیست پس از افزودن شرکت جدید
  const handleSuccess = () => {
    setIsAddDialogOpen(false);
    mutate(1); // داده‌ها را دوباره از سرور بگیر
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">مدیریت شرکت‌ها</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>افزودن شرکت جدید</Button>
      </div>

      {isPending && <p>در حال بارگذاری...</p>}
      {error && <p className="text-red-500">خطا در دریافت اطلاعات</p>}
      
      {data && <CompanyList companies={data.data.companies} onActionSuccess={mutate} />}

      <AddCompanyDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}