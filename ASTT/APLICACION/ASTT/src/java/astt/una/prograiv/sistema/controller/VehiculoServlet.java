/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package astt.una.prograiv.sistema.controller;


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
import astt.una.prograiv.sistema.domain.Vehiculo;
import astt.una.prograiv.sistema.model.VehiculoModel;
import com.google.gson.GsonBuilder;

/**
 *
 * @author Andrey
 */

public class VehiculoServlet extends HttpServlet {

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

            Vehiculo i = new Vehiculo();

            VehiculoModel vehiculoBL = new VehiculoModel();

            HttpSession session = request.getSession();

            String accion = request.getParameter("accion"); //CRUD
            
            switch (accion) {
                case "consultarVehiculos":
                    json = new Gson().toJson(vehiculoBL.findAll(Vehiculo.class.getName()));
                    out.print(json);
                    break;
                    
                case "eliminarVehiculo":
                    i.setIdVehiculo(request.getParameter("idVehiculo"));
                    vehiculoBL.delete(i);
                    break;

                case "consultarVehiculo":
                    //se consulta el Inventario por ID
                    i = vehiculoBL.findByID(request.getParameter("idVehiculo"));

                    //se pasa la informacion del objeto a formato JSON
                    Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
                    json =  gson.toJson(i);
                    out.print(json);
                    break;
                    

                    
                   
                  case "buscarVehiculosById":
                     
                    json = new Gson().toJson(vehiculoBL.findAllById(request.getParameter("idVehiculo")));
                    out.print(json);
                    break;  
                    
                  case "buscarVehiculosByDuenno":
                     
                    json = new Gson().toJson(vehiculoBL.findAllByDuenno(request.getParameter("duenno")));
                    out.print(json);
                    break;     

                case "agregarVehiculo":
                case "modificarVehiculo":
                    //Se llena el objeto con los datos enviados por AJAX por el metodo post
                                 
                    
                    i.setIdVehiculo(request.getParameter("idVehiculo"));
                    i.setDuenno(request.getParameter("duenno"));
                    i.setColor(request.getParameter("color"));
                    i.setModelo(request.getParameter("modelo"));
                    i.setPlaca(request.getParameter("placa"));
                    i.setPuntuacion(Integer.parseInt(request.getParameter("puntuacion")));
                    i.setUbicacionActual(request.getParameter("ubicacionActual"));
                    
                    
                    if(request.getParameter("activo").equals("Activado") || request.getParameter("activo").equals("true")) {
                        i.setActivo(true);
                    } else {
                        i.setActivo(false);
                    }
                   
                    if(request.getParameter("estado").equals("Activo") || request.getParameter("estado").equals("true")) {
                        i.setEstado(true);
                    } else {
                        i.setEstado(false);
                    }
                   
                    
                    
                    String fechatxt = "01/01/"+request.getParameter("anno");
                    DateFormat format = new SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH);
                    Date date = format.parse(fechatxt);
                    i.setAnno(date);
                    
                  
                    
                    i.setFecha(new Date());
                    //En esta linea se agrega quien metio al Inventario
                    if (accion.equals("agregarVehiculo")) { //es insertar Inventario
                        //Se guarda el objeto
                        vehiculoBL.save(i);

                        //Se imprime la respuesta con el response
                        out.print("C~El Vehiculo fue ingresado correctamente");

                    } else {//es modificar Inventario
                        //Se guarda el objeto
                        vehiculoBL.merge(i);

                        //Se imprime la respuesta con el response
                        out.print("C~El Vehiculo fue modificado correctamente");
                    }

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
