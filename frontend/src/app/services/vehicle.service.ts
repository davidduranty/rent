import { Injectable } from "@angular/core";
import { Vehicle } from "../models/location.model";
import { SearchParams } from '../models/search-params.model';

@Injectable({
  providedIn: 'root'
})

export class VehicleService {

  async getAllVehicles(): Promise<Vehicle[]> {
    try {
      const response = await fetch('http://localhost:3000/vehicle/all');
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch vehicles');
      }
      return await response.json();
    } catch (error) {
      return [];
    }
  }

  async getVehicleByParma(params: SearchParams): Promise<Vehicle[]> {
    try {
      const response = await fetch('http://localhost:3000/vehicle/available', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error("La recherche contient une erreur.");
      }

      return await response.json();
    } catch (error) {
      console.error("La recherche contient une erreur: ", error);
      return [];
    }
  }

  async getVehicles(page: number, limit: number): Promise<{
    vehicle: Vehicle[],
    totalPages: number,
    currentPage: number
  }> {
    try {
      const response = await fetch(`http://localhost:3000/vehicle?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error("Failed to fetch vehicles");
      }
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la récupération des vehicles :", error);
      return { vehicle: [], totalPages: 1, currentPage: 1 };
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
