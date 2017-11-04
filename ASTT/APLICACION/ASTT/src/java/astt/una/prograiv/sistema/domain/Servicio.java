package astt.una.prograiv.sistema.domain;
// Generated 27/09/2017 02:51:11 AM by Hibernate Tools 4.3.1


import java.util.Date;

/**
 * Servicio generated by hbm2java
 */
public class Servicio  implements java.io.Serializable {


     private int idservicio;
     private int idchofervehiculo;
     private String origen;
     private String destino;
     private String idusuario;
     private float costo;
     private String retroalimentacion;
     private Date horallegada;
     private Date horasalida;
     private String formapago;
     private Date fecha;
     private String usuario;

    public Servicio() {
    }

	
    public Servicio(int idservicio, int idchofervehiculo, String origen, String idusuario, float costo, Date horasalida, String formapago) {
        this.idservicio = idservicio;
        this.idchofervehiculo = idchofervehiculo;
        this.origen = origen;
        this.idusuario = idusuario;
      
      
        this.costo = costo;
        this.horasalida = horasalida;
        this.formapago = formapago;
    }
    public Servicio(int idservicio, int idchofervehiculo, String origen,String destino, String idusuario,  Date horasalida, float costo, String retroalimentacion, Date horallegada, String formapago, Date fecha, String usuario) {
       this.idservicio = idservicio;
       this.idchofervehiculo = idchofervehiculo;
       this.origen = origen;
       this.destino = destino;
       this.idusuario = idusuario;
      
      
       this.costo = costo;
       this.retroalimentacion = retroalimentacion;
       this.horasalida = horasalida;
       this.horallegada = horallegada;
       this.formapago = formapago;
       this.fecha = fecha;
       this.usuario = usuario;
    }
   
    public int getIdservicio() {
        return this.idservicio;
    }
    
    public void setIdservicio(int idservicio) {
        this.idservicio = idservicio;
    }
    public int getIdchofervehiculo() {
        return this.idchofervehiculo;
    }
    
    public void setIdchofervehiculo(int idchofervehiculo) {
        this.idchofervehiculo = idchofervehiculo;
    }
    
    public String getIdusuario() {
        return this.idusuario;
    }
    
    public void setIdusuario(String idusuario) {
        this.idusuario = idusuario;
    }
   
    
    public float getCosto() {
        return this.costo;
    }
    
    public void setCosto(float costo) {
        this.costo = costo;
    }
    public String getRetroalimentacion() {
        return this.retroalimentacion;
    }
    
    public void setRetroalimentacion(String retroalimentacion) {
        this.retroalimentacion = retroalimentacion;
    }
   
    public String getFormapago() {
        return this.formapago;
    }
    
    public void setFormapago(String formapago) {
        this.formapago = formapago;
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

    public String getOrigen() {
        return origen;
    }

    public void setOrigen(String origen) {
        this.origen = origen;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public Date getHorallegada() {
        return horallegada;
    }

    public void setHorallegada(Date horallegada) {
        this.horallegada = horallegada;
    }

    public Date getHorasalida() {
        return horasalida;
    }

    public void setHorasalida(Date horasalida) {
        this.horasalida = horasalida;
    }




}

