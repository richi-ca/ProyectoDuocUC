import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { ApiClientService } from 'src/app/services/api-client.service';
import { QrNativoComponent } from 'src/app/components/qr-nativo/qr-nativo.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    QrNativoComponent,
    MiclaseComponent,
    ForoComponent,
    MisdatosComponent,
  ],
})
export class InicioPage implements OnInit {
  // componente_actual = 'qr';
  componente_actual = 'qr-nativo';

  constructor(
    private authService: AuthService,
    private bd: DataBaseService,
    private api: ApiClientService
  ) {}

  ngOnInit() {
    this.authService.primerInicioSesion.subscribe((esPrimerInicio) => {
      // this.componente_actual = 'qr';
      this.componente_actual = 'qr-nativo';
      this.bd.datosQR.next('');
    });
  }

  cambiarComponente(nombreComponente: string) {
    this.componente_actual = nombreComponente;
    if (this.componente_actual === 'foro') this.api.cargarPublicaciones();
    if (this.componente_actual === 'misdatos')
      this.authService.leerUsuarioAutenticado();
  }

  cerrarSesion() {
    this.authService.logout();
  }
}
