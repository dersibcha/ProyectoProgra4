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
        <title>Gestión de Vehiculos</title>
        
        
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
      
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBEJAdu-Jwtp77vAtrMmb33DX7JJ7l1itQ&callback=initMap" async defer></script>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js"></script>
        
        <script src="js/gestionVehiculo.js" type="text/javascript"></script>
        <script src="js/utils.js" type="text/javascript"></script>
        <link href="css/style.css" rel="stylesheet" type="text/css"/>
        <script src="js/datetimepicker.js" type="text/javascript"></script>
        <link href="css/datetimepicker.min.css" rel="stylesheet" type="text/css"/>
        <%@ include file="menu.jspf" %>
        
        
         <style>
          /* Always set the map height explicitly to define the size of the div
           * element that contains the map. */
      
          #map {
            height: 80%;
            width: 100%;
          }
          /* Optional: Makes the sample page fill the window. */
         html, body , modal{
            height: 100%;
            margin: 0;
            padding: 0;
          }
        </style>
        
        
        
        
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
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitle">Insertar / Modificar Vehiculos
                    </div>



                    <div class="modal-body" id="myModalMessage">
                        <form role="form" onsubmit="return false;" id="formVehiculos">

                            <div class="row">  
                                <div class="col-md-12">   
                                    <div class="form-group" id="groupIdVehiculo">
                                        <label for="idVehiculo">Vehiculo:</label>
                                        <input type="text" class="form-control" id="idVehiculo" placeholder="Vehiculo" maxlength="20"/>  
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div class="row">  
                                <div class="col-md-6">   
                                    <div class="form-group" id="groupDuenno">
                                        <label for="duenno">Dueño:</label>
                                        <select class="form-control" id="duenno">
                                            <option selected disabled>Seleccione al Dueño por usuario</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">   
                                    <div class="form-group" id="groupAnno">
                                        <label for="anno">Año:</label>
                                        <select class="form-control" id="anno">
                                            <option selected disabled>Seleccione al Año del Vehiculo</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row">  
                                <div class="col-md-6">    
                                    <div class="form-group" id="groupModelo">
                                        <label for="modelo">Modelo:</label>
                                        <input type="text" class="form-control" id="modelo" placeholder="Modelo" maxlength="20">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group" id="groupPlaca">
                                        <label for="placa">Placa:</label>
                                        <input type="text" class="form-control" id="placa" placeholder="Placa" maxlength="20">
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group" id="groupColor">
                                        <label for="color">Color:</label>
                                        <input type="text" class="form-control" id="color" placeholder="Color" maxlength="15">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group" id="groupPuntuacion">
                                        <label for="puntuacion">Puntacion:</label>
                                        <input type="number" class="form-control" id="puntuacion" placeholder="0" max="5" min="0" value="0">    
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group" id="groupUbicacionActual">
                                        <label for="ubicacionActual">Ubicacion:</label>
                                        <div class="row">
                                            <div class="col-md-10">
                                                <input type="text" class="form-control" id="ubicacionActual" placeholder="" maxlength ="45" required readonly> 
                                            </div>
                                            <div class="col-md-2">
                                                <button type="button" class="btn btn-info" data-toggle="modal" data-target="#modalMapa" id="btMap"><span class="glyphicon glyphicon-map-marker"></span></button> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div class="row">
                               <div class="col-md-6">
                                    <div class="form-group" id="groupEstado">
                                        <label for="estado">Estado:</label>
                                        <select class="form-control" id="estado">
                                            <option selected disabled>Seleccione el estado del Vehiculo</option>
                                            <option >Activo</option>
                                            <option >Desactivo</option>
                                        </select>

                                    </div>
                                </div>
                            
                                <div class="col-md-6">
                                    <div class="form-group" id="groupActivo">
                                        <label for="activo">Activo:</label>
                                        <select class="form-control" id="activo">
                                            <option selected disabled>Seleccione el estado del Vehiculo</option>
                                            <option >Activado</option>
                                            <option >Desactivado</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            

                            <div class="form-group">
                                <input type="hidden" value="agregarVehiculo" id="action"/>
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
                        <h4 class="modal-title" id="myModalTitleBuscar">Buscar por Vehiculo: </h4>
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
        
        
         <div class="modal fade in ztop" id="modalMapa" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitle">Selecciona la ubicacion
                    </div>
                    <div class="modal-body" style="height:490px;">
                        <div id="map"></div>
                        <div class="form-group">

                            <input type="text" class="form-control" id="address" placeholder="" maxlength ="45" required readonly >
                            <br>
                            <button type="submit" class="btn btn-primary" id="aceptar">Aceptar <span class="glyphicon glyphicon-floppy-disk"></span></button>
                            <button type="reset" class="btn btn-danger" id="cancelar">Cancelar <span class="glyphicon glyphicon-remove"></span></button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        
     

        
        <div class="container">
            <div class="page-header">
                <center><h1>Gestión de Vehiculos <span class="glyphicon glyphicon-road"></span></h1></center>
            </div>


            <!-- ********************************************************** -->
            <!-- PANEL DEL MANTENIMIENTO DE VEHICULOS -->
            <!-- ********************************************************** -->

            <div class="panel panel-primary">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-sm-10"><h3>Mantenimiento Vehiculos</h3></div>
                        <div class="col-sm-2">
                            <h3><button type="button" class="btn btn-success " data-toggle="modal" data-target="#myModalFormulario" id="btMostrarForm">Insertar Vehiculo</button></h3>
                        </div>
                    </div></div>
                <div class="panel-body">
                    <br>
                    <!-- ********************************************************** -->
                    <div class="col-sm-12">
                        <form role="form" onsubmit="return false;" id="formVehiculoBuscar" class="form-horizontal ">
                            <div class="form-group" id="groupBuscar">
                                <div class="col-sm-4" style="text-align: right; vertical-align: middle;">
                                    <p><b>Buscar por Vehiculo:</b></p>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="busqueda" placeholder="Digite el Vehiculo" maxlength ="20" required>
                                </div>
                                <div class="col-sm-4">
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
                        <table class="table table-hover table-condensed" id="tablaVehiculo">
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