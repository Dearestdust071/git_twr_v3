import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  baseUrl = 'http://localhost/webservicepw/controller/';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    })
  };
  constructor(private http: HttpClient) { }

  Get(Modelo: string, Accion: string) {
    return this.http.get(`${this.baseUrl}${Modelo}.php?opcion=${Accion}`, this.httpOptions);
  }
  Post(Modelo: string, Accion: string, Datos: any) {
    return this.http.post(`${this.baseUrl}${Modelo}.php?opcion=${Accion}`, Datos, this.httpOptions);
  }
  Delete(Modelo:string, Accion:string, id?:number){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:{
        "id": id
      },
    };
    console.log(`${this.baseUrl}${Modelo}.php?opcion=${Accion}`,options);

    return this.http.delete(`${this.baseUrl}${Modelo}.php?opcion=${Accion}` , options);
  }


}
