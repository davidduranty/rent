import { Component, OnInit } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { Location, Vehicle } from '../../models/location.model';
import { VehicleService } from '../../services/vehicle.service';
import { NewVehicleComponent } from './new-vehicle/new-vehicle.component';
import { LocationService } from '../../services/location.service';
import { ModifyVehicleComponent } from "./modify-vehicle/modify-vehicle.component";

@Component({
  selector: 'app-vehicle-list',
  imports: [MatIconModule, NewVehicleComponent, ModifyVehicleComponent],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent implements OnInit {
  locationList: Location[] = [];
  listVehicle: Vehicle[] = []
  isAddVehicle: boolean = false;
  isModifyVehicle: boolean = false;
  modifyVehicle: Vehicle = {
    id: 0,
    brand: "",
    model: "",
    image: "",
    transmition: "",
    place: 4,
    available: true,
    type: ""
  };


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

  modifyVehicleId(vehicle: Vehicle) {
    this.isModifyVehicle = true;
    this.modifyVehicle = vehicle;
  }

  deleteVehicle(id: number) {
    this.vehicleService.deleteVehicle(id).then(() => {
      this.listVehicle = this.listVehicle.filter(vehicle => vehicle.id !== id);
    })
  }

}
