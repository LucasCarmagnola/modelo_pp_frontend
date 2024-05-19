window.addEventListener("load", ():void => {
    ModeloParcial.MostrarEmpleados();
}); 
namespace ModeloParcial{
    const URL_API : string = "http://localhost:2024/"; 
    
    //class Manejadora{

        export async function limpiarCamposBD(){
            (<HTMLInputElement>document.getElementById('nombre')).value = "";
            (<HTMLInputElement>document.getElementById('correo')).value = "";
            (<HTMLInputElement>document.getElementById('clave')).value = "";
            (<HTMLInputElement>document.getElementById('id')).value = "";
        }
        export async function limpiarCamposEmpleados(){
            (<HTMLInputElement>document.getElementById('id')).value = "";
            (<HTMLInputElement>document.getElementById('nombre')).value = "";
            (<HTMLInputElement>document.getElementById('correo')).value = "";
            (<HTMLInputElement>document.getElementById('clave')).value = "";
            (<HTMLInputElement>document.getElementById('sueldo')).value = "";
            (<HTMLInputElement>document.getElementById('foto')).value = "";
            (<HTMLInputElement>document.getElementById('cboPerfiles')).value = "";
        }

        export async function AgregarUsuarioJSON(){
            const nombre = <HTMLInputElement>document.getElementById('nombre');
            const correo = <HTMLInputElement>document.getElementById('correo');
            const clave = <HTMLInputElement>document.getElementById('clave');

            let objSend = {
                nombre: `${nombre.value}`,
                correo: `${correo.value}`,
                clave: `${clave.value}`
            }

            let respuesta = await fetch('http://localhost:2024/usuarioJSON',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objSend)
            });

            if(!respuesta.ok){
                throw new Error("Hubo un error al agregar el usuario");
            }
            else{
                let data = await respuesta.json();
                console.log(data);
                console.log(data.mensaje);
                alert(data.mensaje);
                
            }
        }

        export async function MostrarUsuariosJSON(){
            const divUsers = <HTMLInputElement>document.getElementById('divTabla');
            let acumuladorUsers = "";
            let respuesta = await fetch('http://localhost:2024/usuarioJSON');
            let data = await respuesta.json();
            console.log(data.usuarios);
            data.usuarios.forEach((usuario:any) => {
                acumuladorUsers +=`nombre: ${usuario.nombre}, correo: ${usuario.correo}, clave: ${usuario.clave} \n`
            });
            divUsers.innerText = acumuladorUsers;
        }

        export async function VerificarUsuarioJSON(){
            const correo = <HTMLInputElement>document.getElementById('correo');
            const clave = <HTMLInputElement>document.getElementById('clave');

            let objSend = {
                correo: `${correo.value}`,
                clave: `${clave.value}`
            }

            let respuesta = await fetch('http://localhost:2024/usuarioJSON/verificar',{
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(objSend)
            });

            if(!respuesta.ok){
                throw new Error("Error al verificar el usuario");
            }
            else{
                let data = await respuesta.json();
                console.log(data);
                alert(data.mensaje);
            }
            
        }

        export async function AgregarUsuarioBD(){
            const nombre = <HTMLInputElement>document.getElementById('nombre');
            const correo = <HTMLInputElement>document.getElementById('correo');
            const clave = <HTMLInputElement>document.getElementById('clave');
            const id_perfil = <HTMLSelectElement>document.getElementById('cboPerfiles');

            let objSend = {
                correo: `${correo.value}`,
                clave: `${clave.value}`,
                nombre: `${nombre.value}`,
                id_perfil: `${id_perfil.value}`
            }

            let respuesta = await fetch('http://localhost:2024/usuarioBD',{
                method:"POST",
                headers:{ 'Content-Type': 'application/json' },
                body: JSON.stringify(objSend)
            })
            if(!respuesta.ok){
                throw new Error("Error en el envio del usuario");
            }else{
                let data = await respuesta.json();
                console.log(data);
                alert(data.mensaje)
                limpiarCampos();
                MostrarUsuariosBD();
            }

        }

        export async function MostrarUsuariosBD(){
            const divUsers = <HTMLInputElement>document.getElementById('divTabla');
            const id = <HTMLInputElement>document.getElementById('id');
            id.readOnly = false;

            let acumuladorUsers = "";
            let respuesta = await fetch('http://localhost:2024/usuarioBD');

            if(!respuesta.ok){
                throw new Error("Erroral leer los usuarios");
            }else{
                let data = await respuesta.json();
                console.log(data);
                alert("Carga db = "+data.exito)
                data.usuarios.forEach((u:any) => {
                    acumuladorUsers += `id: ${u.id}, nombre: ${u.nombre}, correo: ${u.correo}, clave: ${u.clave}, id_perfil: ${u.id_perfil}\n\n`;
                    console.log(u);
                });
                divUsers.innerText = acumuladorUsers;
                
            }
        }
        
        export async function ModificarUsuarioBD(){
            const id = <HTMLInputElement>document.getElementById('id');
            const nombre = <HTMLInputElement>document.getElementById('nombre');
            const correo = <HTMLInputElement>document.getElementById('correo');
            const clave = <HTMLInputElement>document.getElementById('clave');
            const id_perfil = <HTMLSelectElement>document.getElementById('cboPerfiles');
            

            let objSend = {
                id: `${id.value}`,
                nombre: `${nombre.value}`,
                correo: `${correo.value}`,
                clave: `${clave.value}`,
                id_perfil: `${id_perfil.value}`,
            }
            let objJson = {
                usuario_json: objSend
            }

            let respuesta = await fetch('http://localhost:2024/usuarioBD',{
                method:'PUT',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(objJson)
            });

            if(respuesta.ok){
                let data = await respuesta.json();
                console.log(data.mensaje);
                alert(data.mensaje)
                if(data.exito === true){
                    MostrarUsuariosBD();
                }
            }else{
                throw new Error("Error al modificar el usuario");
            }
            
        }

        export async function EliminarUsuarioBD(){
            const id = <HTMLInputElement>document.getElementById('id');
            let objSend = {
                id: `${id.value}`
            }
            const confirmacion = window.confirm("¿Estás seguro de eliminar este usuario?");

            if(confirmacion)
            {
                let respuesta = await fetch('http://localhost:2024/usuarioBD',{
                    method: 'DELETE',
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify(objSend)
                });

                if(respuesta.ok){
                    let data = await respuesta.json();
                    console.log(data);
                    alert(data.mensaje);
                    if(data.exito === true){
                        MostrarUsuariosBD();
                    }

                }else{
                    throw new Error("Error al eliminar el usuario");
                }
            }
        }

        
        export async function AgregarEmpleado(){
            const id = <HTMLInputElement>document.getElementById('id');
            const nombre = <HTMLInputElement>document.getElementById('nombre');
            const correo = <HTMLInputElement>document.getElementById('correo');
            const clave = <HTMLInputElement>document.getElementById('clave');
            const id_perfil = <HTMLSelectElement>document.getElementById('cboPerfiles');
            const sueldo = <HTMLInputElement>document.getElementById('sueldo');
            const fotoInput = <HTMLInputElement>document.getElementById('foto');
            const foto = fotoInput.files ? fotoInput.files[0] : null;
            let formData = new FormData();

            let objEmpleado = {
                nombre: nombre.value,
                correo: correo.value,
                clave: clave.value,
                id_perfil: id_perfil.value,
                sueldo: sueldo.value,
            }

            formData.append('obj_empleado', JSON.stringify(objEmpleado));
            if(foto){
                formData.append('foto', foto);
            }else{
                console.log("la foto esta vacia");
            }

            let respuesta = await fetch("http://localhost:2024/empleadoBD",{
                method: 'POST',
                body: formData
            });

            if(respuesta.ok){
                let data = await respuesta.json();
                console.log(data);
                if(data.exito === true){
                    console.log(data.mensaje);
                    MostrarEmpleados();
                    limpiarCamposEmpleados();
                }
            }else{
                throw new Error("Error al cargar el empleado");
            }
        }

        export async function MostrarEmpleados(){
            const divEmpleados = document.getElementById('divTablaEmpleados') as HTMLInputElement;
            let empleados = "";
            let respuesta = await fetch('http://localhost:2024/empleadoBD');

            if(respuesta.ok){
                let data = await respuesta.json();
                console.log(data.usuarios);
                let usuarios = data.usuarios;
                let tabla = `<table class="table table-hover">
                        <tr>
                            <th>ID</th><th>NOMBRE</th><th>CORREO</th><th>FOTO</th><th>ACCIONES</th>
                        </tr>`;
                    if(usuarios.length < 1){
                        tabla += `<tr><td>---</td><td>---</td><td>---</td><td>---</td>
                            <td>---</td></tr>`;
                    }
                    else {

                        for (let index = 0; index < usuarios.length; index++) {
                            const dato = usuarios[index] !== "" ? (usuarios[index]) : null;
                            if(dato == null){
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
                
                document.getElementsByName("btnModificar").forEach((boton)=>{

                    boton.addEventListener("click", ()=>{ 
        
                        let obj : any = boton.getAttribute("data-obj");
                        let obj_dato = JSON.parse(obj);
        
                        (<HTMLInputElement>document.getElementById("id")).value = obj_dato.id;
                        (<HTMLInputElement>document.getElementById("nombre")).value = obj_dato.nombre;
                        (<HTMLInputElement>document.getElementById("correo")).value = obj_dato.correo;
                        (<HTMLInputElement>document.getElementById("clave")).value = obj_dato.clave;    
                        (<HTMLInputElement>document.getElementById("sueldo")).value = obj_dato.sueldo;
                        (<HTMLInputElement>document.getElementById("cboPerfiles")).value = obj_dato.id_perfil;
                        (<HTMLImageElement>document.getElementById("imgFoto")).src = URL_API + obj_dato.foto;
        
                        (<HTMLInputElement>document.getElementById("id")).readOnly = true;;
                    });
                });

                document.getElementsByName("btnEliminar").forEach((boton)=>{

                    boton.addEventListener("click", ()=>{ 
        
                        let userJson : any = boton.getAttribute("data-codigo");
                        let usuario = JSON.parse(userJson);
        
                        if(confirm(`¿Desea eliminar al empleado ${usuario.nombre}, con sueldo ${usuario.sueldo}?`)){
                           
                            EliminarEmpleado(usuario);
                        }                
                    });
                });


            }else{
                throw new Error("Error al mostrar los empleados");
            }
        }

        export async function ModificarEmpleado(){

        }

        export async function EliminarEmpleado(usuario:any){


            let respuesta = await fetch(`http://localhost:2024/empleadoBD/${usuario.id}`,{
                method: 'DELETE'
            });
            if(respuesta.ok){
                let data = await respuesta.json();
                console.log(data);
                if(data.exito === true){
                    console.log(data.mensaje);
                    alert(data.mensaje);
                    MostrarEmpleados();
                }
            }else{
                throw new Error("Error al eliminar el empleado");
            }
        }
        

    //}

}
