angular.module('HorizontesApp', [
    'ngRoute',
    'ngAnimate'
])
.config([
    '$routeProvider', '$locationProvider', 'windowResizeProvider', 
    function($routeProvider, $locationProvider, windowResizeProvider){
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
        
        //Ancho en pixeles
        windowResizeProvider.setWindowMinSizes({
            medium: 640,
            large: 1024
        });
    }
]).run([
    'windowResize',
    function (windowResize) {
        windowResize.init();
    }
]);
;angular.module('HorizontesApp').animation('.fadeOnChangePage', function() {
    return {
        enter: function(element, done) {
            element.css('position', 'absolute');
            element.css('opacity', 0);
            jQuery(element).animate({
                opacity: 1
            }, done);
            return function(isCancelled) {
                if(isCancelled) {
                    jQuery(element).stop();
                }
            };
        },
        leave: function(element, done) {
            element.css('opacity', 1);
            jQuery(element).animate({
                opacity: 0
            }, done);
            return function(isCancelled) {
                if(isCancelled) {
                    jQuery(element).stop();
                }
            };
        }
    };
});


;/**
 * Por cualquier cosa que no ande el smooth scroll aca esta el de foundation
 * http://foundation.zurb.com/sites/docs/smooth-scroll.html
 */

function contactoController() {
    
}

angular.module('HorizontesApp').component('contacto', {
    templateUrl: 'components/contacto/contacto.template.html',
    controller: [contactoController]
});;function footerController($scope, $timeout) {
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
});;/**
 * Ver como setear las imagenes alineadas con este plugin
 * http://foundation.zurb.com/sites/docs/equalizer.html
 */

function fotogaleriaController($scope, $timeout){
    var fotosxcolumna = 5;
    var imagenes = 25;
    
    $scope.imagenes = [];

    this.$onInit = function(){
        $timeout(function() {
            AOS.init();
        });
        for(var k = 1; k <= imagenes; k++){
            $scope.imagenes.push(k);
        }
    };
    
    $scope.mostrarEnModal = function(imagen){
        $scope.$broadcast('myPhotoModalSlider:open', imagen - 1);
    };
}

angular.module('HorizontesApp').component('fotogaleria', {
    templateUrl: 'components/fotogaleria/fotogaleria.template.html',
    controller: ['$scope','$timeout',fotogaleriaController]
});

;/**
 * Hacer un provider con la api del mapa en vez de cargarlo como script en el index
 * 
 * ver para cargar dinamicamente las imagenes y el slider
 *  http://foundation.zurb.com/sites/docs/interchange.html
 *  
 *  
 *  ver de reemplazar el carousel con este
 *  http://foundation.zurb.com/sites/docs/orbit.html
 *  
 *  
 */

function homeController($scope, $timeout, windowResize){
    var MAIL = 'horizontedecalamuchita@gmail.com';
    var TELEFONO1 = '(03546) 15455479';
    var TELEFONO2 = '(03546) 15431194';
    
    $scope.top_topBoard = (window.innerHeight * 97 / 200) - 113; //Seteo del height de las imagenes
    $scope.loadClassBoard = false;
    $scope.index = 1;
    $scope.currentViewport = null;
    $scope.contactoActual = null;
    $scope.servicios = [
        {imagen:'swimm.png', nombre: 'Piscina'},
        {imagen:'wifi.png', nombre: 'Wi-Fi'},
        {imagen:'tv.png', nombre: 'TV'},
        {imagen:'cochera.png', nombre: 'Cochera Individual'},
        {imagen:'parrilla.png', nombre: 'Parrilla Cubierta'},
        {imagen:'microondas.png', nombre: 'Microondas'}
    ];
    
    $scope.init = function() {
        $timeout(function(){
            $scope.loadClassBoard = true;
        }, 1);
    };
    
    this.$onInit = function() {
        $timeout(function(){
            $('#fullpage').fullpage({
                onLeave: function(index, nextIndex, direction){
                    $scope.$apply(function() {
                        $scope.index = nextIndex;
                    });
                }
            });
            
            $scope.currentViewport = windowResize.getCurrentViweport();
        });
    };
    
    $scope.moverASeccion = function(index, mover) {
        $scope.index = index;
        $timeout(function(){
            $.fn.fullpage.moveTo(index);
        });
    };
    
    $scope.cambiarContacto = function(contacto) {
        if(contacto === 'fb') {
            $scope.contactoActual = null;
        } else if (contacto === 'mail') {
            $scope.contactoActual = MAIL;
        } else if (contacto === 'tel1') {
            $scope.contactoActual = TELEFONO1;
        } else {
            $scope.contactoActual = TELEFONO2;
        }
    };
    
    var destroyViewportChangeListener = $scope.$on('viewportChange', function(e, size) {
        $scope.currentViewport = size;
    });
    
    this.$onDestroy = function() {
        $.fn.fullpage.destroy('all');
        destroyViewportChangeListener();
    };
}

angular.module('HorizontesApp').component('home', {
    templateUrl: 'components/home/home.template.html',
    controller: ['$scope','$timeout','windowResize',homeController]
});;/**
 * ver para cargar dinamicamente el mapa con enfoque responsivo
 *  http://foundation.zurb.com/sites/docs/interchange.html
 *  http://foundation.zurb.com/sites/docs/responsive-embed.html
 *  
 *  
 */

function mapaController($scope, $timeout){

    function cargarMapa (){
        $timeout(function(){
            try {
                //Overlay
                var TxtOverlay = function (pos, txt, cls, map) {
                    this.pos = pos;
                    this.txt_ = txt;
                    this.cls_ = cls;
                    this.map_ = map;
                    this.div_ = null;
                    this.setMap(map);
                };
                
                TxtOverlay.prototype = new google.maps.OverlayView();
                TxtOverlay.prototype.onAdd = function() {
                    var div = document.createElement('DIV');
                    div.className = this.cls_;
                    div.innerHTML = this.txt_;
                    this.div_ = div;
                    var overlayProjection = this.getProjection();
                    var position = overlayProjection.fromLatLngToDivPixel(this.pos);
                    div.style.left = position.x + 'px';
                    div.style.top = position.y + 'px';
                    var panes = this.getPanes();
                    panes.floatPane.appendChild(div);
                };
                TxtOverlay.prototype.draw = function() {
                    var overlayProjection = this.getProjection();
                    var position = overlayProjection.fromLatLngToDivPixel(this.pos);
                    var div = this.div_;
                    div.style.left = position.x + 'px';
                    div.style.top = position.y + 'px';
                };

                var map = new google.maps.Map(document.getElementById('mapa'), {
                    center: {lat: -32.0613844, lng: -64.5862298},
                    zoom: 16
                });
                var latlng = new google.maps.LatLng(-32.059189, -64.5854292);
                var marker = new google.maps.Marker({
                    position: latlng,
                    animation: google.maps.Animation.BOUNCE
                });
                marker.setMap(map);
                var txt = new TxtOverlay(latlng, 'Horizonte de Calamuchita', "overlaytext", map);
                
                
                //Servicios del sitio
                var infowindow = new google.maps.InfoWindow({
                    content: "<div class='container'>" +
                            "<div class='row'>Cabañas Horizonte de Calamuchita</div>" + 
                            "</div>"
                });
                var service = new google.maps.places.PlacesService(map);
                service.getDetails({
                    placeId: 'ChIJ6RekLq670pURm-hMff2-PPM'
                }, function(place, status){
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        infowindow.setContent("<div class='container' id='infowindow'>" +
                            "<div class='row titulo'>Cabañas Horizonte de Calamuchita</div>" + 
                            "<div class='row'><a target='_blank' href='"+ place.url +"'>Ver en Google Maps</a>" +
                            "</div>");
                    }
                });
                
                google.maps.event.addListener(marker,'click',function() {
                    //map.setZoom(16);
                    //map.setCenter(marker.getPosition());
                    infowindow.open(map,marker);
                    //map.panTo(marker.getPosition());
                });
                
                var mainDiv = document.createElement('div');
                mainDiv.style.padding = '10px';
                var boton = document.createElement('div');
                //boton.className = 'boton-control-mapa';
                boton.className = 'gm-style-mtc';
                boton.title = 'Set map to London';
                mainDiv.appendChild(boton);
                var texto = document.createElement('div');
                texto.className = 'texto-control-mapa';
                texto.innerHTML = 'Volver a Horizonte de Calamuchita';
                boton.appendChild(texto);

                google.maps.event.addDomListener(boton, 'click', function() {
                    map.panTo(marker.getPosition());
                    map.setCenter(marker.getPosition());
                });
                map.controls[google.maps.ControlPosition.TOP_RIGHT].push(mainDiv);
            } catch (err) {
                $scope.indice = (($scope.indice < 5) ? $scope.indice + 1 : 1);
                cargarMapa();
            }
        });
    }
    
    $scope.indice = 0;
    
    this.$onInit = function(){
        cargarMapa();
        $timeout(function() {
            AOS.init();
        });
    };
}

angular.module('HorizontesApp').component('mapa', {
    templateUrl: 'components/mapa/mapa.template.html',
    controller: ['$scope','$timeout',mapaController]
});
;/**
 * Se usa este componente Foundation
 * http://foundation.zurb.com/sites/docs/off-canvas.html
 * 
 * La imagen debe quedar arriba del todo como titulo y la navegacion en forma vertical abajo
 * Poner un boton con la hamburguesa (3 linitas) en la esquina superior izquierda como la aplicacion GoPro
 */

function navigationController($window,$scope, $timeout, $animate, $location){
    $scope.exclude = ['home'];
    $scope.offCanvas = null;
    
    //Funciones que permiten el mapeo de la vista actual al menu para ponerle la clase "active"
    $scope.rutaActual = 'inicio';
    $scope.cambioRutaActual = function(ruta) {
        $scope.rutaActual = ruta;
    };
    
    //Evento accionado al presionar en la hamburguesa
    $scope.openCanvas = function() {
        $('#offCanvas').foundation('open');
    };
    
    //Al iniciar el componente se calcula el tipo de pantalla y se muestra la navegacion acorde
    this.$onInit = function() {
        $timeout(function() {
            $scope.rutaActual = $location.path().substring(1);
            if($scope.offCanvas === null) {
                $scope.offCanvas = new Foundation.OffCanvas($('#offCanvas'), {
                    transition: 'push'
                });
                //ver de colocar todo en un solo documento para ver cual es el error
//                $(document).foundation();
            }
        });
    };
    
    $scope.$on('$routeChangeSuccess', function(e) {
        $timeout(function() {
            $('#offCanvas').foundation('close');
        },1200);
    });
    
    $scope.$on('$destroy', function() {
        $('#offCanvas').foundation('_destroy');
        $scope.offCanvas = null;
    });

}

angular.module('HorizontesApp').component('appNavigation', {
    templateUrl: 'components/navigation/navigation.template.html',
    controller: ['$window','$scope', '$timeout', '$animate', '$location', navigationController]
});
;angular.module('HorizontesApp').component('servicios', {
    templateUrl: 'components/servicios/servicios.template.html',
    controller: [
        '$timeout',
        function ($timeout) {
    
            this.$onInit = function(){
                $timeout(function(){
                    AOS.init();
                });
            };
        }
    ]
});
;angular.module('HorizontesApp').controller('baseController', [
    '$rootScope', '$document', '$timeout', '$window',
    function($rootScope, $document, $timeout, $window){
    var promise, promise1;
    $rootScope.resaltarContacto = false;
    
    $rootScope.$on('$routeChangeSuccess', function(){
        $document.find('footer').css('opacity', '0');
    });
    $rootScope.$on('$routeChangeSuccess', function(){
        promise = $timeout(function(){
            $document.find('.fadeOnChangePage').css('position', 'relative');
            $document.find('footer').css('opacity', '1');
        }, 1000);
        promise1 = $timeout(function() {
            $window.scrollTo(0, 0);
        }, 250);
    });
    $rootScope.$on('$destroy', function(){
        $timeout.cancel(promise);
        $timeout.cancel(promise1);
    });
    
}]);
;angular.module('HorizontesApp').directive('hamburger', [
    '$timeout',
    function ($timeout) {
        return {
            restrict: 'AE',
            link: function (scope, elem, attr) {
                elem.addClass('hambruger-wrapper');
                
                var toggleClickElement = function() {
                    $('#hamburger-icon').toggleClass('active');
                    return false;
                };
                
                elem.on('click', toggleClickElement);
                $(document).on('closed.zf.offcanvas', toggleClickElement);
                
                scope.$on('$destroy', function() {
                    $(document).off('closed.zf.offcanvas', toggleClickElement);
                    elem.off('click', toggleClickElement);
                });
            },
            templateUrl: 'directives/hamburger/hamburger.template.html'
        };
    }
]);;angular.module('HorizontesApp').directive("hideOnScroll", [
    '$window', '$document',
    function ($window, $document) {
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
}]);
;angular.module('HorizontesApp').directive('logo',[
    '$timeout',
    function($timeout) {
        return {
            restrict: 'E',
            link: function(scope, elem, attr) {
                elem.addClass('logo');
                var nav = (typeof (attr.nav) !== 'undefined');
                if(nav) {
                    elem.addClass('nav');
                }
                scope.inicializar = false;
                
                var destroyEventMostrar = scope.$on('logo:mostrar', function() {
                    scope.inicializar = true;
                });
                
                var destroyEventOcultar = scope.$on('logo:ocultar', function() {
                    
                });
                
                var destroyEventDestroy = scope.$on('$destroy', function() {
                    destroyEventDestroy();
                    destroyEventMostrar();
                    destroyEventOcultar();
                });
            },
            templateUrl: 'directives/logo/logo.template.html'
        };
    }
]);;angular.module('HorizontesApp').directive('myPhotoModalSlider',[
    '$timeout',
    function($timeout){
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
                    scope.path = scope.basePath + scope.imageArray[value] + '.jpg';
                }
            });
        },
        templateUrl: 'directives/myPhotoModalSlider/myPhotoModalSlider.html'
    };
}]);

;angular.module('HorizontesApp').directive('slider',[
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
]);;;function sliderController($scope, $timeout){
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

;angular.module('HorizontesApp').provider('windowResize', function() {
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
                var size = 'small';
                if(width > windowMinSizes.medium) {
                    size = 'medium';
                }
                if(width > windowMinSizes.large) {
                    size = 'large';
                }
                if(currentViewport !== size) {
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
});;angular.module('HorizontesApp').run(['$templateCache', function ($templateCache) {
  $templateCache.put("components/contacto/contacto.template.html",
    "");
  $templateCache.put("components/footer/footer.template.html",
    "<footer id=footer><div class=\"row column row-footer\"><div class=icono-container ng-class=\"{'resaltar-contacto':resaltarContacto}\"><span class=texto data-aos=fade-zoom-in>Contacto</span><div class=\"icono-footer telefono _1\" ng-class=\"{'activo':iconos[0]}\" data-aos=fade-zoom-in><a href=tel:+543546455479 class=icono ng-click=clickIcono(0)></a><div class=texto><u>Tel:</u>(03546) 15455479</div></div><div class=\"icono-footer telefono _2\" ng-class=\"{'activo':iconos[1]}\" data-aos=fade-zoom-in><a href=tel:+543546431194 class=icono ng-click=clickIcono(1)></a><div class=texto><u>Tel:</u>(03546) 15431194</div></div><div class=\"icono-footer mail\" ng-class=\"{'activo':iconos[2]}\" data-aos=fade-zoom-in><a href=mailto:horizontedecalamuchita@gmail.com class=icono ng-click=clickIcono(2)></a><div class=texto>horizontedecalamuchita@gmail.com</div></div><div class=\"icono-footer facebook\" data-aos=fade-zoom-in><a href=https://www.facebook.com/HorizontedeCalamuchita/ class=icono target=_blank></a></div></div></div><div class=\"row column expanded row-footer text-center last-footer\"><span>Horizonte de Calamuchita | Federico Leluar y Juan de Dios Filiberto - Santa Mónica - Santa Rosa de Calamuchita - Córdoba - Argentina</span></div></footer>");
  $templateCache.put("components/fotogaleria/fotogaleria.template.html",
    "<div class=_c><div class=\"top top-fotogaleria\"><h1>Tu Lugar</h1><p>Paz, descanso y relajación absoluta.</p></div><div class=content><div class=\"row column\"><div class=\"row column\"><div class=\"row column\"><div class=title data-aos=fade-up><h1>Nuestras Cabañas</h1></div></div><p class=\"row column texto-row\" data-aos=fade-up>A continuación verás una serie de imágenes. Haz click en una imagen para agrandarla.</p><p class=\"row column texto-row\" data-aos=fade-up>Usa las flechas que aparecen en los costados para navegar por las imágenes disponibles.</p></div><div class=\"row column\"><div class=\"row small-up-2 medium-up-3 large-up-5\"><div ng-repeat=\"imagen in imagenes\" class=\"column column-block\"><div class=foto data-aos=fade-up><img ng-src=img/fotogaleria/min/{{imagen}}.jpg ng-click=mostrarEnModal(imagen)></div></div></div></div></div><div my-photo-modal-slider base-path=img/fotogaleria/max/ image-array=imagenes></div></div></div><app-footer></app-footer>");
  $templateCache.put("components/home/home.template.html",
    "<div id=menu-fp><ul><li ng-class=\"{'active':index === 1}\"><a ng-click=moverASeccion(1)></a></li><li ng-class=\"{'active':index === 2}\"><a ng-click=moverASeccion(2)></a></li><li ng-class=\"{'active':index === 3}\"><a ng-click=moverASeccion(3)></a></li><li ng-class=\"{'active':index === 4}\"><a ng-click=moverASeccion(4)></a></li><li ng-class=\"{'active':index === 5}\"><a ng-click=moverASeccion(5)></a></li></ul></div><div class=content id=fullpage><div class=section id=slider><slider></slider><logo></logo></div><div class=section id=bienvenido><div class=grid-container><div class=\"grid-x grid-margin-x\"><div class=\"medium-10 medium-offset-1 large-8 large-offset-2 cell title animated animate-1\" ng-class=\"{'fadeInUp':index === 2}\"><h1>Bienvenidos</h1></div><p class=\"medium-10 medium-offset-1 large-8 large-offset-2 cell animated animate-2\" ng-class=\"{'fadeIn':index === 2}\">Horizonte de Calamuchita, es un complejo de cabañas en el barrio Santa Mónica de Santa Rosa de Calamuchita, Córdoba, que ofrece un perfecto lugar de descanso, naturaleza absoluta, sierras y río.</p></div></div></div><div class=section id=nuestras_cabanas><div class=grid-container><div class=\"grid-x grid-margin-x\"><div class=\"cell medium-10 medium-offset-1 large-8 large-offset-2\"><div class=grid-x ng-class=\"{'grid-padding-x':currentViewport !== 'small'}\"><div class=\"cell auto align-center\"><div class=grid-x><div class=\"cell title animated animate-1\" ng-class=\"{'fadeInUp':index === 3}\"><h1>Nuestras Cabañas</h1></div><p class=\"cell text animated animate-2\" ng-class=\"{'fadeIn':index === 3}\">Con una ubicación privilegiada, con vista hacia el Cerro Champaquí, es el lugar perfecto para romper la rutina y relajarse.</p><a href=#/fotogaleria class=\"cell button animated animate-6\" ng-class=\"{'fadeIn':index === 3}\">Ver más</a></div></div><div ng-if=\"currentViewport !== 'small'\" class=\"cell shrink\"><div class=grid-y><div class=\"cell cuadro animated animate-3\" ng-class=\"{'fadeInRight':index === 3}\"><a href=#/fotogaleria><img src=img/home/1.jpg alt=\"\"></a><div><div>Río Santa Rosa</div><div>El complejo se encuentra a 250 mts del Río Santa Rosa.</div><a href=#/fotogaleria>Ver Más >></a></div></div><div class=\"cell cuadro animated animate-4\" ng-class=\"{'fadeInRight':index === 3}\"><a href=#/fotogaleria><img src=img/home/2.jpg alt=\"\"></a><div><div>Horizonte</div><div>Una ubicación privilegiada, que te dará una vista que te maravillará.</div><a href=#/fotogaleria>Ver Más >></a></div></div><div class=\"cell cuadro animated animate-5\" ng-class=\"{'fadeInRight':index === 3}\"><a href=#/fotogaleria><img src=img/home/3.jpg alt=\"\"></a><div><div>Cabañas de troncos</div><div>Construídas con madera y cemento, son frescas en verano y acogedoras en invierno.</div></div></div></div></div></div></div></div></div></div><div class=\"section blurred\" id=servicios><div class=grid-container><div class=\"grid-x grid-margin-x\"><div class=\"cell medium-10 medium-offset-1 large-8 large-offset-2\"><div class=grid-x><div class=\"cell title animated animate-1\" ng-class=\"{'fadeInUp':index === 4}\"><h1>Servicios</h1></div><p class=\"cell text animated animate-2\" ng-class=\"{'fadeIn':index === 4}\">Cada cabaña cuenta con dos dormitorios, uno matrimonial en planta baja y otro en planta alta, con cuchetas. Además, están equipadas con todo lo que necesitás para sentirte como en casa.</p><div class=cell ng-if=\"currentViewport !== 'small'\"><div class=\"grid-x grid-margin-x small-up-3 medium-up-6 large-up-6 servicios\"><div ng-repeat=\"x in servicios\" class=\"cell item-servicio animated animate-{{$index + 2}}\" ng-class=\"{'fadeInUp':index === 4}\"><img ng-src=img/servicios/ico/{{x.imagen}}><p>{{x.nombre}}</p></div></div></div><a href=#/servicios class=\"button cell animated animate-8\" ng-class=\"{'fadeIn':index === 4}\">Ver más</a></div></div></div></div></div><div class=section id=contacto><div class=\"grid-container margin full-height\"><div class=\"grid-x grid-margin-x full-height\"><div class=\"cell medium-10 medium-offset-1 large-8 large-offset-2\"><div class=\"grid-y full-height\" ng-class=\"{'grid-padding-y':currentViewport !== 'small'}\"><div class=\"cell auto align-center\"><div class=grid-y><div class=cell><a href=https://www.facebook.com/HorizontedeCalamuchita/ class=\"icono facebook\" ng-click=\"cambiarContacto('fb')\" target=_blank></a><a href=mailto:horizontedecalamuchita@gmail.com class=\"icono mail\" ng-click=\"cambiarContacto('mail')\"></a><a href=tel:+543546455479 class=\"icono telefono _1\" ng-click=\"cambiarContacto('tel1')\"></a><a href=tel:+543546431194 class=\"icono telefono _2\" ng-click=\"cambiarContacto('tel2')\"></a></div><div class=\"cell mostrar-contacto\" ng-bind=contactoActual></div></div></div><div class=\"cell shrink texto-fondo\">Horizonte de Calamuchita | Federico Leluar y Juan de Dios Filiberto - Santa Mónica - Santa Rosa de Calamuchita - Córdoba - Argentina</div></div></div></div></div></div></div>");
  $templateCache.put("components/home/home.template_1.html",
    "<div ng-init=init() class=_c><div id=topboard ng-style=\"{top: top_topBoard + 'px'}\"><span ng-class=\"{'visible': loadClassBoard === true}\"></span></div><div class=content><div class=section><div class=content-section><div class=title><h1>Bienvenidos</h1></div><p>Horizonte de Calamuchita, es un complejo de cabañas en el barrio Santa Mónica de Santa Rosa de Calamuchita, Córdoba, que ofrece un perfecto lugar de descanso, naturaleza absoluta, sierras y río.</p></div></div><div class=\"bg-img _1\"></div><div class=section><div class=content-section><div class=title><h1>Nuestras Cabañas</h1></div><p class=text>Con una ubicación privilegiada, con vista hacia el Cerro Champaquí, es el lugar perfecto para romper la rutina y relajarse.</p><div class=container><div class=row><div class=\"col-3 cuadro\"><a href=#/fotogaleria><img src=img/1.jpg alt=\"\"></a><div><div>Río Santa Rosa</div><div>El complejo se encuentra a 250 mts del Río Santa Rosa.</div><a href=#/fotogaleria>Ver Más >></a></div></div><div class=\"col-3 cuadro\"><a href=#/fotogaleria><img src=img/2.jpg alt=\"\"></a><div><div>Horizonte</div><div>Una ubicación privilegiada, que te dará una vista que te maravillará.</div><a href=#/fotogaleria>Ver Más >></a></div></div><div class=\"col-3 cuadro\"><a href=#/fotogaleria><img src=img/3.jpg alt=\"\"></a><div><div>Cabañas de troncos</div><div>Construídas con madera y cemento, son frescas en verano y acogedoras en invierno.</div><a href=#/fotogaleria>Ver Más >></a></div></div></div><div class=row><a href=#/fotogaleria class=link>Ver más</a></div></div></div></div><div class=\"bg-img _3\"></div><div class=section><div class=content-section><div class=title><h1>Servicios</h1></div><p class=text>Cada cabaña cuenta con dos dormitorios, uno matrimonial en planta baja y otro en planta alta, con cuchetas. Además, están equipadas con todo lo que necesitás para sentirte como en casa.</p><div class=container><div class=row><div class=servicios><div class=item-servicio ng-repeat=\"x in servicios\"><img ng-src=img/servicios/ico/{{x.imagen}}><p>{{x.nombre}}</p></div></div></div><div class=row><a href=#/servicios class=link>Ver más</a></div></div></div></div></div></div>");
  $templateCache.put("components/mapa/mapa.template.html",
    "<div class=_c><div class=\"top top-mapa\"></div><div class=content><div class=\"row column\"><div class=\"row column\"><div class=title data-aos=fade-up><h1>¿Cómo Llegar?</h1></div></div><p class=\"row column texto-row\" data-aos=fade-up>A continuación se muestra un mapa en el cual verás la ubicación del complejo.</p><p class=\"row column texto-row\" data-aos=fade-up>Si el mapa no carga, puedes consultarlo aquí:<a href=\"https://maps.google.com/?cid=17527093845757323419\" target=_blank>Ver en Google Maps</a></p></div><div class=\"row column\" data-aos=fade-up><div class=mapa-container><div class=texto><p>Cargando mapa. Por favor, espere.</p><div class=puntos><span class=punto ng-show=\"1 === indice\"></span><span class=punto ng-show=\"2 === indice\"></span><span class=punto ng-show=\"3 === indice\"></span><span class=punto ng-show=\"4 === indice\"></span></div></div><div id=mapa></div></div></div></div></div><app-footer></app-footer>");
  $templateCache.put("components/navigation/navigation.template.html",
    "<header><div hamburger ng-click=openCanvas()></div><div id=offCanvas class=\"off-canvas position-left\" data-off-canvas><div class=\"logo-wrapper animated\"><logo nav></logo></div><ul class=\"vertical tabs\"><li class=\"tabs-title animated\" ng-class=\"{'active': rutaActual === 'inicio'}\" ng-click=\"cambioRutaActual('inicio')\"><a href=#!/home>Inicio</a></li><li class=\"tabs-title animated\" ng-class=\"{'active': rutaActual === 'fotogaleria'}\" ng-click=\"cambioRutaActual('fotogaleria')\"><a href=#!/fotogaleria>Fotogalería</a></li><li class=\"tabs-title animated\" ng-class=\"{'active': rutaActual === 'servicios'}\" ng-click=\"cambioRutaActual('servicios')\"><a href=#!/servicios>Servicios</a></li><li class=\"tabs-title animated\" ng-class=\"{'active': rutaActual === 'mapa'}\" ng-click=\"cambioRutaActual('mapa')\"><a href=#!/mapa>Mapa</a></li></ul></div></header>");
  $templateCache.put("components/navigation/navigation.template_1.html",
    "<header hide-on-scroll ng-class=\"{'ocultar': boolChangeClass, 'transparente': boolTransparent}\"><div ng-show=smallSize ng-click=\"\" class=hamburger data-toggle=offCanvas></div><div class=\"off-canvas position-left\" id=offCanvas data-off-canvas></div><div ng-hide=smallSize class=background><div class=attach><div ng-if=showLogo class=nav_logo><img src=img/nav-logo.png></div><nav ng-style=positionNav id=primary_nav ng-controller=tabController><ul><li ng-class=\"{'active': $route.current.activetab === 'home'}\"><a href=#/home>Home</a></li><li ng-class=\"{'active': $route.current.activetab == 'fotogaleria'}\"><a href=#/fotogaleria>Fotogalería</a></li><li ng-class=\"{'active': $route.current.activetab == 'servicios'}\"><a href=#/servicios>Servicios</a></li><li ng-class=\"{'active': $route.current.activetab == 'mapa'}\"><a href=#/mapa>Mapa</a></li><li><a style=cursor:pointer scroll-to=footer duration=1500 callback-after=scrollToBottom>Contacto</a><div class=\"icono-container contacto\" ng-show=mostrarContacto><div class=\"icono-footer telefono\" ng-class=\"{'activo':iconos[0], 'show':show[0]}\"><span class=icono ng-click=clickIcono(0)></span><div class=texto><u>Tel:</u>123456789</div></div><div class=\"icono-footer mail\" ng-class=\"{'activo':iconos[1], 'show':show[1]}\"><span class=icono ng-click=clickIcono(1)></span><div class=texto>contacto@contacto.com</div></div><div class=\"icono-footer facebook\" ng-class=\"{'show':show[2]}\"><a href=https://www.facebook.com/HorizontedeCalamuchita/ class=icono target=_blank></a></div></div></li></ul></nav></div></div></header>");
  $templateCache.put("components/servicios/servicios.template.html",
    "<div class=_c><div class=\"top top-servicios\"><h1>Vení, conocenos</h1><p>La aventura te espera.</p></div><div class=content><div class=\"row column\"><div class=title><h1>Nuestros servicios</h1></div></div><div class=\"row column expanded servicio\" data-aos=fade-up><div class=\"row align-middle\"><div class=\"columns small-12 medium-8 medium-push-4 _left\"><div class=\"row column\"><h1>Piscina</h1></div><div class=\"row column\"><p style=margin-bottom:20px>Contamos con una pileta recreativa.</p><p style=color:red><b><u>Nota</u>:</b>No contamos con servicio de guardavidas, por lo que el cuidado de cualquier menor queda a cargo de un adulto responsable.</p></div></div><div class=\"columns small-12 medium-4 medium-pull-8\"><img src=img/servicios/pic/pileta.jpg></div></div></div><div class=\"row column expanded servicio\" data-aos=fade-up><div class=\"row align-middle\"><div class=\"columns small-12 medium-8 _right\"><div class=\"row column\"><h1>Wi-Fi</h1></div><div class=\"row column\"><p>Nuestro complejo cuenta con Wi-Fi en todo el complejo.</p></div></div><div class=\"columns small-12 medium-4\"><img src=img/servicios/pic/wifi.jpg></div></div></div><div class=\"row column expanded servicio\" data-aos=fade-up><div class=\"row align-middle\"><div class=\"columns small-12 medium-8 medium-push-4 _left\"><div class=\"row column\"><h1>TV</h1></div><div class=\"row column\"><p>Contamos con TV con DirectTV para cada cabaña</p></div></div><div class=\"columns small-12 medium-4 medium-pull-8\"><img src=img/servicios/pic/tv.jpg></div></div></div><div class=\"row column expanded servicio\" data-aos=fade-up><div class=\"row align-middle\"><div class=\"columns small-12 medium-8 _right\"><div class=\"row column\"><h1>Cochera Individual</h1></div><div class=\"row column\"><p>Cada cabaña cuenta con su propia cochera cubierta</p></div></div><div class=\"columns small-12 medium-4\"><img src=img/servicios/pic/cochera.jpg></div></div></div><div class=\"row column expanded servicio\" data-aos=fade-up><div class=\"row align-middle\"><div class=\"columns small-12 medium-8 medium-push-4 _left\"><div class=\"row column\"><h1>Parrilla Cubierta</h1></div><div class=\"row column\"><p>Cada cabaña cuenta con una parrilla cubierta. Además encontrarás todos los elementos necesarios para el uso de la misma.</p></div></div><div class=\"columns small-12 medium-4 medium-pull-8\"><img src=img/servicios/pic/parrilla.jpg></div></div></div><div class=\"row column expanded servicio\" data-aos=fade-up><div class=\"row align-middle\"><div class=\"columns small-12 medium-8 _right\"><div class=\"row column\"><h1>Microondas y Cocina</h1></div><div class=\"row column\"><p>En cada cabaña hay un microondas, además contamos con cocina con horno y vajilla completa.</p></div></div><div class=\"columns small-12 medium-4\"><img src=img/servicios/pic/microondas.jpg></div></div></div><div class=\"row column expanded servicio\" data-aos=fade-up><div class=\"row align-middle\"><div class=\"columns small-12 medium-8 _right\"><div class=\"row column\"><h1>Cabañas Climatizadas</h1></div><div class=\"row column\"><p>Cada cabaña posee calefacción, para mantenerte calentito los días fríos. También son frescas y poseen ventiladores para los días calurosos</p></div></div><div class=\"columns small-12 medium-4\"></div></div></div><div class=\"row column expanded servicio\" data-aos=fade-up><div class=\"row align-middle\"><div class=\"columns small-12 medium-8 _right\"><div class=\"row column\"><h1>Blanquería</h1></div><div class=\"row column\"><p>Al llegar a la cabaña encontrarás sabanas y toallas limpias y perfumadas, listas para usar.</p></div></div><div class=\"columns small-12 medium-4\"></div></div></div></div></div><app-footer></app-footer>");
  $templateCache.put("directives/hamburger/hamburger.template.html",
    "<div id=hamburger-icon><span class=\"line line-1\"></span><span class=\"line line-2\"></span><span class=\"line line-3\"></span></div>");
  $templateCache.put("directives/logo/logo.template.html",
    "<div class=wrapper><div class=titulo><span class=horizonte>Horizonte</span><span class=de>de</span><span class=calamuchita>Calamuchita</span></div><div class=barra><span class=\"ovalo izquierda\"></span><span class=cabanas>Cabañas de Troncos</span><span class=\"ovalo derecha\"></span></div></div>");
  $templateCache.put("directives/myPhotoModalSlider/myPhotoModalSlider.html",
    "<div class=\"my-photo-modal-slider reveal full\" data-reveal><img class=imageview ng-src={{path}}><span class=\"arrow prev\" ng-click=prevPic()></span><span class=\"arrow next\" ng-click=nextPic()></span><span class=cerrar-modal data-close>&times;</span></div>");
  $templateCache.put("directives/myPhotoModalSlider/myPhotoModalSlider_1.html",
    "<div class=modal ng-show=showModal><img class=imageview ng-src={{path}}><span class=cerrar-modal ng-click=closeModal()>×</span><span class=\"arrow prev\" ng-click=prevPic()></span><span class=\"arrow next\" ng-click=nextPic()></span></div>");
  $templateCache.put("directives/slider/slider.template.html",
    "<div class=orbit><div class=orbit-wrapper><ul class=orbit-container><li class=\"orbit-slide no-motionui\" data-slide=0 style=display:none;position:relative><figure class=orbit-figure><div class=\"orbit-image img _1\"></div></figure></li><li class=\"orbit-slide no-motionui\" data-slide=1 style=position:relative;display:none><figure class=orbit-figure><div class=\"orbit-image img _2\"></div></figure></li><li class=\"orbit-slide no-motionui is-active is-in\" data-slide=2 style=position:relative;display:list-item aria-live=polite><figure class=orbit-figure><div class=\"orbit-image img _3\"></div></figure></li><li class=\"orbit-slide no-motionui\" data-slide=3 style=position:relative;display:none><figure class=orbit-figure><div class=\"orbit-image img _4\"></div></figure></li></ul></div></div>");
  $templateCache.put("index.dist.html",
    "<!DOCTYPE html><html ng-app=HorizontesApp><head><title>Horizonte de Calamuchita</title><meta charset=UTF-8><meta name=viewport content=\"width=device-width,initial-scale=1\"><link href=css/app.min.css rel=stylesheet><link href=../bower_components/fullpage.js/dist/jquery.fullpage.min.css rel=stylesheet><link rel=stylesheet href=../bower_components/aos/dist/aos.css><link rel=stylesheet href=../bower_components/animate.css/animate.min.css><script src=../bower_components/jquery/dist/jquery.min.js></script><script src=../bower_components/fullpage.js/dist/jquery.fullpage.min.js></script><script src=../bower_components/foundation-sites/dist/js/foundation.min.js></script><script src=../bower_components/angular/angular.min.js></script><script src=../bower_components/angular-animate/angular-animate.min.js></script><script src=../bower_components/angular-route/angular-route.min.js></script><script src=../bower_components/angular-touch/angular-touch.min.js></script><script src=../bower_components/ngSmoothScroll/dist/angular-smooth-scroll.min.js></script><script src=../vendor/TweenMax.min.js></script><script src=../bower_components/aos/dist/aos.js></script><script src=js/app.min.js></script><script async defer src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyAqC6bWJZsqQZOrCDHzpJPyRIu18nUP7v8&libraries=places\"></script></head><body ng-controller=baseController><div class=off-canvas-wrapper><app-navigation></app-navigation><div class=off-canvas-content data-off-canvas-content><div class=fadeOnChangePage ng-view></div></div></div></body></html>");
  $templateCache.put("modules/slider/slider.template.html",
    "<div ng-init=nextSlide()><div class=\"container slider\" ng-style=\"{height: iframeHeight + 'px'}\"><img ng-repeat=\"slide in slides\" class=\"slide slide-animation nonDraggableImage\" ng-swipe-right=nextSlide() ng-swipe-left=prevSlide() ng-hide=!isCurrentSlideIndex($index) ng-src={{slide.image}}><a class=\"arrow prev\" href=#/home ng-click=prevSlide()></a><a class=\"arrow next\" href=#/home ng-click=nextSlide()></a><nav class=nav><div class=wrapper><ul class=dots><li class=dot ng-repeat=\"slide in slides\"><a href=#/home ng-class=\"{'active':isCurrentSlideIndex($index)}\" ng-click=setCurrentSlideIndex($index); ng-bind=slide.description></a></li></ul></div></nav></div></div>");
}]);
