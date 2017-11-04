/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package astt.una.prograiv.sistema.test;

import  astt.una.prograiv.sistema.dao.UsuarioDAO;
import  astt.una.prograiv.sistema.domain.Usuario;
import  astt.una.prograiv.sistema.model.UsuarioModel;

import  astt.una.prograiv.sistema.dao.VehiculoDAO;
import  astt.una.prograiv.sistema.domain.Vehiculo;
import  astt.una.prograiv.sistema.model.VehiculoModel;

import  astt.una.prograiv.sistema.dao.ChoferDAO;
import  astt.una.prograiv.sistema.domain.Chofer;
import  astt.una.prograiv.sistema.model.ChoferModel;



import  astt.una.prograiv.sistema.dao.ChofervehiculoDAO;
import  astt.una.prograiv.sistema.domain.Chofervehiculo;
import  astt.una.prograiv.sistema.model.ChofervehiculoModel;

import  astt.una.prograiv.sistema.dao.ServicioDAO;
import  astt.una.prograiv.sistema.domain.Servicio;
import  astt.una.prograiv.sistema.model.ServicioModel;


import java.util.Date;

/**
 *
 * @author der12
 */
public class Test {
    public static void main (String [] args){
     
      UsuarioDAO uDao= new UsuarioDAO();
      VehiculoDAO vDao= new VehiculoDAO();
      ChoferDAO cDao= new ChoferDAO();
      ChofervehiculoDAO cvDao= new ChofervehiculoDAO();
    
      ServicioDAO sDao=new ServicioDAO();
      
      Usuario u = new Usuario("derfel", "Derian", "Sibaja Chavarria","derfelsib@hotmail.com","0000",new Date(), true,true);
      uDao.merge(u);
     
      Vehiculo v= new Vehiculo("S12345","derfel", new Date(), "Toyota", "1231298", "Negro", 5, true,true,"Heredia");
      vDao.merge(v);
      
      Chofer c=new Chofer("402320842", "B1", new Date(), new Date(),true);
      cDao.merge(c);
      
      Chofervehiculo cv = new Chofervehiculo(1,"402320842" , "S12345",true);
      cvDao.merge(cv);
      
     // Ruta r=new Ruta(1, 123432,12341234, 12341234, 1231234);
      //rDao.merge(r);
      
     // Servicio s=new Servicio(1,1, "ada","derfel", new Date(), 1200, new Date(), "Efectivo");
      //sDao.merge(s);
//      
//      UsuarioModel uBl= new UsuarioModel();
//      VehiculoModel vBl= new VehiculoModel();
//      ChoferModel cBl= new ChoferModel();
//      ChofervehiculoModel cvBl= new ChofervehiculoModel();
//      RutaModel tBl= new RutaModel();
//      ServicioModel sBl=new ServicioModel();
//    
//      Usuario um = new Usuario("josech", "Jose", "Ramirez Solano","josRa@hotmail.com","12ad",new Date(), false);
//      uBl.save(um);
//     
//      Vehiculo vm= new Vehiculo("J12s345","josech", new Date(), "Honda", "4532298", "Blanco", 3, true,false,12312312,123123123);
//      vBl.save(vm);
//      
//      Chofer cm=new Chofer("502200985", "B2", new Date(), new Date(),true);
//      cBl.save(cm);
//      
//      Chofervehiculo cvm = new Chofervehiculo(2,"502200985" , "J12s345",true);
//      cvBl.save(cvm);
    
    }
}