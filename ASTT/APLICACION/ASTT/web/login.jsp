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
        <title>Log in</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <%@ include file="links.jspf" %>
        <%@ include file="menu.jspf" %>
        <script src="js/login.js" type="text/javascript"></script>
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
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        
        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <h1>Login</h1>
                <br/><br/>
                <form role="form" onsubmit="return false;" id="formLogin">
                    <div class="form-group" id="groupIdusario">
                        <label for="idusuario">Usuario:</label>
                        <input type="text" class="form-control" id="idusuario" autofocus="true" placeholder="Usuario">
                    </div>
                    
                    <br/>
                     
                    <div class="form-group" id="groupContrasena">
                        <label for="contrasena">Contraseña:</label>
                        <input type="password" class="form-control" id="contrasena" placeholder="Contraseña" >
                    </div>
                    
                    <br/>
                    
                    <div class="form-group" align="center">
                        <input type="hidden" value="agregarPersona" id="personasAction"/>
                        <button type="submit" class="btn btn-primary" id="enviar">Ingresar</button>
                        &nbsp;&nbsp;
                        <button type="reset" class="btn btn-danger" id="cancelar">Cancelar</button>
                    </div>

                    

                </form>
                
            </div>
            <div class="col-md-4"></div>
          </div>
        

    </body>
</html>
</html>
