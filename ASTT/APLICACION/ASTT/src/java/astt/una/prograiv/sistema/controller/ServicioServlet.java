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
import astt.una.prograiv.sistema.domain.Servicio;
import astt.una.prograiv.sistema.model.ServicioModel;
import com.google.gson.GsonBuilder;

/**
 *
 * @author Andrey
 */

public class ServicioServlet extends HttpServlet {

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

            Servicio i = new Servicio();

            ServicioModel servicioBL = new ServicioModel();

            HttpSession session = request.getSession();

            String accion = request.getParameter("accion"); //CRUD
            
            switch (accion) {
                case "consultarServicios":
                    Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy HH:mm a").create();
                    json = gson.toJson(servicioBL.findAll(Servicio.class.getName()));
                    out.print(json);
                    break;
                    
                case "eliminarServicio":
                    i.setIdservicio(Integer.parseInt(request.getParameter("idservicio")));
                    servicioBL.delete(i);
                    break;

                case "consultarServicio":
                    //se consulta el Inventario por ID
                    String test=request.getParameter("idservicio");
                    i = servicioBL.findByID(Integer.parseInt(request.getParameter("idservicio")));

                    //se pasa la informacion del objeto a formato JSON
                    Gson gson2 = new GsonBuilder().setDateFormat("HH:mm a").create();
                    json =  gson2.toJson(i);
                    out.print(json);
                    break;
                    

               
                    
                  case "buscarServiciosByIdchofervehiculo":
                     
                    json = new Gson().toJson(servicioBL.findAllByIdchofervehiculo(request.getParameter("idchofervehiculo")));
                    out.print(json);
                    break;  
                    
                  case "buscarServiciosByIdusuario": 
                    json = new Gson().toJson(servicioBL.findAllByIdusuario(request.getParameter("idusuario")));
                    out.print(json);
                    break;  
                     

                case "agregarServicio":
                case "modificarServicio":
                    //Se llena el objeto con los datos enviados por AJAX por el metodo post
                                 
                    
                    i.setIdchofervehiculo(Integer.parseInt(request.getParameter("idchofervehiculo")));
                    i.setCosto(Float.parseFloat(request.getParameter("costo")));
              
                    i.setIdusuario(request.getParameter("idusuario"));
                    i.setOrigen(request.getParameter("origen"));
                    i.setDestino(request.getParameter("destino"));
                   
                    i.setFormapago(request.getParameter("formapago"));
                    i.setRetroalimentacion(request.getParameter("retroalimentacion"));
                    
                    
                   Date salidadate=new Date();
                   salidadate.setHours(Integer.parseInt(request.getParameter("horasalida")));
                   salidadate.setMinutes(Integer.parseInt(request.getParameter("minutosalida")));
                    i.setHorallegada(salidadate);
                   
                    Date llegadadate=new Date();
                   llegadadate.setHours(Integer.parseInt(request.getParameter("horallegada")));
                   llegadadate.setMinutes(Integer.parseInt(request.getParameter("minutollegada")));
                    i.setHorasalida(llegadadate);
                    
                    i.setFecha(new Date());
                    //En esta linea se agrega quien metio al Inventario
                    if (accion.equals("agregarServicio")) { //es insertar Inventario
                        //Se guarda el objeto
                        i.setIdservicio(0);
                        servicioBL.save(i);

                        //Se imprime la respuesta con el response
                        out.print("C~El Servicio fue ingresado correctamente");

                    } else {//es modificar Inventario
                        //Se guarda el objeto
                        i.setIdservicio(Integer.parseInt(request.getParameter("idservicio")));
                        servicioBL.merge(i);

                        //Se imprime la respuesta con el response
                        out.print("C~El Servicio fue modificado correctamente");
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
