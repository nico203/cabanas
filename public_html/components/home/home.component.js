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
    var TELEFONO = '(343) 5-058-783';
    
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
        console.log('index', index);
        $scope.index = index;
        $.fn.fullpage.moveTo(index);
    };
    
    $scope.cambiarContacto = function(contacto) {
        if(contacto === 'fb') {
            $scope.contactoActual = null;
        } else if (contacto === 'mail') {
            $scope.contactoActual = MAIL;
        } else {
            $scope.contactoActual = TELEFONO;
        }
    };
    
    var destroyViewportChangeListener = $scope.$on('viewportChange', function(e, size) {
        $scope.currentViewport = size;
    });
    
    $scope.$on('$destroy', function() {
        destroyViewportChangeListener();
    });
}

angular.module('HorizontesApp').component('home', {
    templateUrl: 'components/home/home.template.html',
    controller: ['$scope','$timeout','windowResize',homeController]
});