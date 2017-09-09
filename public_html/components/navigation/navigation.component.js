/* global Foundation */

/**
 * Ver este componente para la navegacion
 * http://foundation.zurb.com/sites/docs/off-canvas.html
 * 
 * La imagen debe quedar arriba del todo como titulo y la navegacion en forma vertical abajo
 * Poner un boton con la hamburguesa (3 linitas) en la esquina superior izquierda como la aplicacion GoPro
 */

function navigationController($window,$scope, $timeout, $animate){
    var SCREEN_SIZE_MEDIUM = 700;
    var SCREEN_SIZE_LARGE = 1024;
    
    $scope.offCanvas = null;
    $scope.showLogo = false;
    $scope.positionNav = null;
    $scope.smallSize = false;
    
    var initOffCanvas = function() {
        if(null !== $scope.offCanvas) return;
    };
    
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
            $scope.showLogo = true;
            $scope.smallSize = true;
        }
        
        if($scope.smallSize) {
            $animate.addClass($('#offCanvas'),'off-canvas position-left').then(function(){
                $timeout(function() {
                    if($scope.offCanvas === null) {
                        $scope.offCanvas = new Foundation.OffCanvas($('#offCanvas'));
                    }
                });
            },function(){});
        } else {
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
    
    $scope.rutaActual = 'inicio';
    
    $scope.cambioRutaActual = function(ruta) {
        $scope.rutaActual = ruta;
    };
    
    
    $scope.openCanvas = function() {
        $('#offCanvas').foundation('open');
    };
    
    this.$onInit = function() {
        calcScreen($window.innerWidth);
//        $('app-navigation').foundation();
    };

    $scope.$on('window:resize', function(e, size) {
        calcScreen(size);
    });
}

angular.module('HorizontesApp').component('appNavigation', {
    templateUrl: 'components/navigation/navigation.template.html',
    controller: ['$window','$scope', '$timeout', '$animate', navigationController]
});
