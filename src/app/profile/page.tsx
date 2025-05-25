"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUserInfoStore } from "@/stores/userStore";
import { Achievement, Company, Skill, UserRating } from "@/types/server/user";
import { MapPin, Star, Briefcase, Award, User2, Pencil, Plus } from "lucide-react";
import { Github, Linkedin } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useRef, useState } from "react";
import AddCompanyForm from "@/components/dialogs/AddJobCompny";
import axios from "axios";
import EditUserProfileForm from "@/components/dialogs/Edit‌‌‌‌BaseProfileDialog";
import AddSkillForm from "@/components/dialogs/AddSkillForm";
import AddAchievementForm from "@/components/dialogs/AddAchievementForm";
import UserRatingProfile from "@/components/dialogs/UserRating";

const ProfilePage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null); // ✅ همیشه در رأس کامپوننت
  const user = useUserInfoStore((state) => state.user);
  console.log(user)
  const [onpendAddCompanyDialog, setOpenedAddCompanyDialog] = useState(false);
  const [preview, setPreview] = useState<string>(
    user?.profile_photo ?? "/default-avatar.png"
  );

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // نمایش پیش‌نمایش فوری
    const url = URL.createObjectURL(file);
    setPreview(url);

    // ارسال به سرور
    const formData = new FormData();
    formData.append("profile_photo", file);

    try {
      const res = await axios.post("/api/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // اگر نیاز به ذخیره در استور داشتی می‌تونی انجام بدی
      // مثلاً: updateUser({ ...user, avatarUrl: res.data.url });

      setPreview(res.data.url); // نمایش آدرس جدید
    } catch (error) {
      console.error("خطا در آپلود تصویر:", error);
    }
  };
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleSubmit = (updatedUser) => {
    // اینجا می‌توانید اطلاعات جدید را به API یا دیتابیس ارسال کنید
    console.log("کاربر ویرایش شد:", updatedUser)
    setIsEditing(false)
  }
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenAchievement, setIsDialogOpenAchievement] = useState(false);


  const handleAddSkillClick = () => {
    setIsDialogOpen(true); // باز کردن دیالوگ برای افزودن مهارت
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // بستن دیالوگ
  };

  const handleAddSkill = (newSkill: string) => {
    // اینجا می‌تونید مهارت جدید را به API ارسال کنید یا به لیست مهارت‌ها اضافه کنید
    console.log("مهارت جدید اضافه شد:", newSkill);
    handleCloseDialog(); // بستن دیالوگ بعد از افزودن مهارت
  };


  const handleAddAchievement = (title: string) => {
    console.log("دستاورد جدید:", title);
    // اینجا می‌تونی API فراخوانی کنی و بعد لیست رو به‌روزرسانی کنی
    setIsDialogOpen(false);
  };
  if (!user) return <p className="text-center mt-20 text-gray-500">لطفاً وارد شوید</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* اطلاعات کلی کاربر */}
      <Card>
        <CardContent className="p-6 flex items-center gap-6">
          <div onClick={handleAvatarClick}>
            <Avatar className="w-20 h-20 ring-2 ring-gray-200 shadow-md hover:opacity-80 cursor-pointer">
              <AvatarImage src={preview} alt={user.name ?? ""} />
              <AvatarFallback>{user?.name?.[0] ?? ""}</AvatarFallback>
            </Avatar>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <User2 className="w-6 h-6" />
              {user.name}
            </h1>
            <h1 className="text-xl text-gray-700 flex items-center gap-2">
              <User2 className="w-6 h-6" />
              {user.bio}
            </h1>
            <div className="space-y-2">
              <h1 className="text-lg text-gray-600 flex items-center gap-2">
                <Github className="w-6 h-6" />
                <a href={user.github_url ?? ''} target="_blank" rel="noopener noreferrer">{user.github_url}</a>
              </h1>
              <h1 className="text-lg text-gray-600 flex items-center gap-2">
                <Linkedin className="w-6 h-6" />
                <a href={user.linkedin_url} target="_blank" rel="noopener noreferrer">{user.linkedin_url}</a>
              </h1>
            </div>

            <p className="text-gray-600">{user.email}</p>

            {user.location?.id && (
              <div className="space-y-1">
                <p className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  {user.location.city}
                </p>
                <p className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  {user.location.country}
                </p>
              </div>
            )}
          </div>


          <Button variant="outline" className="gap-1" onClick={handleEditClick}>
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
            <Button size="sm" variant="outline" onClick={() => setOpenedAddCompanyDialog(true)}>
              <Plus className="w-4 h-4" /> افزودن مهارت
            </Button>

            <Dialog open={onpendAddCompanyDialog} onClose={() => setOpenedAddCompanyDialog(false)}>
              <DialogTrigger>
                <Button className="mt-2">+ افزودن سابقه شغلی</Button>
              </DialogTrigger>
              <DialogContent>
                <AddCompanyForm onSubmit={(data: Company) => { }} onCancel={() => setOpenedAddCompanyDialog(false)} />
              </DialogContent>
            </Dialog>
          </div>

          {user?.companies?.length ? (
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
            <Button size="sm" variant="outline" onClick={handleAddSkillClick} >
              <Plus className="w-4 h-4" /> افزودن مهارت
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {user?.skills?.map((skill: Skill) => (
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
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <AddSkillForm onSubmit={handleAddSkill}onCancel={() => setIsDialogOpen(false)} />
      </Dialog>
      {/* دستاوردها */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Award className="w-5 h-5" />
              دستاوردها
            </h2>
            <Button size="sm" variant="outline" onClick={() => setIsDialogOpenAchievement(true)}>
              <Plus className="w-4 h-4" /> افزودن دستاورد
            </Button>
          </div>

          {user?.achievements?.length ? (
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
      <Dialog open={isDialogOpenAchievement} onClose={() => setIsDialogOpenAchievement(false)}>
        <AddAchievementForm onSubmit={handleAddAchievement} onCancel={() => setIsDialogOpenAchievement(false)} />
      </Dialog>
      {/* امتیاز دریافتی */}
      <UserRatingProfile />

      {isEditing && (
        <Dialog open={isEditing} onClose={handleCancel}>
          <DialogContent>
            <EditUserProfileForm
              user={user}
              
              onCancel={handleCancel}
            />
          </DialogContent>
        </Dialog>
      )}
    </div >
  );
};

export default ProfilePage;
