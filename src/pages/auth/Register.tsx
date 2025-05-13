import React, { useState } from 'react';
import { useAuth } from '../../hooks';
import { Link, useNavigate } from 'react-router-dom';
import type { RegisterData } from '../../types';
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt } from 'react-icons/fa';

const Register: React.FC = () => {
    const { register, loading, error } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterData>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        location: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            // Error is handled by React Query
            console.error('Registration failed:', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-6">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
                <h2 className="text-center text-3xl font-bold text-gray-800 mb-2">
                    ثبت‌نام در سامانه
                </h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    قبلا ثبت‌نام کرده‌اید؟{' '}
                    <Link to="/login" className="text-blue-600 font-medium hover:underline">
                        وارد شوید
                    </Link>
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="relative">
                        <FaUser className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="text"
                            name="name"
                            placeholder="نام"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            placeholder="ایمیل"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <FaLock className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="password"
                            name="password"
                            placeholder="رمز عبور"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password Confirmation */}
                    <div className="relative">
                        <FaLock className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="password"
                            name="password_confirmation"
                            placeholder="تکرار رمز عبور"
                            required
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Location */}
                    <div className="relative">
                        <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="text"
                            name="location"
                            placeholder="شناسه مکان (اختیاری)"
                            value={formData.location ?? ''}
                            onChange={handleChange}
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {error && (
                        <div className="text-center text-sm text-red-600">
                            {error instanceof Error ? error.message : 'خطا در ثبت‌نام'}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register; 