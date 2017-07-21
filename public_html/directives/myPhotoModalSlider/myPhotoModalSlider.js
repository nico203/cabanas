angular.module('HorizontesApp').directive('myPhotoModalSlider',[
    '$document', '$window',
    function($document, $window){
    return {
        restrict: 'E',
        scope: {
            basePath: '@',
            showModal: '=',
            imageArray: '=',
            imageIndex: '='
        },
        link: function(scope, elem, attr){
            scope.path = '';
            scope.prevPic = function(){
                scope.imageIndex = (scope.imageIndex > 0) ? scope.imageIndex - 1 : scope.imageArray.length - 1;
            };
            scope.nextPic = function(){
                scope.imageIndex = (scope.imageIndex < scope.imageArray.length - 1) ? scope.imageIndex + 1 : 0;
            };
            scope.closeModal = function(){
                scope.showModal = false;
                elem.css('display','none');
                $document.find('body').css('overflow', 'auto');
            };
            scope.$watch(function(){
                return scope.imageIndex;
            }, function(value){
                if(typeof(scope.imageArray[value]) !== 'undefined') {
                    scope.path = scope.basePath + scope.imageArray[value];
                }
            });
            scope.$watch(function(){
                return scope.showModal;
            }, function(value){
                if(typeof(value) === 'undefined' || !value) return;
                elem.css({
                    'display':'block',
                    'height':$window.innerHeight+'px',
                    'top': $window.pageYOffset + 'px'
                });
                $document.find('body').css('overflow', 'hidden');
            }, true);
            angular.element($window).bind('resize', function(){
                elem.css({
                    'height':$window.innerHeight+'px',
                    'top': $window.pageYOffset + 'px'
                });
                scope.$digest();
            });
        },
        templateUrl: 'directives/templates/myPhotoModalSlider.html'
    };
}]);

