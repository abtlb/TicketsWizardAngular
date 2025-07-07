import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventsComponent } from './event/events/events.component';
import { DetailsComponent } from './event/details/details.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { RecieptComponent } from './reciept/reciept.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch:'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'events', component: EventsComponent},
    {path: 'event/details/:id', component: DetailsComponent},
    {path: 'reciept/:id', component: RecieptComponent}, 
    {path: 'mytickets', component: MyTicketsComponent}, 
    // {path: '**', component: HomeComponent},
];
