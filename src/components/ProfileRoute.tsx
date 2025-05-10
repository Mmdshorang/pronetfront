import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserProfileCard from './UserProfileCard';

const ProfileRoute: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <UserProfileCard
        name={user.name}
        email={user.email}
        location="تهران"
        avatarUrl={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
        skills={['توسعه‌دهنده فرانت‌اند', 'React', 'TypeScript']}
        achievements={['پروژه موفق A', 'پروژه موفق B']}
        onEdit={() => console.log('Edit profile')}
      />
    </div>
  );
};

export default ProfileRoute; 