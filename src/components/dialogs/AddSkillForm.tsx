import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserInfoStore } from "@/stores/userStore";
import { v4 as uuidv4 } from 'uuid';
const AddSkillForm = ({ onSubmit, onCancel }: { onSubmit: (skill: string) => void; onCancel: () => void }) => {
  const [skillName, setSkillName] = useState("");
  const addSkill = useUserInfoStore((state) => state.addSkill);
  const user = useUserInfoStore((state) => state.user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillName) {
      onSubmit(skillName); // ارسال مهارت جدید
      setSkillName(""); // خالی کردن فیلد ورودی
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="نام مهارت"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          لغو
        </Button>
        <Button type="submit" onClick={() => addSkill({ id: Number(uuidv4()), user_id: user?.id??0, name:skillName, created_at: "", updated_at: "" })}>افزودن مهارت</Button>
      </div>
    </form>
  );
};

export default AddSkillForm;
