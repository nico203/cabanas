function footerController($scope, $route) {
    $scope.iconos = [false, false];

    $scope.clickIcono = function (icono) {
        $scope.iconos[icono] = !$scope.iconos[icono];
    };
}

angular.module('HorizontesApp').component('appFooter', {
    templateUrl: 'components/footer/footer.template.html',
    controller: ['$scope','$route',footerController]
});