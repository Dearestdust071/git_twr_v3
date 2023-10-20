import { Component, Input, OnInit } from '@angular/core';
 import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
  constructor(private fb: FormBuilder) {
    this.habitacionForm = this.fb.group({
      // id: [null],
      nombre: ['',[Validators.required]],
      capacidad: [1, [Validators.required, Validators.min(1)]],
      extensionTelefonica: ['',[Validators.required]],
      camas: ['',[Validators.required]],
      tipo: ['', Validators.required],
      costo: [0, [Validators.required, Validators.min(0)]],
      ocupada: [false],
      descripcion: ['', [Validators.required]],
      imagenes: [''],
      inventario: [''],
      servicios: ['',[Validators.required]],
    });
  }
  guardarHabitacion() {

    if(this.habitacionForm.invalid){
      console.log("Es invalido el formulario llenalo todo");
      return
    }

    const formData = this.habitacionForm.value;
    console.log(formData);





  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const imagenesControl = this.habitacionForm.get('imagenes');
      if (imagenesControl) {
        // Asumiendo que tienes un elemento HTML para mostrar la imagen con el ID "imagenPreview".
        const reader = new FileReader();
        reader.onload = (e: any) => {
          document.getElementById('imagenPreview')?.setAttribute('src', e.target.result);
          imagenesControl.setValue(file.name || e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  agregarInventario() {
    const inventarioArray = this.habitacionForm.get('inventario') as FormArray;
    inventarioArray.push(this.fb.group({
      nombre: [''],
      cantidad: [0],
    }));
  }
  ngOnInit(): void {
  }

  links = ['landing', 'habitaciones', 'landing', 'landing', 'Login'];
  titles = ['Home a', 'Habitaciones B', 'Servicios C', 'Contacto', 'Login'];
  activeLink = this.links[0];
  myColor = 'primary';

}
