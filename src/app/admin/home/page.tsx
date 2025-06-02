'use client';

import { useState } from 'react';
import MenuGrid from '@/components/admin/MenuGrid';
import { FaBuilding, FaChartLine } from 'react-icons/fa';
import AddCompanyDialog from '@/components/admin/compony/AddCompanyDialog';

export default function HomePage() {
  const [openAddCompany, setOpenAddCompany] = useState(false);
  const [openStatsDialog, setOpenStatsDialog] = useState(false);

  const menuData = [
    {
      icon: <FaBuilding size={24} />,
      text: 'افزودن شرکت',
      onClick: () => setOpenAddCompany(true),
    },
    {
      icon: <FaChartLine size={24} />,
      text: 'حذف شرکت',
      onClick: () => setOpenStatsDialog(true),
    },
  ];

  return (
    <>
      <MenuGrid data={menuData} />
      
      {/* دیالوگ افزودن شرکت */}
      <AddCompanyDialog
        open={openAddCompany}
        onClose={() => setOpenAddCompany(false)}
        onSuccess={() => {
          alert('شرکت با موفقیت ثبت شد');
          setOpenAddCompany(false);
        }}
      />
    
      {/* می‌تونی یه دیالوگ دیگه هم برای آمار اضافه کنی */}
      {/* <StatsDialog open={openStatsDialog} onClose={() => setOpenStatsDialog(false)} /> */}
    </>
  );
}
