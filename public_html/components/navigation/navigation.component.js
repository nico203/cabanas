/**
 * Se usa este componente Foundation
 * http://foundation.zurb.com/sites/docs/off-canvas.html
 * 
 * La imagen debe quedar arriba del todo como titulo y la navegacion en forma vertical abajo
 * Poner un boton con la hamburguesa (3 linitas) en la esquina superior izquierda como la aplicacion GoPro
 */

function navigationController($window,$scope, $timeout, $animate, $location){
    $scope.exclude = ['home'];
    $scope.offCanvas = null;
    
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
        $timeout(function() {
            if($scope.offCanvas === null) {
                $scope.offCanvas = new Foundation.OffCanvas($('#offCanvas'), {
                    transition: 'push'
                });
                //ver de colocar todo en un solo documento para ver cual es el error
//                $(document).foundation();
                console.log('offCanvas',$scope.offCanvas);
            }
        });
    };
    
    $scope.$on('$dewstroy', function() {
        $('#offCanvas').foundation('_destroy');
        $scope.offCanvas = null;
    });

}

angular.module('HorizontesApp').component('appNavigation', {
    templateUrl: 'components/navigation/navigation.template.html',
    controller: ['$window','$scope', '$timeout', '$animate', '$location', navigationController]
});
