import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/location.model';



@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {

  @Input() id!: number | undefined;
  @Input() vehicles!: Vehicle;
  @Input() total!: number
  @Output() close = new EventEmitter<void>();



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
    return Number(this.vehicles.price) * this.total;
  }
  cancel() {
    this.close.emit();
  }

}
