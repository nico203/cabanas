angular.module('HorizontesApp').directive('slider',[
    '$timeout',
    function($timeout) {
        return {
            restrict: 'E',
            link: function(scope, elem, attr) {
                elem.addClass('slider');
                var orbit = null;
                
                function init() {
                    orbit = new Foundation.Orbit(elem.find('.orbit'), {
                        'timerDelay': 1500,
                        'bullets': false,
                        'navButtons': false,
                        animInFromLeft: 'fade-in',
                        animInFromRight: 'fade-in',
                        animOutToLeft: 'fade-out',
                        animOutToRight: 'fade-out'
                    });
                }
                
                //init
                $timeout(function(){
                    init();
                });
                
                //destroy
                scope.$on('$destroy', function() {
                    if(orbit) {
                        orbit.$element.foundation('_destroy');
                        orbit = null;
                    }
                });
            },
            templateUrl: 'directives/slider/slider.template.html'
        };
    }
]);