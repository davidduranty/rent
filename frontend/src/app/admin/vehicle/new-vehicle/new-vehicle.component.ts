import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { VehicleService } from '../../../services/vehicle.service';
import { Vehicle } from '../../../models/location.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-vehicle',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-vehicle.component.html',
  styleUrl: './new-vehicle.component.css'
})
export class NewVehicleComponent {
  @Output() close = new EventEmitter<void>();
  private vehicleService = inject(VehicleService)
  newVehicleDTO: Vehicle = {
    brand: '',
    model: '',
    image: '',
    transmition: '',
    place: 5,
    type: "",
    available: false
  };

  onSubmit() {
    this.vehicleService.addVehicle(this.newVehicleDTO)
    this.close.emit();
    window.location.reload();
  }

  onCancel() {
    this.close.emit();
  }
}
