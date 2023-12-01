import { Usuario } from './model/usuario';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { activeAnimations } from '@ionic/core/dist/types/utils/overlays';
import { AppComponent } from './app.component';
import { NgModel } from '@angular/forms';



describe('Probar el comienzo de la aplicación', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent, NgModel],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    

    it('Se debería crear la aplicación', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('Probar que el título de la aplicación sea "Sistema de asistencias Duoc UC"', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        alert(app.title);
        expect(app.title).toEqual('Sistema de asistencias Duoc UC');
    });

});

describe('Probar clase de usuario', () => {

    describe ('Probar que la contraseña sea correcta', () => {
        const usuario = new Usuario();

        it ('Probar que la contraseña no sea vacía', () => {
                usuario.password = '';
                expect(usuario.validarPassword(usuario.password)).toContain('El campo "Password" es requerido.');
        });

        it ('Probar que la contraseña sea numérica y no "abcd"', () => {
                usuario.password = 'abcd';
                expect(usuario.validarPassword(usuario.password)).toContain('El campo "Password" debe ser numérico.');
        });

            it ('Probar que la contraseña no supere los 4 dígitos como por ejemplo "1234567890"', () => {
                usuario.password = '1234567890';
                expect(usuario.validarPassword(usuario.password)).toContain('El correo o la password son incorrectos');
            });

            it ('Probar que la contraseña sea de 4 dígitos como por ejemplo "1234"', () => {
                usuario.password = '1234';
                expect(usuario.validarPassword(usuario.password)).toEqual('');
            });

        });

});
