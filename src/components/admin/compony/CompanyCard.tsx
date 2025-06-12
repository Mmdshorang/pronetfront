import { Company } from '@/types/server/user';
import Link from 'next/link';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const { name, pivot, id } = company;
  const { job_title, start_date, end_date, role } = pivot;
console.log(role)
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col h-full">
        {/* بخش اطلاعات */}
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
          <p className="text-gray-600">
            <span className="font-semibold">سمت:</span> {job_title}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {new Date(start_date).toLocaleDateString('fa-IR')} - {end_date ? new Date(end_date).toLocaleDateString('fa-IR') : 'اکنون'}
          </p>
        </div>

        {/* دکمه ویرایش فقط برای ادمین */}
        {role === 'admin' && (
          <div className="mt-4">
            <Link href={`/mycompany/${id}`} legacyBehavior>
              <a className="w-full text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                مدیریت شرکت
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyCard;