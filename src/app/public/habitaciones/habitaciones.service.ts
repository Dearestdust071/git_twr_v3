import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {

  constructor() { }
  getServicios(): Observable<string[]> {
    const servicios: string[] = [''];
    return of(servicios);
  }

  getInventario(): Observable<string[]> {
    const inventario: string[] = [''];
    return of(inventario);
  }
}
