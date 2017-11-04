/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package astt.una.prograiv.sistema.model;


import astt.una.prograiv.sistema.dao.ChofervehiculoDAO;
import astt.una.prograiv.sistema.dao.VehiculoDAO;
import astt.una.prograiv.sistema.domain.Chofervehiculo;
import java.util.LinkedHashMap;
import java.util.List;
import astt.una.prograiv.sistema.domain.Vehiculo;

public class VehiculoModel extends BaseModel implements InterfaceBaseModel<Vehiculo,String>{

   
    @Override
    public void save(Vehiculo o) {
        if(this.findByID(o.getIdVehiculo()) == null)
            this.getDao(o.getClass().getName()).save(o);
        else
            System.out.println("Error el Vehiculo ya ha sido registrado");
    }

    @Override
    public Vehiculo merge(Vehiculo o) {
        return (Vehiculo) this.getDao(o.getClass().getName()).merge(o);
    }

    @Override
    public void delete(Vehiculo o) {
        if(o != null){
            ChofervehiculoDAO cvdao = new  ChofervehiculoDAO();
            List<Chofervehiculo> listaChofervehiculo =cvdao.findAllByIdvehiculo(o.getIdVehiculo());
            for(Chofervehiculo p : listaChofervehiculo){
            if(p!=null)    
            cvdao.delete(p);
            }
            
            
            this.getDao(o.getClass().getName()).delete(o);}
        else{
            System.out.println("Vehiculo no se encuentra en la base de datos");}
    }

    @Override
    public Vehiculo findByID(String key) {
        return (Vehiculo)this.getDao(Vehiculo.class.getName()).findById(key);
    }

    /**
     *
     * @param className
     * @return
     */
    @Override
    public List<Vehiculo> findAll(String className) {
        return this.getDao(className).findAll();
    }
    
    
    public List<Vehiculo> findAllById(String idVehiculo) {
        VehiculoDAO pdao = new VehiculoDAO();
        return pdao.findAllById(idVehiculo);
    }
    
    public List<Vehiculo> findAllByDuenno(String duenno) {
        VehiculoDAO pdao = new VehiculoDAO();
        return pdao.findAllByDuenno(duenno);
    }
    
    @Override
    public List createQueryHQL(String className, LinkedHashMap<String, Object> parametros) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}

