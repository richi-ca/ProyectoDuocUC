import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private datosQRCompartidos = new BehaviorSubject<any>(null); 
  datosQRActuales = this.datosQRCompartidos.asObservable();

  constructor() {}

  compartirDatosQR(datosQR: any) { 
    this.datosQRCompartidos.next(datosQR);
  }
}