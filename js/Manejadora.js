"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.addEventListener("load", () => {
    ModeloParcial.MostrarEmpleados();
});
var ModeloParcial;
(function (ModeloParcial) {
    const URL_API = "http://localhost:2024/";
    function limpiarCamposBD() {
        return __awaiter(this, void 0, void 0, function* () {
            document.getElementById('nombre').value = "";
            document.getElementById('correo').value = "";
            document.getElementById('clave').value = "";
            document.getElementById('id').value = "";
        });
    }
    ModeloParcial.limpiarCamposBD = limpiarCamposBD;
    function limpiarCamposEmpleados() {
        return __awaiter(this, void 0, void 0, function* () {
            document.getElementById('id').value = "";
            document.getElementById('nombre').value = "";
            document.getElementById('correo').value = "";
            document.getElementById('clave').value = "";
            document.getElementById('sueldo').value = "";
            document.getElementById('foto').value = "";
            document.getElementById('cboPerfiles').value = "";
        });
    }
    ModeloParcial.limpiarCamposEmpleados = limpiarCamposEmpleados;
    function AgregarUsuarioJSON() {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = document.getElementById('nombre');
            const correo = document.getElementById('correo');
            const clave = document.getElementById('clave');
            let objSend = {
                nombre: `${nombre.value}`,
                correo: `${correo.value}`,
                clave: `${clave.value}`
            };
            let respuesta = yield fetch('http://localhost:2024/usuarioJSON', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objSend)
            });
            if (!respuesta.ok) {
                throw new Error("Hubo un error al agregar el usuario");
            }
            else {
                let data = yield respuesta.json();
                console.log(data);
                console.log(data.mensaje);
                alert(data.mensaje);
            }
        });
    }
    ModeloParcial.AgregarUsuarioJSON = AgregarUsuarioJSON;
    function MostrarUsuariosJSON() {
        return __awaiter(this, void 0, void 0, function* () {
            const divUsers = document.getElementById('divTabla');
            let acumuladorUsers = "";
            let respuesta = yield fetch('http://localhost:2024/usuarioJSON');
            let data = yield respuesta.json();
            console.log(data.usuarios);
            data.usuarios.forEach((usuario) => {
                acumuladorUsers += `nombre: ${usuario.nombre}, correo: ${usuario.correo}, clave: ${usuario.clave} \n`;
            });
            divUsers.innerText = acumuladorUsers;
        });
    }
    ModeloParcial.MostrarUsuariosJSON = MostrarUsuariosJSON;
    function VerificarUsuarioJSON() {
        return __awaiter(this, void 0, void 0, function* () {
            const correo = document.getElementById('correo');
            const clave = document.getElementById('clave');
            let objSend = {
                correo: `${correo.value}`,
                clave: `${clave.value}`
            };
            let respuesta = yield fetch('http://localhost:2024/usuarioJSON/verificar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objSend)
            });
            if (!respuesta.ok) {
                throw new Error("Error al verificar el usuario");
            }
            else {
                let data = yield respuesta.json();
                console.log(data);
                alert(data.mensaje);
            }
        });
    }
    ModeloParcial.VerificarUsuarioJSON = VerificarUsuarioJSON;
    function AgregarUsuarioBD() {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = document.getElementById('nombre');
            const correo = document.getElementById('correo');
            const clave = document.getElementById('clave');
            const id_perfil = document.getElementById('cboPerfiles');
            let objSend = {
                correo: `${correo.value}`,
                clave: `${clave.value}`,
                nombre: `${nombre.value}`,
                id_perfil: `${id_perfil.value}`
            };
            let respuesta = yield fetch('http://localhost:2024/usuarioBD', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objSend)
            });
            if (!respuesta.ok) {
                throw new Error("Error en el envio del usuario");
            }
            else {
                let data = yield respuesta.json();
                console.log(data);
                alert(data.mensaje);
                limpiarCampos();
                MostrarUsuariosBD();
            }
        });
    }
    ModeloParcial.AgregarUsuarioBD = AgregarUsuarioBD;
    function MostrarUsuariosBD() {
        return __awaiter(this, void 0, void 0, function* () {
            const divUsers = document.getElementById('divTabla');
            const id = document.getElementById('id');
            id.readOnly = false;
            let acumuladorUsers = "";
            let respuesta = yield fetch('http://localhost:2024/usuarioBD');
            if (!respuesta.ok) {
                throw new Error("Erroral leer los usuarios");
            }
            else {
                let data = yield respuesta.json();
                console.log(data);
                alert("Carga db = " + data.exito);
                data.usuarios.forEach((u) => {
                    acumuladorUsers += `id: ${u.id}, nombre: ${u.nombre}, correo: ${u.correo}, clave: ${u.clave}, id_perfil: ${u.id_perfil}\n\n`;
                    console.log(u);
                });
                divUsers.innerText = acumuladorUsers;
            }
        });
    }
    ModeloParcial.MostrarUsuariosBD = MostrarUsuariosBD;
    function ModificarUsuarioBD() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = document.getElementById('id');
            const nombre = document.getElementById('nombre');
            const correo = document.getElementById('correo');
            const clave = document.getElementById('clave');
            const id_perfil = document.getElementById('cboPerfiles');
            let objSend = {
                id: `${id.value}`,
                nombre: `${nombre.value}`,
                correo: `${correo.value}`,
                clave: `${clave.value}`,
                id_perfil: `${id_perfil.value}`,
            };
            let objJson = {
                usuario_json: objSend
            };
            let respuesta = yield fetch('http://localhost:2024/usuarioBD', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objJson)
            });
            if (respuesta.ok) {
                let data = yield respuesta.json();
                console.log(data.mensaje);
                alert(data.mensaje);
                if (data.exito === true) {
                    MostrarUsuariosBD();
                }
            }
            else {
                throw new Error("Error al modificar el usuario");
            }
        });
    }
    ModeloParcial.ModificarUsuarioBD = ModificarUsuarioBD;
    function EliminarUsuarioBD() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = document.getElementById('id');
            let objSend = {
                id: `${id.value}`
            };
            const confirmacion = window.confirm("¿Estás seguro de eliminar este usuario?");
            if (confirmacion) {
                let respuesta = yield fetch('http://localhost:2024/usuarioBD', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(objSend)
                });
                if (respuesta.ok) {
                    let data = yield respuesta.json();
                    console.log(data);
                    alert(data.mensaje);
                    if (data.exito === true) {
                        MostrarUsuariosBD();
                    }
                }
                else {
                    throw new Error("Error al eliminar el usuario");
                }
            }
        });
    }
    ModeloParcial.EliminarUsuarioBD = EliminarUsuarioBD;
    function AgregarEmpleado() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = document.getElementById('id');
            const nombre = document.getElementById('nombre');
            const correo = document.getElementById('correo');
            const clave = document.getElementById('clave');
            const id_perfil = document.getElementById('cboPerfiles');
            const sueldo = document.getElementById('sueldo');
            const fotoInput = document.getElementById('foto');
            const foto = fotoInput.files ? fotoInput.files[0] : null;
            let formData = new FormData();
            let objEmpleado = {
                nombre: nombre.value,
                correo: correo.value,
                clave: clave.value,
                id_perfil: id_perfil.value,
                sueldo: sueldo.value,
            };
            formData.append('obj_empleado', JSON.stringify(objEmpleado));
            if (foto) {
                formData.append('foto', foto);
            }
            else {
                console.log("la foto esta vacia");
            }
            let respuesta = yield fetch("http://localhost:2024/empleadoBD", {
                method: 'POST',
                body: formData
            });
            if (respuesta.ok) {
                let data = yield respuesta.json();
                console.log(data);
                if (data.exito === true) {
                    console.log(data.mensaje);
                    MostrarEmpleados();
                    limpiarCamposEmpleados();
                }
            }
            else {
                throw new Error("Error al cargar el empleado");
            }
        });
    }
    ModeloParcial.AgregarEmpleado = AgregarEmpleado;
    function MostrarEmpleados() {
        return __awaiter(this, void 0, void 0, function* () {
            const divEmpleados = document.getElementById('divTablaEmpleados');
            let empleados = "";
            let respuesta = yield fetch('http://localhost:2024/empleadoBD');
            if (respuesta.ok) {
                let data = yield respuesta.json();
                console.log(data.usuarios);
                let usuarios = data.usuarios;
                let tabla = `<table class="table table-hover">
                        <tr>
                            <th>ID</th><th>NOMBRE</th><th>CORREO</th><th>FOTO</th><th>ACCIONES</th>
                        </tr>`;
                if (usuarios.length < 1) {
                    tabla += `<tr><td>---</td><td>---</td><td>---</td><td>---</td>
                            <td>---</td></tr>`;
                }
                else {
                    for (let index = 0; index < usuarios.length; index++) {
                        const dato = usuarios[index] !== "" ? (usuarios[index]) : null;
                        if (dato == null) {
                            continue;
                        }
                        tabla += `<tr><td>${dato.id}</td><td>${dato.nombre}</td><td>${dato.correo}</td>
                                        <td><img src="${URL_API}${dato.foto}" width="50px" hight="50px"></td>
                                        <td><button type="button" class="btn btn-info" id="" 
                                                data-obj='${JSON.stringify(dato)}' name="btnModificar">
                                                <span class="bi bi-pencil"></span>
                                            </button>
                                            <button type="button" class="btn btn-danger" id="" 
                                                data-codigo='${JSON.stringify(dato)}' name="btnEliminar">
                                                <span class="bi bi-x-circle"></span>
                                            </button>
                                        </td></tr>`;
                    }
                }
                tabla += `</table>`;
                divEmpleados.innerHTML = tabla;
                document.getElementsByName("btnModificar").forEach((boton) => {
                    boton.addEventListener("click", () => {
                        let obj = boton.getAttribute("data-obj");
                        let obj_dato = JSON.parse(obj);
                        document.getElementById("id").value = obj_dato.id;
                        document.getElementById("nombre").value = obj_dato.nombre;
                        document.getElementById("correo").value = obj_dato.correo;
                        document.getElementById("clave").value = obj_dato.clave;
                        document.getElementById("sueldo").value = obj_dato.sueldo;
                        document.getElementById("cboPerfiles").value = obj_dato.id_perfil;
                        document.getElementById("imgFoto").src = URL_API + obj_dato.foto;
                        document.getElementById("id").readOnly = true;
                        ;
                    });
                });
                document.getElementsByName("btnEliminar").forEach((boton) => {
                    boton.addEventListener("click", () => {
                        let userJson = boton.getAttribute("data-codigo");
                        let usuario = JSON.parse(userJson);
                        if (confirm(`¿Desea eliminar al empleado ${usuario.nombre}, con sueldo ${usuario.sueldo}?`)) {
                            EliminarEmpleado(usuario);
                        }
                    });
                });
            }
            else {
                throw new Error("Error al mostrar los empleados");
            }
        });
    }
    ModeloParcial.MostrarEmpleados = MostrarEmpleados;
    function ModificarEmpleado() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ModeloParcial.ModificarEmpleado = ModificarEmpleado;
    function EliminarEmpleado(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            let respuesta = yield fetch(`http://localhost:2024/empleadoBD/${usuario.id}`, {
                method: 'DELETE'
            });
            if (respuesta.ok) {
                let data = yield respuesta.json();
                console.log(data);
                if (data.exito === true) {
                    console.log(data.mensaje);
                    alert(data.mensaje);
                    MostrarEmpleados();
                }
            }
            else {
                throw new Error("Error al eliminar el empleado");
            }
        });
    }
    ModeloParcial.EliminarEmpleado = EliminarEmpleado;
})(ModeloParcial || (ModeloParcial = {}));
//# sourceMappingURL=Manejadora.js.map