import { Component, EventEmitter, Output } from '@angular/core';
import { Location } from '../../../models/location.model';

@Component({
  selector: 'app-modify-location',
  imports: [],
  templateUrl: './modify-location.component.html',
  styleUrl: './modify-location.component.css'
})
export class ModifyLocationComponent {
  @Output() close = new EventEmitter<void>();
  locationList: Location[] = [];


  onSubmit() {
    this.close.emit();

  }

  onCancel() {
    this.close.emit();
  }
}
