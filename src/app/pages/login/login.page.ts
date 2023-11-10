import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import {Router, NavigationExtras} from "@angular/router";
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public usuario: Usuario;
  public email: String;
  public password: String;


  constructor(private router:Router,private toastController:ToastController) {
    this.usuario = new Usuario("","","","","");
    this.email = "as";
    this.password = "as";
    this.usuario.setUsuario('', '');
    this.usuario.nombre = "Ana Torres Leiva";
  }

  ngOnInit() {
  }
  
  public ingresar(): void {
    if (this.usuario.validarUsuario(this.usuario)) {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      };
      this.router.navigate(['/inicio'], navigationExtras);
    } else {
      this.toastController
        .create({
          header: 'Error de inicio de sesión',
          message: 'Los datos del usuario son incorrectos. Por favor, inténtalo de nuevo.',
          duration: 4000,
        })
        .then((alert) => {
          alert.present();
        });
    }
  }

  public goCorreo():void{
    this.router.navigate(['/correo']);
  }
}