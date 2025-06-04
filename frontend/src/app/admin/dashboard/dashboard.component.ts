import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule, RouterLink, RouterLinkActive, CommonModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  title: string = 'frontend';
  pageTitle: string = 'USER LIST';
  showMenu: boolean = false;
  isMobile: any;



  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('admin/location')) {
          this.pageTitle = 'LOCATION LIST';
        } else if (event.url.includes('admin/vehicle')) {
          this.pageTitle = 'VEHICLE LIST';
        }
        else {
          this.pageTitle = 'USER LIST';
        }
      }
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu

  }

}
