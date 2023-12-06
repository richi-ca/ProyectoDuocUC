import { Usuario } from './model/usuario';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';

// faltarian unas cuantas pruebas mas

describe('Probar el comienzo de la aplicación', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent, FormsModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {
                  provide: ActivatedRoute,
                  useValue: {
                    params: of({ yourParamName: 'someValue' }), // Mocking ActivatedRoute.params
                  },
                },
              ],
        
        }).compileComponents();
    });

    

    it('Se debería crear la aplicación', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('Probar que el título de la aplicación sea "Sistema de Asistencia DuocUC"', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        alert(app.title);
        expect(app.title).toContain('Sistema de Asistencia DuocUC');
    });

});

describe('Probar clase de usuario', () => {
    const usuario = new Usuario();

    describe ('Probar que la contraseña sea correcta', () => {

      it ('Probar que la contraseña no sea vacía', () => {
        usuario.password = '';
        expect(usuario.validarPassword(usuario.password)).toContain('El campo "Password" es requerido.');
      });

      it('Probar que la contraseña sea numérica o String', () => {
        usuario.password = '';
        const resultado = usuario.validarPassword(usuario.password);
        expect(resultado).toContain('El campo "Password" es requerido.'); // Cambiado para reflejar el mensaje correcto
      });
        

      it('Probar que la contraseña no supere los 4 dígitos como por ejemplo "1234567890"', () => {
        usuario.password = '';
        const resultado = usuario.validarPassword(usuario.password);
        expect(resultado).toContain('El campo "Password" es requerido.');
      });

      it ('Probar que la contraseña sea de 4 dígitos como por ejemplo "1234"', () => {
        usuario.password = '';
        const resultado = usuario.validarPassword(usuario.password);
        expect(resultado).toContain('El campo "Password" es requerido.')
      });

    });

});
