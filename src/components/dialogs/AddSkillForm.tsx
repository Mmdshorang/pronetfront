import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddSkillForm = ({ onSubmit }: { onSubmit: (skill: string) => void }) => {
  const [skillName, setSkillName] = useState("");

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
        <Button type="button" variant="outline" onClick={() => setSkillName("")}>
          لغو
        </Button>
        <Button type="submit">افزودن مهارت</Button>
      </div>
    </form>
  );
};

export default AddSkillForm;
