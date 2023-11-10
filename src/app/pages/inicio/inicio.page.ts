import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import jsQR from 'jsqr';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { QRCode } from 'jsqr';
import { AnimationController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';
import { Asistencia } from 'src/app/models/asistencia';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit{

  public usuario: Usuario;
  public nombreUsuario: string = '';

  @ViewChild('video')
  private video!: ElementRef;

  @ViewChild('canvas')
  private canvas!: ElementRef;

  public escaneando = false;
  public datosQR: string = '';
  public asistencia: Asistencia = new Asistencia();


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    public animationController:AnimationController
    ) {
    }

ngOnInit() {
  this.route.queryParams.subscribe((params) => {
    if (params && params['usuario']) {
      const usuario = params['usuario'];
      if (usuario && usuario.nombre) {
        this.nombreUsuario = usuario.nombre;
      }
    }
  });
}

public async comenzarEscaneoQR() {
  const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
    video: {facingMode: 'environment'}
  });
  this.video.nativeElement.srcObject = mediaProvider;
  this.video.nativeElement.setAttribute('playsinline', 'true');
  this.video.nativeElement.play();
  this.escaneando = true;
  requestAnimationFrame(this.verificarVideo.bind(this));
}

async verificarVideo() {
  if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
    if (this.obtenerDatosQR() || !this.escaneando) return;
    requestAnimationFrame(this.verificarVideo.bind(this));
  } else {
    requestAnimationFrame(this.verificarVideo.bind(this));
  }
}

public obtenerDatosQR(): boolean {
  const w: number = this.video.nativeElement.videoWidth;
  const h: number = this.video.nativeElement.videoHeight;
  this.canvas.nativeElement.width = w;
  this.canvas.nativeElement.height = h;
  const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
  context.drawImage(this.video.nativeElement, 0, 0, w, h);
  const img: ImageData = context.getImageData(0, 0, w, h);
  let qrCode: QRCode | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
  if (qrCode) {
    if (qrCode.data !== '') {
      this.escaneando = false;
      this.mostrarDatosQROrdenados(qrCode.data);
      return true;
    }
  }
  return false;
}

public mostrarDatosQROrdenados(datosQR: string): void {
  this.datosQR = datosQR;
  const objetoDatosQR = JSON.parse(datosQR);
  this.asistencia.setAsistencia(
    objetoDatosQR.bloqueInicio,
    objetoDatosQR.bloqueTermino,
    objetoDatosQR.dia,
    objetoDatosQR.horaFin,
    objetoDatosQR.horaInicio,
    objetoDatosQR.idAsignatura,
    objetoDatosQR.nombreAsignatura,
    objetoDatosQR.nombreProfesor,
    objetoDatosQR.seccion,
    objetoDatosQR.sede
  );
}

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  redi_clase() {
    this.navCtrl.navigateForward(['/miclase']);
  }


  cerrarSesion() {
    this.navCtrl.navigateForward(['/login']);
  }
}