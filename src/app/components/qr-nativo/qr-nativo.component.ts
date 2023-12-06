import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventEmitter } from '@angular/core';
import { Asistencia } from 'src/app/model/asistencia';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { SqliteService } from 'src/app/services/sqlite.service';
import jsQR, { QRCode } from 'jsqr';
import { BarcodeFormat, BarcodeScanner, ScanResult } from '@capacitor-mlkit/barcode-scanning';
import { Usuario } from 'src/app/model/usuario';
import { log, showAlertDUOC, showAlertYesNoDUOC } from 'src/app/tools/message-routines';
import { MessageEnum } from 'src/app/tools/message-enum';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';



@Component({
  selector: 'app-qr-nativo',
  templateUrl: './qr-nativo.component.html',
  styleUrls: ['./qr-nativo.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true
})
export class QrNativoComponent  implements OnInit {

  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;
  @Output() qrCapturado: EventEmitter<string> = new EventEmitter();

  public usuario:any = new Usuario();
  public asistencia: Asistencia = new Asistencia();
  public escaneando = false;
  public datosQR: string = '';
  public datosMiClase = new BehaviorSubject<Asistencia | null>(null);
  plataforma = 'web';

  constructor(
    private router: Router,
    private authService: AuthService,
    private bd: DataBaseService,
    private sqliteService: SqliteService,
    private readonly ngZone: NgZone,
    private dataService: DataService
  ) { }

  ngOnInit() {

    this.plataforma = this.sqliteService.platform;
    this.authService.leerUsuarioAutenticado().then((usuario) => {
      this.usuario = usuario;
      console.log("usuario ", this.usuario);
    })
  }

  async comenzarEscaneoQR() {
    if (this.plataforma === 'web') {
      this.comenzarEscaneoQRWeb();
    } else {
      this.comenzarEscaneoQRNativo();
    }
  }

  /**
   *  Proceso de escanéo de QR en un Navegador Web
   */

  public async comenzarEscaneoQRWeb() {
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
    let qrCode: QRCode  | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      const data = qrCode.data;
      if (data !== '') {
        this.escaneando = false;
        if (this.asistencia.verificarAsistenciaDesdeQR(qrCode.data)) {
          this.bd.datosQR.next(qrCode.data);
          this.qrCapturado.emit(qrCode.data);
          const jsonData = JSON.parse(qrCode.data);
          this.dataService.compartirDatosQR(jsonData)
          console.log(qrCode)
          this.router.navigate(['inicio']);
        } else {
          showAlertDUOC('El código QR escaneado no corresponde a una Asistencia de DUOC');
        }
        return true;
      }
    }
    return false;
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  /**
   *  Proceso de escanéo de QR nativo en Android
   *  Ver: https://github.com/capawesome-team/capacitor-barcode-scanning
   */

  async comenzarEscaneoQRNativo() {
    const datosQR = await this.escanearQRNativo();
    if (datosQR === '') return;
    if (datosQR.includes('Error: ')) {
      showAlertDUOC(datosQR.substring(7));
      return;
    }

    if (this.asistencia.verificarAsistenciaDesdeQR(datosQR)) {
      this.bd.datosQR.next(datosQR);
      this.qrCapturado.emit(datosQR);
      const jsonData = JSON.parse(datosQR);
      this.dataService.compartirDatosQR(jsonData)
      this.router.navigate(['home/tabs/tab2']);
    } else {
      showAlertDUOC('El código QR escaneado no corresponde a una Asistencia de DUOC '+ datosQR);
    }
  }

  public async escanearQRNativo(): Promise<string> {
    try {
      await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable().then(async (result) => {
        if (!result.available) await BarcodeScanner.installGoogleBarcodeScannerModule();
      });

      if (!await BarcodeScanner.isSupported()) {
        return Promise.resolve('ERROR: Google Barcode Scanner no es compatible con este celular');
      }

      let status = await BarcodeScanner.checkPermissions();

      if (status.camera === 'denied') {
        status = await BarcodeScanner.requestPermissions();
      }
      
      if (status.camera === 'denied') {
        const resp = await showAlertYesNoDUOC('No fue posible otorgar permisos a la cámara. ¿Quiere '
          + 'acceder a las opciones de configuración de la aplicación y darle permiso manualmente?');
        if (resp === MessageEnum.YES) await BarcodeScanner.openSettings();
        return Promise.resolve('');
      }

      await BarcodeScanner.removeAllListeners().then(() => {
        BarcodeScanner.addListener('googleBarcodeScannerModuleInstallProgress', (event) => {
          this.ngZone.run(() => {
            console.log('googleBarcodeScannerModuleInstallProgress', event);
          });
        });
      });

      const { barcodes }: ScanResult = await BarcodeScanner.scan({ formats: [BarcodeFormat.QrCode],});
      return Promise.resolve(barcodes[0].displayValue);
      
    } catch(error: any) {
      if (error.message.includes('canceled')) return Promise.resolve('');
      console.log('ERROR EN escanearQRNativo CATCH ' + error.message);
      return Promise.resolve('ERROR: No fue posible leer el código QR');
    }
  }

}
