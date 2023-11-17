import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from './Room.model';
import { Service } from './Services.model';
import { Inventario } from './Inventario.model';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {
  private baseUrl = 'http://localhost/ws_hotel/controller/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  private getUrl(modelo: string, accion: string): string {
    return `${this.baseUrl}${modelo}.php?opcion=${accion}`;
  }

  getServicios(): Observable<Service[]> {
    return this.http.get<Service[]>(this.getUrl('servicios', 'listar'), this.httpOptions);
  }

  getInventario(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(this.getUrl('inventario', 'listar'), this.httpOptions);
  }

  getHabitaciones(): Observable<Room[]> {
    return this.http.get<Room[]>(this.getUrl('habitaciones', 'listar'), this.httpOptions);
  }

  getHabitacion(id: number): Observable<Room> {
    return this.http.get<Room>(this.getUrl('habitaciones', 'detalle') + `&id=${id}`, this.httpOptions);
  }

  crearHabitacion(habitacion: Room): Observable<Room> {
    return this.http.post<Room>(this.getUrl('habitaciones', 'crear'), habitacion, this.httpOptions);
  }

  actualizarHabitacion(id: number, habitacion: Room): Observable<Room> {
    return this.http.put<Room>(this.getUrl('habitaciones', 'actualizar') + `&id=${id}`, habitacion, this.httpOptions);
  }

  eliminarHabitacion(id: number): Observable<void> {
    return this.http.delete<void>(this.getUrl('habitaciones', 'eliminar') + `&id=${id}`, this.httpOptions);
  }
}
