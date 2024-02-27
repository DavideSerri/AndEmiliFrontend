import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CardsComponent } from './cards/cards.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: 'cards', component: CardsComponent},
    {path: 'home/:userId', component: HomeComponent}
];
