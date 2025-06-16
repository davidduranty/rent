import { Routes } from '@angular/router';
// import { AdminMatchGuard } from './guards/admin-match.guard';



export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component').then((mod) => mod.HomeComponent) },

  { path: 'login', loadComponent: () => import('./login/login.component').then((mod) => mod.LoginComponent) },
  { path: 'register', loadComponent: () => import('./auth/register/register.component').then((mod) => mod.RegisterComponent) },
  { path: 'professionnal', loadComponent: () => import('./professionnal/professionnal.component').then((mod) => mod.ProfessionnalComponent) },
  // { path: 'new-professionnal', loadComponent: () => import('./professionnal/new-professionnal/new-professionnal.component').then((mod) => mod.NewProfessionnalComponent) },
  { path: 'find-email', loadComponent: () => import('./find-email/find-email.component').then((mod) => mod.FindEmailComponent) },
  { path: 'list-vehicle', loadComponent: () => import('./vehicle-list/vehicle-list.component').then((mod) => mod.VehicleListComponent) },


  {
    path: 'admin', loadComponent: () => import('./admin/dashboard/dashboard.component').then((mod) => mod.DashboardComponent), children: [
      {
        path: 'user', loadComponent: () => import('./admin/user/user-list.component').then((mod) => mod.UserListComponent),
        // canMatch: [AdminMatchGuard]
      },
      { path: 'location', loadComponent: () => import('./admin/location/location-list.component').then((mod) => mod.LocationListComponent) },
      { path: 'vehicle', loadComponent: () => import('./admin/vehicle/vehicle-list.component').then((mod) => mod.VehicleListComponent) },
      { path: 'professionnal', loadComponent: () => import('./admin/professionnal/professionnal.component').then((mod) => mod.ProfessionnalComponent) },
      { path: 'new-professionnal', loadComponent: () => import('./admin/professionnal/new-professionnal/new-professionnal.component').then((mod) => mod.NewProfessionnalComponent) },
    ]
  },
];
