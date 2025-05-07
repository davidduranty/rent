import {Routes} from '@angular/router';
import {UserListComponent} from './admin/user-list/user-list.component';
import {LocationListComponent} from './admin/location-list/location-list.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
  {path: 'user', component: UserListComponent},
  {path: 'location', component: LocationListComponent}
];

