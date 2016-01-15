$(document).ready(function(){
	$.each($(".tl-timemarker"), function(index, value) {
		var title = $(value).attr("data-title").toLowerCase();

		$(value).qtip({
            style: {
                //classes: area,
                tip: {
                    width: 8,
                    height: 12
                }
            },
            content: {
                text: "<div><p class='tooltip-title'>"+ title +"</p></div>"
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

	$('#filter-dropdown').on('change', function (e) {
	    var valueSelected = this.value;

	    $(".tl-background-line").addClass("hidden");
	    $(".tl-background-label").addClass("hidden");
	    $(".tl-timemarker-content-container").addClass("hidden");

	    if(valueSelected==0){
	    	$(".tl-background-line.int").removeClass("hidden");
	    	$(".tl-background-label.int").removeClass("hidden");
	    	$(".tl-timemarker-content-container.int").removeClass("hidden");
	    }
	    else if(valueSelected==1){
			$(".tl-background-line.amb").removeClass("hidden");
	    	$(".tl-background-label.amb").removeClass("hidden");
	    	$(".tl-timemarker-content-container.amb").removeClass("hidden");
	    }
	    else if(valueSelected==2){
	    	$(".tl-background-line.conf").removeClass("hidden");
	    	$(".tl-background-label.conf").removeClass("hidden");
	    	$(".tl-timemarker-content-container.conf").removeClass("hidden");
	    }
	    else if(valueSelected==3){
	    	$(".tl-background-line.act").removeClass("hidden");
	    	$(".tl-background-label.act").removeClass("hidden");
	    	$(".tl-timemarker-content-container.act").removeClass("hidden");
	    }
	});

	$('#square-dropdown').on('change', function (e) {
	    var valueSelected = this.value;

	    $.each($(".tl-timemarker-content-container"), function(index,value){
	    	var sArray = $(value).attr("data-size").split(",");
	    	var tArray = $(value).attr("data-top").split(",");

	    	$(this).removeClass (function (index, css) {
			    return (css.match (/(^|\s)square-container-\S+/g) || []).join(' ');
			});

	    	if(sArray[valueSelected]==0 || sArray[valueSelected]=='0'){
	    		$(this).addClass("square-container-small");
	    		$(this).css("top", tArray[0]);
	    	}
	    	else if(sArray[valueSelected]==1 || sArray[valueSelected]=='1'){
	    		$(this).addClass("square-container-medium");
	    		$(this).css("top", tArray[1]);
	    	}
	    	else if(sArray[valueSelected]==2 || sArray[valueSelected]=='2'){
	    		$(this).addClass("square-container-large");
	    		$(this).css("top", tArray[2]);
	    	}
	    })
	});
});