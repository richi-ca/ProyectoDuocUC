import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Usuario } from 'src/app/model/usuario';
import { showAlertDUOC } from 'src/app/tools/message-routines';
import { showToast } from 'src/app/tools/message-routines';
@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,]
})
export class MisdatosComponent  implements OnInit {

  usuario = new Usuario();
  repeticionPassword ?= ' ';

  constructor(private authService: AuthService, private bd: DataBaseService) { }

  ngOnInit() {

    this.authService.usuarioAutenticado.subscribe((usuario) => {
      this.usuario = usuario? usuario : new Usuario();
      this.repeticionPassword = usuario? usuario.password : '';
    });
  }

  validarCampo(nombreCampo:string, valor: string) {
    if(valor.trim() === '') {
      showAlertDUOC(`Debe ingrear datos para el campo "${nombreCampo}"`);
      return false;
    }
    return true;
  }

  async actualizarPerfil() {
    if (!this.validarCampo('nombre', this.usuario.nombre)) return;
    if (!this.validarCampo('apellido', this.usuario.apellido)) return;
    if (!this.validarCampo('correo', this.usuario.correo)) return;
    if (!this.validarCampo('pregunta secreta', this.usuario.preguntaSecreta)) return;
    if (!this.validarCampo('respuesta secreta', this.usuario.respuestaSecreta)) return;
    if (!this.validarCampo('contraseña', this.usuario.password)) return;
    if (this.usuario.password !== this.repeticionPassword) {
      showAlertDUOC('La contraseña no coincide');
      return;
    }
    await this.bd.guardarUsuario(this.usuario);
    this.authService.guardarUsuarioAutenticado(this.usuario);
    showToast("Sus datos fueron actualizados correctamente");
  }

}
