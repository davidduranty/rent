import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from "./admin/user-list/user-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
