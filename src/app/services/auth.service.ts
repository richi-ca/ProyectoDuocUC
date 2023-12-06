import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';
import { DataBaseService } from './data-base.service';
import { Storage } from '@ionic/storage-angular';
import { showToast } from '../tools/message-routines';
import { NgIf } from '@angular/common';

@Injectable(
  {
  providedIn: 'root'
}
)

export class AuthService {

  keyUsuario = 'USUARIO_AUTENTICADO';
  usuarioAutenticado = new BehaviorSubject<Usuario | null>(null);
  primerInicioSesion = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private bd: DataBaseService, private storage: Storage) { 
    this.inicializarAutenticacion();
  }

  async inicializarAutenticacion() {
    await this.storage.create();
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.leerUsuarioAutenticado().then(usuario => {
      return usuario !== null;
    });
  }

  async leerUsuarioAutenticado(): Promise<Usuario | undefined> {
    const usuario = await this.storage.get(this.keyUsuario) as Usuario;
    this.usuarioAutenticado.next(usuario);
    return usuario;
  }

  guardarUsuarioAutenticado(usuario: Usuario) {
    this.storage.set(this.keyUsuario, usuario);
    this.usuarioAutenticado.next(usuario);
  }

  eliminarUsuarioAutenticado(usuario: Usuario) {
    this.storage.remove(this.keyUsuario);
  }

  async login(correo: string, password: string) {
    await this.storage.get(this.keyUsuario).then(async (usuarioAutenticado) => {
      if (usuarioAutenticado) {
        if (usuarioAutenticado.usuario.nombre === 'Administrador'){
          // Para otros usuarios autenticados, redirige a 'inicio'
          this.usuarioAutenticado.next(usuarioAutenticado);
          this.primerInicioSesion.next(false);
          this.router.navigate(['cm']);
          return;
        } else {
          // Para otros usuarios autenticados, redirige a 'inicio'
          this.usuarioAutenticado.next(usuarioAutenticado);
          this.primerInicioSesion.next(false);
          this.router.navigate(['inicio']);
        }
        
      } else {
        // Usuario no autenticado, validar en la base de datos
        await this.bd.validarUsuario(correo, password).then(async (usuario: Usuario | undefined) => {
          if (usuario) {
            if (usuario.nombre === "Administrador"){
              showToast(`¡Bienvenido ${usuario.nombre} ${usuario.apellido}!`);
              this.guardarUsuarioAutenticado(usuario);
              this.primerInicioSesion.next(true);
              this.router.navigate(['cm']);
            } else{
              showToast(`¡Bienvenido ${usuario.nombre} ${usuario.apellido}!`);
              this.guardarUsuarioAutenticado(usuario);
              this.primerInicioSesion.next(true);
              this.router.navigate(['inicio']);
              }
          } else {
            showToast(`El correo o la contraseña son incorrectos`);
            this.router.navigate(['ingreso']);
          }
        });
      }
    });
  }
  

  async logout() {
    this.leerUsuarioAutenticado().then((usuario) => {
      if (usuario) {
        showToast(`¡Hasta pronto ${usuario.nombre} ${usuario.apellido}!`);
        this.eliminarUsuarioAutenticado(usuario);
      }
      this.router.navigate(['ingreso']);
    });
  }

}
