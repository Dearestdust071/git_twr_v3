import { HabitacionesService } from './../habitaciones/habitaciones.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { Room } from '../habitaciones/Room.model';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css'],
  animations: [
    trigger('tabAnimation', [
      state('void', style({ transform: 'translateX(100%)' })),
      state('*', style({ transform: 'translateX(0%)' })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
  ],
})
export class ReservasComponent {
  habitacionSeleccionada: any = null;

  calcularSubtotal(fechaInicio: string, fechaFin: string): void {
    // Obtener el costo por noche de la habitación seleccionada
    if (this.habitacionSeleccionada) {
      const costoPorNoche = this.habitacionSeleccionada.costo;

      const fechaInicioMs = new Date(fechaInicio).getTime();
      const fechaFinMs = new Date(fechaFin).getTime();
      const tiempoReservaMs = fechaFinMs - fechaInicioMs;

      // Calcular la cantidad de días de la reserva
      const diasReserva = Math.ceil(tiempoReservaMs / (1000 * 60 * 60 * 24));

      // Calcular el subtotal multiplicando los días por el costo por noche
      const subtotal = diasReserva * costoPorNoche;

      // Asignar el subtotal al campo correspondiente en el formulario
      const subtotalInput = document.getElementById('subtotal') as HTMLInputElement;
      subtotalInput.value = subtotal.toString();
    } else {
      console.error('Error: No se ha seleccionado una habitación.');
    }
  }


}
