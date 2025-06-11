import { CompanyEmployee } from "@/types/server/company";
import { FaEnvelope, FaUserCircle } from "react-icons/fa";

const EmployeeCard: React.FC<{ employee: CompanyEmployee }> = ({ employee }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 flex items-center space-x-4 space-x-reverse">
    {employee?.profile_photo ? (
  <image
    // The source is now clean without the || operator
    href={`https://localhost:8000/${employee.profile_photo}`}
   // alt={employee.name || 'Employee Photo'}
    width={60}
    height={60}
    className="rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
 
  />
) : (
      <FaUserCircle size={60} className="text-gray-400 dark:text-gray-500 rounded-full" />
    )}
    <div>
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{employee.name}</h4>
      <a href={`mailto:${employee.email}`} className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
        <FaEnvelope className="ml-1 rtl:mr-1 rtl:ml-0" />
        {employee.email}
      </a>
    </div>
  </div>
);
export default EmployeeCard;