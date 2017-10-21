angular.module('HorizontesApp').directive('logo',[
    '$timeout',
    function($timeout) {
        return {
            restrict: 'E',
            link: function(scope, elem, attr) {
                elem.addClass('logo');
                var nav = (typeof (attr.nav) !== 'undefined');
                if(nav) {
                    elem.addClass('nav');
                }
                scope.inicializar = false;
                
                var destroyEventMostrar = scope.$on('logo:mostrar', function() {
                    scope.inicializar = true;
                });
                
                var destroyEventOcultar = scope.$on('logo:ocultar', function() {
                    
                });
                
                var destroyEventDestroy = scope.$on('$destroy', function() {
                    destroyEventDestroy();
                    destroyEventMostrar();
                    destroyEventOcultar();
                });
            },
            templateUrl: 'directives/logo/logo.template.html'
        };
    }
]);