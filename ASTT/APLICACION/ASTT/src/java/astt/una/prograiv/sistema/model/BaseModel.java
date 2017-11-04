/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package astt.una.prograiv.sistema.model;

import astt.una.prograiv.sistema.dao.BaseDAO;
import java.util.LinkedHashMap;

import  astt.una.prograiv.sistema.dao.UsuarioDAO;

import  astt.una.prograiv.sistema.dao.VehiculoDAO;

import  astt.una.prograiv.sistema.dao.ChoferDAO;


import  astt.una.prograiv.sistema.dao.ChofervehiculoDAO;

import  astt.una.prograiv.sistema.dao.ServicioDAO;


/**
 *
 * @author Andrey
 */
public class BaseModel {

    private final LinkedHashMap<String, BaseDAO> daos;

    public BaseModel() {
        daos = new LinkedHashMap();
        daos.put("astt.una.prograiv.sistema.domain.Usuario", new UsuarioDAO());
        daos.put("astt.una.prograiv.sistema.domain.Vehiculo", new VehiculoDAO());
        daos.put("astt.una.prograiv.sistema.domain.Chofer", new ChoferDAO());
        daos.put("astt.una.prograiv.sistema.domain.Chofervehiculo", new ChofervehiculoDAO());
        daos.put("astt.una.prograiv.sistema.domain.Servicio", new ServicioDAO());
       
        //Agregar todos los datos en este formato, no lo hago por tiempo
    }

    public BaseDAO getDao(String className) {
        return daos.get(className);
    }
}
