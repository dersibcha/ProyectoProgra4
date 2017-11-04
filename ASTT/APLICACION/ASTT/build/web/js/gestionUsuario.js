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
    
    $("#enviar").click(function () {
        enviar();
    });

  


    $("#btMostrarForm").click(function () {
        limpiarForm();
    });


    $("#btBuscar").click(function () {
        buscarUsuariosById($("#busqueda").val());
    });
    
     
    $(".pag").click(function(){ //BOTNES DE PAGINACION

        clearActives();
            
        pagina = $(this).val(); //Para referenciar que pagina mostrar ver metodo consulta y dibujar
        consultarUsuarios();
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
            
            consultarUsuarios();
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
            
            consultarUsuarios();
        }
    });
    

    $("#cancelar").click(function () {
        $('#myModalFormulario').modal('hide');
    });

    $('body').tooltip({selector: '[data-toggle="tooltip"]'});
});

$(document).ready(function () {
    consultarUsuarios();
    
});





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
            dibujarTabla(data);
        },
        type: 'GET',
        dataType: "json"
    });
}

function buscarVehiculosByDuenno(id) {

    $.ajax({
        url: 'VehiculoServlet',
        data: {
            accion: "buscarVehiculosByDuenno",
            duenno:id
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información delos Vehiculos en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
           if (id === "" || data.length === 0)
            {
                $("#tablaVehiculos").html("<td>No se encontro ningun Vehiculo</td>");
                  $("#myModalVehiculos").modal();
            } else {
                dibujarTablaVehiculos(data);
                // se oculta el modal esta funcion se encuentra en el utils.js
            }
            
           
        },
        type: 'GET',
        dataType: "json"
    });
}


function buscarChofer(id){
    $.ajax({
        url: 'UsuarioServlet',
        data: {
            accion: "consultarUsuario",
            idusuario: id
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            limpiarForm();
            $("#myModalChofer").modal();
            $("#myModalBuscar").modal("hide");
            var verificar=data.chofer;
           if(typeof(verificar) !== "undefined"){
               consultarChofer(data.chofer,id);
           } 
           else{
               consultarChoferes(id);
           }
           
                
           
        },
        type: 'GET',
        dataType: "json"
    });
    
}


function consultarChoferes(id) {

    $.ajax({
        url: 'ChoferServlet',
        data: {
            accion: "consultarChoferes"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de los Choferes en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTablaChoferes(data,id);
        },
        type: 'GET',
        dataType: "json"
    });
}

function consultarChofer(cedula,id) {

    $.ajax({
        url: 'ChoferServlet',
        data: {
            accion: "consultarChofer",
            cedula:cedula
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de los Choferes en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTablaChofer(data,id);
        },
        type: 'GET',
        dataType: "json"
    });
}



function dibujarTabla(dataJson) {
    //limpia la información que tiene la tabla
    $("#tablaUsuario").html("");
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaUsuario").append(head);
    row.append($("<th><b>USARIO</b></th>"));
    row.append($("<th><b>NOMBRE</b></th>"));
    row.append($("<th><b>APELLIDOS</b></th>"));
    row.append($("<th><b>CORREO ELECTRONICO</b></th>"));
    row.append($("<th>FECHA DE NACIMIENTO<b></b></th>"));
    row.append($("<th><b>DIRECCION</b></th>"));
    row.append($("<th><b>TELEFONO</b></th>"));
     row.append($("<th><b>ACTIVO " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Muestra el estado del usuario'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    row.append($("<th><b>CHOFER " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Verifica si el usuario es miembro chofer de ASTT y brinda su informacion'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    
    row.append($("<th><b>VEHICULOS " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Muestra una lista de los automoviles asociados al usuario'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    

    
    row.append($("<th><b>OPCIONES " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Modificar o Eliminar el Usuario'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));

    //carga la tabla con el json devuelto
   
       
       cantPaginas = Math.ceil(dataJson.length / 5);
       setHidden();
    for (var i = 5 * (pagina - 1); i < 5 * pagina; i++)
        if(dataJson[i] !== undefined)
            dibujarFila(dataJson[i]);
       
}


function dibujarFila(rowData) {
    var row = $("<tr />");
    $("#tablaUsuario").append(row);
    row.append($("<td>" + rowData.idusuario + "</td>"));
    row.append($("<td>" + rowData.nombre + "</td>"));
    row.append($("<td>" + rowData.apellidos + "</td>"));
    row.append($("<td>" + rowData.correoelectronico + "</td>"));
    row.append($("<td>" + rowData.fechanacimiento + "</td>"));
    row.append($("<td>" + rowData.direccion + "</td>"));
    row.append($("<td>" + rowData.telefono + "</td>"));
    var activo = rowData.activo ? "<span class='glyphicon glyphicon-ok' aria-hidden='true'>"
            : "<span class='glyphicon glyphicon-remove' aria-hidden='true'>";
    row.append($("<td>" + activo + "</td>"));
    
   
    row.append($('<td><button type="button" class="btn btn-success btn-xs" aria-label="Left Align" onclick="buscarChofer(\'' + rowData.idusuario + '\');">' +
            '<span class="glyphicon glyphicon-user" aria-hidden="true"></span>' +
            '</button></td>'));

    row.append($('<td><button type="button" class="btn btn-success btn-xs" aria-label="Left Align" onclick="buscarVehiculosByDuenno(\'' + rowData.idusuario + '\');">' +
            '<span class="glyphicon glyphicon-road" aria-hidden="true"></span>' +
            '</button></td>'));

     
    row.append($('<td><button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="editarUsuario(\'' + rowData.idusuario +'\');">' +
            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
            '</button>&nbsp;&nbsp;' +
            '<button type="button" class="btn btn-danger btn-xs" aria-label="Left Align" onclick="eliminarUsuario(\'' + rowData.idusuario + '\');">' +
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
    row.append($("<th><b>USARIO</b></th>"));
    row.append($("<th><b>NOMBRE</b></th>"));
    row.append($("<th><b>APELLIDOS</b></th>"));
    row.append($("<th><b>CORREO ELECTRONICO</b></th>"));
    row.append($("<th>FECHA DE NACIMIENTO<b></b></th>"));
    row.append($("<th><b>DIRECCION</b></th>"));
    row.append($("<th><b>TELEFONO</b></th>"));
     row.append($("<th><b>ACTIVO " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Muestra el estado del chofer'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    
    row.append($("<th><b>CHOFER " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Verifica si el usuario es miembro chofer de ASTT y brinda su informacion'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    
    row.append($("<th><b>VEHICULOS " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Muestra una lista de los automoviles asociados al usuario'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    

    
    row.append($("<th><b>OPCIONES " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Modificar o Eliminar el Usuario'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));

    //carga la tabla con el json devuelto
   
       
        for (var i = 0; i < dataJson.length; i++)
            if (dataJson[i] !== undefined)
                dibujarFilaBuscar(dataJson[i]);
        

}

function dibujarFilaBuscar(rowData) {
  var row = $("<tr />");
    $("#tablaBuscar").append(row);
    row.append($("<td>" + rowData.idusuario + "</td>"));
    row.append($("<td>" + rowData.nombre + "</td>"));
    row.append($("<td>" + rowData.apellidos + "</td>"));
    row.append($("<td>" + rowData.correoelectronico + "</td>"));
    row.append($("<td>" + rowData.fechanacimiento + "</td>"));
    row.append($("<td>" + rowData.direccion + "</td>"));
    row.append($("<td>" + rowData.telefono + "</td>"));
    var activo = rowData.activo ? "<span class='glyphicon glyphicon-ok' aria-hidden='true'>"
            : "<span class='glyphicon glyphicon-remove' aria-hidden='true'>";
    row.append($("<td>" + activo + "</td>"));
    
   
    row.append($('<td><button type="button" class="btn btn-success btn-xs" aria-label="Left Align" onclick="buscarChofer(\'' + rowData.idusuario + '\');">' +
            '<span class="glyphicon glyphicon-user" aria-hidden="true"></span>' +
            '</button></td>'));

    row.append($('<td><button type="button" class="btn btn-success btn-xs" aria-label="Left Align" onclick="buscarVehiculosByDuenno(\'' + rowData.idusuario + '\');">' +
            '<span class="glyphicon glyphicon-road" aria-hidden="true"></span>' +
            '</button></td>'));

     
    row.append($('<td><button type="button" class="btn btn-info btn-xs" aria-label="Left Align" onclick="editarUsuario(\'' + rowData.idusuario +'\');">' +
            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
            '</button>&nbsp;&nbsp;' +
            '<button type="button" class="btn btn-danger btn-xs" aria-label="Left Align" onclick="eliminarUsuario(\'' + rowData.idusuario + '\');">' +
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
            '</button></td>'));
}



function dibujarTablaVehiculos(dataJson) {
    //limpia la información que tiene la tabla
   $("#tablaVehiculos").html("");
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaVehiculos").append(head);
    row.append($("<th><b>ID</b></th>"));
    row.append($("<th><b>MODELO</b></th>"));
    row.append($("<th><b>PLACA</b></th>"));
    row.append($("<th><b>ESTADO " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Verifica si el vehiculo esta en uso'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    
    row.append($("<th><b>ACTIVO " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Verifica si el vehiculo esta activo en el sistema'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    

    //carga la tabla con el json devuelto
   
       
        for (var i = 0; i < dataJson.length; i++)
            if (dataJson[i] !== undefined)
                dibujarFilaVehiculos(dataJson[i]);
  
       $("#myModalVehiculos").modal();
}


function dibujarFilaVehiculos(rowData) {
  var row = $("<tr />");
    $("#tablaVehiculos").append(row);
    row.append($("<td>" + rowData.idVehiculo + "</td>"));
    row.append($("<td>" + rowData.modelo + "</td>"));
    row.append($("<td>" + rowData.placa + "</td>"));
    var estado = rowData.estado ? "<span class='glyphicon glyphicon-ok' aria-hidden='true'>"
            : "<span class='glyphicon glyphicon-remove' aria-hidden='true'>";
    var activo = rowData.activo ? "<span class='glyphicon glyphicon-ok' aria-hidden='true'>"
            : "<span class='glyphicon glyphicon-remove' aria-hidden='true'>";

   
    row.append($("<td>" + estado + "</td>"));
    row.append($("<td>" + activo + "</td>"));
}


function dibujarTablaChoferes(dataJson,id) {
    //limpia la información que tiene la tabla
    
   $("#myModalTitleChofer").text("Usuario no anexado a chofer,seleccione chofer");
   $("#tablaChofer").html("");
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaChofer").append(head);
    row.append($("<th><b>CEDULA</b></th>"));
    row.append($("<th><b>TIPO LICENCIA</b></th>"));
    
    row.append($("<th><b>ACTIVO " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Verifica si el chofer esta activo en el sistema'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    
    row.append($("<th><b>SELECCIONAR " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Seleccion el chofer para asignarlo al usuario'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    

    //carga la tabla con el json devuelto
   
       
        for (var i = 0; i < dataJson.length; i++)
            if (dataJson[i] !== undefined)
                dibujarFilaChoferes(dataJson[i],id);
  
       $("#myModalChofer").modal();
}


function dibujarFilaChoferes(rowData,id) {
  var row = $("<tr />");
    $("#tablaChofer").append(row);
    row.append($("<td>" + rowData.cedula + "</td>"));
    row.append($("<td>" + rowData.tipolicencia + "</td>"));
    
    var activo = rowData.activo ? "<span class='glyphicon glyphicon-ok' aria-hidden='true'>"
            : "<span class='glyphicon glyphicon-remove' aria-hidden='true'>";

    row.append($("<td>" + activo + "</td>"));
    row.append($('<td><button type="button" class="btn btn-success btn-xs" aria-label="Left Align" onclick="seleccionarChofer(\'' + rowData.cedula + '\',\'' + id + '\');">' +
            '<h6>seleccionar</h6>' +
            '</button></td>'));
}


function dibujarTablaChofer(dataJson,id) {
    //limpia la información que tiene la tabla
    
   $("#myModalTitleChofer").text("Chofer correspondiente del usuario");
   $("#tablaChofer").html("");
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaChofer").append(head);
    row.append($("<th><b>CEDULA</b></th>"));
    row.append($("<th><b>TIPO LICENCIA</b></th>"));
    
    row.append($("<th><b>ACTIVO " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Verifica si el chofer esta activo en el sistema'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    
    row.append($("<th><b>QUITAR " + 
            "<a href='#' class='test' data-toggle='tooltip' data-placement='top'"
            +" title='Quita la relacion del chofer y el usuario'>"
            +"<span class='glyphicon glyphicon-info-sign'></span></a></b></th>"));
    

    //carga la tabla con el json devuelto
   
      
        dibujarFilaChofer(dataJson,id);
        $("#myModalChofer").modal();
}

function dibujarFilaChofer(rowData,id) {
  var row = $("<tr />");
    $("#tablaChofer").append(row);
    row.append($("<td>" + rowData.cedula + "</td>"));
    row.append($("<td>" + rowData.tipolicencia + "</td>"));
    
    var activo = rowData.activo ? "<span class='glyphicon glyphicon-ok' aria-hidden='true'>"
            : "<span class='glyphicon glyphicon-remove' aria-hidden='true'>";

    row.append($("<td>" + activo + "</td>"));
    row.append($('<td><button type="button" class="btn btn-danger btn-xs" aria-label="Left Align" onclick="quitarChofer(\'' + rowData.cedula + '\',\'' + id + '\');">' +
            '<h6>Quitar</h6>' +
            '</button></td>'));
}

function seleccionarChofer(cedula,id){
    
    $.ajax({
        url: 'UsuarioServlet',
        data: {
            accion: "seleccionarChofer",
            idusuario: id,
            cedula:cedula
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            limpiarForm();
            $("#myModalChofer").modal("hide");
            $("#myModalBuscar").modal("hide");
            mostrarModal("myModal", "Chofer Seleccionaro Correctamente", "Usuario : "+id+"<br/>"+"Chofer: "+cedula);
            
                  
        },
        type: 'POST',
        dataType: "text"
    });
    
}
function quitarChofer(cedula,id){
    
    $.ajax({
        url: 'UsuarioServlet',
        data: {
            accion: "quitarChofer",
            idusuario: id,
            cedula:cedula
          
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function () { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            limpiarForm();
           
            $("#myModalBuscar").modal("hide");
            $("#myModalChofer").modal("hide");
             mostrarModal("myModal", "Chofer desasignado Correctamente", "Usuario : "+id+"<br/>"+"Chofer: "+cedula);
             
  
        },
        type: 'POST',
        dataType: "text"
    });
    
}

function buscarUsuariosById(id) {
    $.ajax({
        url: 'UsuarioServlet',
        data: {
            accion: "buscarUsuariosById",
            idusuario: id
        },
        error: function () { //si existe un error en la respuesta del ajax

        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se oculta el mensaje de espera
            //ocultarModal("m    limpiarForm();
            if (id === "" || data.length === 0)
            {
                $("#tablaBuscar").html("<td>No se encontro ningun Usuario</td>");
            } else {
                dibujarTablaBuscar(data);
                // se oculta el modal esta funcion se encuentra en el utils.js
            }
        },
        type: 'POST',
        dataType: "json"
    });
}



function editarUsuario(id) {
    $.ajax({
        url: 'UsuarioServlet',
        data: {
            accion: "consultarUsuario",
            idusuario: id
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            limpiarForm();
            $("#myModalFormulario").modal();
            $("#myModalBuscar").modal("hide");
            
           
                
            
            //se modificar el hidden que indicar el tipo de accion que se esta realizando
            $("#action").val("modificarUsuario");
            $("#idusuario").attr('readonly', 'readonly');        
            //se carga la información en el formulario
            $("#idusuario").val(data.idusuario);
                $("#nombre").val(data.nombre);
                $("#apellidos").val(data.apellidos);
                $("#correoelectronico").val(data.correoelectronico);
                $("#contrasena").val(data.contrasena);
                $("#fechanacimientoText").val(data.fechanacimiento);
                $("#direccion").val(data.direccion);
                $("#telefono").val(data.telefono);
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
            url: 'UsuarioServlet',
            data: {
                accion: $("#action").val(),
                idusuario: $("#idusuario").val(),
                nombre: $("#nombre").val(),
                apellidos: $("#apellidos").val(),
                correoelectronico: $("#correoelectronico").val(),
                contrasena: $("#contrasena").val(),
                fechanacimiento: $("#fechanacimientoText").val(),
                direccion: $("#direccion").val(),
                telefono: $("#telefono").val(),
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
                   
                    
                    
                    consultarUsuarios();
                    
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



function eliminarUsuario(id) {
   
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
                        url: 'UsuarioServlet',
                        data: {
                            accion: "eliminarUsuario",
                            idusuario: id
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
                                setTimeout(consultarUsuarios(), 1000);// hace una pausa y consulta la información de la base de datos                               
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
    $("#groupIdusuario").removeClass("has-error");
    $("#groupNombre").removeClass("has-error");
    $("#groupApellidos").removeClass("has-error");
    $("#groupCorreoelectronico").removeClass("has-error");
    $("#groupDireccion").removeClass("has-error");
    $("#groupTelefono").removeClass("has-error");
    $("#groupContrasena").removeClass("has-error");
    $("#groupFechanacimiento").removeClass("has-error");
    $("#groupActivo").removeClass("has-error");

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

    $("#action").val("agregarUsuario");
    $('#idusuario').focus();
    $("#idusuario").removeAttr("readonly");
    //se cambia la accion por agregarTipoavion
    //$("#accion").val("agregarRuta"); 

    //esconde el div del mensaje
    //mostrarMensaje("hiddenDiv", "", "");

    //Resetear el formulario
    $('#formUsuarios').trigger("reset");
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