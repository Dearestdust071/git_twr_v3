import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {
  private baseUrl = 'http://localhost/proyecto_twr_servicios/controller/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) { }

  private getUrl(modelo: string, accion: string): string {
    return `${this.baseUrl}${modelo}.php?opcion=${accion}`;
  }

  getServicios() {
    return this.http.get(`${this.getUrl('servicios', 'listar')}`, this.httpOptions);
  }

  getInventario() {
    return this.http.get(`${this.getUrl('inventario', 'listar')}`, this.httpOptions);
  }

  getHabitaciones() {
    return this.http.get(`${this.getUrl('habitaciones', 'listar')}`, this.httpOptions);
  }

  getHabitacion(id: number) {
    return this.http.get(`${this.getUrl('habitaciones', 'detalle')}&id=${id}`, this.httpOptions);
  }

  crearHabitacion(habitacion: any) {
    return this.http.post(`${this.getUrl('habitaciones', 'crear')}`, habitacion, this.httpOptions);
  }

  actualizarHabitacion(id: number, habitacion: any) {
    return this.http.put(`${this.getUrl('habitaciones', 'actualizar')}&id=${id}`, habitacion, this.httpOptions);
  }

  eliminarHabitacion(id: number) {
    return this.http.delete(`${this.getUrl('habitaciones', 'eliminar')}&id=${id}`, this.httpOptions);
  }
}
