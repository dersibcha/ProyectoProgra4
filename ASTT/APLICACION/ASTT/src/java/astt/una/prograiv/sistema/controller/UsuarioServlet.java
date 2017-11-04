/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package astt.una.prograiv.sistema.controller;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import astt.una.prograiv.sistema.domain.Usuario;
import astt.una.prograiv.sistema.model.UsuarioModel;
import astt.una.prograiv.sistema.model.VehiculoModel;
import com.google.gson.GsonBuilder;

/**
 *
 * @author Andrey
 */

public class UsuarioServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            String json; //Json para manejar las operaciones

            Usuario i = new Usuario();

            UsuarioModel usuarioBL = new UsuarioModel();
            VehiculoModel vehiculoBL = new VehiculoModel();

            HttpSession session = request.getSession();

            String accion = request.getParameter("accion"); //CRUD
            String usuario, contrasena;
            switch (accion) {
                case "consultarUsuarios":
                    json = new Gson().toJson(usuarioBL.findAll(Usuario.class.getName()));
                    out.print(json);
                    break;
                    
                case "eliminarUsuario":
                    i.setIdusuario(request.getParameter("idusuario"));
                    usuarioBL.delete(i);
                    break;

                case "consultarUsuario":
                    //se consulta el Inventario por ID
                    String test=request.getParameter("idusuario");
                    i = usuarioBL.findByID(request.getParameter("idusuario"));
                    //se pasa la informacion del objeto a formato JSON
                    Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
                    json =  gson.toJson(i);
                    out.print(json);
                    break;
                    
                   
                case "buscarUsuariosById":
                     
                    json = new Gson().toJson(usuarioBL.findAllById(request.getParameter("idusuario")));
                    out.print(json);
                    break;     
                
                    
                    
                case "seleccionarChofer":
                case "quitarChofer":
                    //se consulta el Producto por id
                    String test2=request.getParameter("idusuario");
                    i = usuarioBL.findByID(request.getParameter("idusuario"));
                    
                    if(accion.equals("seleccionarChofer")){
                    i.setChofer(request.getParameter("cedula"));
                    }
                    else{
                     i.setChofer(null);
                    }
                    i.setFecha(new Date());
                    usuarioBL.merge(i);
                    out.print("C~El Chofer fue agregado correctamente");
                    break;  
                    
                    
                case "agregarUsuario":
                case "modificarUsuario":
                    //Se llena el objeto con los datos enviados por AJAX por el metodo post
                                 
                    
                    i.setIdusuario(request.getParameter("idusuario"));
                    i.setNombre(request.getParameter("nombre"));
                    i.setApellidos(request.getParameter("apellidos"));
                    i.setContrasena(request.getParameter("contrasena"));
                    i.setCorreoelectronico(request.getParameter("correoelectronico"));
                    i.setDireccion(request.getParameter("direccion"));
                    i.setTelefono(Integer.parseInt(request.getParameter("telefono")));
                    
                    String fechatxt = request.getParameter("fechanacimiento");
                    DateFormat format = new SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH);
                    Date date = format.parse(fechatxt);
                    i.setFechanacimiento(date);
                    
                    if(request.getParameter("activo").equals("Activo") || request.getParameter("activo").equals("true")) {
                        i.setActivo(true);
                    } else {
                        i.setActivo(false);
                    }
                    
                    i.setTransportista(false);
                    
                    i.setFecha(new Date());
                    //En esta linea se agrega quien metio al Inventario
                    if (accion.equals("agregarUsuario")) { //es insertar Inventario
                        //Se guarda el objeto
                        usuarioBL.save(i);

                        //Se imprime la respuesta con el response
                        out.print("C~El Usuario fue ingresado correctamente");

                    } else {//es modificar Inventario
                        //Se guarda el objeto
                        usuarioBL.merge(i);

                        //Se imprime la respuesta con el response
                        out.print("C~El Usuario fue modificado correctamente");
                    }

                    break;
                case "desactivarUsuario":
                    String test3=request.getParameter("idusuario");
                    i = usuarioBL.findByID(request.getParameter("idusuario"));
                    
                   
                    i.setActivo(false);
                   
                    i.setFecha(new Date());
                    usuarioBL.merge(i);
                    out.print("C~El Usuario fue desactivado correctamente");
                    
                    break;
                 case "validarUsuario":
                    
                     usuario = request.getParameter("idusuario");
                    contrasena = request.getParameter("contrasena");
                    
                     i = usuarioBL.findByID(usuario);
                    if(i != null){
                    if (i.getContrasena().equals(contrasena) && i.isActivo() == true) {
                            session=request.getSession(true); 
                            session.setAttribute("idusuario", usuario); 
                            session.setAttribute("loginStatus", "login"); 
                           
                            if (i.isAdministrador() == true) {
                                session.setAttribute("tipo", "Administrador"); 
                            }else{
                                session.setAttribute("tipo", "Normal");    
                            }
                             
                            
                            if(i.getChofer()==null){
                                     session.setAttribute("chofer", "No"); 
                            
                            }
                            
                            else{
                                    session.setAttribute("chofer", "Yes");
                            
                            }
                            
                            
                            if(vehiculoBL.findAllByDuenno(request.getParameter("idusuario")).isEmpty()){
                                session.setAttribute("vehiculos", "No"); 
                            }else{
                                session.setAttribute("vehiculos", "Yes"); 
                            }
                            out.print("C~Validación correcta... espere esta siendo redireccionado");
                        
                    }else{
                        out.print("E~Usuario o contraseña invalidos");
                    }
                    
                    }else{
                        out.print("E~Usuario invalido");
                    }
                    break;
                    
                case "activarChoferSession":
                case "desactivarChoferSession":
                    session=request.getSession(true);  
                    if(accion.equals("activarChoferSession")){
                    session.setAttribute("chofer", "Yes");}
                    else{
                        session.setAttribute("chofer", "No");}
                    
                    out.print("C~Validación correcta... espere esta siendo redireccionado");
                        
                    break;
                
                
                default:
                    out.print("E~No se indico la acción que se desea realizar");
                    break;
            }

        } catch (NumberFormatException e) {
            out.print("E~" + e.getMessage());
        } catch (Exception e) {
            out.print("E~" + e.getMessage());
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
