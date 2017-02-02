angular.module('HorizontesApp', [
    'ngRoute',
    'ngAnimate',
    'ngTouch',
    'smoothScroll'
])
.config(function($interpolateProvider, $routeProvider){
    
    //Configuracion del enrutamiento
    $routeProvider.when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'homeController',
        activetab: 'home',
        css: 'css/home/home.css'
    });
    $routeProvider.when('/fotogaleria', {
        templateUrl: 'templates/fotogaleria.html',
        css: 'css/fotogaleria/fotogaleria.css',
        controller: 'fotogaleriaController',
        activetab: 'fotogaleria'
    });
    $routeProvider.when('/mapa', {
        templateUrl: 'templates/mapa.html',
        css: 'css/mapa/mapa.css',
        controller: 'mapaController',
        activetab: 'mapa'
    });
    $routeProvider.when('/servicios', {
        templateUrl: 'templates/servicios.html',
        css: 'css/servicios/servicios.css',
        controller: 'serviciosController',
        activetab: 'servicios'
    });
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
});
