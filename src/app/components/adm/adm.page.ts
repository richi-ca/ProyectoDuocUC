import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC } from 'src/app/tools/message-routines';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { QrComponent } from 'src/app/components/qr/qr.component';


@Component({
  selector: 'app-adm',
  templateUrl: './adm.page.html',
  styleUrls: ['./adm.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, QrComponent, MiclaseComponent, ForoComponent, MisdatosComponent]
})
export class AdmPage implements OnInit {
  public usuario:any = new Usuario();
  listaUsuarios: Usuario[] = [];
  constructor(private authService: AuthService, private bd: DataBaseService, private router: Router) { }

  async ngOnInit() {
    this.bd.listaUsuarios.subscribe(usuarios => {
      this.listaUsuarios = usuarios;
    });
    this.authService.leerUsuarioAutenticado().then((usuario) => {
      this.usuario = usuario;

      console.log("usuario ", this.usuario);
    })
    
  }
  eliminarUsuario(user:any){
    if(user=="admin@duocuc.cl"){
      showAlertDUOC("No se puede eliminar al administrador");
      return;
    } else{
      this.bd.eliminarUsuarioUsandoCorreo(user);
      showAlertDUOC("El usuario ha sido eliminado");
      this.router.navigate(['/cm/adm']);
    }
    
  }
}
