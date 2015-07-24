var ie = (function(){
    // from here: http://stackoverflow.com/questions/14892095/browser-msie-error-after-update-to-jquery-1-9-1
    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');

    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );

    return v > 4 ? v : undef;

}());

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en'
  }, 'google_translate_element');
}


(function($){
	$(document).ready(function() {
		$('.download-collapse').click(function(e){
			e.preventDefault();
		});
        $('.open-popup-link').magnificPopup({
            type:'inline',
            midClick: true,
            callbacks: {
                open: function() {
                    var srcVid = $("video:visible").attr("src");
                    //Force a new request every time the lightbox closes because the iPad does weird garbage collection on videos and throws away the file if you don't get a new request.
                    if(srcVid != null && srcVid.indexOf("?")==-1)
                    {
                        srcVid+="?v=";
                    }
                    var getVid = $("video:visible").attr("src",srcVid+"a");
                    if(getVid.length > 0)
                    {
                        getVid.get(0).load();
                        getVid.get(0).play();
                    }
                    var thisButton$ = $("button.mfp-close");
                    $(".video-js:visible").append(thisButton$);
                },
                close: function(){

                    var thisHtml$ = $("video:visible").html();
                    $("video:visible").html(thisHtml$);
                    $("video").each(function()
                    {
                        $(this).get(0).pause();
                        var srcVid = $(this).attr("src");
                        //Force a new request every time the lightbox closes because the iPad does weird garbage collection on videos and throws away the file if you don't get a new request.
                        if(srcVid != null && srcVid.indexOf("?")==-1)
                        {
                            srcVid+="?v=";
                        }
                        $(this).attr("src",srcVid+"b");
                        $(this).get(0).load();
                    });
                }
            },
            disableOn: function() {
                // !!IMPORTANT - Change width value (currently 1025) here AND in the click handler for the mobile links, because we're using inline magnific popup mode.
                if( $(window).width() < 641 ) {
                    return false;
                }
                return true;
            }
        });
        $("a.open-popup-link").click(function(){
            // !!IMPORTANT - Change width value (currently 1025) here AND in the disableOn callback for the magnific settings, because we're using inline magnific popup mode.
            if( $(this).attr("data-mobile-link") != "" && $(window).width() < 641 )
            {
                window.location = $(this).attr("data-mobile-link");
                return false;
            }
        });
	});


    // site-mobile-nav
    $('[data-toggle=offcanvas]').click(function () {
        $('.site-mobile-nav').toggleClass('active')
    });
    $('.site-mobile-nav').on('click', function (e) {
        if( e.target !== this ){
            return
        }
        $('.site-mobile-nav').removeClass('active')
    });

    // This is to dynamically apply labels to the responsive tables based on the content of the headers (see media queries in global.js)
    $(".horizontal-table").each(function(){
        var thisClass = "a" + Math.floor((Math.random() * 10000000) + 1);
        $(this).addClass(thisClass);
        var labelsArray = new Array();
        $(this).find("tbody tr:first-child td").each(function(){
            labelsArray.push($(this).text());
            console.log($(this).text());
        });
        var styles = "";
        for(var i = 0; i < labelsArray.length; i++)
        {
            styles += "table.horizontal-table." + thisClass + " tbody td:nth-of-type(" + (i + 1) + "):before { content: '" + labelsArray[i] + "';font-weight:bold;font-size:12px;line-height:12px;}";
        }
        $("html > head").append("<style type='text/css'>@media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {" + styles + " }</style>")
    });

})(window.jQuery);
