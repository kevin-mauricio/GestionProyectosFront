import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./modules/login/login.component').then(
            m => m.LoginComponent
        ),
    },
    {
        path: 'home',
        loadComponent: () => import('./modules/home/home.component').then(
            m => m.HomeComponent
        ),
        canActivate: [authGuard]
    },
];
