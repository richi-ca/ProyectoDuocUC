import { Usuario } from './model/usuario';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { activeAnimations } from '@ionic/core/dist/types/utils/overlays';
import { AppComponent } from './app.component';

describe('Probar el comienzo de la aplicacion', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    it('Debe crear la aplicacion', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it ('Probar que el titulo de la app sea "Asistencia DUOC"', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.tittle).toEqual('Asistencia DUOC');
    });
});

describe('Probar la clase de usuario', () => {
    
    const usuario = new Usuario();

    it('Probar que la contraseña no esté vacía', () => {
        usuario.password = '';
        expect(usuario.validarPassword(usuario.password)).toContain('ingresar la contraseña');
    });

    it('Probar que la contraseña sea numerica y no "abcd"', () => {
        usuario.password = 'abcd';
        expect(usuario.validarPassword(usuario.password)).toContain('debe ser numerica');
    });

    it('Probar que la contraseña no supere los 4 digitos', () => {
        usuario.password = '12345';
        expect(usuario.validarPassword(usuario.password)).toContain('');
    });
});
