/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package astt.una.prograiv.sistema.dao;


import astt.una.prograiv.sistema.domain.Vehiculo;
import astt.una.prograiv.sistema.utils.HibernateUtil;
import java.util.LinkedHashMap;
import java.util.List;
import org.hibernate.HibernateException;


/**
 *
 * @author LAPTOP
 */
public class VehiculoDAO extends HibernateUtil implements BaseDAO<Vehiculo,String>{

    @Override
    public void save(Vehiculo o) {
        try {
            startOperation();
            getSesion().save(o);
            getTransac().commit();
        } catch (HibernateException he) {
            handleException(he);
            throw he;
        } finally {
            getSesion().close();
        }
    }

    @Override
    public Vehiculo merge(Vehiculo o) {
        try {
            startOperation();
            o = (Vehiculo) getSesion().merge(o);
            getTransac().commit();
        } catch (HibernateException he) {
            handleException(he);
            throw he;
        } finally {
            getSesion().close();
        }
        return o;
    }

    @Override
    public void delete(Vehiculo o) {
        try{
            startOperation();
            getSesion().delete(o);
            getTransac().commit();
        }catch (HibernateException he){
            handleException(he);
            throw he;
        }finally{
            getSesion().close();
        }
    }

    @Override
    public Vehiculo findById(String o) {
        Vehiculo i = null;
        try {
            startOperation();
            i = (Vehiculo) getSesion().get(Vehiculo.class, o);
        } finally {
            getSesion().close();
        }
        return i;
    }

    @Override
    public List<Vehiculo> findAll() {
        List<Vehiculo> listaVehiculos;
        try{
            startOperation();
            listaVehiculos =  getSesion().createQuery("from Vehiculo").list();
        }finally{
            getSesion().close();
        }
        return listaVehiculos;
    }
    
     public List<Vehiculo> findAllById(String idVehiculo){
        List<Vehiculo> listaVehiculo;
        try {
            startOperation();//HQL
            listaVehiculo = getSesion().createQuery("from Vehiculo where idVehiculo like '%%%"+ idVehiculo +"%%'").list();
        } finally {
            getSesion().close();
        }

        return listaVehiculo;
    }
     
     public List<Vehiculo> findAllByDuenno(String duenno){
        List<Vehiculo> listaVehiculo;
        try {
            startOperation();//HQL
            listaVehiculo = getSesion().createQuery("from Vehiculo where duenno like '%%%"+ duenno +"%%'").list();
        } finally {
            getSesion().close();
        }

        return listaVehiculo;
    }
     
     
    @Override
    public List createQueryHQL(LinkedHashMap<String, Object> parametros) {
           throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
 
    
}