import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren:() => import('./feature-modules/auth/auth.module').then(m => m.AuthModule),
    },
    {
        path:'services',
        loadChildren: () => import('./feature-modules/services/services.module').then(m => m.ServicesModule),
    },
    { path: '', pathMatch: 'full',redirectTo: '/auth/login' },
    { path: '**', redirectTo: '/auth/404' }
];
