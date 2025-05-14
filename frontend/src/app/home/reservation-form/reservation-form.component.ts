import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { dateIsTodayOrLater, endDateAfterStartDate, requiredValidator } from '../../utils/validators';

export interface Reservation {
  isProfessional: boolean;
  location: string;
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
  private fb: FormBuilder = inject(FormBuilder);
  reservationForm!: FormGroup;

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      isProfessional: [false],
      location: ['', requiredValidator()],
      startDate: [null, [requiredValidator(), dateIsTodayOrLater()]],
      endDate: [null, requiredValidator()]
    }, { validators: endDateAfterStartDate() });
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      const reservation: Reservation = this.reservationForm.value;
      console.log('Réservation:', reservation);
    } else {
      console.log('Formulaire invalide');
      this.reservationForm.markAllAsTouched();
    }
  }

  setProfessional(value: boolean) {
    this.reservationForm.patchValue({ isProfessional: value });
  }
}
