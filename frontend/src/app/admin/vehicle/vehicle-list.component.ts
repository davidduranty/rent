import { Component, OnInit } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { Location, Vehicle } from '../../models/location.model';
import { VehicleService } from '../../services/vehicle.service';
import { NewUserComponent } from '../user/new-user/new-user.component';
import { NewVehicleComponent } from './new-vehicle/new-vehicle.component';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-vehicle-list',
  imports: [MatIconModule, NewVehicleComponent],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent implements OnInit {
  locationList: Location[] = [];
  listVehicle: Vehicle[] = []
  isAddVehicle: boolean = false;


  constructor(private readonly vehicleService: VehicleService, private readonly locationService: LocationService) { }

  ngOnInit(): void {
    this.getAllVehicles();
    this.locationService.getAllLocations().then((locations: Location[]) => {
      this.locationList = locations;
    })
  }

  onClick(event: Event) {
    const selectedLocation = (event.target as HTMLSelectElement).value;
    console.log(selectedLocation);
    this.locationService.getByName(selectedLocation).then((location: Location) => {
      this.listVehicle = location.vehicles;
    })
  }

  onAddVehicle() {
    this.isAddVehicle = true
  }
  onCloseAddVehicle() {
    this.isAddVehicle = false
  }
  getAllVehicles() {
    this.vehicleService.getAllVehicles().then((vehicles: Vehicle[]) => {
      this.listVehicle = vehicles;

    })
  }

}
