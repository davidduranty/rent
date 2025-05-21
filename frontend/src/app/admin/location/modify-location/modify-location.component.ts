import { Component, EventEmitter, inject, Input, input, InputSignal, OnInit, Output, signal } from '@angular/core';
import { Location } from '../../../models/location.model';


import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-modify-location',
  imports: [ReactiveFormsModule],
  templateUrl: './modify-location.component.html',
  styleUrl: './modify-location.component.css'
})
export class ModifyLocationComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  @Input({ required: true }) location!: Location

  // public location: InputSignal<Location> = input.required<Location>();

  private locationService = inject(LocationService);


  // private id = signal<number>(0);


  private fb: FormBuilder = inject(FormBuilder);
  updateForm!: FormGroup;

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      id: new FormControl(this.location.id, [Validators.required]),
      name: new FormControl(this.location.name, [Validators.required]),
      address: new FormControl(this.location.address, [Validators.required]),
      city: new FormControl(this.location.city, [Validators.required]),
      zipCode: new FormControl(this.location.zipCode, [Validators.required]),
    });
  }


  onSubmit() {
    if (this.updateForm.invalid) {
      console.log("Formulaire invalide");
      return;
    }
    const updated = {
      id: this.updateForm.get("id")?.value,
      name: this.updateForm.get("name")?.value,
      address: this.updateForm.get("address")?.value,
      city: this.updateForm.get("city")?.value,
      zipCode: this.updateForm.get("zipCode")?.value,
    };
    this.locationService.updateLocation(updated.id, updated).then(() => {
    });
    this.close.emit(false);
    window.location.reload();


  }

  onCancel() {
    this.close.emit(false);
  }



}
