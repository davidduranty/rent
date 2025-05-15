import { Component } from '@angular/core';
import {ReservationFormComponent} from './reservation-form/reservation-form.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [ReservationFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
