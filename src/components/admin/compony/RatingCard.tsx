import { CompanyRating } from "@/types/server/company";
import { FaCalendarAlt, FaCommentDots, FaListUl, FaStar } from "react-icons/fa";
export const StarRating: React.FC<{ score: number; maxScore?: number; className?: string }> = ({ score, maxScore = 5, className = '' }) => {
    const fullStars = Math.floor(score);
    const halfStar = score % 1 >= 0.5 ? 1 : 0;
    const emptyStars = maxScore - fullStars - halfStar;
    return (
        <div className={`flex items-center ${className}`}>
            {Array(fullStars).fill(0).map((_, i) => <FaStar key={`full-${i}`} className="text-yellow-400" />)}
            {halfStar === 1 && <FaStar key="half" className="text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />}
            {Array(emptyStars).fill(0).map((_, i) => <FaStar key={`empty-${i}`} className="text-gray-300" />)}
            <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-300">({score.toFixed(1)}/{maxScore})</span>
        </div>
    );
};
const RatingCard: React.FC<{ rating: CompanyRating }> = ({ rating }) => {
    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
        } catch (e) {
            console.log(e)
            return "تاریخ نامعتبر";
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">{rating.rater}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                        <FaCalendarAlt className="ml-1 rtl:mr-1 rtl:ml-0" />
                        {formatDate(rating.timestamp)}
                    </p>
                </div>
                <div className="mt-2 sm:mt-0">
                    <StarRating score={rating.averageScore} className="justify-end" />
                </div>
            </div>

            {rating.comment && (
                <p className="text-gray-700 dark:text-gray-300 italic mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <FaCommentDots className="inline ml-2 rtl:mr-2 rtl:ml-0 text-gray-500 dark:text-gray-400" />
                    {rating.comment}
                </p>
            )}

            {rating.criteria && rating.criteria.length > 0 && (
                <div>
                    <h5 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center">
                        <FaListUl className="ml-2 rtl:mr-2 rtl:ml-0" />
                        معیارهای امتیازدهی:
                    </h5>
                    <ul className="space-y-2">
                        {rating.criteria.map((criterion, index) => (
                            <li key={index} className="flex justify-between items-center text-sm p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                                <span className="text-gray-600 dark:text-gray-300">{criterion.criterion}:</span>
                                <StarRating score={criterion.score} maxScore={5} className="text-xs" /> {/* فرض می کنیم امتیاز معیارها از 5 است */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RatingCard;