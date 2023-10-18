
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
import { CarouselModule } from '@coreui/angular';
// import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@NgModule({
  declarations: [
    CardsHabitacionesComponent,
    LandingPageComponent,
    LoginComponent,
    HabitacionesComponent,
    HeaderComponent,
    FooterComponent,


  ],
  imports: [
    MaterialModule,
    PublicRoutingModule,
    CommonModule,
    RecaptchaModule,
    CarouselModule
  ],

})
export class publicModule {

 }
