package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.util.*;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
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
      out.write("\n");
      out.write("\n");
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
      out.write("      \n");
      out.write("        <div class=\"row\">\n");
      out.write("           \n");
      out.write("            <div class=\"col-sm-12\">\n");
      out.write("\n");
      out.write("\n");
      out.write("                <div id=\"myCarousel\" class=\"carousel slide\" data-ride=\"carousel\">\n");
      out.write("                    <!-- Indicators -->\n");
      out.write("                    <ol class=\"carousel-indicators\">\n");
      out.write("                        <li data-target=\"#myCarousel\" data-slide-to=\"0\" class=\"active\"></li>\n");
      out.write("                        <li data-target=\"#myCarousel\" data-slide-to=\"1\"></li>\n");
      out.write("                        <li data-target=\"#myCarousel\" data-slide-to=\"2\"></li>\n");
      out.write("                    </ol>\n");
      out.write("\n");
      out.write("                    <!-- Wrapper for slides -->\n");
      out.write("                    <div class=\"carousel-inner\" >\n");
      out.write("                        <div class=\"item active\">\n");
      out.write("\n");
      out.write("                            <img class=\"images\" src=\"images/1.jpg\" alt=\"Chania\" >\n");
      out.write("                            <div class=\"carousel-caption\">\n");
      out.write("                                <h3>ASTT</h3>\n");
      out.write("                                <p>Prueba la Mejor Experiencia en transporte</p>\n");
      out.write("                            </div>\n");
      out.write("                        </div>\n");
      out.write("\n");
      out.write("                        <div class=\"item\">\n");
      out.write("                            <img class=\"images\" src=\"images/2.jpg\" alt=\"Chicago\">\n");
      out.write("                            <div class=\"carousel-caption\">\n");
      out.write("                                <h3>Vehiculos </h3>\n");
      out.write("                                <p>Certificados y del año!</p>\n");
      out.write("                            </div>\n");
      out.write("                        </div>\n");
      out.write("\n");
      out.write("                        <div class=\"item\">\n");
      out.write("                            <img  class=\"images\" src=\"images/3.jpg\" alt=\"New York\">\n");
      out.write("                            <div class=\"carousel-caption\">\n");
      out.write("                                <h3>Competencia</h3>\n");
      out.write("                                <p>Ninguna!</p>\n");
      out.write("                            </div>\n");
      out.write("                        </div>\n");
      out.write("                    </div>\n");
      out.write("\n");
      out.write("                    <!-- Left and right controls -->\n");
      out.write("                    <a class=\"left carousel-control\" href=\"#myCarousel\" data-slide=\"prev\">\n");
      out.write("                        <span class=\"glyphicon glyphicon-chevron-left\"></span>\n");
      out.write("                        <span class=\"sr-only\">Previous</span>\n");
      out.write("                    </a>\n");
      out.write("                    <a class=\"right carousel-control\" href=\"#myCarousel\" data-slide=\"next\">\n");
      out.write("                        <span class=\"glyphicon glyphicon-chevron-right\"></span>\n");
      out.write("                        <span class=\"sr-only\">Next</span>\n");
      out.write("                    </a>\n");
      out.write("                </div>\n");
      out.write("            </div>\n");
      out.write("        </div>\n");
      out.write("           <!-- Page Content -->\n");
      out.write("    <div class=\"container\">\n");
      out.write("\n");
      out.write("        <!-- Marketing Icons Section -->\n");
      out.write("        <div class=\"row\">\n");
      out.write("            <div class=\"col-lg-12\">\n");
      out.write("                <h1 class=\"page-header\">\n");
      out.write("                    Bienvenido a ASTT\n");
      out.write("                </h1>\n");
      out.write("            </div>\n");
      out.write("            <div class=\"col-md-4\">\n");
      out.write("                <div class=\"panel panel-default\">\n");
      out.write("                    <div class=\"panel-heading\">\n");
      out.write("                        <h4><i class=\"fa fa-fw fa-check\"></i> Historia</h4>\n");
      out.write("                    </div>\n");
      out.write("                    <div class=\"panel-body\">\n");
      out.write("                        <p>En 2017 el servicio de alquiler de transporte vehicular costarricense ASTT, decide crear una compañía que se hiciera cargo \n");
      out.write("                                de brindar el mejor servicio para poder competir en el mercado de este tipo de servicios.Esta Idea nace de un estudiante de la Universidad Nacional de Costa Rica.\n");
      out.write("                         </p>\n");
      out.write("                        <a href=\"historia.jsp\" class=\"btn btn-default\">Learn More</a>\n");
      out.write("                    </div>\n");
      out.write("                </div>\n");
      out.write("            </div>\n");
      out.write("            <div class=\"col-md-4\">\n");
      out.write("                <div class=\"panel panel-default\">\n");
      out.write("                    <div class=\"panel-heading\">\n");
      out.write("                        <h4><i class=\"fa fa-fw fa-gift\"></i> ¿Sabías que ASTT fue la primera compañía de servicios de transporte  en trabajar de una forma innovadora?</h4>\n");
      out.write("                    </div>\n");
      out.write("                    <div class=\"panel-body\">\n");
      out.write("                        <p>Este nuevo modelo de negocio ha revolucionado el mercado de transporte vehicular  en el país,<br>\n");
      out.write("                            democratizando el acceso al transporte alrededor del planeta.</p>\n");
      out.write("                        <a href=\"referente.html\" class=\"btn btn-default\">Learn More</a>\n");
      out.write("                    </div>\n");
      out.write("                </div>\n");
      out.write("            </div>\n");
      out.write("            <div class=\"col-md-4\">\n");
      out.write("                <div class=\"panel panel-default\">\n");
      out.write("                    <div class=\"panel-heading\">\n");
      out.write("                        <h4><i class=\"fa fa-fw fa-compass\"></i> Recomendaciones</h4>\n");
      out.write("                    </div>\n");
      out.write("                    <div class=\"panel-body\">\n");
      out.write("                        <p>Estas son algunas recomendaciones que te serán de gran utilidad antes de que realices tu viaje con nosotros. </p>\n");
      out.write("                        <a href=\"referente.html\" class=\"btn btn-default\">Learn More</a>\n");
      out.write("                    </div>\n");
      out.write("                    \n");
      out.write("                </div>\n");
      out.write("            </div>\n");
      out.write("        </div>\n");
      out.write("        <!-- /.row -->\n");
      out.write("\n");
      out.write("        <!-- Portfolio Section -->\n");
      out.write("        <div class=\"row\">\n");
      out.write("            <div class=\"col-lg-12\">\n");
      out.write("                <h2 class=\"page-header\">Galería</h2>\n");
      out.write("            </div>\n");
      out.write("            <div class=\"col-md-4 col-sm-6\">\n");
      out.write("                <a href=\"#\">\n");
      out.write("                    <img class=\"img-responsive img-portfolio img-hover\" src=\"images/a1.jpg\" alt=\"\">\n");
      out.write("                </a>\n");
      out.write("            </div>\n");
      out.write("            <div class=\"col-md-4 col-sm-6\">\n");
      out.write("                <a href=\"#\">\n");
      out.write("                    <img class=\"img-responsive img-portfolio img-hover\" src=\"images/a2.jpg\" alt=\"\">\n");
      out.write("                </a>\n");
      out.write("            </div>\n");
      out.write("            <div class=\"col-md-4 col-sm-6\">\n");
      out.write("                <a href=\"#\">\n");
      out.write("                    <img class=\"img-responsive img-portfolio img-hover\" src=\"images/a4.jpg\" alt=\"\">\n");
      out.write("                </a>\n");
      out.write("            </div>\n");
      out.write("            <div class=\"col-md-4 col-sm-6\">\n");
      out.write("                <a href=\"#\">\n");
      out.write("                    <img class=\"img-responsive img-portfolio img-hover\" src=\"images/a5.jpg\" alt=\"\">\n");
      out.write("                </a>\n");
      out.write("            </div>\n");
      out.write("            <div class=\"col-md-4 col-sm-6\">\n");
      out.write("                <a href=\"#\">\n");
      out.write("                    <img class=\"img-responsive img-portfolio img-hover\" src=\"images/a3.jpg\" alt=\"\">\n");
      out.write("                </a>\n");
      out.write("            </div>\n");
      out.write("            <div class=\"col-md-4 col-sm-6\">\n");
      out.write("                <a href=\"#\">\n");
      out.write("                    <img class=\"img-responsive img-portfolio img-hover\" src=\"images/a6.jpg\" alt=\"\">\n");
      out.write("                </a>\n");
      out.write("            </div>\n");
      out.write("        </div>\n");
      out.write("        <!-- /.row -->\n");
      out.write("\n");
      out.write("        <!-- Features Section -->\n");
      out.write("        <div class=\"row\">\n");
      out.write("            <div class=\"col-lg-12\">\n");
      out.write("                <h2 class=\"page-header\">Globalización</h2>\n");
      out.write("            </div>\n");
      out.write("            <div class=\"col-md-6\">\n");
      out.write("                <p>Como meta de la empresa:</p>\n");
      out.write("                <ul>\n");
      out.write("                    <li><strong>Abarcar el mercado en Oriente.</strong>\n");
      out.write("                    </li>\n");
      out.write("                    <li>Recorrer todos los Oceanos del planeta.</li>\n");
      out.write("                    <li>Abastecer de recursos a los habitantes de Africa</li>\n");
      out.write("                    <li>Unir lazos en aerolineas de  Latino America</li>\n");
      out.write("                    <li>Comunicar Polo Norte y Polo Sur.</li>\n");
      out.write("                    \n");
      out.write("                </ul>\n");
      out.write("                <p>La importancia de unir el planeta por medio de medios de transporte abarca en la libertad e igualdad en que cada individuo sea beneficiado de este servicio.</p></div>\n");
      out.write("            <div class=\"col-md-6\">\n");
      out.write("                <img class=\"img-responsive\" src=\"images/a7.jpg\" alt=\"\">\n");
      out.write("            </div>\n");
      out.write("        </div>\n");
      out.write("        <!-- /.row -->\n");
      out.write("\n");
      out.write("        <hr>\n");
      out.write("\n");
      out.write("        <!-- Call to Action Section -->\n");
      out.write("        <div class=\"well\">\n");
      out.write("            <div class=\"row\">\n");
      out.write("                <div class=\"col-md-8\">\n");
      out.write("                    <p>Por alguna duda o sugerencia .</p>\n");
      out.write("                </div>\n");
      out.write("                <div class=\"col-md-4\">\n");
      out.write("                    <a class=\"btn btn-lg btn-default btn-block\" href=\"contactenos.html\">Contactenos</a>\n");
      out.write("                </div>\n");
      out.write("              \n");
      out.write("            </div>\n");
      out.write("        </div>\n");
      out.write("\n");
      out.write("        <hr>\n");
      out.write("\n");
      out.write("        <!-- Footer -->\n");
      out.write("        <footer>\n");
      out.write("           <br><br>\n");
      out.write("     \n");
      out.write("        <nav class=\"navbar navbar-light bg-light \">\n");
      out.write("            \n");
      out.write("                <ul class=\"nav navbar-nav navbar-right\">\n");
      out.write("                    <li><a >Ayuda</a></li>\n");
      out.write("                    <li><a >Derechos reservados</a></li>\n");
      out.write("                </ul>\n");
      out.write("            \n");
      out.write("        </nav>\n");
      out.write("         \n");
      out.write("        </footer>\n");
      out.write("\n");
      out.write("    </div>\n");
      out.write("    <!-- /.container -->\n");
      out.write("\n");
      out.write("    \n");
      out.write("    \n");
      out.write("    \n");
      out.write("\n");
      out.write("    <!-- Script to Activate the Carousel -->\n");
      out.write("    <script>\n");
      out.write("    $('.carousel').carousel({\n");
      out.write("        interval: 5000 //changes the speed\n");
      out.write("    });\n");
      out.write("    </script>\n");
      out.write("    </body>\n");
      out.write("</html>\n");
      out.write("\n");
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
