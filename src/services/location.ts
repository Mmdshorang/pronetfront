import api from './api';
import type { Location, CreateLocationData } from '../types';

class LocationService {
    async getLocations(): Promise<Location[]> {
        const response = await api.get('/locations');
        return response.data;
    }

    async createLocation(data: CreateLocationData): Promise<Location> {
        const response = await api.post('/locations', data);
        return response.data;
    }
}

export const locationService = new LocationService(); 