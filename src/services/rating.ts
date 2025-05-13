import api from './api';
import type { CreateUserRatingData, CreateCompanyRatingData } from '../types';

class RatingService {
    async createUserRating(data: CreateUserRatingData): Promise<void> {
        await api.post('/ratings/user', data);
    }

    async createCompanyRating(data: CreateCompanyRatingData): Promise<void> {
        await api.post('/ratings/company', data);
    }
}

export const ratingService = new RatingService(); 