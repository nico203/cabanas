angular.module('HorizontesApp').directive("hideOnScroll", function ($window, $document) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            angular.element($window).bind("scroll", function() {
                if(typeof(element.offsetYAxis) === 'undefined'){
                    element.offsetYAxis = this.pageYOffset;
                }
                var direction = (this.pageYOffset < element.offsetYAxis) ? 'up' : 'down';
                var offset = 360; //Visibilidad en pixeles
                var toleranceUp = 20;
                var toleranceDown = 4;

                if(element.offsetYAxis < offset){
                    scope.boolChangeClass = false; //mostrar elemento
                } else {
                    if(direction === 'up' && Math.abs(element.offsetYAxis - this.pageYOffset) >= toleranceUp){ 
                        //mostrar elemento
                        scope.boolChangeClass = false;
                    }
                    if(direction === 'down' && Math.abs(element.offsetYAxis - this.pageYOffset) >= toleranceDown){ 
                        //ocultar elemento
                        scope.boolChangeClass = true;
                    }
                }
                element.offsetYAxis = this.pageYOffset;
                scope.$apply();
            });
        }
    };
});
