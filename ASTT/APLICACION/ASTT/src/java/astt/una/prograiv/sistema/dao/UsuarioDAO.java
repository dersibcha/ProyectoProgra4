/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package astt.una.prograiv.sistema.dao;


import astt.una.prograiv.sistema.domain.Usuario;
import astt.una.prograiv.sistema.utils.HibernateUtil;
import java.util.LinkedHashMap;
import java.util.List;
import org.hibernate.HibernateException;


/**
 *
 * @author LAPTOP
 */
public class UsuarioDAO extends HibernateUtil implements BaseDAO<Usuario,String>{

    @Override
    public void save(Usuario o) {
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
    public Usuario merge(Usuario o) {
        try {
            startOperation();
            o = (Usuario) getSesion().merge(o);
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
    public void delete(Usuario o) {
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
    public Usuario findById(String o) {
        Usuario i = null;
        try {
            startOperation();
            i = (Usuario) getSesion().get(Usuario.class, o);
        } finally {
            getSesion().close();
        }
        return i;
    }

    @Override
    public List<Usuario> findAll() {
        List<Usuario> listaUsuarios;
        try{
            startOperation();
            listaUsuarios =  getSesion().createQuery("from Usuario").list();
        }finally{
            getSesion().close();
        }
        return listaUsuarios;
    }
    
     public List<Usuario> findAllById(String idusuario){
        List<Usuario> listaUsuario;
        try {
            startOperation();//HQL
            listaUsuario = getSesion().createQuery("from Usuario where idusuario like '%%%"+ idusuario +"%%'").list();
        } finally {
            getSesion().close();
        }

        return listaUsuario;
    }

    @Override
    public List createQueryHQL(LinkedHashMap<String, Object> parametros) {
           throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
 
    
}