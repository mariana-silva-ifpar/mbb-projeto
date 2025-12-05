import { Routes } from '@angular/router';
import { LoginPage } from './features/login-page/login-page';
import { RegisterPage } from './features/register-page/register-page';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginPage
    },
    {
        path: 'cadastro',
        component: RegisterPage
    }
];
