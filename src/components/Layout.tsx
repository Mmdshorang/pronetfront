import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useLayout from '../hooks/useLayout';
import { Menu, X, LogOut, User, Settings, Home, Briefcase, Users, Search, Star } from 'lucide-react';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useLayout();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/app/dashboard', label: 'داشبورد', icon: <Home className="w-5 h-5" /> },
    { path: '/app/companies', label: 'شرکت‌ها', icon: <Briefcase className="w-5 h-5" /> },
    { path: '/app/employees', label: 'کارمندان', icon: <Users className="w-5 h-5" /> },
    { path: '/app/evaluations', label: 'ارزیابی‌ها', icon: <Star className="w-5 h-5" /> },
    { path: '/app/search', label: 'جستجو', icon: <Search className="w-5 h-5" /> },
    { path: '/app/profile', label: 'پروفایل', icon: <User className="w-5 h-5" /> },
    { path: '/app/settings', label: 'تنظیمات', icon: <Settings className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                  {isSidebarOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              )}
              <h1 className="text-xl font-semibold text-gray-900 mr-4">سیستم مدیریت منابع</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`${
            isMobile
              ? isSidebarOpen
                ? 'fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform translate-x-0 transition-transform duration-200 ease-in-out z-40'
                : 'fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform translate-x-full transition-transform duration-200 ease-in-out z-40'
              : 'w-64 bg-white shadow-lg fixed h-[calc(100vh-4rem)]'
          }`}
        >
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    if (isMobile) setIsSidebarOpen(false);
                  }}
                  className={`${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md w-full`}
                >
                  {item.icon}
                  <span className="mr-3">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className={`flex-1 ${!isMobile ? 'mr-64' : ''} p-6`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout; 