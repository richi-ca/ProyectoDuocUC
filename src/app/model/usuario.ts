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
        return this.validarCampoRequerido('Correo', correo);
    }

    // Valida que el password sea valido
    validarPassword(password: string): string {
        return this.validarCampoRequerido('Password', password);
    }

    // Valida que el nombre sea valido
    validarNombre(nombre: string): string {
        return this.validarCampoRequerido('Nombre', nombre);
    }

    // Valida que el apellido sea valido
    validarApellido(apellido: string): string {
        return this.validarCampoRequerido('Apellido', apellido);
    }

    // Valida que la pregunta secreta sea valida
    validarPreguntaSecreta(preguntaSecreta: string): string {
        return this.validarCampoRequerido('Pregunta secreta', preguntaSecreta);
    }

    // Valida que la respuesta secreta sea valida
    validarRespuestaSecreta(respuestaSecreta: string): string {
        return this.validarCampoRequerido('Respuesta secreta', respuestaSecreta);
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
