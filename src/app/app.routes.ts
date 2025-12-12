import { Routes } from '@angular/router';
import { LoginPage } from './features/login-page/login-page';
import { RegisterPage } from './features/register-page/register-page';
import { Menu } from './features/menu/menu';
import { Wishlist } from './features/wishlist/wishlist';

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
    },
    {
        path: 'inicio',
        component: Menu
    }
];
