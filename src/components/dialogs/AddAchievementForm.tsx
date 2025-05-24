import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddAchievementForm = ({ onSubmit }: { onSubmit: (title: string) => void }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="عنوان دستاورد"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => setTitle("")}>
          لغو
        </Button>
        <Button type="submit">افزودن</Button>
      </div>
    </form>
  );
};

export default AddAchievementForm;
