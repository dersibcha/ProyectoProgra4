<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.*" session="true" %>

<%

    HttpSession sesion = request.getSession(true);
    String estado = "";
    String tipo = "";
    
    if(sesion!=null){
        if (sesion.getAttribute("idusuario")  == null) {
            response.sendRedirect("index.jsp");
        }else{
            estado = (String)sesion.getAttribute("loginStatus");
            tipo=(String)sesion.getAttribute("tipo");
            if(tipo.equals("Normal")){
               response.sendRedirect("index.jsp");
            }
            
        }
    }else{
        response.sendRedirect("index.jsp");
    }
%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Gestión de Servicios</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js"></script>
        <script src="js/gestionServicio.js" type="text/javascript"></script>
        <script src="js/utils.js" type="text/javascript"></script>
        <link href="css/style.css" rel="stylesheet" type="text/css"/>
        <script src="js/datetimepicker.js" type="text/javascript"></script>
        <script src="js/bootstrap-timepicker.js" type="text/javascript"></script>
        <script src="js/bootstrap-timepicker.min.js" type="text/javascript"></script>
        <link href="css/datetimepicker.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap-timepicker.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap-timepicker.min.css" rel="stylesheet" type="text/css"/>
        <%@ include file="menu.jspf" %>
    </head>
    <body>
        <br><br>

        <!-- ********************************************************** -->
        <!-- ********************************************************** -->
        <!-- Modal del BootsTrap para mostrar mensajes                  -->
        <!-- ********************************************************** -->
        <!-- ********************************************************** -->
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitle">Modal Header</h4>
                    </div>
                    <div class="modal-body" id="myModalMessage">
                        <p>This is a small modal.</p> 
                    </div>
                </div>
            </div>
        </div>

        <!-- ********************************************************** -->
        <!-- ********************************************************** -->
        <!-- Modal del BootsTrap para mostrar el formulario de insertar -->
        <!-- o modificar
        <!-- ********************************************************** -->
        <!-- ********************************************************** -->
        <div class="modal fade" id="myModalFormulario" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitle">Insertar / Modificar Servicios
                    </div>



                    <div class="modal-body" id="myModalMessage">
                        <form role="form" onsubmit="return false;" id="formServicios">


                            <div class="form-group" id="groupIdservicio">
                                <input type="hidden" class="form-control" id="idservicio" />  
                            </div>



                            <div class="row">
                                <div class="col-md-6">   
                                    <div class="form-group" id="groupIdchofervehiculo">
                                        <label for="idchofervehiculo">Chofer/Vehiculo:</label>
                                        <input type="number" class="form-control" id="idchofervehiculo" placeholder="0"  readonly>
                                        <button id="btSelecIdchofervehiculo" type="button" class="btn btn-success btn-xs" aria-label="Left Align">
                                            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                                            <span class="glyphicon glyphicon-road" aria-hidden="true"></span>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-md-6">    
                                    <div class="form-group" id="groupIdsuario">
                                        <label for="idusuario">Usuario:</label>
                                        <input type="text" class="form-control" id="idusuario" placeholder="Id del usuario" maxlength="20" readonly>
                                        <button id="btSelecIdusuario" type="button" class="btn btn-success btn-xs" aria-label="Left Align">
                                            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                                        </button>
                                    </div>
                                </div>      
                            </div>


                            <div class="row">
                                <div class="col-md-6">     
                                    <div class="form-group" id="groupOrigen">
                                        <label for="origen">Origen:</label>
                                        <input type="text" class="form-control" id="origen" placeholder="Origen" maxlength="40">
                                    </div>
                                </div>    
                                <div class="col-md-6"> 
                                    <div class="form-group" id="groupDestino">
                                        <label for="destino">Destino:</label>
                                        <input type="text" class="form-control" id="destino" placeholder="Destino" maxlength="45">
                                    </div>
                                </div>     
                            </div>     



                            <div class="row">    

                                <div class="col-md-6">      

                                    <div class="form-group" id="groupHorasalida">
                                        <label for="horasalida">Hora Salida:</label>
                                        <div id="horasalida" class="input-group bootstrap-timepicker timepicker">
                                            <input id="horasalidatext" type="text" class="form-control">
                                            <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                                        </div>
                                    </div>

                                </div>  

                                <div class="col-md-6">    

                                    <div class="form-group" id="groupHorallegada">
                                        <label for="horallegada">Hora Llegada:</label>
                                        <div id="horallegada" class="input-group bootstrap-timepicker timepicker">
                                            <input id="horallegadatext" type="text" class="form-control">
                                            <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                                        </div>
                                    </div>

                                </div>  
                            </div>  

                            <div class="row">    
                                <div class="col-md-6">  
                                    <div class="form-group" id="groupCosto">
                                        <label for="costo">Costo:</label><br>
                                        <input type="number" class="form-control" id="costo" placeholder="0" max="99999999" min="400" value="0" step=".01">            
                                    </div>
                                </div>  
                                <div class="col-md-6">  
                                    <div class="form-group" id="groupFormapago">
                                        <label for="formapago">Forma de pago:</label>
                                        <select class="form-control" id="formapago">
                                            <option selected disabled>Seleccione la forma de pago para el servicio</option>
                                            <option >Tarjeta</option>
                                            <option >Efectivo</option>
                                        </select>
                                    </div>
                                </div>
                            </div>  

                            <div class="form-group" id="groupRetroalimentacion">
                                <label for="retroalimentacion">Retroalimentacion:</label>
                                <textarea class="form-control" id="retroalimentacion" rows="4" placeholder="..." maxlength="45"></textarea>
                            </div>

                            <div class="form-group">
                                <input type="hidden" value="agregarServicio" id="action"/>
                                <button type="submit" class="btn btn-primary" id="enviar">Guardar <span class="glyphicon glyphicon-floppy-disk"></span></button>
                                <button type="reset" class="btn btn-danger" id="cancelar">Cancelar <span class="glyphicon glyphicon-remove"></span></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- ********************************************************** -->
        <!-- ********************************************************** -->
        <!-- ********************************************************** -->


        <div class="modal fade" id="myModalBuscar" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitleBuscar"></h4>
                    </div>



                    <div class="modal-body" id="myModalMessageBuscar">

                        <div class="table table-responsive">
                            <table class="table table-hover table-condensed" id="tablaBuscar">
                                <thead>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>



        <div class="modal fade" id="myModalInfoChofervehiculo" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitleInfoChofer">Informacion chofer/vehiculo:</h4>
                    </div>



                    <div class="modal-body" id="myModalMessageInfoChofervehiculo">

                        <div class="table table-responsive">
                            <table class="table table-hover table-condensed" id="tablaInfoChofervehiculo">
                                <thead>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" id="myModalInfoUsuario" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitleInfoUsuario">Informacion Usuarios:</h4>
                    </div>



                    <div class="modal-body" id="myModalMessageInfoUsuario">

                        <div class="table table-responsive">
                            <table class="table table-hover table-condensed" id="tablaInfoUsuario">
                                <thead>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" id="myModalSeleccionarChofervehiculo" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitleSeleccionarChofervehiculo">Seleccione Chofer/Vehiculo: </h4>
                    </div>



                    <div class="modal-body" id="myModalMessageSeleccionarChofervehiculo">
                        <form role="form" onsubmit="return false;" id="formServicios" class="form-horizontal ">
                            <div class="form-group" id="groupBuscar">
                                <div class="col-sm-5" style="text-align: right; vertical-align: middle;">
                                    <p><b>Buscar por id</b></p>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="busquedaSeleccionarChofervehiculo" placeholder="Digite la cedula del Chofer" maxlength ="20" required>
                                </div>
                                <div class="col-sm-2" >
                                    <button type="button" class="btn btn-info" id="btBuscarSeleccionarChofervehiculo">
                                        Buscar <span class="glyphicon glyphicon-search"></span>
                                    </button>
                                </div>
                                <div class="col-sm-2" >    
                                    <button type="button" class="btn btn-info" id="btBuscarSeleccionarChofervehiculoRefresh">
                                        <a href="#" class="test" data-toggle="tooltip" data-placement="top" title="Muestra todos los Chofervehiculos">
                                            <span class="glyphicon glyphicon-retweet"></span>
                                        </a>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div class="table table-responsive">
                            <table class="table table-hover table-condensed" id="tablaSeleccionarChofervehiculo">
                                <thead>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>




        <div class="modal fade" id="myModalSeleccionarUsuario" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitleSeleccionarUsuario">Seleccione Usuario: </h4>
                    </div>



                    <div class="modal-body" id="myModalMessageSeleccionarUsuario">
                        <form role="form" onsubmit="return false;" id="formServicios" class="form-horizontal ">
                            <div class="form-group" id="groupBuscar">
                                <div class="col-sm-5" style="text-align: right; vertical-align: middle;">
                                    <p><b>Buscar por id</b></p>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="busquedaSeleccionarUsuario" placeholder="Digite el id del Usuario" maxlength ="20" required>
                                </div>
                                <div class="col-sm-2" >
                                    <button type="button" class="btn btn-info" id="btBuscarSeleccionarUsuario">
                                        Buscar <span class="glyphicon glyphicon-search"></span>
                                    </button>
                                </div>
                                <div class="col-sm-2" >    
                                    <button type="button" class="btn btn-info" id="btBuscarSeleccionarUsuarioRefresh">
                                        <a href="#" class="test" data-toggle="tooltip" data-placement="top" title="Muestra todos los Vehiculos">
                                            <span class="glyphicon glyphicon-retweet"></span>
                                        </a>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div class="table table-responsive">
                            <table class="table table-hover table-condensed" id="tablaSeleccionarUsuario">
                                <thead>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>






        <div class="container">
            <div class="page-header">
                <center><h1>Gestión de Servicios <span class="glyphicon glyphicon-globe"></span></h1></center>
            </div>


            <!-- ********************************************************** -->
            <!-- PANEL DEL MANTENIMIENTO DE SERVICIOS -->
            <!-- ********************************************************** -->

            <div class="panel panel-primary">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-sm-9"><h3>Mantenimiento Servicios</h3></div>
                        <div class="col-sm-2">
                            <h3><button type="button" class="btn btn-success " data-toggle="modal" data-target="#myModalFormulario" id="btMostrarForm">Insertar Servicio</button></h3>
                        </div>
                    </div></div>
                <div class="panel-body">
                    <br>
                    <!-- ********************************************************** -->
                    <div class="col-sm-12">
                        <form role="form" onsubmit="return false;" id="formServicios" class="form-horizontal ">
                            <div class="form-group" id="groupBuscar">
                                <div class="col-sm-4" style="text-align: right; vertical-align: middle;">
                                    <p><b>Buscar por Usuario:</b></p>
                                </div>
                                <div class="col-sm-3" style="text-align: right; vertical-align: middle;">
                                    <select class="form-control" id="selectbuscar">
                                        <option selected disabled>Seleccione el margen a buscar </option>
                                        <option  >Usuario</option>
                                        <option  >Chofer/Vehiculo</option>
                                        
                                    </select>
                                </div>

                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="busqueda" placeholder="Digite el id" maxlength ="20" required>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModalBuscar" id="btBuscar">
                                        Buscar <span class="glyphicon glyphicon-search"></span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <!-- ********************************************************** -->

                    <br><br><br><br>
                    <div class="table table-responsive">
                        <table class="table table-hover table-condensed" id="tablaServicio">
                            <thead>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                
                <div class="row">
                        <div class="col-sm-12" style="text-align: center">
                            <ul class="pagination" id="pages">
                                <li id="back"><a href="#"><<</a></li>
                                <li id="first" value="1" class="pag active"><a><span id="txt1" class="txt">1</span></a></li>
                                <li id="second" value="2" class="pag"><a><span id="txt2" class="txt">2</span></a></li>
                                <li id="third" value="3" class="pag"><a><span id="txt3" class="txt">3</span></a></li>
                                <li id="fourth" value="4" class="pag"><a><span id="txt4" class="txt">4</span></a></li>
                                <li id="fifth" value="5" class="pag"><a><span id="txt5" class="txt">5</span></a></li>
                                <li id="next"><a href="#">>></a></li>
                            </ul>
                        </div>
                    </div>
                   </div> 
                <div class="panel-footer">Nota: Acciones válidas dependerán del rol del usuario


                </div>
            </div>
        </div>
    </body>
</html>