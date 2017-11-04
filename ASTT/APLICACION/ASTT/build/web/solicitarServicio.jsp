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
    
    if(sesion!=null){
        if (sesion.getAttribute("idusuario")  == null) {
            response.sendRedirect("index.jsp");
        }else{
            estado = (String)sesion.getAttribute("loginStatus");
            tipo=(String)sesion.getAttribute("tipo");               
            chofer=(String)sesion.getAttribute("chofer");               
        }
    }else{
        response.sendRedirect("index.jsp");
    }
    
%>


<!DOCTYPE html>
<html>
    <head>
        <title>Solicitar Viaje</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <%@ include file="links.jspf" %>
        <%@ include file="menu.jspf" %>
        <script src="js/solicitarServicio.js" type="text/javascript"></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBEJAdu-Jwtp77vAtrMmb33DX7JJ7l1itQ&callback=initMap" async defer></script>

        
    <style>
          /* Always set the map height explicitly to define the size of the div
           * element that contains the map. */
      
          #map {
              border-color: #000000;
            height: 90%;
            width: 100%;
            
            -webkit-box-shadow: 0px 0px 10px 7px rgba(18,1,18,1);
            -moz-box-shadow: 0px 0px 10px 7px rgba(18,1,18,1);
            box-shadow: 0px 0px 10px 7px rgba(18,1,18,1);
            
            border-radius: 30px 30px 30px 30px;
            -moz-border-radius: 30px 30px 30px 30px;
            -webkit-border-radius: 30px 30px 30px 30px;
            border: 0px solid #000000;
             
          }
          /* Optional: Makes the sample page fill the window. */
         html, body , modal,div{
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
        <br/><br/><br/><br/>
        
        <div class="row">
            <div class="col-md-6">
                
      
                   <div class="row">
                    <div class="col-md-12">    
                        
                        <div id="map"></div>
                    </div>
                    </div>
                </div>
                
            
            
            <div class="col-md-5">
                
                
                
                
                <form role="form" onsubmit="return false;" id="formLogin">
                    
                    <div class ="row">  
                        <div class="col-md-6">
                            <div class="form-group" id="groupOrigen">
                                <label for="origen">Punto de Salida:</label>
                                <input type="text" class="form-control" id="origen" autofocus="true" placeholder="Origen">
                            </div> 
                        </div>
                        <div class="col-md-6">
                            <div class="form-group" id="groupDestino">
                                <label for="destino">Punto de Llegada:</label>
                                <input type="text" class="form-control" id="destino" autofocus="true" placeholder="Destino">
                            </div> 
                        </div>
                    </div>
                
               
                    <div class ="row">  
                        <div class="col-md-4"></div>
                        <div class="col-md-4">
                            <div class="form-group" align="center">
                                <button type="submit" class="btn btn-primary" id="solicitar">Solicitar</button>
                                <br><br>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class ="row">  
                        <div class="col-md-6">
                               
                            <div class="form-group" id="groupChofer">
                                <span class="glyphicon glyphicon-info-sign"></span>
                                <label for="chofer">Chofer:</label>
                                <input type="text" class="form-control" id="chofer" autofocus="true" placeholder="Chofer">
                            </div> 
                             
                        </div>
                        <div class="col-md-6">
                               
                            <div class="form-group" id="groupVehiculo">
                                <span class="glyphicon glyphicon-info-sign"></span>  
                                <label for="vehiculo">Vehiculo:</label>
                                <input type="text" class="form-control" id="vehiculo" autofocus="true" placeholder="Vehiculo">
                            </div> 
                            </div> 
                             
                    </div> 
                        
                   
                    
                    <div class ="row">  
                        <div class="col-md-6">
                            <div class="form-group" id="groupHorasalida">
                                <label for="horasalida">Hora Salida:</label>
                                <input type="text" class="form-control" id="horasalida" autofocus="true" placeholder="hora salida">
                            </div> 
                        </div>
                        <div class="col-md-6">
                            <div class="form-group" id="groupHorasalida">
                                <label for="horallegada">Hora Llegada:</label>
                                <input type="text" class="form-control" id="horallegada" autofocus="true" placeholder="hora llegada">
                            </div> 
                        </div>
                    </div>
                    
                    
                    <div class ="row">  
                        <div class="col-md-6">
                            <div class="form-group" id="groupPrecio">
                                <label for="costo">Precio:</label>
                                <input type="text" class="form-control" id="costo" autofocus="true" placeholder="costo">
                            </div> 
                        </div>
                        <div class="col-md-6">
                            <div class="form-group" id="groupFormapago">
                                <label for="formapago">Forma de pago:</label>
                                 <select class="form-control" id="formapago">
                                    <option selected disabled>Seleccione el tipo de pago </option>
                                     <option >Tarjeta</option>
                                     <option >Dinero</option>
                                </select> </div> 
                        </div>
                    </div>
                    
                    
                    
                    <div class ="row">  
                       
                        <div class="col-md-12">
                            <div class="form-group" align="center">
                            <button type="submit" class="btn btn-primary" id="pagar" >Pagar</button>
                        </div>
                        </div>
                    </div>
                    
                    
                     <div class ="row">  
                         <div class="col-md-4"></div>
                        <div class="col-md-4">
                            <div class="form-group" id="groupRetroalimentacion">
                                <label for="retroalimentacion">Retroalimentacion:</label>
                                 <select class="form-control" id="retroalimentacion">
                                    <option selected disabled>Seleccione valor  </option>
                                     <option >1</option>
                                     <option >2</option>
                                     <option >3</option>
                                     <option >4</option>
                                     <option >5</option>
                                </select> </div> 
                        </div>
                         <div class="col-md-4"></div>
                    </div>
                    
                    
                    <div class ="row"> 
                    <div class="col-md-12">
                    <div class="form-group" align="center">
                        <input type="hidden" value="agregarPersona" id="personasAction"/>
                        <button type="submit" class="btn btn-primary" id="enviar">Ingresar</button>
                        &nbsp;&nbsp;
                        <button type="reset" class="btn btn-danger" id="cancelar">Cancelar</button>
                    </div>
                    </div>
                    </div>

                    

                </form>
                
            </div>
            <div class="col-md-1"></div>
          </div>
        

    </body>
</html>
</html>

