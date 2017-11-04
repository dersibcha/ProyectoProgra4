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
        <title>Gestión de Usuarios</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js"></script>
        <script src="js/gestionUsuario.js" type="text/javascript"></script>
        <script src="js/utils.js" type="text/javascript"></script>
        <link href="css/style.css" rel="stylesheet" type="text/css"/>
        <script src="js/datetimepicker.js" type="text/javascript"></script>
        <link href="css/datetimepicker.min.css" rel="stylesheet" type="text/css"/>
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
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitle">Insertar / Modificar Usuarios
                    </div>



                    <div class="modal-body" id="myModalMessage">
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
                            
                            <div class="row">
                                <div class="col-md-12">  
                                <div class="form-group" id="groupActivo">
                                    <label for="activo">Activo:</label>
                                    <select class="form-control" id="activo">
                                        <option selected disabled>Seleccione el estado del Chofer</option>
                                        <option >Activo</option>
                                        <option >Desactivo</option>
                                    </select>
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
                        <h4 class="modal-title" id="myModalTitleBuscar">Buscar por usuario: </h4>
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
        
        <div class="modal fade" id="myModalVehiculos" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitleVehiculos">Vehiculos del usuario: </h4>
                    </div>

                     

                    <div class="modal-body" id="myModalMessageVehiculos">
                        
                       <div class="table table-responsive">
                        <table class="table table-hover table-condensed" id="tablaVehiculos">
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
        
        
         
        <div class="modal fade" id="myModalChofer" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitleChofer"></h4>
                    </div>

                     

                    <div class="modal-body" id="myModalMessageChofer">
                        
                       <div class="table table-responsive">
                        <table class="table table-hover table-condensed" id="tablaChofer">
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
                <center><h1>Gestión de Usuarios <span class="glyphicon glyphicon-user"></span></h1></center>
            </div>


            <!-- ********************************************************** -->
            <!-- PANEL DEL MANTENIMIENTO DE USUARIOS -->
            <!-- ********************************************************** -->

            <div class="panel panel-primary">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-sm-10"><h3>Mantenimiento Usuarios</h3></div>
                        <div class="col-sm-2">
                            <h3><button type="button" class="btn btn-success " data-toggle="modal" data-target="#myModalFormulario" id="btMostrarForm">Insertar Usuario</button></h3>
                        </div>
                    </div></div>
                <div class="panel-body">
                    <br>
                    <!-- ********************************************************** -->
                    <div class="col-sm-12">
                        <form role="form" onsubmit="return false;" id="formUsuario" class="form-horizontal ">
                            <div class="form-group" id="groupBuscar">
                                <div class="col-sm-4" style="text-align: right; vertical-align: middle;">
                                    <p><b>Buscar por usuario:</b></p>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="busqueda" placeholder="Digite el usuario" maxlength ="20" required>
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
                        <table class="table table-hover table-condensed" id="tablaUsuario">
                            <thead>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                
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
                <div class="panel-footer">Nota: Acciones válidas dependerán del rol del usuario
                    
      
                </div>
            </div>
        </div>
    </body>
</html>