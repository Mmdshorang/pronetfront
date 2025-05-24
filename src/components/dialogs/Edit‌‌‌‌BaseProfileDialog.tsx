import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { User } from "@/types/user"
import { useState } from "react"

const EditUserProfileForm = ({
  user,
  onSubmit,
  onCancel,
}: {
  user: User
  onSubmit: (data: User) => void
  onCancel: () => void
}) => {
  const [formData, setFormData] = useState<User>({
    name: user.name || "",
    bio: user.bio || "",
    github_url: user.github_url || "",
    linkedin_url: user.linkedin_url || "",
    email: user.email || "",
    location: user.location || { city: "", country: "" },
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleLocationChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [field]: value,
      },
    })
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
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
        value={formData.github_url}
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
          value={formData.location.city}
          onChange={(e) => handleLocationChange("city", e.target.value)}
        />
        <Input
          placeholder="کشور"
          value={formData.location.country}
          onChange={(e) => handleLocationChange("country", e.target.value)}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          لغو
        </Button>
        <Button type="submit">ذخیره</Button>
      </div>
    </form>
  )
}

export default EditUserProfileForm
