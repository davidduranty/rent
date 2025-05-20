import {Injectable} from "@angular/core";
import {Vehicle} from "../models/location.model";
import {SearchParams} from '../models/search-params.model';
import {User} from '../models/user.model';

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

  async getVehicleByParma(params: SearchParams): Promise<Vehicle[]> {
    try {
      const response = await fetch('http://localhost:3000/vehicle/available', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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
