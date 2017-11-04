/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package astt.una.prograiv.sistema.dao;


import astt.una.prograiv.sistema.domain.Chofer;
import astt.una.prograiv.sistema.utils.HibernateUtil;
import java.util.LinkedHashMap;
import java.util.List;
import org.hibernate.HibernateException;


/**
 *
 * @author LAPTOP
 */
public class ChoferDAO extends HibernateUtil implements BaseDAO<Chofer,String>{

    @Override
    public void save(Chofer o) {
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
    public Chofer merge(Chofer o) {
        try {
            startOperation();
            o = (Chofer) getSesion().merge(o);
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
    public void delete(Chofer o) {
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
    public Chofer findById(String o) {
        Chofer i = null;
        try {
            startOperation();
            i = (Chofer) getSesion().get(Chofer.class, o);
        } finally {
            getSesion().close();
        }
        return i;
    }

    @Override
    public List<Chofer> findAll() {
        List<Chofer> listaChoferes;
        try{
            startOperation();
            listaChoferes =  getSesion().createQuery("from Chofer").list();
        }finally{
            getSesion().close();
        }
        return listaChoferes;
    }
    
       public List<Chofer> findAllById(String cedula){
        List<Chofer> listaChofer;
        try {
            startOperation();//HQL
            listaChofer = getSesion().createQuery("from Chofer where cedula like '%%%"+ cedula +"%%'").list();
        } finally {
            getSesion().close();
        }

        return listaChofer;
    }
       
    @Override
    public List createQueryHQL(LinkedHashMap<String, Object> parametros) {
           throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
 
    
}