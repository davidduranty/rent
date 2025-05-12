import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-vehicle',
  imports: [CommonModule],
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
