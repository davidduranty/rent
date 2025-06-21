import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from '../../../models/location.model';



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
  private router = inject(Router)
  // public totalDaysPriceDetail!: number;



  ngOnInit(): void {
    console.log("jours: " + this.inputTotalModalPriceDetail)

  }
  back() {
    // this.close.emit();
    this.router.navigate(['list-vehicle']);
  }


}
