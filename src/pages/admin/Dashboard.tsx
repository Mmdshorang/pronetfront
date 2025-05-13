import React, { useState } from 'react';
import { useUsers, useCompanies, useSkills, useAchievements } from '../../hooks';
import type { User, Company, Skill, Achievement } from '../../types';

const Dashboard: React.FC = () => {
    const { users, loading: usersLoading, error: usersError } = useUsers();
    const { companies, loading: companiesLoading, error: companiesError } = useCompanies();
    const { skills, loading: skillsLoading, error: skillsError } = useSkills();
    const { achievements, loading: achievementsLoading, error: achievementsError } = useAchievements();

    const [activeTab, setActiveTab] = useState<'users' | 'companies' | 'skills' | 'achievements'>('users');

    const renderUsers = () => {
        if (usersLoading) {
            return <div className="animate-pulse">Loading users...</div>;
        }
        if (usersError) {
            return <div className="text-red-600">{usersError}</div>;
        }
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                نام
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ایمیل
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                شرکت
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                عملیات
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user: User) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                        {user.company?.name || '-'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 ml-4">
                                        ویرایش
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderCompanies = () => {
        if (companiesLoading) {
            return <div className="animate-pulse">Loading companies...</div>;
        }
        if (companiesError) {
            return <div className="text-red-600">{companiesError}</div>;
        }
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                نام
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                توضیحات
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                موقعیت
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                عملیات
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {companies.map((company: Company) => (
                            <tr key={company.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{company.name}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-500">{company.description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                        {company.location?.name || '-'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 ml-4">
                                        ویرایش
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderSkills = () => {
        if (skillsLoading) {
            return <div className="animate-pulse">Loading skills...</div>;
        }
        if (skillsError) {
            return <div className="text-red-600">{skillsError}</div>;
        }
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                نام
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                عملیات
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {skills.map((skill: Skill) => (
                            <tr key={skill.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{skill.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 ml-4">
                                        ویرایش
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderAchievements = () => {
        if (achievementsLoading) {
            return <div className="animate-pulse">Loading achievements...</div>;
        }
        if (achievementsError) {
            return <div className="text-red-600">{achievementsError}</div>;
        }
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                عنوان
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                توضیحات
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                عملیات
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {achievements.map((achievement: Achievement) => (
                            <tr key={achievement.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{achievement.title}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-500">{achievement.description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 ml-4">
                                        ویرایش
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow rounded-lg">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex">
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`${
                                activeTab === 'users'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                        >
                            کاربران
                        </button>
                        <button
                            onClick={() => setActiveTab('companies')}
                            className={`${
                                activeTab === 'companies'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                        >
                            شرکت‌ها
                        </button>
                        <button
                            onClick={() => setActiveTab('skills')}
                            className={`${
                                activeTab === 'skills'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                        >
                            مهارت‌ها
                        </button>
                        <button
                            onClick={() => setActiveTab('achievements')}
                            className={`${
                                activeTab === 'achievements'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                        >
                            دستاوردها
                        </button>
                    </nav>
                </div>

                {/* Content */}
                <div className="p-6">
                    {activeTab === 'users' && renderUsers()}
                    {activeTab === 'companies' && renderCompanies()}
                    {activeTab === 'skills' && renderSkills()}
                    {activeTab === 'achievements' && renderAchievements()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 