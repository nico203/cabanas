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

function homeController($scope, $timeout, $window){
    $scope.top_topBoard = (window.innerHeight * 97 / 200) - 113; //Seteo del height de las imagenes
    $scope.loadClassBoard = false;
    $scope.index = 1;
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
                    console.log(index,nextIndex,direction);
                    $scope.index = nextIndex;
                    console.log('index', $scope.index);
                }
            });
        });
    };
    
    $scope.moverASeccion = function(index) {
        console.log('index', index);
        $scope.index = index;
        $.fn.fullpage.moveTo(index);
    };
}

angular.module('HorizontesApp').component('home', {
    templateUrl: 'components/home/home.template.html',
    controller: ['$scope','$timeout','$window',homeController]
});