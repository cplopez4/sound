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
var linksArr = ["http://www.elciudadano.cl/2007/07/25/765/trabajadores-contratistas-inician-huelga-de-hambre-en-calama/", "http://www.elciudadano.cl/2009/06/08/8544/policia-infiltrada-en-movilizacion-en-defensa-de-la-las-tierras-del-tatio/", "http://www.elciudadano.cl/2009/09/08/11421/calama-advierte-al-gobiernode-seguir-postergados-radicalizaremos-las-movilizaciones/", "http://www.elciudadano.cl/2009/10/19/13063/mujeres-indigenas-caminan-desde-calama-a-la-moneda/", "http://radio.uchile.cl/2011/09/28/alcalde-de-calama-reitera-necesidad-de-obtener-recursos-de-la-industria-minera", "http://radio.uchile.cl/2011/10/27/asamblea-ciudadana-de-calama-envia-carta-al-presidente-pinera-para-insistir-en-sus-demandas", "http://radio.uchile.cl/2011/08/29/miles-de-personas-marchan-en-paro-comunal-de-calama", "http://www.soychile.cl/Calama/Sociedad/2011/09/18/39297/Asi-sera-el-plan-que-definira-la-ciudad-en-la-que-queremos-vivir-en-20-anos.aspx", "http://www.soychile.cl/Calama/Sociedad/2011/11/29/54801/Programan-un-cabildo-abierto-en-busca-de-una-Calama-sustentable.aspx", "http://www.soychile.cl/Calama/Politica/2012/03/15/78350/Alcalde-de-Calama-pedira-Diego-Hernandez-que-desmarque-del-Gobierno-Calama-PLUS-y-Plan-Calama.aspx"];

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