import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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
  
  correo = '';
  password = '';

  constructor(private bd: DataBaseService, private authService: AuthService, private router:Router) { }

  ngOnInit() {
    this.bd.crearUsuariosDePrueba().then(async () => {
      await this.bd.leerUsuarios();
    });
  }

  ingresar() {
    this.authService.login(this.correo, this.password);
  }

  public goCorreo():void{
    this.router.navigate(['/correo']);
  }

}
