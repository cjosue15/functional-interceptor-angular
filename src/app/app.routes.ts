import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component'),
  },
  {
    path: '',
    loadComponent: () => import('./products/products.component'),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
