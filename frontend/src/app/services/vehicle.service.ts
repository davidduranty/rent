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

  async addVehicle(vehicle: Vehicle): Promise<Vehicle | null> {
    try {
      const response = await fetch('http://localhost:3000/vehicle/add-vehicle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle)
      });

      if (!response.ok) {
        throw new Error('Échec de l\'ajout de l\'utilisateur');
      }

      const newVehicle = await response.json();
      return newVehicle;
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un véhicule' :", error);
      return null;
    }
  }

  async updateVehicle(id: number, vehicle: Vehicle): Promise<Vehicle> {
    try {
      const response = await fetch(`http://localhost:3000/vehicle/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle)
      });
      if (!response.ok) {
        throw new Error('Failed to fetch vehicle');
      }
      return await response.json();
    } catch (error) {
      return {} as Vehicle;
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
