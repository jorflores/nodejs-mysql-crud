const { default: axios } = require('axios');
var express = require('express');
const config = require('../config');
const verifyToken = require('../middleware/verifyAccess');
var app = express()



app.get('/unityTest', function(req, res) {
	var url = req.protocol + '://' + req.get('host')
	// render to views/index.ejs template file
	var title = 'Unity Test';
    res.render('pages/unity', {title: title,url});
 
});



app.get('/',verifyToken, function(req, res) {
	// render to views/index.ejs template file
	var title = 'Videojuegos';
    res.render('index', {
    	title: title
    });

});

app.get('/images',verifyToken, function(req, res) {
	// render to views/index.ejs template file
	var title = 'Images';
	

	const token = req.cookies.token
	const headers = {'auth_key' : token}
	var title = 'Images';
	var data;

	console.log(headers)
    console.log(config.API.imagesUrl)
	axios.get(config.API.imagesUrl,{headers})
	.then(response => {
		 data = response.data;
		 //console.log(data)
    res.render('pages/images', {title: title,data});
	})
	.catch(error=> {
		console.log(error)
	})



});


app.get('/login', function(req, res) {
	// render to views/index.ejs template file
	var title = 'Login';
    res.render('pages/login', {
    	title: title
    });

});


app.post('/login', function(req, res) {

	var user = {"username": req.body.user, "password": req.body.password};
	axios.post(config.API.loginurl,user)
	.then(response => {
		console.log(response.data)
		res.cookie("token",response.data.token,{httpOnly:true})
		res.cookie("user",response.data.user,{httpOnly:true})
		return res.redirect('/');
	})
	.catch(err=> {
		console.log(err);
	})

});



module.exports = app;
