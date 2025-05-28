import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'user', loadComponent: () => import('./admin/user/user-list.component').then((mod) => mod.UserListComponent) },
  { path: 'location', loadComponent: () => import('./admin/location/location-list.component').then((mod) => mod.LocationListComponent) },
  { path: 'vehicle', loadComponent: () => import('./admin/vehicle/vehicle-list.component').then((mod) => mod.VehicleListComponent) },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) }
];
