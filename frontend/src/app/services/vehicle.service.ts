import { Injectable } from "@angular/core";
import { Vehicle } from "../models/location.model";

@Injectable({
  providedIn: 'root'
})

export class VehicleService {

  async getAllVehicles(): Promise<Vehicle[]> {
    try {
      const response = await fetch('http://localhost:3000/vehicle/all');
      if (!response.ok) {
        throw new Error('Failed to fetch vehicles');
      }
      return await response.json();
    } catch (error) {
      return [];
    }
  }

  async deleteVehicle(id: number): Promise<void> {
    try {
      const response = await fetch(`http://localhost:3000/vehicle/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete vehicle');
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  }
}
