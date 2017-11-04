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
        <title>ASTT</title>
        <%@ include file="links.jspf" %>
        <%@ include file="menu.jspf" %>
    </head>
    <body>
        <br><br><br><br><br><br><br>
        <div class="container">
            <center>
            <div class="col-sm-12">
                <div class="row">
                    <div class="col-sm-4">
                        <a href="gestionUsuario.jsp"><div class="imgGestion" id="gestUsuarios">Gestión de usuarios</div></a>
                    </div>
                    <div class="col-sm-4">
                        <a href="gestionVehiculo.jsp"><div class="imgGestion" id="gestVehiculos">Gestión de vehiculos</div></a>
                    </div>
                    <div class="col-sm-4">
                        <a href="gestionChofer.jsp"><div class="imgGestion" id="gestChoferes">Gestión de choferes</div></a>
                    </div>
                </div>
                <br><br><br><br>
                <div class="row">
                    <div class="col-sm-4">
                        <a href="gestionChofervehiculo.jsp"><div class="imgGestionCV" id="gestChofervehiculos">Gestión de choferes/vehiculos</div></a>
                    </div>
                    <div class="col-sm-4">
                        <a href="gestionServicio.jsp"><div class="imgGestion" id="gestServicios">Control de servicios</div></a>
                    </div>
                    <div class="col-sm-4"> 
                        <a href="opcionesReportes.jsp"><div class="imgGestion" id="gestReportes">Reportes</div></a>
                   </div>
                </div>
            </div>
            </center>
        </div>
    </body>
</html>
