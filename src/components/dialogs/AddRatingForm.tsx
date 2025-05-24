import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddRatingForm = ({ onSubmit }: { onSubmit: (rating: number, comment: string) => void }) => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || rating < 1 || rating > 5) return;
    onSubmit(rating, comment.trim());
    setRating(5);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="number"
        min={1}
        max={5}
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        placeholder="امتیاز (۱ تا ۵)"
      />
      <Input
        placeholder="نظر شما (اختیاری)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => setComment("")}>
          لغو
        </Button>
        <Button type="submit">ثبت امتیاز</Button>
      </div>
    </form>
  );
};

export default AddRatingForm;
