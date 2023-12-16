export interface Room {
  id?: number;
  nombre: string;
  capacidad: number;
  extensionTelefonica: string;
  camas: string;
  Tipo_habitacion: string;
  total: number;
  descripcion: string;
  imagenes: string[];
  imagen: string;
  servicios: Servicio[];
  inventario: Inventario[];
}

export interface Servicio {
  id?: number;
  nombre: string;
}

export interface Inventario {
  id?: number;
  nombre: string;
}
