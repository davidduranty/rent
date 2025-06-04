import { Component, OnInit } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { Location, Vehicle } from '../../models/location.model';
import { VehicleService } from '../../services/vehicle.service';
import { NewVehicleComponent } from './new-vehicle/new-vehicle.component';
import { LocationService } from '../../services/location.service';
import { ModifyVehicleComponent } from "./modify-vehicle/modify-vehicle.component";
import { Router } from '@angular/router';

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
  currentPage: number = 1;
  totalPages: number = 1;


  constructor(private readonly vehicleService: VehicleService, private readonly locationService: LocationService, private router: Router) { }

  ngOnInit(): void {
    this.getAllVehicles();
    this.locationService.getAllLocations().then((locations: Location[]) => {
      this.locationList = locations;
    })
    this.fetchVehicles(this.currentPage)
  }

  async fetchVehicles(page: number) {
    console.log("Page demandée :", page);
    if (page < 1 || page > this.totalPages) return;
    const data = await this.vehicleService.getVehicles(page, 10);
    this.listVehicle = data.vehicle;
    this.currentPage = data.currentPage;
    this.totalPages = data.totalPages;
    console.log("Nouvelle page :", this.currentPage, "Total pages :", this.totalPages);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchVehicles(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchVehicles(this.currentPage);
    }
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

  backToHome() {
    this.router.navigate(['/home']);
  }
}
