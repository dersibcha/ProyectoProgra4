/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var pagina = 1;//Pagina actual en la que se mostrara los datos
var cantPaginas = 0;




$(function () {
  
     $('#horasalidatext').timepicker();
     $('#horallegadatext').timepicker();
    
    
  
    
    $("#enviar").click(function () {
        enviar();
    });

  


    $("#btMostrarForm").click(function () {
        limpiarForm();
    });


    $("#btBuscar").click(function () {
        //completar lo del select
         if($("#selectbuscar").val()==="Chofer/Vehiculo"){
        buscarChofervehiculoByIdchofervehiculo($("#busqueda").val());}
    else if ($("#selectbuscar").val()==="Usuario"){
        
        buscarChofervehiculoByIdusuario($("#busqueda").val());
    }else{
          $("#tablaBuscar").html("<td>Seleccione un criterio de busqueda</td>");
    }
    });
    
    
    $("#btSelecIdchofervehiculo").click(function () {
       
        consultarChofervehiculos();
    });
    $("#btSelecIdusuario").click(function () {
       
        consultarUsuarios();
    });
    
    
    $(".pag").click(function(){ //BOTNES DE PAGINACION

        clearActives();
            
        pagina = $(this).val(); //Para referenciar que pagina mostrar ver metodo consulta y dibujar
        consultarServicios();
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
            consultarServicios();}
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
            consultarServicios();
        }
    });
    
    
    

    $("#cancelar").click(function () {
        $('#myModalFormulario').modal('hide');
    });

    $('body').tooltip({selector: '[data-toggle="tooltip"]'});
});

$(document).ready(function () {
    consultarServicios();   
});





function consultarServicios() {

    $.ajax({
        url: 'ServicioServlet',
        data: {
            accion: "consultarServicios"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de los Servicios en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTabla(data);
        },
        type: 'GET',
        dataType: "json"
    });
}





function consultarChofervehiculos() {
    $.ajax({
        url: 'ChofervehiculoServlet',
        data: {
            accion: "consultarChofervehiculos"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información delos choferesvehiculos en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
           
            if (data.length === 0)
            {
                $("#tablaSeleccionarChofervehiculo").html("<td>No se encontro ningun Chofer/vehiculo</td>");
                 $("#myModalSeleccionarChofervehiculo").modal();
            } else {
                dibujarTablaChofervehiculos(data);
                // se oculta el modal esta funcion se encuentra en el utils.js
            }
           
           
           
        },
        type: 'GET',
        dataType: "json"
    });
}

function consultarUsuarios() {
    $.ajax({
        url: 'UsuarioServlet',
        data: {
            accion: "consultarUsuarios"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información delos Usuarios en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
           
           if (data.length === 0)
            {
                $("#tablaSeleccionarUsuario").html("<td>No se encontro ningun Usuario</td>");
                 $("#myModalSeleccionarUsuario").modal();
            } else {
              dibujarTablaUsuarios(data);
                // se oculta el modal esta funcion se encuentra en el utils.js
            }
            
        },
        type: 'GET',
        dataType: "json"
    });
}


function dibujarTabla(dataJson) {
    //limpia la información que tiene la tabla
    $("#tablaServicio").html("");
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaServicio").append(head);
    row.append($("<th><b>ID:</b></th>"));
    
    row.append($("<th><b>USUARIO</b></th>"));
    row.append($("<th><b>CHOFER/VEHICULO:</b></th>"));
    row.append($("<th><b>ORIGEN:</b></th>"));
    row.append($("<th><b>DESTINO:</b></th>"));
    row.append($("<th><b>HORA SALIDA:</b></th>"));
    row.append($("<th><b>HORA LLEGADA:</b></th>"));
    row.append($("<th><b>COSTO:</b></th>"));
       row.append($("<th><b>FORMA DE PAGO:</b></th>"));
    row.append($("<th><b>RETROALIMENTACION:</b></th>"));
    
    

    
    row.append($("<th><b>OPCIONES " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Modificar o Eliminar el servicio'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));

    //carga la tabla con el json devuelto
   
       
        cantPaginas = Math.ceil(dataJson.length / 5);
    for (var i = 5 * (pagina - 1); i < 5 * pagina; i++)
        if(dataJson[i] !== undefined)
            dibujarFila(dataJson[i]);
       
}


function dibujarFila(rowData) {
    var row = $("<tr />");
    $("#tablaServicio").append(row);
    row.append($("<td>" + rowData.idservicio + "</td>"));
    
    
      
    row.append($('<td>' + rowData.idusuario + '&nbsp;&nbsp;<button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="mostrarInfoUsuario(\'' + rowData.idusuario + '\');">' +
            '<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>' +
            '</button></td>'));
    
    row.append($('<td>' + rowData.idchofervehiculo + '&nbsp;&nbsp;<button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="mostrarInfoChofervehiculo(\'' + rowData.idchofervehiculo + '\');">' +
            '<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>' +
            '</button></td>'));
    
  
    
    
     row.append($("<td>" + rowData.origen + "</td>"));
     row.append($("<td>" + rowData.destino + "</td>"));
     row.append($("<td>" + rowData.horasalida + "</td>"));
     row.append($("<td>" + rowData.horallegada + "</td>"));
     row.append($("<td>" + rowData.costo + "</td>"));
     row.append($("<td>" + rowData.formapago + "</td>"));
     row.append($("<td>" + rowData.retroalimentacion + "</td>"));
     
    row.append($('<td><button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="editarServicio(\'' + rowData.idservicio +'\');">' +
            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
            '</button>&nbsp;&nbsp;' +
            '<button type="button" class="btn btn-danger btn-xs" aria-label="Left Align" onclick="eliminarServicio(\'' + rowData.idservicio + '\');">' +
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
    row.append($("<th><b>ID:</b></th>"));
    
    row.append($("<th><b>USUARIO</b></th>"));
    row.append($("<th><b>CHOFER/VEHICULO:</b></th>"));
    row.append($("<th><b>ORIGEN:</b></th>"));
    row.append($("<th><b>DESTINO:</b></th>"));
    row.append($("<th><b>HORA SALIDA:</b></th>"));
    row.append($("<th><b>HORA LLEGADA:</b></th>"));
    row.append($("<th><b>COSTO:</b></th>"));
    row.append($("<th><b>FORMA DE PAGO:</b></th>"));
    row.append($("<th><b>RETROALIMENTACION:</b></th>"));
    
    

    
    row.append($("<th><b>OPCIONES " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Modificar o Eliminar el servicio'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));

    //carga la tabla con el json devuelto
   
       
        for (var i = 0; i < dataJson.length; i++)
            if (dataJson[i] !== undefined)
                dibujarFilaBuscar(dataJson[i]);
       
}


function dibujarFilaBuscar(rowData) {
    var row = $("<tr />");
    $("#tablaBuscar").append(row);
    row.append($("<td>" + rowData.idservicio + "</td>"));
    
    
     row.append($('<td>' + rowData.idusuario + '&nbsp;&nbsp;<button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="mostrarInfoUsuario(\'' + rowData.idusuario + '\');">' +
            '<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>' +
            '</button></td>'));
    
    
    row.append($('<td>' + rowData.idchofervehiculo + '&nbsp;&nbsp;<button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="mostrarInfoChofervehiculo(\'' + rowData.idchofervehiculo + '\');">' +
            '<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>' +
            '</button></td>'));
    
    
   
    
    
     row.append($("<td>" + rowData.origen + "</td>"));
     row.append($("<td>" + rowData.destino + "</td>"));
     row.append($("<td>" + rowData.horasalida + "</td>"));
     row.append($("<td>" + rowData.horallegada + "</td>"));
     row.append($("<td>" + rowData.costo + "</td>"));
     row.append($("<td>" + rowData.formapago + "</td>"));
     row.append($("<td>" + rowData.retroalimentacion + "</td>"));
     
    row.append($('<td><button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="editarServicio(\'' + rowData.idservicio +'\');">' +
            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
            '</button>&nbsp;&nbsp;' +
            '<button type="button" class="btn btn-danger btn-xs" aria-label="Left Align" onclick="eliminarServicio(\'' + rowData.idservicio + '\');">' +
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
            '</button></td>'));
}






function dibujarTablaChofervehiculos(dataJson) {
    //limpia la información que tiene la tabla
    $("#tablaSeleccionarChofervehiculo").html("");
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaSeleccionarChofervehiculo").append(head);
    row.append($("<th><b>ID</b></th>"));
    row.append($("<th><b>ID VEHICULO</b></th>"));
    row.append($("<th><b>CEDULA CHOFER</b></th>"));
     row.append($("<th><b>ACTIVO " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Muestra el estado del chofer/vehiculo'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    
    row.append($("<th><b>OPCION " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Permite seleccionar el chofer/vehiculo'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    
     
        for (var i = 0; i < dataJson.length; i++)
            if (dataJson[i] !== undefined )
                dibujarFilaChofervehiculos(dataJson[i]);
        
        
        $("#myModalSeleccionarChofervehiculo").modal();
       
}


function dibujarFilaChofervehiculos(rowData) {
    var row = $("<tr />");
    $("#tablaSeleccionarChofervehiculo").append(row);
    row.append($("<td>" + rowData.idchofervehiculo + "</td>"));
    row.append($("<td>" + rowData.idvehiculo + "</td>"));
    row.append($("<td>" + rowData.cedulachofer + "</td>"));
    var activo = rowData.activo ? "<span class='glyphicon glyphicon-ok' aria-hidden='true'>"
            : "<span class='glyphicon glyphicon-remove' aria-hidden='true'>";
    row.append($("<td>" + activo + "</td>"));
   

     row.append($('<td><button type="button" class="btn btn-primary btn-xs" aria-label="Left Align" onclick="selectChofervehiculo(\'' + rowData.idchofervehiculo + '\');">' +
            '<h6>Seleccionar</h6>' +
            '</button></td>'));
}

function dibujarTablaUsuarios(dataJson) {
    //limpia la información que tiene la tabla
    $("#tablaSeleccionarUsuario").html("");
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaSeleccionarUsuario").append(head);
    row.append($("<th><b>USUARIO</b></th>"));
    row.append($("<th><b>NOMBRE</b></th>"));
    row.append($("<th><b>APELLIDOS</b></th>"));
     row.append($("<th><b>ACTIVO " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Muestra el estado del usuario'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    
    row.append($("<th><b>OPCION " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Permite seleccionar el usuario'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    
     
        for (var i = 0; i < dataJson.length; i++)
            if (dataJson[i] !== undefined )
                dibujarFilaUsuarios(dataJson[i]);
        
        
        $("#myModalSeleccionarUsuario").modal();
       
}


function dibujarFilaUsuarios(rowData) {
    var row = $("<tr />");
    $("#tablaSeleccionarUsuario").append(row);
    row.append($("<td>" + rowData.idusuario + "</td>"));
    row.append($("<td>" + rowData.nombre + "</td>"));
    row.append($("<td>" + rowData.apellidos + "</td>"));
    var activo = rowData.activo ? "<span class='glyphicon glyphicon-ok' aria-hidden='true'>"
            : "<span class='glyphicon glyphicon-remove' aria-hidden='true'>";
    row.append($("<td>" + activo + "</td>"));
   

     row.append($('<td><button type="button" class="btn btn-primary btn-xs" aria-label="Left Align" onclick="selectUsuario(\'' + rowData.idusuario + '\');">' +
            '<h6>Seleccionar</h6>' +
            '</button></td>'));
}


function selectChofervehiculo(idchofervehiculo){
    $("#idchofervehiculo").val(idchofervehiculo);
    $("#myModalSeleccionarChofervehiculo").modal("hide");
}
function selectUsuario(idusuario){
    $("#idusuario").val(idusuario);
    $("#myModalSeleccionarUsuario").modal("hide");
}



function buscarChofervehiculoByChofervehiculo(chofervehiculo) {
    $.ajax({
        url: 'ServicioServlet',
        data: {
            accion: "buscarChofervehiculosByChofervehiculo",
            chofervehiculo: chofervehiculo
        },
        error: function () { //si existe un error en la respuesta del ajax

        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se oculta el mensaje de espera
            //ocultarModal("m    limpiarForm();
            if (chofervehiculo === "" || data.length === 0)
            {
                $("#tablaBuscar").html("<td>No se encontro ningun servicio</td>");
            } else {
                dibujarTablaBuscar(data);
                // se oculta el modal esta funcion se encuentra en el utils.js
            }
        },
        type: 'POST',
        dataType: "json"
    });
}




function buscarChofervehiculoByIdusuario(idusuario) {
    $.ajax({
        url: 'ServicioServlet',
        data: {
            accion: "buscarServiciosByIdusuario",
            idusuario: idusuario
        },
        error: function () { //si existe un error en la respuesta del ajax

        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se oculta el mensaje de espera
            //ocultarModal("m    limpiarForm();
            if (idusuario === "" || data.length === 0)
            {
                $("#tablaBuscar").html("<td>No se encontro ningun Servicio</td>");
            } else {
                dibujarTablaBuscar(data);
                // se oculta el modal esta funcion se encuentra en el utils.js
            }
        },
        type: 'POST',
        dataType: "json"
    });
}
function buscarChofervehiculoByIdchofervehiculo(idchofervehiculo) {
    $.ajax({
        url: 'ServicioServlet',
        data: {
            accion: "buscarServiciosByIdchofervehiculo",
            idchofervehiculo: idchofervehiculo
        },
        error: function () { //si existe un error en la respuesta del ajax

        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se oculta el mensaje de espera
            //ocultarModal("m    limpiarForm();
            if (idusuario === "" || data.length === 0)
            {
                $("#tablaBuscar").html("<td>No se encontro ningun Servicio</td>");
            } else {
                dibujarTablaBuscar(data);
                // se oculta el modal esta funcion se encuentra en el utils.js
            }
        },
        type: 'POST',
        dataType: "json"
    });
}



function editarServicio(idservicio) {
    $.ajax({
        url: 'ServicioServlet',
        data: {
            accion: "consultarServicio",
            idservicio: idservicio
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            limpiarForm();
            $("#myModalFormulario").modal();
            $("#myModalBuscar").modal("hide");
            
           
                
            
            //se modificar el hidden que indicar el tipo de accion que se esta realizando
            $("#action").val("modificarServicio");
            //$("#cedula").attr('readonly', 'readonly');        
            //se carga la información en el formulario
                $("#idservicio").val(data.idservicio);
                $("#idusuario").val(data.idusuario);
                $("#idchofervehiculo").val(data.idchofervehiculo);
                $("#origen").val(data.origen);
                $("#destino").val(data.destino);
                $("#horasalidatext").val(data.horasalida);
                $("#horallegadatext").val(data.horallegada);
                $("#formapago").val(data.formapago);
                $("#costo").val(data.costo);
                $("#retroalimentacion").val(data.retroalimentacion);
              
        },
        type: 'POST',
        dataType: "json"
    });
}




function enviar() {
    if (validar()) {
        //Se envia la información por ajax
        $.ajax({
            url: 'ServicioServlet',
            data: {
                 
               
                accion: $("#action").val(),
                idservicio: $("#idservicio").val(),
                idusuario: $("#idusuario").val(),
                idchofervehiculo: $("#idchofervehiculo").val(),
                origen: $("#origen").val(),
                destino: $("#destino").val(),
                horasalida:getHour( $("#horasalidatext").val()),
                minutosalida:getMinutes( $("#horasalidatext").val()),
                horallegada: getHour($("#horallegadatext").val()),
                minutollegada: getMinutes($("#horallegadatext").val()),
                costo: $("#costo").val(),
                formapago: $("#formapago").val(),
                retroalimentacion: $("#retroalimentacion").val()
               
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
                   
                    
                    
                    consultarServicios();
                    
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




function getHour(hora){
    var resp=hora[0];
    if(hora[1]!==":"){
        resp=resp+hora[1];
    }
    if(hora[5]==="P" || hora[6]==="P"){
        var number=parseInt(resp)+12;
        resp=number.toString();
    }
   return resp;
}
function getMinutes(hora){
    var resp="";
    if(hora[2]===":"){
        resp=hora.slice(3,5);
    }else{
        resp=hora.slice(2,4);
    }
    return resp;
}





function eliminarServicio(idservicio) {
   
        bootbox.confirm({
            message: "Seguro que desea eliminar el Chofer/vehiculo? Al realizar esta acción perderá la informacion de los servicios",
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
                        url: 'ServicioServlet',
                        data: {
                            accion: "eliminarServicio",
                            idservicio: idservicio
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
                                setTimeout(consultarServicios(), 1000);// hace una pausa y consulta la información de la base de datos                               
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
   
    $("#groupIdchofervehiculo").removeClass("has-error");
    $("#groupIdusuario").removeClass("has-error");
    $("#groupOrigen").removeClass("has-error");
    $("#groupDestino").removeClass("has-error");
    $("#groupHorasalida").removeClass("has-error");
    $("#groupHorallegada").removeClass("has-error");
    $("#groupCosto").removeClass("has-error");
    $("#groupFormapago").removeClass("has-error");
    $("#groupRetroalimentacion").removeClass("has-error");
    
    
    
    if ($("#idchofervehiculo").val() === "") {
        $("#groupIdchofervehiculo").addClass("has-error");
        validacion = false;
    }
    if ($("#idusuario").val() === "") {
        $("#groupIdusuario").addClass("has-error");
        validacion = false;
    }
    if ($("#origen").val() === "") {
        $("#groupOrigen").addClass("has-error");
        validacion = false;
    }
    if ($("#destino").val() === "") {
        $("#groupDestino").addClass("has-error");
        validacion = false;
    }
    if ($("#horasalidatext").val() === "") {
        $("#groupHorasalida").addClass("has-error");
        validacion = false;
    }
    if ($("#horallegadatext").val() === "") {
        $("#groupHorallegada").addClass("has-error");
        validacion = false;
    }
    if ($("#costo").val() === "") {
        $("#groupCosto").addClass("has-error");
        validacion = false;
    }
    if ($("#formapago").val() === "") {
        $("#groupFormapago").addClass("has-error");
        validacion = false;
    }
    if ($("#retroalimentacion").val() === "") {
        $("#groupRetroalimentacion").addClass("has-error");
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

    $("#action").val("agregarServicio");
    //$('#cedula').focus();
    //$("#cedula").removeAttr("readonly");
    //se cambia la accion por agregarTipoavion
    //$("#accion").val("agregarRuta"); 

    //esconde el div del mensaje
    //mostrarMensaje("hiddenDiv", "", "");

    //Resetear el formulario
    $('#formServicios').trigger("reset");
}


function clearActives(){
    $('.pag').removeClass("active");
}