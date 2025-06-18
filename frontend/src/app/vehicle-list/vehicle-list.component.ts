import { Component, inject, OnInit } from '@angular/core';
import { Data, Vehicle } from '../models/location.model';
import { VehicleService } from '../services/vehicle.service';
import { throwError } from 'rxjs';
import { RouterLink } from '@angular/router';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  public dataList: Data[] = [];

  private vehicleService = inject(VehicleService)
  private dataService = inject(DataService)

  ngOnInit(): void {

    try {
      this.vehicleService.getAllVehicles().then((vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
      })
    } catch (error) {
      throwError(() => new Error('Failed to fetch vehicles'));
    }
    this.dataList = this.dataService.getData();
    console.log('Données récupérées :', this.dataList);
  }
}
