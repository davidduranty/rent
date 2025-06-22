import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/location.model';
import { ModalPriceDatailComponent } from "./modal-price-datail/modal-price-datail.component";
import { Router } from '@angular/router';





@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {

  private router = inject(Router)

  private vehicleService = inject(VehicleService)

  @Input() id!: number | undefined;
  @Input() vehicles!: Vehicle;
  @Output() close = new EventEmitter<void>();
  showModal = false;
  showDetail = false;
  public totalDays!: number;

  vehicleInfo: Vehicle = {
    id: 0,
    price: '',
    description: '',
    brand: '',
  }








  ngOnInit(): void {
    if (this.id !== undefined) {
      this.vehicleService.getById(this.id).then((vehicle: Vehicle) => {
        this.vehicles = vehicle
      })
    }
    console.log(this.vehicles)
  }

  totalPrice() {
    if (!this.vehicles || !this.vehicles.price) return 0;
    return Number(this.vehicles.price) * this.vehicleService.totalDays;
  }
  cancel() {
    this.close.emit();
  }

  openDetail() {
    this.router.navigate(['modal-price-datail/', this.id]);
  }


  closeModal() {
    this.showModal = false;
  }

}
