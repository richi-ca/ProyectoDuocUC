import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario | undefined;
  public respuesta: String = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) 
  {

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras?.state) {
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
  }

  public validarRespuestaSecreta(): void {
    if (this.usuario!.respuestaSecreta === this.respuesta) {
      const navigationExtras: NavigationExtras = {
        state: {
          password: this.usuario!.password
        }
      };
      this.router.navigate(['/correcto'],navigationExtras);
    }
    else {
      this.router.navigate(['/incorrecto']);
    }
  }

  


}