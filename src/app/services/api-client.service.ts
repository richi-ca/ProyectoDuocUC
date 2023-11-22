import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Publicacion } from '../model/publicacion';
import { showToast } from '../tools/message-routines';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'access-control-allow-origin': '*'
    })
  };

  listaPublicaciones: BehaviorSubject<Publicacion[]> =  new BehaviorSubject<Publicacion[]>([]);
  apiUrl = 'http://localhost:3000';
  //apiUrl = 'http://192.168.100.34:3000';
  // apiUrl = '_JSON-SERVER/publicaciones.json';

  constructor(private http: HttpClient) { }

  async cargarPublicaciones() {
    this.leerPublicaciones().subscribe({
      next: (publicaciones) => {
        let pubs: Publicacion[] = []
        publicaciones.forEach((element: any) => {
          let json = element;
          let p = new Publicacion();
          p.id = json.id;
          p.correo = json.correo;
          p.nombre = json.nombre;
          p.apellido = json.apellido;
          p.titulo = json.titulo;
          p.contenido = json.contenido;
          pubs.push(p);
        });
        this.listaPublicaciones.next(pubs);
      },
      error: (error: any) => {
        showToast('El servicio API Rest de Publicaciones no está disponible');
        this.listaPublicaciones.next([]);
      }
    });
  }

  crearPublicacion(publicacion: any): Observable<any> {
    return this.http.post(this.apiUrl + '/publicaciones/', publicacion, this.httpOptions);
  }

  leerPublicaciones(): Observable<any> {
    return this.http.get(this.apiUrl + '/publicaciones/');
  }

  leerPublicacion(idPublicacion: number): Observable<any> {
    return this.http.get(this.apiUrl + '/publicaciones/' + idPublicacion);
  }

  actualizarPublicacion(publicacion: any): Observable<any> {
    return this.http.put(this.apiUrl + '/publicaciones/' + publicacion.id, publicacion, this.httpOptions);
  }

  eliminarPublicacion(publicacionId: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/publicaciones/' + publicacionId, this.httpOptions);
  }

}
