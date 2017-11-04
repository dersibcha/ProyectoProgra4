/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var pagina = 1;//Pagina actual en la que se mostrara los datos
var cantPaginas = 0;
var cantPaginas2 = 0;


/* global google */
var map;
var geocoder;
var latitud; //la latitud para el point
var longitud; //la lomgitud para el point
var lng;//estas son temporales, por que si no hay que obtener la posicion del marker y separarlo con splice a la hora de guardar la posicion correcta , que pereza, mejor llevo una temporal y cuando el usuario se decide se guarda en las de arriba xd
var lat;
var point;


$(function () {
    
    $("#enviar").click(function () {
        enviar();
    });

  


    $("#btMostrarForm").click(function () {
        limpiarForm();
    });


    $("#btBuscar").click(function () {
        buscarVehiculosById($("#busqueda").val());
    });
    
     $(".pag").click(function(){ //BOTNES DE PAGINACION

        clearActives();           
        pagina = $(this).val(); //Para referenciar que pagina mostrar ver metodo consulta y dibujar
        consultarVehiculos();
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
            consultarVehiculos();
        }
    });
    
    $("#back").click(function(){ ///Boton de atras en la paginacion
        if ($("#first").val() !== 1) {
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
            consultarVehiculos();
        }
    });
    
    $("#btMap").click(function () {
        initMap();
    });
 
    
     $("#aceptar").click(function () {
        cargarLocalizacion();
    });
    


    $("#cancelar").click(function () {
        $('#myModalFormulario').modal('hide');
         $("#modalMapa").modal('hide');
    });




    $('body').tooltip({selector: '[data-toggle="tooltip"]'});
});

$(document).ready(function () {
    consultarVehiculos();
    consultarUsuarios();
    dibujarSelectsAnno();
    
});





function consultarVehiculos() {

    $.ajax({
        url: 'VehiculoServlet',
        data: {
            accion: "consultarVehiculos"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información delos Vehiculos en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTabla(data);
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
            alert("Se presento un error a la hora de cargar la información de los usuarios en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarSelects(data);
            // se oculta el modal esta funcion se encuentra en el utils.js
            ocultarModal("myModal");

        },
        type: 'POST',
        dataType: "json"
    });
}


function dibujarSelects(dataJson) {
    //limpia la información que tiene la tabla
    $("#duenno").html(""); 
    $("#duenno").append("<option selected disabled>Seleccione al Dueño por usuario</option>");
    //carga la tabla con el json devuelto
    for (var i = 0; i < dataJson.length; i++) {
        dibujarValores(dataJson[i]);
    }
}


function dibujarValores(rowData) {
    //Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
    //de una persona
    $("#duenno").append($("<option>" + rowData.idusuario + "</option>")); 
}


function dibujarSelectsAnno() {
    //limpia la información que tiene la tabla
    $("#anno").html(""); 
    $("#anno").append("<option selected disabled>Seleccione al Año del Vehiculo</option>");
    //carga la tabla con el json devuelto
    for (var i = 2008; i <= 2017; i++) {
        dibujarValoresAnno(i);
    }
}


function dibujarValoresAnno(i) {
    //Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
    //de una persona
    $("#anno").append($("<option>" + i.toString() + "</option>")); 
}

function dibujarTabla(dataJson) {
    //limpia la información que tiene la tabla
    $("#tablaVehiculo").html("");
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaVehiculo").append(head);
    row.append($("<th><b>VEHICULO</b></th>"));
    row.append($("<th><b>DUEÑO</b></th>"));
    row.append($("<th><b>MODELO</b></th>"));
    row.append($("<th><b>PLACA</b></th>"));
    row.append($("<th>AÑO<b></b></th>"));
    row.append($("<th><b>COLOR</b></th>"));
    row.append($("<th><b>PUNTUACION</b></th>"));
    row.append($("<th><b>ESTADO " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Muestra si el vehiculo esta en uso'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    
     row.append($("<th><b>UBICACION</b></th>"));
     
     
    row.append($("<th><b>ACTIVO " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Muestra el estado del vehiculo'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    

    
    row.append($("<th><b>OPCIONES " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Modificar o Eliminar el vehiculo'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));

    //carga la tabla con el json devuelto
   
       
    cantPaginas = Math.ceil(dataJson.length / 5);
    for (var i = 5 * (pagina - 1); i < 5 * pagina; i++)
        if(dataJson[i] !== undefined)
            dibujarFila(dataJson[i]);
       
}


function dibujarFila(rowData) {
    var row = $("<tr />");
    $("#tablaVehiculo").append(row);
    row.append($("<td>" + rowData.idVehiculo + "</td>"));
    row.append($("<td>" + rowData.duenno + "</td>"));
    row.append($("<td>" + rowData.modelo + "</td>"));
    row.append($("<td>" + rowData.placa + "</td>"));
    
    var annosim=rowData.anno.substr(7);   
    row.append($("<td>" + annosim + "</td>"));
    
    row.append($("<td>" + rowData.color + "</td>"));
    row.append($("<td>" + rowData.puntuacion + "</td>"));
    
    var estado = rowData.estado ? "<span class='glyphicon glyphicon-ok' aria-hidden='true'>"
            : "<span class='glyphicon glyphicon-remove' aria-hidden='true'>";
    row.append($("<td>" + estado + "</td>"));
   
    row.append($("<td>" + rowData.ubicacionActual + "</td>"));
   
    
    var activo = rowData.activo ? "<span class='glyphicon glyphicon-ok' aria-hidden='true'>"
            : "<span class='glyphicon glyphicon-remove' aria-hidden='true'>";
    row.append($("<td>" + activo + "</td>"));
   
   
    

     
    row.append($('<td><button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="editarVehiculo(\'' + rowData.idVehiculo +'\');">' +
            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
            '</button>&nbsp;&nbsp;' +
            '<button type="button" class="btn btn-danger btn-xs" aria-label="Left Align" onclick="eliminarVehiculo(\'' + rowData.idVehiculo + '\');">' +
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
    row.append($("<th><b>VEHICULO</b></th>"));
    row.append($("<th><b>DUEÑO</b></th>"));
    row.append($("<th><b>MODELO</b></th>"));
    row.append($("<th><b>PLACA</b></th>"));
    row.append($("<th>AÑO<b></b></th>"));
    row.append($("<th><b>COLOR</b></th>"));
    row.append($("<th><b>PUNTUACION</b></th>"));
    row.append($("<th><b>ESTADO " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Muestra si el vehiculo esta en uso'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    
     row.append($("<th><b>UBICACION</b></th>"));
    
     
    row.append($("<th><b>ACTIVO " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Muestra el estado del vehiculo'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    

    
    row.append($("<th><b>OPCIONES " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Modificar o Eliminar el vehiculo'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));

    //carga la tabla con el json devuelto
   
       
        for (var i = 0; i < dataJson.length; i++)
            if (dataJson[i] !== undefined)
                dibujarFilaBuscar(dataJson[i]);
       
}


function dibujarFilaBuscar(rowData) {
    var row = $("<tr />");
    $("#tablaBuscar").append(row);
    row.append($("<td>" + rowData.idVehiculo + "</td>"));
    row.append($("<td>" + rowData.duenno + "</td>"));
    row.append($("<td>" + rowData.modelo + "</td>"));
    row.append($("<td>" + rowData.placa + "</td>"));
    
    var annosim=rowData.anno.substr(7);   
    row.append($("<td>" + annosim + "</td>"));
    
    row.append($("<td>" + rowData.color + "</td>"));
    row.append($("<td>" + rowData.puntuacion + "</td>"));
    
    var estado = rowData.estado ? "<span class='glyphicon glyphicon-ok' aria-hidden='true'>"
            : "<span class='glyphicon glyphicon-remove' aria-hidden='true'>";
    row.append($("<td>" + estado + "</td>"));
   
    row.append($("<td>" + rowData.ubicacionActual + "</td>"));
   
    
    var activo = rowData.activo ? "<span class='glyphicon glyphicon-ok' aria-hidden='true'>"
            : "<span class='glyphicon glyphicon-remove' aria-hidden='true'>";
    row.append($("<td>" + activo + "</td>"));
   
   
    

     
    row.append($('<td><button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="editarVehiculo(\'' + rowData.idVehiculo +'\');">' +
            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
            '</button>&nbsp;&nbsp;' +
            '<button type="button" class="btn btn-danger btn-xs" aria-label="Left Align" onclick="eliminarVehiculo(\'' + rowData.idVehiculo + '\');">' +
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
            '</button></td>'));
}



function buscarVehiculosById(id) {
    $.ajax({
        url: 'VehiculoServlet',
        data: {
            accion: "buscarVehiculosById",
            idVehiculo: id
        },
        error: function () { //si existe un error en la respuesta del ajax

        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se oculta el mensaje de espera
            //ocultarModal("m    limpiarForm();
            if (id === "" || data.length === 0)
            {
                $("#tablaBuscar").html("<td>No se encontro ningun Vehiculo</td>");
            } else {
                dibujarTablaBuscar(data);
                // se oculta el modal esta funcion se encuentra en el utils.js
            }
        },
        type: 'POST',
        dataType: "json"
    });
}



function editarVehiculo(id) {
    $.ajax({
        url: 'VehiculoServlet',
        data: {
            accion: "consultarVehiculo",
            idVehiculo: id
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            limpiarForm();
            $("#myModalFormulario").modal();
            $("#myModalBuscar").modal("hide");
            
           
                
            
            //se modificar el hidden que indicar el tipo de accion que se esta realizando
            $("#action").val("modificarVehiculo");
            $("#idVehiculo").attr('readonly', 'readonly');        
            //se carga la información en el formulario
            $("#idVehiculo").val(data.idVehiculo);
                $("#duenno").val(data.duenno);
                $("#modelo").val(data.modelo);
                $("#placa").val(data.placa);
                
               var annosim=data.anno.substr(6);   
                $("#anno").val(annosim);
                
                $("#color").val(data.color);
                $("#puntuacion").val(data.puntuacion);
                
                var est= data.estado ? "Activo" 
                                     : "Desactivo";                       
                $("#estado").val(est);
                
                $("#ubicacionActual").val(data.ubicacionActual);
                
                
                
                var act= data.activo ? "Activado" 
                                     : "Desactivado";     
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
            url: 'VehiculoServlet',
            data: {
                 
               
                accion: $("#action").val(),
                idVehiculo: $("#idVehiculo").val(),
                duenno: $("#duenno").val(),
                modelo: $("#modelo").val(),
                placa: $("#placa").val(),
                anno: $("#anno").val(),
                color: $("#color").val(),
                puntuacion: $("#puntuacion").val(),
                estado: $("#estado").val(),
                ubicacionActual: $("#ubicacionActual").val(),               
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
                   
                    
                    
                    consultarVehiculos();
                    
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



function eliminarVehiculo(id) {
   
        bootbox.confirm({
            message: "Seguro que desea eliminar el Usuario? Al realizar esta acción perderá la informacion delos Vehiculos y los servicios",
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
                        url: 'VehiculoServlet',
                        data: {
                            accion: "eliminarVehiculo",
                            idVehiculo: id
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
                                setTimeout(consultarVehiculos(), 1000);// hace una pausa y consulta la información de la base de datos                               
                            }
                        },
                        type: 'POST',
                        dataType: "text"
                    });
                }
            }
        });
    }





function initMap() {

    geocoder = new google.maps.Geocoder(); //es para obtener de un text una cordenada pero aqui lo usamos a la inversa

    var myLatLng = {lat: -25.363, lng: 131.044}; //cordenada default , se puede cambiar por una madre de obtener la localizacion por gps
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 8
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });


    google.maps.event.addListener(map, "idle", function () {
        google.maps.event.trigger(map, 'resize');
    });

    google.maps.event.addListener(map, 'click', function (event) {
        lat = event.latLng.lat();   //temporales
        lng = event.latLng.lng(); //temporales
        var myLatLng = {lat: lat, lng: lng};
        marker.setPosition(myLatLng);
        codeLatLng(myLatLng);

    });

}



function codeLatLng(latlng) { // se encarga de obtener de la cordenada la direccion, asi se le muestra al usuario mas bonito
    geocoder.geocode({'latLng': latlng}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {

                $('#address').val(results[0].formatted_address); // el formato y los resultados es generado por un json que crea el geocode

            } else {
                alert('No results found');
            }
        } else {
            alert('Geocoder failed due to: ' + status);
        }
    });
}



function cargarLocalizacion() {

    if ($('#address').val() !== "") {
        $('#ubicacionActual').val($('#address').val());
        $("#modalMapa").modal('hide');
        longitud = lng; //el usuario al confirmar ya se guarda en la latitud y longitud deseada para mandar al servlet
        latitud = lat;
    } else {
        alert('aun no se selecciona localizacion');
    }
}








function validar() {
    var validacion = true;
    $("#groupIdVehiculo").removeClass("has-error");
    $("#groupDuenno").removeClass("has-error");
    $("#groupModelo").removeClass("has-error");
    $("#groupAnno").removeClass("has-error");
    $("#groupPlaca").removeClass("has-error");
    $("#groupColor").removeClass("has-error");
    $("#groupPuntuacion").removeClass("has-error");
    $("#groupUbicacionActual").removeClass("has-error");
  
    $("#groupActivo").removeClass("has-error");
    $("#groupEstado").removeClass("has-error");

    if ($("#idVehiculo").val() === "") {
        $("#groupIdVehiculo").addClass("has-error");
        validacion = false;
    }
    if ($("#duenno").val() === "") {
        $("#groupDuenno").addClass("has-error");
        validacion = false;
    }
    if ($("#modelo").val() === "") {
        $("#groupModelo").addClass("has-error");
        validacion = false;
    }
    if ($("#anno").val() === "") {
        $("#groupAnno").addClass("has-error");
        validacion = false;
    }
    if ($("#placa").val() === "") {
        $("#groupPlaca").addClass("has-error");
        validacion = false;
    }
    if ($("#color").val() === "") {
        $("#groupColor").addClass("has-error");
        validacion = false;
    }
    if ($("#puntuacion").val() === "") {
        $("#groupPuntuacion").addClass("has-error");
        validacion = false;
    }
    if ($("#ubicacionActual").val() === "") {
        $("#groupUbicacionActual").addClass("has-error");
        validacion = false;
    }
    
    if ($("#activo").val() === "") {
        $("#groupActivo").addClass("has-error");
        validacion = false;
    }
    if ($("#estado").val() === "") {
        $("#groupEstado").addClass("has-error");
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

    $("#action").val("agregarVehiculo");
    $("#idVehiculo").focus();
    $("#idVehiculo").removeAttr("readonly");
    //se cambia la accion por agregarTipoavion
    //$("#accion").val("agregarRuta"); 

    //esconde el div del mensaje
    //mostrarMensaje("hiddenDiv", "", "");

    //Resetear el  formulario
    $('#formVehiculos').trigger("reset");
}


function clearActives(){
    $('.pag').removeClass("active");
}