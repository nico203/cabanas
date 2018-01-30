/**
 * Hacer un provider con la api del mapa en vez de cargarlo como script en el index
 * 
 * ver para cargar dinamicamente las imagenes y el slider
 *  http://foundation.zurb.com/sites/docs/interchange.html
 *  
 *  
 *  ver de reemplazar el carousel con este
 *  http://foundation.zurb.com/sites/docs/orbit.html
 *  
 *  
 */

function homeController($scope, $timeout, windowResize){
    var MAIL = 'horizontedecalamuchita@gmail.com';
    var TELEFONO1 = '(03546) 15455479';
    var TELEFONO2 = '(03546) 15431194';
    
    $scope.top_topBoard = (window.innerHeight * 97 / 200) - 113; //Seteo del height de las imagenes
    $scope.loadClassBoard = false;
    $scope.index = 1;
    $scope.currentViewport = null;
    $scope.contactoActual = null;
    $scope.servicios = [
        {imagen:'swimm.png', nombre: 'Piscina'},
        {imagen:'wifi.png', nombre: 'Wi-Fi'},
        {imagen:'tv.png', nombre: 'TV'},
        {imagen:'cochera.png', nombre: 'Cochera Individual'},
        {imagen:'parrilla.png', nombre: 'Parrilla Cubierta'},
        {imagen:'microondas.png', nombre: 'Microondas'}
    ];
    
    $scope.init = function() {
        $timeout(function(){
            $scope.loadClassBoard = true;
        }, 1);
    };
    
    this.$onInit = function() {
        $timeout(function(){
            $('#fullpage').fullpage({
                onLeave: function(index, nextIndex, direction){
                    $scope.$apply(function() {
                        $scope.index = nextIndex;
                    });
                }
            });
            
            $scope.currentViewport = windowResize.getCurrentViweport();
        });
    };
    
    $scope.moverASeccion = function(index, mover) {
        $scope.index = index;
        $timeout(function(){
            $.fn.fullpage.moveTo(index);
        });
    };
    
    $scope.cambiarContacto = function(contacto) {
        if(contacto === 'fb') {
            $scope.contactoActual = null;
        } else if (contacto === 'mail') {
            $scope.contactoActual = MAIL;
        } else if (contacto === 'tel1') {
            $scope.contactoActual = TELEFONO1;
        } else {
            $scope.contactoActual = TELEFONO2;
        }
    };
    
    var destroyViewportChangeListener = $scope.$on('viewportChange', function(e, size) {
        $scope.currentViewport = size;
    });
    
    this.$onDestroy = function() {
        $.fn.fullpage.destroy('all');
        destroyViewportChangeListener();
    };
}

angular.module('HorizontesApp').component('home', {
    templateUrl: 'components/home/home.template.html',
    controller: ['$scope','$timeout','windowResize',homeController]
});