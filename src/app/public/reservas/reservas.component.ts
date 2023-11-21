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
  habitacionSeleccionada: Room | null = null;

  constructor(private habitacionesService: HabitacionesService,private router: Router) {}

  calcularSubtotal(fechaInicio: string, fechaFin: string): void {
    if (this.habitacionSeleccionada) {
      const costoPorNoche = this.habitacionSeleccionada.costo;
      const fechaInicioMs = new Date(fechaInicio).getTime();
      const fechaFinMs = new Date(fechaFin).getTime();
      const tiempoReservaMs = fechaFinMs - fechaInicioMs;
      const diasReserva = Math.ceil(tiempoReservaMs / (1000 * 60 * 60 * 24));
      const subtotal = diasReserva * costoPorNoche;
      const subtotalInput = document.getElementById('subtotal') as HTMLInputElement;
      subtotalInput.value = subtotal.toString();
    } else {
      console.error('Error: No se ha seleccionado una habitación.');
    }
  }

  seleccionarHabitacion(habitacion: Room): void {
    this.habitacionSeleccionada = habitacion;
  }

  obtenerHabitaciones(): void {
    this.habitacionesService.getHabitaciones().subscribe(
      (response: any) => {
        const habitaciones: Room[] = response.habitaciones;
        console.log(habitaciones);
      },
      (error: any) => {
        console.error('Error al obtener las habitaciones:', error);
      }
    );
  }
  ngOnInit(): void {
    this.obtenerHabitaciones();
  }

  irAPago(){
    this.router.navigate(['']);
  }
}
