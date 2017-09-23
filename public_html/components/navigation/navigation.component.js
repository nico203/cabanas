/**
 * Se usa este componente Foundation
 * http://foundation.zurb.com/sites/docs/off-canvas.html
 * 
 * La imagen debe quedar arriba del todo como titulo y la navegacion en forma vertical abajo
 * Poner un boton con la hamburguesa (3 linitas) en la esquina superior izquierda como la aplicacion GoPro
 */

function navigationController($window,$scope, $timeout, $animate, $location){
    
    $scope.$on('$routeChangeSuccess', function(e, c, p) {
        console.log(c, p);
    });
    
    var SCREEN_SIZE_MEDIUM = 700;
    var SCREEN_SIZE_LARGE = 1024;
    
    $scope.exclude = ['home'];
    $scope.offCanvas = null;
    $scope.showLogo = false;
    $scope.positionNav = null;
    $scope.smallSize = false;
    
    //Se calcula y se setea la navegacion acorde a la pantalla
    var calcScreen = function(size) {
        if(size >= SCREEN_SIZE_LARGE) {
            $scope.showLogo = true;
            $scope.smallSize = false;
            $scope.positionNav = {
                'margin-left' : '33%',
                'width': '60%'
            };
        } else if(size >= SCREEN_SIZE_MEDIUM) {
            $scope.showLogo = false;
            $scope.smallSize = false;
            $scope.positionNav = {
                'margin-left' : '5%',
                'width': '90%'
            };
        } else {
            $scope.showLogo = false;
            $scope.smallSize = true;
        }
        
        //Se aplica la clase off-canvas en caso de ser pantalla para celulares, sino se la quita
        if($scope.smallSize) {
            $animate.addClass($('#offCanvas'),'off-canvas position-left').then(function(){
                $timeout(function() {
                    if($scope.offCanvas === null) {
                        $scope.offCanvas = new Foundation.OffCanvas($('#offCanvas'));
                    }
                });
            },function(){});
        } else if($scope.offCanvas !== null) {
            $animate.removeClass($('#offCanvas'),'off-canvas position-left').then(function(){
                $timeout(function() {
                    if($scope.offCanvas !== null) {
                        $('#offCanvas').foundation('_destroy');
                        $scope.offCanvas = null;
                    }
                });
            },function(){});
        }
    };
    
    //Funciones que permiten el mapeo de la vista actual al menu para ponerle la clase "active"
    $scope.rutaActual = 'inicio';
    $scope.cambioRutaActual = function(ruta) {
        $scope.rutaActual = ruta;
    };
    
    //Evento accionado al presionar en la hamburguesa
    $scope.openCanvas = function() {
        $('#offCanvas').foundation('open');
    };
    
    //Al iniciar el componente se calcula el tipo de pantalla y se muestra la navegacion acorde
    this.$onInit = function() {
        calcScreen($window.innerWidth);
    };

    //Al ajustar la pantalla se calcula el tipo y se muestra la navegacion acorde
    $scope.$on('window:resize', function(e, size) {
        calcScreen(size);
    });
}

angular.module('HorizontesApp').component('appNavigation', {
    templateUrl: 'components/navigation/navigation.template.html',
    controller: ['$window','$scope', '$timeout', '$animate', '$location', navigationController]
});
