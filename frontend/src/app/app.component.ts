import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet, Router, NavigationEnd, RouterLinkActive } from '@angular/router';
import { LoginComponent } from "./login/login.component";


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'frontend';
  pageTitle: string = 'USER LIST';
  showMenu: boolean = false;
  isMobile: any;



  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('location')) {
          this.pageTitle = 'LOCATION LIST';
        } else if (event.url.includes('vehicle')) {
          this.pageTitle = 'VEHICLE LIST';
        } else if (event.url.includes('home')) {
          this.pageTitle = 'HOME';
        } else {
          this.pageTitle = 'USER LIST';
        }
      }
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu

  }



}
