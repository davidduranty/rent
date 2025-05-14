import {Component} from '@angular/core';
import {RouterOutlet, Router, NavigationEnd} from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'frontend';
  pageTitle: string = 'USER LIST';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.pageTitle = event.url.includes('location') ? 'LIST LOCATIONS' : 'LIST USERS';
      }
    });
  }

}
