import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Asistencia } from 'src/app/model/asistencia';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { SqliteService } from 'src/app/services/sqlite.service';
import { showAlertDUOC, showAlertYesNoDUOC } from 'src/app/tools/message-routines';
import jsQR, { QRCode } from 'jsqr';
import { BarcodeFormat, BarcodeScanner, ScanResult } from '@capacitor-mlkit/barcode-scanning';
import { MessageEnum } from 'src/app/tools/message-enum';


@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true
})
export class QrComponent  implements OnInit {

  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;
  @Output() qrCapturado: EventEmitter<string> = new EventEmitter();

  usuario = new Usuario();
  public asistencia: Asistencia = new Asistencia();
  public escaneando = false;
  public datosQR: string = '';
  public datosMiClase = new BehaviorSubject<Asistencia | null>(null);
  plataforma = 'web';

  constructor(
    private authService: AuthService,
    private bd: DataBaseService,
    private sqliteService: SqliteService,
    private readonly ngZone: NgZone
    ) {}

  ngOnInit() {
    this.plataforma = this.sqliteService.platform;
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      this.usuario = usuario? usuario: new Usuario();
  });

}

async comenzarEscaneoQR() {
  if (this.plataforma === 'web') {
    this.comenzarEscaneoQRWeb();
  } else {
    this.comenzarEscaneoQRNativo();
  }
}

public async comenzarEscaneoQRWeb() {
  const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' }
  });
  this.video.nativeElement.srcObject = mediaProvider;
  this.video.nativeElement.setAttribute('playsinline', true);
  this.video.nativeElement.play();
  this.escaneando = true;
  requestAnimationFrame(this.verificarVideo.bind(this));
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGHT_DATA ) {
      if(this.obtenerDatosQR() || !this.escaneando) return;
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
      const data = qrCode.data;
      if(data !== '') {
        this.escaneando = false;
        if (this.asistencia.verificarAsistenciaDesdeQR(qrCode.data)) {
          this.bd.datosQR.next(qrCode.data);
          this.qrCapturado.emit(qrCode.data);
        } else {
          showAlertDUOC('El codigo QR escaneado no corresponde a uno del sistema DUOCUC');
        }
        return true;
      }
    }
    return false;
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

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
    } else {
      showAlertDUOC('El codigo QR escaneado no corresponde a uno del sistema DUOCUC');
    }
  }

  public async escanearQRNativo(): Promise<string> {
    try {
      await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable().then(async (result) => {
        if (!result.available) await BarcodeScanner.installGoogleBarcodeScannerModule();
      });
      if (!await BarcodeScanner.isSupported()){
      return Promise.resolve('Error: El Barcode Scanner no es compatible');
    }
    
    let status = await BarcodeScanner.checkPermissions();
    if (status.camera === 'denied') status = await BarcodeScanner.requestPermissions();
    if (status.camera === 'denied') {
      const resp = await showAlertYesNoDUOC('Debe permitir el acceso a la camara para poder escanear el codigo QR');
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
  } catch (error: any) {
    if(error.message.includes('cancelled')) return Promise.resolve('');
    return Promise.resolve('Error: No fue posible leer el codigo QR');
  }
}

}
