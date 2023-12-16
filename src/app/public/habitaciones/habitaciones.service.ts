import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from './Room.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {
  baseUrl = 'http://localhost/proyecto_twr_servicios/controller/';

  constructor(private http: HttpClient) { }

  getHabitaciones(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}habitaciones.php?opcion=GetAll`);
  }

  createHabitacion(datos: any): Observable<Room> {
    return this.http.post<Room>(`${this.baseUrl}habitaciones.php?opcion=Insert`, datos);
  }

  updateHabitacion(id: number, datos: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}habitaciones.php?opcion=Update&id=${id}`, datos);
  }

  deleteHabitacion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}habitaciones.php?opcion=Delete&id=${id}`);
  }

  getTiposHabitacion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}tipo_habitacion.php?opcion=GetAll`);
  }

  insertTiposHabitacion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}tipo_habitacion.php?opcion=Insert`);
  }

  updateTiposHabitacion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}tipo_habitacion.php?opcion=Update`);
  }

  getServicios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}servicios.php?opcion=GetAll`);
  }

  getInventario(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}inventario.php?opcion=GetAll`);
  }

  addServicio(servicioData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}servicios.php?opcion=Insert`, servicioData);
  }

  deleteServicio(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}servicios.php?opcion=Delete`, { servicio_id: id });
  }

  addInventario(inventarioData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}inventario.php?opcion=Insert`, inventarioData);
  }

  deleteInventario(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}inventario.php?opcion=Delete`, { inventario_id: id });
  }

  getHabitacionesConServicios(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}habitacion_servicios.php?opcion=GetAll`);
  }

  agregarServicioAHabitacion(idHabitacion: number, idServicio: number, estatus: string): Observable<any> {
    const data = { id_habitacion: idHabitacion, id_servicios: idServicio, estatus };
    return this.http.post<any>(`${this.baseUrl}habitacion_servicios.php?opcion=Insert`, data);
  }

  actualizarServicioDeHabitacion(idHabitacionServicio: number, idHabitacion: number, idServicio: number, estatus: string): Observable<any> {
    const data = { id_habitacion: idHabitacion, id_servicios: idServicio, estatus, habitacion_servicios_id: idHabitacionServicio };
    return this.http.put<any>(`${this.baseUrl}habitacion_servicios.php?opcion=Update`, data);
  }

  eliminarServicioDeHabitacion(idHabitacionServicio: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}habitacion_servicios.php?opcion=Delete&habitacion_servicios_id=${idHabitacionServicio}`);
  }

  getHabitacionesConInventario(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}habitacion_inventario.php?opcion=GetAll`);
  }
  agregarInventarioAHabitacion(idHabitacion: number, idInventario: number, estatus: string): Observable<any> {
    const data = { id_habitacion: idHabitacion, id_inventario: idInventario, estatus };
    return this.http.post<any>(`${this.baseUrl}habitacion_inventario.php?opcion=Insert`, data);
  }

  actualizarInventarioDeHabitacion(idHabitacionInventario: number, idHabitacion: number, idInventario: number, estatus: string): Observable<any> {
    const data = { id_habitacion: idHabitacion, id_inventario: idInventario, estatus, habitacion_inventario_id: idHabitacionInventario };
    return this.http.put<any>(`${this.baseUrl}habitacion_inventario.php?opcion=Update`, data);
  }

  eliminarInventarioDeHabitacion(idHabitacionInventario: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}habitacion_inventario.php?opcion=Delete&habitacion_inventario_id=${idHabitacionInventario}`);
  }

  getImagenesTipo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}imagenes_tipo.php?opcion=GetAll`);
  }

  insertImagenTipo(imagen: string, idTipoHabitacion: number): Observable<any> {
    const data = { imagen, id_tipo_habitacion: idTipoHabitacion };
    return this.http.post<any>(`${this.baseUrl}imagenes_tipo.php?opcion=Insert`, data);
  }

  updateImagenTipo(imagen: string, idTipoHabitacion: number, imagenesTipoId: number): Observable<any> {
    const data = { imagen, id_tipo_habitacion: idTipoHabitacion, imagenes_tipo_id: imagenesTipoId };
    return this.http.put<any>(`${this.baseUrl}imagenes_tipo.php?opcion=Update`, data);
  }

  deleteImagenTipo(imagenesTipoId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}imagenes_tipo.php?opcion=Delete&imagenes_tipo_id=${imagenesTipoId}`);
  }
}
