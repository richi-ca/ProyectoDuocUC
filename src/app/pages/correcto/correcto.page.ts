import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorrectoPage implements OnInit {

  public password: string;

  constructor(private bd: DataBaseService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { 

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.password = this.router.getCurrentNavigation().extras.state.password;
      }
    });
  }


  
  ngOnInit() {
  }


  ingresar() {
    this.router.navigate(['/ingreso']);
  }

}
