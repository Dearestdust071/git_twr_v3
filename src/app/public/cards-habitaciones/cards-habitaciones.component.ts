import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-habitaciones',
  templateUrl: './cards-habitaciones.component.html',
  styleUrls: ['./cards-habitaciones.component.css']
})
export class CardsHabitacionesComponent implements OnInit {

  constructor() { }

  @Input() habitaciones: any;


  ngOnInit(): void {
  }

}
