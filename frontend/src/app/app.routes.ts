import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: 'user', loadComponent: () => import('./admin/user/user-list.component').then((mod) => mod.UserListComponent) },
  { path: 'location', loadComponent: () => import('./admin/location/location-list.component').then((mod) => mod.LocationListComponent) },
  { path: 'vehicle', loadComponent: () => import('./admin/vehicle/vehicle-list.component').then((mod) => mod.VehicleListComponent) },
];
