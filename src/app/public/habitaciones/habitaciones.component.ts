import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HabitacionesService } from './habitaciones.service';
import { Room } from './Room.model';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
  public habitacionForm: FormGroup;
  serviciosDisponibles: any[] = [];
  habitacionesDisponibles: any[] = [];
  inventarioDisponible: any[] = [];
  public Editor: any;

  constructor(
    private fb: FormBuilder,
    private habitacionesService: HabitacionesService,
    private router: Router) {
    this.Editor = ClassicEditor;
    this.habitacionForm = this.fb.group({
      nombre: ['', [Validators.required]],
      capacidad: [1, [Validators.required, Validators.min(1)]],
      extensionTelefonica: ['', [Validators.required]],
      camas: ['', [Validators.required]],
      tipo: ['', Validators.required],
      total: [100, [Validators.required, Validators.min(100)]],
      descripcion: [new FormControl(''), [Validators.required]],
      imagenes: [''],
      inventario: this.fb.array([]),
      servicios: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.cargarDatosIniciales();
    this.Editor
      .create(document.querySelector('#editor'), this.editorConfig)
      .then((editor: any) => {
        this.Editor = editor;
      })
      .catch((error: any) => {
        console.error(error);
      });
  };


  onEditorChange(event: any) {
    this.habitacionForm.get('descripcion')?.setValue(event.editor.getData());
  }

  public editorConfig = {
    toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'undo', 'redo'],
  };

  cargarDatosIniciales(): void {
    this.habitacionesService.getHabitaciones().subscribe(
      (habitaciones: Room[]) => {
        this.habitacionesDisponibles = habitaciones;
      },
      (error: any) => {
        console.error('Error al obtener las habitaciones', error);
        alert('Error al cargar las habitaciones.');
      }
    );

    this.habitacionesService.getServicios().subscribe((servicios: any) => {
      this.serviciosDisponibles = servicios;
    });

    this.habitacionesService.getInventario().subscribe((inventario: any) => {
      this.inventarioDisponible = inventario;
    });
  }

  guardarHabitacion(): void {
    if (this.habitacionForm.invalid) {
      console.log("El formulario es inválido. Completa todos los campos.");
      return;
    }

    const formData = this.habitacionForm.value;

    this.habitacionesService.createHabitacion(formData).subscribe(
      (habitacionCreada: Room) => {
        console.log("Habitación creada:", habitacionCreada);
        this.router.navigate(['/habitaciones']);
      },
      (error) => {
        console.error("Error al crear la habitación:", error);
      }
    );
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

  inventarios() {
    return this.habitacionForm.controls['inventario'] as FormArray;
  }
  servicio() {
    return this.habitacionForm.controls['servicios'] as FormArray;
  }

  actualizarHabitacion() {
    if (this.habitacionForm.invalid) {
      console.log("El formulario es inválido. Completa todos los campos.");
      return;
    }

    const formData = this.habitacionForm.value;
    const habitacionId = this.habitacionForm.get('id')?.value;

    this.habitacionesService.updateHabitacion(habitacionId, formData).subscribe(
      (habitacionActualizada: any) => {
        console.log("Habitación actualizada:", habitacionActualizada);
        this.router.navigate(['/habitaciones']);
      },
      (error) => {
        console.error("Error al actualizar la habitación:", error);
      }
    );
  }

  eliminarHabitacion() {
    const habitacionId = this.habitacionForm.get('id')?.value;

    this.habitacionesService.deleteHabitacion(habitacionId).subscribe(
      () => {
        console.log("Habitación eliminada correctamente");
        this.router.navigate(['/habitaciones']);
      },
      (error) => {
        console.error("Error al eliminar la habitación:", error);
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
    const totalControl = this.habitacionForm.get('total');
    if (totalControl) {
      const total = totalControl.value;
      if (total > 1) {
        totalControl.setValue(total - 50);
      }
    }
  }

  incrementarCosto() {
    const totalControl = this.habitacionForm.get('total');
    if (totalControl) {
      const total = totalControl.value;
      totalControl.setValue(total + 50);
    }
  }


  links = ['landing', 'habitaciones', 'landing', 'landing', 'Login'];
  titles = ['Home a', 'Habitaciones B', 'Servicios C', 'Contacto', 'Login'];
  activeLink = this.links[0];
  myColor = 'primary';

}
