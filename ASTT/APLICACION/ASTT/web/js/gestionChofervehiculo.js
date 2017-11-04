/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var pagina = 1;//Pagina actual en la que se mostrara los datos
var cantPaginas = 0;



$(function () {
  
    
    
    
    $("#enviar").click(function () {
        enviar();
    });

  


    $("#btMostrarForm").click(function () {
        limpiarForm();
    });


    $("#btBuscar").click(function () {
        //completar lo del select
         if($("#selectbuscar").val()==="Chofer"){
        buscarChofervehiculoByCedulachofer($("#busqueda").val());}
    else if ($("#selectbuscar").val()==="Vehiculo"){
        
        buscarChofervehiculoByIdvehiculo($("#busqueda").val());
    }else{
          $("#tablaBuscar").html("<td>Seleccione un criterio de busqueda</td>");
    }
    });
    
    
    $("#btSelecCedulachofer").click(function () {
       
        consultarChoferes();
    });
    $("#btSelecIdvehiculo").click(function () {
       
        consultarVehiculos();
    });
    
    

    $("#cancelar").click(function () {
        $('#myModalFormulario').modal('hide');
    });


$(".pag").click(function(){ //BOTNES DE PAGINACION
        
       
            clearActives();
            
        pagina = $(this).val(); //Para referenciar que pagina mostrar ver metodo consulta y dibujar
        consultarChofervehiculos();
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
            consultarChofervehiculos();
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
            consultarChofervehiculos();
        }
    });


    $('body').tooltip({selector: '[data-toggle="tooltip"]'});
});

$(document).ready(function () {
    consultarChofervehiculos();   
});





function consultarChofervehiculos() {

    $.ajax({
        url: 'ChofervehiculoServlet',
        data: {
            accion: "consultarChofervehiculos"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de los Choferesvehiculos en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTabla(data);
        },
        type: 'GET',
        dataType: "json"
    });
}





function consultarChoferes() {
    $.ajax({
        url: 'ChoferServlet',
        data: {
            accion: "consultarChoferes"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información delos Infantes en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
           
            dibujarTablaChoferes(data);
        },
        type: 'GET',
        dataType: "json"
    });
}

function consultarVehiculos() {
    $.ajax({
        url: 'VehiculoServlet',
        data: {
            accion: "consultarVehiculos"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información delos Infantes en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
           
            dibujarTablaVehiculos(data);
        },
        type: 'GET',
        dataType: "json"
    });
}


function dibujarTabla(dataJson) {
    //limpia la información que tiene la tabla
    $("#tablaChofervehiculo").html("");
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaChofervehiculo").append(head);
    row.append($("<th><b>ID:</b></th>"));
    row.append($("<th><b>CEDULA CHOFER:</b></th>"));
    row.append($("<th><b>ID VEHICULO</b></th>"));
   

    row.append($("<th><b>ACTIVO " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Muestra el estado del chofer/vehiculo'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    

    
    row.append($("<th><b>OPCIONES " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Modificar o Eliminar el chofer/vehiculo'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));

    //carga la tabla con el json devuelto
   
       cantPaginas = Math.ceil(dataJson.length / 5);
    for (var i = 5 * (pagina - 1); i < 5 * pagina; i++)
        if(dataJson[i] !== undefined)
            dibujarFila(dataJson[i]);
        
       
}


function dibujarFila(rowData) {
    var row = $("<tr />");
    $("#tablaChofervehiculo").append(row);
    row.append($("<td>" + rowData.idchofervehiculo + "</td>"));
    
    row.append($('<td>' + rowData.cedulachofer + '&nbsp;&nbsp;<button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="mostrarInfoChofer(\'' + rowData.cedulachofer + '\');">' +
            '<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>' +
            '</button></td>'));
    
    
    row.append($('<td>' + rowData.idvehiculo + '&nbsp;&nbsp;<button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="mostrarInfoVehiculo(\'' + rowData.idvehiculo + '\');">' +
            '<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>' +
            '</button></td>'));
    
    
    
    
    
    var activo = rowData.activo ? "<span class='glyphicon glyphicon-ok' aria-hidden='true'>"
            : "<span class='glyphicon glyphicon-remove' aria-hidden='true'>";
    row.append($("<td>" + activo + "</td>"));
   
   
    

     
    row.append($('<td><button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="editarChofervehiculo(\'' + rowData.idchofervehiculo +'\');">' +
            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
            '</button>&nbsp;&nbsp;' +
            '<button type="button" class="btn btn-danger btn-xs" aria-label="Left Align" onclick="eliminarChofervehiculo(\'' + rowData.idchofervehiculo + '\');">' +
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
    row.append($("<th><b>CEDULA CHOFER:</b></th>"));
    row.append($("<th><b>ID VEHICULO</b></th>"));
   

    row.append($("<th><b>ACTIVO " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Muestra el estado del chofer/vehiculo'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    

    
    row.append($("<th><b>OPCIONES " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Modificar o Eliminar el chofer/vehiculo'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));

    //carga la tabla con el json devuelto
   
       
        for (var i = 0; i < dataJson.length; i++)
            if (dataJson[i] !== undefined)
                dibujarFilaBuscar(dataJson[i]);
       
}


function dibujarFilaBuscar(rowData) {
    var row = $("<tr />");
    $("#tablaBuscar").append(row);
    row.append($("<td>" + rowData.idchofervehiculo + "</td>"));
    
   row.append($('<td>' + rowData.cedulachofer + '&nbsp;&nbsp;<button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="mostrarInfoChofer(\'' + rowData.cedulachofer + '\');">' +
            '<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>' +
            '</button></td>'));
    
    
    row.append($('<td>' + rowData.idvehiculo + '&nbsp;&nbsp;<button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="mostrarInfoVehiculo(\'' + rowData.idvehiculo + '\');">' +
            '<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>' +
            '</button></td>'));
    
    
    
    
    var activo = rowData.activo ? "<span class='glyphicon glyphicon-ok' aria-hidden='true'>"
            : "<span class='glyphicon glyphicon-remove' aria-hidden='true'>";
    row.append($("<td>" + activo + "</td>"));
   
   
    

     
    row.append($('<td><button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="editarChofervehiculo(\'' + rowData.idchofervehiculo +'\');">' +
            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
            '</button>&nbsp;&nbsp;' +
            '<button type="button" class="btn btn-danger btn-xs" aria-label="Left Align" onclick="eliminarChofervehiculo(\'' + rowData.idchofervehiculo + '\');">' +
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
            '</button></td>'));
}




function dibujarTablaChoferes(dataJson) {
    //limpia la información que tiene la tabla
    $("#tablaSeleccionarChofer").html("");
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaSeleccionarChofer").append(head);
    row.append($("<th><b>CEDULA</b></th>"));
    row.append($("<th><b>TIPO LICENCIA</b></th>"));
     row.append($("<th><b>ACTIVO " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Muestra el estado del chofer'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    
    row.append($("<th><b>OPCION " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Permite seleccionar el chofer'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    
     
        for (var i = 0; i < dataJson.length; i++)
            if (dataJson[i] !== undefined )
                dibujarFilaChoferes(dataJson[i]);
        
        
        $("#myModalSeleccionarChofer").modal();
       
}


function dibujarFilaChoferes(rowData) {
    var row = $("<tr />");
    $("#tablaSeleccionarChofer").append(row);
    row.append($("<td>" + rowData.cedula + "</td>"));
    row.append($("<td>" + rowData.tipolicencia + "</td>"));
    var activo = rowData.activo ? "<span class='glyphicon glyphicon-ok' aria-hidden='true'>"
            : "<span class='glyphicon glyphicon-remove' aria-hidden='true'>";
    row.append($("<td>" + activo + "</td>"));
   

     row.append($('<td><button type="button" class="btn btn-primary btn-xs" aria-label="Left Align" onclick="selectChofer(\'' + rowData.cedula + '\');">' +
            '<h6>Seleccionar</h6>' +
            '</button></td>'));
}

function dibujarTablaVehiculos(dataJson) {
    //limpia la información que tiene la tabla
    $("#tablaSeleccionarVehiculo").html("");
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaSeleccionarVehiculo").append(head);
    row.append($("<th><b>ID VEHICULO</b></th>"));
    row.append($("<th><b>DUEÑO</b></th>"));
    row.append($("<th><b>MODELO</b></th>"));
     row.append($("<th><b>ACTIVO " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Muestra el estado del vehiculo'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    
    row.append($("<th><b>OPCION " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Permite seleccionar el Vehiculo'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    
     
        for (var i = 0; i < dataJson.length; i++)
            if (dataJson[i] !== undefined )
                dibujarFilaVehiculos(dataJson[i]);
        
        
        $("#myModalSeleccionarVehiculo").modal();
       
}


function dibujarFilaVehiculos(rowData) {
    var row = $("<tr />");
    $("#tablaSeleccionarVehiculo").append(row);
    row.append($("<td>" + rowData.idVehiculo + "</td>"));
    row.append($("<td>" + rowData.duenno + "</td>"));
    row.append($("<td>" + rowData.modelo + "</td>"));
    var activo = rowData.activo ? "<span class='glyphicon glyphicon-ok' aria-hidden='true'>"
            : "<span class='glyphicon glyphicon-remove' aria-hidden='true'>";
    row.append($("<td>" + activo + "</td>"));
   

     row.append($('<td><button type="button" class="btn btn-primary btn-xs" aria-label="Left Align" onclick="selectVehiculo(\'' + rowData.idVehiculo + '\');">' +
            '<h6>Seleccionar</h6>' +
            '</button></td>'));
}


function selectChofer(cedulachofer){
    $("#cedulachofer").val(cedulachofer);
    $("#myModalSeleccionarChofer").modal("hide");
}
function selectVehiculo(idvehiculo){
    $("#idvehiculo").val(idvehiculo);
    $("#myModalSeleccionarVehiculo").modal("hide");
}



function buscarChofervehiculoByCedulachofer(cedulachofer) {
    $.ajax({
        url: 'ChofervehiculoServlet',
        data: {
            accion: "buscarChofervehiculosByCedulachofer",
            cedulachofer: cedulachofer
        },
        error: function () { //si existe un error en la respuesta del ajax

        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se oculta el mensaje de espera
            //ocultarModal("m    limpiarForm();
            if (cedulachofer === "" || data.length === 0)
            {
                $("#tablaBuscar").html("<td>No se encontro ningun Chofer/vehiculo</td>");
            } else {
                dibujarTablaBuscar(data);
                // se oculta el modal esta funcion se encuentra en el utils.js
            }
        },
        type: 'POST',
        dataType: "json"
    });
}
function buscarChofervehiculoByIdvehiculo(idvehiculo) {
    $.ajax({
        url: 'ChofervehiculoServlet',
        data: {
            accion: "buscarChofervehiculosByIdvehiculo",
            idvehiculo: idvehiculo
        },
        error: function () { //si existe un error en la respuesta del ajax

        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se oculta el mensaje de espera
            //ocultarModal("m    limpiarForm();
            if (idvehiculo === "" || data.length === 0)
            {
                $("#tablaBuscar").html("<td>No se encontro ningun Chofer/vehiculo</td>");
            } else {
                dibujarTablaBuscar(data);
                // se oculta el modal esta funcion se encuentra en el utils.js
            }
        },
        type: 'POST',
        dataType: "json"
    });
}



function editarChofervehiculo(idchofervehiculo) {
    $.ajax({
        url: 'ChofervehiculoServlet',
        data: {
            accion: "consultarChofervehiculo",
            idchofervehiculo: idchofervehiculo
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            limpiarForm();
            $("#myModalFormulario").modal();
            $("#myModalBuscar").modal("hide");
            
           
                
            
            //se modificar el hidden que indicar el tipo de accion que se esta realizando
            $("#action").val("modificarChofervehiculo");
            //$("#cedula").attr('readonly', 'readonly');        
            //se carga la información en el formulario
                $("#idchofervehiculo").val(data.idchofervehiculo);
                $("#cedulachofer").val(data.cedulachofer);
                $("#idvehiculo").val(data.idvehiculo);
                
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
            url: 'ChofervehiculoServlet',
            data: {
                 
               
                accion: $("#action").val(),
                idchofervehiculo: "",
                cedulachofer: $("#cedulachofer").val(),
                idvehiculo: $("#idvehiculo").val(),
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
                   
                    
                    
                    consultarChofervehiculos();
                    
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



function eliminarChofervehiculo(idchofervehiculo) {
   
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
                        url: 'ChofervehiculoServlet',
                        data: {
                            accion: "eliminarChofervehiculo",
                            idchofervehiculo: idchofervehiculo
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
                                setTimeout(consultarChofervehiculos(), 1000);// hace una pausa y consulta la información de la base de datos                               
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
   
    $("#groupCedulachofer").removeClass("has-error");
    $("#groupIdvehiculo").removeClass("has-error");
    
    $("#groupActivo").removeClass("has-error");
    
    if ($("#cedulachofer").val() === "") {
        $("#groupCedulachofer").addClass("has-error");
        validacion = false;
    }
    if ($("#idvehiculo").val() === "") {
        $("#groupIdvehiculo").addClass("has-error");
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

    $("#action").val("agregarChofervehiculo");
    //$('#cedula').focus();
    //$("#cedula").removeAttr("readonly");
    //se cambia la accion por agregarTipoavion
    //$("#accion").val("agregarRuta"); 

    //esconde el div del mensaje
    //mostrarMensaje("hiddenDiv", "", "");

    //Resetear el formulario
    $('#formChofervehiculos').trigger("reset");
}


function clearActives(){
    $('.pag').removeClass("active");
}