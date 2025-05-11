import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";

interface PublicProfileProps {
  name: string;
  position: string;
  company: string;
  rating: number;
  skills: string[];
  experience: {
    title: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education: {
    degree: string;
    field: string;
    university: string;
    year: string;
  }[];
}

const PublicProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // This would typically come from an API call using the id
  const profile: PublicProfileProps = {
    name: 'علی محمدی',
    position: 'توسعه‌دهنده ارشد فرانت‌اند',
    company: 'شرکت فناوری اطلاعات',
    rating: 4.5,
    skills: ['React', 'TypeScript', 'Material-UI', 'Node.js', 'GraphQL'],
    experience: [
      {
        title: 'توسعه‌دهنده ارشد فرانت‌اند',
        company: 'شرکت فناوری اطلاعات',
        duration: '۱۴۰۰ - اکنون',
        description: 'توسعه و نگهداری اپلیکیشن‌های وب با React و TypeScript'
      },
      {
        title: 'توسعه‌دهنده فرانت‌اند',
        company: 'شرکت نرم‌افزاری',
        duration: '۱۳۹۸ - ۱۴۰۰',
        description: 'توسعه رابط کاربری برای محصولات شرکت'
      }
    ],
    education: [
      {
        degree: 'کارشناسی ارشد',
        field: 'مهندسی نرم‌افزار',
        university: 'دانشگاه تهران',
        year: '۱۳۹۸'
      },
      {
        degree: 'کارشناسی',
        field: 'مهندسی کامپیوتر',
        university: 'دانشگاه صنعتی شریف',
        year: '۱۳۹۶'
      }
    ]
  };

  return (
    <div className="p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/avatar.png" alt={profile.name} />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-muted-foreground">{profile.position} در {profile.company}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">امتیاز: {profile.rating}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">مهارت‌ها</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">سوابق کاری</h2>
            <div className="space-y-4">
              {profile.experience.map((exp, index) => (
                <div key={index} className="border-b pb-4 last:border-0">
                  <h3 className="font-medium">{exp.title} - {exp.company}</h3>
                  <p className="text-sm text-muted-foreground">{exp.duration}</p>
                  <p className="text-sm mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">تحصیلات</h2>
            <div className="space-y-4">
              {profile.education.map((edu, index) => (
                <div key={index} className="border-b pb-4 last:border-0">
                  <h3 className="font-medium">{edu.degree} در {edu.field}</h3>
                  <p className="text-sm text-muted-foreground">{edu.university} - {edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicProfile; 