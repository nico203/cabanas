angular.module('HorizontesApp').component('servicios', {
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
