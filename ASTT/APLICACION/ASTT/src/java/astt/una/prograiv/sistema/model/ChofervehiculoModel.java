/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package astt.una.prograiv.sistema.model;

import astt.una.prograiv.sistema.dao.ChoferDAO;
import astt.una.prograiv.sistema.dao.ChofervehiculoDAO;
import astt.una.prograiv.sistema.dao.ServicioDAO;
import astt.una.prograiv.sistema.domain.Chofer;
import java.util.LinkedHashMap;
import java.util.List;
import astt.una.prograiv.sistema.domain.Chofervehiculo;
import astt.una.prograiv.sistema.domain.Servicio;
import java.util.ArrayList;

public class ChofervehiculoModel extends BaseModel implements InterfaceBaseModel<Chofervehiculo,Integer>{

    @Override
    public void save(Chofervehiculo o) {
        if(this.findByID(o.getIdchofervehiculo()) == null)
            this.getDao(o.getClass().getName()).save(o);
        else
            System.out.println("Error el Chofervehiculo ya ha sido registrado");
    }

    @Override
    public Chofervehiculo merge(Chofervehiculo o) {
        return (Chofervehiculo) this.getDao(o.getClass().getName()).merge(o);
    }

    @Override
    public void delete(Chofervehiculo o) {
        if(o != null){
           ServicioDAO sdao = new  ServicioDAO();
            List<Servicio> listaServicio =sdao.findAllByIdchofervehiculo(String.valueOf(o.getIdchofervehiculo()));
            for(Servicio s : listaServicio){
            if(s!=null)    
            sdao.delete(s);}

            this.getDao(o.getClass().getName()).delete(o);}
        else{
            System.out.println("El Chofervehiculo no se encuentra en la base de datos");}
    }

    @Override
    public Chofervehiculo findByID(Integer key) {
        return (Chofervehiculo)this.getDao(Chofervehiculo.class.getName()).findById(key);
    }

    /**
     *
     * @param className
     * @return
     */
    @Override
    public List<Chofervehiculo> findAll(String className) {
        return this.getDao(className).findAll();
    }
    
    public List<Chofervehiculo> findAllByCedulachofer(String cedulachofer) {
        ChofervehiculoDAO pdao = new ChofervehiculoDAO();
        return pdao.findAllByCedulachofer(cedulachofer);
    }
    public List<Chofervehiculo> findAllByIdvehiculo(String idvehiculo) {
        ChofervehiculoDAO pdao = new ChofervehiculoDAO();
        return pdao.findAllByIdvehiculo(idvehiculo);
    }
    
    
    
    public List<Chofervehiculo> findChofervehiculoByIdvehiculoCedulachofer(String idvehiculo,String cedulachofer) {
        
        
        ChofervehiculoDAO pdao = new ChofervehiculoDAO();
        
        
        List<Chofervehiculo> listafinal=new ArrayList<Chofervehiculo>();
        
        List<Chofervehiculo> listaChofervehiculo=pdao.findAllByIdvehiculo(idvehiculo);
        
         for(Chofervehiculo cv : listaChofervehiculo){
               if(cv.getCedulachofer().equals(cedulachofer))
               {
                   
                   listafinal.add(cv);              
               }
          }

        return listafinal;
    }
    
    
    public List<Chofer> findChoferesByIdvehiculo(String idvehiculo) {
        
        ChofervehiculoDAO pdao = new ChofervehiculoDAO();
        ChoferDAO cdao = new ChoferDAO();
        Chofer i=new Chofer();
        List<Chofervehiculo> listaChofervehiculo=pdao.findAllByIdvehiculo(idvehiculo);
        List<Chofer> listaChoferes=new ArrayList<Chofer>();
        for(Chofervehiculo cv : listaChofervehiculo){
              i=cdao.findById(cv.getCedulachofer());
              listaChoferes.add(i);
        }
        return listaChoferes;
    }
    
    
    @Override
    public List createQueryHQL(String className, LinkedHashMap<String, Object> parametros) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}


