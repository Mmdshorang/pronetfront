import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from 'axios';

interface RatingCriteria {
  id: number;
  name: string;
  score: number;
  comment: string;
}

interface UserRating {
  id: number;
  overall_rating: number;
  comment: string;
  created_at: string;
  reviewer: {
    id: number;
    name: string;
    email: string;
  };
  criteria: RatingCriteria[];
}

interface UserRatingsProps {
  userId: number;
}

export function UserRatings({ userId }: UserRatingsProps) {
  const [ratings, setRatings] = useState<UserRating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}/ratings`);
        setRatings(response.data);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [userId]);

  if (loading) {
    return <div>Loading ratings...</div>;
  }

  return (
    <div className="space-y-6">
      {ratings.map((rating) => (
        <Card key={rating.id}>
          <CardHeader className="flex flex-row items-center space-x-4">
            <Avatar>
              <AvatarImage src={`https://ui-avatars.com/api/?name=${rating.reviewer.name}`} />
              <AvatarFallback>{rating.reviewer.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{rating.reviewer.name}</CardTitle>
              <p className="text-sm text-gray-500">
                {new Date(rating.created_at).toLocaleDateString()}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Overall Rating</h4>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold">{rating.overall_rating}</div>
                  <div className="text-gray-500">/ 5</div>
                </div>
                {rating.comment && (
                  <p className="mt-2 text-gray-600">{rating.comment}</p>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Criteria Ratings</h4>
                {rating.criteria.map((criterion) => (
                  <div key={criterion.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{criterion.name}</span>
                      <span className="text-lg font-bold">{criterion.score}/5</span>
                    </div>
                    {criterion.comment && (
                      <p className="mt-1 text-sm text-gray-600">{criterion.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {ratings.length === 0 && (
        <Card>
          <CardContent className="py-6">
            <p className="text-center text-gray-500">No ratings yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 