import { Component, inject } from '@angular/core';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { LoginComponent } from "../login/login.component";
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [ReservationFormComponent, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private router = inject(Router);
  login: boolean = false;

  openLogin() {
    this.login = true;
    this.router.navigate(['login']);
  }

  closeLogin() {
    this.router.navigate(['/home']);
  }
}
