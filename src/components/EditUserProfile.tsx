import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function EditUserProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    skills: "",
    achievements: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    // API call to update user profile here
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>ویرایش پروفایل</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatar.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Button variant="outline">تغییر عکس</Button>
          </div>
          <div>
            <Label>نام</Label>
            <Input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label>ایمیل</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <Label>موقعیت</Label>
            <Input name="location" value={formData.location} onChange={handleChange} />
          </div>
          <div>
            <Label>مهارت‌ها</Label>
            <Input name="skills" value={formData.skills} onChange={handleChange} placeholder="مثال: React, Laravel, SQL" />
          </div>
          <div>
            <Label>دستاوردها</Label>
            <Textarea name="achievements" value={formData.achievements} onChange={handleChange} rows={4} />
          </div>
          <Button type="submit">ذخیره تغییرات</Button>
        </form>
      </CardContent>
    </Card>
  );
}