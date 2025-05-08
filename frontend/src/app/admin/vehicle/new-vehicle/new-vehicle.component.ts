import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-vehicle',
  imports: [],
  templateUrl: './new-vehicle.component.html',
  styleUrl: './new-vehicle.component.css'
})
export class NewVehicleComponent {
  @Output() close = new EventEmitter<void>();

  onSubmit() {
    this.close.emit();

  }

  onCancel() {
    this.close.emit();
  }
}
