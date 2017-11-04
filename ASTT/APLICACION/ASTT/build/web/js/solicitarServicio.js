/* global google, TransitOptions, DrivingOptions, UnitSystem */
var map;
var geocoder;
var latitud; //la latitud para el point
var longitud; //la lomgitud para el point
var lng;//estas son temporales, por que si no hay que obtener la posicion del marker y separarlo con splice a la hora de guardar la posicion correcta , que pereza, mejor llevo una temporal y cuando el usuario se decide se guarda en las de arriba xd
var lat;
var lngOrigen;//estas son temporales, por que si no hay que obtener la posicion del marker y separarlo con splice a la hora de guardar la posicion correcta , que pereza, mejor llevo una temporal y cuando el usuario se decide se guarda en las de arriba xd
var latOrigen;
var lngDestino;//estas son temporales, por que si no hay que obtener la posicion del marker y separarlo con splice a la hora de guardar la posicion correcta , que pereza, mejor llevo una temporal y cuando el usuario se decide se guarda en las de arriba xd
var latDestino;
var point;
var origen;
var destino;


$(function () {
    
    $("#enviar").click(function () {
        enviar();
    });
    
    
    
    $("#solicitar").click(function () {
        solicitar();
    });

    
    $("#btMap").click(function () {
        initMap();
    });
 
    
     $("#aceptar").click(function () {
        cargarLocalizacion();
    });
    


    $("#cancelar").click(function () {
        $('#myModalFormulario').modal('hide');
         $("#modalMapa").modal('hide');
    });

$("#mostrarMapa").click(function () {
       initMap();
    });


    $('body').tooltip({selector: '[data-toggle="tooltip"]'});
});





function initMap() {

    geocoder = new google.maps.Geocoder(); //es para obtener de un text una cordenada pero aqui lo usamos a la inversa
    
   
    
    var myLatLng = {lat: 9.934739, lng: -84.087502}; //cordenada default , se puede cambiar por una madre de obtener la localizacion por gps
    
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
   
    
    
    map = new google.maps.Map(document.getElementById('map'), {
          mapTypeControl: false,
          center: {lat: 9.934739, lng: -84.087502},
          zoom: 13
    });
    directionsDisplay.setMap(map);
    
    
    
    //Markers
    var image="images/me.png";  
    var me = new google.maps.Marker({        
        position: myLatLng,
        map: map,
        title: 'Mi posicion!',
        icon:image
    });
     origen = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Punto Salida!'
    });
     destino = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Punto LLegada!'
    });
    
     
      
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            me.setPosition(pos);
            origen.setPosition(pos);
            
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, map.getCenter());
        }


   
    google.maps.event.addListener(map, 'click', function (event) {
        latDestino = event.latLng.lat();   //temporales
        lngDestino = event.latLng.lng(); //temporales
        var myLatLng = {lat: latDestino, lng: lngDestino};
        destino.setPosition(myLatLng);
        codeLatLngDestino(myLatLng);
        calculateAndDisplayRoute(directionsService, directionsDisplay,origen,destino);

    });
    google.maps.event.addListener(map, 'rightclick', function (event) {
        latOrigen = event.latLng.lat();   //temporales
        lngOrigen = event.latLng.lng(); //temporales
        
        var myLatLng = {lat: latOrigen, lng: lngOrigen};
        origen.setPosition(myLatLng);
        codeLatLngOrigen(myLatLng);
        calculateAndDisplayRoute(directionsService, directionsDisplay,origen,destino);
    });
    
    
    google.maps.event.addListener(map, "idle", function () {
        google.maps.event.trigger(map, 'resize');
    });

}

function calculateAndDisplayRoute(directionsService, directionsDisplay,origen,destino) {
        directionsService.route({
          origin: origen.getPosition(),
          destination: destino.getPosition(),
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }





function solicitar(){
var origin1 = new google.maps.LatLng(latOrigen, lngOrigen);
var origin2 = $('#origen').val();
var destinationA = $('#destino').val();
var destinationB = new google.maps.LatLng(latDestino, lngDestino);

var service = new google.maps.DistanceMatrixService();
service.getDistanceMatrix(
  {
    origins: [origin1, origin2],
    destinations: [destinationA, destinationB],
    travelMode: 'DRIVING',
    avoidHighways: false,
    avoidTolls: false
  }, function (response, status) {
  if (status === 'OK') {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;

    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      for (var j = 0; j < results.length; j++) {
        var element = results[j];
        var distance = element.distance.text;
        var duration = element.duration.text;
        var from = origins[i];
        var to = destinations[j];
      }
    }
  }
}
);
}

function handleLocationError(browserHasGeolocation, pos) {

      }
      



function codeLatLngOrigen(latlng) { // se encarga de obtener de la cordenada la direccion, asi se le muestra al usuario mas bonito
    geocoder.geocode({'latLng': latlng}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {

                $('#origen').val(results[0].formatted_address); // el formato y los resultados es generado por un json que crea el geocode

            } else {
                alert('No results found');
            }
        } else {
            alert('Geocoder failed due to: ' + status);
        }
    });
}


function codeLatLngDestino(latlng) { // se encarga de obtener de la cordenada la direccion, asi se le muestra al usuario mas bonito
    geocoder.geocode({'latLng': latlng}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {

                $('#destino').val(results[0].formatted_address); // el formato y los resultados es generado por un json que crea el geocode

            } else {
                alert('No results found');
            }
        } else {
            alert('Geocoder failed due to: ' + status);
        }
    });
}

