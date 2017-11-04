/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package astt.una.prograiv.sistema.dao;


import astt.una.prograiv.sistema.domain.Servicio;
import astt.una.prograiv.sistema.utils.HibernateUtil;
import java.util.LinkedHashMap;
import java.util.List;
import org.hibernate.HibernateException;


/**
 *
 * @author LAPTOP
 */
public class ServicioDAO extends HibernateUtil implements BaseDAO<Servicio,Integer>{

    @Override
    public void save(Servicio o) {
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
    public Servicio merge(Servicio o) {
        try {
            startOperation();
            o = (Servicio) getSesion().merge(o);
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
    public void delete(Servicio o) {
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
    public Servicio findById(Integer o) {
        Servicio i = null;
        try {
            startOperation();
            i = (Servicio) getSesion().get(Servicio.class, o);
        } finally {
            getSesion().close();
        }
        return i;
    }

    @Override
    public List<Servicio> findAll() {
        List<Servicio> listaUsuarios;
        try{
            startOperation();
            listaUsuarios =  getSesion().createQuery("from Servicio").list();
        }finally{
            getSesion().close();
        }
        return listaUsuarios;
    }

     public List<Servicio> findAllByIdusuario(String idusuario){
        List<Servicio> listaServicio;
        try {
            startOperation();//HQL
            listaServicio = getSesion().createQuery("from Servicio where idusuario like '%%%"+ idusuario +"%%'").list();
        } finally {
            getSesion().close();
        }

        return listaServicio;
    }
     public List<Servicio> findAllByIdchofervehiculo(String idchofervehiculo){
        List<Servicio> listaServicio;
        try {
            startOperation();//HQL
            listaServicio = getSesion().createQuery("from Servicio where idchofervehiculo like '%%%"+ idchofervehiculo +"%%'").list();
        } finally {
            getSesion().close();
        }

        return listaServicio;
    }
    
    
    @Override
    public List createQueryHQL(LinkedHashMap<String, Object> parametros) {
           throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
 
    
    
    
}