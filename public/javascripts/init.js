var audio = document.querySelector('audio');
audio.volume = 0.3;

var widthFixed = window.innerWidth*2;
var heightFixed = window.innerHeight/7;

var siriWave1 = new SiriWave({
    container: document.getElementById('siri-container-1'),
    width: widthFixed,
    height: heightFixed,
    color: '#050096',
    autostart: true,
    speed: 0.01,
    amplitude: 0.7,
    frequency: 30,
    top: 0
});

var siriWave2 = new SiriWave({
    container: document.getElementById('siri-container-2'),
    width: widthFixed,
    height: heightFixed,
    color: '#00ff98',
    autostart: true,
    speed: 0.03,
    amplitude: 0.7,
    frequency: 40,
    top: heightFixed
});

var siriWave3 = new SiriWave({
    container: document.getElementById('siri-container-3'),
    width: widthFixed,
    height: heightFixed,
    color: '#0fe6f0',
    autostart: true,
    speed: 0.04,
    amplitude: 0.7,
    frequency: 20,
    top: heightFixed*2
});

var siriWave4 = new SiriWave({
    container: document.getElementById('siri-container-4'),
    width: widthFixed,
    height: heightFixed,
    color: '#5a5fff',
    autostart: true,
    speed: 0.01,
    amplitude: 0.7,
    frequency: 15,
    top: heightFixed*3
});

var siriWave5 = new SiriWave({
    container: document.getElementById('siri-container-5'),
    width: widthFixed,
    height: heightFixed,
    color: '#050096',
    autostart: true,
    speed: 0.06,
    amplitude: 1,
    frequency: 35,
    top: heightFixed*4
});

var siriWave6 = new SiriWave({
    container: document.getElementById('siri-container-6'),
    width: widthFixed,
    height: heightFixed,
    color: '#00ff98',
    autostart: true,
    speed: 0.02,
    amplitude: 0.7,
    frequency: 25,
    top: heightFixed*5
});

var siriWave7 = new SiriWave({
    container: document.getElementById('siri-container-7'),
    width: widthFixed,
    height: heightFixed,
    color: '#0fe6f0',
    autostart: true,
    speed: 0.01,
    amplitude: 0.7,
    frequency: 30,
    top: heightFixed*6
});

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

    var count = 0;
    $( "#slider-vertical" ).slider({
      orientation: "vertical",
      range: "min",
      step: 1,
      min: 0,
      max: 100,
      value: 30,
      slide: function( event, ui ) {
        document.querySelector('audio').volume = (ui.value / 100);

        if(ui.value > 60 && count==0){
            count++;
            coverTransition();
            initLines();
        }
      }
    });

    function coverTransition(){
        siriWave5.setAmplitude(0.7);
        $("canvas").addClass("init");

        $(".cover-container").fadeToggle(1800);

        window.setTimeout($(".points-layer").fadeToggle(1800), 1000);
        window.setTimeout($(".about-container").fadeToggle(1800), 2000);
        window.setTimeout($(".wave-container:not(#siri-container-5)").fadeToggle(1800), 3000);
    }

    function drawLine(origin,target,id,type_origin,type_target){
        /* 1=Q, 2=A, 3=E */
        var offset_origin = 20;
        var offset_target = 20;
        
        if(type_origin==2){ offset_origin = 15; }
        else if(type_origin==3){ offset_origin = 10; }

        if(type_target==2){ offset_target = 15; }
        else if(type_target==3){ offset_target = 10; }
        
        var posXOrigin = $(origin).position().left + offset_origin;
        var posYOrigin = $(origin).position().top + offset_origin;

        var posXTarget = $(target).position().left + offset_target;
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
        /*newLine.setAttribute('class', "hidden");*/
        $("svg").append(newLine);
    }

    function onFinish(id) {
        alert('video has ended');
    }

    $(".tt-answer").click(function() {

        var id = $(this).attr("video-id");
        $('.video-modal').html("<iframe id='vimeo-player' src='https://player.vimeo.com/video/"+ id +"?color=00ff98&api=1&autoplay=1' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
        
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
    });

    $(".video-modal > iframe").click(function(e){
        e.stopPropagation(); 
    });

    $(".video-modal").click(function(){
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
    });


    /* Rutas */

    /* Pregunta 1 */
    $(document).on("click", "#q1-l20t50", function(){
        $(".tt-main-container").addClass("hidden");
        $(".tt-q1-container").removeClass("hidden");

        $("line").attr("class","hidden");

        /* Respuesta 1 */
        $("#line-q1-q1a1e1").attr("class","");
        $("#line-q1a1e1-q1a1e2").attr("class","");
        $("#line-q1a1-q1a1e2").attr("class","");
        /* Respuesta 2 */
        $("#line-q1-q1a2e1").attr("class","");
        $("#line-q1a2-q1a2e1").attr("class","");
    });

    /* Pregunta 2 */
    $(document).on("click", "#q2-l55t60", function(){
        $(".tt-main-container").addClass("hidden");
        $(".tt-q2-container").removeClass("hidden");

        $("line").attr("class","hidden");

        /* Respuesta 1 */
        $("#line-q2-q2a1e1").attr("class","");
        /* Respuesta 2 */
        $("#line-q2-q2a2").attr("class","");
        $("#line-q1a2e1-q2a1e1").attr("class","");
        $("#line-q2a1-q1a2e1").attr("class","");
        /* Respuesta 3 */
        $("#line-q2-q2a3e1").attr("class","");
        $("#line-q1a1e2-q2a3e1").attr("class","");
        $("#line-q2a3-q1a1e2").attr("class","");
    });

    /* Pregunta 3 */
    $(document).on("click", "#q3-l85t23", function(){
        $(".tt-main-container").addClass("hidden");
        $(".tt-q3-container").removeClass("hidden");

        $("line").attr("class","hidden");

        /* Respuesta 1 */
        $("#line-q3-q3a1").attr("class","");
        /* Respuesta 2 */
        $("#line-q3-q3a2e1").attr("class","");
        $("#line-q3a2e1-q3a2e2").attr("class","");
        $("#line-q3a2-q3a2e2").attr("class","");

    });


    /* Init de Líneas */
    /* 1=Q, 2=A, 3=E */

    function initLines(){

        drawLine($("div[id^='q1-']"),$("div[id^='q1a1e1-']"), "line-q1-q1a1e1", 1, 3);
        drawLine($("div[id^='q1-']"),$("div[id^='q1a2e1-']"), "line-q1-q1a2e1", 1, 3);
        drawLine($("div[id^='q1-']"),$("div[id^='q2a1-']"), "line-q1-q2a1", 1, 2);
        drawLine($("div[id^='q1-']"),$("div[id^='q2a2-']"), "line-q1-q2a2", 1, 2);
        drawLine($("div[id^='q1-']"),$("div[id^='e1-']"), "line-q1-e1", 1, 3);
        drawLine($("div[id^='q1-']"),$("div[id^='e2-']"), "line-q1-e2", 1, 3);
        drawLine($("div[id^='q1-']"),$("div[id^='e3-']"), "line-q1-e3", 1, 3);
        drawLine($("div[id^='q1-']"),$("div[id^='e4-']"), "line-q1-e4", 1, 3);

        
        drawLine($("div[id^='q2-']"),$("div[id^='q1a1-']"), "line-q2-q1a1", 1, 2);
        drawLine($("div[id^='q2-']"),$("div[id^='q2a2-']"), "line-q2-q2a2", 1, 2);
        drawLine($("div[id^='q2-']"),$("div[id^='q3a2e2-']"), "line-q2-q3a2e2", 1, 3);
        drawLine($("div[id^='q2-']"),$("div[id^='q3a2-']"), "line-q2-q3a2", 1, 2);
        drawLine($("div[id^='q2-']"),$("div[id^='e9-']"), "line-q2-e9", 1, 3);
        drawLine($("div[id^='q2-']"),$("div[id^='q2a1e1-']"), "line-q2-q2a1e1", 1, 3);
        drawLine($("div[id^='q2-']"),$("div[id^='q2a3e1-']"), "line-q2-q2a3e1", 1, 3);

        
        drawLine($("div[id^='q3-']"),$("div[id^='e8-']"), "line-q3-e8", 1, 3);
        drawLine($("div[id^='q3-']"),$("div[id^='q1a1-']"), "line-q3-q1a1", 1, 2);
        drawLine($("div[id^='q3-']"),$("div[id^='q3a2e1-']"), "line-q3-q3a2e1", 1, 3);
        drawLine($("div[id^='q3-']"),$("div[id^='q3a1-']"), "line-q3-q3a1", 1, 2);


        drawLine($("div[id^='q2a1-']"),$("div[id^='q1a2e1-']"), "line-q2a1-q1a2e1", 2, 3);
        drawLine($("div[id^='q2a1-']"),$("div[id^='e4-']"), "line-q2a1-e4", 2, 3);
        drawLine($("div[id^='q2a1-']"),$("div[id^='e6-']"), "line-q2a1-e6", 2, 3);
        drawLine($("div[id^='q2a1-']"),$("div[id^='e7-']"), "line-q2a1-e7", 2, 3);

        
        drawLine($("div[id^='q1a2-']"),$("div[id^='e7-']"), "line-q1a2-e7", 2, 3);
        drawLine($("div[id^='q1a2-']"),$("div[id^='q1a2e1-']"), "line-q1a2-q1a2e1", 2, 3);
        drawLine($("div[id^='q1a2-']"),$("div[id^='q2a1e1-']"), "line-q1a2-q2a1e1", 2, 3);
        drawLine($("div[id^='q1a2-']"),$("div[id^='e9-']"), "line-q1a2-e9", 2, 3);


        drawLine($("div[id^='q2a2-']"),$("div[id^='q1a1e1-']"), "line-q2a2-q1a1e1", 2, 3);
        drawLine($("div[id^='q2a2-']"),$("div[id^='q2a3e1-']"), "line-q2a2-q2a3e1", 2, 3);
        drawLine($("div[id^='q2a2-']"),$("div[id^='q2a1e1-']"), "line-q2a2-q2a1e1", 2, 3);
        drawLine($("div[id^='q2a2-']"),$("div[id^='q1a2e1-']"), "line-q2a2-q1a2e1", 2, 3);


        drawLine($("div[id^='q2a3-']"),$("div[id^='e1-']"), "line-q2a3-e1", 2, 3);
        drawLine($("div[id^='q2a3-']"),$("div[id^='q1a1e1-']"), "line-q2a3-q1a1e1", 2, 3);
        drawLine($("div[id^='q2a3-']"),$("div[id^='q1a1e2-']"), "line-q2a3-q1a1e2", 2, 3);
        drawLine($("div[id^='q2a3-']"),$("div[id^='q1a1-']"), "line-q2a3-q1a1", 2, 2);
        drawLine($("div[id^='q2a3-']"),$("div[id^='e8-']"), "line-q2a3-e8", 2, 3);


        drawLine($("div[id^='q1a1-']"),$("div[id^='e8-']"), "line-q1a1-e8", 2, 3);
        drawLine($("div[id^='q1a1-']"),$("div[id^='q1a1e2-']"), "line-q1a1-q1a1e2", 2, 3);
        drawLine($("div[id^='q1a1-']"),$("div[id^='q3a2e1-']"), "line-q1a1-q3a2e1", 2, 3);
        drawLine($("div[id^='q1a1-']"),$("div[id^='q3a2e2-']"), "line-q1a1-q3a2e2", 2, 3);
        drawLine($("div[id^='q1a1-']"),$("div[id^='q2a3e1-']"), "line-q1a1-q2a3e1", 2, 3);


        drawLine($("div[id^='q3a1-']"),$("div[id^='q3a2e1-']"), "line-q3a1-q3a2e1", 2, 3);
        drawLine($("div[id^='q3a1-']"),$("div[id^='q3a2e2-']"), "line-q3a1-q3a2e2", 2, 3);
        drawLine($("div[id^='q3a1-']"),$("div[id^='e13-']"), "line-q3a1-e13", 2, 3);


        drawLine($("div[id^='q3a2-']"),$("div[id^='q3a2e2-']"), "line-q3a2-q3a2e2", 2, 3);
        drawLine($("div[id^='q3a2-']"),$("div[id^='e11-']"), "line-q3a2-e11", 2, 3);
        drawLine($("div[id^='q3a2-']"),$("div[id^='e10-']"), "line-q3a2-e10", 2, 3);
        drawLine($("div[id^='q3a2-']"),$("div[id^='e9-']"), "line-q3a2-e9", 2, 3);


        drawLine($("div[id^='q1a1e1-']"),$("div[id^='e1-']"), "line-q1a1e1-e1", 3, 3);
        drawLine($("div[id^='q1a1e1-']"),$("div[id^='q1a1e2-']"), "line-q1a1e1-q1a1e2", 3, 3);
        drawLine($("div[id^='q1a1e1-']"),$("div[id^='q2a3e1-']"), "line-q1a1e1-q2a3e1", 3, 3);


        drawLine($("div[id^='q1a2e1-']"),$("div[id^='e7-']"), "line-q1a2e1-e7", 3, 3);
        drawLine($("div[id^='q1a2e1-']"),$("div[id^='q2a1e1-']"), "line-q1a2e1-q2a1e1", 3, 3);


        drawLine($("div[id^='q2a1e1-']"),$("div[id^='e9-']"), "line-q2a1e1-e9", 3, 3);


        drawLine($("div[id^='q1a1e2-']"),$("div[id^='q2a3e1-']"), "line-q1a1e2-q2a3e1", 3, 3);


        drawLine($("div[id^='q3a2e1-']"),$("div[id^='q3a2e2-']"), "line-q3a2e1-q3a2e2", 3, 3);


        drawLine($("div[id^='q3a2e2-']"),$("div[id^='e11-']"), "line-q3a2e2-e11", 3, 3);
        drawLine($("div[id^='q3a2e2-']"),$("div[id^='e13-']"), "line-q3a2e2-e13", 3, 3);


        drawLine($("div[id^='e1-']"),$("div[id^='e2-']"), "line-e1-e2", 3, 3);
        drawLine($("div[id^='e2-']"),$("div[id^='e3-']"), "line-e2-e3", 3, 3);
        drawLine($("div[id^='e3-']"),$("div[id^='e5-']"), "line-e3-e5", 3, 3);
        drawLine($("div[id^='e3-']"),$("div[id^='e4-']"), "line-e3-e4", 3, 3);
        drawLine($("div[id^='e5-']"),$("div[id^='e6-']"), "line-e5-e6", 3, 3);
        drawLine($("div[id^='e6-']"),$("div[id^='e7-']"), "line-e6-e7", 3, 3);
        drawLine($("div[id^='e9-']"),$("div[id^='e10-']"), "line-e9-e10", 3, 3);
        drawLine($("div[id^='e10-']"),$("div[id^='e12-']"), "line-e10-e12", 3, 3);
        drawLine($("div[id^='e12-']"),$("div[id^='e11-']"), "line-e12-e11", 3, 3);
        drawLine($("div[id^='e12-']"),$("div[id^='e13-']"), "line-e12-e13", 3, 3);
        drawLine($("div[id^='e11-']"),$("div[id^='e13-']"), "line-e11-e13", 3, 3);

    }

});

