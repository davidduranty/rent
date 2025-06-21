import { Component, inject, Input, OnInit } from '@angular/core';
import { Data, Vehicle } from '../models/location.model';
import { VehicleService } from '../services/vehicle.service';
import { throwError } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "./modal/modal.component";
import { ModalPriceDatailComponent } from "./modal/modal-price-datail/modal-price-datail.component";

@Component({
  selector: 'app-vehicle-list',
  imports: [RouterLink, CommonModule, ModalComponent, ModalPriceDatailComponent],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent implements OnInit {
  @Input() id!: number;
  vehicles: Vehicle[] = [];
  public dataList: Data[] = [];
  showModal = false;
  public totalDayslistVehicule: number = 0;


  private vehicleService = inject(VehicleService)
  private dataService = inject(DataService)

  vehicleInfo: Vehicle = {
    id: 0,
    price: '',
    description: '',
    brand: '',
  }

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

  async openInfo(id?: number) {
    if (id === undefined) return;

    try {
      const dates = this.dataList[0];
      this.getNumberOfDays(dates.startDate, dates.endDate);
      console.log(this.totalDayslistVehicule)
      const vehicule = await this.vehicleService.getById(id);
      this.showModal = true;
      this.vehicleInfo = vehicule;
    } catch (error) {
      console.error('Erreur lors de la récupération du véhicule :', error);
    }
  }

  closeModal() {
    this.showModal = false;
  }

  getNumberOfDays(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    this.totalDayslistVehicule = diffDays;
    console.log("sup" + this.totalDayslistVehicule);
    return diffDays;
  }

}
