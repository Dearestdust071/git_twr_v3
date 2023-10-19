import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';



@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger('tabAnimation', [
      state('void', style({ transform: 'translateX(100%)' })),
      state('*', style({ transform: 'translateX(0%)' })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
  ],
})
export class LandingPageComponent implements OnInit {

  perro: boolean = true;

  mapValue(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  // Uso de la función mapValue




  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });



  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: 'proyecto_twr/src/assets/fotoHabitacionHotel.jpeg',
      title: 'First slide',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    };
    this.slides[1] = {
      id: 1,
      src: 'proyecto_twr/src/assets/fotoHabitacionHotel.jpeg',
      title: 'Second slide',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
    this.slides[2] = {
      id: 2,
      src: 'proyecto_twr/src/assets/fotoHabitacionHotel.jpeg',
      title: 'Third slide',
      subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    }
  }

  constructor(private router: Router) {
    const habitaciones = { nombre: "Si", descripcion: 'tambien', Precio: 100 }
  }

  veo() {
    console.log(JSON.parse(localStorage.getItem('dataUser') || ''));

  }

  instagram = 1;




  accessData: any = JSON.parse(localStorage.getItem('dataUser') ?? '{}')?.nombre ?? ''

  // var dataUser:any = localStorage.getItem('dataUser');
  // dataUser = JSON.parse(dataUser);
  // console.log(dataUser);
  // this.perro = dataUser.rol;
  // console.log(`Perro es ${this.perro}` );


  habi0 = { nombre: "Habitacion super duper wuhu", descripcion: 'Aqui va la info de los servicios y tenemos muchisimo  git ipsum atque, asperiores obcaecati deleniti, placeat possimus, dolorem cumque', Precio: 101111110 }
  habi1 = { nombre: "Habitacion delujoso", descripcion: 'Aqui va la info de los servicios y tenemos muchisimo  git ipsum atque, asperiores obcaecati deleniti, placeat possimus, dolorem cumque', Precio: 101111110 }
  habi2 = { nombre: "Habitacion delujisidad", descripcion: 'Aqui va la info de los servicios y tenemos muchisimo  git ipsum atque, asperiores obcaecati deleniti, placeat possimus, dolorem cumque', Precio: 101111110 }
  habitaciones = [this.habi0, this.habi1, this.habi2];


  scrollPosition: number = 0;

  // Método decorado con HostListener para detectar el evento de scroll
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    // Obtén la posición actual del scroll
    this.scrollPosition = window.scrollY;
    // Puedes hacer lo que desees con this.scrollPosition
    // Por ejemplo, imprimirlo en la consola
    console.log('Posición de scroll:', this.scrollPosition);
    console.log(this.instagram);

    this.instagram = this.scrollPosition
    console.log(this.instagram);


  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }


  redireccionar() {
    this.router.navigate(['login']);
  }




  links = ['landing', 'habitaciones', 'landing', 'landing', 'Login', 'habitaciones'];
  titles = ['Home', 'Habitaciones', 'Servicios', 'Contacto', 'Login', this.accessData];
  activeLink = this.links[0];
  myColor = 'primary';






}

