import React from 'react';
import { Card, CardContent, Typography, Grid, Rating, Chip, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

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
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                {profile.name}
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {profile.position} در {profile.company}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={profile.rating} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ mr: 1 }}>
                  ({profile.rating})
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                مهارت‌ها
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {profile.skills.map((skill, index) => (
                  <Chip key={index} label={skill} />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                سوابق کاری
              </Typography>
              {profile.experience.map((exp, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">
                    {exp.title} - {exp.company}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {exp.duration}
                  </Typography>
                  <Typography variant="body2">
                    {exp.description}
                  </Typography>
                </Box>
              ))}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                تحصیلات
              </Typography>
              {profile.education.map((edu, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">
                    {edu.degree} در {edu.field}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {edu.university} - {edu.year}
                  </Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PublicProfile; 