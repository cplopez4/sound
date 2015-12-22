var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

/* Mongoose - MongoDB */
/* var mongoose = require('mongoose');
   var mongo = mongoose.connect('mongodb://127.0.0.1:27017/plus'); */

/* Mongoose Models */
/* var Event = require('./models/mongodb/event'); */

var count = 0;
var newsArr = [];
var linksArr = ["http://www.soychile.cl/Calama/Sociedad/2014/06/16/255947/Los-lideres-sociales-de-Calama-recibieron-certificados-de-diplomado-sobre--liderazgo.aspx","http://www.elciudadano.cl/2014/07/10/108848/el-cobre-la-paradoja-chilena/","http://radio.uchile.cl/2014/07/11/autoridades-de-calama-exigen-no-olvidar-compromisos","http://diario.elmercurio.com/detalle/index.asp?id={c32b9ae4-19f8-44ed-ab78-ae8841e6f6f8}","http://radio.uchile.cl/2014/11/24/alcalde-de-calama-anuncia-movilizaciones-por-eleccion-de-intendentes-en-2017","http://radio.uchile.cl/2015/01/16/alcalde-de-calama-el-gobierno-se-acuerda-del-norte-solo-para-sacar-las-riquezas-mineras","http://www.elciudadano.cl/2015/01/29/142991/chuquicamata-avanza-para-convertirse-en-zona-tipica-y-monumento-historico/","http://www.miparque.cl/calama-tambien-tendra-nuevos-parques/","https://www.veoverde.com/2015/02/de-desierto-a-oasis-calama-esta-mas-cerca-de-ser-sustentable-en-2025/","http://www.elciudadano.cl/2015/02/16/147219/antofagasta-continuan-medidas-parche-por-contaminacion-y-organizaciones-convocan-marcha/","http://radio.uchile.cl/2015/03/01/movimiento-ciudadano-de-calama-anuncia-movilizaciones","http://www.elciudadano.cl/2015/03/14/152401/fernando-san-roman-alcalde-de-tocopilla-tenemos-un-estado-debil-y-que-le-gusta-ser-debil/","http://www.elciudadano.cl/2015/03/17/153021/movilizaciones-de-tocopilla-logran-rebaja-en-cuentas-de-la-luz-y-otros-beneficios-para-la-region/","http://www.municipalidadcalama.cl/?p=6574","http://www.elciudadano.cl/2015/04/11/157875/comunas-del-norte-debemos-exigir-al-gobierno-ley-que-deje-recursos-para-la-zona/","http://elamerica.cl/portal/?p=73663","http://www.calamaplus.cl/#!Municipalidad-de-Calama-hizo-entrega-de-Parque-Granaderos-a-la-comunidad/c17jj/5555fd6c0cf21fee139012fc"];

/* SCRAPER BEGIN */
async.eachSeries(linksArr, function(url, callback){
	request(url, { pool: { maxSockets: 100 } }, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var picture;

			if(url.indexOf("elciudadano.cl") > -1){
				console.log("URL de las fotos de este link de EL CIUDADANO: " + url);
			
				$('.the_content p img').each(function(i,elem){
			        var data = $(elem);
			        var link = data.attr("src");
			        
			        console.log("FOTO "+ (i+1) +": " + link);
		        })	
			}
			else if(url.indexOf("radio.uchile.cl") > -1){
				console.log("URL de las fotos de este link de RADIO U.CHILE: " + url);
			
				$('article.post .article-image img').each(function(i,elem){
			        var data = $(elem);
			        var link = data.attr("src");
			        
			        console.log("FOTO "+ (i+1) +": " + link);
		        })	
			}
			else if(url.indexOf("soychile.cl") > -1){
				console.log("URL de las fotos de este link de SOY CHILE: " + url);
			
				$('.box-ciudad-content .gallery-item a img').each(function(i,elem){
			        var data = $(elem);
			        var link = data.attr("src");
			        
			        console.log("FOTO "+ (i+1) +": " + link);
		        })	
			}
			else{
				console.log("Fuente no identificada");
			}

	        console.log("********************************");
	        callback();
		}
		else{
			console.log(error);
		}
	});

}, function(err){
	if(err){
		console.log(err);
		process.exit();
	}
	else{
		/* console.log("Starting loading process...");
		createNews(); */
	}
})
/* SCRAPER END */