namespace Entidades{

    export class Persona{

        public nombre:string;
        public correo:string;
        public clave:string;

        public constructor(nombre:string,correo:string){
            this.nombre = nombre;
            this.correo = correo;
            this.clave = "null";
        }

        public ToString():string{
            return`{\"nombre\":\"${this.nombre}\",\"correo\":\"${this.correo}\"}`;
        }

    }

    export class Usuario extends Persona{
        public id:number;
        public id_perfil:number;
        public perfil:string;

        public constructor(nombre:string,correo:string,id:number,id_perfil:number,perfil:string){
            super(nombre,correo);
            this.id = id;
            this.id_perfil = id_perfil;
            this.perfil = perfil;
        }

        public ToJSON():JSON{

            return JSON.parse(`{
                ${this.ToString().slice(1, -1)},  
                \"id\": ${this.id},
                \"id_perfil\": ${this.id_perfil},
                \"perfil\": \"${this.perfil}\"
            }`)
        }
    }

    export class Empleado extends Usuario{

        public id:number;
        public sueldo:number;
        public foto:string;

        public constructor(nombre:string,correo:string,id:number,id_perfil:number,perfil:string,sueldo:number,foto:string){
            super(nombre,correo,id,id_perfil,perfil);
            this.id = id;
            this.sueldo = sueldo;
            this.foto = foto;
        }
    }

}

//let user = new Entidades.Usuario("lucas","lucas@",1,10,"usuario");

//console.log(user.ToJSON());