import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})

export class MiclasePage implements OnInit {
  public bloqueInicio: string;
  public bloqueTermino: string;
  public dia: string;
  public horaFin: string;
  public horaInicio: string;
  public idAsignatura: string;
  public nombreAsignatura: string;
  public nombreProfesor: string;
  public seccion: string;
  public sede: string;
  public usuario: Usuario;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
    this.bloqueInicio = params.get('bloqueInicio');
    this.bloqueTermino = params.get('bloqueTermino');
    this.dia = params.get('dia');
    this.horaFin = params.get('horaFin');
    this.horaInicio = params.get('horaInicio');
    this.idAsignatura = params.get('idAsignatura');
    this.nombreAsignatura = params.get('nombreAsignatura');
    this.nombreProfesor = params.get('nombreProfesor');
    this.seccion = params.get('seccion');
    this.sede = params.get('sede');
    console.log(params);
  });
}

// Esta función mostrará los datos del código QR
mostrarDatosQROrdenados(datosQR: any) {
  this.bloqueInicio = datosQR.bloqueInicio;
  this.bloqueTermino = datosQR.bloqueTermino;
  this.dia = datosQR.dia;
  this.horaFin = datosQR.horaFin;
  this.horaInicio = datosQR.horaInicio;
  this.idAsignatura = datosQR.idAsignatura;
  this.nombreAsignatura = datosQR.nombreAsignatura;
  this.nombreProfesor = datosQR.nombreProfesor;
  this.seccion = datosQR.seccion;
  this.sede = datosQR.sede;
}


  redi_inicio() {
    this.router.navigate(['/inicio']);
  }

  cerrarSesion() {
    this.navCtrl.navigateForward(['/login']);
  }
}
