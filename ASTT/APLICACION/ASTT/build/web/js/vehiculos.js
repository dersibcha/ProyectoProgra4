
/* global google */
var map;
var geocoder;
var latitud; //la latitud para el point
var longitud; //la lomgitud para el point
var lng;//estas son temporales, por que si no hay que obtener la posicion del marker y separarlo con splice a la hora de guardar la posicion correcta , que pereza, mejor llevo una temporal y cuando el usuario se decide se guarda en las de arriba xd
var lat;
var point;

var pagina = 1;//Pagina actual en la que se mostrara los datos
var cantPaginas = 0;


$(function () {
    
    
    
    $("#enviar").click(function () {
        enviar();
    });
    

    
    $("#agregarVehiculo").click(function () {
        limpiarForm();
       $('#myModalFormulario').modal();
    });
    
    $("#registrar").click(function () { 
        limpiarForm();
       $('#myModalFormulario').modal();
    });
    
    $("#btMap").click(function () {
        initMap();
    });
 
    $("#btBuscarSeleccionarChofer").click(function () {
        seleccionarChofer();
    });
 
    
     $("#cargar").click(function () {
        cargarLocalizacion();
    });
    


    $("#cancelar").click(function () {
        $('#myModalFormulario').modal('hide');
         $("#modalMapa").modal('hide');
    });
    $("#cancelarMapa").click(function () {
       
         $("#modalMapa").modal('hide');
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
            
            clearActives();
            pagina = $("#first").val();
            $("#first").addClass("active");
            
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
           
            clearActives();
            pagina = $("#fifth").val();
            $("#fifth").addClass("active");
            
            consultarVehiculos();
        }
    });
    

    $('body').tooltip({selector: '[data-toggle="tooltip"]'});
});




$(document).ready(function () {
    consultarVehiculos();  
    dibujarSelectsAnno();
});




function consultarVehiculos() {
    $.ajax({
        url: 'VehiculoServlet',
        data: {
            accion: "buscarVehiculosByDuenno",
            duenno: $("#usuarioText").text()
        },
        error: function () { //si existe un error en la respuesta del ajax

        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se oculta el mensaje de espera
            //ocultarModal("m    limpiarForm();
            var test1=$("#usuarioText").text();
            var test2=data.length;
            if ($("#usuarioText").text()=== "" || data.length === 0)
            { 
                
            } else {
                dibujarTabla(data);
                // se oculta el modal esta funcion se encuentra en el utils.js
            }
        },
        type: 'POST',
        dataType: "json"
    });
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
     $("#tablaBodyVehiculos").html("");
     cantPaginas = Math.ceil(dataJson.length / 5);
       setHidden();
    for (var i = 5 * (pagina - 1); i < 5 * pagina; i++)
        if(dataJson[i] !== undefined){
            if(dataJson[i].activo===true){dibujarFila(dataJson[i]); }}      
}


function dibujarFila(rowData) {
    var row = $("<tr />");
    
    $("#tablaVehiculo").append(row);
    row.append($("<td>" + rowData.idVehiculo + "</td>"));    
    row.append($("<td>" + rowData.modelo + "</td>"));
    row.append($("<td>" + rowData.placa + "</td>"));
    
    var annosim=rowData.anno.substr(7);   
    row.append($("<td>" + annosim + "</td>"));
    
    row.append($("<td>" + rowData.color + "</td>"));
    row.append($("<td>" + rowData.puntuacion + "</td>"));
    
    var estado = rowData.estado ? "<span class='glyphicon glyphicon-ok' aria-hidden='true'>"
            : "<span class='glyphicon glyphicon-remove' aria-hidden='true'>";
    
    row.append($("<td>" + rowData.ubicacionActual + "</td>"));
    row.append($("<td>" + estado + "</td>"));
   
    
   
    
    
   row.append($('<td><button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="verChoferes(\'' + rowData.idVehiculo +'\');">' +
            '<span class="glyphicon glyphicon-user" aria-hidden="true"></span>' +
            '</button></td>'));
    

     
    row.append($('<td><button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="editarVehiculo(\'' + rowData.idVehiculo +'\');">' +
            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
            '</button>&nbsp;&nbsp;' +
            '<button type="button" class="btn btn-danger btn-xs" aria-label="Left Align" onclick="eliminarVehiculo(\'' + rowData.idVehiculo + '\');">' +
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
            '</button></td>'));
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
            $("#btMap").attr('disabled', 'disabled');        
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
                duenno: $("#usuarioText").text(),
                modelo: $("#modelo").val(),
                placa: $("#placa").val(),
                anno: $("#anno").val(),
                color: $("#color").val(),
                puntuacion: "5", //puntuacion de 5 al iniciar siempre
                estado: "Desactivo",
                ubicacionActual: $("#ubicacionActual").val(),               
                activo:  "Activado"
               
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


function verChoferes(idvehiculo){
    
    
    $.ajax({
        url: 'ChofervehiculoServlet',
        data: {
            accion: "buscarChoferesByIdvehiculo",
            idvehiculo: idvehiculo
        },
        error: function () { //si existe un error en la respuesta del ajax

        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se oculta el mensaje de espera
            //ocultarModal("m    limpiarForm();
            if (idvehiculo === "" || data.length === 0)
            {
                $("#tablaSeleccionarChofer").html("<td>No se encontro ningun Chofer registrado</td>");
                $("#myModalSeleccionarChofer").modal();
                $("#idvehiculoText").text(idvehiculo);
                
            } else {
                $("#myModalSeleccionarChofer").modal();
                dibujarTablaChoferes(data,idvehiculo);
                // se oculta el modal esta funcion se encuentra en el utils.js
            }
        },
        type: 'POST',
        dataType: "json"
    });
}



function dibujarTablaChoferes(dataJson,idvehiculo) {
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
            +" title='Permite eliminar el chofer'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    
    
    $("#idvehiculoText").text(idvehiculo);
     
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
   

     row.append($('<td><button type="button" class="btn btn-primary btn-xs" aria-label="Left Align" onclick="desactivarChofer(\'' + rowData.cedula + '\');">' +
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
            '</button></td>'));
}


function seleccionarChofer(){
    
    $.ajax({
            url: 'ChofervehiculoServlet',
            data: {

                accion: "agregarChofervehiculo",
                idchofervehiculo: "",
                cedulachofer: $("#busquedaSeleccionarChofer").val(),
                idvehiculo: $("#idvehiculoText").text(),
                activo: "Activo"
               
            },
            error: function () { //si existe un error en la respuesta del ajax
                mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0,2);
                if (tipoRespuesta === "C~") {
                  
                    
                    mostrarMensaje("alert alert-success", respuestaTxt, "Correcto!");
                    $("#myModalFormulario").modal("hide");
                    verChoferes();
                    
                    
                   
                    
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
   // $("#groupDuenno").removeClass("has-error");
    $("#groupModelo").removeClass("has-error");
    $("#groupAnno").removeClass("has-error");
    $("#groupPlaca").removeClass("has-error");
    $("#groupColor").removeClass("has-error");
   // $("#groupPuntuacion").removeClass("has-error");
    $("#groupUbicacionActual").removeClass("has-error");
  
    //$("#groupActivo").removeClass("has-error");
    //$("#groupEstado").removeClass("has-error");

    if ($("#idVehiculo").val() === "") {
        $("#groupIdVehiculo").addClass("has-error");
        validacion = false;
    }
//    if ($("#duenno").val() === "") {
//        $("#groupDuenno").addClass("has-error");
//        validacion = false;
//    }
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
//    if ($("#puntuacion").val() === "") {
//        $("#groupPuntuacion").addClass("has-error");
//        validacion = false;
//    }
    if ($("#ubicacionActual").val() === "") {
        $("#groupUbicacionActual").addClass("has-error");
        validacion = false;
    }
    
//    if ($("#activo").val() === "") {
//        $("#groupActivo").addClass("has-error");
//        validacion = false;
//    }
//    if ($("#estado").val() === "") {
//        $("#groupEstado").addClass("has-error");
//        validacion = false;
//    }
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
    $("#btMap").removeAttr("disabled");
    
    $("#action").val("agregarVehiculo");
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

function setHidden(){
    
    
    clearHidden();
    if ($("#first").val() === 1  ) {
        $("#back").attr('hidden', 'hidden');        
        $("#backspan").attr('hidden', 'hidden');        
    }
    if ($("#second").val() > cantPaginas) {
        $("#second").attr('hidden', 'hidden');        
        $("#txt2").attr('hidden', 'hidden');        
    }
    if ($("#third").val() > cantPaginas) {
        $("#third").attr('hidden', 'hidden');        
        $("#txt3").attr('hidden', 'hidden');        
    }
    if ($("#fourth").val() > cantPaginas) {
        $("#fourth").attr('hidden', 'hidden');        
        $("#txt4").attr('hidden', 'hidden');        
    }
    if ($("#fifth").val() > cantPaginas) {
        $("#fifth").attr('hidden', 'hidden');      
        $("#txt5").attr('hidden', 'hidden');      
        $("#next").attr('hidden', 'hidden');      
        $("#nextspan").attr('hidden', 'hidden');      
        
    }
    if ($("#fifth").val() === cantPaginas) {  
        $("#next").attr('hidden', 'hidden');      
        $("#nextspan").attr('hidden', 'hidden');      
        
    }
    
    
}


function clearHidden(){
$("#back").removeAttr("hidden");
$("#backspan").removeAttr("hidden");
$("#first").removeAttr("hidden");
$("#second").removeAttr("hidden");
$("#third").removeAttr("hidden");
$("#fourth").removeAttr("hidden");
$("#fifth").removeAttr("hidden");
$("#txt1").removeAttr("hidden");
$("#txt2").removeAttr("hidden");
$("#txt3").removeAttr("hidden");
$("#txt4").removeAttr("hidden");
$("#txt5").removeAttr("hidden");
$("#next").removeAttr("hidden");
$("#nextspan").removeAttr("hidden");

}