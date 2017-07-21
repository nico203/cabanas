function serviciosController($scope, $timeout, $window){
    
    $scope.init = function(){
        console.log('config');
    };
}


angular.module('HorizontesApp').component('servicios', {
    templateUrl: 'components/servicios/servicios.template.html',
    controller: ['$scope','$timeout','$window',serviciosController]
});
