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
        <title>Usuario</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <%@ include file="links.jspf" %>
        <%@ include file="menu.jspf" %>
        <script src="js/usuario.js" type="text/javascript"></script>
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
        <br/><br/><br/><br/><br/><br/>
        
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-5">
                <div class="row">
                <div class="col-md-3">
                    <img src="images/user.png" alt=""/>
                </div>
                <div class="col-md-2">
                    <h1 id="idusuarioh"><% out.print(sesionmenu.getAttribute("idusuario")); %></h1>
                </div>
                </div>
                
                <br/><br/>
                
                <div class="row">
                    <div class="col-md-4">
                        <h5><b>Usuario:</b></h5>
                    </div>
                    <div class="col-md-5">
                        <h5 id="idusuarioText"></h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <h5><b>Nombre:</b></h5>
                    </div>
                    <div class="col-md-5">
                        <h5 id="nombreText"></h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <h5><b>Correo electronico:</b></h5>
                    </div>
                    <div class="col-md-5">
                        <h5 id="correoelectronicoText"></h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <h5><b>Fecha Nacimiento:</b></h5>
                    </div>
                    <div class="col-md-4">
                        <h5 id="fechanacimientoTextinfo"></h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <h5><b>Numero de Telefono:</b></h5>
                    </div>
                    <div class="col-md-4">
                        <h5 id="telefonoText"></h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <h5><b>Direccion:</b></h5>
                    </div>
                    <div class="col-md-6">
                        <h5 id="direccionText"></h5>
                    </div>
                </div>
                    
                 <br/><br/>
                 <div class="row">
                     <div class="col-md-3"></div>
                     <div class="col-md-2">
                                             
                        <button type="submit" class="btn btn-primary" id="editar">Editar</button>
                        </div>
                        <div class="col-md-2">
                        <button type="reset" class="btn btn-danger" id="eliminar">Eliminar</button>
                        </div>
                    </div>
                     </div>  
                <div class="col-md-3">
                    <% if(chofer.equals("No")) { %> 
                    <h3>¿Quieres ser parte de nuestros Conductores?</h3>                  
                    <h5>Registrate ya y se parte de nuestro equipo.</h5>
                    <br>
                    <button type="submit" class="btn btn-info" id="registrar">Registrar</button>
                    <% }else { %> 
                    
                    <div class="row">
                        <br><br><br><br><br><br><br><br>
                        <div class="col-md-2"></div>
                        <div class="col-md-7">
                            <h4 id="choferh"><b>Informacion de Chofer</b></h4>
                        </div>
                    </div>

                    <br/><br/>

                    <div class="row">
                        <div class="col-md-6">
                            <h5><b>Cedula:</b></h5>
                        </div>
                        <div class="col-md-5">
                            <h5 id="cedulaText"></h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <h5><b>Licencia:</b></h5>
                        </div>
                        <div class="col-md-6">
                            <h5 id="tipolicenciaText"></h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <h5><b>Vencimiento Licencia:</b></h5>
                        </div>
                        <div class="col-md-5">
                            <h5 id="vencimientolicenciaTextinfo"></h5>
                        </div>
                    </div>
                    
                   
                    <br/><br/>
                    <div class="row">
                        <div class="col-md-3"></div>
                        <div class="col-md-3">

                            <button type="submit" class="btn btn-primary" id="editarChofer">Editar</button>
                        </div>
                        <div class="col-md-2">
                            <button type="reset" class="btn btn-danger" id="desregistrar">desregistrar</button>
                        </div>
                    </div>
                    <% } %> 
                </div>
                </div>       
                        
               
                    
                    
                    
                    

                    

               
                
           
                
                
                
           <div class="modal fade" id="myModalFormulario" role="dialog">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitle">Modificar Usuario &nbsp; <% out.print(sesionmenu.getAttribute("idusuario")); %></h4>
                    </div>



                    <div class="modal-body" id="myModalMessage">
                        <form role="form" onsubmit="return false;" id="formUsuarios">
                            
                           <div class="row">  
                            <div class="col-md-12">     
                           <div class="form-group" id="groupIdUsuario">
                             <label for="idusuario">Usuario:</label>
                             <input type="text" class="form-control" id="idusuario" placeholder="Usuario" maxlength="20"  readonly/>  
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
                                
                                <button type="submit" class="btn btn-primary" id="enviar">Guardar <span class="glyphicon glyphicon-floppy-disk"></span></button>
                                <button type="reset" class="btn btn-danger" id="cancelar">Cancelar <span class="glyphicon glyphicon-remove"></span></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>     
                
        <div class="modal fade" id="myModalFormularioChofer" role="dialog">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitle">Registrar / Modificar Chofer
                    </div>



                    <div class="modal-body" id="myModalMessage">
                        <form role="form" onsubmit="return false;" id="formChoferes">
                            
                            
                           <div class="form-group" id="groupCedula">
                             <label for="cedula">Cedula:</label>
                             <input type="text" class="form-control" id="cedula" placeholder="Cedula" maxlength="20"/>  
                           </div>
                            
                            <div class="form-group" id="groupDuenno">
                                <label for="tipolicencia">Licencia:</label>
                                <select class="form-control" id="tipolicencia">
                                    <option selected disabled>Seleccione el tipo de licencia </option>
                                     <option >B1</option>
                                     <option >B2</option>
                                     <option >B3</option>
                                </select>
                            </div>
                            
                            
                            
                            <div class="form-group" id="groupVencimientolicencia">
                                <label for="vencimientolicencia">Fecha de Vencimiento de la licencia:</label>
                                <div id="vencimientolicencia" class="input-group date form_date" data-date="" data-date-format="dd/mm/yyyy" data-link-field="dtp_input2" data-link-format="dd/mm/yyyy">
                                    <input class="form-control" type="text" value="" placeholder="dd/mm/aaaa" id="vencimientolicenciaText">
                                    <span class="input-group-addon">
                                        <span class="glyphicon glyphicon-calendar"></span>
                                    </span>
                                </div>
                            </div>
                            
                            
                            

                            <div class="form-group">
                                <input type="hidden" value="agregarChofer" id="action"/>
                                <button type="submit" class="btn btn-primary" id="enviarChofer">Guardar <span class="glyphicon glyphicon-floppy-disk"></span></button>
                                <button type="reset" class="btn btn-danger" id="cancelarChofer">Cancelar <span class="glyphicon glyphicon-remove"></span></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </body>
</html>

