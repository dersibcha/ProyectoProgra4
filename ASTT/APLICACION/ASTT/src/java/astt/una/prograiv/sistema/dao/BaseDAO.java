/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package astt.una.prograiv.sistema.dao;

/**
 *
 * @author der12
 */

import java.util.LinkedHashMap;
import java.util.List;

/**
 *
 * @author LAPTOP
 */
public interface BaseDAO <T,K>{
    public abstract void save(T o);
    public abstract T merge(T o);
    public abstract void delete(T o);
    public abstract T findById(K o);
    public abstract List<T> findAll();
    public abstract List createQueryHQL(LinkedHashMap<String, Object> parametros);
}