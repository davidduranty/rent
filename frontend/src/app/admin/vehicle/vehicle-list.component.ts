import { Component, OnInit } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { Vehicle } from '../../models/location.model';
import { VehicleService } from '../../services/vehicle.service';
import { NewUserComponent } from '../user/new-user/new-user.component';
import { NewVehicleComponent } from './new-vehicle/new-vehicle.component';

@Component({
  selector: 'app-vehicle-list',
  imports: [MatIconModule, NewVehicleComponent],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent implements OnInit {
  listVehicle: Vehicle[] = []
  isAddVehicle: boolean = false;

  constructor(private readonly vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getAllVehicles().then((vehicles: Vehicle[]) => {
      this.listVehicle = vehicles;
    })
  }

  onAddVehicle() {
    this.isAddVehicle = true
  }
  onCloseAddVehicle() {
    this.isAddVehicle = false
  }
}
