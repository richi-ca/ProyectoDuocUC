import { Component, ElementRef, ViewChild, OnInit, AfterViewInit  } from '@angular/core';
import jsQR from 'jsqr';
import { QRCode } from 'jsqr';
import { AnimationController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, AfterViewInit{
  @ViewChild('titulo', { read: ElementRef, static: true}) titulo!: ElementRef;

  @ViewChild('video')
 video!: ElementRef;

  @ViewChild('canvas')
  private canvas!: ElementRef;


  public escaneando = false;
  public datosQR: string = '';

  public bloqueInicio: number=0;
  public bloqueTermino: number=0;
  public dia: string = '';
  public horaFin: string = '';
  public horaInicio: string = '';
  public idAsignatura: string = '';
  public nombreAsignatura: string = '';
  public nombreProfesor: string = '';
  public seccion: string = '';
  public sede: string = '';
  public nombre: string = '';
  public usuario: Usuario = new Usuario('', '', '', '', '');

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    const animation = this.animationController
      .create()
      .addElement(this.titulo.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translate(0%)', 'translate(100%)')
      .fromTo('opacity', 0.2, 1);
    animation.play();
  }

  constructor(
    private navCtrl: NavController,
    public animationController:AnimationController
  ) {}

  redi_inicio() {
    this.navCtrl.navigateForward('/inicio');
  }

  redi_clase() {
    this.navCtrl.navigateForward('/miclase');
  }

  InfoUsuario () {
    this.usuario.nombre = 'nombre'; 
  }

  public async comenzarEscaneoQR() {try{
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }catch (error) {
    console.error('Error al iniciar la cámara:', error);
  }
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
    this.bloqueInicio = objetoDatosQR.bloqueInicio;
    this.bloqueTermino = objetoDatosQR.bloqueTermino;
    this.dia = objetoDatosQR.dia;
    this.horaFin = objetoDatosQR.horaFin;
    this.horaInicio = objetoDatosQR.horaInicio;
    this.idAsignatura = objetoDatosQR.idAsignatura;
    this.nombreAsignatura = objetoDatosQR.nombreAsignatura;
    this.nombreProfesor = objetoDatosQR.nombreProfesor;
    this.seccion = objetoDatosQR.seccion;
    this.sede = objetoDatosQR.sede;

    this.navCtrl.navigateForward('/miclase', {
      queryParams: {
        bloqueInicio: this.bloqueInicio,
        bloqueTermino: this.bloqueTermino,
        dia: this.dia,
        horaFin: this.horaFin,
        horaInicio: this.horaInicio,
        idAsignatura: this.idAsignatura,
        nombreAsignatura: this.nombreAsignatura,
        nombreProfesor: this.nombreProfesor,
        seccion: this.seccion,
        sede: this.sede,
      }
    });
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  


}
