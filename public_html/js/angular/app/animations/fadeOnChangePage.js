angular.module('HorizontesApp').animation('.fadeOnChangePage', function() {
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


