const { default: axios } = require('axios');
var express = require('express');
const config = require('../config');
var app = express()

app.get('/api/images', function(req, res) {
	
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


module.exports = app;
