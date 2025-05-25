'use client';
import { Star, StarHalf, StarOff } from "lucide-react"; // یا از آیکون‌های خودت استفاده کن
import { Card, CardContent } from "../ui/card";
import { UserRating } from "@/types/server/user";
import { useUserInfoStore } from "@/stores/userStore";


const renderStars = (average: number) => {
  const fullStars = Math.floor(average);
  const halfStar = average % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`star-full-${i}`} className="w-4 h-4 text-yellow-500 fill-yellow-500" />);
  }

  if (halfStar) {
    stars.push(<StarHalf key="star-half" className="w-4 h-4 text-yellow-500 fill-yellow-500" />);
  }

  while (stars.length < 5) {
    stars.push(<StarOff key={`star-off-${stars.length}`} className="w-4 h-4 text-gray-300" />);
  }

  return <div className="flex gap-1">{stars}</div>;
};


export const UserRatingProfile = () => {
  const user =useUserInfoStore((state)=>state.user)

  return (
   


<Card>
  <CardContent className="p-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <Star className="w-5 h-5" /> امتیازها
    </h2>

    {user?.receivedRatings?.length ? (
      <>
        {/* میانگین امتیاز */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">میانگین امتیاز:</p>
          <div className="flex items-center gap-2 mt-1">
            {renderStars(
              user.receivedRatings.reduce((sum, r) => sum + r.overall_rating, 0) /
                user.receivedRatings.length
            )}
            <span className="text-sm text-gray-700">
              (
              {(
                user.receivedRatings.reduce((sum, r) => sum + r.overall_rating, 0) /
                user.receivedRatings.length
              ).toFixed(1)}{" "}
              از ۵)
            </span>
          </div>
        </div>

        {/* لیست امتیازها */}
        <div className="grid gap-2">
          {user.receivedRatings.map((r: UserRating) => (
            <div key={r?.id} className="flex justify-between items-center border-b pb-2">
              <span className="text-sm text-gray-700">⭐ {r?.overall_rating}</span>
              <span className="text-yellow-500 font-semibold text-sm">{r?.comment}</span>
            </div>
          ))}
        </div>
      </>
    ) : (
      <p className="text-gray-500 text-sm">امتیازی دریافت نشده.</p>
    )}
  </CardContent>
</Card>

)
}
export default UserRatingProfile