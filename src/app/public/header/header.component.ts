import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('tabAnimation', [
      state('void', style({ transform: 'translateX(100%)' })),
      state('*', style({ transform: 'translateX(0%)' })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
  ],
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



  @Input() scroll:any;

  accessData: any =JSON.parse(localStorage.getItem('dataUser') ?? '{}')?.nombre ?? '';

  links = ['landing', 'habitaciones', 'landing', 'landing', 'Login', 'landing'];
  titles = ['Home', 'Habitaciones', 'Servicios', 'Contacto', 'Login', this.accessData];
  activeLink = this.links[0];
  // myColor = 'primary';

}
