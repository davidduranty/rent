import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from '../../../models/location.model';
import { VehicleService } from '../../../services/vehicle.service';



@Component({
  selector: 'app-modal-price-datail',
  imports: [],
  templateUrl: './modal-price-datail.component.html',
  styleUrl: './modal-price-datail.component.css'
})
export class ModalPriceDatailComponent implements OnInit {

  public priceVehicle!: number
  vehicleService = inject(VehicleService)
  private router = inject(Router)
  private readonly route = inject(ActivatedRoute)

  // public totalDaysPriceDetail!: number;



  ngOnInit(): void {
    console.log("jours: " + this.vehicleService.totalDays)
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.vehicleService.getByPrice(id).then((price: number | null) => {
      this.priceVehicle = price ?? NaN
    })
  }
  back() {
    // this.close.emit();
    this.router.navigate(['list-vehicle']);
  }


}
