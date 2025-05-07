import { Injectable } from "@angular/core";
import { Location } from "../models/location.model";

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  async getAllLocations(): Promise<Location[]> {
    try {
      const response = await fetch('http://localhost:3000/location/all');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      return [];
    }
  }
}
