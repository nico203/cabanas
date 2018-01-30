/**
 * ver para cargar dinamicamente el mapa con enfoque responsivo
 *  http://foundation.zurb.com/sites/docs/interchange.html
 *  http://foundation.zurb.com/sites/docs/responsive-embed.html
 *  
 *  
 */

function mapaController($scope, $timeout){

    function cargarMapa (){
        $timeout(function(){
            try {
                //Overlay
                var TxtOverlay = function (pos, txt, cls, map) {
                    this.pos = pos;
                    this.txt_ = txt;
                    this.cls_ = cls;
                    this.map_ = map;
                    this.div_ = null;
                    this.setMap(map);
                };
                
                TxtOverlay.prototype = new google.maps.OverlayView();
                TxtOverlay.prototype.onAdd = function() {
                    var div = document.createElement('DIV');
                    div.className = this.cls_;
                    div.innerHTML = this.txt_;
                    this.div_ = div;
                    var overlayProjection = this.getProjection();
                    var position = overlayProjection.fromLatLngToDivPixel(this.pos);
                    div.style.left = position.x + 'px';
                    div.style.top = position.y + 'px';
                    var panes = this.getPanes();
                    panes.floatPane.appendChild(div);
                };
                TxtOverlay.prototype.draw = function() {
                    var overlayProjection = this.getProjection();
                    var position = overlayProjection.fromLatLngToDivPixel(this.pos);
                    var div = this.div_;
                    div.style.left = position.x + 'px';
                    div.style.top = position.y + 'px';
                };

                var map = new google.maps.Map(document.getElementById('mapa'), {
                    center: {lat: -32.0613844, lng: -64.5862298},
                    zoom: 16
                });
                var latlng = new google.maps.LatLng(-32.059189, -64.5854292);
                var marker = new google.maps.Marker({
                    position: latlng,
                    animation: google.maps.Animation.BOUNCE
                });
                marker.setMap(map);
                var txt = new TxtOverlay(latlng, 'Horizonte de Calamuchita', "overlaytext", map);
                
                
                //Servicios del sitio
                var infowindow = new google.maps.InfoWindow({
                    content: "<div class='container'>" +
                            "<div class='row'>Cabañas Horizonte de Calamuchita</div>" + 
                            "</div>"
                });
                var service = new google.maps.places.PlacesService(map);
                service.getDetails({
                    placeId: 'ChIJ6RekLq670pURm-hMff2-PPM'
                }, function(place, status){
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        infowindow.setContent("<div class='container' id='infowindow'>" +
                            "<div class='row titulo'>Cabañas Horizonte de Calamuchita</div>" + 
                            "<div class='row'><a target='_blank' href='"+ place.url +"'>Ver en Google Maps</a>" +
                            "</div>");
                    }
                });
                
                google.maps.event.addListener(marker,'click',function() {
                    //map.setZoom(16);
                    //map.setCenter(marker.getPosition());
                    infowindow.open(map,marker);
                    //map.panTo(marker.getPosition());
                });
                
                var mainDiv = document.createElement('div');
                mainDiv.style.padding = '10px';
                var boton = document.createElement('div');
                //boton.className = 'boton-control-mapa';
                boton.className = 'gm-style-mtc';
                boton.title = 'Set map to London';
                mainDiv.appendChild(boton);
                var texto = document.createElement('div');
                texto.className = 'texto-control-mapa';
                texto.innerHTML = 'Volver a Horizonte de Calamuchita';
                boton.appendChild(texto);

                google.maps.event.addDomListener(boton, 'click', function() {
                    map.panTo(marker.getPosition());
                    map.setCenter(marker.getPosition());
                });
                map.controls[google.maps.ControlPosition.TOP_RIGHT].push(mainDiv);
            } catch (err) {
                $scope.indice = (($scope.indice < 5) ? $scope.indice + 1 : 1);
                cargarMapa();
            }
        });
    }
    
    $scope.indice = 0;
    
    this.$onInit = function(){
        cargarMapa();
        $timeout(function() {
            AOS.init();
        });
    };
}

angular.module('HorizontesApp').component('mapa', {
    templateUrl: 'components/mapa/mapa.template.html',
    controller: ['$scope','$timeout',mapaController]
});
