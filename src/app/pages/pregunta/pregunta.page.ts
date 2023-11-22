import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
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

  constructor(private bd: DataBaseService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { 
    
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
        if (this.usuario && this.usuario.nombre) {
          this.nombreUsuario = this.usuario.nombre;
        }
      } else {
        this.router.navigate(['/ingreso']);
      }
    });
    
  }

  ngOnInit() {
  }

  public validarRespuestaSecreta(): void {
    if (this.usuario.respuestaSecreta === this.respuesta) {
      const navigationExtras: NavigationExtras = {
        state: {
          password: this.usuario.password
        }
      };
      this.router.navigate(['/correcto'],navigationExtras);
    }
    else {
      this.router.navigate(['/incorrecto']);
    }
  }

  ingresar() {
    this.router.navigate(['/ingreso']);
  }
}
