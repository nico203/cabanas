function sliderController($scope, $timeout){
    var timeout = 6000;
    var promise = null;
    $scope.slides = [
        {image: 'img/1.jpg', description: 'Image 00'},
        {image: 'img/2.jpg', description: 'Image 01'},
        {image: 'img/3.jpg', description: 'Image 04'}
    ];
    $scope.direction = 'left';
    $scope.currentIndex = $scope.slides.lenght;
    
    $scope.iframeHeight = window.innerHeight * 97 / 100; //Seteo del height de las imagenes
    
    function setTimeOut() {
        $timeout.cancel(promise);
        promise = $timeout($scope.nextSlide, timeout);
    }
    
    $scope.setCurrentSlideIndex = function (index) {
        $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
        $scope.currentIndex = index;
        setTimeOut();
    };
    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };
    $scope.nextSlide = function () {
        $scope.direction = 'left';
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        setTimeOut();
    };
    $scope.prevSlide = function () {
        $scope.direction = 'right';
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        setTimeOut();
    };
    //Function que cancela el timeout una vez que se cambia de DOM
    $scope.$on('$destroy',function(event){
        $timeout.cancel(promise);
    });
}


angular.module('slider', []).component('slider', {
    templateUrl: 'modules/slider/slider.template.html',
    controller: ['$scope', '$timeout', sliderController]
})
.animation('.slide-animation', function () {
    return {
        beforeAddClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                var finishPoint = element.parent().width();
                if(scope.direction !== 'right') {
                    finishPoint = -finishPoint;
                }
                TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
            }
            else {
                done();
            }
        },
        removeClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                element.removeClass('ng-hide');

                var startPoint = element.parent().width();
                if(scope.direction === 'right') {
                    startPoint = -startPoint;
                }

                TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
            }
            else {
                done();
            }
        }
    };
});

