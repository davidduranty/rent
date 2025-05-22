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
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      return {} as Location;
    }
  }

  async addLocation(location: Location): Promise<Location | null> {
    try {
      const response = await fetch('http://localhost:3000/location/add-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(location)
      });

      if (!response.ok) {
        throw new Error('Échec de l\'ajout de l\'utilisateur');
      }

      const newLocation = await response.json();
      return newLocation;
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur :", error);
      return null;
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
        throw new Error('Failed to fetch location');
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
