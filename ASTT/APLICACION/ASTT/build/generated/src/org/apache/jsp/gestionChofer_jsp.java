package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.util.*;
import java.util.*;

public final class gestionChofer_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  static {
    _jspx_dependants = new java.util.ArrayList<String>(1);
    _jspx_dependants.add("/menu.jspf");
  }

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("text/html;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("\n");
      out.write("\n");
      out.write("\n");


    HttpSession sesion = request.getSession(true);
    String estado = "";
    
    if(sesion!=null){
        if (sesion.getAttribute("idusuario")  == null) {
            response.sendRedirect("index.jsp");
        }else{
            estado = (String)sesion.getAttribute("loginStatus");
        }
    }else{
        response.sendRedirect("index.jsp");
    }

      out.write("\n");
      out.write("<!DOCTYPE html>\n");
      out.write("<html>\n");
      out.write("    <head>\n");
      out.write("        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n");
      out.write("        <title>Gestión de Choferes</title>\n");
      out.write("        <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js\"></script>\n");
      out.write("        <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\">\n");
      out.write("        <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"></script>\n");
      out.write("        <script src=\"https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js\"></script>\n");
      out.write("        <script src=\"js/gestionChofer.js\" type=\"text/javascript\"></script>\n");
      out.write("        <script src=\"js/utils.js\" type=\"text/javascript\"></script>\n");
      out.write("        <link href=\"css/style.css\" rel=\"stylesheet\" type=\"text/css\"/>\n");
      out.write("        <script src=\"js/datetimepicker.js\" type=\"text/javascript\"></script>\n");
      out.write("        <link href=\"css/datetimepicker.min.css\" rel=\"stylesheet\" type=\"text/css\"/>\n");
      out.write("        ");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
 

    HttpSession sesionmenu = request.getSession(true);
    String tipoUsuario = "";
    String chofer="No";
    String logged="No";
    if(sesionmenu!=null){
        if (sesionmenu.getAttribute("idusuario")  == null) {
            //response.sendRedirect("login.jsp");
            logged="No";
        }else{
            tipoUsuario = (String)sesionmenu.getAttribute("tipo");
            logged="Yes";
            chofer=(String)sesionmenu.getAttribute("chofer");
        }
    }else{
       logged="No";
       // response.sendRedirect("login.jsp");
    }

      out.write("\r\n");
      out.write("<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("<div class=\"modal fade\" id=\"myModalSesion\" role=\"dialog\">\r\n");
      out.write("            <div class=\"modal-dialog modal-lg\">\r\n");
      out.write("                <div class=\"modal-content\">\r\n");
      out.write("                    <div class=\"modal-header\">\r\n");
      out.write("                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n");
      out.write("                        <h4 class=\"modal-title\" id=\"myModalTitle\">Datos de la sesión</h4>\r\n");
      out.write("                    </div>\r\n");
      out.write("                    <div class=\"modal-body\" id=\"myModalMessage\">\r\n");
      out.write("                        <ul>\r\n");
      out.write("                            <li><p><b>Usuario:</b> ");
 out.print(sesionmenu.getAttribute("idusuario")); 
      out.write("</p></li>\r\n");
      out.write("                            <li><p><b>Tipo: </b>");
 out.print(tipoUsuario); 
      out.write("</p></li>\r\n");
      out.write("                            <li><p><b>Chofer: </b>");
 out.print(chofer); 
      out.write("</p></li>\r\n");
      out.write("                            <li><p><b>logged: </b>");
 out.print(logged); 
      out.write("</p></li>\r\n");
      out.write("                            <li><p><b>Id sesión:</b> ");
 out.println(sesionmenu.getId()); 
      out.write("</p></li>\r\n");
      out.write("                            <li><p><b>Nueva?: </b> ");
 out.println(sesionmenu.isNew()); 
      out.write("</p></li>\r\n");
      out.write("                            ");
 
                                long longDuracion=sesionmenu.getLastAccessedTime(); sesionmenu.getCreationTime();
                                Date duracion=new Date(longDuracion);
                            
      out.write("\r\n");
      out.write("                            <li><p><b>Tiempo sesión: </b>");
 out.println(duracion.getMinutes()+"min. "+duracion.getSeconds()+"seg."); 
      out.write("</p></li>\r\n");
      out.write("                        </ul>\r\n");
      out.write("                    </div>\r\n");
      out.write("                </div>\r\n");
      out.write("            </div>\r\n");
      out.write("        </div>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("<nav class=\"navbar navbar-default navbar-fixed-top\">\r\n");
      out.write("    <div class=\"container-fluid\">\r\n");
      out.write("        <div class =\"navbar-header\">\r\n");
      out.write("            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#myNavbar\">\r\n");
      out.write("                <span class=\"icon-bar\"></span>\r\n");
      out.write("                <span class=\"icon-bar\"></span>\r\n");
      out.write("                <span class=\"icon-bar\"></span>\r\n");
      out.write("            </button>\r\n");
      out.write("            <a class=\"navbar-brand\" href=\"index.jsp\" ><h2>ASTT</h2></a>\r\n");
      out.write("        </div>\r\n");
      out.write("\r\n");
      out.write("        <div class=\"collapse navbar-collapse\" id=\"myNavbar\">\r\n");
      out.write("            \r\n");
      out.write("            ");
 if(tipoUsuario.equals("Administrador")) { 
      out.write(" \r\n");
      out.write("            <ul class=\"nav navbar-nav navbar-left\">\r\n");
      out.write("                <li class=\"dropdown\">\r\n");
      out.write("                    <a href=\"\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"> Opciones de administración <span class=\"caret\"></span></a>\r\n");
      out.write("                    <ul class=\"dropdown-menu\">\r\n");
      out.write("                        <li><a href=\"opcionesAdministrador.jsp\">Opciones Administracion</a></li>\r\n");
      out.write("                        <li class=\"divider\"></li>\r\n");
      out.write("                        <li><a href=\"gestionUsuario.jsp\">Gestión de Usuarios</a></li>\r\n");
      out.write("                        <li class=\"divider\"></li>\r\n");
      out.write("                        <li><a href=\"gestionVehiculo.jsp\">Gestión de Vehiculos</a></li>\r\n");
      out.write("                        <li class=\"divider\"></li>\r\n");
      out.write("                        <li><a href=\"gestionChofer.jsp\">Gestión de Choferes</a></li>\r\n");
      out.write("                        <li class=\"divider\"></li>\r\n");
      out.write("                        <li><a href=\"gestionChofervehiculo.jsp\">Gestión de Choferes / Vehiculos</a></li>\r\n");
      out.write("                        <li class=\"divider\"></li>\r\n");
      out.write("                        <li><a href=\"gestionServicio.jsp\">Gestión de Servicios</a></li>\r\n");
      out.write("                        <li class=\"divider\"></li>\r\n");
      out.write("                        <li><a href=\"#\">Ver reportes</a></li>\r\n");
      out.write("                        <li class=\"divider\"></li>\r\n");
      out.write("                    </ul>\r\n");
      out.write("                </li>\r\n");
      out.write("            </ul>\r\n");
      out.write("            ");
 } 
      out.write("\r\n");
      out.write("            \r\n");
      out.write("            <ul class=\"nav navbar-nav navbar-right\">\r\n");
      out.write("               \r\n");
      out.write("                \r\n");
      out.write("                ");
 if(logged.equals("Yes")) { 
      out.write(" \r\n");
      out.write("                <li class=\"dropdown\">\r\n");
      out.write("                    <a href=\"\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"><span class=\"glyphicon glyphicon-user\"></span> Opciones de usuario <span class=\"caret\"></span></a>\r\n");
      out.write("                    <ul class=\"dropdown-menu dropdown-menu-left\">\r\n");
      out.write("                        <li><a href=\"usuario.jsp\"><span class=\"glyphicon glyphicon-user\"></span>Opciones de Perfil </a></li>\r\n");
      out.write("                        <li class=\"divider\"></li>\r\n");
      out.write("                        <li><a href=\"vehiculos.jsp\"><span class=\"glyphicon glyphicon-road\"></span>Gestionar Vehiculos </a></li>\r\n");
      out.write("                        <li class=\"divider\"></li>\r\n");
      out.write("                        <li><a href=\"Logout\"><span class=\"glyphicon glyphicon-log-in\"></span> Cerrar sesión </a></li>\r\n");
      out.write("                        <li class=\"divider\"></li>\r\n");
      out.write("                        <li><button type=\"button\" class=\"btn btn-info centered\" data-toggle=\"modal\" data-target=\"#myModalSesion\" id=\"btMostarSesion\">Mostrar datos de la sesión</button>\r\n");
      out.write("                       </li>\r\n");
      out.write("                        <li class=\"divider\"></li>\r\n");
      out.write("                    </ul>\r\n");
      out.write("                </li>\r\n");
      out.write("                ");
 } 
      out.write(" \r\n");
      out.write("                ");
 if(logged.equals("No")) { 
      out.write(" \r\n");
      out.write("              <li class=\"dropdown\">\r\n");
      out.write("                    <a href=\"\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Iniciar Sesion <span class=\"caret\"></span></a>\r\n");
      out.write("                    <ul class=\"dropdown-menu dropdown-menu-left\">\r\n");
      out.write("                        <li><a href=\"login.jsp\"><span class=\"glyphicon glyphicon-user\"></span>Log in</a></li>\r\n");
      out.write("                        <li class=\"divider\"></li>\r\n");
      out.write("                        <li><a href=\"vehiculos.jsp\"><span class=\"glyphicon glyphicon-user\"></span>Sign in</a></li>\r\n");
      out.write("                        <li class=\"divider\"></li>\r\n");
      out.write("                    </ul>\r\n");
      out.write("                </li>\r\n");
      out.write("                ");
 } 
      out.write(" \r\n");
      out.write("                \r\n");
      out.write("                \r\n");
      out.write("            </ul>\r\n");
      out.write("        </div>\r\n");
      out.write("    </div>\r\n");
      out.write("</nav>\r\n");
      out.write("\r\n");
      out.write("\n");
      out.write("    </head>\n");
      out.write("    <body>\n");
      out.write("        <br><br>\n");
      out.write("\n");
      out.write("        <!-- ********************************************************** -->\n");
      out.write("        <!-- ********************************************************** -->\n");
      out.write("        <!-- Modal del BootsTrap para mostrar mensajes                  -->\n");
      out.write("        <!-- ********************************************************** -->\n");
      out.write("        <!-- ********************************************************** -->\n");
      out.write("        <div class=\"modal fade\" id=\"myModal\" role=\"dialog\">\n");
      out.write("            <div class=\"modal-dialog modal-sm\">\n");
      out.write("                <div class=\"modal-content\">\n");
      out.write("                    <div class=\"modal-header\">\n");
      out.write("                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n");
      out.write("                        <h4 class=\"modal-title\" id=\"myModalTitle\">Modal Header</h4>\n");
      out.write("                    </div>\n");
      out.write("                    <div class=\"modal-body\" id=\"myModalMessage\">\n");
      out.write("                        <p>This is a small modal.</p> \n");
      out.write("                    </div>\n");
      out.write("                </div>\n");
      out.write("            </div>\n");
      out.write("        </div>\n");
      out.write("\n");
      out.write("        <!-- ********************************************************** -->\n");
      out.write("        <!-- ********************************************************** -->\n");
      out.write("        <!-- Modal del BootsTrap para mostrar el formulario de insertar -->\n");
      out.write("        <!-- o modificar\n");
      out.write("        <!-- ********************************************************** -->\n");
      out.write("        <!-- ********************************************************** -->\n");
      out.write("        <div class=\"modal fade\" id=\"myModalFormulario\" role=\"dialog\">\n");
      out.write("            <div class=\"modal-dialog modal-md\">\n");
      out.write("                <div class=\"modal-content\">\n");
      out.write("                    <div class=\"modal-header\">\n");
      out.write("                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n");
      out.write("                        <h4 class=\"modal-title\" id=\"myModalTitle\">Insertar / Modificar Choferes\n");
      out.write("                    </div>\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("                    <div class=\"modal-body\" id=\"myModalMessage\">\n");
      out.write("                        <form role=\"form\" onsubmit=\"return false;\" id=\"formChoferes\">\n");
      out.write("                            \n");
      out.write("                            \n");
      out.write("                           <div class=\"form-group\" id=\"groupCedula\">\n");
      out.write("                             <label for=\"cedula\">Cedula:</label>\n");
      out.write("                             <input type=\"text\" class=\"form-control\" id=\"cedula\" placeholder=\"Cedula\" maxlength=\"20\"/>  \n");
      out.write("                           </div>\n");
      out.write("                            \n");
      out.write("                            <div class=\"form-group\" id=\"groupDuenno\">\n");
      out.write("                                <label for=\"tipolicencia\">Licencia:</label>\n");
      out.write("                                <select class=\"form-control\" id=\"tipolicencia\">\n");
      out.write("                                    <option selected disabled>Seleccione el tipo de licencia </option>\n");
      out.write("                                     <option >B1</option>\n");
      out.write("                                     <option >B2</option>\n");
      out.write("                                     <option >B3</option>\n");
      out.write("                                </select>\n");
      out.write("                            </div>\n");
      out.write("                            \n");
      out.write("                            <div class=\"form-group\" id=\"groupFechanacimiento\">\n");
      out.write("                                <label for=\"fechanacimiento\">Fecha de Nacimiento:</label>\n");
      out.write("                                <div id=\"fechanacimiento\" class=\"input-group date form_date\" data-date=\"\" data-date-format=\"dd/mm/yyyy\" data-link-field=\"dtp_input2\" data-link-format=\"dd/mm/yyyy\">\n");
      out.write("                                    <input class=\"form-control\" type=\"text\" value=\"\" placeholder=\"dd/mm/aaaa\" id=\"fechanacimientoText\">\n");
      out.write("                                    <span class=\"input-group-addon\">\n");
      out.write("                                        <span class=\"glyphicon glyphicon-calendar\"></span>\n");
      out.write("                                    </span>\n");
      out.write("                                </div>\n");
      out.write("                            </div>\n");
      out.write("                            \n");
      out.write("                            <div class=\"form-group\" id=\"groupVencimientolicencia\">\n");
      out.write("                                <label for=\"vencimientolicencia\">Fecha de Vencimiento de la licencia:</label>\n");
      out.write("                                <div id=\"vencimientolicencia\" class=\"input-group date form_date\" data-date=\"\" data-date-format=\"dd/mm/yyyy\" data-link-field=\"dtp_input2\" data-link-format=\"dd/mm/yyyy\">\n");
      out.write("                                    <input class=\"form-control\" type=\"text\" value=\"\" placeholder=\"dd/mm/aaaa\" id=\"vencimientolicenciaText\">\n");
      out.write("                                    <span class=\"input-group-addon\">\n");
      out.write("                                        <span class=\"glyphicon glyphicon-calendar\"></span>\n");
      out.write("                                    </span>\n");
      out.write("                                </div>\n");
      out.write("                            </div>\n");
      out.write("                            \n");
      out.write("                            <div class=\"form-group\" id=\"groupActivo\">\n");
      out.write("                                <label for=\"activo\">Activo:</label>\n");
      out.write("                                <select class=\"form-control\" id=\"activo\">\n");
      out.write("                                    <option selected disabled>Seleccione el estado del Chofer</option>\n");
      out.write("                                    <option >Activo</option>\n");
      out.write("                                    <option >Desactivo</option>\n");
      out.write("                                </select>\n");
      out.write("                            </div>\n");
      out.write("                            \n");
      out.write("\n");
      out.write("                            <div class=\"form-group\">\n");
      out.write("                                <input type=\"hidden\" value=\"agregarChofer\" id=\"action\"/>\n");
      out.write("                                <button type=\"submit\" class=\"btn btn-primary\" id=\"enviar\">Guardar <span class=\"glyphicon glyphicon-floppy-disk\"></span></button>\n");
      out.write("                                <button type=\"reset\" class=\"btn btn-danger\" id=\"cancelar\">Cancelar <span class=\"glyphicon glyphicon-remove\"></span></button>\n");
      out.write("                            </div>\n");
      out.write("                        </form>\n");
      out.write("                    </div>\n");
      out.write("                </div>\n");
      out.write("            </div>\n");
      out.write("        </div>\n");
      out.write("        <!-- ********************************************************** -->\n");
      out.write("        <!-- ********************************************************** -->\n");
      out.write("        <!-- ********************************************************** -->\n");
      out.write("\n");
      out.write("        \n");
      out.write("        <div class=\"modal fade\" id=\"myModalBuscar\" role=\"dialog\">\n");
      out.write("            <div class=\"modal-dialog modal-lg\">\n");
      out.write("                <div class=\"modal-content\">\n");
      out.write("                    <div class=\"modal-header\">\n");
      out.write("                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n");
      out.write("                        <h4 class=\"modal-title\" id=\"myModalTitleBuscar\">Buscar por Chofer: </h4>\n");
      out.write("                    </div>\n");
      out.write("\n");
      out.write("                     \n");
      out.write("\n");
      out.write("                    <div class=\"modal-body\" id=\"myModalMessageBuscar\">\n");
      out.write("                        \n");
      out.write("                       <div class=\"table table-responsive\">\n");
      out.write("                        <table class=\"table table-hover table-condensed\" id=\"tablaBuscar\">\n");
      out.write("                            <thead>\n");
      out.write("                            </thead>\n");
      out.write("                            <tbody>\n");
      out.write("                            </tbody>\n");
      out.write("                        </table>\n");
      out.write("                    </div>\n");
      out.write("     \n");
      out.write("                    </div>\n");
      out.write("                </div>\n");
      out.write("            </div>\n");
      out.write("        </div>\n");
      out.write("        \n");
      out.write("        \n");
      out.write("        \n");
      out.write("        \n");
      out.write("     \n");
      out.write("\n");
      out.write("        \n");
      out.write("        <div class=\"container\">\n");
      out.write("            <div class=\"page-header\">\n");
      out.write("                <center><h1>Gestión de Choferes <span class=\"glyphicon glyphicon-user\"></span></h1></center>\n");
      out.write("            </div>\n");
      out.write("\n");
      out.write("\n");
      out.write("            <!-- ********************************************************** -->\n");
      out.write("            <!-- PANEL DEL MANTENIMIENTO DE CHOFERES -->\n");
      out.write("            <!-- ********************************************************** -->\n");
      out.write("\n");
      out.write("            <div class=\"panel panel-primary\">\n");
      out.write("                <div class=\"panel-heading\">\n");
      out.write("                    <div class=\"row\">\n");
      out.write("                        <div class=\"col-sm-10\"><h3>Mantenimiento Choferes</h3></div>\n");
      out.write("                        <div class=\"col-sm-2\">\n");
      out.write("                            <h3><button type=\"button\" class=\"btn btn-success \" data-toggle=\"modal\" data-target=\"#myModalFormulario\" id=\"btMostrarForm\">Insertar Chofer</button></h3>\n");
      out.write("                        </div>\n");
      out.write("                    </div></div>\n");
      out.write("                <div class=\"panel-body\">\n");
      out.write("                    <br>\n");
      out.write("                    <!-- ********************************************************** -->\n");
      out.write("                    <div class=\"col-sm-12\">\n");
      out.write("                        <form role=\"form\" onsubmit=\"return false;\" id=\"formChoferes\" class=\"form-horizontal \">\n");
      out.write("                            <div class=\"form-group\" id=\"groupBuscar\">\n");
      out.write("                                <div class=\"col-sm-4\" style=\"text-align: right; vertical-align: middle;\">\n");
      out.write("                                    <p><b>Buscar por Chofer:</b></p>\n");
      out.write("                                </div>\n");
      out.write("                                <div class=\"col-sm-4\">\n");
      out.write("                                    <input type=\"text\" class=\"form-control\" id=\"busqueda\" placeholder=\"Digite el Chofer\" maxlength =\"20\" required>\n");
      out.write("                                </div>\n");
      out.write("                                <div class=\"col-sm-4\">\n");
      out.write("                                    <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#myModalBuscar\" id=\"btBuscar\">\n");
      out.write("                                        Buscar <span class=\"glyphicon glyphicon-search\"></span>\n");
      out.write("                                    </button>\n");
      out.write("                                </div>\n");
      out.write("                            </div>\n");
      out.write("                        </form>\n");
      out.write("                    </div>\n");
      out.write("\n");
      out.write("                    <!-- ********************************************************** -->\n");
      out.write("                   \n");
      out.write("                    <br><br><br><br>\n");
      out.write("                    <div class=\"table table-responsive\">\n");
      out.write("                        <table class=\"table table-hover table-condensed\" id=\"tablaChofer\">\n");
      out.write("                            <thead>\n");
      out.write("                            </thead>\n");
      out.write("                            <tbody>\n");
      out.write("                            </tbody>\n");
      out.write("                        </table>\n");
      out.write("                    </div>\n");
      out.write("              \n");
      out.write("                <div class=\"row\">\n");
      out.write("                        <div class=\"col-sm-12\" style=\"text-align: center\">\n");
      out.write("                            <ul class=\"pagination\" id=\"pages\">\n");
      out.write("                                <li id=\"back\"><a href=\"#\"><<</a></li>\n");
      out.write("                                <li id=\"first\" value=\"1\" class=\"pag active\"><a><span id=\"txt1\" class=\"txt\">1</span></a></li>\n");
      out.write("                                <li id=\"second\" value=\"2\" class=\"pag\"><a><span id=\"txt2\" class=\"txt\">2</span></a></li>\n");
      out.write("                                <li id=\"third\" value=\"3\" class=\"pag\"><a><span id=\"txt3\" class=\"txt\">3</span></a></li>\n");
      out.write("                                <li id=\"fourth\" value=\"4\" class=\"pag\"><a><span id=\"txt4\" class=\"txt\">4</span></a></li>\n");
      out.write("                                <li id=\"fifth\" value=\"5\" class=\"pag\"><a><span id=\"txt5\" class=\"txt\">5</span></a></li>\n");
      out.write("                                <li id=\"next\"><a href=\"#\">>></a></li>\n");
      out.write("                            </ul>\n");
      out.write("                        </div>\n");
      out.write("                    </div>\n");
      out.write("                \n");
      out.write("                  </div>\n");
      out.write("                \n");
      out.write("                <div class=\"panel-footer\">Nota: Acciones válidas dependerán del rol del usuario\n");
      out.write("                    \n");
      out.write("      \n");
      out.write("                </div>\n");
      out.write("            </div>\n");
      out.write("        </div>\n");
      out.write("    </body>\n");
      out.write("</html>");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
