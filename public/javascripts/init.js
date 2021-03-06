var route1, route2, route3, route4, route5, route6, route7 = false;
var lastClick = 0;
var globalCounter = 0;
var initTime = new Date();
var readyQ1 = false;
var readyQ2 = false;
var readyQ3 = false;
var pointsArrayTotal = [];

/* En cirlcles, 1=Q1A1, 2=Q1A2, 3=Q2A1, 4=Q2A2, 5=Q2A3, 6=Q3A1, 7=Q3A2 */
var json = { data: {
        clicks: [],
        manifest: "",
        email: "",
        age: "",
        gender: "",
        country: "",
        city: "",
        comment: "",
        explain: "",
        circles: {
            first_answer: 0,
            second_answer: 0,
            third_answer: 0
        }
    } 
};

/* Fin Siri Container */

$("canvas").css("left", (window.innerWidth/2)*(-1));

function stopAll(){
    siriWave1.stop();
    siriWave2.stop();
    siriWave3.stop();
    siriWave4.stop();
    siriWave5.stop();
    siriWave6.stop();
    siriWave7.stop();
}

function startAll(){
    siriWave1.start();
    siriWave2.start();
    siriWave3.start();
    siriWave4.start();
    siriWave5.start();
    siriWave6.start();
    siriWave7.start();
}

$(document).ready(function(){

    var timeout1, timeout2, timeout3, timeout4, timeout5;

    var audio_ruido = document.querySelector('#audio-ruido');
    audio_ruido.volume = 0;
    var audio_atencion = document.querySelector('#audio-atencion');
    audio_atencion.volume = 0;
    var audio_intro = document.querySelector('#audio-intro');
    audio_intro.volume = 0.1;

    /* Volumen Hover Cruces Exteriores */
    var audio_celular = document.querySelector('#audio-celular');
    audio_celular.volume = 0.2;
    var audio_estrella = document.querySelector('#audio-estrella');
    audio_estrella.volume = 0.2;
    var audio_perro = document.querySelector('#audio-perro');
    audio_perro.volume = 0.4;


    timeout1 = setTimeout(function(){
        $(".skip-arrow").fadeToggle(1500);
        $("#cover-1").fadeToggle(3000);
        showIntroLines(1);
        timeout2 = setTimeout(function(){
            $("#cover-1").fadeToggle(2500);
            $("#cover-2").fadeToggle(2500);
            $("line").fadeOut(1500);
            showIntroLines(2);

            timeout3 = setTimeout(function(){
                $("#cover-2").fadeToggle(2500);                
                $("#cover-3").fadeToggle(2500);
                $("line").fadeOut(1500);
                showIntroLines(3);

                timeout4 = setTimeout(function(){
                    $("#cover-3").fadeToggle(2500);                
                    $("#cover-4").fadeToggle(2500);
                    $("line").fadeOut(1500);
                    showIntroLines(4);                
                    
                    timeout5 = setTimeout(function(){
                        $("line").fadeOut(1500);
                        $("#cover-4").fadeToggle(2500);
                        $(".skip-arrow").fadeOut(2500);
                        setTimeout(function(){
                            $("#cover-home").fadeIn(2500);
                        },2000);
                        resetLines();
                        showIntroLines(5);             
                        
                    }, 8000);
                }, 8000);
            }, 8000);
        }, 7000);
    }, 1200);

    $(document).on("click", ".skip-arrow p", function(){
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
        clearTimeout(timeout4);
        clearTimeout(timeout5);

        setTimeout(function(){
            $("line").fadeOut(1500);
            $("div[id^='cover-']").fadeOut(1500);
            $(".skip-arrow").fadeOut(1500);

            setTimeout(function(){
                setTimeout(function(){
                    $("#cover-home").fadeIn(2500);
                },2000);
                resetLines();
                showIntroLines(5);
            },1500);

        }, 1000);
    });

    function showIntroLines(type){
        if(type == 1){
            /* Respuesta 1 */
            drawAnimateLine(document.querySelector("#line-q2a3-q1a1"),{ initWait: 1500 },0,false);
            drawAnimateLine(document.querySelector("#line-q2a3-q2a3e1"),{ initWait: 1500 },0,false);
            drawAnimateLine(document.querySelector("#line-q2a3-q1a1e2"),{ initWait: 1500 },0,false);
            drawAnimateLine(document.querySelector("#line-q2a3-e8"),{ initWait: 1500 },0,false);
            drawAnimateLine(document.querySelector("#line-q1a1e1-e1"),{ initWait: 1500 },0,false);

            drawAnimateLine(document.querySelector("#line-q1a1-q2a3e1"),{ initWait: 1500 },1,false);

            drawAnimateLine(document.querySelector("#line-q2a1-e4"),{ initWait: 1500 },0,false);
            drawAnimateLine(document.querySelector("#line-q2a1-e5"),{ initWait: 1500 },0,false);

            drawAnimateLine(document.querySelector("#line-q1-e4"),{ initWait: 1500, reverse: true },1,false);
            drawAnimateLine(document.querySelector("#line-e4-e5"),{ initWait: 1500 },1,false);
            drawAnimateLine(document.querySelector("#line-e3-e4"),{ initWait: 1500, reverse: true },1,false);

            drawAnimateLine(document.querySelector("#line-q1-e3"),{ initWait: 1500 },2,false);

            drawAnimateLine(document.querySelector("#line-q1a2-q2a1e1"),{ initWait: 1500 },0,false);
            drawAnimateLine(document.querySelector("#line-q1a2-e14"),{ initWait: 1500 },0,false);

            drawAnimateLine(document.querySelector("#line-q1a2e1-q2a1e1"),{ initWait: 1500, reverse: true },1,false);
            drawAnimateLine(document.querySelector("#line-q2a1-e7"),{ initWait: 1500, reverse: true },1,false);

            drawAnimateLine(document.querySelector("#line-q2a2-q1a2e1"),{ initWait: 1500, reverse: true },2,false);

        }
        else if(type == 2){
            drawAnimateLine(document.querySelector("#line-q2a2-q1a1e1"),{ initWait: 1500 },0,false);
            drawAnimateLine(document.querySelector("#line-q2a2-q2a3e1"),{ initWait: 1500 },0,false);
            drawAnimateLine(document.querySelector("#line-q1-q2a2"),{ initWait: 1500, reverse: true },0,false);

            drawAnimateLine(document.querySelector("#line-q1-e2"),{ initWait: 1500 },1,false);
            drawAnimateLine(document.querySelector("#line-q1a1e1-e2"),{ initWait: 1500 },1,false);

            drawAnimateLine(document.querySelector("#line-q3a1-e11"),{ initWait: 1500 },0,false);
            drawAnimateLine(document.querySelector("#line-q3a1-e16"),{ initWait: 1500 },0,false);

            drawAnimateLine(document.querySelector("#line-q2a3e1-e16"),{ initWait: 1500, reverse: true },1,false);
            drawAnimateLine(document.querySelector("#line-q3a2e2-e11"),{ initWait: 1500, reverse: true },1,false);
            drawAnimateLine(document.querySelector("#line-e11-e13"),{ initWait: 1500 },1,false);
            drawAnimateLine(document.querySelector("#line-e12-e11"),{ initWait: 1500, reverse: true },1,false);


            drawAnimateLine(document.querySelector("#line-q3-q1a1"),{ initWait: 1500 },0,false);

            drawAnimateLine(document.querySelector("#line-q3-q3a1"),{ initWait: 1500 },0,false);
            drawAnimateLine(document.querySelector("#line-q3a1-q3a2"),{ initWait: 1500 },1,false);
            drawAnimateLine(document.querySelector("#line-q3a2-e17"),{ initWait: 1500 },2,false);
            drawAnimateLine(document.querySelector("#line-q1a2-e17"),{ initWait: 1500, reverse: true },3,false);
        }
        else if(type == 3){
            drawAnimateLine(document.querySelector("#line-q1-q1a1e1"),{ initWait: 1500 },0,false);
            drawAnimateLine(document.querySelector("#line-q2a3-q1a1e1"),{ initWait: 1500, reverse: true },1,false);

            drawAnimateLine(document.querySelector("#line-q1-q1a2e1"),{ initWait: 1500 },0,false);
            drawAnimateLine(document.querySelector("#line-q1a2-q1a2e1"),{ initWait: 1500, reverse: true },1,false);
            drawAnimateLine(document.querySelector("#line-q2-q1a2"),{ initWait: 1500, reverse: true },2,false);
            drawAnimateLine(document.querySelector("#line-q2-q3a1"),{ initWait: 1500 },3,false);

            drawAnimateLine(document.querySelector("#line-q2-q2a2"),{ initWait: 1500 },0,false);

            drawAnimateLine(document.querySelector("#line-q2-q1a2e1"),{ initWait: 1500 },0,false);
            drawAnimateLine(document.querySelector("#line-q2a1-q1a2e1"),{ initWait: 1500, reverse: true },1,false);

            drawAnimateLine(document.querySelector("#line-q2-q3a2"),{ initWait: 1500 },0,false);
        }
        else if(type == 4){
            drawAnimateLine(document.querySelector("#line-q3a2-e10"),{ initWait: 1500 },0,false);
            drawAnimateLine(document.querySelector("#line-q3a2-e12"),{ initWait: 1500 },0,false);

            drawAnimateLine(document.querySelector("#line-e9-e17"),{ initWait: 1500, reverse: true },1,false);
            drawAnimateLine(document.querySelector("#line-e15-e17"),{ initWait: 1500, reverse: true },1,false);
            drawAnimateLine(document.querySelector("#line-q2-e16"),{ initWait: 1500 },1,false);
            drawAnimateLine(document.querySelector("#line-q2-q2a3e1"),{ initWait: 1500 },1,false);
            
            drawAnimateLine(document.querySelector("#line-q1a1-e8"),{ initWait: 1500 },0,false);
            drawAnimateLine(document.querySelector("#line-q1a1-e16"),{ initWait: 1500 },0,false);
            drawAnimateLine(document.querySelector("#line-q1a1-q3a2e1"),{ initWait: 1500 },0,false);

            drawAnimateLine(document.querySelector("#line-q3-e16"),{ initWait: 1500, reverse: true },1,false);
            drawAnimateLine(document.querySelector("#line-q3-q3a2e1"),{ initWait: 1500, reverse: true },1,false);

            drawAnimateLine(document.querySelector("#line-q3-q3a2e2"),{ initWait: 1500 },2,false);
        }
        else if(type == 5){
            /* Contorno del Cerebro */
            $("#line-e1-e2").fadeIn(2500);
            $("#line-e2-e3").fadeIn(2500);
            $("#line-e3-e5").fadeIn(2500);
            $("#line-e5-e7").fadeIn(2500);
            $("#line-q2a1e1-e7").fadeIn(2500);
            $("#line-q2a1e1-e14").fadeIn(2500);
            $("#line-e9-e14").fadeIn(2500);
            $("#line-e9-e15").fadeIn(2500);
            $("#line-e10-e15").fadeIn(2500);
            $("#line-e10-e12").fadeIn(2500);
            $("#line-e12-e13").fadeIn(2500);
            $("#line-q3a2e2-e13").fadeIn(2500);
            $("#line-q3a2e1-q3a2e2").fadeIn(2500);
            $("#line-q3a2e1-e8").fadeIn(2500);
            $("#line-q1a1e2-e8").fadeIn(2500);
            $("#line-q1a1e2-e1").fadeIn(2500);
            /* Fin Contorno del Cerebro */
        }
        else{
            /* Para reutilizar */
        }
    }

    function resetLines(){
        $("line").attr("class","hidden");
        $("line").attr("style","");
        $("line").attr('stroke-linecap', "round");
        $("line").attr('stroke-dasharray', "1,5");
    }

    function resetSingleLine(elem,time){
        $(elem).fadeOut(time);
        $(elem).attr("style","");
        $(elem).attr('stroke-linecap', "round");
        $(elem).attr('stroke-dasharray', "1,5");
    }

    function fixLineAnimated(elem,time){
        $(elem).attr("stroke-width",1);
        $(elem).attr("stroke-linecap","");
        $(elem).attr("stroke-dasharray","");
        $(elem).fadeIn(time);
        /*$(elem).attr("stroke-opacity",0.5);*/
    }


    $(document).on("click", "#bcover-btn-init", function(){
        $("#audio-intro").animate({volume: 0}, 2000);
        $("#audio-ruido").animate({volume: 0.1}, 2000);
        $(".click-text-bottom").hide();
        firstTransition();

        /* ELIMINAR */
        /*$(".point-elem").each(function() {
            var id = "<p style='color:white;font-size:11px;'>"+ $(this).attr("id") +"</p>";
            $(this).append(id);
        });*/

    });

    $(document).on("click", "#about-panel-close", function(){
        $(".about-main-container").fadeToggle(800);
    });

    /* Init SVG lines */
    initPolygon();
    initLines();

    function initPolygon(){

        var pointsArray = [
            { point: $("div[id^='e1-']"), type: 3 },
            { point: $("div[id^='e2-']"), type: 3 },
            { point: $("div[id^='e3-']"), type: 3 },
            { point: $("div[id^='e5-']"), type: 3 },
            { point: $("div[id^='e7-']"), type: 3 },
            { point: $("div[id^='q2a1e1-']"), type: 3 },
            { point: $("div[id^='e14-']"), type: 3 },
            { point: $("div[id^='e9-']"), type: 3 },
            { point: $("div[id^='e15-']"), type: 3 },
            { point: $("div[id^='e10-']"), type: 3 },
            { point: $("div[id^='e12-']"), type: 3 },
            { point: $("div[id^='e13-']"), type: 3 },
            { point: $("div[id^='q3a2e2-']"), type: 3 },
            { point: $("div[id^='q3a2e1-']"), type: 3 },
            { point: $("div[id^='e8-']"), type: 3 },
            { point: $("div[id^='q1a1e2-']"), type: 3 },
        ];

        var pointsStr = "";
        $.each(pointsArray, function(i,v){
            var pos = getRealPos(v.point,v.type);
            pointsStr += (""+pos.posX+","+pos.posY+" ");
            var localArray = [ pos.posX, pos.posY ];
            pointsArrayTotal.push(localArray);
        });

        var brain = document.createElementNS('http://www.w3.org/2000/svg','polygon');
        brain.setAttribute('id','brain-svg');
        brain.setAttribute('stroke', "transparent");
        brain.setAttribute('stroke-width', "0");
        brain.setAttribute('onclick', "changePoly(evt)");
        brain.setAttribute('points', pointsStr);
        $("svg").append(brain);
    }

    function changePoly(evt){
        /* Click en Polygon de cerebro */
    }

    function getRealPos(point,type){
        /* 1=Q, 2=A, 3=E */
        var offset = 20;
        
        if(type==2){ offset = 15; }
        else if(type==3){ offset = 9; }

        var posX = $(point).position().left + offset + 3;
        var posY = $(point).position().top + offset;

        return { posX: posX, posY: posY };
    }

    $(document).click(function(e) {
        var elem = e.target;
        var d = new Date();
        var n = d.getTime();
        
        var obj = { global_time: n, ref_time: ((n - initTime.getTime())/1000), pos: { x: e.clientX, y: e.clientY }, target: elem.className, target_id: elem.id };

        json.data.clicks.push(obj);
    });

    /*$(document).on("click", ":not(.cross-container,.info-border,.info-close,#about-info-container,.over-content.info,.info-container,.info-content,.cross-img,.about-info)", function() {
      $(".over-content.info").fadeOut(1000);
    });*/


    $(document).on("click", "#main-container", function(e){

        if($(e.target).attr("id") == "main-container" || $(e.target).attr("class") == "click-text" || $(e.target).attr("class") == "ext-img"){
            $(".tt-main-container").addClass("hidden");
            $("line").attr("class","hidden");
        }

        //Adentro del cerebro
        if(d3.polygonContains(pointsArrayTotal,[(e.pageX + 38),(e.pageY + 13)])){
            $("#waves1").show();
            $("#waves2").hide();
            $("#audio-atencion").animate({volume: 0}, 200);
            $("#audio-ruido").animate({volume: 0.1}, 200);

            $(".click-text-bottom.atencion").fadeIn(800);
            $(".click-text-bottom.ruido").fadeOut(800);

            fixLineAnimated($("#line-e1-e2"),1500);
            fixLineAnimated($("#line-e2-e3"),1500);
            fixLineAnimated($("#line-e3-e5"),1500);
            fixLineAnimated($("#line-e5-e7"),1500);
            fixLineAnimated($("#line-q2a1e1-e7"),1500);
            fixLineAnimated($("#line-q2a1e1-e14"),1500);
            fixLineAnimated($("#line-e9-e14"),1500);
            fixLineAnimated($("#line-e9-e15"),1500);
            fixLineAnimated($("#line-e10-e15"),1500);
            fixLineAnimated($("#line-e10-e12"),1500);
            fixLineAnimated($("#line-e12-e13"),1500);
            fixLineAnimated($("#line-q3a2e2-e13"),1500);
            fixLineAnimated($("#line-q3a2e1-q3a2e2"),1500);
            fixLineAnimated($("#line-q3a2e1-e8"),1500);
            fixLineAnimated($("#line-q1a1e2-e8"),1500);
            fixLineAnimated($("#line-q1a1e2-e1"),1500);
        }
        //Afuera del cerebro
        else{
            $("#waves2").show();
            $("#waves1").hide();
            $("#audio-atencion").animate({volume: 0.1}, 200);
            $("#audio-ruido").animate({volume: 0}, 200);

            $(".click-text-bottom.atencion").fadeOut(800);
            $(".click-text-bottom.ruido").fadeIn(800);

            $("#line-e1-e2").fadeOut(1500);
            $("#line-e2-e3").fadeOut(1500);
            $("#line-e3-e5").fadeOut(1500);
            $("#line-e5-e7").fadeOut(1500);
            $("#line-q2a1e1-e7").fadeOut(1500);
            $("#line-q2a1e1-e14").fadeOut(1500);
            $("#line-e9-e14").fadeOut(1500);
            $("#line-e9-e15").fadeOut(1500);
            $("#line-e10-e15").fadeOut(1500);
            $("#line-e10-e12").fadeOut(1500);
            $("#line-e12-e13").fadeOut(1500);
            $("#line-q3a2e2-e13").fadeOut(1500);
            $("#line-q3a2e1-q3a2e2").fadeOut(1500);
            $("#line-q3a2e1-e8").fadeOut(1500);
            $("#line-q1a1e2-e8").fadeOut(1500);
            $("#line-q1a1e2-e1").fadeOut(1500);
        }
    });

    /* Guión Transiciones */

    function firstTransition(){
        $(".points-mask").hide();
        $(".point-elem").addClass("hidden");
        $(".point-elem").css("z-index", "auto");
        $(".main-cover-container#cover-home").fadeToggle(1800);

        $("#line-e1-e2").fadeOut(1000);
        $("#line-e2-e3").fadeOut(1000);
        $("#line-e3-e5").fadeOut(1000);
        $("#line-e5-e7").fadeOut(1000);
        $("#line-q2a1e1-e7").fadeOut(1000);
        $("#line-q2a1e1-e14").fadeOut(1000);
        $("#line-e9-e14").fadeOut(1000);
        $("#line-e9-e15").fadeOut(1000);
        $("#line-e10-e15").fadeOut(1000);
        $("#line-e10-e12").fadeOut(1000);
        $("#line-e12-e13").fadeOut(1000);
        $("#line-q3a2e2-e13").fadeOut(1000);
        $("#line-q3a2e1-q3a2e2").fadeOut(1000);
        $("#line-q3a2e1-e8").fadeOut(1000);
        $("#line-q1a1e2-e8").fadeOut(1000);
        $("#line-q1a1e2-e1").fadeOut(1000);

        setTimeout(function(){
            fixLineAnimated($("#line-e1-e2"),1000);
            fixLineAnimated($("#line-e2-e3"),1000);
            fixLineAnimated($("#line-e3-e5"),1000);
            fixLineAnimated($("#line-e5-e7"),1000);
            fixLineAnimated($("#line-q2a1e1-e7"),1000);
            fixLineAnimated($("#line-q2a1e1-e14"),1000);
            fixLineAnimated($("#line-e9-e14"),1000);
            fixLineAnimated($("#line-e9-e15"),1000);
            fixLineAnimated($("#line-e10-e15"),1000);
            fixLineAnimated($("#line-e10-e12"),1000);
            fixLineAnimated($("#line-e12-e13"),1000);
            fixLineAnimated($("#line-q3a2e2-e13"),1000);
            fixLineAnimated($("#line-q3a2e1-q3a2e2"),1000);
            fixLineAnimated($("#line-q3a2e1-e8"),1000);
            fixLineAnimated($("#line-q1a1e2-e8"),1000);
            fixLineAnimated($("#line-q1a1e2-e1"),1000);
        },800);

        setTimeout(function(){
            coverTransition();
        }, 1000);
    }

    function coverTransition(){
        /* Revisar performance de esta transición */
        setTimeout(function(){
            $(".over-content.info").fadeToggle(1800);
        }, 1000);
        $(".about-container").fadeToggle(1800);
        $(".canvas-mask").fadeToggle(1800);
        $(".canvas-mask-net").fadeToggle(1800);
        $(".point-elem").fadeToggle(1800);

        $(".click-text-bottom.atencion").fadeIn(1800);

        /*var angle = 0;
        setInterval(function(){
            angle+=3;
            $(".question-img").rotate(angle);
        },20);*/

        setTimeout(function(){
            $(".over-content.info").fadeOut(1000);
        }, 15000);
    }


    /* Click Finalizar */
    $(document).on("click", "#finish-btn", function(e){
        $("#final-2").fadeOut(1000);
        $(".credits-container").hide();
        $(".content-p-init").hide();
        $(".about-right").css({ 'top':'0px', 'position':'relative' });
        $(".form-left-final").show();
        $(".form-right-final").show();
        $(".about-main-container").fadeIn(1000);

        $("#about-info-form").fadeIn(1000);

        setTimeout(function(){
            $(".point-elem.exterior").fadeIn(1500);
        }, 1000);
    });

    /* Click Volver */
    $(document).on("click", "#back-btn", function(e){
        $("#final-2").fadeOut(1500);

        $(".point-elem.exterior").fadeIn(2000);
    });

    /* Fin Guión Transiciones */

    function drawLine(origin,target,id,type_origin,type_target){
        /* 1=Q, 2=A, 3=E */
        var offset_origin = 20;
        var offset_target = 20;
        
        if(type_origin==2){ offset_origin = 15; }
        else if(type_origin==3){ offset_origin = 9; }

        if(type_target==2){ offset_target = 15; }
        else if(type_target==3){ offset_target = 9; }
        
        var posXOrigin = $(origin).position().left + offset_origin + 3;
        var posYOrigin = $(origin).position().top + offset_origin;

        var posXTarget = $(target).position().left + offset_target + 3;
        var posYTarget = $(target).position().top + offset_target;

        var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
        newLine.setAttribute('id',id);
        newLine.setAttribute('x1',posXOrigin);
        newLine.setAttribute('y1',posYOrigin);
        newLine.setAttribute('x2',posXTarget);
        newLine.setAttribute('y2', posYTarget);
        newLine.setAttribute('stroke', "#ffffff");
        newLine.setAttribute('stroke-width', "1");
        newLine.setAttribute('stroke-linecap', "round");
        newLine.setAttribute('stroke-dasharray', "1,5");
        newLine.setAttribute('class', "hidden");
        $("svg").append(newLine);
    }

    function onFinish(id) {
        alert('video has ended');
    }

    function mapCircle(str){
        if(str == "tt-q1a1"){ return 1; }
        else if(str == "tt-q1a2"){ return 2; }
        else if(str == "tt-q2a1"){ return 3; }
        else if(str == "tt-q2a2"){ return 4; }
        else if(str == "tt-q2a3"){ return 5; }
        else if(str == "tt-q3a1"){ return 6; }
        else if(str == "tt-q3a2"){ return 7; }
        else { return 0; }
    }

    $(".tt-answer").click(function(e) {

        var id = $(this).attr("video-id");
        $('.video-modal').html("<img id='video-modal-close' src='images/pregunta.svg'><iframe id='vimeo-player' src='https://player.vimeo.com/video/"+ id +"?color=00ff98&api=1&autoplay=1&title=0&byline=0&portrait=0' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
        
        var iframe = $('#vimeo-player')[0];
        var player = $f(iframe);
        player.api('play');
        
        player.addEvent('ready', function() {       
            player.addEvent('finish', onFinish);
        });

        var width = (window.innerWidth-160) + "px";
        var height = (window.innerHeight-160) + "px";

        $(".video-modal").css("display", "block");
        $(".video-modal").animate({
            width: width,
            height: height,
            margin: '0',
            padding: '80px',
        }, 800);
        $('#video-modal-close').fadeIn(500);

        $("#audio-atencion").trigger("pause");
        $("#audio-ruido").trigger("pause");
        $("#audio-atencion").prop("volume", 0);
        $("#audio-ruido").prop("volume", 0);

        globalCounter++;
        /*if(globalCounter == 1){
            json.data.circles.first_answer = mapCircle(e.currentTarget.id);
        }
        else if(globalCounter == 2){
            json.data.circles.second_answer = mapCircle(e.currentTarget.id);
        }
        else if(globalCounter == 3){
            json.data.circles.third_answer = mapCircle(e.currentTarget.id);
        }*/
    });

    $(".video-modal > iframe").click(function(e){
        e.stopPropagation(); 
    });

    $(".video-modal").click(function(){
        $('#video-modal-close').fadeOut(500);
        $("#audio-ruido").trigger("play");
        $("#audio-atencion").trigger("play");
        $("#audio-ruido").animate({volume: 0.1}, 200);

        var iframe = $('#vimeo-player')[0];
        var player = $f(iframe);
        player.api('pause');

        var mw = (window.innerWidth/2) + "px";
        var mh = (window.innerHeight/2) + "px";
        var mc = mh + " " + mw;
        $(".video-modal").animate({
            width: "0px",
            height: "0px",
            padding: "0px",
            margin: mc
        }, 800);

        fixRoute(lastClick);
    });

    $(document).on("click", ".info-border,.info-close,#about-info-container", function(e){
        $(".over-content.info").fadeToggle(1000);

        e.stopPropagation();
    });


    /* $(document).on("click", ".btn-ok", function(){
        if($("#city-input").val() == ""){
            $("#city-input").css("border","1px solid #F1002F");
        }
        else {
            $(".mask").fadeToggle(1200);
            $(".init-form-container").fadeToggle(1200); 

            json.data.name = $("#");
            json.data.email = $("#");
            json.data.age = $("input[name='age']:checked").val();
            json.data.gender = $("input[name='gender']:checked").val();
            json.data.country = $("#country-select option:selected").text();
            json.data.city = $("#city-input").val();
        }
    }); */

    $(document).on("click", ".btn-send", function(){
        if($("#input-email").val() != "" && !isValidEmailAddress($("#input-email").val())) {
            $("#input-email").css("border","1px solid #F1002F");
            $(".about-wrong").fadeToggle(400); 
            
        }
        else {
            $(".btn-send").hide();
            $(".about-flash").fadeToggle(400); 

            /*json.data.name = $("#");*/
            json.data.email = $("#input-email").val();
            json.data.explain = $("input[name='explain']:checked").val();
            json.data.age = $("input[name='age']:checked").val();
            json.data.gender = $("input[name='gender']:checked").val();
            json.data.country = $("#country-select option:selected").text();
            json.data.city = $("#city-input").val();
            json.data.comment = $("#comment-textarea").val();
            json.data.manifest = $("input[name='manifest']:checked").map(function() {return this.value;}).get().join(",");

            $.ajax({
              type: "POST",
              url: "/api/form",
              contentType: "application/json",
              data: JSON.stringify(json)
            })
            .done(function(msg) {
              console.log("Data Saved: " + msg);
            });
        }
    });

    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    };

    $(document).on("focus", "#input-email", function(){
        $("#input-email").css("border","1px solid white");
        $(".about-wrong").fadeOut(400);
    });

    $(document).on("click", "#about-info-square", function(e){
        $(".form-left-final").fadeOut(500);
        $(".form-right-final").fadeOut(500);

        setTimeout(function(){
            $(".about-right").css({ 'top':'89px', 'position':'absolute' });
            $(".credits-container").fadeIn(500);
            $(".content-p-init").fadeIn(500);
        }, 500);
        
        $(".about-main-container").fadeIn(800);

        e.stopPropagation();
    });

    $(document).on("click", "#about-info-form", function(e){
        $(".credits-container").fadeOut(500);
        $(".content-p-init").fadeOut(500);

        setTimeout(function(){
            $(".about-right").css({ 'top':'0px', 'position':'relative' });
            $(".form-left-final").fadeIn(500);
            $(".form-right-final").fadeIn(500);
        }, 500);
        
        $(".about-main-container").fadeIn(800);

        e.stopPropagation();
    });

    $(document).on("click", ".info-content", function(e){
        e.stopPropagation();
    });

    $("#about-info-square").hover(
      function() {
        $(".about-title").show("slide", { direction: "left" }, 400);
      }, function() {
        $(".about-title").hide("slide", { direction: "left" }, 400);
      }
    );

    /* Hover Cruces Exteriores - Audios */
    $(".ext-img").hover(
      function() {
        var id = $(this).attr("data-id");

        if(id == "0"){ $("#audio-perro")[0].play(); }
        else if(id == "1"){ $("#audio-estrella")[0].play(); }
        else if(id == "2"){ $("#audio-celular")[0].play(); }
        else if(id == "3"){ $("#audio-perro")[0].play(); }
        else if(id == "4"){ $("#audio-bici")[0].play(); }
        else if(id == "5"){ $("#audio-celular")[0].play(); }
        else if(id == "6"){ $("#audio-knock")[0].play(); }
        else if(id == "7"){ $("#audio-estrella")[0].play(); }
      }, function() {}
    );

    $(document).on("focus", "#city-input", function(){
        $("#city-input").css("border","1px solid white");
    });

    function dist(line){
        var x1 = line.x1.baseVal.value;
        var x2 = line.x2.baseVal.value;
        var y1 = line.y1.baseVal.value;
        var y2 = line.y2.baseVal.value;

        return Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
    }

    function drawAnimateLine(line, options, n, dashedOp) {

        var initWait = options.initWait || 500;

        setTimeout(function(){

            $(line).attr("class","");
            options = options || {}
            var duration = options.duration || 1000
            var dashed = dashedOp || false; 
            var easing = options.easing || 'ease-in-out'
            var reverse = options.reverse || false
            var undraw = options.undraw || false
            var callback = options.callback || function () {}
            var length = options.length || dist($(line).get(0))

            var dashOffsetStates = [length, 0]
            if (reverse) {
                dashOffsetStates = [length, 2 * length]
            }
            if (undraw) {
                dashOffsetStates.reverse()
            }

            line.style.transition = line.style.WebkitTransition = 'none';

            var dashArray = '';
            if(dashed){
                dashArray = line.style.strokeDasharray || line.getAttribute("stroke-dasharray");
            }

            if (dashArray != '') {
                var dashLength = dashArray.split(/[\s,]/).map(function (a) {
                    return parseFloat(a) || 0
                }).reduce(function (a, b) {
                    return a + b
                })
                var dashCount = length / dashLength + 1
                var a = new Array(Math.ceil(dashCount)).join(dashArray + " ")
                line.style.strokeDasharray = a + '0' + ' ' + length
            } else {
                line.style.strokeDasharray = length + ' ' + length;
            }
            line.style.strokeDashoffset = dashOffsetStates[0];
            line.getBoundingClientRect();
            line.style.transition = line.style.WebkitTransition =
                'stroke-dashoffset ' + duration + 'ms ' + easing;
            line.style.strokeDashoffset = dashOffsetStates[1]
            setTimeout(function() {
                if(dashed){
                    line.style.strokeDasharray = dashArray;
                }
                else {
                    $(line).attr("style","display:inline;animation:none;");
                    $(line).attr("stroke-width",1);
                    $(line).attr("stroke-linecap","");
                    $(line).attr("stroke-dasharray","");
                }
                callback()
            }, duration)

        }, ((n*1000)+initWait));
    }


    /* Rutas */

    /* Pregunta 1 */
    $("#q1-l29t44").on("click", function(){
        clickQ1();
    });

    function clickQ1(){
        if(!readyQ1 && $(".tt-q1-container").hasClass("hidden")){
            /* Animation first click */
            $(".tt-main-container").addClass("hidden");

            $("#tt-q1a1").hide();
            $("#tt-q1a2").hide();

            $(".tt-q1-container").removeClass("hidden");

            $("line").attr("class","hidden");

            setTimeout(function(){
                /* Respuesta 1 */
                drawAnimateLine(document.querySelector("#line-q1-q1a1e1"),{},0,true);
                drawAnimateLine(document.querySelector("#line-q2a3-q1a1e1"),{ reverse: true },1,true);

                /* Respuesta 2 */
                drawAnimateLine(document.querySelector("#line-q1-q1a2e1"),{},0,true);
                drawAnimateLine(document.querySelector("#line-q1a2-q1a2e1"),{ reverse: true },1,true);
                drawAnimateLine(document.querySelector("#line-q2-q1a2"),{ reverse: true },2,true);
                drawAnimateLine(document.querySelector("#line-q2-q3a1"),{},3,true);

                setTimeout(function(){
                    $("#tt-q1a1").fadeIn(700);
                }, 2000);
                setTimeout(function(){
                    $("#tt-q1a2").fadeIn(700);
                }, 4000);

            }, 500);
            /* Fin Animation first click */
        }
        else {
            $(".tt-main-container").addClass("hidden");
            $(".tt-q1-container").removeClass("hidden");

            $("line").attr("class","hidden");

            /* Respuesta 1 */
            $("#line-q1-q1a1e1").attr("class","");
            $("#line-q2a3-q1a1e1").attr("class","");

            /* Respuesta 2 */
            $("#line-q1-q1a2e1").attr("class","");
            $("#line-q1a2-q1a2e1").attr("class","");
            $("#line-q2-q1a2").attr("class","");
            $("#line-q2-q3a1").attr("class","");
        }
        

        /*$("#q1-l29t44").off("click");

        $("#q1-l29t44").on("click", function(){
            
        }); */
    }

    /* Pregunta 2 */
    $("#q2-l55t53").on("click", function(){
        clickQ2();
    });

    function clickQ2(){
        if(!readyQ2 && $(".tt-q2-container").hasClass("hidden")){
            /* Animation first click */
            $(".tt-main-container").addClass("hidden");

            $("#tt-q2a1").hide();
            $("#tt-q2a2").hide();
            $("#tt-q2a3").hide();

            $(".tt-q2-container").removeClass("hidden");

            $("line").attr("class","hidden");

            setTimeout(function(){
                /* Respuesta 1 */
                drawAnimateLine(document.querySelector("#line-q2-q2a2"),{},0,true);
                /* Respuesta 2 */
                drawAnimateLine(document.querySelector("#line-q2-q1a2e1"),{},0,true);
                drawAnimateLine(document.querySelector("#line-q2a1-q1a2e1"),{ reverse: true },1,true);
                /* Respuesta 3 */
                drawAnimateLine(document.querySelector("#line-q2-q3a2"),{},0,true);

                setTimeout(function(){
                    $("#tt-q2a1").fadeIn(700);
                }, 1000);
                setTimeout(function(){
                    $("#tt-q2a2").fadeIn(700);
                }, 2000);
                setTimeout(function(){
                    $("#tt-q2a3").fadeIn(700);
                }, 1000);

            }, 500);
            /* Fin Animation first click */
        }
        else {
            $(".tt-main-container").addClass("hidden");
            $(".tt-q2-container").removeClass("hidden");

            $("line").attr("class","hidden");

            /* Respuesta 1 */
            $("#line-q2-q2a2").attr("class","");
            /* Respuesta 2 */
            $("#line-q2-q1a2e1").attr("class","");
            $("#line-q2a1-q1a2e1").attr("class","");
            /* Respuesta 3 */
            $("#line-q2-q3a2").attr("class","");
        }
        

        /*$("#q2-l55t53").off("click");

        $("#q2-l55t53").on("click", function(){
            
        }); */
    }


    /* Pregunta 3 */
    $("#q3-l68t37").on("click", function(){
        clickQ3();
    });

    function clickQ3(){
        if(!readyQ3 && $(".tt-q3-container").hasClass("hidden")){
            /* Animation first click */
            $(".tt-main-container").addClass("hidden");

            $("#tt-q3a1").hide();
            $("#tt-q3a2").hide();

            $(".tt-q3-container").removeClass("hidden");

            $("line").attr("class","hidden");

            setTimeout(function(){

                /* Respuesta 1 */
                drawAnimateLine(document.querySelector("#line-q3-q1a1"),{},0,true);
                /* Respuesta 2 */
                drawAnimateLine(document.querySelector("#line-q3-q3a1"),{},0,true);
                drawAnimateLine(document.querySelector("#line-q3a1-q3a2"),{},1,true);
                drawAnimateLine(document.querySelector("#line-q3a2-e17"),{},2,true);
                drawAnimateLine(document.querySelector("#line-q1a2-e17"),{ reverse: true },3,true);


                setTimeout(function(){
                    $("#tt-q3a1").fadeIn(700);
                }, 1000);
                setTimeout(function(){
                    $("#tt-q3a2").fadeIn(700);
                }, 4000);

            }, 500);
            /* Fin Animation first click */
        }
        else {
            $(".tt-main-container").addClass("hidden");
            $(".tt-q3-container").removeClass("hidden");

            $("line").attr("class","hidden");

            /* Respuesta 1 */
            $("#line-q3-q1a1").attr("class","");
            /* Respuesta 2 */
            $("#line-q3-q3a1").attr("class","");
            $("#line-q3a1-q3a2").attr("class","");
            $("#line-q3a2-e17").attr("class","");
            $("#line-q1a2-e17").attr("class","");
        }
        

        /*$("#q3-l68t37").off("click");

        $("#q3-l68t37").on("click", function(){
            
        }); */
    }

    /* Fin Rutas */

    /* ******************************** */

    /* Fijar Rutas */

    function fixRoute(type){
        /* Q1A1 */
        if(type == 1 && !route1){
            $("#img-q1").attr("src", "images/pregunta_verde.png");
            $("#img-q2a3").attr("src", "images/respuesta_verde.png");

            /* Respuesta 1 */
            fixLine($("#line-q1-q1a1e1"));
            fixLine($("#line-q2a3-q1a1e1"));

            // Extras 
            drawAnimateLine(document.querySelector("#line-q2a3-q1a1"),{},0,false);
            drawAnimateLine(document.querySelector("#line-q2a3-q2a3e1"),{},0,false);
            drawAnimateLine(document.querySelector("#line-q2a3-q1a1e2"),{},0,false);
            drawAnimateLine(document.querySelector("#line-q2a3-e8"),{},0,false);
            drawAnimateLine(document.querySelector("#line-q1a1e1-e1"),{},0,false);

            drawAnimateLine(document.querySelector("#line-q1a1-q2a3e1"),{},1,false);

            readyQ1 = true;
            route1 = true;


        }
        /* Q1A2 */
        else if(type == 2 && !route2){
            $("#img-q1").attr("src", "images/pregunta_verde.png");
            $("#img-q3a1").attr("src", "images/respuesta_verde.png");

            /* Respuesta 2 */
            fixLine($("#line-q1-q1a2e1"));
            fixLine($("#line-q1a2-q1a2e1"));
            fixLine($("#line-q2-q1a2"));
            fixLine($("#line-q2-q3a1"));

            /* Extras */
            drawAnimateLine(document.querySelector("#line-q3a1-e11"),{},0,false);
            drawAnimateLine(document.querySelector("#line-q3a1-e16"),{},0,false);

            drawAnimateLine(document.querySelector("#line-q2a3e1-e16"),{ reverse: true },1,false);
            drawAnimateLine(document.querySelector("#line-q3a2e2-e11"),{ reverse: true },1,false);
            drawAnimateLine(document.querySelector("#line-e11-e13"),{},1,false);
            drawAnimateLine(document.querySelector("#line-e12-e11"),{ reverse: true },1,false);

            readyQ1 = true;
            route2 = true;
        }
        /* Q2A1 */
        else if(type == 3 && !route3){
            $("#img-q2").attr("src", "images/pregunta_verde.png");
            $("#img-q2a2").attr("src", "images/respuesta_verde.png");

            /* Respuesta 1 */
            fixLine($("#line-q2-q2a2"));

            /* Extras */
            drawAnimateLine(document.querySelector("#line-q2a2-q1a1e1"),{},0,false);
            drawAnimateLine(document.querySelector("#line-q2a2-q2a3e1"),{},0,false);
            drawAnimateLine(document.querySelector("#line-q1-q2a2"),{ reverse: true },0,false);

            drawAnimateLine(document.querySelector("#line-q1-e2"),{},1,false);
            drawAnimateLine(document.querySelector("#line-q1a1e1-e2"),{},1,false);
            readyQ2 = true;
            route3 = true;
        }
        /* Q2A2 */
        else if(type == 4 && !route4){
            $("#img-q2").attr("src", "images/pregunta_verde.png");
            $("#img-q2a1").attr("src", "images/respuesta_verde.png");

            /* Respuesta 2 */
            fixLine($("#line-q2-q1a2e1"));
            fixLine($("#line-q2a1-q1a2e1"));

            /* Extras */
            drawAnimateLine(document.querySelector("#line-q2a1-e4"),{},0,false);
            drawAnimateLine(document.querySelector("#line-q2a1-e5"),{},0,false);

            drawAnimateLine(document.querySelector("#line-q1-e4"),{ reverse: true },1,false);
            drawAnimateLine(document.querySelector("#line-e4-e5"),{},1,false);
            drawAnimateLine(document.querySelector("#line-e3-e4"),{ reverse: true },1,false);

            drawAnimateLine(document.querySelector("#line-q1-e3"),{},2,false);

            readyQ2 = true;
            route4 = true;
        }
        /* Q2A3 */
        else if(type == 5 && !route5){
            $("#img-q2").attr("src", "images/pregunta_verde.png");
            $("#img-q3a2").attr("src", "images/respuesta_verde.png");

            /* Respuesta 3 */
            fixLine($("#line-q2-q3a2"));

            /* Extras */
            drawAnimateLine(document.querySelector("#line-q3a2-e10"),{},0,false);
            drawAnimateLine(document.querySelector("#line-q3a2-e12"),{},0,false);

            drawAnimateLine(document.querySelector("#line-e9-e17"),{ reverse: true },1,false);
            drawAnimateLine(document.querySelector("#line-e15-e17"),{ reverse: true },1,false);
            drawAnimateLine(document.querySelector("#line-q2-e16"),{},1,false);
            drawAnimateLine(document.querySelector("#line-q2-q2a3e1"),{},1,false);

            readyQ2 = true;
            route5 = true;
        }
        /* Q3A1 */
        else if(type == 6 && !route6){
            $("#img-q3").attr("src", "images/pregunta_verde.png");
            $("#img-q1a1").attr("src", "images/respuesta_verde.png");

            /* Respuesta 1 */
            fixLine($("#line-q3-q1a1"));

            /* Extras */
            drawAnimateLine(document.querySelector("#line-q1a1-e8"),{},0,false);
            drawAnimateLine(document.querySelector("#line-q1a1-e16"),{},0,false);
            drawAnimateLine(document.querySelector("#line-q1a1-q3a2e1"),{},0,false);

            drawAnimateLine(document.querySelector("#line-q3-e16"),{ reverse: true },1,false);
            drawAnimateLine(document.querySelector("#line-q3-q3a2e1"),{ reverse: true },1,false);

            drawAnimateLine(document.querySelector("#line-q3-q3a2e2"),{},2,false);

            readyQ3 = true;
            route6 = true;
        }
        /* Q3A2 */
        else if(type == 7 && !route7){
            $("#img-q3").attr("src", "images/pregunta_verde.png");
            $("#img-q1a2").attr("src", "images/respuesta_verde.png");

            /* Respuesta 2 */
            fixLine($("#line-q3-q3a1"));
            fixLine($("#line-q3a1-q3a2"));
            fixLine($("#line-q3a2-e17"));
            fixLine($("#line-q1a2-e17"));

            /* Extras */
            drawAnimateLine(document.querySelector("#line-q1a2-q2a1e1"),{},0,false);
            drawAnimateLine(document.querySelector("#line-q1a2-e14"),{},0,false);

            drawAnimateLine(document.querySelector("#line-q1a2e1-q2a1e1"),{ reverse: true },1,false);
            drawAnimateLine(document.querySelector("#line-q2a1-e7"),{ reverse: true },1,false);

            drawAnimateLine(document.querySelector("#line-q2a2-q1a2e1"),{ reverse: true },2,false);

            readyQ3 = true;
            route7 = true;
        }

        if(route1 && route2){
            $(".tt-q1-container").addClass("hidden");
        }
        if(route3 && route4 && route5){
            $(".tt-q2-container").addClass("hidden");
        }
        if(route6 && route7){
            $(".tt-q3-container").addClass("hidden");
        }   

        if(readyQ1 && readyQ2 && readyQ3){
            $(".tt-main-container").addClass("hidden");

            $("line").attr("stroke-width",1);
            $("line").attr("stroke-linecap","");
            $("line").css("stroke-linecap","");
            $("line").attr("stroke-dasharray","");
            $("line").css("stroke-dasharray","");

            $("line").filter(function() { return $(this).css("display") == "none" }).fadeToggle(5000);
            
            $("video").fadeOut(5000);

            $(".point-elem.exterior").fadeOut(5000);

            $(".click-text-bottom").fadeOut(5000);

            setTimeout(function(){  
                $("#final-1").fadeToggle(2500);
                setTimeout(function(){
                    $("#final-1").fadeToggle(2500);
                    $("#final-2").fadeToggle(2500);
                }, 10000);
            }, 6000)
        }
    }

    /* Pregunta 1 */
    $(document).on("click", "#tt-q1a1", function(e){
        lastClick = 1;
        if(!readyQ1){ json.data.circles.first_answer = 1; }
        /*$(".tt-q1-container").css("display","none");*/
    });

    /* Pregunta 2 */
    $(document).on("click", "#tt-q1a2", function(e){
        lastClick = 2;
        if(!readyQ1){ json.data.circles.first_answer = 2; }
        /*$(".tt-q1-container").css("display","none");*/
    });

    /* Pregunta 3 */
    $(document).on("click", "#tt-q2a1", function(e){
        lastClick = 3;
        if(!readyQ2){ json.data.circles.second_answer = 3; }
        /*$(".tt-q2-container").css("display","none");*/
    });

    /* Pregunta 4 */
    $(document).on("click", "#tt-q2a2", function(e){
        lastClick = 4;
        if(!readyQ2){ json.data.circles.second_answer = 4; }
        /*$(".tt-q2-container").css("display","none");*/
    });

    /* Pregunta 5 */
    $(document).on("click", "#tt-q2a3", function(e){
        lastClick = 5;
        if(!readyQ2){ json.data.circles.second_answer = 5; }
        /*$(".tt-q2-container").css("display","none");*/
    });

    /* Pregunta 6 */
    $(document).on("click", "#tt-q3a1", function(e){
        lastClick = 6;
        if(!readyQ3){ json.data.circles.third_answer = 6; }
        /*$(".tt-q3-container").css("display","none");*/
    });

    /* Pregunta 7 */
    $(document).on("click", "#tt-q3a2", function(e){
        lastClick = 7;
        if(!readyQ3){ json.data.circles.third_answer = 7; }
        /*$(".tt-q3-container").css("display","none");*/
    });

    /* Fin Fijar Rutas */

    /* ****************************** */

    function fixLine(elem){
        $(elem).attr("style","display:inline;animation:none;");
        $(elem).attr("stroke-width",1);
        $(elem).attr("stroke-linecap","");
        $(elem).attr("stroke-dasharray","");
        /*$(elem).attr("stroke-opacity",0.5);*/
    }

    /* Init de Líneas */
    /* 1=Q, 2=A, 3=E */

    function initLines(){

        drawLine($("div[id^='q1-']"),$("div[id^='q1a1e1-']"), "line-q1-q1a1e1", 1, 3);
        drawLine($("div[id^='q1-']"),$("div[id^='q1a2e1-']"), "line-q1-q1a2e1", 1, 3);
        drawLine($("div[id^='q1-']"),$("div[id^='q2a2-']"), "line-q1-q2a2", 1, 2);
        drawLine($("div[id^='q1-']"),$("div[id^='e2-']"), "line-q1-e2", 1, 3);
        drawLine($("div[id^='q1-']"),$("div[id^='e3-']"), "line-q1-e3", 1, 3);
        drawLine($("div[id^='q1-']"),$("div[id^='e4-']"), "line-q1-e4", 1, 3);

        
        drawLine($("div[id^='q2-']"),$("div[id^='q1a2-']"), "line-q2-q1a2", 1, 2);
        drawLine($("div[id^='q2-']"),$("div[id^='q2a2-']"), "line-q2-q2a2", 1, 2);
        drawLine($("div[id^='q2-']"),$("div[id^='q3a1-']"), "line-q2-q3a1", 1, 2);
        drawLine($("div[id^='q2-']"),$("div[id^='q3a2-']"), "line-q2-q3a2", 1, 2);
        drawLine($("div[id^='q2-']"),$("div[id^='q2a3e1-']"), "line-q2-q2a3e1", 1, 3);
        drawLine($("div[id^='q2-']"),$("div[id^='q1a2e1-']"), "line-q2-q1a2e1", 1, 3);
        drawLine($("div[id^='q2-']"),$("div[id^='e16-']"), "line-q2-e16", 1, 3);

        
        drawLine($("div[id^='q3-']"),$("div[id^='q1a1-']"), "line-q3-q1a1", 1, 2);
        drawLine($("div[id^='q3-']"),$("div[id^='q3a2e1-']"), "line-q3-q3a2e1", 1, 3);
        drawLine($("div[id^='q3-']"),$("div[id^='q3a1-']"), "line-q3-q3a1", 1, 2);
        drawLine($("div[id^='q3-']"),$("div[id^='e16-']"), "line-q3-e16", 1, 3);
        drawLine($("div[id^='q3-']"),$("div[id^='q3a2e2-']"), "line-q3-q3a2e2", 1, 3);


        drawLine($("div[id^='q2a1-']"),$("div[id^='q1a2e1-']"), "line-q2a1-q1a2e1", 2, 3);
        drawLine($("div[id^='q2a1-']"),$("div[id^='e4-']"), "line-q2a1-e4", 2, 3);
        drawLine($("div[id^='q2a1-']"),$("div[id^='e5-']"), "line-q2a1-e5", 2, 3);
        drawLine($("div[id^='q2a1-']"),$("div[id^='e7-']"), "line-q2a1-e7", 2, 3);

        
        drawLine($("div[id^='q1a2-']"),$("div[id^='q1a2e1-']"), "line-q1a2-q1a2e1", 2, 3);
        drawLine($("div[id^='q1a2-']"),$("div[id^='q2a1e1-']"), "line-q1a2-q2a1e1", 2, 3);
        drawLine($("div[id^='q1a2-']"),$("div[id^='e14-']"), "line-q1a2-e14", 2, 3);
        drawLine($("div[id^='q1a2-']"),$("div[id^='e17-']"), "line-q1a2-e17", 2, 3);


        drawLine($("div[id^='q2a2-']"),$("div[id^='q1a1e1-']"), "line-q2a2-q1a1e1", 2, 3);
        drawLine($("div[id^='q2a2-']"),$("div[id^='q2a3e1-']"), "line-q2a2-q2a3e1", 2, 3);
        drawLine($("div[id^='q2a2-']"),$("div[id^='q1a2e1-']"), "line-q2a2-q1a2e1", 2, 3);


        drawLine($("div[id^='q2a3-']"),$("div[id^='q1a1e1-']"), "line-q2a3-q1a1e1", 2, 3);
        drawLine($("div[id^='q2a3-']"),$("div[id^='q1a1e2-']"), "line-q2a3-q1a1e2", 2, 3);
        drawLine($("div[id^='q2a3-']"),$("div[id^='q2a3e1-']"), "line-q2a3-q2a3e1", 2, 3);
        drawLine($("div[id^='q2a3-']"),$("div[id^='q1a1-']"), "line-q2a3-q1a1", 2, 2);
        drawLine($("div[id^='q2a3-']"),$("div[id^='e8-']"), "line-q2a3-e8", 2, 3);


        drawLine($("div[id^='q1a1-']"),$("div[id^='e8-']"), "line-q1a1-e8", 2, 3);
        drawLine($("div[id^='q1a1-']"),$("div[id^='e16-']"), "line-q1a1-e16", 2, 3);
        drawLine($("div[id^='q1a1-']"),$("div[id^='q3a2e1-']"), "line-q1a1-q3a2e1", 2, 3);
        drawLine($("div[id^='q1a1-']"),$("div[id^='q2a3e1-']"), "line-q1a1-q2a3e1", 2, 3);


        drawLine($("div[id^='q3a1-']"),$("div[id^='q3a2-']"), "line-q3a1-q3a2", 2, 2);
        drawLine($("div[id^='q3a1-']"),$("div[id^='e11-']"), "line-q3a1-e11", 2, 3);
        drawLine($("div[id^='q3a1-']"),$("div[id^='e16-']"), "line-q3a1-e16", 2, 3);


        drawLine($("div[id^='q3a2-']"),$("div[id^='e10-']"), "line-q3a2-e10", 2, 3);
        drawLine($("div[id^='q3a2-']"),$("div[id^='e12-']"), "line-q3a2-e12", 2, 3);
        drawLine($("div[id^='q3a2-']"),$("div[id^='e17-']"), "line-q3a2-e17", 2, 3);


        drawLine($("div[id^='q1a1e1-']"),$("div[id^='e1-']"), "line-q1a1e1-e1", 3, 3);
        drawLine($("div[id^='q1a1e1-']"),$("div[id^='e2-']"), "line-q1a1e1-e2", 3, 3);
        drawLine($("div[id^='q1a1e1-']"),$("div[id^='q1a1e2-']"), "line-q1a1e1-q1a1e2", 3, 3);


        drawLine($("div[id^='q1a2e1-']"),$("div[id^='q2a1e1-']"), "line-q1a2e1-q2a1e1", 3, 3);


        drawLine($("div[id^='q2a1e1-']"),$("div[id^='e7-']"), "line-q2a1e1-e7", 3, 3);
        drawLine($("div[id^='q2a1e1-']"),$("div[id^='e14-']"), "line-q2a1e1-e14", 3, 3);


        drawLine($("div[id^='q2a3e1-']"),$("div[id^='e16-']"), "line-q2a3e1-e16", 3, 3);


        drawLine($("div[id^='q1a1e2-']"),$("div[id^='e1-']"), "line-q1a1e2-e1", 3, 3);
        drawLine($("div[id^='q1a1e2-']"),$("div[id^='e8-']"), "line-q1a1e2-e8", 3, 3);


        drawLine($("div[id^='q3a2e1-']"),$("div[id^='q3a2e2-']"), "line-q3a2e1-q3a2e2", 3, 3);
        drawLine($("div[id^='q3a2e1-']"),$("div[id^='e8-']"), "line-q3a2e1-e8", 3, 3);


        drawLine($("div[id^='q3a2e2-']"),$("div[id^='e11-']"), "line-q3a2e2-e11", 3, 3);
        drawLine($("div[id^='q3a2e2-']"),$("div[id^='e13-']"), "line-q3a2e2-e13", 3, 3);


        drawLine($("div[id^='e1-']"),$("div[id^='e2-']"), "line-e1-e2", 3, 3);
        drawLine($("div[id^='e2-']"),$("div[id^='e3-']"), "line-e2-e3", 3, 3);
        drawLine($("div[id^='e3-']"),$("div[id^='e5-']"), "line-e3-e5", 3, 3);
        drawLine($("div[id^='e3-']"),$("div[id^='e4-']"), "line-e3-e4", 3, 3);
        drawLine($("div[id^='e4-']"),$("div[id^='e5-']"), "line-e4-e5", 3, 3);
        drawLine($("div[id^='e5-']"),$("div[id^='e7-']"), "line-e5-e7", 3, 3);
        drawLine($("div[id^='e9-']"),$("div[id^='e14-']"), "line-e9-e14", 3, 3);
        drawLine($("div[id^='e9-']"),$("div[id^='e15-']"), "line-e9-e15", 3, 3);
        drawLine($("div[id^='e9-']"),$("div[id^='e17-']"), "line-e9-e17", 3, 3);
        drawLine($("div[id^='e10-']"),$("div[id^='e12-']"), "line-e10-e12", 3, 3);
        drawLine($("div[id^='e10-']"),$("div[id^='e15-']"), "line-e10-e15", 3, 3);
        drawLine($("div[id^='e12-']"),$("div[id^='e11-']"), "line-e12-e11", 3, 3);
        drawLine($("div[id^='e12-']"),$("div[id^='e13-']"), "line-e12-e13", 3, 3);
        drawLine($("div[id^='e11-']"),$("div[id^='e13-']"), "line-e11-e13", 3, 3);
        drawLine($("div[id^='e15-']"),$("div[id^='e17-']"), "line-e15-e17", 3, 3);

    }

});

