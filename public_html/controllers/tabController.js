angular.module('HorizontesApp').controller('tabController', [
    '$rootScope', '$scope', '$route', '$timeout', 'smoothScroll',
    function($rootScope, $scope, $route, $timeout, smoothScroll){
    $scope.$route = $route;
    $scope.mostrarContacto = false;
    $scope.show = [false, false, false];
    $scope.iconos = [false, false];
    var bool = true;
    var timer;
    
    function toggle(index, hide) {
        if(index === $scope.show.length){
            if(hide) {
                $scope.mostrarContacto = false;
            }
            return;
        }
        $scope.show[index] = !$scope.show[index];
        $timeout(function(){
            toggle(index + 1, hide);
        },200);
    }
    
    $scope.clickContacto = function() {
        $scope.mostrarContacto = true;
        toggle(0, false);
        timer = $timeout(function() {
            for(var i = 0; i < $scope.iconos.length; i++) {
                $scope.iconos[i] = false;
            }
            toggle(0, true);
        }, 10000);
    };
    
    $scope.clickIcono = function(icono) {
        $scope.iconos[icono] = !$scope.iconos[icono];
        $timeout.cancel(timer);
        timer = $timeout(function() {
            for(var i = 0; i < $scope.iconos.length; i++) {
                $scope.iconos[i] = false;
            }
            toggle(0, true);
        }, 10000);
    };
    
    $scope.scrollToBottom = function() {
        console.log('clicked');
        
        $timeout(function(){
            $rootScope.resaltarContacto = true;
            $timeout(function(){
                $rootScope.resaltarContacto = false;
            }, 1000);
        },1);
    };
}]);
