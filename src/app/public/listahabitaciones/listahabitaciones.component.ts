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

export class ListahabitacionesComponent implements OnInit {
  habitaciones: Room[] = [];

  constructor(private router: Router,
    private habitacionesService: HabitacionesService) { }

  ngOnInit(): void {
    this.obtenerHabitaciones();
  }

  obtenerHabitaciones(): void {
    this.habitacionesService.getHabitaciones().subscribe({
      next: (habitaciones: Room[]) => {
        this.habitaciones = habitaciones.map((habitacion: Room) => {
          this.habitacionesService.getServicios().subscribe({
            next: (servicios: string[]) => {
              // console.log(servicios);
              habitacion.servicios = servicios.map((servicio: any) => (servicio.nombre));
              // console.log(habitacion.servicios);
            },
            error: (error: any) => {
              console.error('Error al obtener servicios:', error);
            }
          });

          this.habitacionesService.getInventario().subscribe({
            next: (inventario: string[]) => {
              // Mapear los datos de inventario a objetos Inventario
              habitacion.inventario = inventario.map((item: any) => (item.nombre));
            },
            error: (error: any) => {
              console.error('Error al obtener inventario:', error);
            }
          });

          this.obtenerImagenes();
          return habitacion;
        });
      },
      error: (error: any) => {
        console.error('Error al obtener las habitaciones:', error);
        alert('Error al cargar las habitaciones.');
      }
    });
  }

  obtenerImagenes(): void {
    this.habitacionesService.getImagenesTipo().subscribe({
      next: (imagenes: any[]) => {
        this.habitaciones.forEach(habitacion => {
          const imagen = imagenes.find(img => img.id_tipo_habitacion === habitacion.Tipo_habitacion);
          // console.log("arreglo", imagen);
          // console.log("habitacion...", habitacion.Tipo_habitacion);

          if (imagen) {
            habitacion.imagen = imagen.imagen;
          }
        });
      },
      error: (error: any) => {
        console.error('Error al obtener las imágenes:', error);
        alert('Error al cargar las imágenes.');
      }
    });
  }

  deatallesHabitacion(habitacion: Room) {

  }

  irAFormulario() {
    this.router.navigate(['/habitaciones/agregar']);
  }


  links = ['landing', 'habitaciones', 'landing', 'landing', 'Login'];
  titles = ['Home a', 'Habitaciones B', 'Servicios C', 'Contacto', 'Login'];
  activeLink = this.links[0];
  myColor = 'primary';

}

