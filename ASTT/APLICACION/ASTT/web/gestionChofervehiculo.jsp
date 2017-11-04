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
        <title>Gestión de Choferes y Vehiculos</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js"></script>
        <script src="js/gestionChofervehiculo.js" type="text/javascript"></script>
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
                        <h4 class="modal-title" id="myModalTitle">Insertar / Modificar Choferes y vehiculos
                    </div>



                    <div class="modal-body" id="myModalMessage">
                        <form role="form" onsubmit="return false;" id="formChofervehiculos">
                            
                            
                           <div class="form-group" id="groupIdchofervehiculo">
                             <input type="hidden" class="form-control" id="idchofervehiculo" />  
                           </div>
                            
                            <div class="form-group" id="groupCedulachofer">
                                <label for="cedulachofer">Cedula del Chofer:</label>
                                <input type="number" class="form-control" id="cedulachofer" placeholder="0"  readonly>
                                <button id="btSelecCedulachofer" type="button" class="btn btn-success btn-xs" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                                </button>
                            </div>
                            
                            <div class="form-group" id="groupIdvehiculo">
                                <label for="idvehiculo">Id del Vehiculo:</label>
                                <input type="text" class="form-control" id="idvehiculo" placeholder="Id del vehiculo" maxlength="20" readonly>
                                <button id="btSelecIdvehiculo" type="button" class="btn btn-success btn-xs" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-road" aria-hidden="true"></span>
                                </button>
                            </div>
                            
                            <div class="form-group" id="groupActivo">
                                <label for="activo">Activo:</label>
                                <select class="form-control" id="activo">
                                    <option selected disabled>Seleccione el estado del Chofer y el vehiculo</option>
                                    <option >Activo</option>
                                    <option >Desactivo</option>
                                </select>
                            </div>
                            

                            <div class="form-group">
                                <input type="hidden" value="agregarChofervehiculo" id="action"/>
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
        
        
        
        <div class="modal fade" id="myModalInfoChofer" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitleInfoChofer">Informacion chofer:</h4>
                    </div>

                     

                    <div class="modal-body" id="myModalMessageInfoChofer">
                        
                       <div class="table table-responsive">
                        <table class="table table-hover table-condensed" id="tablaInfoChofer">
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
        
        
        <div class="modal fade" id="myModalInfoVehiculo" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitleInfoVehiculo">Informacion vehiculo:</h4>
                    </div>

                     

                    <div class="modal-body" id="myModalMessageInfoVehiculo">
                        
                       <div class="table table-responsive">
                        <table class="table table-hover table-condensed" id="tablaInfoVehiculo">
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
        
        
       <div class="modal fade" id="myModalSeleccionarChofer" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitleSeleccionarChofer">Seleccione Chofer: </h4>
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
                                        Buscar <span class="glyphicon glyphicon-search"></span>
                                    </button>
                                </div>
                                 <div class="col-sm-2" >    
                                    <button type="button" class="btn btn-info" id="btBuscarSeleccionarChoferRefresh">
                                        <a href="#" class="test" data-toggle="tooltip" data-placement="top" title="Muestra todos los Choferes">
                                        <span class="glyphicon glyphicon-retweet"></span>
                                        </a>
                                    </button>
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
        
        
        
        
       <div class="modal fade" id="myModalSeleccionarVehiculo" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitleSeleccionarVehiculo">Seleccione Vehiculo: </h4>
                    </div>

                     

                    <div class="modal-body" id="myModalMessageSeleccionarChofer">
                        <form role="form" onsubmit="return false;" id="formChofervehiculos" class="form-horizontal ">
                            <div class="form-group" id="groupBuscar">
                                <div class="col-sm-5" style="text-align: right; vertical-align: middle;">
                                    <p><b>Buscar por id</b></p>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="busquedaSeleccionarVehiculo" placeholder="Digite el id del Vehiculo" maxlength ="20" required>
                                </div>
                                <div class="col-sm-2" >
                                    <button type="button" class="btn btn-info" id="btBuscarSeleccionarVehiculo">
                                        Buscar <span class="glyphicon glyphicon-search"></span>
                                    </button>
                                </div>
                                 <div class="col-sm-2" >    
                                    <button type="button" class="btn btn-info" id="btBuscarSeleccionarVehiculoRefresh">
                                        <a href="#" class="test" data-toggle="tooltip" data-placement="top" title="Muestra todos los Vehiculos">
                                        <span class="glyphicon glyphicon-retweet"></span>
                                        </a>
                                    </button>
                                </div>
                            </div>
                        </form>
                       <div class="table table-responsive">
                        <table class="table table-hover table-condensed" id="tablaSeleccionarVehiculo">
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
                <center><h1>Gestión de Choferes y vehiculos <span class="glyphicon glyphicon-user"></span><span class="glyphicon glyphicon-road"></span></h1></center>
            </div>


            <!-- ********************************************************** -->
            <!-- PANEL DEL MANTENIMIENTO DE CHOFERESVEHICULOS -->
            <!-- ********************************************************** -->

            <div class="panel panel-primary">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-sm-9"><h3>Mantenimiento Choferes y vehiculos</h3></div>
                        <div class="col-sm-2">
                            <h3><button type="button" class="btn btn-success " data-toggle="modal" data-target="#myModalFormulario" id="btMostrarForm">Insertar Chofer/Vehiculo</button></h3>
                        </div>
                    </div></div>
                <div class="panel-body">
                    <br>
                    <!-- ********************************************************** -->
                    <div class="col-sm-12">
                        <form role="form" onsubmit="return false;" id="formChofervehiculos" class="form-horizontal ">
                            <div class="form-group" id="groupBuscar">
                                <div class="col-sm-4" style="text-align: right; vertical-align: middle;">
                                    <p><b>Buscar por:</b></p>
                                </div>
                                <div class="col-sm-3" style="text-align: right; vertical-align: middle;">
                                    <select class="form-control" id="selectbuscar">
                                    <option selected disabled>Seleccione el margen a buscar </option>
                                    <option  >Chofer</option>
                                    <option  >Vehiculo</option>
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
                        <table class="table table-hover table-condensed" id="tablaChofervehiculo">
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