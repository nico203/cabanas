angular.module('HorizontesApp').provider('windowResize', function() {
    var windowMinSizes = {
        medium: 640,
        large: 1024
    };
    
    this.setWindowMinSizes = function(val) {
        windowMinSizes = val;
    };
    
    this.$get = [
        '$rootScope', '$window', '$timeout', function($rootScope,$window, $timeout) {
            //Pantalla actual
            var currentViewport = null;
            
            //Primero vemos que tamaño tiene la pantalla al cargar la pagina
            var calcViewport = function(width) {
                console.log('width',width);
                var size = 'small';
                if(width > windowMinSizes.medium) {
                    size = 'medium';
                }
                if(width > windowMinSizes.large) {
                    size = 'large';
                }
                if(currentViewport !== size) {
                    console.log(currentViewport, size);
                    currentViewport = size;
                    $rootScope.$broadcast('viewportChange', size);
                }
            };
            
            angular.element($window).on('resize', function() {
                calcViewport($window.innerWidth);
            });
            
            return {
                init:  function() {
                    //se pone el timeout para terminar el ciclo $digest
                    $timeout(function() {
                        calcViewport($window.innerWidth);
                    }, 100);
                },
                //al iniciar cada componente deberia llamar a este metodo para elegir el comportamiento segun 
                //la el tipo de pantalla del dispositivo
                getCurrentViweport: function() {
                    return currentViewport;
                }
            };
        }
    ];
});