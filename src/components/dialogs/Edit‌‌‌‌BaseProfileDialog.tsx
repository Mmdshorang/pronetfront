import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useUserInfoStore } from "@/stores/userStore"
import { User, UserBase } from "@/types/server/user"
import { useState } from "react"

const EditUserProfileForm = ({
  user,

  onCancel,
}: {
  user: User

  onCancel: () => void
}) => {
  const [formData, setFormData] = useState<UserBase>({
    name: user.name || "",
    bio: user.bio || "",
    github_url: user.github_url || "",
    linkedin_url: user.linkedin_url || "",
    email: user.email || "",
    location: user.location || null,
    phone: user.phone || "",
    profile_photo: user.profile_photo || null,
    role: user.role || "",
    id: user.id || 0,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }
  const handleLocationChange = (
    field: keyof Location | "city" | "country",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        id: prev.location?.id ?? 0,
        created_at: prev.location?.created_at ?? "",
        updated_at: prev.location?.updated_at ?? "",
        city: field === "city" ? value : prev.location?.city ?? "",
        country: field === "country" ? value : prev.location?.country ?? "",
      },
    }));
  };

  const handleChangeBaseInfo = () => {
    useUserInfoStore.getState().updateUserInfo({
      name: formData.name,
      phone: formData.phone,
      bio: formData.bio,
      github_url: formData.github_url,
      linkedin_url: formData.linkedin_url,
      profile_photo: formData.profile_photo,
      email: formData.email,
      location: formData.location

    });
    onCancel()

  }
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleChangeBaseInfo();
      }}
    >
      <Input
        placeholder="نام"
        value={formData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
      />
      <Textarea
        placeholder="بیوگرافی"
        value={formData.bio}
        onChange={(e) => handleInputChange("bio", e.target.value)}
      />
      <Input
        placeholder="لینک گیت‌هاب"
        value={formData.github_url ?? ''}
        onChange={(e) => handleInputChange("github_url", e.target.value)}
      />
      <Input
        placeholder="لینک لینکدین"
        value={formData.linkedin_url}
        onChange={(e) => handleInputChange("linkedin_url", e.target.value)}
      />
      <Input
        placeholder="ایمیل"
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
      />
      <div className="flex space-x-4">
        <Input
          placeholder="شهر"
          value={formData?.location?.city}
          onChange={(e) => handleLocationChange("city", e.target.value)}
        />
        <Input
          placeholder="کشور"
          value={formData?.location?.country}
          onChange={(e) => handleLocationChange("country", e.target.value)}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          لغو
        </Button>
        <Button type="submit" onClick={handleChangeBaseInfo}>ذخیره</Button>
      </div>
    </form>
  )
}

export default EditUserProfileForm
