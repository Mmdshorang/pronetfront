'use client';
import { useCompanyGetByIDRequest } from "@/hooks/company/getCompany";
import { useCompanyEmployeesGetByIDRequest } from "@/hooks/company/getCompanyEmployees";
import Image from "next/image";
import { use, useEffect } from "react";

interface CompanyDetailPageProps {
  params: Promise<{ id: string }>;  // 👈 توجه: params حالا Promise هست
}

const CompanyDetailPage = ({ params }: CompanyDetailPageProps) => {
  const { id } = use(params);  // ✅ پارامترها را با use() باز کن
  const { data, error, isPending, mutate } = useCompanyGetByIDRequest();
  const { data: dataEmployees, error: errorEmployees, isPending: isPendingEmployees, mutate: mutateEmployees } = useCompanyEmployeesGetByIDRequest();
 
  useEffect(() => {
    if(id) 
    {

      mutate(Number(id));
      mutateEmployees(Number(id));
    }
  }, [id]);

  if (isPending) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا در بارگذاری اطلاعات</div>;
  if (!data) return <div>شرکت مورد نظر یافت نشد.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4">
        <Image
          src={`/uploads/logos/${data.data.company.logo}`}
          alt={data.data.company.name}
          width={80}
          height={80}
          className="rounded-xl shadow"
        />
        <div>
          <h1 className="text-2xl font-bold">{data.data.company.name}</h1>
          <p className="text-sm text-gray-500">{data.data.company.industry}</p>
          <p className="text-sm text-gray-500">{data.data.company.location?.city}, {data.data.company.location?.country}</p>
        </div>
      </div>

      <div>
        <p className="text-gray-700">{data.data.company.description}</p>
        <a href={data.data.company.website} target="_blank" className="text-blue-600 underline">
          وبسایت شرکت
        </a>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">امتیازها</h2>
        {data.data.company.ratings.map((rating) => (
          <div key={rating.id} className="border rounded-xl p-4 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{rating.reviewer.name}</p>
                <p className="text-sm text-gray-500">{rating.comment}</p>
              </div>
              <div className="text-lg font-bold text-yellow-600">
                {rating.overall_rating} / 5
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {rating.criteria.map((c) => (
                <div key={c.id} className="bg-gray-50 p-3 rounded-xl border">
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-sm text-gray-600">{c.pivot.comment}</div>
                  <div className="text-sm font-bold text-emerald-600 mt-1">
                    امتیاز: {c.pivot.score} / 5
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">کارمندان</h2>

        {isPendingEmployees ? (
          <p>در حال بارگذاری کارمندان...</p>
        ) : errorEmployees ? (
          <p className="text-red-500">خطا در بارگذاری کارمندان</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {dataEmployees?.data.employees?.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center gap-4 p-4 bg-white shadow rounded-xl border"
              >
                {/* <Image
                  src={
                    employee.profile_photo ??
                    '/uploads/profile_photos/default.png'
                  }
                  alt={employee.name}
                  width={80}
                  height={80}
                  className="w-16 h-16 rounded-full object-cover border"
                /> */}
                <div>
                  <p className="font-semibold text-gray-800">{employee.name}</p>
                  <p className="text-sm text-gray-500">{employee.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>



  );
};

export default CompanyDetailPage;






