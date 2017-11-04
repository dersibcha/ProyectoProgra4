package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class opcionesAdministrador_jsp extends org.apache.jasper.runtime.HttpJspBase
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

      out.write("\n");
      out.write("<!DOCTYPE html>\n");
      out.write("<html>\n");
      out.write("    <head>\n");
      out.write("        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n");
      out.write("        <title>ASTT</title>\n");
      out.write("        ");
      out.write("\r\n");
      out.write("<!-- Links and scripts for the .jsp pages -->\r\n");
      out.write("<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js\"></script>\r\n");
      out.write("<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\">\r\n");
      out.write("<script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"></script>\r\n");
      out.write("<script src=\"https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js\"></script>\r\n");
      out.write("<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">\r\n");
      out.write("<script src=\"js/datetimepicker.js\" type=\"text/javascript\"></script>\r\n");
      out.write("<link href=\"css/datetimepicker.min.css\" rel=\"stylesheet\" type=\"text/css\"/>\r\n");
      out.write("<link href=\"css/style.css\" rel=\"stylesheet\" type=\"text/css\"/>");
      out.write("\n");
      out.write("        ");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">\r\n");
      out.write("\r\n");
      out.write("<nav class=\"navbar navbar-default navbar-fixed-top\">\r\n");
      out.write("    <div class=\"container-fluid\">\r\n");
      out.write("        <div class =\"navbar-header\">\r\n");
      out.write("            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#myNavbar\">\r\n");
      out.write("                <span class=\"icon-bar\"></span>\r\n");
      out.write("                <span class=\"icon-bar\"></span>\r\n");
      out.write("                <span class=\"icon-bar\"></span>\r\n");
      out.write("            </button>\r\n");
      out.write("            <a class=\"navbar-brand\" href=\"inicio.jsp\" ><h2>ASTT</h2></a>\r\n");
      out.write("        </div>\r\n");
      out.write("\r\n");
      out.write("        <div class=\"collapse navbar-collapse\" id=\"myNavbar\">\r\n");
      out.write("            <ul class=\"nav navbar-nav navbar-left\">\r\n");
      out.write("                <li class=\"dropdown\">\r\n");
      out.write("                    <a href=\"\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"> Opciones de administración <span class=\"caret\"></span></a>\r\n");
      out.write("                    <ul class=\"dropdown-menu\">\r\n");
      out.write("                        <li><a href=\"opcionesAdministrador.jsp\">Opciones Administrado</a></li>\r\n");
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
      out.write("\r\n");
      out.write("            <ul class=\"nav navbar-nav navbar-right\">\r\n");
      out.write("               \r\n");
      out.write("                <li class=\"dropdown\">\r\n");
      out.write("                    <a href=\"\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"><span class=\"glyphicon glyphicon-user\"></span> Opciones de usuario <span class=\"caret\"></span></a>\r\n");
      out.write("                    <ul class=\"dropdown-menu dropdown-menu-left\">\r\n");
      out.write("                        <li><a href=\"usuario.jsp\"><span class=\"glyphicon glyphicon-user\"></span> Ver información </a></li>\r\n");
      out.write("                        <li class=\"divider\"></li>\r\n");
      out.write("                        <li><a href=\"Logout\"><span class=\"glyphicon glyphicon-log-in\"></span> Cerrar sesión </a></li>\r\n");
      out.write("                        <li class=\"divider\"></li>\r\n");
      out.write("                    </ul>\r\n");
      out.write("                </li>\r\n");
      out.write("            </ul>\r\n");
      out.write("        </div>\r\n");
      out.write("    </div>\r\n");
      out.write("</nav>\r\n");
      out.write("\r\n");
      out.write("\n");
      out.write("    </head>\n");
      out.write("    <body>\n");
      out.write("        <br><br><br><br><br><br><br>\n");
      out.write("        <div class=\"container\">\n");
      out.write("            <center>\n");
      out.write("            <div class=\"col-sm-12\">\n");
      out.write("                <div class=\"row\">\n");
      out.write("                    <div class=\"col-sm-4\">\n");
      out.write("                        <a href=\"gestionUsuario.jsp\"><div class=\"imgGestion\" id=\"gestUsuarios\">Gestión de usuarios</div></a>\n");
      out.write("                    </div>\n");
      out.write("                    <div class=\"col-sm-4\">\n");
      out.write("                        <a href=\"gestionVehiculo.jsp\"><div class=\"imgGestion\" id=\"gestVehiculos\">Gestión de vehiculos</div></a>\n");
      out.write("                    </div>\n");
      out.write("                    <div class=\"col-sm-4\">\n");
      out.write("                        <a href=\"gestionChofer.jsp\"><div class=\"imgGestion\" id=\"gestChoferes\">Gestión de choferes</div></a>\n");
      out.write("                    </div>\n");
      out.write("                </div>\n");
      out.write("                <br><br><br><br>\n");
      out.write("                <div class=\"row\">\n");
      out.write("                    <div class=\"col-sm-4\">\n");
      out.write("                        <a href=\"gestionChofervehiculo.jsp\"><div class=\"imgGestionCV\" id=\"gestChofervehiculos\">Gestión de choferes/vehiculos</div></a>\n");
      out.write("                    </div>\n");
      out.write("                    <div class=\"col-sm-4\">\n");
      out.write("                        <a href=\"gestionServicio.jsp\"><div class=\"imgGestion\" id=\"gestServicios\">Control de servicios</div></a>\n");
      out.write("                    </div>\n");
      out.write("                    <div class=\"col-sm-4\"> \n");
      out.write("                        <a href=\"opcionesReportes.jsp\"><div class=\"imgGestion\" id=\"gestReportes\">Reportes</div></a>\n");
      out.write("                   </div>\n");
      out.write("                </div>\n");
      out.write("            </div>\n");
      out.write("            </center>\n");
      out.write("        </div>\n");
      out.write("    </body>\n");
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
