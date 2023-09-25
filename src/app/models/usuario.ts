export class Usuario {

    public email:String;
    public password:String;
    public nombre:String;
    public preguntaSecreta:String;
    public respuestaSecreta:String;


    constructor(email:String,password:String,nombre: String,preguntaSecreta: String,respuestaSecreta: String){
        this.email=email;
        this.password=password;
        this.nombre = nombre;
        this.preguntaSecreta = preguntaSecreta;
        this.respuestaSecreta = respuestaSecreta;
    }

    public setUsuario(email:String,password:String):void{
        this.email=email;
        this.password=password;
    }

    public listaUsuariosValidos():Usuario[]{
        const lista=[];
        lista.push(new Usuario('atorres@duocuc.cl', '1234', 'ana torres leiva', '¿Cuál es tu animal favorito?', 'gato'));
        lista.push(new Usuario('avalenzuela@duocuc.cl', 'qwer', 'alberto valenzuela nuñez', '¿nombre de su mejor amigo?', 'juanito'));
        lista.push(new Usuario('cfuentes@duocuc.cl', 'asdf', 'carla fuentes gonzalez','¿Lugar de nacimiento de su madre?', 'valparaiso'));
        return lista;
    }

    public validarUsuario(usuario:Usuario):boolean{
        let pivot:boolean=false;
        this.listaUsuariosValidos().forEach(ele => {
            if(ele.email==usuario.email && ele.password==usuario.password){
                pivot=true;
            }
        });
        return pivot;
    }

    public buscarUsuarioPorCorreo(email: String): Usuario {

        return this.listaUsuariosValidos().find(
          usu => usu.email ===email);
    }

    
    
}
