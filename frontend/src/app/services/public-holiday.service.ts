import { Injectable } from '@angular/core';
import { PublicHoliday } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class PublicHolidayService {
  async getById(id: number): Promise<PublicHoliday> {
    try {
      const response = await fetch(`http://localhost:3000/location-holiday/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch public holidays');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch public holidays');
    }
  }
}
