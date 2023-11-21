import { HabitacionesService } from './../habitaciones/habitaciones.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { Room } from '../habitaciones/Room.model';
@Component({
  selector: 'app-listahabitaciones',
  templateUrl: './listahabitaciones.component.html',
  styleUrls: ['./listahabitaciones.component.css'],
  animations: [
    trigger('tabAnimation', [
      state('void', style({ transform: 'translateX(100%)' })),
      state('*', style({ transform: 'translateX(0%)' })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
  ],
})

export class ListahabitacionesComponent implements OnInit{
  habitaciones: Room[] = [];

  constructor(private router: Router, private habitacionesService: HabitacionesService) {}


  tipoColor(tipo: string): string {
    switch (tipo) {
      case 'Junior':
        return 'tipo-junior';
      case 'Platinum':
        return 'tipo-platinum';
      case 'Master':
        return 'tipo-master';
      default:
        return '';
    }
  }

  ngOnInit(): void {
    this.obtenerHabitacion();
  }

  obtenerHabitacion() {
    this.habitacionesService.getHabitaciones().subscribe(
      (habitaciones: Room[] | any) => {
        this.habitaciones = habitaciones as Room[];
      },
      (error: any) => {
        console.error('Error al obtener las habitaciones', error);
        alert('Error al cargar las habitaciones.');
      }
    );
  }


   reservarHabitacion(habitacion: Room) {
    this.router.navigate(['/reservas', habitacion.id]);
   }

  irAFormulario() {
   this.router.navigate(['/habitaciones/agregar']);
  }


  links = ['landing', 'habitaciones', 'landing', 'landing', 'Login'];
  titles = ['Home a', 'Habitaciones B', 'Servicios C', 'Contacto', 'Login'];
  activeLink = this.links[0];
  myColor = 'primary';

}

