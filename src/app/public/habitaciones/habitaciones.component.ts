import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HabitacionesService } from './habitaciones.service';
import { Room } from './Room.model';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css'],
  animations: [
    trigger('tabAnimation', [
      state('void', style({ transform: 'translateX(100%)' })),
      state('*', style({ transform: 'translateX(0%)' })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
  ],
})
export class HabitacionesComponent implements OnInit {
  habitacionForm: FormGroup;
  serviciosDisponibles: any[] = [];
  inventarioDisponible: any[] = [];

  constructor(private fb: FormBuilder, private habitacionesService: HabitacionesService) {
    this.habitacionForm = this.fb.group({
      nombre: ['', [Validators.required]],
      capacidad: [1, [Validators.required, Validators.min(1)]],
      extensionTelefonica: ['', [Validators.required]],
      camas: ['', [Validators.required]],
      tipo: ['', Validators.required],
      costo: [100, [Validators.required, Validators.min(100)]],
      ocupada: [false, [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagenes: [''],
      inventario: this.fb.array([]),
      servicios: this.fb.array([])
    });
  }

  habitacionSeleccionada: boolean = false;

  ngOnInit(): void {
    this.habitacionesService.getServicios().subscribe((servicios) => {
      this.serviciosDisponibles = servicios;
    });

    this.habitacionesService.getInventario().subscribe((inventario) => {
      this.inventarioDisponible = inventario;
    });
  }

  guardarHabitacion() {
    if (this.habitacionForm.invalid) {
      console.log("El formulario es inválido. Completa todos los campos.");
      return;
    }
    const formData = this.habitacionForm.value;
    console.log(formData);

    this.habitacionesService.crearHabitacion(formData).subscribe(
      (habitacionCreada: Room) => {
        console.log("Habitación creada:", habitacionCreada);
      },
      (error) => {
        console.error("Error al crear la habitación:", error);
      }
    );
  }



  decrementarCapacidad() {
    const capacidadControl = this.habitacionForm.get('capacidad');
    if (capacidadControl) {
      const capacidad = capacidadControl.value;
      if (capacidad > 1) {
        capacidadControl.setValue(capacidad - 1);
      }
    }
  }

  incrementarCapacidad() {
    const capacidadControl = this.habitacionForm.get('capacidad');
    if (capacidadControl) {
      const capacidad = capacidadControl.value;
      capacidadControl.setValue(capacidad + 1);
    }
  }

  decrementarCosto() {
    const costoControl = this.habitacionForm.get('costo');
    if (costoControl) {
      const costo = costoControl.value;
      if (costo > 1) {
        costoControl.setValue(costo - 1);
      }
    }
  }

  incrementarCosto() {
    const costoControl = this.habitacionForm.get('costo');
    if (costoControl) {
      const costo = costoControl.value;
      costoControl.setValue(costo + 1);
    }
  }


  get servicios() {
    return this.habitacionForm.get('servicios') as FormArray;
  }

  get inventario() {
    return this.habitacionForm.get('inventario') as FormArray;
  }

  agregarServicio() {
    this.servicios.push(this.fb.control('', Validators.required));
  }

  agregarInventario() {
    this.inventario.push(this.fb.control('', Validators.required));
  }

  crearHabitacion() {
    this.habitacionSeleccionada = true;
    if (this.habitacionForm.invalid) {
      console.log("El formulario es inválido. Completa todos los campos.");
      return;
    }

    const formData = this.habitacionForm.value;

    this.habitacionesService.crearHabitacion(formData).subscribe(
      (nuevaHabitacion) => {
        console.log("Habitación creada:", nuevaHabitacion);
      },
      (error) => {
        console.error("Error al crear la habitación:", error);
      }
    );
  }

  actualizarHabitacion() {
    if (this.habitacionForm.invalid) {
      console.log("El formulario es inválido. Completa todos los campos.");
      return;
    }

    const formData = this.habitacionForm.value;
    const habitacionId = this.habitacionForm.get('id')?.value;

    this.habitacionesService.actualizarHabitacion(habitacionId, formData).subscribe(
      (habitacionActualizada: Room) => {
        console.log("Habitación actualizada:", habitacionActualizada);
      },
      (error) => {
        console.error("Error al actualizar la habitación:", error);
      }
    );
  }

  eliminarHabitacion() {

    const habitacionId = this.habitacionForm.get('id')?.value;

    this.habitacionesService.eliminarHabitacion(habitacionId).subscribe(
      () => {
        console.log("Habitación eliminada correctamente");
      },
      (error) => {
        console.error("Error al eliminar la habitación:", error);
      }
    );
  }

  seleccionarHabitacion() {
    this.habitacionSeleccionada = true;
  }

  deseleccionarHabitacion() {
    this.habitacionSeleccionada = false;
}

  links = ['landing', 'habitaciones', 'landing', 'landing', 'Login'];
  titles = ['Home a', 'Habitaciones B', 'Servicios C', 'Contacto', 'Login'];
  activeLink = this.links[0];
  myColor = 'primary';

}
