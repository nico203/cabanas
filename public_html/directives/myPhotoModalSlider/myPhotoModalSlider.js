angular.module('HorizontesApp').directive('myPhotoModalSlider',[
    '$document', '$window', '$timeout',
    function($document, $window, $timeout){
    return {
        restrict: 'AE',
        scope: {
            basePath: '@',
            imageArray: '='
        },
        link: function(scope, elem, attr){
            var htmlElem = null;
            function init() {
                scope.path = '';
                scope.imageIndex = null;
                
                $timeout(function() {
                    htmlElem = elem.find('.reveal');
                    htmlElem.foundation();
                });
            }
            init();
            
            scope.$on('myPhotoModalSlider:open', function(e, imageIndex) {
                e.preventDefault();
                scope.imageIndex = imageIndex;
                htmlElem.foundation('open');
            });
            
            
            scope.prevPic = function(){
                scope.imageIndex = (scope.imageIndex > 0) ? scope.imageIndex - 1 : scope.imageArray.length - 1;
            };
            scope.nextPic = function(){
                scope.imageIndex = (scope.imageIndex < scope.imageArray.length - 1) ? scope.imageIndex + 1 : 0;
            };
          
            scope.$watch(function(){
                return scope.imageIndex;
            }, function(value){
                if(!angular.isUndefined(scope.imageArray[value])) {
                    scope.path = scope.basePath + scope.imageArray[value];
                }
            });
            
//            angular.element($window).bind('resize', function(){
//                elem.css({
//                    'height':$window.innerHeight+'px',
//                    'top': $window.pageYOffset + 'px'
//                });
//                scope.$digest();
//            });
        },
        templateUrl: 'directives/myPhotoModalSlider/myPhotoModalSlider.html'
    };
}]);

