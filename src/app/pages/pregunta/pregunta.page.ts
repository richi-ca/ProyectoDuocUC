import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})

export class PreguntaPage implements OnInit {

  public usuario: Usuario;
  public respuesta: String = '';
  public nombreUsuario: string = '';


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) 
  {

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
        // Obtén el nombre del usuario si está disponible en el objeto 'usuario'
        if (this.usuario && this.usuario.nombre) {
          this.nombreUsuario = this.usuario.nombre;
        }
      } else {
        this.router.navigate(['/login']);
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
      alert('EL CORREO NO EXISTE DENTRO DE LAS CUENTAS VALIDAS DEL SISTEMA');
    }
  }

}