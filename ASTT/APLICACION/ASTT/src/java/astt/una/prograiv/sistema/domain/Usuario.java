package astt.una.prograiv.sistema.domain;
// Generated 27/09/2017 02:51:11 AM by Hibernate Tools 4.3.1


import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Usuario generated by hbm2java
 */
public class Usuario  implements java.io.Serializable {


     private String idusuario;
     private String nombre;
     private String apellidos;
     private String correoelectronico;
     private String contrasena;
     private Date fechanacimiento;
     private String direccion;
     private Integer telefono;
     private boolean transportista;
     private boolean activo;
     private String chofer;
     private Date fecha;
     private String usuario;
     private boolean administrador;
    

    public Usuario() {
    }

	
    public Usuario(String idusuario, String nombre, String apellidos, String correoelectronico, String contrasena, Date fechanacimiento, boolean transportista,boolean activo) {
        this.idusuario = idusuario;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correoelectronico = correoelectronico;
        this.contrasena = contrasena;
        this.fechanacimiento = fechanacimiento;
        this.transportista = transportista;
        this.activo = activo;
       
    }
    public Usuario(String idusuario, String nombre, String apellidos, String correoelectronico, String contrasena, Date fechanacimiento, String direccion, Integer telefono, boolean transportista,boolean activo,String chofer, Date fecha, String usuario,boolean administrador) {
       this.idusuario = idusuario;
       this.nombre = nombre;
       this.apellidos = apellidos;
       this.correoelectronico = correoelectronico;
       this.contrasena = contrasena;
       this.fechanacimiento = fechanacimiento;
       this.direccion = direccion;
       this.telefono = telefono;
       this.transportista = transportista;
       this.administrador = administrador;
       this.activo = activo;
       this.chofer = chofer;
       this.fecha = fecha;
       this.usuario = usuario;
       
    }
   
    public String getIdusuario() {
        return this.idusuario;
    }
    
    public void setIdusuario(String idusuario) {
        this.idusuario = idusuario;
    }
    public String getNombre() {
        return this.nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getApellidos() {
        return this.apellidos;
    }
    
    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }
    public String getCorreoelectronico() {
        return this.correoelectronico;
    }
    
    public void setCorreoelectronico(String correoelectronico) {
        this.correoelectronico = correoelectronico;
    }
    public String getContrasena() {
        return this.contrasena;
    }
    
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
    public Date getFechanacimiento() {
        return this.fechanacimiento;
    }
    
    public void setFechanacimiento(Date fechanacimiento) {
        this.fechanacimiento = fechanacimiento;
    }
    public String getDireccion() {
        return this.direccion;
    }
    
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
    public Integer getTelefono() {
        return this.telefono;
    }
    
    public void setTelefono(Integer telefono) {
        this.telefono = telefono;
    }
    public boolean isTransportista() {
        return this.transportista;
    }
    
    public void setTransportista(boolean transportista) {
        this.transportista = transportista;
    }
    
    public String getChofer() {
        return this.chofer;
    }
    
    public void setChofer(String chofer) {
        this.chofer = chofer;
    }
    
    public Date getFecha() {
        return this.fecha;
    }
    
    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }
    public String getUsuario() {
        return this.usuario;
    }
    
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }

    public boolean isAdministrador() {
        return administrador;
    }

    public void setAdministrador(boolean administrador) {
        this.administrador = administrador;
    }
   



}


