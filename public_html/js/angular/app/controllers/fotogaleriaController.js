angular.module('HorizontesApp').controller('fotogaleriaController', function($scope, $window, $timeout){
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
        for(var i = 1; i <= imagenes; i++){
            $scope.imageArray.push(i + '.jpg');
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
});


