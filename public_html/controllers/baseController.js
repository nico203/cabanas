angular.module('HorizontesApp').controller('baseController', [
    '$rootScope', '$document', '$timeout', '$window',
    function($rootScope, $document, $timeout, $window){
    var promise, promise1;
    $rootScope.resaltarContacto = false;
    
    $rootScope.$on('$routeChangeSuccess', function(){
        $document.find('footer').css('opacity', '0');
    });
    $rootScope.$on('$routeChangeSuccess', function(){
        promise = $timeout(function(){
            $document.find('.fadeOnChangePage').css('position', 'relative');
            $document.find('footer').css('opacity', '1');
        }, 1000);
        promise1 = $timeout(function() {
            $window.scrollTo(0, 0);
        }, 250);
    });
    $rootScope.$on('$destroy', function(){
        $timeout.cancel(promise);
        $timeout.cancel(promise1);
    });
    angular.element($window).on('resize', function() {
        $rootScope.$broadcast('window:resize', $window.innerWidth);
    });
}]);
