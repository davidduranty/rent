import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/location.model';
import { Router } from '@angular/router';
import { ModalPriceDatailComponent } from "./modal-price-datail/modal-price-datail.component";




@Component({
  selector: 'app-modal',
  imports: [ModalPriceDatailComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {

  @Input() id!: number | undefined;
  @Input() vehicles!: Vehicle;
  @Input() inputTotalModal!: number
  @Output() close = new EventEmitter<void>();
  showModal = false;
  public totalDays!: number;

  vehicleInfo: Vehicle = {
    id: 0,
    price: '',
    description: '',
    brand: '',
  }


  private router = inject(Router)



  private vehicleService = inject(VehicleService)

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
    return Number(this.vehicles.price) * this.inputTotalModal;
  }
  cancel() {
    this.close.emit();
  }

  openDetail() {
    this.router.navigate(['modal-price-datail']);
  }

  closeModal() {
    this.showModal = false;
  }

}
