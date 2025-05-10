import React from 'react';
import { useParams } from 'react-router-dom';
import PublicProfile from './PublicProfile';

const PublicProfileRoute: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // TODO: Fetch profile data from API
  const mockProfile = {
    name: 'علی محمدی',
    position: 'توسعه‌دهنده فرانت‌اند',
    company: 'شرکت نمونه',
    rating: 4.5,
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    experience: [
      'توسعه‌دهنده ارشد در شرکت نمونه (1400-1402)',
      'توسعه‌دهنده در شرکت X (1398-1400)'
    ],
    education: [
      'کارشناسی مهندسی نرم‌افزار - دانشگاه تهران (1396-1400)',
      'کارشناسی ارشد هوش مصنوعی - دانشگاه شریف (1400-1402)'
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PublicProfile
        name={mockProfile.name}
        position={mockProfile.position}
        company={mockProfile.company}
        rating={mockProfile.rating}
        skills={mockProfile.skills}
        experience={mockProfile.experience}
        education={mockProfile.education}
        avatarUrl={`https://ui-avatars.com/api/?name=${encodeURIComponent(mockProfile.name)}&background=random`}
      />
    </div>
  );
};

export default PublicProfileRoute; 