/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function () {
    $('#fechanacimiento').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        endDate: new Date()
    });
    
     $('#vencimientolicencia').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
       
    });
   
   
    
    $("#enviar").click(function () {
        enviar();
    });
    $("#enviarChofer").click(function () {
        enviarChofer();
    });
    
    $("#registrar").click(function () {
        $('#myModalFormularioChofer').modal();
    });
       
   
    $("#editarChofer").click(function () {
       editarChofer();
    });
    $("#editar").click(function () {
       editarUsuario();
    });
   
    $("#eliminar").click(function () {
      desactivarUsuario();
    });
    
    
    
    $("#desregistrar").click(function () {
      desactivarChoferSession();
    });
   
   
   
   
    $("#cancelar").click(function () {
        $('#myModalFormulario').modal('hide');
    });
    
    $("#cancelarChofer").click(function () {
        $('#myModalFormularioChofer').modal('hide');
    });
    
    
    
   

    $('body').tooltip({selector: '[data-toggle="tooltip"]'});
});




$(document).ready(function () {
    consultarUsuario();  
    
});



function consultarUsuario() {
    $.ajax({
        url: 'UsuarioServlet',
        data: {
            accion: "consultarUsuario",
            idusuario:$("#idusuarioh").text()
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            
               
              
            //se carga la información en el formulario
                $("#idusuarioText").html(data.idusuario);
                $("#nombreText").html(data.nombre +" "+data.apellidos);
                
                $("#correoelectronicoText").html(data.correoelectronico);
                $("#contrasenaText").html(data.contrasena);
                $("#fechanacimientoTextinfo").html(data.fechanacimiento);
                $("#direccionText").html(data.direccion);
                $("#telefonoText").html(data.telefono);     
                
                
                var verificar=data.chofer;
               if(typeof(verificar) !== "undefined"){
               $("#cedulaText").html(data.chofer); 
               consultarChofer();  
               } 
        },
        type: 'POST',
        dataType: "json"
    });
}
function consultarChofer() {
    $.ajax({
        url: 'ChoferServlet',
        data: {
            accion: "consultarChofer",
            cedula:$("#cedulaText").text()
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            
               
              
            //se carga la información en el formulario
                $("#tipolicenciaText").html(data.tipolicencia);
                $("#vencimientolicenciaTextinfo").html(data.vencimientolicencia);
  
                
                
              
        },
        type: 'POST',
        dataType: "json"
    });
}


function editarUsuario() {
    $.ajax({
        url: 'UsuarioServlet',
        data: {
            accion: "consultarUsuario",
            idusuario:$("#idusuarioh").text()
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            limpiarForm();
            $("#myModalFormulario").modal();
               
              
            //se carga la información en el formulario
                $("#idusuario").val(data.idusuario);
                $("#nombre").val(data.nombre);
                $("#apellidos").val(data.apellidos);
                $("#correoelectronico").val(data.correoelectronico);
                $("#contrasena").val(data.contrasena);
                $("#fechanacimientoText").val(data.fechanacimiento);
                $("#direccion").val(data.direccion);
                $("#telefono").val(data.telefono);              
        },
        type: 'POST',
        dataType: "json"
    });
}
function editarChofer() {
    $.ajax({
        url: 'ChoferServlet',
        data: {
            accion: "consultarChofer",
            cedula:$("#cedulaText").text()
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            limpiarForm();
            $("#myModalFormularioChofer").modal();
            
            //se modificar el hidden que indicar el tipo de accion que se esta realizando
            $("#action").val("modificarChofer");
            $("#cedula").attr('readonly', 'readonly');        
            //se carga la información en el formulario
            $("#cedula").val(data.cedula);
                $("#tipolicencia").val(data.tipolicencia);                
                $("#vencimientolicenciaText").val(data.vencimientolicencia);
                
                       
        },
        type: 'POST',
        dataType: "json"
    });
}


function enviar() {
    if (validar()) {
        //Se envia la información por ajax
        $.ajax({
            url: 'UsuarioServlet',
            data: {
                accion: "modificarUsuario",
                idusuario: $("#idusuario").val(),
                nombre: $("#nombre").val(),
                apellidos: $("#apellidos").val(),
                correoelectronico: $("#correoelectronico").val(),
                contrasena: $("#contrasena").val(),
                fechanacimiento: $("#fechanacimientoText").val(),
                direccion: $("#direccion").val(),
                telefono: $("#telefono").val(),
                activo: "Activo"
               
            },
            error: function () { //si existe un error en la respuesta del ajax
                mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "C~") {
                  
                    
                    mostrarMensaje("alert alert-success", respuestaTxt, "Correcto!");
                    $("#myModalFormulario").modal("hide");
                   
                    
                    
                    consultarUsuario();
                    
                } else {
                    if (tipoRespuesta === "E~") {
                        mostrarMensaje, ("alert alert-danger", respuestaTxt, "Error!");
                    } else {
                        mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador", "Error!");
                    }
                }
            },
            type: 'POST'
        });

    } else {
        mostrarMensaje("alert alert-danger", "Debe digitar los campos del formulario", "Error!");
    }
}





function enviarChofer() {
    if (validarChofer()) {
        //Se envia la información por ajax
        $.ajax({
            url: 'ChoferServlet',
            data: {
                 
               
                accion: $("#action").val(),
                cedula: $("#cedula").val(),
                tipolicencia: $("#tipolicencia").val(),
                vencimientolicencia: $("#vencimientolicenciaText").val(),
                fechanacimiento: $("#fechanacimientoTextinfo").text(),
                activo: "Activo"
               
            },
            error: function () { //si existe un error en la respuesta del ajax
                mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "C~") {
                  
                    
                    mostrarMensaje("alert alert-success", respuestaTxt, "Correcto!");
                    $("#myModalFormularioChofer").modal("hide");
                   
                    if ($("#action").val() === "modificarChofer") {

                        consultarChofer();
                    } else {
                        registrarChofer($("#cedula").val());
                    }
                    
                } else {
                    if (tipoRespuesta === "E~") {
                        mostrarMensaje, ("alert alert-danger", respuestaTxt, "Error!");
                    } else {
                        mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador", "Error!");
                    }
                }
            },
            type: 'POST'
        });

    } else {
        mostrarMensaje("alert alert-danger", "Debe digitar los campos del formulario", "Error!");
    }
}

function  registrarChofer(cedula){
    
    $.ajax({
        url: 'UsuarioServlet',
        data: {
            accion: "seleccionarChofer",
            idusuario: $("#idusuarioText").text(),
            cedula:cedula
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            limpiarForm();
           activarChoferSession();
            mostrarModal("myModal", "Chofer Seleccionaro Correctamente", "Usuario : "+id+"<br/>"+"Chofer: "+cedula);
            
                  
        },
        type: 'POST',
        dataType: "text"
    });
    
}

function desregistrar(){
    
    $.ajax({
        url: 'UsuarioServlet',
        data: {
            accion: "quitarChofer",
            idusuario: $("#idusuarioh").text(),
            cedula:$("#cedulaText").text()
          
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function () { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            limpiarForm();    
             window.location = "usuario.jsp";
               
  
        },
        type: 'POST',
        dataType: "text"
    });
    
}



function activarChoferSession() {
    
        //Se envia la información por ajax
        $.ajax({
            url: 'UsuarioServlet',
            data: {
                accion: "activarChoferSession"              
            },
            error: function () { //si existe un error en la respuesta del ajax
                mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "C~") {
                    mostrarMensaje("alert alert-success", respuestaTxt, "Correcto!");
                    $("#myModalFormularioChofer").modal("hide");
                    
                    //se redirecciona en JavaScript
                   
                        window.location="usuario.jsp";
                    
                    
                    
                } else {
                    if (tipoRespuesta === "E~") {
                        mostrarMensaje("alert alert-danger", respuestaTxt, "Error!");
                    } else {
                        mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador", "Error!");
                    }
                }

            },
            dataType: "text",
            type: 'POST'
        });
}
        
function desactivarChoferSession() {
    bootbox.confirm({
        message: "Seguro que desea desregistrarse como Chofer? Al realizar esta acción perderá la informacion ",
        buttons: {
            confirm: {
                label: 'Confirmar',
                className: 'btn-success'
            },
            cancel: {
                label: 'Cancelar',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                //Se envia la información por ajax
                $.ajax({
                    url: 'UsuarioServlet',
                    data: {
                        accion: "desactivarChoferSession"
                    },
                    error: function () { //si existe un error en la respuesta del ajax
                        mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
                    },
                    success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                        var respuestaTxt = data.substring(2);
                        var tipoRespuesta = data.substring(0, 2);
                        if (tipoRespuesta === "C~") {
                            mostrarMensaje("alert alert-success", respuestaTxt, "Correcto!");
                            $("#myModalFormularioChofer").modal("hide");

                            //se redirecciona en JavaScript

                           
                           desregistrar();


                        } else {
                            if (tipoRespuesta === "E~") {
                                mostrarMensaje("alert alert-danger", respuestaTxt, "Error!");
                            } else {
                                mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador", "Error!");
                            }
                        }

                    },
                    dataType: "text",
                    type: 'POST'
                });
            }
        }
    });
}


        
function desactivarUsuario() {
    bootbox.confirm({
        message: "Seguro que desea eliminar su Usuario? Al realizar esta acción perderá toda la informacion ",
        buttons: {
            confirm: {
                label: 'Confirmar',
                className: 'btn-success'
            },
            cancel: {
                label: 'Cancelar',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                //Se envia la información por ajax
                $.ajax({
                    url: 'UsuarioServlet',
                    data: {
                        accion: "desactivarUsuario",
                        idusuario: $("#idusuarioh").text()
                    },
                    error: function () { //si existe un error en la respuesta del ajax
                        mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
                    },
                    success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                        var respuestaTxt = data.substring(2);
                        var tipoRespuesta = data.substring(0, 2);
                        if (tipoRespuesta === "C~") {
                            mostrarMensaje("alert alert-success", respuestaTxt, "Correcto!");
                            $("#myModalFormularioChofer").modal("hide");

                            //se redirecciona en JavaScript

                            window.location = "Logout";



                        } else {
                            if (tipoRespuesta === "E~") {
                                mostrarMensaje("alert alert-danger", respuestaTxt, "Error!");
                            } else {
                                mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador", "Error!");
                            }
                        }

                    },
                    dataType: "text",
                    type: 'POST'
                });
            }
        }
    });
}

function validar() {
    var validacion = true;
    $("#groupIdusuario").removeClass("has-error");
    $("#groupNombre").removeClass("has-error");
    $("#groupApellidos").removeClass("has-error");
    $("#groupCorreoelectronico").removeClass("has-error");
    $("#groupDireccion").removeClass("has-error");
    $("#groupTelefono").removeClass("has-error");
    $("#groupContrasena").removeClass("has-error");
    $("#groupFechanacimiento").removeClass("has-error");
    

    if ($("#idusuario").val() === "") {
        $("#groupIdusuario").addClass("has-error");
        validacion = false;
    }
    if ($("#nombre").val() === "") {
        $("#groupNombre").addClass("has-error");
        validacion = false;
    }
    if ($("#apellidos").val() === "") {
        $("#groupApellidos").addClass("has-error");
        validacion = false;
    }
    if ($("#correoelectronico").val() === "") {
        $("#groupCorreoelectronico").addClass("has-error");
        validacion = false;
    }
    if ($("#fechanacimientoText").val() === "") {
        $("#groupFechanacimiento").addClass("has-error");
        validacion = false;
    }
    if ($("#direccion").val() === "") {
        $("#groupDireccion").addClass("has-error");
        validacion = false;
    }
    if ($("#telefono").val() === "") {
        $("#groupTelefono").addClass("has-error");
        validacion = false;
    }
    if ($("#contrasena").val() === "") {
        $("#groupContrasena").addClass("has-error");
        validacion = false;
    }
     
    return validacion;
}



function validarChofer() {
    var validacion = true;
    $("#groupCedula").removeClass("has-error");
    $("#groupTipolicencia").removeClass("has-error");
   
    $("#groupVencimientolicencia").removeClass("has-error");
    
    $("#groupActivo").removeClass("has-error");
    

    if ($("#cedula").val() === "") {
        $("#groupCedula").addClass("has-error");
        validacion = false;
    }
    if ($("#tipolicencia").val() === "") {
        $("#groupTipolicencia").addClass("has-error");
        validacion = false;
    }
   
    if ($("#vencimientolicenciaText").val() === "") {
        $("#groupVencimientolicencia").addClass("has-error");
        validacion = false;
    }
    
    if ($("#activo").val() === "") {
        $("#groupActivo").addClass("has-error");
        validacion = false;
    }
   
    return validacion;
}

function mostrarMensaje(classCss, msg, neg) {
    //se le eliminan los estilos al mensaje
    $("#mesajeResult").removeClass();

    //se setean los estilos
    $("#mesajeResult").addClass(classCss);

    //se muestra la capa del mensaje con los parametros del metodo
    $("#mesajeResult").fadeIn("slow");
    $("#mesajeResultNeg").html(neg);
    $("#mesajeResultText").html(msg);
    $("#mesajeResultText").html(msg);
}


function limpiarForm() {
    //setea el focus del formulario

    $("#action").val("agregarChofer");
    $('#idusuario').focus();
    $("#formChoferes").trigger("reset");
    $('#formUsuarios').trigger("reset");
}

