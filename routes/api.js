var express = require('express');
var Excel = require('exceljs');
var tempfile = require('tempfile');
var router = express.Router();

var Log = require('../models/log').log;

/* Download Excel */
router.get('/data', function(req, res) {

	Log.find({}, null, { sort: { createdAt: -1 } }, function(err, logs) {
		res.header('Access-Control-Allow-Origin', '*');
		if (err)
			res.send(err);

		var workbook = new Excel.Workbook;

		var main_sheet = workbook.addWorksheet('Principal');
		main_sheet.columns = [
		    { header: 'Id', key: 'id', width: 20 },
		    { header: 'Index Id', key: 'idD', width: 10 },
		    { header: 'Email', key: 'email', width: 15 },
		    { header: 'Rango de Edad', key: 'age', width: 15 },
		    { header: 'Género', key: 'gender', width: 15 },
		    { header: 'País', key: 'country', width: 15 },
		    { header: 'Ciudad', key: 'city', width: 15 },
		    { header: 'Comentario', key: 'comment', width: 15 },
		    { header: 'Explicar', key: 'explain', width: 15 },
		    { header: 'Manifiesto', key: 'manifest', width: 15 },
		    { header: 'Pregunta 1', key: 'q1', width: 15 },
		    { header: 'Pregunta 2', key: 'q2', width: 15 },
		    { header: 'Pregunta 3', key: 'q3', width: 15 }
		];

		var click_sheet = workbook.addWorksheet('Clicks');
		click_sheet.columns = [
		    { header: 'Id', key: 'id', width: 20 },
		    { header: 'Index Id', key: 'idD', width: 10 },
		    { header: 'Hora Global', key: 'global', width: 20 },
		    { header: 'Hora Relativa (Segundos)', key: 'ref', width: 20 },
		    { header: 'Posición X', key: 'posx', width: 10 },
		    { header: 'Posición Y', key: 'posy', width: 10 },
		    { header: 'Target', key: 'target', width: 15 },
		    { header: 'Target Id', key: 'targetid', width: 15 }
		];

		logs.forEach(function(v,i){
			main_sheet.addRow([v._id,i,v.email,mapAge(v.age),mapGender(v.gender),v.country,v.city,v.comment,mapExp(v.explain),v.manifest,v.circles.first_answer,(v.circles.second_answer-2),(v.circles.third_answer-5)]);

			v.clicks.forEach(function(elem,index){
				click_sheet.addRow([v._id,i,mapTime(elem.global_time),elem.ref_time,elem.pos.x,elem.pos.y,elem.target,elem.target_id]);
			});
		});

		var tempFilePath = tempfile('.xlsx');
		console.log(tempFilePath);

        workbook.xlsx.writeFile(tempFilePath).then(function() {
        	res.setHeader("Content-Disposition", "attachment; filename=" + "data.xlsx");
            res.sendFile(tempFilePath, function(err){
                console.log('Error downloading file: ' + err);
            });
        });
	});
});

/* Receive Data */
router.post('/form', function(req, res) {	 
  res.header("Content-Type",'application/json');
  res.header("Access-Control-Allow-Origin",'*');
  res.header("Access-Control-Allow-Headers",'Content-Type');

  var log = new Log();

  log.clicks = req.body.data.clicks || [];
  log.manifest = req.body.data.manifest || "";
  log.email = req.body.data.email || "";
  log.age = req.body.data.age || "";
  log.gender = req.body.data.gender || "";
  log.country = req.body.data.country || "";
  log.city = req.body.data.city || "";
  log.comment = req.body.data.comment || "";
  log.explain = req.body.data.explain || "";
  log.circles = req.body.data.circles || { first_answer: 0, second_answer: 0, third_answer: 0 };


  log.save(function (err, logSaved) {
	  if (err) return console.error(err);
	  
	  console.log(logSaved);
	});

  res.send('Data Received!');
});

function mapAge(age){
	if(age == "0"){ return "14 - 20"; }
	else if(age == "1"){ return "21 - 27"; }
	else if(age == "2"){ return "28 - 34"; }
	else if(age == "3"){ return "35 - 42"; }
	else if(age == "4"){ return "43 o más"; }
	else { return "No Data"; }
}

function mapGender(gender){
	if(gender == "M"){ return "Masculino"; }
	else if(gender == "F"){ return "Femenino"; }
	else { return "No Data"; }
}

function mapExp(exp){
	if(exp == "0"){ return "No"; }
	else if(exp == "1"){ return "Si"; }
	else { return "No Data"; }
}

function mapTime(time){
	var date = new Date(time);
	return date;
}

module.exports = router;
