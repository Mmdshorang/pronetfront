import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCompanies, useUsers, useRatings } from '../../hooks';
import type { Company, User } from '../../types';

const CompanyProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getCompany, loading: companyLoading, error: companyError } = useCompanies();
    const { getUsers, loading: usersLoading, error: usersError } = useUsers();
    const { createCompanyRating, loading: ratingLoading, error: ratingError } = useRatings();

    const [company, setCompany] = useState<Company | null>(null);
    const [employees, setEmployees] = useState<User[]>([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const companyData = await getCompany(parseInt(id));
                setCompany(companyData);
                
                // Fetch employees for this company
                const usersData = await getUsers();
                setEmployees(usersData.filter(user => user.company_id === parseInt(id)));
            }
        };
        fetchData();
    }, [id, getCompany, getUsers]);

    const handleRatingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id && rating > 0) {
            try {
                await createCompanyRating({
                    company_id: parseInt(id),
                    rating,
                    comment,
                });
                setRating(0);
                setComment('');
            } catch (err) {
                // Error is handled by the hook
            }
        }
    };

    if (companyLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (companyError || !company) {
        return (
            <div className="text-center text-red-600 py-8">
                {companyError || 'شرکت یافت نشد'}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Company Information */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-3xl text-gray-500">
                                {company.name.charAt(0)}
                            </span>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
                        <p className="text-gray-600">{company.description}</p>
                        {company.location && (
                            <p className="text-gray-600">
                                موقعیت: {company.location.name}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Employees Section */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">کارمندان</h2>
                {usersLoading ? (
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ) : usersError ? (
                    <div className="text-red-600">{usersError}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {employees.map((employee) => (
                            <Link
                                key={employee.id}
                                to={`/profile/${employee.id}`}
                                className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-lg text-gray-500">
                                                {employee.name.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">
                                            {employee.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {employee.email}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Rating Section */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">امتیازدهی به شرکت</h2>
                <form onSubmit={handleRatingSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            امتیاز
                        </label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            required
                        >
                            <option value="0">انتخاب کنید</option>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            نظر
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={3}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="نظر خود را بنویسید..."
                        />
                    </div>
                    {ratingError && (
                        <div className="text-red-600 text-sm">{ratingError}</div>
                    )}
                    <button
                        type="submit"
                        disabled={ratingLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {ratingLoading ? 'در حال ثبت...' : 'ثبت امتیاز'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompanyProfile; 