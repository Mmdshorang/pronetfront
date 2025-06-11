// components/admin/company/CompanyList.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
 // تایپ Company را وارد کنید
import { Button } from '@/components/ui/button';
// هوک حذف
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

import { getCompany } from '@/types/server/company';


interface Props {
  companies: getCompany[];
  onActionSuccess: () => void;
}

export default function CompanyList({ companies, onActionSuccess }: Props) {
  const { mutate: deleteCompany, isPending } = useCompanyDeleteRequest();

  const handleDelete = (companyId: number) => {
    deleteCompany(companyId, {
      onSuccess: () => {
        onActionSuccess(); // رفرش لیست
      }
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">نام شرکت</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">وب‌سایت</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">عملیات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {companies.map((company) => (
            <tr key={company.id}>
              <td className="px-6 py-4 whitespace-nowrap">{company.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {/* <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a> */}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center space-x-2 space-x-reverse">
                <Link href={`/admin/companies/${company.id}`}>
                  <Button variant="outline" size="sm">مدیریت</Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" disabled={isPending}>حذف</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>آیا از حذف شرکت مطمئن هستید؟</AlertDialogTitle>
                      <AlertDialogDescription>این عملیات قابل بازگشت نیست.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>انصراف</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(company.id)}>حذف</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}