import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Pencil } from "lucide-react";

interface UserProfileCardProps {
  name: string;
  email: string;
  location: string;
  avatarUrl?: string;
  skills?: string[];
  achievements?: string[];
  onEdit?: () => void;
}

export default function UserProfileCard({
  name,
  email,
  location,
  avatarUrl,
  skills = [],
  achievements = [],
  onEdit,
}: UserProfileCardProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto p-6 rounded-2xl shadow-xl">
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <Avatar className="w-24 h-24">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{name}</h2>
            {onEdit && (
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Pencil className="w-4 h-4 mr-1" /> ویرایش
              </Button>
            )}
          </div>
          <p className="text-gray-500 text-sm mt-1">{email}</p>
          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>

          {skills.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">مهارت‌ها:</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <Badge key={i}>{skill}</Badge>
                ))}
              </div>
            </div>
          )}

          {achievements.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">دستاوردها:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}