import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { Usuario } from 'src/app/model/usuario';
import { ApiClientService } from 'src/app/services/api-client.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AdmComponent } from 'src/app/components/adm/adm.component';

@Component({
  selector: 'app-cm',
  templateUrl: './cm.page.html',
  styleUrls: ['./cm.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    QrComponent,
    MiclaseComponent,
    ForoComponent,
    MisdatosComponent,
    AdmComponent
  ],
})
export class CmPage implements OnInit {
  public usuario: any = new Usuario();
  listaUsuarios: Usuario[] = [];
  esAdmin: boolean = false;
  componente_actual = 'qr';

  constructor(
    private authService: AuthService,
    private bd: DataBaseService,
    private router: Router,
    private api: ApiClientService
  ) {}

  checkIfUserIsAdmin(x: any) {
    if (x == 'admin@duocuc.cl') {
      this.esAdmin = true;
      return;
    }
  }

  async ngOnInit() {
    this.bd.listaUsuarios.subscribe((usuarios) => {
      this.listaUsuarios = usuarios;
    });
    this.authService.leerUsuarioAutenticado().then((usuario) => {
      this.usuario = usuario;

      console.log('usuario ', this.usuario);
      this.checkIfUserIsAdmin(this.usuario.correo);
    });

    this.authService.primerInicioSesion.subscribe((esPrimerInicio) => {
      this.componente_actual = 'qr';
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

