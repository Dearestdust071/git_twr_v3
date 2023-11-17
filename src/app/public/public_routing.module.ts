import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CardsHabitacionesComponent } from './cards-habitaciones/cards-habitaciones.component';
import { LoginComponent } from './login/login.component';
import { ListahabitacionesComponent } from './listahabitaciones/listahabitaciones.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { ReservasComponent } from './reservas/reservas.component';
const routes: Routes = [

  {
    path:'',
    children:[
      {path: 'landing', component: LandingPageComponent},
      // {path: 'list', component: HeaderComponent},
      {path: 'cards', component: CardsHabitacionesComponent},
      {path: 'Login', component: LoginComponent},
      {path: 'habitaciones' , component: ListahabitacionesComponent},
      {path: 'habitaciones/agregar', component: HabitacionesComponent },
      {path: 'reservas', component: ReservasComponent},
      {path: '**', redirectTo: 'landing'},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
