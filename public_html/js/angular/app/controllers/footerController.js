angular.module('HorizontesApp').controller('footerController', function($scope, $route){
    $scope.iconos = [false, false];
    
    $scope.clickIcono = function(icono) {
        $scope.iconos[icono] = !$scope.iconos[icono];
    };
});
