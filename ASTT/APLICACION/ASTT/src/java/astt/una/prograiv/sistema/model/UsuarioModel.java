/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package astt.una.prograiv.sistema.model;

import astt.una.prograiv.sistema.dao.ServicioDAO;
import astt.una.prograiv.sistema.dao.UsuarioDAO;
import astt.una.prograiv.sistema.dao.VehiculoDAO;
import astt.una.prograiv.sistema.domain.Servicio;
import java.util.LinkedHashMap;
import java.util.List;
import astt.una.prograiv.sistema.domain.Usuario;
import astt.una.prograiv.sistema.domain.Vehiculo;

public class UsuarioModel extends BaseModel implements InterfaceBaseModel<Usuario,String>{

   
    @Override
    public void save(Usuario o) {
        if(this.findByID(o.getIdusuario()) == null)
            this.getDao(o.getClass().getName()).save(o);
        else
            System.out.println("Error el Usuario ya ha sido registrado");
    }

    @Override
    public Usuario merge(Usuario o) {
        return (Usuario) this.getDao(o.getClass().getName()).merge(o);
    }

    @Override
    public void delete(Usuario o) {
        if(o != null){
            VehiculoDAO vdao = new  VehiculoDAO();
            List<Vehiculo> listaVehiculo =vdao.findAllByDuenno(o.getIdusuario());
            for(Vehiculo p : listaVehiculo){
            if(p!=null)    
            vdao.delete(p);
            }
            ServicioDAO sdao = new  ServicioDAO();
            List<Servicio> listaServicio =sdao.findAllByIdusuario(o.getIdusuario());
            for(Servicio s : listaServicio){
            if(s!=null)    
            sdao.delete(s);
            }

            this.getDao(o.getClass().getName()).delete(o);
        }
        else{
            System.out.println("Usuario no se encuentra en la base de datos");}
    }

    @Override
    public Usuario findByID(String key) {
        return (Usuario)this.getDao(Usuario.class.getName()).findById(key);
    }

    /**
     *
     * @param className
     * @return
     */
    @Override
    public List<Usuario> findAll(String className) {
        return this.getDao(className).findAll();
    }
    
     public List<Usuario> findAllById(String idusuario) {
        UsuarioDAO pdao = new UsuarioDAO();
        return pdao.findAllById(idusuario);
    }
    
    @Override
    public List createQueryHQL(String className, LinkedHashMap<String, Object> parametros) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}

