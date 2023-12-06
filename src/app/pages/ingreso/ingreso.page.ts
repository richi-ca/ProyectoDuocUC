import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IngresoPage implements OnInit {
  
  correo: any;
  password: any;

  constructor(private toastController: ToastController, private bd: DataBaseService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.bd.crearUsuariosDePrueba().then(async () => {
      await this.bd.leerUsuarios();
    });
  }

  async handleLogin() {
    const correo = this.correo;
    const password = this.password;

    this.authService.login(correo, password);
  }

  ingresar() {
    this.authService.login(this.correo, this.password);
  }

  public goCorreo():void{
    this.router.navigate(['/correo']);
  }

}
