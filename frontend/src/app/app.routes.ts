import { Routes } from '@angular/router';
import { UserListComponent } from './admin/user/user-list.component';
import { LocationListComponent } from './admin/location/location-list.component';

export const routes: Routes = [
  { path: 'user', component: UserListComponent },
  { path: 'location', component: LocationListComponent }
];
