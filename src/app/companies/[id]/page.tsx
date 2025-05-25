// app/companies/[id]/page.tsx
'use client';
import { useCompanyGetByIDRequest } from "@/hooks/company/getCompany";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";


const CompanyDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;  // دریافت آیدی از URL
  const { data, error, isPending ,mutate } = useCompanyGetByIDRequest();
   useLayoutEffect(()=>()=>{mutate(Number(id))},[id])
  if (isPending) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا در بارگذاری اطلاعات</div>;

  if (!data) return <div>شرکت مورد نظر یافت نشد.</div>;

  return (
    <div>
      {/* <h1>{data.data.}</h1>
      <p>{data.description}</p> */}
      <p>Location: </p>
      {/* اطلاعات دیگر شرکت */}
    </div>
  );
};

export default CompanyDetailPage;
