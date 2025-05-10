import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface PublicProfileProps {
  name: string;
  position: string;
  company: string;
  rating: number;
  skills: string[];
  experience: string[];
  education: string[];
  avatarUrl?: string;
}

const PublicProfile: React.FC<PublicProfileProps> = ({
  name,
  position,
  company,
  rating,
  skills,
  experience,
  education,
  avatarUrl,
}) => {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-muted-foreground">{position}</p>
          <p className="text-muted-foreground">{company}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary">Rating: {rating.toFixed(1)}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Experience</h3>
            <ul className="list-disc list-inside space-y-2">
              {experience.map((exp, index) => (
                <li key={index} className="text-muted-foreground">
                  {exp}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            <ul className="list-disc list-inside space-y-2">
              {education.map((edu, index) => (
                <li key={index} className="text-muted-foreground">
                  {edu}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Contact</Button>
        <Button>View Full Profile</Button>
      </CardFooter>
    </Card>
  );
};

export default PublicProfile;
