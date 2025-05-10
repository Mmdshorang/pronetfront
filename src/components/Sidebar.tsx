import {
  LayoutDashboard,
  Users,
  Building2,
  BarChart3,
  Search,
  User,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    {
      text: 'داشبورد',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/dashboard',
      roles: ['company', 'employee', 'admin'],
    },
    {
      text: 'کارمندان',
      icon: <Users className="w-5 h-5" />,
      path: '/employees',
      roles: ['company', 'admin'],
    },
    {
      text: 'شرکت‌ها',
      icon: <Building2 className="w-5 h-5" />,
      path: '/companies',
      roles: ['admin'],
    },
    {
      text: 'ارزیابی‌ها',
      icon: <BarChart3 className="w-5 h-5" />,
      path: '/evaluations',
      roles: ['company', 'employee', 'admin'],
    },
    {
      text: 'جستجو',
      icon: <Search className="w-5 h-5" />,
      path: '/search',
      roles: ['company', 'employee', 'admin', 'guest'],
    },
    {
      text: 'پروفایل',
      icon: <User className="w-5 h-5" />,
      path: '/profile',
      roles: ['company', 'employee', 'admin'],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role || 'guest')
  );

  return (
    <div className="h-full bg-white border-l border-gray-200 w-64">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {filteredMenuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div
                    className={`mr-3 ${
                      isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  >
                    {item.icon}
                  </div>
                  {item.text}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 