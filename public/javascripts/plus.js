$(document).ready(function(){
	$.each($(".tl-timemarker"), function(index, value) {
		$(value).qtip({
            style: {
                //classes: area,
                tip: {
                    width: 8,
                    height: 12
                }
            },
            content: {
                text: "<div><h2>Título del tooltip</h2><p>Contenido de este Popup!</p></div>"
            },
            position: {
                my: 'bottom left',
                at: 'top left',
				target: 'mouse',
                adjust: {
                	mouse: false,
                	x: 5,
                	y: -7
                }
            },
            show: {
                event: 'mouseenter'
            },
            hide: {
                event: 'mouseleave',
            }
        })
	});

	$(".tl-timemarker").hover(
	  function() {
	  	var group = $(this).attr("data-group");
	  	$(".tl-timemarker").addClass("low-opacity");
	    $(".tl-timemarker[data-group='"+ group +"']").removeClass("low-opacity");
	    $(".tl-timemarker[data-group='"+ group +"']").find(".tl-timemarker-content-container").addClass("full-opacity");
	  }, function() {
	    $(".tl-timemarker").removeClass("low-opacity");
	    $(".tl-timemarker").find(".tl-timemarker-content-container").removeClass("full-opacity");
	  }
	);
});