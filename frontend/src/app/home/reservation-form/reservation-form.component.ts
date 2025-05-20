import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {dateIsTodayOrLater, endDateAfterStartDate, requiredValidator} from '../../utils/validators';
import {VehicleService} from '../../services/vehicle.service';
import {SearchParams} from '../../models/search-params.model';
import {LocationService} from '../../services/location.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

export interface Reservation {
  isProfessional: boolean;
  location: string;
  locationId?: number;
  startDate: Date | null;
  endDate: Date | null;
}

@Component({
  standalone: true,
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
  imports: [ReactiveFormsModule]
})
export class ReservationFormComponent implements OnInit {

  private fb: FormBuilder = inject<FormBuilder>(FormBuilder);
  private vehicleService: VehicleService = inject<VehicleService>(VehicleService);
  private locationService: LocationService = inject<LocationService>(LocationService);

  protected reservationForm!: FormGroup;
  protected locations: {id: number, name: string}[] = [];
  protected showLocationsDropdown = false;
  protected selectedLocationId: number | null = null;

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      isProfessional: [false],
      location: ['', requiredValidator()],
      startDate: [null, [requiredValidator(), dateIsTodayOrLater()]],
      endDate: [null, requiredValidator()]
    }, {validators: endDateAfterStartDate()});

    this.reservationForm.get('location')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value: string) => {
          if (value && value.length >= 2) {
            return this.locationService.getBySearch(value);
          }
          this.locations = [];
          this.showLocationsDropdown = false;
          return of([]);
        })
      )
      .subscribe((locations) => {
        this.locations = locations;
        this.showLocationsDropdown = locations.length > 0;
      });
  }

  selectLocation(location: {id: number, name: string}) {
    this.reservationForm.patchValue({location: location.name});
    this.selectedLocationId = location.id;
    this.showLocationsDropdown = false;
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      const reservation: Reservation = {
        ...this.reservationForm.value,
        locationId: this.selectedLocationId
      };
      console.log('Réservation:', reservation);
    } else if (!this.selectedLocationId) {
      console.log('Localisation manquante.');
    } else {
      console.log('Formulaire invalide');
      this.reservationForm.markAllAsTouched();
    }

    const params: SearchParams = {
      isProfessional: this.reservationForm.get('isProfessional')?.value,
      location: this.selectedLocationId!,
      startDate: this.reservationForm.get('startDate')?.value,
      endDate: this.reservationForm.get('endDate')?.value
    }

    this.vehicleService.getVehicleByParma(params);
  }

  setProfessional(value: boolean) {
    this.reservationForm.patchValue({isProfessional: value});
  }
}
