/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(function() {
    
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
    
    $("#enviar").click(function () {
    if($("#idusuario").val() !== "" ){
        
        chequerUsuario();
       
           
    }
    });
    
    $("#cancelar").click(function () {
       window.location="index.jsp";
    });
    
    
});

function chequerUsuario(){
    
  
    $.ajax({
        url: 'UsuarioServlet',
        data: {
            accion: "buscarUsuariosById",
            idusuario: $("#idusuario").val()
        },
        error: function () { //si existe un error en la respuesta del ajax

        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se oculta el mensaje de espera
            //ocultarModal("m    limpiarForm();
            if (data.length === 0)
            {
                enviar();
            } else {
                
               $("#title").html("Id de usuario existente");
               $("#body").html("<p>Por favor usar uno distinto</p>");
                $("#myModal").modal();
//                 mostrarModal("myModal2", ""+"nose", "");
//                 cambiarMensajeModal("myModal2", "<h4>Id de Usuario ya existe en el sistema</h4>"+"nose", "<p>Por favor usar uno distinto</p>");
//                  
                correcto=false;
                $("#idusuario").val("");
            }
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
                accion:"agregarUsuario",
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
                //mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "C~") {
                  
                    
                    mostrarMensaje("alert alert-success", respuestaTxt, "Correcto!");
                    ingresar();
        
                    
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


function ingresar() {
    
        $.ajax({
            url: 'UsuarioServlet',
            data: {
                accion: "validarUsuario",
                idusuario: $("#idusuario").val(),
                contrasena: $("#contrasena").val()
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
                    
                    //se redirecciona en JavaScript
                    
                    $("#title").html("Nueva Cuenta "+$("#idusuario").val()+" Creada");
                    $("#body").html("<p>Ingresando al sistema</p>");
                    $("#myModal").modal();
                    setTimeout(function(){
                        window.location="index.jsp";
                        $("#myModal").modal();
                    }, 3000);
                    
                    
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