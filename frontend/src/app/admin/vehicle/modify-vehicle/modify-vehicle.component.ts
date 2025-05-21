import { Component, EventEmitter, inject, Input, model, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Vehicle } from '../../../models/location.model';
import { VehicleService } from '../../../services/vehicle.service';

@Component({
  selector: 'app-modify-vehicle',
  imports: [ReactiveFormsModule],
  templateUrl: './modify-vehicle.component.html',
  styleUrl: './modify-vehicle.component.css'
})
export class ModifyVehicleComponent {
  @Output() close = new EventEmitter<boolean>();
  @Input({ required: true }) vehicle!: Vehicle

  private vehicleService = inject(VehicleService)

  private fb: FormBuilder = inject(FormBuilder);
  updateForm!: FormGroup;

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      id: new FormControl(this.vehicle.id, [Validators.required]),
      brand: new FormControl(this.vehicle.brand, [Validators.required]),
      model: new FormControl(this.vehicle.model, [Validators.required]),
      image: new FormControl(this.vehicle.image, [Validators.required]),
      transmition: new FormControl(this.vehicle.transmition, [Validators.required]),
      place: new FormControl(this.vehicle.place, [Validators.required]),
      available: new FormControl(this.vehicle.available, [Validators.required]),
      type: new FormControl(this.vehicle.type, [Validators.required]),

    });
  }

  onSubmit() {
    if (this.updateForm.invalid) {
      console.log("Formulaire invalide");
      return;
    }
    const updated = {
      id: this.updateForm.get("id")?.value,
      brand: this.updateForm.get("brand")?.value,
      model: this.updateForm.get("model")?.value,
      image: this.updateForm.get("image")?.value,
      transmition: this.updateForm.get("transmition")?.value,
      place: this.updateForm.get("place")?.value,
      available: this.updateForm.get("available")?.value,
      type: this.updateForm.get("type")?.value,
    };
    this.vehicleService.updateVehicle(updated.id, updated).then(() => {
    });
    this.close.emit(false);
    window.location.reload();


  }

  onCancel() {
    this.close.emit(false);
  }
}
