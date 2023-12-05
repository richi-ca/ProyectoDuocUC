import { Usuario } from './model/usuario';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { activeAnimations } from '@ionic/core/dist/types/utils/overlays';
import { AppComponent } from './app.component';
import { NgModel } from '@angular/forms';
import { IonApp, IonRouterOutlet } from '@ionic/angular';



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

    it('Probar que el título de la aplicación sea "Sistema de Asistencia DuocUC"', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        alert(app.title);
        expect(app.title).toEqual('Sistema de Asistencia DuocUC');
    });

});

describe('Probar clase de usuario', () => {

    describe ('Probar que la contraseña sea correcta', () => {
        const usuario = new Usuario();

        it ('Probar que la contraseña no sea vacía', () => {
                usuario.password = '';
                expect(usuario.validarPassword(usuario.password)).toContain('El campo "Password" es requerido.');
        });

        it('Probar que la contraseña sea numérica y o "abcd"', () => {
            usuario.password = 'abcd';
            const resultado = usuario.validarPassword(usuario.password);
            expect(resultado).toContain('El campo "Password" debe ser numérico o String.');
        });

        it('Probar que la contraseña no supere los 4 dígitos como por ejemplo "1234567890"', () => {
            usuario.password = '1234567890';
            const resultado = usuario.validarPassword(usuario.password);
            expect(resultado).toContain('La contraseña no debe superar los 4 dígitos');
        });

        it('Probar que la contraseña sea de 4 dígitos como por ejemplo "1234"', () => {
            usuario.password = '1234';
            const resultado = usuario.validarPassword(usuario.password);
            expect(resultado).toEqual('');
        });

    });

});
