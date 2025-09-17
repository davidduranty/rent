import { Component, EventEmitter, inject, Output } from '@angular/core';
import { LocationService } from '../../../services/location.service';
import { Location } from '../../../models/location.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-location',
  imports: [FormsModule],
  templateUrl: './new-location.component.html',
  styleUrl: './new-location.component.css'
})
export class NewLocationComponent {
  @Output() close = new EventEmitter<void>();
  private locationService = inject(LocationService);
  newLocationDTO: Location = {
    name: '',
    address: '',
    city: '',
    publicHoliday: { monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
    vehicles: []
  };

  onSubmit() {
    this.locationService.addLocation(this.newLocationDTO)
    this.close.emit();
    window.location.reload();

  }

  onCancel() {
    this.close.emit();
  }
}
