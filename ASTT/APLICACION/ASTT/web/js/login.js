//******************************************************************************
// // Funcion para generar el datetimepicker
// Además de agregar los eventos a las respectivas etiquetas
//******************************************************************************
$(function () {
    
    //agrega los eventos las capas necesarias
    $("#enviar").click(function () {
        enviar();
    });

    //agrega los eventos las capas necesarias
    $("#cancelar").click(function () {
        limpiarForm();
        $("#myModalFormulario").modal("hide");
    });
    
    
    $("#cancelar").click(function () {
       window.location="index.jsp";
    });
    
});

//******************************************************************************
//******************************************************************************
//El metodo enviar envia la información del login
//******************************************************************************
//******************************************************************************

function enviar() {
    if (validar()) {
        //Se envia la información por ajax
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
                    setTimeout(function(){
                        window.location="index.jsp";
                    }, 1000);
                    
                    
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
    } else {
        mostrarMensaje("alert alert-danger", "Debe digitar los campos del formulario", "Error!");
    }
}

function validar() {
    var validacion = true;

    //Elimina estilo de error en los css
    //notese que es sobre el grupo que contienen el input
    $("#groupIdusario").removeClass("has-error");
    $("#groupContrasena").removeClass("has-error");

    //valida cada uno de los campos del formulario
    //Nota: Solo si fueron digitados
    if ($("#idusuario").val() === "") {
        $("#groupIdusario").addClass("has-error");
        validacion = false;
    }
    if ($("#contrasena").val() === "") {
        $("#groupContrasena").addClass("has-error");
        validacion = false;
    }
    return validacion;
}


//******************************************************************************
//******************************************************************************

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

//******************************************************************************
//******************************************************************************

function limpiarForm() {
    //setea el focus del formulario
    $('#idusuario').focus();

    //Resetear el formulario
    $('#formLogin').trigger("reset");
}


