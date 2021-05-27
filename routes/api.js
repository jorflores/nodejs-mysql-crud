const { default: axios } = require('axios');
var express = require('express');
const config = require('../config');
var app = express();


app.get('/images', function(req, res) {
	
	console.log("Hello");
	const token = req.cookies.token
	const headers = {'auth_key' : token}
	var title = 'Images';

	console.log(headers)
    console.log(config.API.imagesUrl)
	axios.get(config.API.imagesUrl,{headers})
	.then(response => {
		var result = response.data;
		res.json(result);
	})
	.catch(error=> {
		console.log(error)
	})

});



app.get('/GetScoreByUserId/:Id', function(req, res) {
	
	var id = req.params.Id;
	const token = req.cookies.token
	const headers = {'auth_key' : token}
	var title = 'Images';

   //	console.log(headers)
   // console.log(config.API.imagesUrl)
	axios.get(config.API.resultadosJuegoURL+id,{headers})
	.then(response => {
		var result = response.data;
		res.json(result);
	})
	.catch(error=> {
		console.log(error)
	})

});


module.exports = app;
