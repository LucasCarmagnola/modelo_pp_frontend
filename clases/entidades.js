"use strict";
var Entidades;
(function (Entidades) {
    class Persona {
        constructor(nombre, correo) {
            this.nombre = nombre;
            this.correo = correo;
            this.clave = "null";
        }
        ToString() {
            return `{\"nombre\":\"${this.nombre}\",\"correo\":\"${this.correo}\"}`;
        }
    }
    Entidades.Persona = Persona;
    class Usuario extends Persona {
        constructor(nombre, correo, id, id_perfil, perfil) {
            super(nombre, correo);
            this.id = id;
            this.id_perfil = id_perfil;
            this.perfil = perfil;
        }
        ToJSON() {
            return JSON.parse(`{
                ${this.ToString().slice(1, -1)},  
                \"id\": ${this.id},
                \"id_perfil\": ${this.id_perfil},
                \"perfil\": \"${this.perfil}\"
            }`);
        }
    }
    Entidades.Usuario = Usuario;
    class Empleado extends Usuario {
        constructor(nombre, correo, id, id_perfil, perfil, sueldo, foto) {
            super(nombre, correo, id, id_perfil, perfil);
            this.id = id;
            this.sueldo = sueldo;
            this.foto = foto;
        }
    }
    Entidades.Empleado = Empleado;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=entidades.js.map