/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(function () {
    
      $("#introduccion").click(function () {
      clearActives();
       $("#textPanel").html(""); 
       $("#textPanel").append($("<h3>Introducción:<h3><br>\n\
<p>Saga aerolineas destaca como la mejor compañía de aviación en todo el mundo,<br> \n\
nuestros objetivos es brindarle al consumidor la mejor experiencia en su vuelo <br>y \n\
demostrar por que predominamos en el mercado. <br><br>  Contamos con una gran variedad de opciones para que <br>\n\
el consumidor pueda experimentar de la mejor manera cada vuelo<br>que tome con nosotros.</p>"));
       $("#introduccion").addClass("active");
    });
    
    
    $("#cap1").click(function () {
       clearActives();
       $("#textPanel").html(""); 
      $("#textPanel").append($("<h3>¿Sabía que SAGA fue la primera compañía en servicios de transporte  en trabajar de una forma innovadora? :<h3><br>\n\
<p>Este nuevo modelo de negocio ha revolucionado el mercado del transporte publico en el país,<br> \n\
democratizando el acceso al transporte vehicular.<br><br>\n\
También fuimos pioneros en el lanzamiento del primer servicio de pagu simultaneo realizado<br> \n\
en su totalidad por anticipadod, del servicio de geolocalización móvil para clientes<br> \n\
y de un sitio web con recursos de accesibilidad para atender a personas con discapacidad <br>\n\
visual y motriz.\n\
</p>"));
       $("#cap1").addClass("active");
    });
    
     $("#cap2").click(function () {
       clearActives();
       $("#textPanel").html(""); 
       $("#textPanel").append($("<h3>Recomendaciones:<h3><br>\n\
         <p>Estas son algunas recomendaciones que te serán de gran utilidad antes de que realices tu viaje con nosotros.<br>\n\
</p><h3>Horarios</h3><p><br>Es importante que tengas en cuenta que debes estr con anticipación al aeropuerto para realizar tu viaje en el sitio concordado en la aplicacion.<br>\n\
Almomento de comenzar el viaje conversar con el transportista la ruta deseada para el viaje, esta no es necesario por lo que la aplicacion brinda una ruta por defecto.<br>\n\
</p><h3>Equipaje</h3><br>\n\
<p>Apenas notes un articulo extraviado en el viaje llamar al soporte o al cliente para verificar su locaclizacion en el vehiculo.</p>"));
       $("#cap2").addClass("active");
    });
    
    
     $("#dist").click(function () {
       clearActives();
       $("#textPanel").html(""); 
       $("#textPanel").append($("<h3>Distribucion</h3><br> <img src='IMAGES/distribucion.jpg' alt=''/>"));
       $("#dist").addClass("active");
    });
    
    
     $("#anex").click(function () {
       clearActives();
       $("#textPanel").html(""); 
       $("#textPanel").append($("<h3>Anexo</h3><br> <img src='IMAGES/anexos.jpg' alt='' />"));
       $("#anex").addClass("active");
    });
    
    
    
});


function clearActives(){
    $("introduccion").removeClass("active");
     $("cap1").removeClass("active");
      $("cap2").removeClass("active");
       $("dist").removeClass("active");
        $("anex").removeClass("active");
}