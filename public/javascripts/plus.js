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
            /*events: {
                render: function(event, api) {
                    api.elements.target.click(function(e) {
                        api.wasClicked = !api.wasClicked;
                    });
                },
                show: function(event, api) {
                    toggleRectColor(value);

                    $("#" + api._id + "-large").qtip("hide");
                    $("#" + api._id + "-small").qtip("hide");
                },
                hide: function(event, api) {
                    $("#" + api._id + "-small").qtip("show");

                    if (api.wasClicked && event.originalEvent.type === 'mouseleave') {
                        try {
                            event.preventDefault();
                        } catch (e) {}
                    } else if (!api.wasClicked && event.originalEvent.type === 'click') {
                        try {
                            event.preventDefault();
                        } catch (e) {}
                    } else {
                        toggleRectColor(value);
                    }
                }
            }*/
        })
	});

	/*$(".tl-timemarker").hover(function(){
		$(".tl-timemarker").css("opacity", "0.3");
		$(this).css("opacity", "1");
	})*/

	$(".tl-timemarker").hover(
	  function() {
	  	$(".tl-timemarker").addClass("low-opacity");
	    $(this).removeClass("low-opacity");
	  }, function() {
	    $(".tl-timemarker").removeClass("low-opacity");
	  }
	);
});