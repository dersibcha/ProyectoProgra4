/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package astt.una.prograiv.sistema.model;

import astt.una.prograiv.sistema.dao.ChoferDAO;
import astt.una.prograiv.sistema.dao.ChofervehiculoDAO;
import java.util.LinkedHashMap;
import java.util.List;
import astt.una.prograiv.sistema.domain.Chofer;
import astt.una.prograiv.sistema.domain.Chofervehiculo;

public class ChoferModel extends BaseModel implements InterfaceBaseModel<Chofer,String>{

    @Override
    public void save(Chofer o) {
        if(this.findByID(o.getCedula()) == null)
            this.getDao(o.getClass().getName()).save(o);
        else
            System.out.println("Error el Chofer ya ha sido registrado");
    }

    @Override
    public Chofer merge(Chofer o) {
        return (Chofer) this.getDao(o.getClass().getName()).merge(o);
    }

    @Override
    public void delete(Chofer o) {
        if(o != null){
             ChofervehiculoDAO cvdao = new  ChofervehiculoDAO();
            List<Chofervehiculo> listaChofervehiculo =cvdao.findAllByCedulachofer(o.getCedula());
            for(Chofervehiculo p : listaChofervehiculo){
            if(p!=null)    
            cvdao.delete(p);
            }
            
            
            this.getDao(o.getClass().getName()).delete(o);}
        else{
            System.out.println("El Chofer no se encuentra en la base de datos");}
    }

    @Override
    public Chofer findByID(String key) {
        return (Chofer)this.getDao(Chofer.class.getName()).findById(key);
    }

    /**
     *
     * @param className
     * @return
     */
    @Override
    public List<Chofer> findAll(String className) {
        return this.getDao(className).findAll();
    }
    
    
    public List<Chofer> findAllById(String cedula) {
        ChoferDAO pdao = new ChoferDAO();
        return pdao.findAllById(cedula);
    }
    
    @Override
    public List createQueryHQL(String className, LinkedHashMap<String, Object> parametros) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
