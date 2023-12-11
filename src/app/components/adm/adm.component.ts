import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC } from 'src/app/tools/message-routines';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,],
})

export class AdmComponent implements OnInit {
  public usuario:any = new Usuario();
  listaUsuarios!: any;

  constructor(private authService: AuthService, private bd: DataBaseService, private router: Router) { }

  async ngOnInit() {
    this.bd.leerUsuarios().then((res) => {
      this.listaUsuarios = res;
      console.log(res);
    })
    this.authService.leerUsuarioAutenticado().then((usuario) => {
      this.usuario = usuario;

      console.log("usuario ", this.usuario);
    })
  }

  eliminarUsuario(user:any){
    if (user.correo === "admin@duocuc.cl"){
      showAlertDUOC("No se puede eliminar al administrador");
      return;
    } else{
      this.bd.eliminarUsuarioUsandoCorreo(user);
      showAlertDUOC("El usuario ha sido eliminado");
      this.router.navigate(['/cm/adm']);
    }
  }
}
