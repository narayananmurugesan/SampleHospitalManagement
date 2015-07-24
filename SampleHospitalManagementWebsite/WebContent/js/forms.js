var handleCheckboxClick = function(elem) {
        console.log('click');
        console.log('attr=' + $(elem).is(':checked'));
        if($(elem).is(':checked')) {
            $(elem).addClass('checked');
        }else {
            $(elem).removeClass('checked');
        }
};

(function($) {

    $(document).ready( function() {
        $('.form input[type=checkbox]').click( function() {
            handleCheckboxClick(this);
        });

        $('#country').change( function(e) {
            var val = $('#country :selected').val();

            if(val == 'US' || val == 'CA') {
                $('#state-postal-fields').show();
            }else {
                $('#state-postal-fields').hide();
            }
        });

        $('.close-pull-out').click( function(e) {
            e.preventDefault();

            if($('.pull-out').hasClass('expanded')) {
                $('.pull-out').removeClass('expanded');
                $('.pull-out').animate( {
                    height: '0px'
                }, 1000, function() {
                    $('.pull-out').hide();    
                });
            }
        });

        $('.open-pull-out').click( function(e) {
            e.preventDefault();

            if(!$('.pull-out').hasClass('expanded')) {
                $('.pull-out').addClass('expanded');
                $('.pull-out').height('0px');
                $('.pull-out').show();
                $('.pull-out').animate( {
                    height: $('.pull-out').data('height') + 'px'
                }, 1000);
            }
        });
    });
})(jQuery);
