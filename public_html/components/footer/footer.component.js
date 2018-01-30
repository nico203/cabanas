function footerController($scope, $timeout) {
    $scope.iconos = [false, false];

    $scope.clickIcono = function (icono) {
        $scope.iconos[icono] = !$scope.iconos[icono];
    };
    
    this.$onInit = function() {
        $timeout(function() {
            AOS.init();
        });
    };
}

angular.module('HorizontesApp').component('appFooter', {
    templateUrl: 'components/footer/footer.template.html',
    controller: ['$scope','$timeout',footerController]
});