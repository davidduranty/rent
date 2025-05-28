import { Component } from '@angular/core';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { LoginComponent } from "../login/login.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [ReservationFormComponent, LoginComponent, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  login: boolean = false;

  openLogin() {
    this.login = true;
  }

  closeLogin() {
    this.login = false;
  }
}
