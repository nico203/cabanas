angular.module('HorizontesApp', [
    'ngRoute',
    'ngAnimate',
    'ngTouch',
    'smoothScroll',
    'slider'
])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
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


;function contactoController() {
    
}

angular.module('HorizontesApp').component('contacto', {
    templateUrl: 'components/contacto/contacto.template.html',
    controller: [contactoController]
});;function footerController($scope, $route) {
    $scope.iconos = [false, false];

    $scope.clickIcono = function (icono) {
        $scope.iconos[icono] = !$scope.iconos[icono];
    };
}

angular.module('HorizontesApp').component('appFooter', {
    templateUrl: 'components/footer/footer.template.html',
    controller: ['$scope','$route',footerController]
});;function fotogaleriaController($scope, $window, $timeout){
    var fotosxcolumna = 5;
    var imagenes = 25;
    
    $scope.imagenes = [];
    $scope.imageArray = [];
    $scope.mostrarModal = false;
    $scope.imagenSeleccionada = null;
    
    $scope.init = function(){
        var count = imagenes/fotosxcolumna;
        var index = 1;
        for(var i = 0; i < count ; i++){
            var fila = [];
            for(var j = 0; j < fotosxcolumna; j++){
                if(index > imagenes){break;}
                fila.push(index++);
            }
            $scope.imagenes.push(fila);
        }
        for(var k = 1; k <= imagenes; k++){
            $scope.imageArray.push(k + '.jpg');
        }
    };
    
    $scope.abrirModal = function(imagen){
        $scope.imagenSeleccionada = imagen - 1;
        $scope.mostrarModal = true;
    };
   
    $scope.nextPic = function(){
        $scope.imagenSeleccionada = (($scope.imagenSeleccionada + 1) > imagenes) ? 
        1 : $scope.imagenSeleccionada + 1;
    };
    $scope.prevPic = function(){
        $scope.imagenSeleccionada = (($scope.imagenSeleccionada - 1) === 0) ? 
        imagenes : $scope.imagenSeleccionada - 1;
    };
}

angular.module('HorizontesApp').component('fotogaleria', {
    templateUrl: 'components/fotogaleria/fotogaleria.template.html',
    controller: ['$scope','$window','$timeout',fotogaleriaController]
});

;function homeController($scope, $timeout, $window){
    $scope.top_topBoard = (window.innerHeight * 97 / 200) - 113; //Seteo del height de las imagenes
    $scope.loadClassBoard = false;
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
}

angular.module('HorizontesApp').component('home', {
    templateUrl: 'components/home/home.template.html',
    controller: ['$scope','$timeout','$window',homeController]
});;function mapaController($scope, $timeout, $window){
    $scope.indice = 0;
    var mapa = null;
    
    $scope.init = function(){
        $scope.cargarMapa();
    };
    
    $scope.cargarMapa = function(){
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
                $scope.cargarMapa();
            }
        }, 200);
    };
}

angular.module('HorizontesApp').component('mapa', {
    templateUrl: 'components/mapa/mapa.template.html',
    controller: ['$scope','$timeout','$window',mapaController]
});
;function navigationController(){
    
}

angular.module('HorizontesApp').component('appNavigation', {
    templateUrl: 'components/navigation/navigation.template.html',
    controller: [navigationController]
});
;function serviciosController($scope, $timeout, $window){
    
    $scope.init = function(){
        console.log('config');
    };
}


angular.module('HorizontesApp').component('servicios', {
    templateUrl: 'components/servicios/servicios.template.html',
    controller: ['$scope','$timeout','$window',serviciosController]
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
;angular.module('HorizontesApp').controller('sliderController', [
    '$scope', '$timeout',
    function($scope, $timeout){
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
}])
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
});;angular.module('HorizontesApp').controller('tabController', [
    '$rootScope', '$scope', '$route', '$timeout', 'smoothScroll',
    function($rootScope, $scope, $route, $timeout, smoothScroll){
    $scope.$route = $route;
    $scope.mostrarContacto = false;
    $scope.show = [false, false, false];
    $scope.iconos = [false, false];
    var bool = true;
    var timer;
    
    function toggle(index, hide) {
        if(index === $scope.show.length){
            if(hide) {
                $scope.mostrarContacto = false;
            }
            return;
        }
        $scope.show[index] = !$scope.show[index];
        $timeout(function(){
            toggle(index + 1, hide);
        },200);
    }
    
    $scope.clickContacto = function() {
        $scope.mostrarContacto = true;
        toggle(0, false);
        timer = $timeout(function() {
            for(var i = 0; i < $scope.iconos.length; i++) {
                $scope.iconos[i] = false;
            }
            toggle(0, true);
        }, 10000);
    };
    
    $scope.clickIcono = function(icono) {
        $scope.iconos[icono] = !$scope.iconos[icono];
        $timeout.cancel(timer);
        timer = $timeout(function() {
            for(var i = 0; i < $scope.iconos.length; i++) {
                $scope.iconos[i] = false;
            }
            toggle(0, true);
        }, 10000);
    };
    
    $scope.scrollToBottom = function() {
        console.log('clicked');
        
        $timeout(function(){
            $rootScope.resaltarContacto = true;
            $timeout(function(){
                $rootScope.resaltarContacto = false;
            }, 1000);
        },1);
    };
}]);
;angular.module('HorizontesApp').directive("hideOnScroll", [
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
;angular.module('HorizontesApp').directive('myPhotoModalSlider',[
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

;
;function sliderController($scope, $timeout){
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

;angular.module('HorizontesApp').run(['$templateCache', function ($templateCache) {
  $templateCache.put("../public_html/components/contacto/contacto.template.html",
    "");
  $templateCache.put("../public_html/components/footer/footer.template.html",
    "<footer id=footer><div class=\"row row-footer\"><div class=icono-container ng-class=\"{'resaltar-contacto':resaltarContacto}\"><span class=texto>Contacto:</span><div class=\"icono-footer telefono\" ng-class=\"{'activo':iconos[0]}\"><span class=icono ng-click=clickIcono(0)></span><div class=texto><u>Tel:</u>(343) 5-058-783</div></div><div class=\"icono-footer mail\" ng-class=\"{'activo':iconos[1]}\"><span class=icono ng-click=clickIcono(1)></span><div class=texto>horizontedecalamuchita@gmail.com</div></div><div class=\"icono-footer facebook\"><a href=https://www.facebook.com/HorizontedeCalamuchita/ class=icono target=_blank></a></div></div></div><div class=\"row row-footer text-center last-footer\">Horizonte de Calamuchita | Federico Leluar y Juan de Dios Filiberto - Santa Mónica - Santa Rosa de Calamuchita - Córdoba - Argentina</div></footer>");
  $templateCache.put("../public_html/components/fotogaleria/fotogaleria.template.html",
    "<div ng-init=init() class=_c><div class=\"top top-fotogaleria\"><h1>Tu Lugar</h1><p>Paz, descanso y relajación absoluta.</p></div><div class=content><div class=\"row section\"><div class=content-section><div class=title><h1>Nuestras Cabañas</h1></div><p class=texto-row>A continuación verás una serie de imágenes. Haz click en una imagen para agrandarla.</p><p class=texto-row>Usa las flechas que aparecen en los costados para navegar por las imágenes disponibles.</p></div></div><div class=content-section><div ng-repeat=\"fila in imagenes\" class=row><div ng-repeat=\"imagen in fila\" class=col-5><div class=foto><img ng-src=img/fotogaleria/min/{{imagen}}.jpg ng-click=abrirModal(imagen)></div></div></div></div></div><my-photo-modal-slider base-path=img/fotogaleria/max/ show-modal=mostrarModal image-index=imagenSeleccionada image-array=imageArray></div>");
  $templateCache.put("../public_html/components/home/home.template.html",
    "<slider></slider><div ng-init=init() class=_c><div id=topboard ng-style=\"{top: top_topBoard + 'px'}\"><span ng-class=\"{'visible': loadClassBoard === true}\"></span></div><div class=content><div class=section><div class=content-section><div class=title><h1>Bienvenidos</h1></div><p>Horizonte de Calamuchita, es un complejo de cabañas en el barrio Santa Mónica de Santa Rosa de Calamuchita, Córdoba, que ofrece un perfecto lugar de descanso, naturaleza absoluta, sierras y río.</p></div></div><div class=\"bg-img _1\"></div><div class=section><div class=content-section><div class=title><h1>Nuestras Cabañas</h1></div><p class=text>Con una ubicación privilegiada, con vista hacia el Cerro Champaquí, es el lugar perfecto para romper la rutina y relajarse.</p><div class=container><div class=row><div class=\"col-3 cuadro\"><a href=#/fotogaleria><img src=img/1.jpg alt=\"\"></a><div><div>Río Santa Rosa</div><div>El complejo se encuentra a 250 mts del Río Santa Rosa.</div><a href=#/fotogaleria>Ver Más >></a></div></div><div class=\"col-3 cuadro\"><a href=#/fotogaleria><img src=img/2.jpg alt=\"\"></a><div><div>Horizonte</div><div>Una ubicación privilegiada, que te dará una vista que te maravillará.</div><a href=#/fotogaleria>Ver Más >></a></div></div><div class=\"col-3 cuadro\"><a href=#/fotogaleria><img src=img/3.jpg alt=\"\"></a><div><div>Cabañas de troncos</div><div>Construídas con madera y cemento, son frescas en verano y acogedoras en invierno.</div><a href=#/fotogaleria>Ver Más >></a></div></div></div><div class=row><a href=#/fotogaleria class=link>Ver más</a></div></div></div></div><div class=\"bg-img _3\"></div><div class=section><div class=content-section><div class=title><h1>Servicios</h1></div><p class=text>Cada cabaña cuenta con dos dormitorios, uno matrimonial en planta baja y otro en planta alta, con cuchetas. Además, están equipadas con todo lo que necesitás para sentirte como en casa.</p><div class=container><div class=row><div class=servicios><div class=item-servicio ng-repeat=\"x in servicios\"><img ng-src=img/servicios/ico/{{x.imagen}}><p>{{x.nombre}}</p></div></div></div><div class=row><a href=#/servicios class=link>Ver más</a></div></div></div></div></div></div>");
  $templateCache.put("../public_html/components/mapa/mapa.template.html",
    "<div ng-init=init() class=_c><div class=\"top top-mapa\"></div><div class=content><div class=\"row section\"><div class=content-section><div class=title><h1>¿Cómo Llegar?</h1></div><p class=texto-row>A continuación se muestra un mapa en el cual verás la ubicación del complejo.</p><p class=texto-row>Si el mapa no carga, puedes consultarlo aquí:<a href=\"https://maps.google.com/?cid=17527093845757323419\" target=_blank>Ver en Google Maps</a></p></div></div><div class=\"row row-margin\"><div class=mapa-container><div class=texto><p>Cargando mapa. Por favor, espere.</p><div class=puntos><span class=punto ng-show=\"1 === indice\"></span><span class=punto ng-show=\"2 === indice\"></span><span class=punto ng-show=\"3 === indice\"></span><span class=punto ng-show=\"4 === indice\"></span></div></div><div id=mapa></div></div></div></div></div>");
  $templateCache.put("../public_html/components/navigation/navigation.template.html",
    "<header hide-on-scroll ng-class=\"{'ocultar': boolChangeClass, 'transparente': boolTransparent}\"><div class=background><div class=attach><div class=nav_logo></div><nav id=primary_nav ng-controller=tabController><ul><li ng-class=\"{'active': $route.current.activetab === 'home'}\"><a href=#/home>Home</a></li><li ng-class=\"{'active': $route.current.activetab == 'fotogaleria'}\"><a href=#/fotogaleria>Fotogalería</a></li><li ng-class=\"{'active': $route.current.activetab == 'servicios'}\"><a href=#/servicios>Servicios</a></li><li ng-class=\"{'active': $route.current.activetab == 'mapa'}\"><a href=#/mapa>Mapa</a></li><li><a style=cursor:pointer scroll-to=footer duration=1500 callback-after=scrollToBottom>Contacto</a><div class=\"icono-container contacto\" ng-show=mostrarContacto><div class=\"icono-footer telefono\" ng-class=\"{'activo':iconos[0], 'show':show[0]}\"><span class=icono ng-click=clickIcono(0)></span><div class=texto><u>Tel:</u>123456789</div></div><div class=\"icono-footer mail\" ng-class=\"{'activo':iconos[1], 'show':show[1]}\"><span class=icono ng-click=clickIcono(1)></span><div class=texto>contacto@contacto.com</div></div><div class=\"icono-footer facebook\" ng-class=\"{'show':show[2]}\"><a href=https://www.facebook.com/HorizontedeCalamuchita/ class=icono target=_blank></a></div></div></li></ul></nav></div></div></header>");
  $templateCache.put("../public_html/components/servicios/servicios.template.html",
    "<div ng-init=init() class=_c><div class=\"top top-servicios\"><h1>Vení, conocenos</h1><p>La aventura te espera.</p></div><div class=content><div class=\"row section\"><div class=content-section><div class=title><h1>Nuestros servicios</h1></div></div></div><div class=content-section-float><div class=\"row servicio\"><div class=col-4 vcenter><img src=img/servicios/pic/pileta.jpg></div><div class=\"col-3-4 _left vcenter\"><div class=row><h1>Piscina</h1></div><div class=row><p style=margin-bottom:20px>Contamos con una pileta recreativa.</p><p style=color:red><b><u>Nota</u>:</b>No contamos con servicio de guardavidas, por lo que el cuidado de cualquier menor queda a cargo de un adulto responsable.</p></div></div></div><div class=\"row servicio\"><div class=\"col-3-4 _right vcenter\"><div class=row><h1>Wi-Fi</h1></div><div class=row><p>Nuestro complejo cuenta con Wi-Fi en todo el complejo.</p></div></div><div class=\"col-4 vcenter\"><img src=img/servicios/pic/wifi.jpg></div></div><div class=\"row servicio\"><div class=\"col-4 centrado vcenter\"><img src=img/servicios/pic/tv.jpg></div><div class=\"col-3-4 _left centrado vcenter\"><div class=row><h1>TV</h1></div><div class=row><p>Contamos con TV con DirectTV para cada cabaña</p></div></div></div><div class=\"row servicio\"><div class=\"col-3-4 _right vcenter\"><div class=row><h1>Cochera Individual</h1></div><div class=\"row vcenter\"><p>Cada cabaña cuenta con su propia cochera cubierta</p></div></div><div class=\"col-4 vcenter\"><img src=img/servicios/pic/cochera.jpg></div></div><div class=\"row servicio\"><div class=\"col-4 vcenter\"><img src=img/servicios/pic/parrilla.jpg></div><div class=\"col-3-4 _left vcenter\"><div class=row><h1>Parrilla Cubierta</h1></div><div class=row><p>Cada cabaña cuenta con una parrilla cubierta. Además encontrarás todos los elementos necesarios para el uso de la misma.</p></div></div></div><div class=\"row servicio\"><div class=\"col-3-4 _right vcenter\"><div class=row><h1>Microondas y Cocina</h1></div><div class=row><p>En cada cabaña hay un microondas, en donde podés recalentar la comida en esos dias de flojera. También contamos con cocina con horno y vajilla completa.</p></div></div><div class=\"col-4 vcenter\"><img src=img/servicios/pic/microondas.jpg></div></div><div class=\"row servicio\"><div class=\"col-3-4 _right vcenter\"><div class=row><h1>Cabañas Climatizadas</h1></div><div class=row><p>Cada cabaña posee calefacción, para mantenerte calentito los días fríos. También son frescas y poseen ventiladores para los días calurosos</p></div></div><div class=\"col-4 vcenter\"></div></div><div class=\"row servicio\"><div class=\"col-3-4 _right vcenter\"><div class=row><h1>Blanquería</h1></div><div class=row><p>Al llegar a la cabaña encontrarás sabanas y toallas limpias y perfumadas, listas para usar.</p></div></div><div class=\"col-4 vcenter\"></div></div></div></div></div>");
  $templateCache.put("../public_html/directives/myPhotoModalSlider/myPhotoModalSlider.html",
    "<div class=modal ng-show=showModal><img class=imageview ng-src={{path}}><span class=cerrar-modal ng-click=closeModal()>×</span><span class=\"arrow prev\" ng-click=prevPic()></span><span class=\"arrow next\" ng-click=nextPic()></span></div>");
  $templateCache.put("../public_html/modules/slider/slider.template.html",
    "<div ng-init=nextSlide()><div class=\"container slider\" ng-style=\"{height: iframeHeight + 'px'}\"><img ng-repeat=\"slide in slides\" class=\"slide slide-animation nonDraggableImage\" ng-swipe-right=nextSlide() ng-swipe-left=prevSlide() ng-hide=!isCurrentSlideIndex($index) ng-src={{slide.image}}><a class=\"arrow prev\" href=#/home ng-click=prevSlide()></a><a class=\"arrow next\" href=#/home ng-click=nextSlide()></a><nav class=nav><div class=wrapper><ul class=dots><li class=dot ng-repeat=\"slide in slides\"><a href=#/home ng-class=\"{'active':isCurrentSlideIndex($index)}\" ng-click=setCurrentSlideIndex($index); ng-bind=slide.description></a></li></ul></div></nav></div></div>");
}]);
