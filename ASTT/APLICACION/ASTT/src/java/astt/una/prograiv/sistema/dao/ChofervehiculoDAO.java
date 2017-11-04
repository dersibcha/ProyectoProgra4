/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package astt.una.prograiv.sistema.dao;


import astt.una.prograiv.sistema.domain.Chofervehiculo;
import astt.una.prograiv.sistema.utils.HibernateUtil;
import java.util.LinkedHashMap;
import java.util.List;
import org.hibernate.HibernateException;


/**
 *
 * @author LAPTOP
 */
public class ChofervehiculoDAO extends HibernateUtil implements BaseDAO<Chofervehiculo,Integer>{

    @Override
    public void save(Chofervehiculo o) {
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
    public Chofervehiculo merge(Chofervehiculo o) {
        try {
            startOperation();
            o = (Chofervehiculo) getSesion().merge(o);
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
    public void delete(Chofervehiculo o) {
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
    public Chofervehiculo findById(Integer o) {
        Chofervehiculo i = null;
        try {
            startOperation();
            i = (Chofervehiculo) getSesion().get(Chofervehiculo.class, o);
        } finally {
            getSesion().close();
        }
        return i;
    }

    @Override
    public List<Chofervehiculo> findAll() {
        List<Chofervehiculo> listaChofervehiculos;
        try{
            startOperation();
            listaChofervehiculos =  getSesion().createQuery("from Chofervehiculo").list();
        }finally{
            getSesion().close();
        }
        return listaChofervehiculos;
    }
    
     public List<Chofervehiculo> findAllByCedulachofer(String cedulachofer){
        List<Chofervehiculo> listaChofervehiculo;
        try {
            startOperation();//HQL
            listaChofervehiculo = getSesion().createQuery("from Chofervehiculo where cedulachofer like '%%%"+ cedulachofer +"%%'").list();
        } finally {
            getSesion().close();
        }

        return listaChofervehiculo;
    }
    
   
     public List<Chofervehiculo> findAllByIdvehiculo(String idvehiculo){
        List<Chofervehiculo> listaChofervehiculo;
        try {
            startOperation();//HQL
            listaChofervehiculo = getSesion().createQuery("from Chofervehiculo where idvehiculo like '%%%"+ idvehiculo +"%%'").list();
        } finally {
            getSesion().close();
        }

        return listaChofervehiculo;
    }
     
     public List<Chofervehiculo> findAllByIdvehiculoCedulachofer(String idvehiculo,String cedulachofer){
        List<Chofervehiculo> listaChofervehiculo;
        try {
            startOperation();//HQL
              listaChofervehiculo = getSesion().createQuery("from Chofervehiculo where cedulachofer ="+ cedulachofer +" and idvehiculo ="+ idvehiculo +"").list();
     } finally {
            getSesion().close();
        }

        return listaChofervehiculo;
    }
    

    @Override
    public List createQueryHQL(LinkedHashMap<String, Object> parametros) {
           throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
 
    
}