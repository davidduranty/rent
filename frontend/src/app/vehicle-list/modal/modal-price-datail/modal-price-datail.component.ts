import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from '../../../models/location.model';
import { VehicleService } from '../../../services/vehicle.service';



@Component({
  selector: 'app-modal-price-datail',
  imports: [],
  templateUrl: './modal-price-datail.component.html',
  styleUrl: './modal-price-datail.component.css'
})
export class ModalPriceDatailComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() id!: number | undefined;
  @Input() vehicles!: Vehicle;
  @Input() inputTotalModalPriceDetail!: number
  private vehicleService = inject(VehicleService)
  private router = inject(Router)
  // public totalDaysPriceDetail!: number;



  ngOnInit(): void {
    console.log("jours: " + this.inputTotalModalPriceDetail)
    // if (this.id !== undefined) {
    //   this.vehicleService.getById(this.id).then((vehicle: Vehicle) => {
    //     this.vehicles = vehicle

    //   })
    // }
    // console.log(this.vehicles)
  }
  back() {
    // this.close.emit();
    this.router.navigate(['list-vehicle']);
  }


}
