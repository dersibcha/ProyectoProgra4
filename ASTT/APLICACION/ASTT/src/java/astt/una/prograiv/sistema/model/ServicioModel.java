/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package astt.una.prograiv.sistema.model;


import astt.una.prograiv.sistema.dao.ServicioDAO;
import java.util.LinkedHashMap;
import java.util.List;
import astt.una.prograiv.sistema.domain.Servicio;

public class ServicioModel extends BaseModel implements InterfaceBaseModel<Servicio,Integer>{

   
    @Override
    public void save(Servicio o) {
        if(this.findByID(o.getIdservicio()) == null)
            this.getDao(o.getClass().getName()).save(o);
        else
            System.out.println("Error Servicio ya ha sido registrado");
    }

    @Override
    public Servicio merge(Servicio o) {
        return (Servicio) this.getDao(o.getClass().getName()).merge(o);
    }

    @Override
    public void delete(Servicio o) {
        if(o != null)
            this.getDao(o.getClass().getName()).delete(o);
        else
            System.out.println("Servicio no se encuentra en la base de datos");
    }

    @Override
    public Servicio findByID(Integer key) {
        return (Servicio)this.getDao(Servicio.class.getName()).findById(key);
    }

    /**
     *
     * @param className
     * @return
     */
    @Override
    public List<Servicio> findAll(String className) {
        return this.getDao(className).findAll();
    }
    
     public List<Servicio> findAllByIdusuario(String idusuario) {
        ServicioDAO pdao = new ServicioDAO();
        return pdao.findAllByIdusuario(idusuario);
    }
     public List<Servicio> findAllByIdchofervehiculo(String idchofervehiculo) {
        ServicioDAO pdao = new ServicioDAO();
        return pdao.findAllByIdchofervehiculo(idchofervehiculo);
    }
    
    @Override
    public List createQueryHQL(String className, LinkedHashMap<String, Object> parametros) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
