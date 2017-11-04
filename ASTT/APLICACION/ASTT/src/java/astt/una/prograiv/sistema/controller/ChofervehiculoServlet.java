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
import astt.una.prograiv.sistema.domain.Chofervehiculo;
import astt.una.prograiv.sistema.model.ChofervehiculoModel;
import com.google.gson.GsonBuilder;
import java.util.List;

/**
 *
 * @author Andrey
 */

public class ChofervehiculoServlet extends HttpServlet {

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

            Chofervehiculo i = new Chofervehiculo();

            ChofervehiculoModel chofervehiculoBL = new ChofervehiculoModel();

            HttpSession session = request.getSession();

            String accion = request.getParameter("accion"); //CRUD
            
            switch (accion) {
                case "consultarChofervehiculos":
                    json = new Gson().toJson(chofervehiculoBL.findAll(Chofervehiculo.class.getName()));
                    out.print(json);
                    break;
                    
                case "eliminarChofervehiculo":
                    i.setIdchofervehiculo(Integer.parseInt(request.getParameter("idchofervehiculo")));
                    chofervehiculoBL.delete(i);
                    break;

                case "consultarChofervehiculo":
                    //se consulta el Inventario por ID
                    String test=request.getParameter("cedula");
                    i = chofervehiculoBL.findByID(Integer.parseInt(request.getParameter("idchofervehiculo")));

                    //se pasa la informacion del objeto a formato JSON
                    Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
                    json =  gson.toJson(i);
                    out.print(json);
                    break;
                    

                    
                   
                  case "buscarChofervehiculosByCedulachofer":
                     
                    json = new Gson().toJson(chofervehiculoBL.findAllByCedulachofer(request.getParameter("cedulachofer")));
                    out.print(json);
                    break;  
                    
                  case "buscarChofervehiculosByIdvehiculo": 
                    json = new Gson().toJson(chofervehiculoBL.findAllByIdvehiculo(request.getParameter("idvehiculo")));
                    out.print(json);
                    break;  
                  case "buscarChoferesByIdvehiculo": 
                    json = new Gson().toJson(chofervehiculoBL.findChoferesByIdvehiculo(request.getParameter("idvehiculo")));
                    out.print(json);
                    break;  
                    
                 

                case "agregarChofervehiculo":
                case "modificarChofervehiculo":
                    //Se llena el objeto con los datos enviados por AJAX por el metodo post
                                 
                    List <Chofervehiculo> existChofer=chofervehiculoBL.findChofervehiculoByIdvehiculoCedulachofer(request.getParameter("idvehiculo"), request.getParameter("cedulachofer"));
                   
                    i.setCedulachofer(request.getParameter("cedulachofer"));
                    i.setIdvehiculo(request.getParameter("idvehiculo"));
                    
                    
                    if(request.getParameter("activo").equals("Activo")) {
                        i.setActivo(true);
                    } else {
                        i.setActivo(false);
                    }
                   
                   
                   
                    
                    i.setFecha(new Date());
                    //En esta linea se agrega quien metio al Inventario
                    if (accion.equals("agregarChofervehiculo")) { //es insertar Inventario
                        //Se guarda el objeto
                        if(existChofer==null || existChofer.isEmpty()){
                        i.setIdchofervehiculo(0);
                        chofervehiculoBL.save(i);
                        }
                        else{
                        i.setIdchofervehiculo(existChofer.get(0).getIdchofervehiculo());
                        
                        chofervehiculoBL.merge(i);
                        }
                        //Se imprime la respuesta con el response
                        out.print("C~El Chofervehiculo fue ingresado correctamente");

                    } else {//es modificar Inventario
                        //Se guarda el objeto
                         i.setIdchofervehiculo(Integer.parseInt(request.getParameter("idchofervehiculo")));
                        chofervehiculoBL.merge(i);

                        //Se imprime la respuesta con el response
                        out.print("C~El Chofervehiculo fue modificado correctamente");
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
