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

  async getLocationById(id: number): Promise<Location> {
    try {
      const response = await fetch(`http://localhost:3000/location/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      return {} as Location;
    }
  }

  async getByName(name: string): Promise<Location> {
    try {
      const response = await fetch(`http://localhost:3000/location/name?name=${name}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      return {} as Location;
    }
  }

  async updateLocation(id: number, location: { id: number, name: string, address: string, city: string, zipCode: number }): Promise<Location> {
    try {
      const response = await fetch(`http://localhost:3000/location/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(location)
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      return {} as Location;
    }
  }


  async addDeleteLocation(id: number): Promise<Location> {
    try {
      const response = await fetch(`http://localhost:3000/location/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      return {} as Location;
    }
  }

}
