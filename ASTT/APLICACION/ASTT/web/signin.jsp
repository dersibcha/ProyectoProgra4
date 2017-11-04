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
    
    if(sesion!=null){
        if (sesion.getAttribute("idusuario")  == null) {
            
        }else{
            response.sendRedirect("index.jsp");
            
        }
    }
%>


<!DOCTYPE html>
<html>
    <head>
        <title>Sign in</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <%@ include file="links.jspf" %>
        <%@ include file="menu.jspf" %>
        
        <script src="js/signin.js" type="text/javascript"></script>
        <script src="js/utils.js" type="text/javascript"></script>
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
                        <h4 class="modal-title" id="title">Modal Header</h4>
                    </div>
                    <div class="modal-body" id="body">
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
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <h1>Sign in</h1>
              <br/><br/>  
                <form role="form" onsubmit="return false;" id="formUsuarios">
                            
                           <div class="row">  
                            <div class="col-md-12">     
                           <div class="form-group" id="groupIdUsuario">
                             <label for="idusuario">Usuario:</label>
                             <input type="text" class="form-control" id="idusuario" placeholder="Usuario" maxlength="20"/>  
                           </div>
                           </div>
                           </div>
                            
                            <div class="row">
                                <div class="col-md-6">       
                                    <div class="form-group" id="groupNombre">
                                        <label for="nombre">Nombre:</label>
                                        <input type="text" class="form-control" id="nombre" placeholder="Nombre" maxlength="20">
                                    </div>
                                </div>


                                <div class="col-md-6">        
                                    <div class="form-group" id="groupApellidos">
                                        <label for="apellidos">Apellidos:</label>
                                        <input type="text" class="form-control" id="apellidos" placeholder="Nombre" maxlength="40">
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div class="row">
                                <div class="col-md-6">     
                                    <div class="form-group" id="groupCorreoelectronico">
                                        <label for="correoelectronico">Correo Electronico:</label>
                                        <input type="mail" class="form-control" id="correoelectronico" placeholder="correo@mail.com" maxlength="30">
                                    </div>
                                </div>
                                <div class="col-md-6">  
                                    <div class="form-group" id="groupContrasena">
                                        <label for="contrasena">Contraseña:</label>
                                        <input type="password" class="form-control" id="contrasena" placeholder="" maxlength="30">
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div class="row">
                                <div class="col-md-6">       
                                    <div class="form-group" id="groupFechanacimiento">
                                        <label for="fechanacimiento">Fecha de Nacimiento:</label>
                                        <div id="fechanacimiento" class="input-group date form_date" data-date="" data-date-format="dd/mm/yyyy" data-link-field="dtp_input2" data-link-format="dd/mm/yyyy">
                                            <input class="form-control" type="text" value="" placeholder="dd/mm/aaaa" id="fechanacimientoText">
                                            <span class="input-group-addon">
                                                <span class="glyphicon glyphicon-calendar"></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">   
                                    <div class="form-group" id="groupTelefono">
                                        <label for="telefono">Numero Telefonico:</label>
                                        <input type="number" class="form-control" id="telefono" placeholder="0" max="99999999" min="10000000" value="0">  
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-12">  
                                <div class="form-group" id="groupDireccion">
                                    <label for="direccion">Direccion:</label>
                                    <textarea class="form-control" id="direccion" rows="3" placeholder="..." maxlength="50"></textarea>
                                </div>
                                </div>
                            </div>
                            

                            <div class="form-group">
                                <input type="hidden" value="agregarUsuario" id="action"/>
                                <button type="submit" class="btn btn-primary" id="enviar">Guardar <span class="glyphicon glyphicon-floppy-disk"></span></button>
                                <button type="reset" class="btn btn-danger" id="cancelar">Cancelar <span class="glyphicon glyphicon-remove"></span></button>
                            </div>
                        </form>
                
            </div>
            <div class="col-md-3"></div>
          </div>
        

    </body>
</html>
</html>
