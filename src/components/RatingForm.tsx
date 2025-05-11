import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from './ui/button';
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import axios from 'axios';

interface RatingCriteria {
  id: number;
  name: string;
  description: string;
}

interface RatingFormProps {
  userId: number;
  onSuccess?: () => void;
}

export function RatingForm({ userId, onSuccess }: RatingFormProps) {
  const [criteria, setCriteria] = useState<RatingCriteria[]>([]);
  const [overallRating, setOverallRating] = useState(3);
  const [comment, setComment] = useState('');
  const [criteriaRatings, setCriteriaRatings] = useState<Record<number, { score: number; comment: string }>>({});

  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const response = await axios.get('/api/rating-criteria');
        setCriteria(response.data);
        // Initialize ratings for each criterion
        const initialRatings = response.data.reduce((acc: Record<number, { score: number; comment: string }>, curr: RatingCriteria) => {
          acc[curr.id] = { score: 3, comment: '' };
          return acc;
        }, {});
        setCriteriaRatings(initialRatings);
      } catch (error) {
        console.error('Error fetching rating criteria:', error);
      }
    };

    fetchCriteria();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const ratingData = {
        overall_rating: overallRating,
        comment,
        criteria: Object.entries(criteriaRatings).map(([id, data]) => ({
          id: parseInt(id),
          score: data.score,
          comment: data.comment
        }))
      };

      await axios.post(`/api/users/${userId}/ratings`, ratingData);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Rate User</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Overall Rating</Label>
            <Slider
              value={[overallRating]}
              onValueChange={([value]: number[]) => setOverallRating(value)}
              min={1}
              max={5}
              step={1}
              className="w-full"
            />
            <div className="text-sm text-gray-500">{overallRating} / 5</div>
          </div>

          <div className="space-y-2">
            <Label>Overall Comment</Label>
            <Textarea
              value={comment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
              placeholder="Enter your overall feedback..."
              className="w-full"
            />
          </div>

          {criteria.map((criterion) => (
            <div key={criterion.id} className="space-y-2">
              <Label>{criterion.name}</Label>
              <p className="text-sm text-gray-500">{criterion.description}</p>
              <Slider
                value={[criteriaRatings[criterion.id]?.score || 3]}
                onValueChange={([value]: number[]) => setCriteriaRatings(prev => ({
                  ...prev,
                  [criterion.id]: { ...prev[criterion.id], score: value }
                }))}
                min={1}
                max={5}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-gray-500">
                {criteriaRatings[criterion.id]?.score || 3} / 5
              </div>
              <Textarea
                value={criteriaRatings[criterion.id]?.comment || ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCriteriaRatings(prev => ({
                  ...prev,
                  [criterion.id]: { ...prev[criterion.id], comment: e.target.value }
                }))}
                placeholder={`Enter your feedback for ${criterion.name.toLowerCase()}...`}
                className="w-full"
              />
            </div>
          ))}

          <Button type="submit" className="w-full">
            Submit Rating
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 