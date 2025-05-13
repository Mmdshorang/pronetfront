import React from 'react';
import { useAuth } from '../../hooks';
import { Link, useNavigate } from 'react-router-dom';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <Link to="/" className="flex items-center">
                                <img
                                    className="h-8 w-auto"
                                    src="/logo.png"
                                    alt="ProNet"
                                />
                                <span className="ml-2 text-xl font-bold text-gray-900">
                                    ProNet
                                </span>
                            </Link>
                        </div>

                        <div className="flex items-center">
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        to="/profile"
                                        className="text-gray-700 hover:text-gray-900"
                                    >
                                        پروفایل
                                    </Link>
                                    {user.role === 'admin' && (
                                        <Link
                                            to="/admin"
                                            className="text-gray-700 hover:text-gray-900"
                                        >
                                            پنل مدیریت
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-700 hover:text-gray-900"
                                    >
                                        خروج
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        to="/login"
                                        className="text-gray-700 hover:text-gray-900"
                                    >
                                        ورود
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                    >
                                        ثبت‌نام
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-500">
                        © {new Date().getFullYear()} ProNet. تمامی حقوق محفوظ است.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout; 