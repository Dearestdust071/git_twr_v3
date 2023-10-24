import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HabitacionesService } from './habitaciones.service';
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
      // id: [null],
      nombre: ['', [Validators.required]],
      capacidad: [1, [Validators.required, Validators.min(1)]],
      extensionTelefonica: ['', [Validators.required]],
      camas: ['', [Validators.required]],
      tipo: ['', Validators.required],
      costo: [0, [Validators.required, Validators.min(0)]],
      ocupada: [false, [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagenes: [''],
      inventario: this.fb.array([]),
      servicios: this.fb.array([])
    });
  }
  guardarHabitacion() {
    if (this.habitacionForm.invalid) {
      console.log("El formulario es inválido. Completa todos los campos.");
      return;
    }

    const formData = this.habitacionForm.value;
    console.log(formData);
  }

  ngOnInit(): void {
    this.habitacionesService.getServicios().subscribe((servicios) => {
      this.serviciosDisponibles = servicios;
    });

    this.habitacionesService.getInventario().subscribe((inventario) => {
      this.inventarioDisponible = inventario;
    });
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

  links = ['landing', 'habitaciones', 'landing', 'landing', 'Login'];
  titles = ['Home a', 'Habitaciones B', 'Servicios C', 'Contacto', 'Login'];
  activeLink = this.links[0];
  myColor = 'primary';

}
