import { Component, inject, OnInit } from '@angular/core';
import { Vehicle } from '../models/location.model';
import { VehicleService } from '../services/vehicle.service';
import { throwError } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  imports: [RouterLink],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];

  private vehicleService = inject(VehicleService)

  ngOnInit(): void {
    try {
      this.vehicleService.getAllVehicles().then((vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
      })
    } catch (error) {
      throwError(() => new Error('Failed to fetch vehicles'));
    }
  }
}
