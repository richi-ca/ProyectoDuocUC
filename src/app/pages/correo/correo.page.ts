import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Usuario } from 'src/app/model/usuario';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorreoPage implements OnInit {

  public correo: string = '';

  constructor(private bd: DataBaseService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public ingresarPaginaValidarRespuestaSecreta(): void {
    this.bd.leerUsuario(this.correo)
      .then((usuario: Usuario) => {
        if (!usuario) {
          this.router.navigate(['/incorrecto']);
        } else {
          const navigationExtras: NavigationExtras = {
            state: {
              usuario: usuario
            }
          };
          this.router.navigate(['/pregunta'], navigationExtras);
        }
      })
      .catch(error => {
        console.error('Error al leer usuario:', error);
      });
  }

  ingresar() {
    this.router.navigate(['/ingreso']);
  }
}
