import { Usuario } from './model/usuario';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';
import { IngresoPage } from './pages/ingreso/ingreso.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataBaseService } from './services/data-base.service';
import { AuthService } from './services/auth.service';
import { ApiClientService } from './services/api-client.service';
import { SqliteService } from './services/sqlite.service';
function multi(x: number, y: number) {
  return x * y;
}

//faltarian unas cuantas pruebas mas

describe('Probar el comienzo de la aplicación', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent, FormsModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            // providers: [DataBaseService, AuthService, Storage, ApiClientService, SqliteService],
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

      it('Debería asignar correo y contraseña a nombre de Ana Torres', () => {
        usuario.correo = 'atorres@duocuc.cl';
        usuario.password = '1234';
        expect(usuario.correo).toContain('atorres@duocuc.cl');
        expect(usuario.password).toContain('1234');
      });

      it ('Probar que la contraseña no sea vacía', () => {
        usuario.password = '';
        expect(usuario.validarPassword(usuario.password)).toContain('Para entrar al sistema debe ingresar la contraseña.');
      });

      it('Probar que la contraseña sea alfanumerica', () => {
        // contraseña alfanumérica
        usuario.password = 'abcd1';
        const resultadoAlfanumerico = usuario.validarPassword(usuario.password);
        expect(resultadoAlfanumerico).toBe('');
      });

      it('Probar que la contraseña no supere los 5 dígitos como por ejemplo "1234567890"', () => {
        // contraseña con 5 dígitos
        usuario.password = '123456';
        const resultadoValido = usuario.validarPassword(usuario.password);
        expect(resultadoValido).toBe('La contraseña debe ser numérica o alfanumérica de 4 a 5 caracteres.');
      });

      it ('Probar que la contraseña sea de al menos 4 "abcd" ', () => {
        usuario.password = 'ab12';
        const resultado = usuario.validarPassword(usuario.password);
        expect(resultado).toBe('')
      });

      it('Debería retornar un mensaje de error si el correo está vacío', () => {
        usuario.correo = '';
        expect(usuario.validarCorreo(usuario.correo)).toContain('Para ingresar al sistema debe ingresar el correo del usuario.');
      });

      it('Debería retornar un mensaje de error si el apellido está vacío', () => {
        usuario.apellido = '';
        expect(usuario.validarApellido('')).toContain('Debe ingresar su apellido.');
      });

      it('Debería retornar un mensaje de error si el apellido está vacío', () => {
        usuario.nombre = '';
        expect(usuario.validarNombre('')).toContain('Debe ingresar su nombre.');
      });

      it('Debería retornar un mensaje de error si la pregunta secreta está vacía', () => {
        usuario.preguntaSecreta = '';
        expect(usuario.validarPreguntaSecreta('')).toBe('Debe ingresar su pregunta secreta.');
      });

      it('Debería retornar un mensaje de error si la respuesta secreta está vacía', () => {
        const usuario = new Usuario();
        expect(usuario.validarRespuestaSecreta('')).toBe('Debe ingresar su respuesta secreta.');
      });

      it('La función multi(5, 5) debería devolver 25', () => {
        expect(multi(5, 5)).toEqual(25);
      });

    });

});
