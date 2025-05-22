"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUserInfoStore } from "@/stores/userStore";
import { Achievement, Company, Skill, UserRating } from "@/types/server/user";
import { MapPin, Star, Briefcase, Award, User2, Pencil, Plus } from "lucide-react";
import AddCompanyDialog from "./dialogs/AddCompanyDialog"; // فرض بر اینه که این رو ساختی

const ProfilePage = () => {
  const user = useUserInfoStore((state) => state.user);

  if (!user) return <p className="text-center mt-20 text-gray-500">لطفاً وارد شوید</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* اطلاعات کلی کاربر */}
      <Card>
        <CardContent className="p-6 flex items-center gap-6">
          <Avatar className="w-20 h-20 ring-2 ring-gray-200 shadow-md">
            <AvatarImage src="/default-avatar.png" alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <User2 className="w-6 h-6" />
              {user.name}
            </h1>
            <p className="text-gray-600">{user.email}</p>
            {user.location?.name && (
              <p className="flex items-center text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-1" />
                {user.location.name}
              </p>
            )}
          </div>

          <Button variant="outline" className="gap-1">
            <Pencil className="w-4 h-4" />
            ویرایش
          </Button>
        </CardContent>
      </Card>

      {/* شرکت‌ها */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              سوابق شغلی
            </h2>
            <AddCompanyDialog />
          </div>

          {user.companies?.length ? (
            <div className="space-y-4">
              {user.companies.map((company: Company) => (
                <div
                  key={company.id}
                  className="border p-4 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">{company.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    {company.pivot.job_title} ({company.pivot.employment_type})
                  </p>
                  <p className="text-xs text-gray-500">
                    {company.pivot.start_date} - {company.pivot.end_date || "اکنون"}
                  </p>
                  {company.pivot.description && (
                    <p className="text-sm mt-1">{company.pivot.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">هنوز شرکتی ثبت نشده.</p>
          )}
        </CardContent>
      </Card>

      {/* مهارت‌ها */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">مهارت‌ها</h2>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4" /> افزودن مهارت
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {user.skills?.map((skill: Skill) => (
              <span
                key={skill.id}
                className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* دستاوردها */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Award className="w-5 h-5" />
              دستاوردها
            </h2>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4" /> افزودن دستاورد
            </Button>
          </div>

          {user.achievements?.length ? (
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {user.achievements.map((a: Achievement) => (
                <li key={a.id}>{a.title}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">دستاوردی ثبت نشده.</p>
          )}
        </CardContent>
      </Card>

      {/* امتیاز دریافتی */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5" /> امتیازها
          </h2>
          {user.receivedRatings?.length ? (
            <div className="grid gap-2">
              {user.receivedRatings.map((r: UserRating) => (
                <div key={r.id} className="flex justify-between items-center border-b pb-2">
                  <span>{r.reviewer.name}</span>
                  <span className="text-yellow-500 font-semibold">{r.rating}/5</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">امتیازی دریافت نشده.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
