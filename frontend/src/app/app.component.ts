import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd, RouterLinkActive } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'frontend';
  pageTitle: string = 'USER LIST';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('location')) {
          this.pageTitle = 'LOCATION LIST';
        } else if (event.url.includes('vehicle')) {
          this.pageTitle = 'VEHICLE LIST';
        } else {
          this.pageTitle = 'USER LIST';
        }
      }
    });
  }

}
