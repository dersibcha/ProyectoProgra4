/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var pagina = 1;//Pagina actual en la que se mostrara los datos
var cantPaginas = 0;




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

  


    $("#btMostrarForm").click(function () {
        limpiarForm();
    });


    $("#btBuscar").click(function () {
        buscarChoferesById($("#busqueda").val());
    });
    
     $(".pag").click(function(){ //BOTNES DE PAGINACION

        clearActives();
            
        pagina = $(this).val(); //Para referenciar que pagina mostrar ver metodo consulta y dibujar
        consultarChoferes();
        $(this).addClass("active");
   
    });
    
    $("#next").click(function(){ ///Boton de sisguiente en la paginacion
        if ($("#fifth").val() <= cantPaginas) {
            $("#first").val(parseInt($("#first").val()) + 5); //Se cambia el valor del li
            $("#txt1").text(parseInt($("#txt1").text()) + 5);
            $("#second").val(parseInt($("#second").val()) + 5);
            $("#txt2").text(parseInt($("#txt2").text()) + 5);
            $("#third").val(parseInt($("#third").val()) + 5);
            $("#txt3").text(parseInt($("#txt3").text()) + 5);
            $("#fourth").val(parseInt($("#fourth").val()) + 5);
            $("#txt4").text(parseInt($("#txt4").text()) + 5);
            $("#fifth").val(parseInt($("#fifth").val()) + 5);
            $("#txt5").text(parseInt($("#txt5").text()) + 5);
            consultarChoferes();
        }
    });
    
    $("#back").click(function(){ ///Boton de atras en la paginacion
        if ($("#first").val() != 1) {
            $("#first").val(parseInt($("#first").val()) - 5); //Se cambia el valor del li
            $("#txt1").text(parseInt($("#txt1").text()) - 5);
            $("#second").val(parseInt($("#second").val()) - 5);
            $("#txt2").text(parseInt($("#txt2").text()) - 5);
            $("#third").val(parseInt($("#third").val()) - 5);
            $("#txt3").text(parseInt($("#txt3").text()) - 5);
            $("#fourth").val(parseInt($("#fourth").val()) - 5);
            $("#txt4").text(parseInt($("#txt4").text()) - 5);
            $("#fifth").val(parseInt($("#fifth").val()) - 5);
            $("#txt5").text(parseInt($("#txt5").text()) - 5);
            consultarChoferes();
        }
    });
    
    

    $("#cancelar").click(function () {
        $('#myModalFormulario').modal('hide');
    });

    $('body').tooltip({selector: '[data-toggle="tooltip"]'});
});

$(document).ready(function () {
    consultarChoferes();
    
    
});





function consultarChoferes() {

    $.ajax({
        url: 'ChoferServlet',
        data: {
            accion: "consultarChoferes"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de los Choferes en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTabla(data);
        },
        type: 'GET',
        dataType: "json"
    });
}




function dibujarTabla(dataJson) {
    //limpia la información que tiene la tabla
    $("#tablaChofer").html("");
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaChofer").append(head);
    row.append($("<th><b>CEDULA</b></th>"));
    row.append($("<th><b>LICENCIA</b></th>"));
    
    row.append($("<th><b>FECHA NACIMIENTO</b></th>"));
    row.append($("<th><b>VENCIMIENTO LICENCIA</b></th>"));

    row.append($("<th><b>ACTIVO " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Muestra el estado del chofer'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    

    
    row.append($("<th><b>OPCIONES " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Modificar o Eliminar el chofer'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));

    //carga la tabla con el json devuelto
   
       
       cantPaginas = Math.ceil(dataJson.length / 5);
    for (var i = 5 * (pagina - 1); i < 5 * pagina; i++)
        if(dataJson[i] !== undefined)
            dibujarFila(dataJson[i]);
       
}


function dibujarFila(rowData) {
    var row = $("<tr />");
    $("#tablaChofer").append(row);
    row.append($("<td>" + rowData.cedula + "</td>"));
    row.append($("<td>" + rowData.tipolicencia + "</td>"));
    row.append($("<td>" + rowData.fechanacimiento + "</td>"));
    row.append($("<td>" + rowData.vencimientolicencia + "</td>"));
    
    
    var activo = rowData.activo ? "<span class='glyphicon glyphicon-ok' aria-hidden='true'>"
            : "<span class='glyphicon glyphicon-remove' aria-hidden='true'>";
    row.append($("<td>" + activo + "</td>"));
   
   
    

     
    row.append($('<td><button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="editarChofer(\'' + rowData.cedula +'\');">' +
            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
            '</button>&nbsp;&nbsp;' +
            '<button type="button" class="btn btn-danger btn-xs" aria-label="Left Align" onclick="eliminarChofer(\'' + rowData.cedula + '\');">' +
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
            '</button></td>'));
}

function dibujarTablaBuscar(dataJson) {
    //limpia la información que tiene la tabla
    $("#tablaBuscar").html("");
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaBuscar").append(head);
    row.append($("<th><b>CEDULA</b></th>"));
    row.append($("<th><b>LICENCIA</b></th>"));
    
    row.append($("<th><b>FECHA NACIMIENTO</b></th>"));
    row.append($("<th><b>VENCIMIENTO LICENCIA</b></th>"));

    row.append($("<th><b>ACTIVO " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Muestra el estado del chofer'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    

    
    row.append($("<th><b>OPCIONES " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Modificar o Eliminar el chofer'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));

    //carga la tabla con el json devuelto
   
       
        for (var i = 0; i < dataJson.length; i++)
            if (dataJson[i] !== undefined)
                dibujarFilaBuscar(dataJson[i]);
       
}


function dibujarFilaBuscar(rowData) {
    var row = $("<tr />");
    $("#tablaBuscar").append(row);
    row.append($("<td>" + rowData.cedula + "</td>"));
    row.append($("<td>" + rowData.tipolicencia + "</td>"));
    row.append($("<td>" + rowData.fechanacimiento + "</td>"));
    row.append($("<td>" + rowData.vencimientolicencia + "</td>"));
    
    
    var activo = rowData.activo ? "<span class='glyphicon glyphicon-ok' aria-hidden='true'>"
            : "<span class='glyphicon glyphicon-remove' aria-hidden='true'>";
    row.append($("<td>" + activo + "</td>"));
   
   
    

     
    row.append($('<td><button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="editarChofer(\'' + rowData.cedula +'\');">' +
            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
            '</button>&nbsp;&nbsp;' +
            '<button type="button" class="btn btn-danger btn-xs" aria-label="Left Align" onclick="eliminarChofer(\'' + rowData.cedula + '\');">' +
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
            '</button></td>'));
}

function buscarChoferesById(cedula) {
    $.ajax({
        url: 'ChoferServlet',
        data: {
            accion: "buscarChoferesById",
            cedula: cedula
        },
        error: function () { //si existe un error en la respuesta del ajax

        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se oculta el mensaje de espera
            //ocultarModal("m    limpiarForm();
            if (cedula === "" || data.length === 0)
            {
                $("#tablaBuscar").html("<td>No se encontro ningun Chofer</td>");
            } else {
                dibujarTablaBuscar(data);
                // se oculta el modal esta funcion se encuentra en el utils.js
            }
        },
        type: 'POST',
        dataType: "json"
    });
}



function editarChofer(cedula) {
    $.ajax({
        url: 'ChoferServlet',
        data: {
            accion: "consultarChofer",
            cedula: cedula
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            limpiarForm();
            $("#myModalFormulario").modal();
            $("#myModalBuscar").modal("hide");
            
           
                
            
            //se modificar el hidden que indicar el tipo de accion que se esta realizando
            $("#action").val("modificarChofer");
            $("#cedula").attr('readonly', 'readonly');        
            //se carga la información en el formulario
            $("#cedula").val(data.cedula);
                $("#tipolicencia").val(data.tipolicencia);
                $("#fechanacimientoText").val(data.fechanacimiento);
                $("#vencimientolicenciaText").val(data.vencimientolicencia);
                
                var act= data.activo ? "Activo" 
                                     : "Desactivo";     
                $("#activo").val(act);
               
                
                
        },
        type: 'POST',
        dataType: "json"
    });
}




function enviar() {
    if (validar()) {
        //Se envia la información por ajax
        $.ajax({
            url: 'ChoferServlet',
            data: {
                 
               
                accion: $("#action").val(),
                cedula: $("#cedula").val(),
                tipolicencia: $("#tipolicencia").val(),
                vencimientolicencia: $("#vencimientolicenciaText").val(),
                fechanacimiento: $("#fechanacimientoText").val(),
                activo: $("#activo").val()
               
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
                   
                    
                    
                    consultarChoferes();
                    
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



function eliminarChofer(cedula) {
   
        bootbox.confirm({
            message: "Seguro que desea eliminar el Chofer? Al realizar esta acción perderá la informacion de los servicios",
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
            callback: function(result) {
                if (result) {
                    $.ajax({
                        url: 'ChoferServlet',
                        data: {
                            accion: "eliminarChofer",
                            cedula: cedula
                        },
                        error: function () { //si existe un error en la respuesta del ajax
                            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
                        },
                        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                            // se cambia el mensaje del modal por la respuesta del ajax
                            var respuestaTxt = data.substring(2);
                            var tipoRespuesta = data.substring(0, 2);
                            if (tipoRespuesta === "E~") {
                                cambiarMensajeModal("myModal", "Resultado acción", respuestaTxt);
                            } else {
                                setTimeout(consultarChoferes(), 1000);// hace una pausa y consulta la información de la base de datos                               
                            }
                        },
                        type: 'POST',
                        dataType: "text"
                    });
                }
            }
        });
    }






function validar() {
    var validacion = true;
    $("#groupCedula").removeClass("has-error");
    $("#groupTipolicencia").removeClass("has-error");
    $("#groupFechanacimiento").removeClass("has-error");
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
    if ($("#fechanacimientoText").val() === "") {
        $("#groupFechanacimiento").addClass("has-error");
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
    $('#cedula').focus();
    $("#cedula").removeAttr("readonly");
    //se cambia la accion por agregarTipoavion
    //$("#accion").val("agregarRuta"); 

    //esconde el div del mensaje
    //mostrarMensaje("hiddenDiv", "", "");

    //Resetear el formulario
    $('#formChoferes').trigger("reset");
}


function clearActives(){
    $('.pag').removeClass("active");
}