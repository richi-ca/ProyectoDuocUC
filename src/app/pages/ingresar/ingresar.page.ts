import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import {Router, NavigationExtras} from "@angular/router";
import { ToastController } from '@ionic/angular';

// el NavigationExtras sirve para pasar parametros

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.page.html',
  styleUrls: ['./ingresar.page.scss'],
})
export class IngresarPage implements OnInit {

  public usuario:Usuario;
  public email:String;
  public password:String;

  



  constructor(private router:Router,private toastController:ToastController) {
    this.usuario= new Usuario("","","","","");
    this.email="as";
    this.password="as";
    this.usuario.setUsuario('atorres@duocuc.cl', '1234');
    
   }

  ngOnInit() {
  }

  public ingresar():void{
    this.usuario.listaUsuariosValidos();
    if(this.usuario.validarUsuario(this.usuario)){
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      };
      // Navegamos hacia el Home y enviamos la información extra
      this.router.navigate(['/miclase'], navigationExtras);
    }else{
      console.log("no pasa");
    }
    
  }

  public goCorreo():void{
    this.router.navigate(['/correo']);
  }

}
