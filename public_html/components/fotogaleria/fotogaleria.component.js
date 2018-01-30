/**
 * Ver como setear las imagenes alineadas con este plugin
 * http://foundation.zurb.com/sites/docs/equalizer.html
 */

function fotogaleriaController($scope, $timeout){
    var fotosxcolumna = 5;
    var imagenes = 25;
    
    $scope.imagenes = [];

    this.$onInit = function(){
        $timeout(function() {
            AOS.init();
        });
        for(var k = 1; k <= imagenes; k++){
            $scope.imagenes.push(k);
        }
    };
    
    $scope.mostrarEnModal = function(imagen){
        $scope.$broadcast('myPhotoModalSlider:open', imagen - 1);
    };
}

angular.module('HorizontesApp').component('fotogaleria', {
    templateUrl: 'components/fotogaleria/fotogaleria.template.html',
    controller: ['$scope','$timeout',fotogaleriaController]
});

