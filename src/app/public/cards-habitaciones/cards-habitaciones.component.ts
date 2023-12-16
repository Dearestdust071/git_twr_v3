import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards-habitaciones',
  templateUrl: './cards-habitaciones.component.html',
  styleUrls: ['./cards-habitaciones.component.css']
})
export class CardsHabitacionesComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() habitaciones: any;


  ngOnInit(): void {
  }

  prueba = "aaa"

  reservarHabitacion() {
    this.router.navigate(['/reservas']);
  }


}
