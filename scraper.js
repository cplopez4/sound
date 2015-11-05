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
var linksArr = ["http://www.soychile.cl/Calama/Sociedad/2013/03/13/160381/Vecinos-visitaron-terrenos-del-proyecto-Borde-Rio-de-Calama-Plus.aspx","http://www.soychile.cl/Calama/Sociedad/2013/03/14/160592/Realizaran-una-Mesa-Ciudadana-de-Calama-Plus-para-afinar-detalles-del-Parque-Perirubano.aspx","http://www.elnortero.cl/noticia/sociedad/calama-plus-comunidad-podra-contar-con-instancia-educacional-en-mineria-subterranea","http://www.soychile.cl/Calama/Sociedad/2013/03/15/160890/Finalizo-la-primera-etapa-de-las-Mesas-Ciudadanas-de-Calama-PLUS.aspx","http://radio.uchile.cl/2013/03/17/calama-celebra-aniversario-con-nuevas-movilizaciones-en-demandas-de-mayores-recursos","http://www.elnortero.cl/noticia/sociedad/finaliza-primera-etapa-de-mesas-ciudadanas-proyectos-calama-plus","http://www.soychile.cl/Calama/Sociedad/2013/03/20/161939/Los-representantes-de-AIA-y-comunidad-salesiana-presentaron-proyecto-Colegio-Don-Bosco-en-Calama.aspx","http://www.elciudadano.cl/2013/03/25/64936/cristian-cuevas-fondenor-es-una-burla-del-gobierno-y-el-parlamento/","http://www.elciudadano.cl/2013/04/01/65212/ctc-inicia-negociacion-y-apunta-a-consejo-minero/","http://www.soychile.cl/Calama/Sociedad/2013/04/03/165016/Comenzaran-las-Mesas-Ciudadanas-Zeus-Barrios-de-Calama-PLUS.aspx","http://www.soychile.cl/Calama/Sociedad/2013/04/12/167074/En-Calama-celebraran-el-primer-aniversario-de-la--Consulta-Ciudadana.aspx","http://www.soychile.cl/Calama/Sociedad/2013/04/15/167605/Con-una-misa-y-una-exposicion-se-conmemorara-en-Calama-un-ano-de-la-consuta-Ciudadana.aspx","http://www.soychile.cl/Calama/Sociedad/2013/04/16/168062/Este-jueves-se-realizara-la-Mesa-Ciudadana-del-Zeus-Liceo-Minero-America-de-Calama.aspx","http://www.soychile.cl/Calama/Sociedad/2013/04/19/168759/Calama-Plus-Realizaran-la-Segunda-Mesa-Ciudadana-de-la-remodelacion-del-Parque-El-Loa.aspx","http://www.soychile.cl/Calama/Sociedad/2013/04/19/168707/El-Liceo-Minero-America-de-Calama-contara-con-nueva-infraestructura.aspx","http://www.soychile.cl/Calama/Sociedad/2013/04/22/169395/El-Parque-El-Loa-contara-con-nuevos-espacios-recreativos-tras-su-remodelacion.aspx","http://www.elciudadano.cl/2013/04/25/67006/ingenieros-de-codelco-se-toman-entrada-a-campamento-de-radomiro-tomic-en-paro-de-advertencia/","http://www.soychile.cl/Calama/Sociedad/2013/04/29/171034/Autoridades-visitaron-las-obras-del-nuevo-aeropuerto-de-Calama.aspx","http://www.elciudadano.cl/2013/05/02/67465/alcaldes-se-reunen-en-arica-para-ultimar-detalles-de-la-asociacion-de-municipalidades-del-norte-grande/","http://www.soychile.cl/Calama/Politica/2013/05/03/171870/El-concejal-Dario-Quiroga-hizo-una-dura-critica-al-consorcio-Calama-Plus.aspx","http://www.elciudadano.cl/2013/05/05/67627/asociacion-de-municipios-del-norte-definio-en-arica-una-directiva-provisoria-y-alcaldes-se-proponen-exigir-un-trato-justo/","http://elamerica.cl/portal/2013/05/06/consorcio-calama-plus-hara-cambio-de-gerencia/","http://www.elciudadano.cl/2013/05/10/67974/contratistas-van-a-la-huelga/","http://www.soychile.cl/Calama/Sociedad/2013/05/22/175536/Calama-Plus-estrenara-nueva-pagina-web.aspx","http://www.soychile.cl/Calama/Economia-y-Negocios/2013/05/23/175854/Proyecto-Calama-Plus-relanzo-su-sitio-web.aspx","http://www.soychile.cl/Calama/Sociedad/2013/06/03/177831/Nombran-al-nuevo-director-ejecutivo-del-Consorcio-Calama-Plus.aspx","http://radio.uchile.cl/2013/06/03/calama-convoca-a-paro-el-26-de-junio","http://radio.uchile.cl/2013/06/03/calama-reorganiza-movimiento-social-y-convoca-a-paro-comunal-el-26-de-junio","http://www.soychile.cl/Calama/Sociedad/2013/06/04/178112/Manana-presentaran-oficialmente-al-nuevo-director-ejecutivo-de-Calama-Plus.aspx","http://www.soychile.cl/Calama/Sociedad/2013/06/05/178458/Director-de-Calama-Plus-sobre-la-entidad-Es-el-mejor-punto-de-partida-para-construir-la-ciudad-que-queremos.aspx","http://www.elciudadano.cl/2013/06/07/70532/trabajadores-de-la-salud-del-cobre-en-estado-de-alerta-2/","http://www.soychile.cl/Calama/Sociedad/2013/06/12/179891/Los-Estudios-para-trasladar-la-linea-ferrea-del-centro-de-Calama-estan-en-su-etapa-final.aspx","http://www.soychile.cl/Calama/Sociedad/2013/06/17/180815/Calamenos-discutiran-sobre-el-proyecto-Paseo-Borde-Rio.aspx","http://www.soychile.cl/Calama/Sociedad/2013/06/19/181373/En-Calama-entregaron-los-detalles-finales-del-nuevo-diseno-del-Parque-El-Loa.aspx","http://www.plataformaurbana.cl/archive/2013/06/24/parten-obras-de-calama-plus-mayor-proyecto-de-renovacion-urbana-sustentable-del-norte/","http://radio.uchile.cl/2013/06/25/calama-advierte-punto-de-inflexion-con-paro-comunal-de-este-miercoles","http://www.elciudadano.cl/2013/06/26/72059/ctc-bloquea-acceso-a-chuqui-en-adhesion-a-paro-nacional/","http://radio.uchile.cl/2013/06/26/paro-comunal-reune-a-todas-las-fuerzas-sociales-de-calama","http://www.soychile.cl/Calama/Economia-y-Negocios/2013/07/17/187443/El-consorcio-Calama-Plus-analizara-las-tecnologias-sobre-el-uso-efectivo-del-agua.aspx","http://www.elciudadano.cl/2013/07/22/74266/tocopilla-protesta-con-banderas-negras-contra-el-centralismo/","http://www.elciudadano.cl/2013/07/25/74649/por-la-descentralizaicion-hoy-se-inicio-en-iquique-el-iv-encuentro-de-los-alcaldes-de-la-zona-norte/","http://www.lasegunda.com/Noticias/Impreso/2013/07/866573/las-contradicciones-de-calama-la-ciudad-donde-se-goza-y-sufre-el-boom-minero","http://www.soychile.cl/Calama/Economia-y-Negocios/2013/08/01/190695/Calama-Plus-sobre-deuda-Dipres-con-la-comuna-Proyectos-comprometidos-deben-tener-recursos-para-su-realizacion.aspx","http://www.elciudadano.cl/2013/08/01/75523/no-era-broma-tocopilla-ya-esta-en-la-calle-exigiendo-lo-que-le-corresponde/","http://www.elciudadano.cl/2013/08/02/75584/tocopilla-se-levanta-y-alza-la-voz-contra-el-centralismo/","http://www.elciudadano.cl/2013/08/02/75627/trabajadores-del-cobre-piden-detener-la-represion-en-tocopilla/","http://www.elciudadano.cl/2013/08/05/75864/cuevas-desafiara-prohibicion-legal-a-dirigentes/","http://www.elciudadano.cl/2013/08/05/75812/fernando-san-roman-alcalde-de-tocopilla-si-nos-unimos-de-arica-a-la-serena-vamos-a-doblarle-la-mano-a-santiago/","http://www.soychile.cl/Calama/Sociedad/2013/08/21/194767/La-comunidad-calamena-se-interiorizo-del-proyecto-del-futuro-Colegio-Minero-Don-Bosco.aspx","http://www.soychile.cl/Calama/Sociedad/2013/09/04/198051/Entregan-resultados-de-la-evaluacion-social-del-proyecto-de-traslado-de-la-linea-ferrea-en-Calama.aspx","http://www.soychile.cl/Calama/Sociedad/2013/09/07/198704/Nueva-tecnologia-permitiria-reutilizacion-efectiva-de-las-aguas-urbanas.aspx","http://www.soychile.cl/Calama/Sociedad/2013/09/10/199326/Calama-Plus-mostro-los-avances-de-su-plan-a-la-comunidad.aspx","http://www.soychile.cl/Calama/Sociedad/2013/09/13/200077/Calama-Realizan-el-Proyecto-Educativo-que-permitira-ejecutar-modificaciones-al-Liceo-Minero-America.aspx","http://www.elciudadano.cl/2013/09/14/82418/el-despertar-de-tocopilla-una-cronica-desde-adentro/","http://www.latercera.com/noticia/negocios/2013/09/655-543455-9-mineras-se-unen-a-gobiernos-locales-para-mejorar-ciudades.shtml","http://radio.uchile.cl/2012/09/24/proyecto-%E2%80%9Ccalama-plus%E2%80%9D-despiertadesconfianza-en-organizaciones-sociales","http://www.soychile.cl/Calama/Sociedad/2013/10/08/204997/Calama-Plus-informo-que-se-han-invertido-US108-millones-en-primer-ano-de-ejecucion.aspx","http://www.soychile.cl/Calama/Sociedad/2013/10/11/205751/Avances-en-el-proyecto-del-Mercado-Central-priorizado-por-el-Calama-Plus.aspx","http://www.soychile.cl/Calama/Economia-y-Negocios/2013/10/14/206214/Calama-Plus-sumo-a-Ferrocarril-de-Antofagasta-a-Bolivia-como-empresa-colaborativa.aspx","http://www.aminera.com/index.php/mineria-nacional/item/265-calama-plus-sum%C3%B3-a-ferrocarril-de-antofagasta-a-bolivia-como-empresa-colaborativa.html","http://www.soychile.cl/Calama/Sociedad/2013/10/22/208088/Daran-a-conocer-los-objetivos-del-taller-Mujer-Liderazgo-y-Empoderamiento-Comunitario.aspx","http://www.soychile.cl/Calama/Sociedad/2013/10/23/208378/Calama-Todo-un-exito-resulto-el-Taller-Mujer-Liderazgo-y-Empoderamiento-Comunitario.aspx","http://www.extranoticias.cl/calama-plus-invierte-108-millones-de-dolares-en-su-primer-ano","http://www.soychile.cl/Calama/Sociedad/2013/11/01/210244/Realizaran-seminario-sobre-sustentabilidad-y-movilidad-en-Calama.aspx","http://www.soychile.cl/Calama/Sociedad/2013/11/18/213888/En-un-seminario-analizaran-el-desarrollo-urbano-de-Calama.aspx","http://www.soychile.cl/Calama/Sociedad/2013/11/19/214252/Un-seminario-analizo-la-calidad-de-vida-de-Calama-con-una-mirada-hacia-el-futuro.aspx"];

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