angular.module('HorizontesApp', [
    'ngRoute',
    'ngAnimate',
    'ngTouch',
    'smoothScroll',
    'slider'
])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('!');
    //Configuracion del enrutamiento
    $routeProvider.when('/home', {
        template: '<home></home>',
        activetab: 'home',
        css: 'components/home/home.css'
    });
    $routeProvider.when('/fotogaleria', {
        template: '<fotogaleria></fotogaleria>',
        css: 'components/fotogaleria/fotogaleria.css',
        activetab: 'fotogaleria'
    });
    $routeProvider.when('/mapa', {
        template: '<mapa></mapa>',
        css: 'components/mapa/mapa.css',
        activetab: 'mapa'
    });
    $routeProvider.when('/servicios', {
        template: '<servicios></servicios>',
        css: 'components/servicios/servicios.css',
        activetab: 'servicios'
    });
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);
