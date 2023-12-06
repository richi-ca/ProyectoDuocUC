import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Usuario } from 'src/app/model/usuario';
import { showAlertDUOC } from 'src/app/tools/message-routines';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorreoPage implements OnInit {

  public correo: string = '';
  
  constructor(private authService: AuthService, private bd: DataBaseService, private router: Router) { }

  ngOnInit() { 
  }

  async ingresarPaginaValidarRespuestaSecreta() {
    const usuario = new Usuario();
    const usuarioEncontrado = await this.bd.leerUsuario(this.correo);
    if (!usuarioEncontrado) {
      showAlertDUOC('El correo no existe');
    }
    else {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioEncontrado
        }
      };
      this.router.navigate(['/pregunta'], navigationExtras);
    }
  }
}