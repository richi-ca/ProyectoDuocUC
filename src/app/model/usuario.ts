import { constant } from "cypress/types/lodash";

export class Usuario {

    correo = '';
    password = '';
    nombre = '';
    apellido = '';
    preguntaSecreta = '';
    respuestaSecreta = '';

    constructor() { }

    // Crea el usuario
    setUsuario(correo: string, password: string, nombre: string, apellido: string, preguntaSecreta: string, respuestaSecreta: string) {
        this.correo = correo;
        this.password = password;
        this.nombre = nombre;
        this.apellido = apellido;
        this.preguntaSecreta = preguntaSecreta;
        this.respuestaSecreta = respuestaSecreta;
    }

    // Devuelve el usuario
    static getUsuario(correo: string, password: string, nombre: string, apellido: string, preguntaSecreta: string, respuestaSecreta: string) {
        const usu = new Usuario();
        usu.setUsuario(correo, password, nombre, apellido, preguntaSecreta, respuestaSecreta)
        return usu;
    }

    // Valida que los campos no esten vacios
    validarCampoRequerido(nombreCampo: string, valor: string) {
        if (valor.trim() === '') return `El campo "${nombreCampo}" es requerido.`;
        return '';
    }

    // Valida que el correo sea valido
    validarCorreo(correo: string): string {
        if (correo.trim() === ''){
            return 'Para ingresar al sistema debe ingresar el correo del usuario.';
        }
        return this.validarCampoRequerido('Correo', correo);
    }

    // Valida que el password sea válido
    validarPassword(password: string): string {
        if (password.trim() === '') {
            return 'Para entrar al sistema debe ingresar la contraseña.';
        } else if (!/^[0-9a-zA-Z]{4,5}$/.test(password)) {
            return 'La contraseña debe ser numérica o alfanumérica de 4 a 5 caracteres.';
        }else if (password.length > 5) {
            return 'La contraseña no puede tener más de 5 dígitos.';
          }
  
    return '';
  }
  

    // Valida que el nombre sea valido
    validarNombre(nombre: string): string {
        if (nombre.trim() === '') {
            return 'Debe ingresar su nombre.';
        }
        return '';
    }

    // Valida que el apellido sea valido
    validarApellido(apellido: string): string {
        if (apellido.trim() === '') {
            return 'Debe ingresar su apellido.';
        }
        return '';
    }

    // Valida que la pregunta secreta sea valida
    validarPreguntaSecreta(question: string): string {
        if (question.trim() === '') {
            return 'Debe ingresar su pregunta secreta.';
        }
        return '';
    }

    // Valida que la respuesta secreta sea valida
    validarRespuestaSecreta(answer: string): string {
        if (answer.trim() === '') {
            return 'Debe ingresar su respuesta secreta.';
        }
        return '';
    }

    // Valida todas las validaciones a la vez
    validarPropiedadesUsuario(correo: string, password: string, nombre: string, appelido: string, preguntaSecreta: string, respuestaSecreta: string): string {
        return this.validarCorreo(correo)
        || this.validarPassword(password)
        || this.validarNombre(nombre)
        || this.validarApellido(appelido)
        || this.validarPreguntaSecreta(preguntaSecreta)
        || this.validarRespuestaSecreta(respuestaSecreta);
    }
}
