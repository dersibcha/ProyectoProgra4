<%-- 
    Document   : login
    Created on : 28/10/2017, 02:39:42 PM
    Author     : der12
--%>
<%-- PARA EL MANEJO DE SESSIONES ES REQUERIDO LA LINEA session="true"--%>
<%@page contentType="text/html" pageEncoding="UTF-8" session="true" %>
<%@page import="java.util.*" session="true" %>

<%

    HttpSession sesion = request.getSession(true);
    String estado = "";
    String tipo = "";
    String chofer = "";
    String vehiculos = "";
    
    if(sesion!=null){
        if (sesion.getAttribute("idusuario")  == null) {
            response.sendRedirect("index.jsp");
        }else{
            estado = (String)sesion.getAttribute("loginStatus");
            tipo=(String)sesion.getAttribute("tipo");               
            chofer=(String)sesion.getAttribute("chofer");               
            vehiculos=(String)sesion.getAttribute("vehiculos");               
        }
    }else{
        response.sendRedirect("index.jsp");
    }
%>


<!DOCTYPE html>
<html>
    <head>
        <title>Vehiculos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <%@ include file="links.jspf" %>
        <%@ include file="menu.jspf" %>
         <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBEJAdu-Jwtp77vAtrMmb33DX7JJ7l1itQ&callback=initMap" async defer></script>

        <script src="js/vehiculos.js" type="text/javascript"></script>
        
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
        <!-- ********************************************************** -->
        <br/><br/><br/>
        
        <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-10">
                <div class="row">
                    <div class="col-md-2"></div>
                <div class="col-md-3">
                    <img src="images/frontcar.png" alt=""/>
                </div>
                <div class="col-md-2">
                    <h1 id="idusuarioh">Mis Vehiculos</h1>
                </div>
                <div class="col-md-3"></div>
                <div class="col-md-2"><h4 id="usuarioText" hidden="true"><% out.print(sesionmenu.getAttribute("idusuario")); %></h4></div>
                </div>
                
                
                
                <div class="row">
                
                    <% if(vehiculos.equals("No")) { %> 
                    <div class="col-md-4"></div>
                    <div class="col-md-7">
                    <br> <br> <br>
                    <h3>¿Quieres registrar tus propios vehiculos ?</h3>                  
                    <h5>ASTT brinda servicio alrededor de todo el mundo, se parte de esto y empieza a ganar dinero..</h5>
                    <br>
                    <button type="submit" class="btn btn-info" id="registrar">Registrar Vehiculo</button>
                   
                    
                    <% }else { %> 
                    
                    <div class="row">
                        <br>
                       
                        <div class="col-md-5">
                            <h4 id="choferh"><b>Informacion de los Vehiculos</b></h4>
                        </div>
                         <div class="col-md-5"></div>
                        <div class="col-md-2">
                           <button type="submit" class="btn btn-primary" id="agregarVehiculo">Agregar Vehiculo</button>
                        </div>
                    </div>

                    <br/>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="table-responsive">          
                                <table class="table table-hover" id="tablaVehiculo">
                                    <thead>                                
                                        <tr>
                                            <th><b>Vehiculo<b></th>
                                            <th><b>Modelo<b></th>
                                            <th><b>Placa<b></th>
                                            <th><b>Año<b></th>
                                            <th><b>Color<b></th>
                                            <th><b>Puntuacion<b></th>
                                            <th><b>Ubicacion<b></th>
                                            
                                            <th><b>Estado<b>
                                             <a href="#" class="test" data-toggle="tooltip" data-placement="top" title="Muestra si el vehiculo esta en uso">
                                             <span class="glyphicon glyphicon-info-sign"></span></a>
                                             </th>
                                            <th><b>Choferes<b></th> 
                                            <th><b>Opciones<b>
                                            <a href="#" class="test" data-toggle="tooltip" data-placement="top" title="Modificar o Eliminar el vehiculo">
                                            <span class="glyphicon glyphicon-info-sign"></span>
                                            </a>
                                            </th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody id="tablaBodyVehiculos">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                       
                    </div>
                    <div class="row">
                        <div class="row">
                            <div class="col-sm-12" style="text-align: center">
                                <ul class="pagination" id="pages">
                                    <li id="back"><span id="backspan" class="nextspan"><<</span></li>
                                    <li id="first" value="1" class="pag active"><span id="txt1" class="txt">1</span></li>
                                    <li id="second" value="2" class="pag"><span id="txt2" class="txt">2</span></li>
                                    <li id="third" value="3" class="pag"><span id="txt3" class="txt">3</span></li>
                                    <li id="fourth" value="4" class="pag"><span id="txt4" class="txt">4</span></li>
                                    <li id="fifth" value="5" class="pag"><span id="txt5" class="txt">5</span></li>
                                    <li id="next"><span id="nextspan" class="txt">>></span></li>
                                </ul>
                            </div>
                        </div>
                    </div>   
                    </div>
                    
                    <% } %> 

                    
                </div>
                </div>       
                </div>       
                </div>       
                        
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
                    
                    

                    <div class="modal fade in ztop" id="modalMapa" role="dialog">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 class="modal-title" id="myModalTitle">Cargar ubicacion actual
                                </div>
                                <div class="modal-body" style="height:490px;">
                                    <div id="map"></div>
                                    <div class="form-group">

                                        <input type="text" class="form-control" id="address" placeholder="" maxlength ="45" required readonly >
                                        <br>
                                        <button type="submit" class="btn btn-primary" id="cargar">Cargar <span class="glyphicon glyphicon-floppy-disk"></span></button>
                                        <button type="reset" class="btn btn-danger" id="cancelarMapa">Cancelar <span class="glyphicon glyphicon-remove"></span></button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                
                
            <div class="modal fade" id="myModalSeleccionarChofer" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitleSeleccionarChofer">Choferes del vehiculo:  <span id="idvehiculoText"></span> </h4>
                    </div>

                     

                    <div class="modal-body" id="myModalMessageSeleccionarChofer">
                        <form role="form" onsubmit="return false;" id="formChofervehiculos" class="form-horizontal ">
                            <div class="form-group" id="groupBuscar">
                                <div class="col-sm-5" style="text-align: right; vertical-align: middle;">
                                   <p><b>Buscar por cedula</b></p>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="busquedaSeleccionarChofer" placeholder="Digite la cedula del Chofer" maxlength ="20" required>
                                </div>
                                <div class="col-sm-2" >
                                    <button type="button" class="btn btn-info" id="btBuscarSeleccionarChofer">
                                        Agregar <span class="glyphicon glyphicon-search"></span>
                                    </button>
                                </div>
                                 <div class="col-sm-2" >    
                                   
                                </div>
                            </div>
                        </form>
                       <div class="table table-responsive">
                        <table class="table table-hover table-condensed" id="tablaSeleccionarChofer">
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
                    
    </body>
</html>

