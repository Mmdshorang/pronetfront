import { Profile } from "@/types/model/type";

export const calculateOverallAverage = (ratings: Profile['ratings']): number => {
  if (!ratings || ratings.length === 0) return 0;

  let totalScoreSum = 0;
  let totalCriteriaCount = 0;

  ratings.forEach(submission => {
    submission.criteriaValues.forEach(criterionVal => {
      totalScoreSum += criterionVal.score;
      totalCriteriaCount++;
    });
  });

  return totalCriteriaCount > 0
    ? parseFloat((totalScoreSum / totalCriteriaCount).toFixed(1))
    : 0;
};

