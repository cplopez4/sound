$(document).ready(function(){
	$.each($(".tl-timemarker"), function(index, value) {
		var title = $(value).attr("data-title").toLowerCase();
		var media = $(value).attr("data-media");
		var mediatype = $(value).attr("data-mediatype");

		$(value).qtip({
            style: {
                //classes: area,
                tip: false
            },
            content: {
                text: "<div class='tooltip-top'><p class='tooltip-title'>"+ title +"</p></div><div class='tooltip-down'><div class='tooltip-down-l'><p class='tooltip-media'>"+ media +"</p></div><div class='tooltip-down-r'><p class='tooltip-mediatype'>"+ mediatype +"</p></div></div>"
            },
            position: {
                my: 'bottom left',
                at: 'top left',
				/*target: 'mouse',*/
                adjust: {
                	x: 0,
                	y: 200
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

	$(document).on('click',".tl-timemarker",function(){
		var id = parseInt($(this).attr("data-hasqtip"));
		history.pushState(null, null, "?news=" + id);
	});

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

	    $.each($(".tl-text"), function(index, value){
	    	var inter = $(value).attr("data-int");
	    	var amb = $(value).attr("data-amb");
	    	var conf = $(value).attr("data-conf");
	    	var act = $(value).attr("data-act");

	    	if(valueSelected==0){
	    		//Tile de arriba a la derecha
	    		$(value).find(".tl-text-content-container-triple-left-conf-title").html("CONFLICTO");
	    		$(value).find(".tl-text-content-container-triple-left-conf-content").html(conf);

	    		//Tile de abajo a la izquierda
	    		$(value).find(".tl-ambito-title").html("ÁMBITO");
	    		$(value).find(".tl-ambito-content").html(amb);

	    		//Tile de abajo a la derecha
	    		$(value).find(".tl-text-content-container-triple-left-int-title").html("ACTORES");
	    		$(value).find(".tl-text-content-container-triple-left-int-content").html(act);
		    }
		    else if(valueSelected==1){
		    	//Tile de arriba a la derecha
	    		$(value).find(".tl-text-content-container-triple-left-conf-title").html("INTERACCIÓN");
	    		$(value).find(".tl-text-content-container-triple-left-conf-content").html(inter);

	    		//Tile de abajo a la izquierda
	    		$(value).find(".tl-ambito-title").html("CONFLICTO");
	    		$(value).find(".tl-ambito-content").html(conf);

	    		//Tile de abajo a la derecha
	    		$(value).find(".tl-text-content-container-triple-left-int-title").html("ACTORES");
	    		$(value).find(".tl-text-content-container-triple-left-int-content").html(act);
		    }
		    else if(valueSelected==2){
		    	//Tile de arriba a la derecha
	    		$(value).find(".tl-text-content-container-triple-left-conf-title").html("INTERACCIÓN");
	    		$(value).find(".tl-text-content-container-triple-left-conf-content").html(inter);

	    		//Tile de abajo a la izquierda
	    		$(value).find(".tl-ambito-title").html("ÁMBITO");
	    		$(value).find(".tl-ambito-content").html(amb);

	    		//Tile de abajo a la derecha
	    		$(value).find(".tl-text-content-container-triple-left-int-title").html("ACTORES");
	    		$(value).find(".tl-text-content-container-triple-left-int-content").html(act);
		    }
		    else if(valueSelected==3){
		    	//Tile de arriba a la derecha
	    		$(value).find(".tl-text-content-container-triple-left-conf-title").html("INTERACCIÓN");
	    		$(value).find(".tl-text-content-container-triple-left-conf-content").html(inter);

	    		//Tile de abajo a la izquierda
	    		$(value).find(".tl-ambito-title").html("ÁMBITO");
	    		$(value).find(".tl-ambito-content").html(amb);

	    		//Tile de abajo a la derecha
	    		$(value).find(".tl-text-content-container-triple-left-int-title").html("CONFLICTO");
	    		$(value).find(".tl-text-content-container-triple-left-int-content").html(conf);
		    }
	    });
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

(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);