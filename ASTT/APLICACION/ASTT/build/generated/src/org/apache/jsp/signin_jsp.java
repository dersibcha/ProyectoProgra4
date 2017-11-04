package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.util.*;
import java.util.*;

public final class signin_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  static {
    _jspx_dependants = new java.util.ArrayList<String>(2);
    _jspx_dependants.add("/links.jspf");
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

      out.write('\n');
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");


    HttpSession sesion = request.getSession(true);
    String estado = "";
    String tipo = "";
    
    if(sesion!=null){
        if (sesion.getAttribute("idusuario")  == null) {
            
        }else{
            response.sendRedirect("index.jsp");
            
        }
    }

      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE html>\n");
      out.write("<html>\n");
      out.write("    <head>\n");
      out.write("        <title>Sign in</title>\n");
      out.write("        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n");
      out.write("        ");
      out.write("\r\n");
      out.write("<!-- Links and scripts for the .jsp pages -->\r\n");
      out.write("<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js\"></script>\r\n");
      out.write("<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\">\r\n");
      out.write("<script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"></script>\r\n");
      out.write("<script src=\"https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js\"></script>\r\n");
      out.write("<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">\r\n");
      out.write("<script src=\"js/utils.js\" type=\"text/javascript\"></script>\r\n");
      out.write("<script src=\"js/datetimepicker.js\" type=\"text/javascript\"></script>\r\n");
      out.write("<link href=\"css/datetimepicker.min.css\" rel=\"stylesheet\" type=\"text/css\"/>\r\n");
      out.write("<link href=\"css/style.css\" rel=\"stylesheet\" type=\"text/css\"/>");
      out.write("\n");
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
      out.write("                        <li><a href=\"signin.jsp\"><span class=\"glyphicon glyphicon-user\"></span>Sign in</a></li>\r\n");
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
      out.write("        \n");
      out.write("        <script src=\"js/signin.js\" type=\"text/javascript\"></script>\n");
      out.write("        <script src=\"js/utils.js\" type=\"text/javascript\"></script>\n");
      out.write("    </head>\n");
      out.write("    <body>\n");
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
      out.write("                        <h4 class=\"modal-title\" id=\"title\">Modal Header</h4>\n");
      out.write("                    </div>\n");
      out.write("                    <div class=\"modal-body\" id=\"body\">\n");
      out.write("                        <p>This is a small modal.</p>\n");
      out.write("                    </div>\n");
      out.write("                </div>\n");
      out.write("            </div>\n");
      out.write("        </div>\n");
      out.write("        <!-- ********************************************************** -->\n");
      out.write("        <!-- ********************************************************** -->\n");
      out.write("        <!-- ********************************************************** -->\n");
      out.write("        <br/><br/><br/>\n");
      out.write("        \n");
      out.write("        <div class=\"row\">\n");
      out.write("            <div class=\"col-md-4\"></div>\n");
      out.write("            <div class=\"col-md-4\">\n");
      out.write("                <h1>Sign in</h1>\n");
      out.write("              <br/><br/>  \n");
      out.write("                <form role=\"form\" onsubmit=\"return false;\" id=\"formUsuarios\">\n");
      out.write("                            \n");
      out.write("                           <div class=\"row\">  \n");
      out.write("                            <div class=\"col-md-12\">     \n");
      out.write("                           <div class=\"form-group\" id=\"groupIdUsuario\">\n");
      out.write("                             <label for=\"idusuario\">Usuario:</label>\n");
      out.write("                             <input type=\"text\" class=\"form-control\" id=\"idusuario\" placeholder=\"Usuario\" maxlength=\"20\"/>  \n");
      out.write("                           </div>\n");
      out.write("                           </div>\n");
      out.write("                           </div>\n");
      out.write("                            \n");
      out.write("                            <div class=\"row\">\n");
      out.write("                                <div class=\"col-md-6\">       \n");
      out.write("                                    <div class=\"form-group\" id=\"groupNombre\">\n");
      out.write("                                        <label for=\"nombre\">Nombre:</label>\n");
      out.write("                                        <input type=\"text\" class=\"form-control\" id=\"nombre\" placeholder=\"Nombre\" maxlength=\"20\">\n");
      out.write("                                    </div>\n");
      out.write("                                </div>\n");
      out.write("\n");
      out.write("\n");
      out.write("                                <div class=\"col-md-6\">        \n");
      out.write("                                    <div class=\"form-group\" id=\"groupApellidos\">\n");
      out.write("                                        <label for=\"apellidos\">Apellidos:</label>\n");
      out.write("                                        <input type=\"text\" class=\"form-control\" id=\"apellidos\" placeholder=\"Nombre\" maxlength=\"40\">\n");
      out.write("                                    </div>\n");
      out.write("                                </div>\n");
      out.write("                            </div>\n");
      out.write("                            \n");
      out.write("                            \n");
      out.write("                            <div class=\"row\">\n");
      out.write("                                <div class=\"col-md-6\">     \n");
      out.write("                                    <div class=\"form-group\" id=\"groupCorreoelectronico\">\n");
      out.write("                                        <label for=\"correoelectronico\">Correo Electronico:</label>\n");
      out.write("                                        <input type=\"mail\" class=\"form-control\" id=\"correoelectronico\" placeholder=\"correo@mail.com\" maxlength=\"30\">\n");
      out.write("                                    </div>\n");
      out.write("                                </div>\n");
      out.write("                                <div class=\"col-md-6\">  \n");
      out.write("                                    <div class=\"form-group\" id=\"groupContrasena\">\n");
      out.write("                                        <label for=\"contrasena\">Contraseña:</label>\n");
      out.write("                                        <input type=\"password\" class=\"form-control\" id=\"contrasena\" placeholder=\"\" maxlength=\"30\">\n");
      out.write("                                    </div>\n");
      out.write("                                </div>\n");
      out.write("                            </div>\n");
      out.write("                            \n");
      out.write("                            \n");
      out.write("                            <div class=\"row\">\n");
      out.write("                                <div class=\"col-md-6\">       \n");
      out.write("                                    <div class=\"form-group\" id=\"groupFechanacimiento\">\n");
      out.write("                                        <label for=\"fechanacimiento\">Fecha de Nacimiento:</label>\n");
      out.write("                                        <div id=\"fechanacimiento\" class=\"input-group date form_date\" data-date=\"\" data-date-format=\"dd/mm/yyyy\" data-link-field=\"dtp_input2\" data-link-format=\"dd/mm/yyyy\">\n");
      out.write("                                            <input class=\"form-control\" type=\"text\" value=\"\" placeholder=\"dd/mm/aaaa\" id=\"fechanacimientoText\">\n");
      out.write("                                            <span class=\"input-group-addon\">\n");
      out.write("                                                <span class=\"glyphicon glyphicon-calendar\"></span>\n");
      out.write("                                            </span>\n");
      out.write("                                        </div>\n");
      out.write("                                    </div>\n");
      out.write("                                </div>\n");
      out.write("                                <div class=\"col-md-6\">   \n");
      out.write("                                    <div class=\"form-group\" id=\"groupTelefono\">\n");
      out.write("                                        <label for=\"telefono\">Numero Telefonico:</label>\n");
      out.write("                                        <input type=\"number\" class=\"form-control\" id=\"telefono\" placeholder=\"0\" max=\"99999999\" min=\"10000000\" value=\"0\">  \n");
      out.write("                                    </div>\n");
      out.write("                                </div>\n");
      out.write("                            </div>\n");
      out.write("                            \n");
      out.write("                            <div class=\"row\">\n");
      out.write("                                <div class=\"col-md-12\">  \n");
      out.write("                                <div class=\"form-group\" id=\"groupDireccion\">\n");
      out.write("                                    <label for=\"direccion\">Direccion:</label>\n");
      out.write("                                    <textarea class=\"form-control\" id=\"direccion\" rows=\"3\" placeholder=\"...\" maxlength=\"50\"></textarea>\n");
      out.write("                                </div>\n");
      out.write("                                </div>\n");
      out.write("                            </div>\n");
      out.write("                            \n");
      out.write("\n");
      out.write("                            <div class=\"form-group\">\n");
      out.write("                                <input type=\"hidden\" value=\"agregarUsuario\" id=\"action\"/>\n");
      out.write("                                <button type=\"submit\" class=\"btn btn-primary\" id=\"enviar\">Guardar <span class=\"glyphicon glyphicon-floppy-disk\"></span></button>\n");
      out.write("                                <button type=\"reset\" class=\"btn btn-danger\" id=\"cancelar\">Cancelar <span class=\"glyphicon glyphicon-remove\"></span></button>\n");
      out.write("                            </div>\n");
      out.write("                        </form>\n");
      out.write("                \n");
      out.write("            </div>\n");
      out.write("            <div class=\"col-md-3\"></div>\n");
      out.write("          </div>\n");
      out.write("        \n");
      out.write("\n");
      out.write("    </body>\n");
      out.write("</html>\n");
      out.write("</html>\n");
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
