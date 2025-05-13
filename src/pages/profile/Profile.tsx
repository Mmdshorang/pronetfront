import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUsers, useSkills, useAchievements, useRatings } from '../../hooks';
import type { User, Skill, Achievement } from '../../types';

const Profile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getUser, loading: userLoading, error: userError } = useUsers();
    const { skills, loading: skillsLoading } = useSkills();
    const { achievements, loading: achievementsLoading } = useAchievements();
    const { createUserRating, loading: ratingLoading, error: ratingError } = useRatings();

    const [user, setUser] = useState<User | null>(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                const userData = await getUser(parseInt(id));
                setUser(userData);
            }
        };
        fetchUser();
    }, [id, getUser]);

    const handleRatingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id && rating > 0) {
            try {
                await createUserRating({
                    user_id: parseInt(id),
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

    if (userLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (userError || !user) {
        return (
            <div className="text-center text-red-600 py-8">
                {userError || 'کاربر یافت نشد'}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* User Information */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-3xl text-gray-500">
                                {user.name.charAt(0)}
                            </span>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                        <p className="text-gray-600">{user.email}</p>
                        {user.company && (
                            <p className="text-gray-600">
                                شرکت: {user.company.name}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">مهارت‌ها</h2>
                {skillsLoading ? (
                    <div className="animate-pulse flex space-x-4">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill: Skill) => (
                            <span
                                key={skill.id}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                                {skill.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Achievements Section */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">دستاوردها</h2>
                {achievementsLoading ? (
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {achievements.map((achievement: Achievement) => (
                            <div
                                key={achievement.id}
                                className="border-l-4 border-blue-500 pl-4"
                            >
                                <h3 className="font-medium">{achievement.title}</h3>
                                <p className="text-gray-600">{achievement.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Rating Section */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">امتیازدهی</h2>
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

export default Profile; 