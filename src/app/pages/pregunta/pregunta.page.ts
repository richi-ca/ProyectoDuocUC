import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario;
  public respuesta: string = '';
  public nombreUsuario: string = '';

  constructor(private bd: DataBaseService, private authService: AuthService, private router: Router) { 
    
    
  }

  ngOnInit() {
  }

  public validarRespuestaSecreta(): void {
    this.bd.leerUsuario(this.respuesta)
      .then((usuario: Usuario) => {
        if (!usuario) {
          this.router.navigate(['/correcto']);
        } else {
          const navigationExtras: NavigationExtras = {
            state: {
              usuario: usuario
            }
          };
          this.router.navigate(['/incorrecto'], navigationExtras);
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
