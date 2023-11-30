import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular/ionic-module';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-cm',
  templateUrl: 'cm.page.html',
  styleUrls: ['cm.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, QrComponent, MiclaseComponent, ForoComponent, MisdatosComponent]
})
export class CmPage implements OnInit{
  public usuario:any = new Usuario();
  listaUsuarios: Usuario[] = [];
  esAdmin: boolean = false;
  constructor (private authService: AuthService, private bd: DataBaseService, private router: Router) {
    
  }
  checkIfUserIsAdmin(x:any) {
    if (x == "admin@duocuc.cl"){
      this.esAdmin = true;
      return
    } 
  }
  async ngOnInit() {
    this.bd.listaUsuarios.subscribe(usuarios => {
      this.listaUsuarios = usuarios;
    });
    this.authService.leerUsuarioAutenticado().then((usuario) => {
      this.usuario = usuario;

      console.log("usuario ", this.usuario);
      this.checkIfUserIsAdmin(this.usuario.correo);
    })
    
  }
}
