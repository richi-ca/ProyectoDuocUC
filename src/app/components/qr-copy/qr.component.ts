import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { LoadingController, ViewWillEnter } from '@ionic/angular';

import { Usuario } from 'src/app/model/usuario';
import jsQR from 'jsqr';
import { DataService } from 'src/app/data.service';
import { AuthService } from '../../services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';


@Component({
  selector: 'app-qr-copy',
  templateUrl: './qr-copy.component.html',
  styleUrls: ['./qr-copy.component.scss'],
})
export class QRComponentCopy  implements ViewWillEnter {
  @ViewChild('video', { static: false }) private video: ElementRef;
  @ViewChild('canvas', { static: false }) private canvas: ElementRef;
  
  public escaneando = false;
  public datosQR = '';
  public usuario:Usuario|undefined = new Usuario();
  listaUsuarios: Usuario[] = [];
  nombre = '';
  public datosQRs:any;
  user: any;
  stateLoad: boolean = false;

  constructor(private loadingController: LoadingController, private dataService: DataService, private authService: AuthService, private bd: DataBaseService) {
    this.canvas = new ElementRef(null);
    this.video = new ElementRef(null);
    this.bd.listaUsuarios.subscribe(usuarios => {
      this.listaUsuarios = usuarios;
    });
    this.authService.leerUsuarioAutenticado().then((usuario) => {
      this.usuario = usuario;
      this.stateLoad = true;
      console.log("usuario ", this.usuario);
    })
  }

  ionViewWillEnter(): void {
    this.bd.listaUsuarios.subscribe(usuarios => {
      this.listaUsuarios = usuarios;
    });
    this.authService.leerUsuarioAutenticado().then((usuario) => {
      this.usuario = usuario;
      this.stateLoad = true;
      console.log("usuario ", this.usuario);
    })
  }



  onLogoutClick(): void {
    this.authService.logout();
  }
//falta por terminar
  

  enviarDatosQR() {
    
    // Comparte los datosQR a través del servicio
    this.dataService.compartirDatosQR(this.datosQR);
  }

  public async iniciarEscaneoQR(): Promise<void> {
    try {
      this.escaneando = true;
      const videoElement = this.video.nativeElement;
      videoElement.style.display = 'flex';
      const canvasElement = this.canvas.nativeElement;
      const canvas = canvasElement.getContext('2d');
  
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoElement.srcObject = stream;
      await videoElement.play();
  
      const checkFrame = async () => {
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        canvas.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
  
        const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
  
        if (code) {
          // Se ha encontrado un código QR
          this.datosQR = code.data;
          console.log('Datos del código QR:', this.datosQR);
          
          // Intenta analizar los datos como JSON
          try {
            const jsonData = JSON.parse(this.datosQR);
            this.datosQRs = jsonData;
            console.log('Datos del código QR como objeto JSON:', jsonData);
            this.dataService.compartirDatosQR(jsonData)
            // Puedes utilizar jsonData como un objeto JavaScript
          } catch (error) {
            console.error('No se pudo analizar como JSON:', error);
          }
  
          // Detener el escaneo después de encontrar un código QR válido
          this.detenerEscaneoQR();
        }
  
        if (this.escaneando) {
          requestAnimationFrame(checkFrame);
        }
      };
  
      const animationFrameId = requestAnimationFrame(checkFrame);
  
      // Añade el código para mostrar una animación de carga si es necesario
  
    } catch (error) {
      console.error('Error al escanear el código QR:', error);
    }
  }

  public detenerEscaneoQR(): void {
    const videoElement = this.video.nativeElement;
    videoElement.srcObject.getTracks().forEach((track:any) => track.stop());
    this.escaneando = false;
    videoElement.style.display = 'none';
  }
}