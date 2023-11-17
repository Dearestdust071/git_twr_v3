export interface Room {
  id?: number;
  nombre: string;
  capacidad: number;
  extensionTelefonica: string;
  camas: string;
  tipo: string;
  costo: number;
  ocupada: boolean;
  descripcion: string;
  imagenes: string;
  inventario: string[];
  servicios: string[];
}

