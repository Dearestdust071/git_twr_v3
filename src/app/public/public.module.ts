import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardsHabitacionesComponent } from './cards-habitaciones/cards-habitaciones.component';
import { MaterialModule } from '../material/material.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PublicRoutingModule } from './public_routing.module';
import { LoginComponent } from './login/login.component';
import { RecaptchaModule } from "ng-recaptcha";
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListahabitacionesComponent } from './listahabitaciones/listahabitaciones.component';
import { ReservasComponent } from './reservas/reservas.component';
// import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@NgModule({
  declarations: [
    CardsHabitacionesComponent,
    LandingPageComponent,
    LoginComponent,
    HabitacionesComponent,
    HeaderComponent,
    FooterComponent,
    ListahabitacionesComponent,
    ReservasComponent
  ],
  imports: [
    MaterialModule,
    PublicRoutingModule,
    CommonModule,
    RecaptchaModule,
  ],

})
export class publicModule {

 }
