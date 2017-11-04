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
import astt.una.prograiv.sistema.domain.Chofer;
import astt.una.prograiv.sistema.model.ChoferModel;
import com.google.gson.GsonBuilder;

/**
 *
 * @author Andrey
 */

public class ChoferServlet extends HttpServlet {

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

            Chofer i = new Chofer();

            ChoferModel choferBL = new ChoferModel();

            HttpSession session = request.getSession();

            String accion = request.getParameter("accion"); //CRUD
            
            switch (accion) {
                case "consultarChoferes":
                    json = new Gson().toJson(choferBL.findAll(Chofer.class.getName()));
                    out.print(json);
                    break;
                    
                case "eliminarChofer":
                    i.setCedula(request.getParameter("cedula"));
                    choferBL.delete(i);
                    break;

                case "consultarChofer":
                    //se consulta el Inventario por ID
                    String test=request.getParameter("cedula");
                    i = choferBL.findByID(request.getParameter("cedula"));

                    //se pasa la informacion del objeto a formato JSON
                    Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
                    json =  gson.toJson(i);
                    out.print(json);
                    break;
                    

                    
                   
                  case "buscarChoferesById":
                     
                    json = new Gson().toJson(choferBL.findAllById(request.getParameter("cedula")));
                    out.print(json);
                    break;  
                    
                 

                case "agregarChofer":
                case "modificarChofer":
                    //Se llena el objeto con los datos enviados por AJAX por el metodo post
                                 
                    
                    i.setCedula(request.getParameter("cedula"));
                    i.setTipolicencia(request.getParameter("tipolicencia"));
                    
                    
                    if(request.getParameter("activo").equals("Activo") ) {
                        i.setActivo(true);
                    } else {
                        i.setActivo(false);
                    }
                   
                   
                    String fechatxt = request.getParameter("fechanacimiento");
                    DateFormat format = new SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH);
                    Date date = format.parse(fechatxt);
                    i.setFechanacimiento(date);
                    
                    String fechatxt2 = request.getParameter("vencimientolicencia");
                    DateFormat format2 = new SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH);
                    Date date2 = format2.parse(fechatxt2);
                    i.setVencimientolicencia(date2);
                    
                    i.setFecha(new Date());
                    //En esta linea se agrega quien metio al Inventario
                    if (accion.equals("agregarChofer")) { //es insertar Inventario
                        //Se guarda el objeto
                        choferBL.save(i);

                        //Se imprime la respuesta con el response
                        out.print("C~El Chofer fue ingresado correctamente");

                    } else {//es modificar Inventario
                        //Se guarda el objeto
                        choferBL.merge(i);

                        //Se imprime la respuesta con el response
                        out.print("C~El Chofer fue modificado correctamente");
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
